'use client'

import { Search, Bell, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function TopBar() {
  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-8 py-3"
      style={{
        background: 'rgba(7, 6, 26, 0.7)',
        backdropFilter: 'blur(24px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.3)] to-transparent pointer-events-none" />

      {/* Mobile brand (hidden on desktop where sidebar shows the logo) */}
      <Link href="/" className="lg:hidden flex items-center gap-2 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
            boxShadow: '0 0 14px rgba(99,102,241,0.45)',
          }}
        >
          <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
        <span
          className="font-bold text-[13px] tracking-tight"
          style={{
            background: 'linear-gradient(90deg,#F0EFFF,#A8A6CC)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AIAlly Hub
        </span>
      </Link>

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#3A3860]" />
        <input
          type="text"
          placeholder="Search intelligence..."
          className="w-full rounded-full pl-10 pr-10 lg:pr-14 py-2 text-[13px] text-[#F0EFFF] placeholder:text-[#3A3860] focus:outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
          onFocus={e => {
            e.currentTarget.style.border = '1px solid rgba(99,102,241,0.4)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'
          }}
          onBlur={e => {
            e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        <span className="hidden lg:flex absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#3A3860] bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 rounded-md select-none border border-[rgba(255,255,255,0.07)]">
          ⌘K
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#5A5880] hover:text-[#F0EFFF] transition-colors"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Bell className="w-3.5 h-3.5" />
          <span
            className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full border border-[#07061A]"
            style={{ background: '#EF4444', boxShadow: '0 0 6px rgba(239,68,68,0.7)' }}
          />
        </motion.button>

        {/* Divider */}
        <div className="w-px h-5 bg-[rgba(255,255,255,0.07)] mx-1" />

        {/* User avatar */}
        <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2.5 cursor-pointer group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg,#6366F1,#EC4899)',
              boxShadow: '0 0 14px rgba(99,102,241,0.4)',
            }}
          >
            LA
          </div>
          <div className="hidden sm:block">
            <div className="text-[12px] font-semibold text-[#F0EFFF] leading-none group-hover:text-white transition-colors">
              Luyza
            </div>
            <div className="text-[9px] font-mono text-[#3A3860] mt-px">Admin</div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
