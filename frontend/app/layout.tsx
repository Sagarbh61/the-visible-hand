import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/app/components/NewsletterForm'
import '@/app/globals.css'


const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://the-visible-hand.vercel.app'
).replace(/\/+$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
  google: '9rWaUIWeKDOZwAEOC4S-rfAqOVep-tBW5NKZ0xV5ACs',
},
  title: {
    default: 'The Visible Hand | Culture, Policy & Ideas',
    template: '%s | The Visible Hand',
  },
  description:
    'An editorial publication covering Economics, Politics, Book Reviews, Art, and Fiction by Sagar Bhattarai.',
  openGraph: {
    type: 'website',
    siteName: 'The Visible Hand',
    title: 'The Visible Hand | Culture, Policy & Ideas',
    description:
      'An editorial publication covering Economics, Politics, Book Reviews, Art, and Fiction by Sagar Bhattarai.',
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'The Visible Hand | Culture, Policy & Ideas',
    description:
      'An editorial publication covering Economics, Politics, Book Reviews, Art, and Fiction by Sagar Bhattarai.',
  },
}


const CATEGORIES = [
  { name: 'Economy', slug: 'economy' },
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

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
              <Link href="/" className="hover:text-red-800 transition-colors">
                The Visible Hand
              </Link>
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mt-2">
              An Editorial Journal on Culture, Policy & Ideas
            </p>
          </div>

          <nav className="border-t border-gray-100 bg-gray-50/80">
            <div className="container mx-auto max-w-5xl px-3 sm:px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-8 py-3 text-[10px] sm:text-sm font-medium tracking-wide uppercase font-mono text-gray-700">
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
        {/* Editorial Footer */}
        <footer className="mt-16 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {/* Publication identity */}
              <div className="flex flex-col items-start">


                <Link
                  href="/"
                  className="font-serif text-4xl whitespace-nowrap font-bold tracking-tight text-gray-900 transition-colors hover:text-red-800"
                >
                  The Visible Hand
                </Link>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                  An Editorial Journal on Culture, Policy &amp; Ideas
                </p>

<div className="mt-auto flex items-center gap-4 text-gray-500">
  <a
    href="mailto:hellosagarbh71@gmail.com"
    aria-label="Email Sagar"
    title="Email"
    className="transition-colors hover:text-red-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  </a>

  <a
    href="https://www.instagram.com/sagarbh_/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram profile"
    title="Instagram"
    className="transition-colors hover:text-red-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  </a>

  <a
    href="https://www.facebook.com/Sagarbh61/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook profile"
    title="Facebook"
    className="transition-colors hover:text-red-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.6V13h2.7v8z" />
    </svg>
  </a>
</div>


              </div>



              {/* Category navigation */}
              <nav
                aria-label="Footer navigation"
                className="flex h-full items-center justify-center"
              >
                <ul className="space-y-6">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className="group uppercase inline-flex items-center justify-center gap-4 text-sm text-gray-700 transition-colors hover:text-red-800"
                      >

                        <span>{cat.name}</span>
                        <span aria-hidden="true" className="text-xl text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-red-800">
                          ›
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Newsletter */}
              <div>
                <NewsletterForm />
              </div>
            </div>

            {/* Legal links and copyright */}
            <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} The Visible Hand</p>

              <nav aria-label="Legal links" className="flex flex-wrap gap-x-5 gap-y-2">
                <Link href="/privacy" className="transition-colors hover:text-red-800">
                  Privacy Policy
                </Link>
                <Link href="/cookie-policy" className="transition-colors hover:text-red-800">
                  Cookie Policy
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}