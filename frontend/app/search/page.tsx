
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { searchPostsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/utils'

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q = '' } = await searchParams
  const term = q.trim().slice(0, 100)

  const { data: posts } = await sanityFetch({
    query: searchPostsQuery,
    params: {
      searchPattern: `*${term.replace(/[\\*]/g, '')}*`,
    },
  })

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-red-700">
        The Visible Hand
      </p>

      <h1 className="mt-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
        Search
      </h1>

      {term ? (
        <p className="mt-3 text-sm text-gray-600">
          Results for <strong>{term}</strong>
        </p>
      ) : (
        <p className="mt-3 text-sm text-gray-600">
          Search articles by title or excerpt using the search field above.
        </p>
      )}

      {term && posts.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post._id} className="min-w-0">
              <Link
                href={`/posts/${post.slug}`}
                className="group block"
              >
                {post.mainImage?.asset && (
                  <div className="relative mb-4 aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={urlForImage(post.mainImage).width(700).auto('format').url()}
                      alt={post.mainImage.alt || post.title || 'Article image'}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                {post.categories && post.categories.length > 0 && (
                  <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-red-700">
                    {post.categories
                      .map((category) => category.title)
                      .filter(Boolean)
                      .join(' / ')}
                  </p>
                )}

                <h2 className="font-serif text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-800">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 font-serif text-sm leading-relaxed text-gray-600">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}

      {term && posts.length === 0 && (
        <p className="mt-10 border-t border-gray-200 pt-6 font-serif text-lg text-gray-600">
          No articles found. Try a different search term.
        </p>
      )}
    </main>
  )
}
