import type { RoleSalary, SkillDemand, TopCompany } from '@/types'

export const revalidate = 86400

const salaryData: RoleSalary[] = [
  { role: 'AI Research Scientist',     min: 85000, max: 150000, median: 115000, yoy_change: 14 },
  { role: 'AI/LLM Engineer',           min: 80000, max: 140000, median: 108000, yoy_change: 12 },
  { role: 'MLOps / Platform Engineer', min: 80000, max: 120000, median: 97000,  yoy_change: 11 },
  { role: 'ML Engineer',               min: 75000, max: 130000, median: 100000, yoy_change: 9  },
  { role: 'Senior Data Engineer',      min: 85000, max: 125000, median: 103000, yoy_change: 7  },
  { role: 'Data Engineer',             min: 60000, max: 105000, median: 82000,  yoy_change: 6  },
  { role: 'Data Scientist',            min: 60000, max: 105000, median: 80000,  yoy_change: 5  },
  { role: 'Data Analyst',              min: 45000, max: 80000,  median: 60000,  yoy_change: 3  },
]

const skillsData: SkillDemand[] = [
  { skill: 'Python',     demand_pct: 96, trend: 'stable' },
  { skill: 'SQL',        demand_pct: 89, trend: 'stable' },
  { skill: 'LLM/GenAI',  demand_pct: 78, trend: 'up' },
  { skill: 'Azure',      demand_pct: 72, trend: 'up' },
  { skill: 'Spark',      demand_pct: 68, trend: 'stable' },
  { skill: 'AWS',        demand_pct: 63, trend: 'stable' },
  { skill: 'Kubernetes', demand_pct: 61, trend: 'up' },
  { skill: 'dbt',        demand_pct: 58, trend: 'up' },
  { skill: 'Kafka',      demand_pct: 54, trend: 'stable' },
  { skill: 'Airflow',    demand_pct: 52, trend: 'stable' },
  { skill: 'PyTorch',    demand_pct: 48, trend: 'up' },
  { skill: 'Terraform',  demand_pct: 46, trend: 'up' },
  { skill: 'Snowflake',  demand_pct: 43, trend: 'up' },
  { skill: 'LangChain',  demand_pct: 38, trend: 'up' },
]

const companiesData: TopCompany[] = [
  { name: 'Booking.com',       open_roles: 28, city: 'Amsterdam', sector: 'Travel Tech' },
  { name: 'ASML',              open_roles: 22, city: 'Eindhoven', sector: 'Semiconductor' },
  { name: 'Adyen',             open_roles: 18, city: 'Amsterdam', sector: 'Fintech' },
  { name: 'ING Bank',          open_roles: 16, city: 'Amsterdam', sector: 'Banking' },
  { name: 'Philips',           open_roles: 14, city: 'Amsterdam', sector: 'Health Tech' },
  { name: 'bol.com',           open_roles: 13, city: 'Utrecht',   sector: 'E-commerce' },
  { name: 'ABN AMRO',          open_roles: 12, city: 'Amsterdam', sector: 'Banking' },
  { name: 'TomTom',            open_roles: 10, city: 'Amsterdam', sector: 'Navigation' },
  { name: 'Just Eat Takeaway', open_roles: 9,  city: 'Amsterdam', sector: 'FoodTech' },
  { name: 'Elastic',           open_roles: 8,  city: 'Amsterdam', sector: 'Data Search' },
  { name: 'Randstad',          open_roles: 7,  city: 'Amsterdam', sector: 'HR Tech' },
  { name: 'Prosus / OLX',      open_roles: 7,  city: 'Amsterdam', sector: 'VC / Tech' },
]

const summaryMetrics = [
  { label: 'Avg DE Salary',  value: '€82k',  sub: 'median gross / year',   glow: 'bg-cyan-500',   text: 'text-[#22D3EE]' },
  { label: 'Avg ML Salary',  value: '€100k', sub: 'median gross / year',   glow: 'bg-purple-500', text: 'text-[#8B5CF6]' },
  { label: 'AI Roles YoY',   value: '+34%',  sub: 'job opening growth',    glow: 'bg-emerald-500',text: 'text-[#22C55E]' },
  { label: 'Top Hub',        value: 'AMS',   sub: 'Amsterdam leads NL',    glow: 'bg-orange-500', text: 'text-[#F97316]' },
]

function fmt(n: number) {
  return `€${Math.round(n / 1000)}k`
}

function trendIcon(trend: 'up' | 'down' | 'stable') {
  if (trend === 'up') return <span className="text-[#22C55E] font-bold">↑</span>
  if (trend === 'down') return <span className="text-[#EF4444]">↓</span>
  return <span className="text-[#6B6990]">–</span>
}

export default function MarketPage() {
  const maxDemand = Math.max(...skillsData.map((s) => s.demand_pct))

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-[22px] font-bold text-[#EEEEFF]">Netherlands Market</h1>
        <p className="text-[#6B6990] text-[13px] mt-0.5">
          Salary benchmarks, skill demand &amp; top employers · Q2 2025
        </p>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {summaryMetrics.map(({ label, value, sub, glow, text }) => (
          <div key={label} className="relative rounded-2xl bg-[#17153A] border border-white/[0.07] p-5 overflow-hidden">
            <div className={`absolute -top-6 -right-6 w-28 h-28 ${glow} opacity-20 blur-3xl rounded-full pointer-events-none`} />
            <div className="relative">
              <div className="text-[#6B6990] text-[12px] font-medium mb-3">{label}</div>
              <div className={`text-[28px] font-bold tabular-nums leading-none ${text}`}>{value}</div>
              <div className="text-[#6B6990] text-[11px] mt-1">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">

        {/* Salary table */}
        <section>
          <h2 className="text-[#EEEEFF] font-bold text-[16px] mb-4">Salary Ranges by Role</h2>
          <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Role', 'Range', 'Median', 'YoY'].map((h, i) => (
                    <th
                      key={h}
                      className={`text-[#6B6990] font-medium py-3 px-4 ${i === 0 ? 'text-left' : 'text-right'}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salaryData.map((row) => (
                  <tr
                    key={row.role}
                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="text-[#A8A6CC] px-4 py-3">{row.role}</td>
                    <td className="text-[#6B6990] text-right px-4 py-3 tabular-nums">
                      {fmt(row.min)} – {fmt(row.max)}
                    </td>
                    <td className="text-[#22C55E] font-semibold text-right px-4 py-3 tabular-nums">
                      {fmt(row.median)}
                    </td>
                    <td className="text-[#22C55E] text-right px-4 py-3">+{row.yoy_change}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Skills demand */}
        <section>
          <h2 className="text-[#EEEEFF] font-bold text-[16px] mb-4">Skills in Demand</h2>
          <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-5 space-y-3.5">
            {skillsData.map((skill) => (
              <div key={skill.skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#A8A6CC] text-[12px]">{skill.skill}</span>
                    <span className="text-[12px]">{trendIcon(skill.trend)}</span>
                  </div>
                  <span className="text-[#6B6990] text-[11px] tabular-nums">{skill.demand_pct}%</span>
                </div>
                <div className="h-1.5 bg-[#211F4A] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                    style={{ width: `${(skill.demand_pct / maxDemand) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Top employers */}
      <section>
        <h2 className="text-[#EEEEFF] font-bold text-[16px] mb-4">Top Employers Hiring</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {companiesData.map((company) => (
            <div
              key={company.name}
              className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-4 hover:border-white/[0.14] hover:bg-[#1D1B42] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 border border-[#6366F1]/25 flex items-center justify-center text-[#8B5CF6] font-bold text-[12px]">
                  {company.name[0]}
                </div>
                <span className="text-[#22C55E] text-[13px] font-bold">{company.open_roles}</span>
              </div>
              <div className="text-[#EEEEFF] text-[12px] font-semibold">{company.name}</div>
              <div className="text-[#6B6990] text-[10px] mt-0.5">{company.city}</div>
              <div className="text-[#3D3B60] text-[10px]">{company.sector}</div>
            </div>
          ))}
        </div>
        <p className="text-[#3D3B60] text-[10px] mt-4">
          * Data based on public job listings and industry reports · Q2 2025
        </p>
      </section>
    </div>
  )
}
