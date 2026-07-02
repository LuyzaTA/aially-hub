import type { Job } from '@/types'
import {
  SEARCH_ROLES,
  isMainframeJob,
  isDB2DBAFocused,
  inferJobType,
  detectSeniority,
  extractSkills,
} from './jobs'

// JSearch (RapidAPI) aggregates listings sourced from LinkedIn, Indeed, Glassdoor,
// ZipRecruiter, etc. We only keep results actually published on LinkedIn or Indeed,
// since that's what this fetcher is meant to add on top of Adzuna.
const KEPT_PUBLISHERS = ['linkedin', 'indeed']

const COUNTRIES: Array<{ code: string; name: string; currency: string }> = [
  { code: 'nl', name: 'Netherlands', currency: 'EUR' },
  { code: 'br', name: 'Brazil', currency: 'BRL' },
]

interface JSearchJob {
  job_title?: string
  employer_name?: string
  job_publisher?: string
  job_employment_type?: string
  job_apply_link?: string
  job_description?: string
  job_is_remote?: boolean
  job_posted_at_datetime_utc?: string
  job_city?: string | null
  job_state?: string | null
  job_country?: string | null
  job_min_salary?: number | null
  job_max_salary?: number | null
  job_salary_currency?: string | null
}

interface JSearchResponse {
  data?: JSearchJob[]
}

// Maps JSearch's employment_type enum onto the contract_type values inferJobType() expects
function normalizeEmploymentType(jsearchType: string | undefined): string | undefined {
  switch (jsearchType) {
    case 'PARTTIME': return 'part_time'
    case 'CONTRACTOR': return 'contract'
    default: return undefined
  }
}

export async function fetchJSearchJobs(): Promise<Omit<Job, 'id' | 'created_at'>[]> {
  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) return []

  const seen = new Set<string>()
  const results: Omit<Job, 'id' | 'created_at'>[] = []

  for (const country of COUNTRIES) {
    for (const role of SEARCH_ROLES) {
      try {
        const isDb2Role = role.toLowerCase().includes('db2')
        const query = `${role} in ${country.name}`
        const url =
          `https://jsearch.p.rapidapi.com/search` +
          `?query=${encodeURIComponent(query)}` +
          `&page=1&num_pages=1&date_posted=month&country=${country.code}`

        const res = await fetch(url, {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          },
          next: { revalidate: 0 },
        })
        if (!res.ok) continue

        const data: JSearchResponse = await res.json()

        for (const job of data.data ?? []) {
          const publisher = (job.job_publisher ?? '').toLowerCase()
          if (!KEPT_PUBLISHERS.includes(publisher)) continue

          const applyUrl = job.job_apply_link ?? ''
          if (!applyUrl || seen.has(applyUrl)) continue

          const title = job.job_title ?? ''
          const description = job.job_description ?? ''

          // Skip mainframe / z/OS positions from DB2 searches
          if (isDb2Role && isMainframeJob(title, description)) continue
          // Skip non-DBA roles from DB2 searches (e.g. Java devs that mention DB2 as a skill)
          if (isDb2Role && !isDB2DBAFocused(title, description)) continue

          seen.add(applyUrl)

          const locationParts = [job.job_city, job.job_state].filter(Boolean)
          const location = locationParts.length > 0
            ? `${locationParts.join(', ')}, ${country.name}`
            : country.name

          results.push({
            title,
            company: job.employer_name ?? 'Unknown',
            location,
            job_type: inferJobType(normalizeEmploymentType(job.job_employment_type), title),
            salary_min: job.job_min_salary != null ? Math.round(job.job_min_salary) : null,
            salary_max: job.job_max_salary != null ? Math.round(job.job_max_salary) : null,
            currency: job.job_salary_currency ?? country.currency,
            description: description ? description.slice(0, 500) : null,
            skills: extractSkills(description, title),
            apply_url: applyUrl,
            source: publisher === 'linkedin' ? 'LinkedIn' : 'Indeed',
            posted_at: job.job_posted_at_datetime_utc ?? new Date().toISOString(),
            is_remote: Boolean(job.job_is_remote),
            seniority: detectSeniority(title),
          })
        }
      } catch {
        // continue to next role/country on error
      }
    }
  }

  return results
}
