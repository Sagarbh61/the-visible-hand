import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface Post {
  title: string
  publishedAt: string
  body: any
  category: string
  categorySlug: string
}

async function getPost(postSlug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $postSlug][0]{
    title,
    publishedAt,
    body,
    "category": category->title,
    "categorySlug": category->slug.current
  }`
  return client.fetch(query, { postSlug })
}

interface PageProps {
  params: Promise<{ slug: string; postSlug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug, postSlug } = await params
  const post = await getPost(postSlug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href={`/category/${slug}`}
          className="text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-red-800 transition-colors"
        >
          &larr; Back to {post.category || slug}
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-gray-200 pb-8 mb-10">
        <div className="flex items-center space-x-3 text-xs font-mono text-gray-500 uppercase tracking-wider">
          <span>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          {post.category && (
            <>
              <span>•</span>
              <span className="text-red-800">{post.category}</span>
            </>
          )}
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Article Body Content */}
      <div className="prose prose-lg font-serif text-gray-800 max-w-none space-y-6">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p className="italic text-gray-500">No content available for this essay.</p>
        )}
      </div>
    </article>
  )
}