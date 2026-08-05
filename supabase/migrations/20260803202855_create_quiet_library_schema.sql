/*
# The Quiet Library — Replace schema for mental health resource redesign

## Overview
The app is being redesigned from a tech learning hub into a calm digital
library for teen mental health. The previous schema (categories, resources,
bookmarks, progress) contained only seed data added during this session —
no user data exists yet. This migration drops the old tables and creates the
new schema.

## 1. Dropped tables (seed-only, no user data)
- bookmarks, progress, resources (old), categories

## 2. New Tables

### `emotions`
Emotions a teen can select during the Emotion Check. Each maps to a library
section with its own color palette, intro text, and comforting message.
- id, name, slug, color_key, description, comfort_message, intro_text, icon, sort_order

### `resources`
REAL vetted resources from trusted orgs (WHO, UNICEF, NHS, KidsHealth, Mind,
ReachOut, Beyond Blue, MHF NZ, 988, Trevor Project, TED, real books, podcasts).
- id, emotion_id, title, author, provider, url, resource_type
  (book/article/video/podcast/organization/helpline), description,
  duration_text, is_free, cover_color, spine_text, sort_order

### `activities`
Practical interactive activities (breathing, grounding, gratitude, mood
tracker, affirmations, timer, sleep checklist, stretch, journaling, detox).
- id, emotion_id (nullable for universal activities), title, description,
  activity_type, duration_text, icon, sort_order

## 3. Security
All tables: RLS enabled, anon read-only (catalog) or anon full CRUD (bookmarks,
progress). No auth — single-tenant shared/public model.
*/

DROP TABLE IF EXISTS bookmarks CASCADE;
DROP TABLE IF EXISTS progress CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE emotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  color_key text NOT NULL,
  description text NOT NULL,
  comfort_message text NOT NULL,
  intro_text text NOT NULL,
  icon text NOT NULL DEFAULT 'Heart',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE emotions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_emotions" ON emotions;
CREATE POLICY "anon_read_emotions" ON emotions FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emotion_id uuid REFERENCES emotions(id) ON DELETE CASCADE,
  title text NOT NULL,
  author text,
  provider text NOT NULL,
  url text NOT NULL,
  resource_type text NOT NULL CHECK (resource_type IN ('book','article','video','podcast','organization','helpline')),
  description text NOT NULL,
  duration_text text,
  is_free boolean NOT NULL DEFAULT true,
  cover_color text NOT NULL DEFAULT 'slate',
  spine_text text,
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_resources" ON resources;
CREATE POLICY "anon_read_resources" ON resources FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emotion_id uuid REFERENCES emotions(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  activity_type text NOT NULL CHECK (activity_type IN ('breathing','grounding','gratitude','mood','affirmation','timer','sleep','stretch','journal','detox','reflection')),
  duration_text text,
  icon text NOT NULL DEFAULT 'Sparkles',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_activities" ON activities;
CREATE POLICY "anon_read_activities" ON activities FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX resources_emotion_id_idx ON resources(emotion_id);
CREATE INDEX activities_emotion_id_idx ON activities(emotion_id);
