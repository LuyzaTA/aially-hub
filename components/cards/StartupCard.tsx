import { ArrowUpRight } from 'lucide-react'
import type { Startup } from '@/types'

const countryFlag: Record<string, string> = {
  France:      '🇫🇷',
  USA:         '🇺🇸',
  Netherlands: '🇳🇱',
  Germany:     '🇩🇪',
  UK:          '🇬🇧',
  Canada:      '🇨🇦',
  Israel:      '🇮🇱',
  India:       '🇮🇳',
  Sweden:      '🇸🇪',
  Switzerland: '🇨🇭',
  Spain:       '🇪🇸',
  Australia:   '🇦🇺',
}

const stageStyle: Record<string, string> = {
  'pre-seed': 'text-[#6B6990] bg-white/5 border-white/10',
  'seed':     'text-amber-400 bg-amber-400/10 border-amber-400/25',
  'series-a': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25',
  'series-b': 'text-violet-400 bg-violet-400/10 border-violet-400/25',
  'series-c': 'text-orange-400 bg-orange-400/10 border-orange-400/25',
  'growth':   'text-pink-400 bg-pink-400/10 border-pink-400/25',
  'public':   'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
}

export function StartupCard({ startup }: { startup: Startup }) {
  const stageClass = stageStyle[startup.stage?.toLowerCase() ?? ''] ?? 'text-[#6B6990] bg-white/5 border-white/10'
  const flag = startup.country ? (countryFlag[startup.country] ?? '🌐') : null

  return (
    <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-5 hover:border-white/[0.14] hover:bg-[#1D1B42] transition-all duration-200">

      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 pr-3">
          <div className="text-[#EEEEFF] font-semibold text-[14px] leading-tight">{startup.name}</div>
          <div className="text-[#6B6990] text-[11px] mt-0.5">
            {flag && <span className="mr-1">{flag}</span>}
            {startup.country}
            {startup.founded_year && (
              <span className="ml-2 text-[#3D3B60]">· Est. {startup.founded_year}</span>
            )}
          </div>
        </div>
        {startup.stage && (
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border capitalize flex-shrink-0 ${stageClass}`}>
            {startup.stage.replace('-', ' ')}
          </span>
        )}
      </div>

      {startup.tagline && (
        <p className="text-[#6B6990] text-[12px] leading-relaxed mb-3 line-clamp-2">{startup.tagline}</p>
      )}

      {startup.funding_amount && (
        <div className="text-[#22C55E] text-[14px] font-bold mb-3">{startup.funding_amount}</div>
      )}

      {startup.tags && startup.tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-3">
          {startup.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[10px] text-[#6B6990] bg-[#211F4A] border border-white/[0.07] px-2 py-0.5 rounded-lg font-mono">
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
        {startup.category && (
          <span className="text-[#6B6990] text-[10px]">{startup.category}</span>
        )}
        {startup.website && (
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all ml-auto"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  )
}
