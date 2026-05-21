import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { JobCard } from '@/components/cards/JobCard'
import type { Db2Release } from '@/types'
import { ShieldAlert, Package, Wrench, Megaphone, ExternalLink, Database } from 'lucide-react'
import { SeedReleasesButton } from '@/components/db2/SeedReleasesButton'

export const revalidate = 3600

interface Db2PageProps {
  searchParams: Promise<{ seniority?: string; remote?: string; country?: string }>
}

const EDITIONS = [
  {
    name: 'Community Edition',
    price: 'Free',
    limits: '4 cores · 16 GB RAM · 100 GB storage',
    highlight: false,
    features: ['Core relational engine', 'JSON support', 'REST API', 'Basic HA'],
  },
  {
    name: 'Standard Edition',
    price: 'Per core',
    limits: 'Unlimited cores & RAM',
    highlight: false,
    features: ['All Community features', 'pureScale (add-on)', 'Compression', 'Advanced backup'],
  },
  {
    name: 'Advanced Edition',
    price: 'Per core',
    limits: 'Unlimited',
    highlight: true,
    features: ['All Standard features', 'BLU Acceleration', 'In-database ML', 'Time Travel Query', 'RCAC'],
  },
  {
    name: 'Adv. Enterprise Server',
    price: 'Per core',
    limits: 'Unlimited + pureScale',
    highlight: false,
    features: ['All Advanced features', 'pureScale clustering', 'Workload mgr', 'Federation', 'Homogeneous replication'],
  },
]

const TYPE_META: Record<Db2Release['release_type'], { label: string; color: string; bg: string; border: string; Icon: React.ElementType }> = {
  release:      { label: 'Release',      color: 'text-[#4DB8FF]',  bg: 'bg-[#006699]/15',  border: 'border-[#006699]/40', Icon: Package },
  fixpack:      { label: 'Fix Pack',     color: 'text-[#22C55E]',  bg: 'bg-[#22C55E]/10',  border: 'border-[#22C55E]/25', Icon: Wrench },
  announcement: { label: 'Announcement', color: 'text-[#F59E0B]',  bg: 'bg-[#F59E0B]/10',  border: 'border-[#F59E0B]/25', Icon: Megaphone },
  security:     { label: 'Security',     color: 'text-[#EF4444]',  bg: 'bg-[#EF4444]/10',  border: 'border-[#EF4444]/25', Icon: ShieldAlert },
}

const SENIORITY_OPTIONS = [
  { value: 'all',    label: 'All Levels' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid',    label: 'Mid' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead',   label: 'Lead' },
]

const COUNTRY_OPTIONS = [
  { value: 'all',            label: 'All Countries' },
  { value: 'Netherlands',    label: 'Netherlands'   },
  { value: 'United Kingdom', label: 'UK'            },
  { value: 'Germany',        label: 'Germany'       },
  { value: 'France',         label: 'France'        },
  { value: 'Poland',         label: 'Poland'        },
  { value: 'Spain',          label: 'Spain'         },
  { value: 'Italy',          label: 'Italy'         },
  { value: 'Austria',        label: 'Austria'       },
  { value: 'Brazil',         label: 'Brazil'        },
]

export default async function Db2Page({ searchParams }: Db2PageProps) {
  const params = await searchParams
  const seniority = params.seniority ?? 'all'
  const remoteOnly = params.remote === 'true'
  const country = params.country ?? 'all'

  const supabase = await createClient()

  let jobsReq = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .or('title.ilike.%DB2%,skills.cs.{DB2}')
    .not('title', 'ilike', '%mainframe%')
    .not('title', 'ilike', '%z/os%')
    .not('title', 'ilike', '%zos%')
    .not('title', 'ilike', '%cobol%')
    .order('posted_at', { ascending: false })

  if (seniority !== 'all') jobsReq = jobsReq.eq('seniority', seniority)
  if (remoteOnly) jobsReq = jobsReq.eq('is_remote', true)
  if (country !== 'all') jobsReq = jobsReq.ilike('location', `%${country}%`)

  const [
    { data: releases },
    { data: db2Jobs, count: db2Count },
    { data: allDb2Locations },
  ] = await Promise.all([
    supabase.from('db2_releases').select('*').order('release_date', { ascending: false }),
    jobsReq,
    supabase.from('jobs').select('location')
      .or('title.ilike.%DB2%,skills.cs.{DB2}')
      .not('title', 'ilike', '%mainframe%')
      .not('title', 'ilike', '%z/os%')
      .not('title', 'ilike', '%zos%')
      .not('title', 'ilike', '%cobol%'),
  ])

  const latestFP = releases?.find(r => r.release_type === 'fixpack')
  const latestRelease = releases?.find(r => r.release_type === 'release')

  const locations = allDb2Locations ?? []
  const countForCountry = (value: string) =>
    value === 'all'
      ? locations.length
      : locations.filter(j => j.location?.toLowerCase().includes(value.toLowerCase())).length

  return (
    <div>
      {/* Header */}
      <div className="mb-7 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#006699]/20 border border-[#006699]/40 flex items-center justify-center flex-shrink-0">
          <Database className="w-5 h-5 text-[#4DB8FF]" />
        </div>
        <div>
          <h1 className="text-[22px] font-bold text-[#EEEEFF]">IBM Db2 LUW</h1>
          <p className="text-[#6B6990] text-[13px] mt-0.5">
            Version intelligence · Editions · Open positions · Europe &amp; Brazil
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-4">
          <div className="text-[#6B6990] text-[10px] tracking-wide uppercase mb-1">Current LTS</div>
          <div className="text-[#4DB8FF] text-[22px] font-bold leading-tight">{latestRelease?.version ?? '11.5'}</div>
          <div className="text-[#6B6990] text-[11px] mt-0.5">Long-Term Support</div>
        </div>
        <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-4">
          <div className="text-[#6B6990] text-[10px] tracking-wide uppercase mb-1">Latest Fix Pack</div>
          <div className="text-[#22C55E] text-[22px] font-bold leading-tight">{latestFP?.version ?? '—'}</div>
          <div className="text-[#6B6990] text-[11px] mt-0.5">
            {latestFP?.release_date ? formatDate(latestFP.release_date) : 'N/A'}
          </div>
        </div>
        <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-4">
          <div className="text-[#6B6990] text-[10px] tracking-wide uppercase mb-1">Open Positions</div>
          <div className="text-[#EEEEFF] text-[22px] font-bold leading-tight">{db2Count ?? 0}</div>
          <div className="text-[#6B6990] text-[11px] mt-0.5">Europe &amp; Brazil</div>
        </div>
        <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-4">
          <div className="text-[#6B6990] text-[10px] tracking-wide uppercase mb-1">Platforms</div>
          <div className="text-[#EEEEFF] text-[22px] font-bold leading-tight">4</div>
          <div className="text-[#6B6990] text-[11px] mt-0.5">Linux · Windows · AIX · Solaris</div>
        </div>
      </div>

      {/* Open DB2 positions */}
      <div className="mb-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#006699]/20 border border-[#006699]/40 flex items-center justify-center flex-shrink-0">
              <span className="text-[#4DB8FF] text-[11px] font-bold">DB2</span>
            </div>
            <div>
              <h2 className="text-[#EEEEFF] font-bold text-[16px] leading-none">Open DB2 Positions</h2>
              <p className="text-[#6B6990] text-[11px] mt-0.5">
                {db2Count ?? 0} live role{(db2Count ?? 0) !== 1 ? 's' : ''} · Europe &amp; Brazil · Direct apply links
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2 w-full lg:w-auto">
            {/* Row 1: seniority + remote */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <div className="flex gap-1 bg-[#17153A] border border-white/[0.07] rounded-2xl p-1 flex-shrink-0">
                {SENIORITY_OPTIONS.map(({ value, label }) => (
                  <a
                    key={value}
                    href={`/db2?seniority=${value}&remote=${remoteOnly}&country=${country}`}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all whitespace-nowrap flex-shrink-0 ${
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
                href={`/db2?seniority=${seniority}&remote=${!remoteOnly}&country=${country}`}
                className={`px-3 py-2 rounded-xl text-[11px] font-medium border transition-all whitespace-nowrap flex-shrink-0 ${
                  remoteOnly
                    ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/25'
                    : 'bg-[#17153A] text-[#6B6990] border-white/[0.07] hover:text-[#A8A6CC]'
                }`}
              >
                {remoteOnly ? '✓ ' : ''}Remote only
              </a>
            </div>
            {/* Row 2: country */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {COUNTRY_OPTIONS.map(({ value, label }) => {
                const n = countForCountry(value)
                const active = country === value
                return (
                  <a
                    key={value}
                    href={`/db2?seniority=${seniority}&remote=${remoteOnly}&country=${value}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all whitespace-nowrap flex-shrink-0 ${
                      active
                        ? 'bg-[#006699]/20 text-[#4DB8FF] border-[#006699]/50'
                        : 'bg-[#17153A] text-[#6B6990] border-white/[0.07] hover:text-[#A8A6CC]'
                    }`}
                  >
                    {label}
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                        active
                          ? 'bg-[#006699]/40 text-[#4DB8FF]'
                          : 'bg-white/[0.10] text-[#A8A6CC]'
                      }`}
                    >
                      {n}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {(db2Jobs?.length ?? 0) === 0 ? (
          <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-10 text-center">
            <div className="text-[#6B6990] text-[13px] mb-1">No DB2 positions found</div>
            <p className="text-[#3D3B60] text-[11px]">Click <span className="text-[#4DB8FF]">Sync</span> in the sidebar to fetch the latest listings from Europe &amp; Brazil</p>
          </div>
        ) : (
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#006699]/60 via-[#0099CC]/40 to-[#006699]/60">
            <div className="rounded-2xl bg-[#0D0C22] p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {db2Jobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Releases + Editions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">

        {/* Release timeline — left 2/3 */}
        <div className="col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h2 className="text-[#EEEEFF] font-bold text-[16px]">IBM Official Releases &amp; Bulletins</h2>
            <div className="flex items-center gap-2 flex-shrink-0">
              <SeedReleasesButton compact />
              <a
                href="https://www.ibm.com/support/pages/db2-linux-unix-and-windows-fix-pack-central"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#4DB8FF] text-[12px] font-medium hover:underline whitespace-nowrap"
              >
                IBM Support <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {(releases?.length ?? 0) === 0 ? (
            <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-8 text-center">
              <Database className="w-8 h-8 text-[#3D3B60] mx-auto mb-3" />
              <div className="text-[#6B6990] text-[13px] mb-1">No release data yet</div>
              <p className="text-[#3D3B60] text-[11px]">Click the button to load IBM Db2 release history</p>
              <SeedReleasesButton />
            </div>
          ) : (
            <div className="space-y-3">
              {releases?.map((release) => {
                const meta = TYPE_META[release.release_type as Db2Release['release_type']] ?? TYPE_META.announcement
                const { Icon } = meta
                return (
                  <div
                    key={release.id}
                    className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-5 hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg ${meta.bg} border ${meta.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${meta.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${meta.color} ${meta.bg} ${meta.border}`}>
                            {meta.label}
                          </span>
                          <span className="text-[#EEEEFF] text-[13px] font-semibold">{release.title}</span>
                        </div>
                        {release.summary && (
                          <p className="text-[#6B6990] text-[12px] leading-relaxed mb-3">
                            {release.summary}
                          </p>
                        )}
                        {release.features && release.features.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {release.features.slice(0, 5).map((f: string) => (
                              <span key={f} className="text-[10px] text-[#6B6990] bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-md">
                                {f}
                              </span>
                            ))}
                            {release.features.length > 5 && (
                              <span className="text-[10px] text-[#3D3B60] px-1">+{release.features.length - 5} more</span>
                            )}
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[#3D3B60] text-[11px]">
                              {release.release_date ? formatDate(release.release_date) : 'Date N/A'}
                            </span>
                            {release.platforms?.length > 0 && (
                              <span className="text-[#3D3B60] text-[11px] hidden sm:inline">
                                {release.platforms.join(' · ')}
                              </span>
                            )}
                            {release.platforms?.length > 0 && (
                              <span className="text-[#3D3B60] text-[11px] sm:hidden">
                                {release.platforms.slice(0, 2).join(' · ')}{release.platforms.length > 2 ? ' +more' : ''}
                              </span>
                            )}
                          </div>
                          {release.url && (
                            <a
                              href={release.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`self-start sm:self-auto flex items-center gap-1 text-[11px] font-semibold ${meta.color} ${meta.bg} border ${meta.border} px-3 py-1 rounded-lg hover:opacity-80 transition-opacity`}
                            >
                              IBM Docs <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Editions — right 1/3 */}
        <div>
          <h2 className="text-[#EEEEFF] font-bold text-[16px] mb-4">Editions (Db2 11.5)</h2>
          <div className="space-y-3">
            {EDITIONS.map((edition) => (
              <div
                key={edition.name}
                className={`rounded-2xl p-4 border transition-colors ${
                  edition.highlight
                    ? 'bg-gradient-to-br from-[#006699]/20 to-[#0099CC]/10 border-[#006699]/50'
                    : 'bg-[#17153A] border-white/[0.07]'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-[#EEEEFF] text-[13px] font-semibold">{edition.name}</div>
                    <div className="text-[#6B6990] text-[10px] mt-0.5">{edition.limits}</div>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${
                    edition.price === 'Free'
                      ? 'text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/25'
                      : 'text-[#4DB8FF] bg-[#006699]/15 border border-[#006699]/40'
                  }`}>
                    {edition.price}
                  </span>
                </div>
                <ul className="space-y-1">
                  {edition.features.map(f => (
                    <li key={f} className="flex items-center gap-1.5 text-[#6B6990] text-[11px]">
                      <span className="w-1 h-1 rounded-full bg-[#006699]/60 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href="https://www.ibm.com/products/db2/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#17153A] border border-white/[0.07] text-[#6B6990] text-[12px] font-medium hover:text-[#4DB8FF] hover:border-[#006699]/40 transition-colors"
            >
              IBM pricing page <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
