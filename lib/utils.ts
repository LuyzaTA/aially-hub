import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format } from 'date-fns'
import type { ArticleCategory } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return '—'
  try {
    const date = new Date(dateString)
    const distance = formatDistanceToNow(date, { addSuffix: true })
    return distance
  } catch {
    return '—'
  }
}

export function formatFullDate(dateString: string | null): string {
  if (!dateString) return '—'
  try {
    return format(new Date(dateString), 'MMM d, yyyy')
  } catch {
    return '—'
  }
}

export function formatSalary(min: number | null, max: number | null, currency = 'EUR'): string {
  if (!min && !max) return '—'
  const symbol = currency === 'EUR' ? '€' : currency
  const fmt = (n: number) => `${Math.round(n / 1000)}k`
  if (min && max) return `${symbol}${fmt(min)} – ${symbol}${fmt(max)}`
  if (min) return `${symbol}${fmt(min)}+`
  return `Up to ${symbol}${fmt(max!)}`
}

export const categoryConfig: Record<ArticleCategory, { label: string; color: string }> = {
  ai: {
    label: 'AI',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  data_engineering: {
    label: 'Data Eng',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  tools: {
    label: 'Tools',
    color: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  },
  research: {
    label: 'Research',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  startup: {
    label: 'Startup',
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
}

export const stageConfig: Record<string, string> = {
  seed: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'series-a': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'series-b': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'series-c': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'series-d': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  'pre-seed': 'text-gray-400 bg-gray-400/10 border-gray-400/20',
}
