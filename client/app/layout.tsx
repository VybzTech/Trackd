import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  variable: '--font-outfit', 
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: 'Trackd - AI-Powered Job Tracker',
  description: 'Track jobs, generate AI cover letters, and manage your job applications with ease',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

import { TopNav } from '@/components/top-nav'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} bg-background`}>
      <body className="font-sans antialiased bg-slate-900 min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1">
          {children}
        </main>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
