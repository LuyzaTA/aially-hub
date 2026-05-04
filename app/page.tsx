import { createClient } from '@/lib/supabase/server'
import { MetricCard } from '@/components/cards/MetricCard'
import { NewsCard } from '@/components/cards/NewsCard'
import { formatSalary } from '@/lib/utils'
import { Newspaper, Briefcase, Rocket, Globe } from 'lucide-react'

export const revalidate = 3600

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    { data: articles, count: articleCount },
    { data: featuredArticles },
    { data: jobs, count: jobCount },
    { data: startups, count: startupCount },
    { data: db2Jobs },
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact' }).order('published_at', { ascending: false }).limit(6),
    supabase.from('articles').select('*').eq('is_featured', true).order('created_at', { ascending: false }).limit(1),
    supabase.from('jobs').select('*', { count: 'exact' }).order('posted_at', { ascending: false }).limit(5),
    supabase.from('startups').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(3),
    supabase.from('jobs').select('*').ilike('title', '%DB2%').order('posted_at', { ascending: false }),
  ])

  const featured = featuredArticles?.[0] ?? null

  return (
    <div>
      {/* Page title */}
      <div className="mb-7">
        <h1 className="text-[22px] font-bold text-[#EEEEFF]">Overview</h1>
        <p className="text-[#6B6990] text-[13px] mt-0.5">
          Global AI &amp; Data Engineering Intelligence — Netherlands Focus
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <MetricCard
          label="Articles Tracked"
          value={articleCount ?? 0}
          icon={<Newspaper className="w-4 h-4" />}
          sub="AI & Data Engineering"
          glowColor="bg-cyan-500"
        />
        <MetricCard
          label="NL Jobs"
          value={jobCount ?? 0}
          icon={<Briefcase className="w-4 h-4" />}
          sub="Netherlands market"
          change="Active listings"
          positive
          glowColor="bg-emerald-500"
        />
        <MetricCard
          label="Startups"
          value={startupCount ?? 0}
          icon={<Rocket className="w-4 h-4" />}
          sub="Radar tracked"
          glowColor="bg-purple-500"
        />
        <MetricCard
          label="Market Focus"
          value="NL"
          icon={<Globe className="w-4 h-4" />}
          sub="Netherlands"
          change="Top EU AI hub"
          positive
          glowColor="bg-orange-500"
        />
      </div>

      {/* Main layout: 2/3 left + 1/3 right */}
      <div className="grid grid-cols-3 gap-5">

        {/* Left: Featured + News grid */}
        <div className="col-span-2 space-y-5">

          {/* Featured article */}
          {featured ? (
            <div className="relative rounded-2xl bg-gradient-to-br from-[#17153A] to-[#1D1B42] border border-white/[0.07] p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#8B5CF6]/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#6366F1]/8 blur-2xl rounded-full pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B5CF6] uppercase">Featured</span>
                  <div className="h-px w-20 bg-gradient-to-r from-[#8B5CF6]/50 to-transparent" />
                </div>
                <h2 className="text-[#EEEEFF] text-[19px] font-bold leading-snug mb-2 max-w-2xl">
                  {featured.title}
                </h2>
                {featured.summary && (
                  <p className="text-[#6B6990] text-[13px] leading-relaxed max-w-2xl mb-5 line-clamp-2">
                    {featured.summary}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {featured.source && (
                      <span className="text-[#6B6990] text-[11px]">{featured.source}</span>
                    )}
                    <span className="text-[#3D3B60] text-[11px]">•</span>
                    <span className="text-[#6366F1] text-[11px] font-semibold uppercase tracking-wide">
                      {featured.category}
                    </span>
                  </div>
                  {featured.url && (
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-semibold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-4 py-1.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
                    >
                      Read Article →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-10 text-center">
              <div className="text-[#6B6990] text-[13px] mb-1">No featured articles yet</div>
              <p className="text-[#3D3B60] text-[11px]">
                Click &quot;Sync Data&quot; in the sidebar to fetch the latest intelligence
              </p>
            </div>
          )}

          {/* Latest news */}
          {(articles?.length ?? 0) > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#EEEEFF] font-bold text-[16px]">Latest News</h2>
                <a href="/news" className="text-[#8B5CF6] text-[12px] hover:underline font-medium">
                  View all →
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {articles?.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="space-y-5">

          {/* Startup radar — gradient border */}
          {(startups?.length ?? 0) > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#EEEEFF] font-bold text-[16px]">Startup Radar</h2>
                <a href="/startups" className="text-[#8B5CF6] text-[12px] hover:underline font-medium">
                  View All
                </a>
              </div>
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#F97316] via-[#EC4899] to-[#8B5CF6]">
                <div className="rounded-2xl bg-[#1D1B42] p-4 space-y-2">
                  {startups?.map((startup) => {
                    const initials = startup.name
                      .split(' ')
                      .map((w: string) => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()
                    return (
                      <div
                        key={startup.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1]/30 to-[#8B5CF6]/30 border border-[#6366F1]/30 flex items-center justify-center text-[#8B5CF6] font-bold text-[12px] flex-shrink-0">
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#EEEEFF] text-[13px] font-semibold truncate">
                            {startup.name}
                          </div>
                          <div className="text-[#6B6990] text-[10px]">
                            {startup.stage} · {startup.country}
                          </div>
                        </div>
                        {startup.funding_amount && (
                          <div className="text-[#22C55E] text-[12px] font-bold flex-shrink-0">
                            {startup.funding_amount}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href="/startups"
                  className="flex items-center justify-center py-2.5 rounded-xl bg-[#17153A] border border-white/[0.07] text-[#6B6990] text-[12px] font-medium hover:text-[#EEEEFF] transition-colors"
                >
                  Details
                </a>
                <a
                  href="/jobs"
                  className="flex items-center justify-center py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-[12px] font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
                >
                  View Jobs ↗
                </a>
              </div>
            </div>
          )}

          {/* Recent NL Jobs — like Transactions */}
          {(jobs?.length ?? 0) > 0 && (
            <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#EEEEFF] font-bold text-[14px]">Recent NL Jobs</h2>
                <a href="/jobs" className="text-[#8B5CF6] text-[12px] font-medium hover:underline">
                  View All
                </a>
              </div>
              <div>
                {jobs?.map((job, i) => {
                  const initials = job.company
                    .split(' ')
                    .map((w: string) => w[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                  const isLast = i === (jobs?.length ?? 0) - 1
                  return (
                    <div
                      key={job.id}
                      className={`flex items-center gap-3 py-3 ${!isLast ? 'border-b border-white/[0.05]' : ''}`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#211F4A] border border-white/[0.07] flex items-center justify-center text-[#8B5CF6] font-bold text-[11px] flex-shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#EEEEFF] text-[12px] font-semibold truncate">
                          {job.title}
                        </div>
                        <div className="text-[#6B6990] text-[10px]">{job.company}</div>
                      </div>
                      {(job.salary_min || job.salary_max) ? (
                        <span className="text-[#22C55E] text-[12px] font-bold flex-shrink-0 whitespace-nowrap">
                          {formatSalary(job.salary_min, job.salary_max, job.currency)}
                        </span>
                      ) : (
                        <span className="text-[#6B6990] text-[11px] flex-shrink-0">TBD</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── DB2 LUW Section ─────────────────────────────────────────────────── */}
      {(db2Jobs?.length ?? 0) > 0 && (
        <section className="mt-8">
          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#006699]/20 border border-[#006699]/40 flex items-center justify-center flex-shrink-0">
                <span className="text-[#4DB8FF] text-[11px] font-bold">DB2</span>
              </div>
              <div>
                <h2 className="text-[#EEEEFF] font-bold text-[16px] leading-none">
                  DB2 LUW — Open Positions
                </h2>
                <p className="text-[#6B6990] text-[11px] mt-0.5">
                  {db2Jobs?.length} specialist role{(db2Jobs?.length ?? 0) !== 1 ? 's' : ''} · Netherlands
                </p>
              </div>
            </div>
            <a
              href="/jobs?q=DB2"
              className="text-[#4DB8FF] text-[12px] font-medium hover:underline"
            >
              View all →
            </a>
          </div>

          {/* Jobs grid */}
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#006699]/60 via-[#0099CC]/40 to-[#006699]/60">
            <div className="rounded-2xl bg-[#0D0C22] p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
                {db2Jobs?.map((job) => {
                  const initials = job.company
                    .split(' ')
                    .map((w: string) => w[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                  return (
                    <div
                      key={job.id}
                      className="bg-[#13112E] rounded-xl p-4 hover:bg-[#17153A] transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#006699]/20 border border-[#006699]/40 flex items-center justify-center text-[#4DB8FF] font-bold text-[11px] flex-shrink-0">
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#EEEEFF] text-[13px] font-semibold leading-tight">
                            {job.title}
                          </div>
                          <div className="text-[#6B6990] text-[10px] mt-0.5">{job.company} · {job.location}</div>
                        </div>
                        {job.is_remote && (
                          <span className="text-[9px] font-semibold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/25 px-1.5 py-0.5 rounded-md flex-shrink-0">
                            Remote
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {(job.salary_min || job.salary_max) && (
                            <span className="text-[#22C55E] text-[12px] font-bold">
                              {formatSalary(job.salary_min, job.salary_max, job.currency)}
                            </span>
                          )}
                          {job.source && (
                            <span className="text-[9px] text-[#6B6990] bg-white/[0.04] border border-white/[0.07] px-1.5 py-0.5 rounded-md">
                              {job.source}
                            </span>
                          )}
                        </div>
                        {job.apply_url && (
                          <a
                            href={job.apply_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold text-[#4DB8FF] bg-[#006699]/15 border border-[#006699]/40 px-3 py-1 rounded-lg hover:bg-[#006699]/30 transition-colors"
                          >
                            Apply →
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
