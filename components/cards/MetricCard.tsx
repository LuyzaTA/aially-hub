import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  change?: string
  positive?: boolean
  sub?: string
  glowColor?: string
}

export function MetricCard({
  label, value, icon, change, positive, sub, glowColor = 'bg-purple-500',
}: MetricCardProps) {
  return (
    <div className="relative rounded-2xl bg-[#17153A] border border-white/[0.07] p-5 overflow-hidden">
      <div className={`absolute -top-6 -right-6 w-28 h-28 ${glowColor} opacity-20 blur-3xl rounded-full pointer-events-none`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#6B6990] text-[12px] font-medium">{label}</span>
          {icon && (
            <div className="w-8 h-8 rounded-xl bg-[#211F4A] border border-white/[0.07] flex items-center justify-center text-[#8B5CF6]">
              {icon}
            </div>
          )}
        </div>
        <div className="text-[#EEEEFF] text-[28px] font-bold tabular-nums leading-none">{value}</div>
        {sub && <div className="text-[#6B6990] text-[11px] mt-1">{sub}</div>}
        {change && (
          <div className={`text-[11px] mt-2.5 flex items-center gap-1 font-semibold ${positive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
            <span>{positive ? '↑' : '↓'}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  )
}
