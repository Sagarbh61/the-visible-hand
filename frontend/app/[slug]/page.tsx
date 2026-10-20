import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  category: string
}

// GROQ query to fetch posts matching the specific category slug
async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const query = `*[_type == "post" && category->slug.current == $categorySlug]|order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "category": category->title
  }`
  return client.fetch(query, { categorySlug })
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getPostsByCategory(slug)

  // Format category title nicely from slug (e.g., "book-reviews" -> "Book Reviews")
  const categoryTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Category Header */}
      <div className="border-b border-gray-200 pb-6 mb-10 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
          Category Archive
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          {categoryTitle}
        </h1>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <p className="font-serif italic text-gray-600 text-lg">
            No essays found in this category yet.
          </p>
          <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            Check back soon for new analysis and commentary.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post._id} className="border-b border-gray-100 pb-10 space-y-3">
              <div className="flex items-center space-x-3 text-xs font-mono text-gray-500">
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span className="uppercase tracking-wider text-red-800">{post.category}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 hover:text-red-800 transition-colors">
                <Link href={`/posts/${post.slug.current}`}>
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="font-serif text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <div>
                <Link
                  href={`/posts/${post.slug.current}`}
                  className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-gray-900 hover:text-red-800 transition-colors pt-2"
                >
                  Read Essay &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}