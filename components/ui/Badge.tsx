import type { ArticleCategory } from '@/types'

export const categoryDot: Record<ArticleCategory, string> = {
  ai:               'bg-cyan-400',
  data_engineering: 'bg-violet-400',
  tools:            'bg-emerald-400',
  research:         'bg-amber-400',
  startup:          'bg-pink-400',
}

export const categoryLabel: Record<ArticleCategory, string> = {
  ai:               'AI',
  data_engineering: 'DATA ENG',
  tools:            'TOOLS',
  research:         'RESEARCH',
  startup:          'STARTUP',
}

const categoryPill: Record<ArticleCategory, string> = {
  ai:               'text-cyan-400 bg-cyan-400/10 border-cyan-400/25',
  data_engineering: 'text-violet-400 bg-violet-400/10 border-violet-400/25',
  tools:            'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
  research:         'text-amber-400 bg-amber-400/10 border-amber-400/25',
  startup:          'text-pink-400 bg-pink-400/10 border-pink-400/25',
}

export function CategoryBadge({ category }: { category: ArticleCategory }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${categoryPill[category]}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${categoryDot[category]}`} />
      {categoryLabel[category]}
    </span>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] text-[#6B6990] bg-[#211F4A] border border-white/[0.07] px-2 py-0.5 rounded-lg font-mono">
      #{String(children).toLowerCase().replace(/\s+/g, '_')}
    </span>
  )
}
