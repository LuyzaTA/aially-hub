-- ============================================================
-- AI Intel Hub — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Articles (AI news, Data Engineering, Startups, Research, Tools)
CREATE TABLE IF NOT EXISTS articles (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  summary     TEXT,
  url         TEXT UNIQUE,
  source      TEXT,
  category    TEXT NOT NULL CHECK (category IN ('ai', 'data_engineering', 'tools', 'research', 'startup')),
  image_url   TEXT,
  tags        TEXT[] DEFAULT '{}',
  author      TEXT,
  published_at TIMESTAMPTZ,
  score       INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- NL Job listings
CREATE TABLE IF NOT EXISTS jobs (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  company     TEXT NOT NULL,
  location    TEXT DEFAULT 'Netherlands',
  job_type    TEXT,
  salary_min  INTEGER,
  salary_max  INTEGER,
  currency    TEXT DEFAULT 'EUR',
  description TEXT,
  skills      TEXT[] DEFAULT '{}',
  apply_url   TEXT,
  source      TEXT,
  posted_at   TIMESTAMPTZ,
  is_remote   BOOLEAN DEFAULT FALSE,
  seniority   TEXT CHECK (seniority IN ('junior', 'mid', 'senior', 'lead', 'principal')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Startup Radar
CREATE TABLE IF NOT EXISTS startups (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT NOT NULL,
  tagline        TEXT,
  description    TEXT,
  website        TEXT,
  founded_year   INTEGER,
  stage          TEXT,
  funding_amount TEXT,
  category       TEXT,
  country        TEXT,
  tags           TEXT[] DEFAULT '{}',
  is_trending    BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Ingestion log
CREATE TABLE IF NOT EXISTS ingestion_log (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source          TEXT,
  records_fetched INTEGER DEFAULT 0,
  status          TEXT,
  error           TEXT,
  ran_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS articles_category_idx   ON articles (category);
CREATE INDEX IF NOT EXISTS articles_published_idx  ON articles (published_at DESC);
CREATE INDEX IF NOT EXISTS articles_featured_idx   ON articles (is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS jobs_posted_idx         ON jobs (posted_at DESC);
CREATE INDEX IF NOT EXISTS jobs_remote_idx         ON jobs (is_remote);
CREATE INDEX IF NOT EXISTS jobs_seniority_idx      ON jobs (seniority);
CREATE INDEX IF NOT EXISTS startups_stage_idx      ON startups (stage);
CREATE INDEX IF NOT EXISTS ingestion_log_ran_idx   ON ingestion_log (ran_at DESC);

-- ============================================================
-- Row Level Security — open for reads, allow anon inserts
-- (Tighten in production: restrict inserts to service_role)
-- ============================================================
ALTER TABLE articles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups      ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingestion_log ENABLE ROW LEVEL SECURITY;

-- Add country column to startups if it doesn't exist yet
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startups' AND column_name = 'country'
  ) THEN
    ALTER TABLE startups ADD COLUMN country TEXT;
  END IF;
END $$;

-- Drop policies first so this script is safe to re-run
DROP POLICY IF EXISTS "public_read_articles"   ON articles;
DROP POLICY IF EXISTS "public_read_jobs"        ON jobs;
DROP POLICY IF EXISTS "public_read_startups"    ON startups;
DROP POLICY IF EXISTS "public_read_ingest_log"  ON ingestion_log;
DROP POLICY IF EXISTS "anon_insert_articles"    ON articles;
DROP POLICY IF EXISTS "anon_insert_jobs"        ON jobs;
DROP POLICY IF EXISTS "anon_insert_startups"    ON startups;
DROP POLICY IF EXISTS "anon_insert_ingest_log"  ON ingestion_log;
DROP POLICY IF EXISTS "anon_delete_jobs"        ON jobs;
DROP POLICY IF EXISTS "anon_update_articles"    ON articles;

-- Public read
CREATE POLICY "public_read_articles"   ON articles      FOR SELECT USING (true);
CREATE POLICY "public_read_jobs"       ON jobs          FOR SELECT USING (true);
CREATE POLICY "public_read_startups"   ON startups      FOR SELECT USING (true);
CREATE POLICY "public_read_ingest_log" ON ingestion_log FOR SELECT USING (true);

-- Allow anon inserts (for the /api/ingest route)
CREATE POLICY "anon_insert_articles"   ON articles      FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert_jobs"       ON jobs          FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert_startups"   ON startups      FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert_ingest_log" ON ingestion_log FOR INSERT WITH CHECK (true);

-- Allow anon deletes (for job expiry cleanup)
CREATE POLICY "anon_delete_jobs"       ON jobs          FOR DELETE USING (true);

-- Allow upserts (UPDATE) for articles and jobs
CREATE POLICY "anon_update_articles"   ON articles      FOR UPDATE USING (true);
CREATE POLICY "anon_update_jobs"       ON jobs          FOR UPDATE USING (true);
