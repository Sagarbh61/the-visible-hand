import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { postQuery } from '@/sanity/lib/queries'

interface Category {
  title: string
  slug?: {
    current: string
  }
}

interface Author {
  name?: string
  bio?: any
  image?: any
}

interface Post {
  _id: string
  title?: string
  slug?: string
  excerpt?: string
  body?: any
  date?: string
  author?: Author
  categories?: Category[]
}

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: postQuery,
    params: { slug },
  })

  const post = data as Post | null

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white text-gray-900 py-12 px-4 font-sans">
      <div className="container mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-red-700 transition-colors mb-8 inline-block"
        >
          ← Back to Articles
        </Link>

        {/* Article Header */}
        <header className="border-b border-gray-200 pb-8 mb-8">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-3">
              {post.categories.map((cat, index) => (
                <span
                  key={cat.slug?.current || index}
                  className="text-xs font-semibold tracking-widest text-red-700 uppercase font-mono"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-4 text-lg text-gray-600 font-serif italic leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Author & Date Metadata */}
          <div className="mt-6 flex items-center text-xs text-gray-500 font-mono space-x-2">
            {post.author?.name && <span>By {post.author.name}</span>}
            {post.author?.name && post.date && <span>•</span>}
            {post.date && (
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            )}
          </div>
        </header>

        {/* Article Body (Portable Text) */}
        <main className="prose prose-lg sm:prose-xl max-w-none font-serif text-gray-800 leading-relaxed">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="text-gray-400 italic">No content found for this post.</p>
          )}
        </main>
      </div>
    </article>
  )
}