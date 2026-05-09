import { createClient } from '@/lib/supabase/server'
import { JobCard } from '@/components/cards/JobCard'
import { Database } from 'lucide-react'

export const revalidate = 3600

interface Db2JobsPageProps {
  searchParams: Promise<{ seniority?: string; remote?: string }>
}

export default async function Db2JobsPage({ searchParams }: Db2JobsPageProps) {
  const params = await searchParams
  const seniority = params.seniority ?? 'all'
  const remoteOnly = params.remote === 'true'

  const supabase = await createClient()

  let req = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .or('title.ilike.%DB2%,skills.cs.{DB2}')
    .order('posted_at', { ascending: false })

  if (seniority !== 'all') req = req.eq('seniority', seniority)
  if (remoteOnly) req = req.eq('is_remote', true)

  const { data: jobs, count } = await req

  const seniorityOptions = [
    { value: 'all',    label: 'All Levels' },
    { value: 'junior', label: 'Junior' },
    { value: 'mid',    label: 'Mid' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead',   label: 'Lead' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-7 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#006699]/20 border border-[#006699]/40 flex items-center justify-center flex-shrink-0">
          <Database className="w-5 h-5 text-[#4DB8FF]" />
        </div>
        <div>
          <h1 className="text-[22px] font-bold text-[#EEEEFF]">DB2 LUW Jobs</h1>
          <p className="text-[#6B6990] text-[13px] mt-0.5">
            {count ?? 0} open position{(count ?? 0) !== 1 ? 's' : ''} · Netherlands · Direct apply links
          </p>
        </div>
        <a
          href="/db2"
          className="ml-auto text-[12px] text-[#4DB8FF] hover:underline flex items-center gap-1"
        >
          ← DB2 Intelligence
        </a>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-7 flex-wrap">
        <div className="flex gap-1 bg-[#17153A] border border-white/[0.07] rounded-2xl p-1">
          {seniorityOptions.map(({ value, label }) => (
            <a
              key={value}
              href={`/db2-jobs?seniority=${value}${remoteOnly ? '&remote=true' : ''}`}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition-all ${
                seniority === value
                  ? 'bg-gradient-to-r from-[#006699] to-[#0099CC] text-white shadow-lg shadow-cyan-500/20'
                  : 'text-[#6B6990] hover:text-[#A8A6CC]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href={`/db2-jobs?seniority=${seniority}&remote=${!remoteOnly}`}
          className={`px-3.5 py-2 rounded-xl text-[12px] font-medium border transition-all ${
            remoteOnly
              ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/25'
              : 'bg-[#17153A] text-[#6B6990] border-white/[0.07] hover:text-[#A8A6CC]'
          }`}
        >
          {remoteOnly ? '✓ ' : ''}Remote only
        </a>
      </div>

      {/* Grid */}
      {(jobs?.length ?? 0) === 0 ? (
        <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-12 text-center">
          <Database className="w-8 h-8 text-[#3D3B60] mx-auto mb-3" />
          <div className="text-[#6B6990] text-[13px] mb-1">No DB2 positions found</div>
          <p className="text-[#3D3B60] text-[11px]">Click &quot;Sync Data&quot; in the sidebar to fetch the latest listings</p>
        </div>
      ) : (
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#006699]/60 via-[#0099CC]/40 to-[#006699]/60">
          <div className="rounded-2xl bg-[#0D0C22] p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              {jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
