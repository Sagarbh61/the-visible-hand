import Image from 'next/image'
import Link from 'next/link'

import { sanityFetch } from '@/sanity/lib/live'
import { morePostsQuery, allPostsQuery } from '@/sanity/lib/queries'
import { AllPostsQueryResult } from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import OnBoarding from '@/app/components/Onboarding'
import { dataAttr, urlForImage } from '@/sanity/lib/utils'

const Post = ({ post }: { post: AllPostsQueryResult[number] }) => {
  const { _id, title, slug, excerpt, date, mainImage, categories } = post
  const imageUrl = mainImage ? urlForImage(mainImage).width(800).height(500).fit('crop').url() : null
  const category = categories?.[0]?.title

  return (
    <article
      data-sanity={dataAttr({ id: _id, type: 'post', path: 'title' }).toString()}
      className="group flex h-full flex-col overflow-hidden"
    >
      <Link
        href={`/posts/${slug}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
      >
        <div className="relative aspect-8/5 overflow-hidden bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={mainImage?.alt || title || 'Article image'}
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

        <div className="flex items-start flex-1 flex-col pt-5">
          {category && (
            <p className="mb-3 w-fit font-mono text-xs uppercase tracking-wider text-gray-500 decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-gray-500">
              {category}
            </p>
          )}

          <h3 className="font-serif text-xl font-bold leading-snug text-gray-900 underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:text-red-800 group-hover:decoration-red-800">
            {title}
          </h3>

          {excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
              {excerpt}
            </p>
          )}

          <time
            className="mt-auto pt-5 font-mono text-xs text-gray-500"
            dateTime={date}
          >
            <DateComponent dateString={date} />
          </time>
        </div>
      </Link>
    </article>
  )
}

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && (
      <h2 className="border-b border-gray-900 pb-3 font-serif text-2xl font-bold text-gray-900">
        {heading}
      </h2>
    )}
    {subHeading && <p className="mt-2 text-sm leading-6 text-gray-600">{subHeading}</p>}
    <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  </div>
)

export const MorePosts = async ({ skip, limit }: { skip: string; limit: number }) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading="More articles">
      {data.map((post: AllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery })

  if (!data || data.length === 0) {
    return <OnBoarding />
  }

  return (
    <Posts>
      {data.map((post: AllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}