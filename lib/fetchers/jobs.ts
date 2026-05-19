import type { Job } from '@/types'

// Search terms for NL AI & Data Engineering positions
const SEARCH_ROLES = [
  'data engineer',
  'machine learning engineer',
  'AI engineer',
  'LLM engineer',
  'MLOps engineer',
  'data scientist',
  'data platform engineer',
  'db2',
  'IBM Db2',
  'DB2 DBA',
  'database administrator DB2',
]

// DB2-specific terms for the Europe + Brazil search
const DB2_TERMS = ['db2', 'IBM Db2', 'DB2 DBA', 'database administrator DB2']

// Europe (NL excluded — covered by fetchNLJobs) + Brazil
const DB2_COUNTRIES: Array<{ code: string; fallbackLocation: string; currency: string }> = [
  { code: 'gb', fallbackLocation: 'United Kingdom', currency: 'GBP' },
  { code: 'de', fallbackLocation: 'Germany',        currency: 'EUR' },
  { code: 'fr', fallbackLocation: 'France',         currency: 'EUR' },
  { code: 'pl', fallbackLocation: 'Poland',         currency: 'EUR' },
  { code: 'es', fallbackLocation: 'Spain',          currency: 'EUR' },
  { code: 'it', fallbackLocation: 'Italy',          currency: 'EUR' },
  { code: 'at', fallbackLocation: 'Austria',        currency: 'EUR' },
  { code: 'br', fallbackLocation: 'Brazil',         currency: 'BRL' },
]

export async function fetchNLJobs(): Promise<Omit<Job, 'id' | 'created_at'>[]> {
  const appId = process.env.ADZUNA_APP_ID
  const appKey = process.env.ADZUNA_APP_KEY
  if (!appId || !appKey) return []
  return fetchFromAdzuna(appId, appKey)
}

export async function fetchDB2EuropeJobs(): Promise<Omit<Job, 'id' | 'created_at'>[]> {
  const appId = process.env.ADZUNA_APP_ID
  const appKey = process.env.ADZUNA_APP_KEY
  if (!appId || !appKey) return []
  return fetchDB2FromCountries(appId, appKey)
}

async function fetchFromAdzuna(
  appId: string,
  appKey: string,
): Promise<Omit<Job, 'id' | 'created_at'>[]> {
  const seen = new Set<string>()
  const results: Omit<Job, 'id' | 'created_at'>[] = []

  for (const role of SEARCH_ROLES) {
    try {
      const url =
        `https://api.adzuna.com/v1/api/jobs/nl/search/1` +
        `?app_id=${appId}&app_key=${appKey}` +
        `&what=${encodeURIComponent(role)}` +
        `&results_per_page=10` +
        `&max_days_old=30` +
        `&content-type=application/json`

      const res = await fetch(url, { next: { revalidate: 0 } })
      if (!res.ok) continue

      const data = await res.json()

      for (const job of data.results ?? []) {
        const applyUrl: string =
          job.redirect_url ??
          (job.id ? `https://www.adzuna.nl/jobs/details/${job.id}` : null) ??
          ''

        if (!applyUrl || seen.has(applyUrl)) continue
        seen.add(applyUrl)

        results.push({
          title: job.title,
          company: job.company?.display_name ?? 'Unknown',
          location: job.location?.display_name ?? 'Netherlands',
          job_type: inferJobType(job.contract_type, job.title),
          salary_min: job.salary_min ?? null,
          salary_max: job.salary_max ?? null,
          currency: 'EUR',
          description: job.description?.slice(0, 500) ?? null,
          skills: extractSkills(job.description ?? '', job.title ?? ''),
          apply_url: applyUrl || null,
          source: 'Adzuna',
          posted_at: job.created ?? new Date().toISOString(),
          is_remote:
            (job.title?.toLowerCase() ?? '').includes('remote') ||
            (job.description?.toLowerCase() ?? '').includes('remote'),
          seniority: detectSeniority(job.title ?? ''),
        })
      }
    } catch {
      // continue to next role on error
    }
  }

  return results
}

async function fetchDB2FromCountries(
  appId: string,
  appKey: string,
): Promise<Omit<Job, 'id' | 'created_at'>[]> {
  const seen = new Set<string>()
  const results: Omit<Job, 'id' | 'created_at'>[] = []

  for (const country of DB2_COUNTRIES) {
    for (const term of DB2_TERMS) {
      try {
        const url =
          `https://api.adzuna.com/v1/api/jobs/${country.code}/search/1` +
          `?app_id=${appId}&app_key=${appKey}` +
          `&what=${encodeURIComponent(term)}` +
          `&results_per_page=10` +
          `&max_days_old=30` +
          `&content-type=application/json`

        const res = await fetch(url, { next: { revalidate: 0 } })
        if (!res.ok) continue

        const data = await res.json()

        for (const job of data.results ?? []) {
          const applyUrl: string =
            job.redirect_url ??
            (job.id ? `https://www.adzuna.${country.code}/jobs/details/${job.id}` : null) ??
            ''

          if (!applyUrl || seen.has(applyUrl)) continue
          seen.add(applyUrl)

          results.push({
            title: job.title,
            company: job.company?.display_name ?? 'Unknown',
            location: job.location?.display_name ?? country.fallbackLocation,
            job_type: inferJobType(job.contract_type, job.title),
            salary_min: job.salary_min ?? null,
            salary_max: job.salary_max ?? null,
            currency: country.currency,
            description: job.description?.slice(0, 500) ?? null,
            skills: extractSkills(job.description ?? '', job.title ?? ''),
            apply_url: applyUrl || null,
            source: 'Adzuna-EU',
            posted_at: job.created ?? new Date().toISOString(),
            is_remote:
              (job.title?.toLowerCase() ?? '').includes('remote') ||
              (job.description?.toLowerCase() ?? '').includes('remote'),
            seniority: detectSeniority(job.title ?? ''),
          })
        }
      } catch {
        // continue to next country/term on error
      }
    }
  }

  return results
}

function inferJobType(contractType: string | undefined, title: string): string {
  if (contractType === 'contract') return 'contract'
  if (contractType === 'part_time') return 'part-time'
  const t = (title ?? '').toLowerCase()
  if (t.includes('freelance') || t.includes('contract') || t.includes('day rate')) return 'contract'
  return 'full-time'
}

function detectSeniority(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('junior') || t.includes('jr.') || t.includes('graduate') || t.includes('medior junior')) return 'junior'
  if (t.includes('lead') || t.includes('principal') || t.includes('head of') || t.includes('staff')) return 'lead'
  if (t.includes('senior') || t.includes('sr.') || t.includes('medior senior')) return 'senior'
  return 'mid'
}

const SKILL_KEYWORDS = [
  'python', 'sql', 'spark', 'kafka', 'airflow', 'dbt', 'databricks', 'snowflake',
  'kubernetes', 'docker', 'terraform', 'azure', 'aws', 'gcp', 'mlflow', 'pytorch',
  'tensorflow', 'scikit-learn', 'langchain', 'openai', 'llm', 'rag', 'postgresql',
  'db2', 'ibm db2', 'oracle', 'linux', 'java', 'scala', 'typescript', 'react',
  'fastapi', 'flink', 'hadoop', 'hive', 'power bi', 'tableau', 'looker',
]

function extractSkills(description: string, title: string): string[] {
  const text = `${title} ${description}`.toLowerCase()
  return SKILL_KEYWORDS
    .filter(skill => text.includes(skill))
    .slice(0, 6)
    .map(s => (s === 'ibm db2' ? 'DB2' : s.toUpperCase()))
}
