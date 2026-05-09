'use client'

import { useState } from 'react'
import { RefreshCw, Copy, Check, ExternalLink, AlertTriangle } from 'lucide-react'

const SETUP_SQL = `-- Run this once in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS db2_releases (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  version      TEXT NOT NULL,
  release_type TEXT NOT NULL
    CHECK (release_type IN ('release','fixpack','announcement','security')),
  title        TEXT NOT NULL,
  summary      TEXT,
  release_date TIMESTAMPTZ,
  url          TEXT UNIQUE,
  features     TEXT[] DEFAULT '{}',
  platforms    TEXT[] DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE db2_releases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_db2"  ON db2_releases FOR SELECT USING (true);
CREATE POLICY "anon_insert_db2"  ON db2_releases FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_update_db2"  ON db2_releases FOR UPDATE USING (true);`

const STUDIO_URL =
  'https://supabase.com/dashboard/project/dmrvrkhzuhrqsnozgncs/sql/new'

type State = 'idle' | 'loading' | 'ok' | 'err' | 'table_missing'

export function SeedReleasesButton({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<State>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [copied, setCopied] = useState(false)

  async function seed() {
    setState('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/seed-db2', { method: 'POST' })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setState('ok')
        setTimeout(() => window.location.reload(), 600)
      } else if (data?.tableMissing) {
        setState('table_missing')
      } else {
        setState('err')
        setErrMsg(data?.error ?? `HTTP ${res.status}`)
      }
    } catch (e) {
      setState('err')
      setErrMsg(e instanceof Error ? e.message : 'Network error')
    }
  }

  function copySQL() {
    navigator.clipboard.writeText(SETUP_SQL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Table-missing: show setup panel ──────────────────────────────────
  if (state === 'table_missing') {
    return (
      <div
        className="mt-5 rounded-2xl p-5 max-w-lg mx-auto text-left"
        style={{
          background: 'rgba(234,179,8,0.06)',
          border: '1px solid rgba(234,179,8,0.25)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
          <span className="text-[#F0EFFF] text-[13px] font-semibold">
            One-time setup required
          </span>
        </div>
        <p className="text-[#5A5880] text-[12px] mb-4 leading-relaxed">
          The <code className="text-[#F59E0B] font-mono">db2_releases</code> table doesn&apos;t
          exist yet. Copy the SQL below and run it in Supabase Studio, then click{' '}
          <span className="text-[#A8A6CC]">Load Release Data</span> again.
        </p>

        {/* SQL block */}
        <div
          className="relative rounded-xl p-4 mb-4 font-mono text-[10px] leading-relaxed overflow-x-auto"
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#A8A6CC',
            whiteSpace: 'pre',
          }}
        >
          {SETUP_SQL}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={copySQL}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
            style={{
              background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.07)',
              border: copied ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.1)',
              color: copied ? '#22C55E' : '#A8A6CC',
            }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy SQL'}
          </button>

          <a
            href={STUDIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.25)',
              color: '#A78BFA',
            }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Studio
          </a>

          <button
            onClick={() => setState('idle')}
            className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
            style={{
              background: 'rgba(0,207,255,0.1)',
              border: '1px solid rgba(0,207,255,0.25)',
              color: '#00CFFF',
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // ── Generic error ─────────────────────────────────────────────────────
  if (state === 'err') {
    return (
      <div className="mt-5 space-y-2 text-center">
        <p className="text-[#EF4444] text-[12px] font-semibold">Seed failed</p>
        {errMsg && (
          <p className="text-[#5A5880] text-[11px] font-mono max-w-sm mx-auto break-all">
            {errMsg}
          </p>
        )}
        <button
          onClick={() => setState('idle')}
          className="mt-1 flex items-center gap-1.5 mx-auto px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
            color: '#FCA5A5',
          }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    )
  }

  // ── Compact (header icon button) ─────────────────────────────────────
  if (compact) {
    return (
      <button
        onClick={seed}
        disabled={state === 'loading' || state === 'ok'}
        title={state === 'ok' ? 'Done — reloading' : state === 'loading' ? 'Seeding…' : 'Reload release data'}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all disabled:opacity-40"
        style={{
          background: state === 'ok' ? 'rgba(34,197,94,0.1)' : 'rgba(0,207,255,0.08)',
          border: state === 'ok' ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(0,207,255,0.2)',
          color: state === 'ok' ? '#22C55E' : '#00CFFF',
        }}
      >
        <RefreshCw className={`w-3 h-3 ${state === 'loading' ? 'animate-spin' : ''}`} />
        {state === 'loading' ? 'Loading…' : state === 'ok' ? 'Done' : 'Reload'}
      </button>
    )
  }

  // ── Default button ────────────────────────────────────────────────────
  return (
    <button
      onClick={seed}
      disabled={state === 'loading' || state === 'ok'}
      className="mt-4 flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl text-[12px] font-semibold transition-all disabled:opacity-50"
      style={{
        background: 'rgba(0,207,255,0.1)',
        border: '1px solid rgba(0,207,255,0.3)',
        color: '#00CFFF',
      }}
    >
      <RefreshCw className={`w-3.5 h-3.5 ${state === 'loading' ? 'animate-spin' : ''}`} />
      {state === 'loading' ? 'Seeding…' : state === 'ok' ? 'Done — reloading' : 'Load Release Data'}
    </button>
  )
}
