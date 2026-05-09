'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

export function SeedReleasesButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  async function seed() {
    setState('loading')
    try {
      const res = await fetch('/api/seed-db2', { method: 'POST' })
      setState(res.ok ? 'ok' : 'err')
      if (res.ok) setTimeout(() => window.location.reload(), 600)
    } catch {
      setState('err')
    }
  }

  return (
    <button
      onClick={seed}
      disabled={state === 'loading' || state === 'ok'}
      className="mt-4 flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-[#006699]/20 border border-[#006699]/40 text-[#4DB8FF] text-[12px] font-semibold hover:bg-[#006699]/30 transition-colors disabled:opacity-50"
    >
      <RefreshCw className={`w-3.5 h-3.5 ${state === 'loading' ? 'animate-spin' : ''}`} />
      {state === 'loading' ? 'Seeding…' : state === 'ok' ? 'Done — reloading' : state === 'err' ? 'Failed — retry' : 'Load Release Data'}
    </button>
  )
}
