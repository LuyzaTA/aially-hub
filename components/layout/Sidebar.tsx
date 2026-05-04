'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, Newspaper, Briefcase,
  Rocket, BarChart2, RefreshCw, Zap,
} from 'lucide-react'

const navItems = [
  { href: '/',         label: 'Overview',  icon: LayoutDashboard },
  { href: '/news',     label: 'News Feed', icon: Newspaper },
  { href: '/jobs',     label: 'NL Jobs',   icon: Briefcase },
  { href: '/startups', label: 'Startups',  icon: Rocket },
  { href: '/market',   label: 'Market',    icon: BarChart2 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [syncing, setSyncing] = useState(false)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')

  async function handleSync() {
    setSyncing(true)
    setStatus('idle')
    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setTimeout(() => window.location.reload(), 800)
    } catch {
      setStatus('err')
    } finally {
      setSyncing(false)
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-[#100E24] border-r border-white/[0.06] flex flex-col z-40">

      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
            <Zap className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[#EEEEFF] font-bold text-[15px] tracking-tight">AIAlly - Hub</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3">
        <div className="text-[#6B6990] text-[10px] tracking-[0.18em] uppercase px-3 pb-2 mb-1">Menu</div>
        <div className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-3 px-3 py-[10px] rounded-xl transition-all duration-150 ${
                  active ? 'text-white' : 'text-[#6B6990] hover:text-[#A8A6CC] hover:bg-white/[0.04]'
                }`}
              >
                {active && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] shadow-lg shadow-indigo-500/25" />
                )}
                <Icon
                  className="relative z-10 flex-shrink-0 w-[18px] h-[18px]"
                  strokeWidth={active ? 2.5 : 1.8}
                />
                <span className="relative z-10 text-[13px] font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Stats mini card */}
      <div className="mx-3 mb-3 p-4 rounded-2xl bg-gradient-to-br from-[#17153A] to-[#1D1B42] border border-white/[0.07]">
        <div className="text-[#6B6990] text-[10px] tracking-wide mb-0.5">Intelligence Feed</div>
        <div className="text-[#EEEEFF] text-[20px] font-bold leading-tight">24h Cycle</div>
        <div className="text-[#22C55E] text-[11px] mt-0.5 font-medium">↑ Auto-sync active</div>
        <div className="mt-3 h-7 flex items-end gap-[3px]">
          {[30, 52, 41, 67, 55, 78, 61, 85, 70, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: 'linear-gradient(to top, rgba(99,102,241,0.8), rgba(139,92,246,0.3))',
              }}
            />
          ))}
        </div>
      </div>

      {/* Sync button */}
      <div className="px-3 pb-5 border-t border-white/[0.06] pt-3">
        <button
          onClick={handleSync}
          disabled={syncing}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all disabled:opacity-40 ${
            status === 'ok'
              ? 'text-[#22C55E] bg-[#22C55E]/10'
              : status === 'err'
              ? 'text-[#EF4444] bg-[#EF4444]/10'
              : 'text-[#6B6990] hover:text-[#A8A6CC] hover:bg-white/[0.04]'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 flex-shrink-0 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : status === 'ok' ? 'Synced ✓' : status === 'err' ? 'Failed ✗' : 'Sync Data'}
        </button>
      </div>
    </aside>
  )
}
