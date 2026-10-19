import { Suspense } from 'react'
import { AllPosts } from '@/app/components/Posts'

export default async function Page() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <section>
        <h2 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-900 pb-2 mb-8">
          Latest Articles
        </h2>
        <Suspense
          fallback={
            <div className="space-y-6 py-8 text-center text-gray-500 font-serif italic">
              Loading essays...
            </div>
          }
        >
          <AllPosts />
        </Suspense>
      </section>
    </main>
  )
}