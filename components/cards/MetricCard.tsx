import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  change?: string
  positive?: boolean
  sub?: string
  accent?: string
}

export function MetricCard({
  label, value, icon, change, positive, sub, accent = '#6366F1',
}: MetricCardProps) {
  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        style={{ background: accent }}
      />
      {/* Shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono text-[#5A5880] uppercase tracking-[0.14em]">{label}</span>
          {icon && (
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${accent}14`, border: `1px solid ${accent}25` }}
            >
              <span style={{ color: accent }}>{icon}</span>
            </div>
          )}
        </div>
        <div className="text-[#F0EFFF] text-[30px] font-black tabular-nums leading-none">{value}</div>
        {sub && <div className="text-[#5A5880] text-[11px] mt-1.5">{sub}</div>}
        {change && (
          <div
            className="text-[11px] mt-2.5 flex items-center gap-1 font-semibold"
            style={{ color: positive ? '#22C55E' : '#EF4444' }}
          >
            <span>{positive ? '↑' : '↓'}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  )
}
