/*
# Learning Hub — Curated Resource Directory

## Overview
Creates a production database for a curated learning-hub web app. The app lists
real, currently-available learning resources (courses, books, podcasts,
articles, interactive platforms) from trusted organizations (universities,
established companies, non-profits). Anonymous visitors can browse, search,
filter by category/type/level, open resource links, and bookmark resources for
later. No sign-in is required, so the app operates as a single-tenant (shared,
public) data model with anonymous persistence of bookmarks via a per-browser
visitor ID stored in localStorage.

## 1. New Tables

### `categories`
Lookup table of learning categories (e.g. Software Engineering, Data Science,
Design, Product Management, Computer Science Foundations, AI & Machine Learning).
- `id` (uuid, primary key)
- `name` (text, not null, unique)
- `slug` (text, not null, unique)
- `icon` (text, not null) — lucide-react icon name
- `description` (text)
- `sort_order` (integer, default 0)
- `created_at` (timestamptz, default now())

### `resources`
The curated learning resources. Every row is a real, currently-available
resource from a trusted organization. `url` is a real working link to the
resource itself. `provider` is the trusted organization behind it.
- `id` (uuid, primary key)
- `title` (text, not null)
- `subtitle` (text)
- `description` (text, not null)
- `url` (text, not null) — real external link to the resource
- `provider` (text, not null) — trusted organization
- `provider_logo` (text) — lucide icon name representing the provider domain
- `category_id` (uuid, foreign key -> categories.id, not null)
- `resource_type` (text, not null) — one of: course, book, podcast, article, interactive, video, documentation
- `difficulty` (text, not null) — one of: beginner, intermediate, advanced
- `duration_text` (text) — human-readable time commitment (e.g. "6 weeks", "Self-paced")
- `is_free` (boolean, default true)
- `tags` (text[]) — searchable tags
- `featured` (boolean, default false)
- `sort_order` (integer, default 0)
- `created_at` (timestamptz, default now())

### `bookmarks`
Per-visitor bookmarks. `visitor_id` is a random UUID generated client-side and
stored in localStorage, so bookmarks persist across reloads on the same browser
without requiring authentication.
- `id` (uuid, primary key)
- `resource_id` (uuid, foreign key -> resources.id, not null)
- `visitor_id` (uuid, not null) — per-browser anonymous ID
- `created_at` (timestamptz, default now())
- UNIQUE (resource_id, visitor_id) — one bookmark per resource per visitor

### `progress`
Per-visitor learning progress on a resource (not-started / in-progress / completed).
- `id` (uuid, primary key)
- `resource_id` (uuid, foreign key -> resources.id, not null)
- `visitor_id` (uuid, not null)
- `status` (text, not null, default 'not_started') — one of: not_started, in_progress, completed
- `updated_at` (timestamptz, default now())
- UNIQUE (resource_id, visitor_id)

## 2. Indexes
- `resources_category_id_idx` on resources(category_id) for category filtering.
- `resources_resource_type_idx` on resources(resource_type) for type filtering.
- `resources_difficulty_idx` on resources(difficulty) for level filtering.
- `resources_featured_idx` on resources(featured) for featured selections.
- `bookmarks_visitor_id_idx` on bookmarks(visitor_id) for fetching a visitor's bookmarks.
- `progress_visitor_id_idx` on progress(visitor_id) for fetching a visitor's progress.
- `resources_tags_gin_idx` GIN index on resources(tags) for tag search.

## 3. Security (RLS)
All tables use a single-tenant (no-auth) model. The frontend talks to Supabase
with the anon key, so EVERY policy lists `TO anon, authenticated` — the app
never has an authenticated session. Categories and resources are public read,
no writes from the client (writes happen only via migrations / service role).
Bookmarks and progress are fully CRUD-able by anon + authenticated so visitors
can bookmark and track progress without signing in.

## 4. Important Notes
1. No `user_id` columns and no `auth.uid()` checks — the app has no sign-in.
2. Categories + resources are read-only from the client (no insert/update/delete
   policies) so visitors cannot modify the curated catalog.
3. Bookmarks + progress allow full anon CRUD — `USING (true)` / `WITH CHECK (true)`
   is acceptable here because the data is intentionally public/shared in a
   no-auth app and the `visitor_id` column provides logical per-browser isolation.
4. `visitor_id` is generated client-side as `crypto.randomUUID()` and stored in
   localStorage; it is not a security boundary, only a persistence mechanism.
*/

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  icon text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_categories" ON categories;
CREATE POLICY "anon_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Resources
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text NOT NULL,
  url text NOT NULL,
  provider text NOT NULL,
  provider_logo text NOT NULL DEFAULT 'Globe',
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  resource_type text NOT NULL CHECK (resource_type IN ('course','book','podcast','article','interactive','video','documentation')),
  difficulty text NOT NULL CHECK (difficulty IN ('beginner','intermediate','advanced')),
  duration_text text,
  is_free boolean NOT NULL DEFAULT true,
  tags text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_resources" ON resources;
CREATE POLICY "anon_read_resources" ON resources FOR SELECT
  TO anon, authenticated USING (true);

-- Bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  visitor_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (resource_id, visitor_id)
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookmarks" ON bookmarks;
CREATE POLICY "anon_select_bookmarks" ON bookmarks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookmarks" ON bookmarks;
CREATE POLICY "anon_insert_bookmarks" ON bookmarks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookmarks" ON bookmarks;
CREATE POLICY "anon_delete_bookmarks" ON bookmarks FOR DELETE
  TO anon, authenticated USING (true);

-- Progress
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  visitor_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (resource_id, visitor_id)
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_progress" ON progress;
CREATE POLICY "anon_select_progress" ON progress FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_progress" ON progress;
CREATE POLICY "anon_insert_progress" ON progress FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_progress" ON progress;
CREATE POLICY "anon_update_progress" ON progress FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_progress" ON progress;
CREATE POLICY "anon_delete_progress" ON progress FOR DELETE
  TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS resources_category_id_idx ON resources(category_id);
CREATE INDEX IF NOT EXISTS resources_resource_type_idx ON resources(resource_type);
CREATE INDEX IF NOT EXISTS resources_difficulty_idx ON resources(difficulty);
CREATE INDEX IF NOT EXISTS resources_featured_idx ON resources(featured);
CREATE INDEX IF NOT EXISTS bookmarks_visitor_id_idx ON bookmarks(visitor_id);
CREATE INDEX IF NOT EXISTS progress_visitor_id_idx ON progress(visitor_id);
CREATE INDEX IF NOT EXISTS resources_tags_gin_idx ON resources USING GIN (tags);

-- updated_at trigger for progress
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS progress_set_updated_at ON progress;
CREATE TRIGGER progress_set_updated_at
  BEFORE UPDATE ON progress
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();