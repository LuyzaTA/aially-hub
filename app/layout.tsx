import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIAlly Hub — Global AI & Data Engineering Intelligence',
  description:
    'Immersive AI intelligence platform. Curated news, live job market, startup radar, and Netherlands Data Engineering focus.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Sidebar />
        <div
          className="ml-[240px] min-h-screen flex flex-col"
          style={{
            background:
              'radial-gradient(ellipse 110% 60% at 60% -10%, rgba(99,102,241,0.13) 0%, transparent 65%), ' +
              'radial-gradient(ellipse 70% 50% at 90% 95%, rgba(139,92,246,0.08) 0%, transparent 60%), ' +
              'radial-gradient(ellipse 50% 40% at 10% 80%, rgba(6,182,212,0.05) 0%, transparent 55%)',
          }}
        >
          <TopBar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
