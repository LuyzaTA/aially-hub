import { ArrowUpRight } from 'lucide-react'
import { CategoryBadge, Tag } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/types'

const categoryBar: Record<string, string> = {
  ai:               'from-cyan-400 to-blue-500',
  data_engineering: 'from-violet-400 to-purple-600',
  tools:            'from-emerald-400 to-teal-600',
  research:         'from-amber-400 to-orange-500',
  startup:          'from-pink-400 to-rose-600',
}

export function NewsCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const bar = categoryBar[article.category] ?? 'from-purple-400 to-indigo-600'

  return (
    <article className="relative group rounded-2xl bg-[#17153A] border border-white/[0.07] p-5 hover:border-white/[0.14] hover:bg-[#1D1B42] transition-all duration-200 flex flex-col overflow-hidden">
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${bar} opacity-70`} />

      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={article.category} />
        <span className="text-[#6B6990] text-[11px]">{formatDate(article.published_at)}</span>
      </div>

      <h3 className={`text-[#EEEEFF] font-semibold leading-snug mb-2 line-clamp-2 ${featured ? 'text-[15px]' : 'text-[13px]'}`}>
        {article.title}
      </h3>

      {article.summary && (
        <p className="text-[#6B6990] text-[12px] leading-relaxed line-clamp-3 mb-3 flex-1">
          {article.summary}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
        <div className="flex gap-1.5 flex-wrap">
          {article.tags?.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          {article.source && (
            <span className="text-[#6B6990] text-[10px]">{article.source}</span>
          )}
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all flex-shrink-0"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
