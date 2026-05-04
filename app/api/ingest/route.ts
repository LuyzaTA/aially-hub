import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { fetchHackerNews, fetchDevTo, fetchNLJobs } from '@/lib/fetchers'

export async function POST(req: NextRequest) {
  // Optional: protect with a secret in production
  try {
    const body = await req.json().catch(() => ({}))
    const secret = process.env.INGEST_SECRET
    if (secret && secret !== 'change-me-in-production' && body.secret !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch {
    // no body provided, allow in dev
  }

  const supabase = createServiceClient()
  const log: Record<string, unknown> = {}

  try {
    // --- Articles from HackerNews ---
    const hnArticles = await fetchHackerNews()
    log.hn_fetched = hnArticles.length

    if (hnArticles.length > 0) {
      const { error: hnErr, count: hnCount } = await supabase
        .from('articles')
        .upsert(hnArticles, { onConflict: 'url', ignoreDuplicates: true })
        .select('id', { count: 'exact' })
      log.hn_inserted = hnCount ?? 0
      if (hnErr) log.hn_error = hnErr.message
    }

    // --- Articles from Dev.to ---
    const devtoArticles = await fetchDevTo()
    log.devto_fetched = devtoArticles.length

    if (devtoArticles.length > 0) {
      const { error: devtoErr, count: devtoCount } = await supabase
        .from('articles')
        .upsert(devtoArticles, { onConflict: 'url', ignoreDuplicates: true })
        .select('id', { count: 'exact' })
      log.devto_inserted = devtoCount ?? 0
      if (devtoErr) log.devto_error = devtoErr.message
    }

    // --- NL Jobs ---
    const jobs = await fetchNLJobs()
    log.jobs_fetched = jobs.length

    if (jobs.length > 0) {
      // Replace all Adzuna jobs with fresh results on every run
      await supabase.from('jobs').delete().eq('source', 'Adzuna')

      const { error: jobsErr, count: jobsCount } = await supabase
        .from('jobs')
        .insert(jobs)
        .select('id', { count: 'exact' })
      log.jobs_inserted = jobsCount ?? 0
      if (jobsErr) log.jobs_error = jobsErr.message
    }

    log.jobs_source = process.env.ADZUNA_APP_ID ? 'adzuna' : 'none (configure ADZUNA_APP_ID)'

    // --- Log ingestion run ---
    await supabase.from('ingestion_log').insert({
      source: 'all',
      records_fetched: hnArticles.length + devtoArticles.length + jobs.length,
      status: 'success',
    })

    return NextResponse.json({ ok: true, ...log })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    await supabase.from('ingestion_log').insert({
      source: 'all',
      records_fetched: 0,
      status: 'error',
      error: message,
    })
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}

// Allow GET for quick browser testing / Vercel cron
export async function GET(req: NextRequest) {
  const cronSecret = req.headers.get('authorization')
  const expected = `Bearer ${process.env.INGEST_SECRET ?? ''}`
  if (process.env.INGEST_SECRET && cronSecret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return POST(req)
}
