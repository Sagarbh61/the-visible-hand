
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
    <div className="w-full min-w-0 bg-transparent p-0">
      <div className="flex w-full min-w-0 flex-col items-start gap-4">
        <div className="w-full min-w-0 space-y-1">
          <h2 className="font-serif text-xl font-bold leading-snug text-gray-900">
            Subscribe to our newsletter
          </h2>
          <p className="font-serif text-xs leading-5 italic text-gray-600">
            Essays on economics, politics, and culture delivered to your inbox.
          </p>
        </div>

        <div className="w-full min-w-0">
          <form onSubmit={handleSubmit} className="flex w-full min-w-0 flex-col gap-2">
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
              placeholder="yourname@email.com"
              className="box-border rounded-sm w-ful h-15 min-w-0 border border-gray-300 bg-white px-3 py-2.5 font-sans text-[14px] text-gray-900 transition-colors focus:border-red-800 focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-40 sm:w-full cursor-pointer` bg-red-700 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Subscribe'}
            </button>
          </form>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            By subscribing, you agree to receive email updates from The Visible Hand.
          </p>

          {status.message && (
            <p
              role={status.isError ? 'alert' : 'status'}
              className={`pt-2 font-mono text-xs ${
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
