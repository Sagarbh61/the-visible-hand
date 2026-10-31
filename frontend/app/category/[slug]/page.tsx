
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { defineQuery } from 'next-sanity'
import { urlForImage } from '@/sanity/lib/utils'
import DateComponent from '@/app/components/Date'

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
    "slug": slug.current,
    "date": publishedAt,
    excerpt,
    mainImage {
      ...,
      alt
    },
    "categories": categories[]->{
      title,
      "slug": slug.current
    }
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
type CategoryPost = {
  _id: string
  title: string
  slug: string
  date: string | null
  excerpt: string | null
  mainImage: {
    alt?: string | null
    asset?: {
      _ref: string
      _type: 'reference'
    }
  } | null
  categories: {
    title: string | null
    slug: string | null
  }[] | null
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

const posts: CategoryPost[] = await client.fetch(postsByCategoryQuery, {
  categorySlug: slug,
})

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10  border-gray-200 pb-6 text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gray-500">
          Archive /
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
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 pt-2 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = post.mainImage
              ? urlForImage(post.mainImage)
                  .width(800)
                  .height(500)
                  .fit('crop')
                  .url()
              : null

            const categoryTitle = post.categories?.[0]?.title

            return (
              <article
                key={post._id}
                className="group flex h-full flex-col overflow-hidden"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
                >
                  <div className="relative aspect-8/5 overflow-hidden bg-gray-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.mainImage?.alt || post.title || 'Article image'}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image available
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col items-start pt-5">
                    {categoryTitle && (
                      <p className="mb-3 w-fit font-mono text-xs uppercase tracking-wider text-gray-500">
                        {categoryTitle}
                      </p>
                    )}

                   <h2 className="font-serif text-xl font-bold leading-snug text-gray-900 underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:text-red-800 group-hover:decoration-red-800">
  {post.title}
</h2>

                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.excerpt}
                      </p>
                    )}

                    {post.date && (
                      <time
                        className="mt-auto pt-5 font-mono text-xs text-gray-500"
                        dateTime={post.date}
                      >
                        <DateComponent dateString={post.date} />
                      </time>
                    )}
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
