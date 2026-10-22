import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import {
  postQuery,
  relatedPostsQuery,
} from '@/sanity/lib/queries'
import type { PostQueryResult } from '@/sanity.types'
import { resolveOpenGraphImage, urlForImage } from '@/sanity/lib/utils'
import ShareLinks from './ShareLinks'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(
  slug: string,
): Promise<PostQueryResult | null> {
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

export default async function PostPage({
  params,
}: PostPageProps) {
  const { slug } = await params
 const post = await getPost(slug)

if (!post) {
  console.error('Post not found for slug:', slug)
  notFound()
}

  const { data: relatedPosts } = await sanityFetch({
    query: relatedPostsQuery,
    params: { slug },
  })

  return (
    <article className="min-h-screen bg-white px-2 py-8 font-sans text-gray-900 sm:px-4 sm:py-12">
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
              {post.author?.name && (
                <span>By {post.author.name}</span>
              )}

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
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <Image
                src={urlForImage(post.mainImage)
                  .width(1600)
                  .auto('format')
                  .url()}
                alt={
                  post.mainImage.alt ||
                  post.title ||
                  'Article featured image'
                }
                fill
                priority
                sizes="(max-width: 639px) calc(100vw - 16px), (max-width: 768px) calc(100vw - 32px), 896px"
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

              <ShareLinks articleUrl={`https://the-visible-hand.vercel.app/posts/${post.slug}`} />
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

        {/* Related Articles */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-10 sm:mt-20 sm:pt-12">
            <div className="mb-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-red-700">
                Continue Reading
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                Explore More
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost._id}
                  className="min-w-0"
                >
                  <Link
                    href={`/posts/${relatedPost.slug}`}
                    className="group block"
                  >
                    {relatedPost.mainImage?.asset && (
                      <div className="relative mb-4 aspect-video overflow-hidden bg-gray-100">
                        <Image
                          src={urlForImage(relatedPost.mainImage)
                            .width(700)
                            .auto('format')
                            .url()}
                          alt={
                            relatedPost.mainImage.alt ||
                            relatedPost.title ||
                            'Related article image'
                          }
                          fill
                          sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                        />
                      </div>
                    )}

                    {relatedPost.categories &&
                      relatedPost.categories.length > 0 && (
                        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-red-700">
                          {relatedPost.categories
                            .map((category) => category.title)
                            .filter(Boolean)
                            .join(' / ')}
                        </p>
                      )}

                    <h3 className="font-serif text-xl font-bold leading-snug text-gray-900 underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:text-red-800 group-hover:decoration-red-800">
                      {relatedPost.title}
                    </h3>

                    {relatedPost.excerpt && (
                      <p className="mt-2 line-clamp-3 font-serif text-sm leading-relaxed text-gray-600">
                        {relatedPost.excerpt}
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
