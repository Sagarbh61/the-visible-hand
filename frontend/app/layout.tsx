import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/app/components/NewsletterForm'
import { AnalyticsConsent } from '@/app/components/AnalyticsConsent'
import '@/app/globals.css'
import { SearchToggle } from '@/app/components/SearchToggle'


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

<div className="container mx-auto max-w-5xl px-4 py-6 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3 sm:py-8">
  <div className="relative text-center sm:col-start-2 sm:row-start-1">
    <h1 className="font-serif text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
      <Link href="/" className="transition-colors hover:text-red-800">
        The Visible Hand
      </Link>
    </h1>

    <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-gray-500 sm:text-xs sm:tracking-widest">
      An Editorial Journal on Culture, Policy &amp; Ideas
    </p>
  </div>

  <div className="absolute right-4 top-10 flex justify-end sm:relative sm:right-auto sm:top-auto sm:col-start-3 sm:row-start-1">
    <SearchToggle />
  </div>
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
        <footer className="mt-16 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 md:min-[800px]:grid-cols-3 md:min-[999px]:grid-cols-3 md:gap-12">
              {/* Publication identity */}
              <div className="flex flex-col">


                <Link
                  href="/"
                  className="font-serif text-4xl whitespace-nowrap font-bold tracking-tight text-gray-900 transition-colors hover:text-red-800"
                >
                  The Visible Hand
                </Link>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                  An Editorial Journal on Culture, Policy &amp; Ideas
                </p>

                <div className="mt-6 flex items-center gap-4 text-gray-500 lg:mt-auto">
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
                className="flex h-full min-[630px]:justify-self-end items-start min-[800px]:justify-self-center min-[600px]:col-start-2 min-[1001px]:row-start-1 min-[1001px]:justify-self-center min-[1001px]:items-end"
              >
                <ul className="space-y-6 flex flex-col w-full">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className="group flex w-full text-left items-center gap-4 text-sm uppercase text-gray-700 transition-colors hover:text-red-800"
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
        <AnalyticsConsent />
      </body>
    </html>
  )
}