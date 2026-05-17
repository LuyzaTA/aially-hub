'use client'

import { motion, type MotionProps } from 'framer-motion'
import { NeuralOrb } from '@/components/effects/NeuralOrb'
import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

interface HeroSectionProps {
  articleCount: number
  jobCount: number
  startupCount: number
  db2Count: number
}

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
})

const floatAnim = (delay = 0, range = 8): MotionProps => ({
  animate: { y: [0, -range, 0] },
  transition: { duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay },
})

export function HeroSection({ articleCount, jobCount, startupCount, db2Count }: HeroSectionProps) {
  return (
    <section className="relative flex items-center min-h-[70vh] lg:min-h-[88vh] overflow-hidden -mx-4 lg:-mx-8 -mt-8 px-6 lg:px-10 pt-10 lg:pt-14 pb-12 lg:pb-16 xl:px-16">

      {/* ── Ambient mesh gradients ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[700px] h-[700px] rounded-full bg-[#6366F1]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/09 blur-[100px]" />
        <div className="absolute top-1/2 -right-20 w-[350px] h-[350px] rounded-full bg-[#00CFFF]/07 blur-[80px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07061A] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07061A] via-transparent to-[#07061A]/40 opacity-70" />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent"
          style={{ animation: 'scan-h 8s linear infinite' }}
        />
      </div>

      {/* ── Left: editorial text ───────────────────────────────────── */}
      <div className="relative z-10 flex-1 max-w-[620px]">

        {/* Status badge */}
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-2 lg:gap-3 mb-6 lg:mb-9 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] pulse-dot" />
            <span className="text-[9px] font-mono tracking-[0.22em] text-[#6366F1] uppercase">
              Live Intelligence Feed
            </span>
          </div>
          <span className="hidden sm:block text-[9px] font-mono tracking-widest text-[#3A3860]">
            NL MARKET · 24H CYCLE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUp(0.15)}>
          <h1 className="font-black leading-[0.88] tracking-tighter text-[#F0EFFF] mb-4 select-none">
            <span className="block text-[54px] sm:text-[72px] lg:text-[82px] xl:text-[96px]">AI</span>
            <span
              className="block text-[54px] sm:text-[72px] lg:text-[82px] xl:text-[96px]"
              style={{
                background: 'linear-gradient(90deg,#6366F1 0%,#A78BFA 45%,#22D3EE 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ALLY
            </span>
            <span className="block text-[54px] sm:text-[72px] lg:text-[82px] xl:text-[96px]">HUB</span>
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p {...fadeUp(0.28)} className="text-[14px] lg:text-[16px] text-[#5A5880] font-light leading-relaxed max-w-[440px] mb-8 lg:mb-10">
          Global intelligence for the{' '}
          <span className="text-[#A8A6CC]">AI & Data Engineering</span> economy.
          <br className="hidden sm:block" />Netherlands market focus. Powered by live data.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.38)} className="flex items-center gap-3 lg:gap-4 mb-10 lg:mb-14">
          <Link
            href="/news"
            className="group flex items-center gap-2 lg:gap-2.5 px-4 lg:px-6 py-2.5 lg:py-3 rounded-2xl font-semibold text-[13px] lg:text-[14px] text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
              boxShadow: '0 0 28px rgba(99,102,241,0.35), 0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <Zap className="w-3.5 h-3.5 lg:w-4 lg:h-4" strokeWidth={2.5} />
            Enter Hub
            <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/jobs"
            className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-2xl font-medium text-[13px] lg:text-[14px] text-[#A8A6CC] glass hover:text-[#F0EFFF] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            NL Jobs ↗
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div {...fadeUp(0.5)} className="flex items-center gap-5 lg:gap-8">
          {[
            { value: articleCount, label: 'Articles' },
            { value: jobCount,     label: 'NL Jobs'  },
            { value: startupCount, label: 'Startups' },
            { value: db2Count,     label: 'DB2 Roles'},
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.07, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-[22px] lg:text-[30px] font-black text-[#F0EFFF] tabular-nums leading-none">
                {value}
              </div>
              <div className="text-[8px] lg:text-[9px] font-mono text-[#5A5880] uppercase tracking-[0.15em] lg:tracking-[0.18em] mt-1">
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Right: Neural Orb + floating panels (desktop only) ────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
        className="relative hidden lg:block flex-shrink-0 w-[480px] h-[500px] xl:w-[540px] xl:h-[560px]"
      >
        {/* Orb canvas */}
        <div className="absolute inset-0">
          <NeuralOrb />
        </div>

        {/* Floating: Live Activity */}
        <motion.div
          {...floatAnim(0, 8)}
          className="absolute bottom-14 -left-6 w-60 glass-strong rounded-2xl p-4 shadow-2xl border-[rgba(99,102,241,0.2)]"
          style={{ boxShadow: '0 0 40px rgba(99,102,241,0.12), 0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="text-[9px] font-mono text-[#5A5880] uppercase tracking-[0.2em] mb-3">
            Live Activity
          </div>
          {[
            { dot: '#22C55E', text: 'New article indexed',  time: '2m ago'  },
            { dot: '#6366F1', text: 'DB2 position detected', time: '15m ago' },
            { dot: '#F97316', text: 'Startup funded (NL)',   time: '1h ago'  },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 py-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: item.dot, boxShadow: `0 0 6px ${item.dot}` }}
              />
              <span className="flex-1 text-[11px] text-[#A8A6CC]">{item.text}</span>
              <span className="text-[9px] text-[#3A3860] whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </motion.div>

        {/* Floating: Market Status */}
        <motion.div
          {...floatAnim(1.5, 10)}
          className="absolute top-14 -right-4 w-52 glass-strong rounded-2xl p-4 shadow-2xl"
          style={{ boxShadow: '0 0 32px rgba(139,92,246,0.1), 0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="text-[9px] font-mono text-[#5A5880] uppercase tracking-[0.2em] mb-2">
            NL Market
          </div>
          <div className="text-[24px] font-black text-[#F0EFFF]">Active</div>
          <div className="text-[11px] text-[#22C55E] font-semibold mt-0.5">↑ 24h sync cycle</div>
          <div className="mt-3 h-6 flex items-end gap-[2px]">
            {[35, 60, 42, 78, 55, 88, 65, 82, 58, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: 'linear-gradient(to top, rgba(99,102,241,0.9), rgba(139,92,246,0.3))',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating: Tech badge */}
        <motion.div
          {...floatAnim(0.8, 6)}
          className="absolute top-1/2 -left-10 glass-strong rounded-xl px-3 py-2 shadow-xl"
        >
          <div className="text-[9px] font-mono text-[#5A5880] uppercase tracking-widest">Powered by</div>
          <div className="text-[13px] font-bold text-[#6366F1]">AI + Supabase</div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07061A] to-transparent pointer-events-none" />
    </section>
  )
}
