
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { defineQuery } from 'next-sanity'

const categoryQuery = defineQuery(`
  *[
    _type == "category" &&
    slug.current == $slug
  ][0] {
    title,
    "slug": slug.current,
    description
  }
`)

const postsByCategoryQuery = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    $categorySlug in categories[]->slug.current
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt
  }
`)

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getCategory(slug: string) {
  return client.fetch(categoryQuery, { slug })
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    }
  }

  const title = category.title
  const description =
    category.description ||
    `Explore essays and articles on ${title} from The Visible Hand, an editorial journal covering culture, policy, and ideas.`

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `/category/${slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts: {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string | null
    excerpt: string | null
  }[] = await client.fetch(postsByCategoryQuery, {
    categorySlug: slug,
  })
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 border-b border-gray-200 pb-6 text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gray-500">
          Category Archive
        </p>

        <h1 className="font-serif text-4xl font-bold text-gray-900 sm:text-5xl">
          {category.title}
        </h1>

        {category.description && (
          <p className="mx-auto mt-4 max-w-2xl font-serif leading-relaxed text-gray-600">
            {category.description}
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="space-y-4 py-20 text-center">
          <p className="font-serif text-lg italic text-gray-600">
            No essays found in this category yet.
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-gray-400">
            Check back soon for new analysis and commentary.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <article
              key={post._id}
              className="space-y-3 border-b border-gray-100 pb-10"
            >
              {post.publishedAt && (
                <div className="font-mono text-xs text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              )}

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
                Read Essay &rarr;
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
