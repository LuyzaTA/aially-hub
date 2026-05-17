import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/home/HeroSection'
import { NewsCard } from '@/components/cards/NewsCard'
import { formatSalary } from '@/lib/utils'
import { Newspaper, Briefcase, Rocket, Globe, ArrowRight } from 'lucide-react'
import type { Article, Job } from '@/types'

export const revalidate = 3600

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    { data: articles, count: articleCount },
    { data: featuredArticles },
    { data: jobs, count: jobCount },
    { data: startups, count: startupCount },
    { data: db2Jobs, count: db2Count },
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact' }).order('published_at', { ascending: false }).limit(6),
    supabase.from('articles').select('*').eq('is_featured', true).order('created_at', { ascending: false }).limit(1),
    supabase.from('jobs').select('*', { count: 'exact' }).order('posted_at', { ascending: false }).limit(5),
    supabase.from('startups').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(3),
    supabase.from('jobs').select('*', { count: 'exact' }).ilike('title', '%DB2%').order('posted_at', { ascending: false }),
  ])

  const featured = featuredArticles?.[0] ?? null

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroSection
        articleCount={articleCount ?? 0}
        jobCount={jobCount ?? 0}
        startupCount={startupCount ?? 0}
        db2Count={db2Count ?? 0}
      />

      {/* ── Metric cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-2">
        {[
          { label: 'Articles Tracked', value: articleCount ?? 0, icon: Newspaper, sub: 'AI & Data Engineering', accent: '#22D3EE' },
          { label: 'NL Jobs',           value: jobCount ?? 0,     icon: Briefcase, sub: 'Netherlands market',   accent: '#22C55E' },
          { label: 'Startups',          value: startupCount ?? 0, icon: Rocket,    sub: 'Radar tracked',        accent: '#A855F7' },
          { label: 'Market Focus',      value: 'NL',              icon: Globe,     sub: 'Netherlands',          accent: '#F97316' },
        ].map(({ label, value, icon: Icon, sub, accent }) => (
          <div
            key={label}
            className="relative rounded-2xl p-5 overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Glow */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity"
              style={{ background: accent }}
            />
            {/* Shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-[#5A5880] uppercase tracking-[0.15em]">{label}</span>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}14`, border: `1px solid ${accent}25` }}
                >
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
              </div>
              <div className="text-[#F0EFFF] text-[30px] font-black tabular-nums leading-none">{value}</div>
              <div className="text-[#5A5880] text-[11px] mt-1.5">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Divider label ────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
        <span className="text-[9px] font-mono text-[#3A3860] uppercase tracking-[0.2em]">Intelligence Feed</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
      </div>

      {/* ── Main grid: 2/3 + 1/3 (stacked on mobile) ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left col */}
        <div className="col-span-1 lg:col-span-2 space-y-5">

          {/* Featured article */}
          {featured ? (
            <div
              className="relative rounded-2xl p-6 overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.06))',
                border: '1px solid rgba(99,102,241,0.18)',
              }}
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#8B5CF6]/08 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6366F1]/06 blur-2xl rounded-full pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center gap-2 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-[0.18em]"
                    style={{ background: 'rgba(139,92,246,0.15)', color: '#A855F7', border: '1px solid rgba(139,92,246,0.25)' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#A855F7]" />
                    Featured
                  </div>
                  <div className="h-px w-24 bg-gradient-to-r from-[#8B5CF6]/40 to-transparent" />
                </div>
                <h2 className="text-[#F0EFFF] text-[20px] font-bold leading-snug mb-2 max-w-2xl">
                  {featured.title}
                </h2>
                {(featured as Article).summary && (
                  <p className="text-[#5A5880] text-[13px] leading-relaxed max-w-2xl mb-6 line-clamp-2">
                    {(featured as Article).summary}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(featured as Article).source && (
                      <span className="text-[#5A5880] text-[11px] font-mono">{(featured as Article).source}</span>
                    )}
                    <span className="text-[#3A3860]">·</span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest"
                      style={{ color: '#A855F7' }}>
                      {(featured as Article).category}
                    </span>
                  </div>
                  {(featured as Article).url && (
                    <a
                      href={(featured as Article).url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                        boxShadow: '0 0 18px rgba(99,102,241,0.3)',
                      }}
                    >
                      Read Article
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl p-10 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="text-[#5A5880] text-[13px] mb-1">No featured articles yet</div>
              <p className="text-[#3A3860] text-[11px]">
                Click <span className="text-[#6366F1]">Sync Data</span> in the sidebar to fetch intelligence
              </p>
            </div>
          )}

          {/* Latest news */}
          {(articles?.length ?? 0) > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-[#F0EFFF] font-bold text-[15px]">Latest News</h2>
                  <div className="text-[9px] font-mono text-[#3A3860] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] px-2 py-0.5 rounded-full">
                    {articles?.length} articles
                  </div>
                </div>
                <a href="/news" className="flex items-center gap-1 text-[#6366F1] text-[12px] hover:text-[#A78BFA] transition-colors font-medium">
                  View all <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles?.map((article) => (
                  <NewsCard key={article.id} article={article as Article} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right col */}
        <div className="space-y-5">

          {/* Startup Radar */}
          {(startups?.length ?? 0) > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#F0EFFF] font-bold text-[15px]">Startup Radar</h2>
                <a href="/startups" className="flex items-center gap-1 text-[#A855F7] text-[12px] hover:text-[#C084FC] transition-colors font-medium">
                  View all <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div
                className="p-[1px] rounded-2xl"
                style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.5),rgba(236,72,153,0.35),rgba(139,92,246,0.4))' }}
              >
                <div
                  className="rounded-2xl p-4 space-y-1"
                  style={{ background: 'rgba(10,9,26,0.95)' }}
                >
                  {startups?.map((startup) => {
                    const initials = startup.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
                    return (
                      <div
                        key={startup.id}
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-[rgba(255,255,255,0.04)]"
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#A855F7] font-black text-[11px] flex-shrink-0"
                          style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.22)' }}
                        >
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#F0EFFF] text-[13px] font-semibold truncate">{startup.name}</div>
                          <div className="text-[#5A5880] text-[10px]">{startup.stage} · {startup.country}</div>
                        </div>
                        {startup.funding_amount && (
                          <div className="text-[#22C55E] text-[12px] font-bold flex-shrink-0">{startup.funding_amount}</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <a
                  href="/startups"
                  className="flex items-center justify-center py-2.5 rounded-xl text-[12px] font-medium transition-all hover:text-[#F0EFFF] text-[#5A5880]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  Details
                </a>
                <a
                  href="/jobs"
                  className="flex items-center justify-center py-2.5 rounded-xl text-[12px] font-semibold text-white transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                    boxShadow: '0 0 16px rgba(99,102,241,0.25)',
                  }}
                >
                  View Jobs ↗
                </a>
              </div>
            </div>
          )}

          {/* Recent NL Jobs */}
          {(jobs?.length ?? 0) > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#F0EFFF] font-bold text-[14px]">Recent NL Jobs</h2>
                <a href="/jobs" className="flex items-center gap-1 text-[#6366F1] text-[12px] font-medium hover:text-[#A78BFA] transition-colors">
                  All <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div>
                {jobs?.map((job, i) => {
                  const initials = (job as Job).company.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
                  const isLast = i === (jobs?.length ?? 0) - 1
                  return (
                    <div
                      key={(job as Job).id}
                      className={`flex items-center gap-3 py-3 transition-colors hover:bg-[rgba(255,255,255,0.02)] -mx-2 px-2 rounded-xl ${!isLast ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6366F1] font-bold text-[11px] flex-shrink-0"
                        style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#F0EFFF] text-[12px] font-semibold truncate">{(job as Job).title}</div>
                        <div className="text-[#5A5880] text-[10px]">{(job as Job).company}</div>
                      </div>
                      {((job as Job).salary_min || (job as Job).salary_max) ? (
                        <span className="text-[#22C55E] text-[12px] font-bold flex-shrink-0 whitespace-nowrap">
                          {formatSalary((job as Job).salary_min, (job as Job).salary_max, (job as Job).currency)}
                        </span>
                      ) : (
                        <span className="text-[#3A3860] text-[11px] flex-shrink-0">TBD</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── DB2 LUW Section ───────────────────────────────────────────── */}
      {(db2Jobs?.length ?? 0) > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-[11px]"
                style={{
                  background: 'rgba(0,207,255,0.12)',
                  border: '1px solid rgba(0,207,255,0.3)',
                  color: '#00CFFF',
                  boxShadow: '0 0 12px rgba(0,207,255,0.15)',
                }}
              >
                DB2
              </div>
              <div>
                <h2 className="text-[#F0EFFF] font-bold text-[16px] leading-none">DB2 LUW — Open Positions</h2>
                <p className="text-[#5A5880] text-[11px] mt-0.5">
                  {db2Jobs?.length} specialist role{(db2Jobs?.length ?? 0) !== 1 ? 's' : ''} · Netherlands
                </p>
              </div>
            </div>
            <a href="/db2" className="flex items-center gap-1 text-[#00CFFF] text-[12px] font-medium hover:text-[#4DD9FF] transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div
            className="p-[1px] rounded-2xl"
            style={{ background: 'linear-gradient(90deg, rgba(0,207,255,0.5), rgba(0,153,204,0.3), rgba(0,207,255,0.5))' }}
          >
            <div
              className="rounded-2xl p-1"
              style={{ background: '#07061A' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
                {db2Jobs?.map((job) => {
                  const initials = (job as Job).company.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
                  return (
                    <div
                      key={(job as Job).id}
                      className="rounded-xl p-4 transition-all hover:scale-[1.01] group"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[11px] flex-shrink-0"
                          style={{ background: 'rgba(0,207,255,0.12)', border: '1px solid rgba(0,207,255,0.25)', color: '#00CFFF' }}
                        >
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#F0EFFF] text-[13px] font-semibold leading-tight">{(job as Job).title}</div>
                          <div className="text-[#5A5880] text-[10px] mt-0.5">{(job as Job).company} · {(job as Job).location}</div>
                        </div>
                        {(job as Job).is_remote && (
                          <span
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md flex-shrink-0"
                            style={{ color: '#22C55E', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
                          >
                            Remote
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          {((job as Job).salary_min || (job as Job).salary_max) && (
                            <span className="text-[#22C55E] text-[12px] font-bold">
                              {formatSalary((job as Job).salary_min, (job as Job).salary_max, (job as Job).currency)}
                            </span>
                          )}
                        </div>
                        {(job as Job).apply_url && (
                          <a
                            href={(job as Job).apply_url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold px-3 py-1 rounded-lg transition-all hover:scale-[1.04]"
                            style={{
                              color: '#00CFFF',
                              background: 'rgba(0,207,255,0.1)',
                              border: '1px solid rgba(0,207,255,0.3)',
                            }}
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
