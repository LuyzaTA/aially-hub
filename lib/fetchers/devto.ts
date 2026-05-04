import type { ArticleCategory } from '@/types'

interface DevToArticle {
  id: number
  title: string
  description: string
  url: string
  published_at: string
  user: { name: string }
  tag_list: string[]
  positive_reactions_count: number
  reading_time_minutes: number
}

const tagQueries: Array<{ tag: string; category: ArticleCategory }> = [
  { tag: 'ai', category: 'ai' },
  { tag: 'machinelearning', category: 'ai' },
  { tag: 'llm', category: 'ai' },
  { tag: 'dataengineering', category: 'data_engineering' },
  { tag: 'python', category: 'tools' },
  { tag: 'datascience', category: 'research' },
]

export async function fetchDevTo() {
  const results = []

  for (const { tag, category } of tagQueries) {
    try {
      const url = `https://dev.to/api/articles?tag=${tag}&per_page=6&top=7`
      const res = await fetch(url, {
        headers: { 'User-Agent': 'AIIntelHub/1.0' },
        next: { revalidate: 3600 },
      })
      if (!res.ok) continue
      const articles: DevToArticle[] = await res.json()

      for (const article of articles) {
        results.push({
          title: article.title,
          summary: article.description ?? null,
          url: article.url,
          source: 'Dev.to',
          category,
          tags: (article.tag_list ?? []).slice(0, 4),
          author: article.user?.name ?? null,
          published_at: article.published_at,
          score: article.positive_reactions_count ?? 0,
          is_featured: (article.positive_reactions_count ?? 0) > 100,
        })
      }
    } catch {
      // skip
    }
  }

  return results
}
