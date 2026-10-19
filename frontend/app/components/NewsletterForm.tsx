'use client'

import { useState } from 'react'
import { subscribeToNewsletter } from '../actions/subscribe'

export function NewsletterForm() {
  const [status, setStatus] = useState<{ message?: string; isError?: boolean }>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setStatus({})

    const formData = new FormData(event.currentTarget)
    const res = await subscribeToNewsletter(formData)

    setLoading(false)
    if (res.error) {
      setStatus({ message: res.error, isError: true })
    } else if (res.success) {
      setStatus({ message: res.success, isError: false })
      ;(event.target as HTMLFormElement).reset()
    }
  }

  return (
    <div className="bg-gray-50 py-8 px-4">

      <div className="container mx-auto  flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left Side: Title & Description */}
        <div className="text-center md:text-left space-y-1">
          <h2 className="font-serif whitespace-nowrap text-lg sm:text-xl font-bold text-gray-900">
            Subscribe to our newsletter
          </h2>
          <p className="text-xs font-serif italic text-gray-600">
            Essays on economics, politics, and culture delivered to your inbox.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-auto">
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto md:mx-0">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address..."
              className="w-full md:w-64 px-4 py-2 text-xs font-mono bg-white border border-gray-300 focus:outline-none focus:border-red-800 transition-colors text-gray-900"
            />
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#ef4444' }} // Guaranteed direct CSS fallback
              className="px-4 cursor-pointer py-2 text-xs font-mono font-bold uppercase tracking-wider text-white disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {loading ? 'Joining...' : 'Subscribe'}
            </button>
          </form>

          {status.message && (
            <p
              className={`text-xs font-mono pt-2 text-center md:text-left ${
                status.isError ? 'text-red-600' : 'text-green-700'
              }`}
            >
              {status.message}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}