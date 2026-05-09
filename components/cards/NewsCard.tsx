import { ArrowUpRight } from 'lucide-react'
import { CategoryBadge, Tag } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/types'

const categoryAccent: Record<string, string> = {
  ai:               '#22D3EE',
  data_engineering: '#A855F7',
  tools:            '#22C55E',
  research:         '#F59E0B',
  startup:          '#EC4899',
}

const categoryGradient: Record<string, string> = {
  ai:               'from-cyan-400 to-blue-500',
  data_engineering: 'from-violet-400 to-purple-600',
  tools:            'from-emerald-400 to-teal-600',
  research:         'from-amber-400 to-orange-500',
  startup:          'from-pink-400 to-rose-600',
}

export function NewsCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const bar  = categoryGradient[article.category] ?? 'from-purple-400 to-indigo-600'
  const accent = categoryAccent[article.category] ?? '#6366F1'

  return (
    <article
      className="relative group rounded-2xl p-5 flex flex-col overflow-hidden transition-all duration-250 hover:scale-[1.015]"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${bar} opacity-60 group-hover:opacity-100 transition-opacity`} />

      {/* Hover glow */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: accent }}
      />

      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={article.category} />
        <span className="text-[#3A3860] text-[10px] font-mono">{formatDate(article.published_at)}</span>
      </div>

      <h3 className={`text-[#F0EFFF] font-semibold leading-snug mb-2 line-clamp-2 ${featured ? 'text-[15px]' : 'text-[13px]'}`}>
        {article.title}
      </h3>

      {article.summary && (
        <p className="text-[#5A5880] text-[12px] leading-relaxed line-clamp-3 mb-3 flex-1">
          {article.summary}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex gap-1.5 flex-wrap">
          {article.tags?.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          {article.source && (
            <span className="text-[#3A3860] text-[10px] font-mono">{article.source}</span>
          )}
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: `${accent}14`,
                border: `1px solid ${accent}25`,
                color: accent,
              }}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
