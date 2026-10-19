import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/app/components/NewsletterForm'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'The Visible Hand | Culture, Policy & Ideas',
  description:
    'An editorial publication covering Economics, Politics, Book Reviews, Art, and Fiction by Sagar Bhattarai.',
}

const CATEGORIES = [
  { name: 'Economics', slug: 'economics' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Book Reviews', slug: 'book-reviews' },
  { name: 'Art', slug: 'art' },
  { name: 'Fiction', slug: 'fiction' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between antialiased">
        {/* Header Navigation */}
        <header className="border-b border-gray-200">
          <div className="container mx-auto max-w-5xl px-4 py-8 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
              An Editorial Journal on Culture, Policy & Ideas
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
              <Link href="/" className="hover:text-red-800 transition-colors">
                The Visible Hand
              </Link>
            </h1>
            <p className="mt-2 text-sm italic text-gray-600 font-serif">
              Essays & Analysis by Sagar Bhattarai
            </p>
          </div>

          <nav className="border-t border-gray-100 bg-gray-50/80">
            <div className="container mx-auto max-w-5xl px-4 flex items-center justify-center space-x-6 sm:space-x-8 py-3 text-xs sm:text-sm font-medium tracking-wide uppercase font-mono text-gray-700 overflow-x-auto">
              {CATEGORIES.map((cat: { name: string; slug: string }) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="hover:text-red-700 transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        {/* Page Body */}
        <div className="grow">{children}</div>

        {/* Editorial Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 py-16 mt-20 pb-2">
          <div className="container mx-auto max-w-4xl px-4 space-y-12">

            {/* 1. Centered Publication Title */}
            <div className="text-center space-y-2">
              <h2 className="font-serif text-4xl cursor-pointer mt-6 font-bold tracking-tight text-gray-900 hover:text-red-800">
                The Visible Hand
              </h2>
              <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
            </div>

            {/* 2. Horizontal Newsletter Bar */}
            <div className="p-6 sm:p-8 shadow-x">
              <NewsletterForm />
            </div>

            {/* 3. Bottom Category Links & Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 text-xs font-mono text-gray-600 uppercase tracking-wider">
              <div className="flex flex-wrap justify-center sm:justify-start gap-6">
                {CATEGORIES.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`} className="hover:text-red-800 transition-colors">
                    {cat.name}
                  </Link>
                ))}
              </div>
              <p className="text-gray-400">
                © {new Date().getFullYear()} Sagar Bhattarai
              </p>
            </div>

          </div>
        </footer>
      </body>
    </html>
  )
}