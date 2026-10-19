
'use client'

import { useRef, useState } from 'react'
import { subscribeToNewsletter } from '../actions/subscribe'

export function NewsletterForm() {
  const [status, setStatus] = useState<{
    message?: string
    isError?: boolean
  }>({})
  const [loading, setLoading] = useState(false)
  const requestInProgress = useRef(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (requestInProgress.current) {
      return
    }

    requestInProgress.current = true
    setLoading(true)
    setStatus({})

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const res = await subscribeToNewsletter(formData)

      if (res.error) {
        setStatus({ message: res.error, isError: true })
      } else if (res.success) {
        setStatus({ message: res.success, isError: false })
        form.reset()
      }
    } catch {
      setStatus({
        message: 'Something went wrong. Please try again shortly.',
        isError: true,
      })
    } finally {
      requestInProgress.current = false
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="whitespace-nowrap font-serif text-lg font-bold text-gray-900 sm:text-xl">
            Subscribe to our newsletter
          </h2>
          <p className="font-serif text-xs italic text-gray-600">
            Essays on economics, politics, and culture delivered to your inbox.
          </p>
        </div>

        <div className="w-full md:w-auto">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md gap-2 md:mx-0"
          >
            <input
              type="text"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-2499.75"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Your email address..."
              className="w-full border border-gray-300 bg-white px-4 py-2 font-mono text-xs text-gray-900 transition-colors focus:border-red-800 focus:outline-none md:w-64"
            />

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#ef4444' }}
              className="cursor-pointer whitespace-nowrap px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Subscribe'}
            </button>
          </form>

          <p className="mt-2 font-serif text-xs text-gray-500">
            By subscribing, you agree to receive email updates from The Visible Hand.
          </p>

          {status.message && (
            <p
              role={status.isError ? 'alert' : 'status'}
              className={`pt-2 text-center font-mono text-xs md:text-left ${
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
