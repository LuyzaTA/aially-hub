export type ArticleCategory = 'ai' | 'data_engineering' | 'tools' | 'research' | 'startup'

export interface Article {
  id: string
  title: string
  summary: string | null
  url: string | null
  source: string | null
  category: ArticleCategory
  image_url: string | null
  tags: string[]
  author: string | null
  published_at: string | null
  score: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  job_type: string | null
  salary_min: number | null
  salary_max: number | null
  currency: string
  description: string | null
  skills: string[]
  apply_url: string | null
  source: string | null
  posted_at: string | null
  is_remote: boolean
  seniority: string | null
  created_at: string
}

export interface Startup {
  id: string
  name: string
  tagline: string | null
  description: string | null
  website: string | null
  founded_year: number | null
  stage: string | null
  funding_amount: string | null
  category: string | null
  country: string | null
  tags: string[]
  is_trending: boolean
  created_at: string
}

export interface MarketSnapshot {
  id: string
  snapshot_date: string
  data: MarketData
  type: 'salary' | 'skills' | 'companies' | 'overview'
  created_at: string
}

export interface MarketData {
  roles?: RoleSalary[]
  skills?: SkillDemand[]
  companies?: TopCompany[]
  summary?: string
}

export interface RoleSalary {
  role: string
  min: number
  max: number
  median: number
  yoy_change: number
}

export interface SkillDemand {
  skill: string
  demand_pct: number
  trend: 'up' | 'down' | 'stable'
}

export interface TopCompany {
  name: string
  open_roles: number
  city: string
  sector: string
}
