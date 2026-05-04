'use client'

import { Search, Bell, Moon, RefreshCw } from 'lucide-react'

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-8 py-3.5 bg-[#0C0B1F]/80 backdrop-blur-xl border-b border-white/[0.06]">

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6990]" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full bg-[#17153A] border border-white/[0.07] rounded-full pl-10 pr-14 py-2 text-[13px] text-[#EEEEFF] placeholder:text-[#6B6990] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#6B6990] bg-[#211F4A] px-1.5 py-0.5 rounded-md select-none">
          ⌘K
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="w-9 h-9 rounded-full bg-[#17153A] border border-white/[0.07] flex items-center justify-center text-[#6B6990] hover:text-[#EEEEFF] transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>

        <button className="relative w-9 h-9 rounded-full bg-[#17153A] border border-white/[0.07] flex items-center justify-center text-[#6B6990] hover:text-[#EEEEFF] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#0C0B1F]" />
        </button>

        <button className="w-9 h-9 rounded-full bg-[#17153A] border border-white/[0.07] flex items-center justify-center text-[#6B6990] hover:text-[#EEEEFF] transition-colors">
          <Moon className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-white/[0.07]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
            AI
          </div>
          <div className="hidden sm:block">
            <div className="text-[12px] font-semibold text-[#EEEEFF] leading-none">Luyza Alexandre</div>
          </div>
        </div>
      </div>
    </header>
  )
}
