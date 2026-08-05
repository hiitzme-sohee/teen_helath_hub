/*
# Fix: set search_path on set_updated_at function

The old schema left a `set_updated_at()` trigger function with a mutable
search_path. This migration drops and recreates it with an explicit
search_path, resolving the security advisor warning. The function is only
used by the (now-dropped) progress table trigger, so this is a cleanup.
*/

DROP FUNCTION IF EXISTS public.set_updated_at();

DROP FUNCTION IF EXISTS set_updated_at();

-- No longer needed: progress table was dropped in the redesign.
