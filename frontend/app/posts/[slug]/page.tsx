import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { postQuery } from '@/sanity/lib/queries'
import type { Metadata } from 'next'
import type { PostQueryResult } from '@/sanity.types'
import { resolveOpenGraphImage, urlForImage } from '@/sanity/lib/utils'
import ShareLinks from './ShareLinks'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string): Promise<PostQueryResult> {
  const { data } = await sanityFetch({
    query: postQuery,
    params: { slug },
  })

  return data
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  const title = post.title || 'Untitled'
  const description =
    post.excerpt ||
    'Read this article from The Visible Hand, an editorial publication covering economics, politics, culture, and ideas.'

  const canonicalUrl = `/posts/${slug}`
  const image = resolveOpenGraphImage(post.mainImage)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonicalUrl,
      ...(post.date && {
        publishedTime: post.date,
      }),
      ...(post.author?.name && {
        authors: [post.author.name],
      }),
      ...(image && {
        images: [image],
      }),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image && {
        images: [image.url],
      }),
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white py-8 px-3 sm:px-4 sm:py-12 font-sans text-gray-900">
      <div className="container mx-auto max-w-5xl">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-gray-500 transition-colors hover:text-red-700"
        >
          ← Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-8 border-b border-gray-200 pb-8">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-x-3 gap-y-2">
              {post.categories.map((cat, index) => (
                <Link
                  key={cat.slug?.current || index}
                  href={`/category/${cat.slug?.current || ''}`}
                  className="font-mono text-xs font-semibold uppercase tracking-widest text-red-700 transition-colors hover:text-red-900"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-5 font-serif text-lg italic leading-relaxed text-gray-600 sm:text-xl">
              {post.excerpt}
            </p>
          )}

          {/* Author and Publication Date */}
          {(post.author?.name || post.date) && (
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-gray-500">
              {post.author?.name && <span>By {post.author.name}</span>}

              {post.author?.name && post.date && (
                <span aria-hidden="true">·</span>
              )}

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
          )}
        </header>

        {/* Featured Image and Sharing Links */}
        {post.mainImage?.asset && (
          <figure className="mb-10">
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <Image
                src={urlForImage(post.mainImage)
                  .width(1600)
                  .auto('format')
                  .url()}
                alt={post.mainImage.alt || post.title || 'Article featured image'}
                fill
                priority
                sizes="(max-width: 768px) calc(100vw - 24px), 896px"
                className="object-cover"
              />
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              {post.mainImage.caption ? (
                <figcaption className="font-sans text-sm leading-relaxed text-gray-500 sm:max-w-[60%]">
                  {post.mainImage.caption}
                </figcaption>
              ) : (
                <div />
              )}

              <ShareLinks />
            </div>
          </figure>
        )}


        {/* Article Body */}
        <main className="prose prose-lg max-w-none font-serif leading-relaxed text-gray-800 sm:prose-xl">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="text-gray-400 italic">
              No content found for this post.
            </p>
          )}
        </main>
      </div>
    </article>
  )
}