import { createClient } from '@/lib/supabase/server'
import { JobCard } from '@/components/cards/JobCard'

export const revalidate = 3600

interface JobsPageProps {
  searchParams: Promise<{ remote?: string; q?: string }>
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams
  const remoteOnly = params.remote === 'true'
  const query = params.q ?? ''

  const supabase = await createClient()

  // DB2 DBA roles are a separate concern surfaced exclusively on /db2.
  // Everything else here is junior-only by construction (enforced at fetch time),
  // so there's no seniority filter to offer.
  let req = supabase
    .from('jobs')
    .select('*')
    .in('source', ['Adzuna', 'LinkedIn', 'Indeed'])
    .ilike('location', '%Netherlands%')
    .not('title', 'ilike', '%db2%')
    .not('title', 'ilike', '%dba%')
    .order('posted_at', { ascending: false })
    .limit(60)

  if (remoteOnly) req = req.eq('is_remote', true)
  if (query) req = req.or(`title.ilike.%${query}%,company.ilike.%${query}%`)

  const { data: jobs } = await req
  const { count: totalCount } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .in('source', ['Adzuna', 'LinkedIn', 'Indeed'])
    .ilike('location', '%Netherlands%')
    .not('title', 'ilike', '%db2%')
    .not('title', 'ilike', '%dba%')

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-[22px] font-bold text-[#EEEEFF]">NL Jobs</h1>
        <p className="text-[#6B6990] text-[13px] mt-0.5">
          {totalCount} open positions · Netherlands · AI &amp; Data Engineering · Junior
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-7 flex-wrap">
        <a
          href={`/jobs?remote=${!remoteOnly}${query ? `&q=${query}` : ''}`}
          className={`px-3.5 py-2 rounded-xl text-[12px] font-medium border transition-all ${
            remoteOnly
              ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/25'
              : 'bg-[#17153A] text-[#6B6990] border-white/[0.07] hover:text-[#A8A6CC]'
          }`}
        >
          {remoteOnly ? '✓ ' : ''}Remote only
        </a>

        <form method="GET" action="/jobs" className="flex-1 min-w-48 max-w-sm">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search role or company…"
            className="w-full bg-[#17153A] border border-white/[0.07] rounded-2xl px-4 py-2 text-[13px] text-[#EEEEFF] placeholder:text-[#6B6990] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
          />
          {remoteOnly && <input type="hidden" name="remote" value="true" />}
        </form>
      </div>

      {/* Grid */}
      {(jobs?.length ?? 0) === 0 ? (
        <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-12 text-center">
          <div className="text-[#6B6990] text-[13px]">No jobs found</div>
          <p className="text-[#3D3B60] text-[11px] mt-1">Try adjusting your filters or sync data</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {jobs?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
