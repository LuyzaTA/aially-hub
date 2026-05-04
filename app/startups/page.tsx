import { createClient } from '@/lib/supabase/server'
import { StartupCard } from '@/components/cards/StartupCard'

export const revalidate = 3600

const stageOptions = [
  { value: 'all',      label: 'All Stages' },
  { value: 'pre-seed', label: 'Pre-Seed' },
  { value: 'seed',     label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b', label: 'Series B' },
  { value: 'series-c', label: 'Series C+' },
]

interface StartupsPageProps {
  searchParams: Promise<{ stage?: string; q?: string }>
}

export default async function StartupsPage({ searchParams }: StartupsPageProps) {
  const params = await searchParams
  const stage = params.stage ?? 'all'
  const query = params.q ?? ''

  const supabase = await createClient()

  let req = supabase
    .from('startups')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(60)

  if (stage !== 'all') req = req.eq('stage', stage)
  if (query) req = req.ilike('name', `%${query}%`)

  const { data: startups } = await req
  const { count: totalCount } = await supabase
    .from('startups')
    .select('*', { count: 'exact', head: true })

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-[22px] font-bold text-[#EEEEFF]">Startups</h1>
        <p className="text-[#6B6990] text-[13px] mt-0.5">
          {totalCount} companies tracked · AI &amp; Data infrastructure
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-7 flex-wrap">
        <div className="flex gap-1 bg-[#17153A] border border-white/[0.07] rounded-2xl p-1">
          {stageOptions.map(({ value, label }) => (
            <a
              key={value}
              href={`/startups?stage=${value}${query ? `&q=${query}` : ''}`}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition-all ${
                stage === value
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-indigo-500/20'
                  : 'text-[#6B6990] hover:text-[#A8A6CC]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <form method="GET" action="/startups" className="flex-1 min-w-48 max-w-sm">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search startups…"
            className="w-full bg-[#17153A] border border-white/[0.07] rounded-2xl px-4 py-2 text-[13px] text-[#EEEEFF] placeholder:text-[#6B6990] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
          />
          {stage !== 'all' && <input type="hidden" name="stage" value={stage} />}
        </form>
      </div>

      {/* Grid */}
      {(startups?.length ?? 0) === 0 ? (
        <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-12 text-center">
          <div className="text-[#6B6990] text-[13px]">No startups found</div>
          <p className="text-[#3D3B60] text-[11px] mt-1">Try adjusting your filters or sync data</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {startups?.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      )}
    </div>
  )
}
