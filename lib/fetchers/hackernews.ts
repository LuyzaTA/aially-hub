import type { ArticleCategory } from '@/types'

interface HNHit {
  objectID: string
  title: string
  url: string | null
  author: string
  points: number
  created_at: string
  story_text: string | null
  _tags: string[]
}

interface HNResponse {
  hits: HNHit[]
}

const queries = [
  { q: 'artificial intelligence LLM GPT Claude Gemini', category: 'ai' as ArticleCategory },
  { q: 'data engineering dbt Spark Kafka Airflow Flink', category: 'data_engineering' as ArticleCategory },
  { q: 'machine learning deep learning neural network PyTorch', category: 'ai' as ArticleCategory },
  { q: 'data lakehouse Snowflake Databricks DuckDB', category: 'tools' as ArticleCategory },
  { q: 'AI startup funding seed series venture', category: 'startup' as ArticleCategory },
  { q: 'AI research paper arxiv transformer foundation model', category: 'research' as ArticleCategory },
]

function extractTags(title: string, category: ArticleCategory): string[] {
  const lower = title.toLowerCase()
  const tagMap: Record<string, string> = {
    gpt: 'GPT', claude: 'Claude', gemini: 'Gemini', llama: 'Llama',
    'open source': 'Open Source', python: 'Python', spark: 'Spark',
    kafka: 'Kafka', dbt: 'dbt', snowflake: 'Snowflake', databricks: 'Databricks',
    kubernetes: 'Kubernetes', docker: 'Docker', airflow: 'Airflow',
    'machine learning': 'ML', 'deep learning': 'Deep Learning',
    langchain: 'LangChain', 'rag': 'RAG', 'fine-tun': 'Fine-tuning',
    openai: 'OpenAI', anthropic: 'Anthropic', google: 'Google', meta: 'Meta',
    mistral: 'Mistral', llm: 'LLM', 'vector': 'Vector DB',
  }
  const tags: string[] = []
  for (const [key, tag] of Object.entries(tagMap)) {
    if (lower.includes(key)) tags.push(tag)
  }
  if (tags.length === 0) {
    tags.push(category === 'ai' ? 'AI' : category === 'data_engineering' ? 'Data Eng' : 'Tech')
  }
  return tags.slice(0, 4)
}

export async function fetchHackerNews() {
  const results = []

  for (const { q, category } of queries) {
    try {
      const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}&tags=story&hitsPerPage=8&numericFilters=points>10`
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) continue
      const data: HNResponse = await res.json()

      for (const hit of data.hits) {
        if (!hit.title || !hit.url) continue
        results.push({
          title: hit.title,
          summary: hit.story_text
            ? hit.story_text.replace(/<[^>]*>/g, '').slice(0, 300)
            : null,
          url: hit.url,
          source: 'HackerNews',
          category,
          tags: extractTags(hit.title, category),
          author: hit.author,
          published_at: hit.created_at,
          score: hit.points ?? 0,
          is_featured: (hit.points ?? 0) > 200,
        })
      }
    } catch {
      // skip failed query
    }
  }

  return results
}
