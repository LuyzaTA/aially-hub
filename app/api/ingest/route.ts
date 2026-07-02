import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { fetchHackerNews, fetchDevTo, fetchNLJobs, fetchDB2EuropeJobs, fetchJSearchJobs } from '@/lib/fetchers'
import { sendDb2JobsAlert } from '@/lib/email'

// Job fetchers now issue ~70+ sequential external requests (NL junior/traineeship
// terms + DB2 Europe/Brazil + JSearch) — the platform default (10s) isn't enough.
export const maxDuration = 60

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

    // --- NL Jobs (Adzuna) + DB2 Europe/Brazil (Adzuna) + LinkedIn/Indeed NL+Brazil (JSearch) ---
    const [nlJobs, db2EuJobs, jsearchJobs] = await Promise.all([
      fetchNLJobs(),
      fetchDB2EuropeJobs(),
      fetchJSearchJobs(),
    ])
    log.nl_jobs_fetched = nlJobs.length
    log.db2_eu_jobs_fetched = db2EuJobs.length
    log.jsearch_jobs_fetched = jsearchJobs.length

    // Deduplicate across all batches by apply_url
    const seenUrls = new Set<string>()
    const allJobs = [...nlJobs, ...db2EuJobs, ...jsearchJobs].filter(j => {
      if (!j.apply_url || seenUrls.has(j.apply_url)) return false
      seenUrls.add(j.apply_url)
      return true
    })
    log.jobs_fetched = allJobs.length

    if (allJobs.length > 0) {
      // Wipe all jobs — every listing comes from Adzuna, no manual data to preserve
      await supabase.from('jobs').delete().neq('id', '00000000-0000-0000-0000-000000000000')

      const { error: jobsErr, count: jobsCount } = await supabase
        .from('jobs')
        .insert(allJobs)
        .select('id', { count: 'exact' })
      log.jobs_inserted = jobsCount ?? 0
      if (jobsErr) log.jobs_error = jobsErr.message
    }

    const jobSources: string[] = []
    if (process.env.ADZUNA_APP_ID) jobSources.push('adzuna')
    if (process.env.RAPIDAPI_KEY) jobSources.push('jsearch (linkedin/indeed)')
    log.jobs_source = jobSources.length > 0
      ? jobSources.join(', ')
      : 'none (configure ADZUNA_APP_ID and/or RAPIDAPI_KEY)'

    // --- DB2 alert email (NL + EU/Brazil) ---
    const allDb2Jobs = allJobs.filter(
      j =>
        j.title?.toLowerCase().includes('db2') ||
        (j.skills ?? []).some(s => s.toUpperCase() === 'DB2'),
    )
    if (allDb2Jobs.length > 0) {
      await sendDb2JobsAlert(allDb2Jobs as unknown as import('@/types').Job[]).catch(() => {
        log.email_error = 'DB2 alert failed (check RESEND_API_KEY)'
      })
      log.db2_alert_sent = allDb2Jobs.length
    }

    // --- Log ingestion run ---
    await supabase.from('ingestion_log').insert({
      source: 'all',
      records_fetched: hnArticles.length + devtoArticles.length + allJobs.length,
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
