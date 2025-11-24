import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'RetentionOS Tools - Professional Retention Analytics Platform',
  description: 'Comprehensive suite of 42+ retention calculators and analytics tools for D2C brands, ecommerce, and SaaS businesses. Calculate CLV, CAC, churn rate, and more.',
  keywords: 'retention calculator, CLV calculator, CAC calculator, churn rate, customer retention, loyalty analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 no-print">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
                <div className="text-2xl font-bold">
                  <span className="text-lime-400">Retention</span>
                  <span className="text-gray-900">OS</span>
                </div>
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/#tools" className="text-sm font-medium text-gray-600 hover:text-lime-600 transition">
                  Tools
                </Link>
                <div className="text-sm text-gray-600">
                  Professional Analytics Tools
                </div>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-900 text-white py-12 mt-20 no-print">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 mb-4">
              RetentionOS Tools - Professional retention analytics platform
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
