import { Suspense } from 'react'
import Link from 'next/link'
import { AllPosts } from '@/app/components/Posts'

const CATEGORIES = [
  { name: 'Economy', slug: 'economy', description: 'Markets, development, and economic ideas.' },
  { name: 'Politics', slug: 'politics', description: 'Power, institutions, and public policy.' },
  { name: 'Book Reviews', slug: 'book-reviews', description: 'Books worth reading and thinking about.' },
  { name: 'Art', slug: 'art', description: 'Art, culture, and interpretation.' },
  { name: 'Fiction', slug: 'fiction', description: 'Original stories and literary writing.' },
]

export default async function Page() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <section aria-labelledby="latest-heading">
        <div className="mb-8">
          <h1
            id="latest-heading"
            className="border-b border-gray-900 pb-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Latest essays
          </h1>
        </div>

        <Suspense
          fallback={
            <p className="py-8 font-serif italic text-gray-500">
              Loading essays...
            </p>
          }
        >
          <AllPosts />
        </Suspense>
      </section>

      <section aria-labelledby="explore-heading" className="mt-16 border-t border-gray-200 pt-10 sm:mt-20">
        <h2
          id="explore-heading"
          className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl"
        >
          Explore the journal
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group border border-gray-200 p-5 transition-colors hover:border-gray-500 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-gray-600">
                {category.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}