import { permanentRedirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string; postSlug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { postSlug } = await params

  permanentRedirect(`/posts/${postSlug}`)
}