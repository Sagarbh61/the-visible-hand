
import Link from 'next/link'
import { client } from '@/sanity/lib/client'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  excerpt?: string
  category?: string
}

async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const query = `*[
    _type == "post" &&
    defined(slug.current) &&
    count(categories[@->slug.current == $categorySlug]) > 0
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "category": categories[@->slug.current == $categorySlug][0]->title
  }`

  return client.fetch(query, { categorySlug })
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getPostsByCategory(slug)

  const categoryTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 border-b border-gray-200 pb-6 text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gray-500">
          Category Archive
        </p>
        <h1 className="font-serif text-4xl font-bold text-gray-900 sm:text-5xl">
          {categoryTitle}
        </h1>
      </div>

      {posts.length === 0 ? (
        <div className="space-y-4 py-20 text-center">
          <p className="font-serif text-lg italic text-gray-600">
            No essays found in this category yet.
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-gray-400">
            Category slug: <span className="text-gray-700">{slug}</span>
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <article
              key={post._id}
              className="space-y-3 border-b border-gray-100 pb-10"
            >
              <div className="flex items-center space-x-3 font-mono text-xs text-gray-500">
                <span>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Recent'}
                </span>

                {post.category && (
                  <>
                    <span>•</span>
                    <span className="uppercase tracking-wider text-red-800">
                      {post.category}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif text-2xl font-bold text-gray-900 transition-colors hover:text-red-800 sm:text-3xl">
                <Link href={`/posts/${post.slug.current}`}>
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="line-clamp-3 font-serif text-sm leading-relaxed text-gray-600 sm:text-base">
                  {post.excerpt}
                </p>
              )}

              <Link
                href={`/posts/${post.slug.current}`}
                className="inline-block pt-2 font-mono text-xs font-bold uppercase tracking-wider text-gray-900 transition-colors hover:text-red-800"
              >
                Read Essay →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
