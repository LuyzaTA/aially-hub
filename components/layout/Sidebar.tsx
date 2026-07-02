'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Newspaper, Briefcase,
  Rocket, BarChart2, RefreshCw, Zap, Database, Globe2,
} from 'lucide-react'

const navItems = [
  { href: '/',            label: 'Overview',     icon: LayoutDashboard, color: '#6366F1' },
  { href: '/news',        label: 'News Feed',    icon: Newspaper,       color: '#22D3EE' },
  { href: '/jobs',        label: 'NL Jobs',      icon: Briefcase,       color: '#22C55E' },
  { href: '/jobs/brazil', label: 'Brazil Jobs',  icon: Globe2,          color: '#FBBF24' },
  { href: '/startups',    label: 'Startups',     icon: Rocket,          color: '#F97316' },
  { href: '/market',      label: 'Market',       icon: BarChart2,       color: '#A855F7' },
  { href: '/db2',         label: 'DB2 LUW',      icon: Database,        color: '#00CFFF' },
]

const BARS = [32, 55, 40, 70, 52, 80, 62, 88, 68, 95]

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
    <>
      {/* ── Desktop sidebar ──────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-full w-[240px] flex-col z-40"
        style={{
          background: 'rgba(7, 6, 26, 0.92)',
          backdropFilter: 'blur(28px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Left edge glow line */}
        <div
          className="absolute left-0 top-0 w-px h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.6) 30%, rgba(139,92,246,0.4) 60%, transparent)',
          }}
        />

        {/* Logo */}
        <div className="px-5 pt-7 pb-5">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative"
              style={{
                background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                boxShadow: '0 0 20px rgba(99,102,241,0.45)',
              }}
            >
              <Zap className="w-[17px] h-[17px] text-white" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ mixBlendMode: 'overlay' }}>
                <div className="absolute inset-0 shimmer" />
              </div>
            </div>
            <div>
              <div
                className="font-bold text-[14px] tracking-tight"
                style={{
                  background: 'linear-gradient(90deg,#F0EFFF,#A8A6CC)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AIAlly Hub
              </div>
              <div className="text-[9px] font-mono text-[#3A3860] tracking-[0.18em] uppercase mt-px">
                AI Platform
              </div>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-5 mb-4 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />

        {/* Nav section label */}
        <div className="px-5 mb-1">
          <span className="text-[9px] font-mono tracking-[0.2em] text-[#3A3860] uppercase">Navigation</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <div className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon, color }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative flex items-center gap-3 px-3 py-[9px] rounded-xl transition-all duration-200 group"
                  style={{ color: active ? '#F0EFFF' : '#5A5880' }}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${color}18, ${color}0a)`,
                        border: `1px solid ${color}25`,
                        boxShadow: `0 0 16px ${color}15`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!active && (
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    />
                  )}
                  {active && (
                    <div
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                    />
                  )}
                  <div
                    className="relative z-10 flex-shrink-0 transition-all duration-200"
                    style={{
                      color: active ? color : undefined,
                      filter: active ? `drop-shadow(0 0 6px ${color}80)` : undefined,
                    }}
                  >
                    <Icon className="w-[17px] h-[17px] transition-all group-hover:scale-110" strokeWidth={active ? 2.2 : 1.7} />
                  </div>
                  <span className="relative z-10 text-[13px] font-medium tracking-tight transition-colors duration-200 group-hover:text-[#A8A6CC]">
                    {label}
                  </span>
                  {active && (
                    <div className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Activity mini-card */}
        <div className="mx-3 mb-3">
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.06))',
              border: '1px solid rgba(99,102,241,0.18)',
            }}
          >
            <div className="absolute inset-0 shimmer pointer-events-none" style={{ opacity: 0.5 }} />
            <div className="relative">
              <div className="text-[9px] font-mono text-[#5A5880] uppercase tracking-[0.2em] mb-0.5">
                Intelligence Feed
              </div>
              <div className="text-[#F0EFFF] text-[20px] font-black leading-tight">24h Cycle</div>
              <div className="text-[11px] text-[#22C55E] font-semibold mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] pulse-dot" />
                Auto-sync active
              </div>
              <div className="mt-3 h-7 flex items-end gap-[2.5px]">
                {BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, rgba(99,102,241,${0.7 + i * 0.02}), rgba(139,92,246,0.25))`,
                      boxShadow: h > 75 ? '0 0 4px rgba(99,102,241,0.5)' : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sync button */}
        <div className="px-3 pb-5 border-t border-[rgba(255,255,255,0.05)] pt-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all disabled:opacity-40 group"
            style={{
              color: status === 'ok' ? '#22C55E' : status === 'err' ? '#EF4444' : '#5A5880',
              background: status === 'ok' ? 'rgba(34,197,94,0.08)' : status === 'err' ? 'rgba(239,68,68,0.08)' : 'transparent',
              border: status === 'ok' ? '1px solid rgba(34,197,94,0.2)' : status === 'err' ? '1px solid rgba(239,68,68,0.2)' : '1px solid transparent',
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 flex-shrink-0 transition-colors group-hover:text-[#A8A6CC] ${syncing ? 'animate-spin' : ''}`} />
            <span className="transition-colors group-hover:text-[#A8A6CC]">
              {syncing ? 'Syncing...' : status === 'ok' ? 'Synced ✓' : status === 'err' ? 'Failed ✗' : 'Sync Data'}
            </span>
            {!syncing && status === 'idle' && (
              <AnimatePresence>
                <motion.div
                  className="ml-auto w-1 h-1 rounded-full bg-[#6366F1]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </AnimatePresence>
            )}
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom navigation bar ─────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 px-2"
        style={{
          background: 'rgba(7, 6, 26, 0.96)',
          backdropFilter: 'blur(28px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Top edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5) 30%, rgba(139,92,246,0.4) 60%, transparent)' }}
        />

        {navItems.map(({ href, label, icon: Icon, color }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 relative min-w-[44px]"
            >
              {active && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `${color}12`, border: `1px solid ${color}20` }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <div
                className="relative z-10 transition-all duration-200"
                style={{
                  color: active ? color : '#3A3860',
                  filter: active ? `drop-shadow(0 0 5px ${color}90)` : undefined,
                }}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.2 : 1.6} />
              </div>
              <span
                className="relative z-10 text-[9px] font-mono tracking-wide transition-colors duration-200 leading-none"
                style={{ color: active ? color : '#3A3860' }}
              >
                {label === 'News Feed' ? 'News' : label === 'Overview' ? 'Home' : label === 'Brazil Jobs' ? 'Brazil' : label}
              </span>
            </Link>
          )
        })}

        {/* Sync icon */}
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 disabled:opacity-40 min-w-[44px]"
        >
          <RefreshCw
            className="w-5 h-5 transition-all"
            strokeWidth={1.6}
            style={{
              color: status === 'ok' ? '#22C55E' : status === 'err' ? '#EF4444' : '#3A3860',
              filter: status === 'ok' ? '0 0 5px rgba(34,197,94,0.8)' : undefined,
            }}
          />
          <span className="text-[9px] font-mono tracking-wide leading-none" style={{ color: status === 'ok' ? '#22C55E' : status === 'err' ? '#EF4444' : '#3A3860' }}>
            {status === 'ok' ? 'Synced' : status === 'err' ? 'Failed' : 'Sync'}
          </span>
        </button>
      </nav>
    </>
  )
}
