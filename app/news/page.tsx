import { createClient } from '@/lib/supabase/server'
import { NewsCard } from '@/components/cards/NewsCard'
import type { ArticleCategory } from '@/types'

export const revalidate = 3600

const categories = [
  { value: 'all',              label: 'All' },
  { value: 'ai',               label: 'AI' },
  { value: 'data_engineering', label: 'Data Eng' },
  { value: 'tools',            label: 'Tools' },
  { value: 'research',         label: 'Research' },
  { value: 'startup',          label: 'Startup' },
]

interface NewsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const category = params.category ?? 'all'
  const query = params.q ?? ''

  const supabase = await createClient()

  let req = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(60)

  if (category !== 'all') req = req.eq('category', category as ArticleCategory)
  if (query) req = req.ilike('title', `%${query}%`)

  const { data: articles } = await req

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-[22px] font-bold text-[#EEEEFF]">News Feed</h1>
        <p className="text-[#6B6990] text-[13px] mt-0.5">
          {articles?.length ?? 0} articles · curated from global AI &amp; Data Engineering sources
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-7 flex-wrap">
        <div className="flex gap-1 bg-[#17153A] border border-white/[0.07] rounded-2xl p-1">
          {categories.map(({ value, label }) => (
            <a
              key={value}
              href={`/news?category=${value}${query ? `&q=${query}` : ''}`}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition-all ${
                category === value
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-indigo-500/20'
                  : 'text-[#6B6990] hover:text-[#A8A6CC]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <form method="GET" action="/news" className="flex-1 min-w-48 max-w-sm">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search articles…"
            className="w-full bg-[#17153A] border border-white/[0.07] rounded-2xl px-4 py-2 text-[13px] text-[#EEEEFF] placeholder:text-[#6B6990] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
          />
          {category !== 'all' && <input type="hidden" name="category" value={category} />}
        </form>
      </div>

      {/* Grid */}
      {(articles?.length ?? 0) === 0 ? (
        <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-12 text-center">
          <div className="text-[#6B6990] text-[13px]">No articles found</div>
          <p className="text-[#3D3B60] text-[11px] mt-1">
            Try a different category or sync data from the sidebar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles?.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
