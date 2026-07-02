import { createClient } from '@/lib/supabase/server'
import { JobCard } from '@/components/cards/JobCard'

export const revalidate = 3600

// General roles are searched junior-only (DB2 DBA search is unrestricted but is a
// separate concern surfaced on /db2), so Mid/Senior/Lead/Principal aren't offered here.
const seniorityOptions = [
  { value: 'all',    label: 'All Levels' },
  { value: 'junior', label: 'Junior' },
]

interface JobsPageProps {
  searchParams: Promise<{ seniority?: string; remote?: string; q?: string }>
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams
  const seniority = params.seniority ?? 'all'
  const remoteOnly = params.remote === 'true'
  const query = params.q ?? ''

  const supabase = await createClient()

  let req = supabase
    .from('jobs')
    .select('*')
    .in('source', ['Adzuna', 'LinkedIn', 'Indeed'])
    .ilike('location', '%Netherlands%')
    .order('posted_at', { ascending: false })
    .limit(60)

  if (seniority !== 'all') req = req.eq('seniority', seniority)
  if (remoteOnly) req = req.eq('is_remote', true)
  if (query) req = req.or(`title.ilike.%${query}%,company.ilike.%${query}%`)

  const { data: jobs } = await req
  const { count: totalCount } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .in('source', ['Adzuna', 'LinkedIn', 'Indeed'])
    .ilike('location', '%Netherlands%')

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-[22px] font-bold text-[#EEEEFF]">NL Jobs</h1>
        <p className="text-[#6B6990] text-[13px] mt-0.5">
          {totalCount} open positions · Netherlands · AI &amp; Data Engineering
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-7 flex-wrap">
        <div className="flex gap-1 bg-[#17153A] border border-white/[0.07] rounded-2xl p-1">
          {seniorityOptions.map(({ value, label }) => (
            <a
              key={value}
              href={`/jobs?seniority=${value}${remoteOnly ? '&remote=true' : ''}${query ? `&q=${query}` : ''}`}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition-all ${
                seniority === value
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-indigo-500/20'
                  : 'text-[#6B6990] hover:text-[#A8A6CC]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href={`/jobs?seniority=${seniority}&remote=${!remoteOnly}${query ? `&q=${query}` : ''}`}
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
          {seniority !== 'all' && <input type="hidden" name="seniority" value={seniority} />}
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
