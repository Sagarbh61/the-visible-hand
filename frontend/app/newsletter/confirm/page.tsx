
'use client'

import { Suspense, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { confirmNewsletterSubscription } from '../../actions/confirm-newsletter'

function ConfirmNewsletterContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const requestInProgress = useRef(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (requestInProgress.current || !token) {
      return
    }

    requestInProgress.current = true
    setLoading(true)
    setMessage('')

    try {
      const result = await confirmNewsletterSubscription(token)

      if (result.error) {
        setIsError(true)
        setMessage(result.error)
      } else if (result.success) {
        setIsError(false)
        setMessage(result.success)
      }
    } catch {
      setIsError(true)
      setMessage('Something went wrong. Please try again shortly.')
    } finally {
      requestInProgress.current = false
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <h2 className="font-serif text-3xl font-bold text-gray-900">
        Confirm your newsletter subscription
      </h2>

      <p className="mt-4 text-sm text-gray-600">
        Confirm your email address to receive updates from The Visible Hand.
      </p>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading || !token || Boolean(message && !isError)}
        className="mt-8 bg-red-500 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Confirming...' : 'Confirm subscription'}
      </button>

      {!token && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          This link is missing its confirmation token. Please request a new link.
        </p>
      )}

      {message && (
        <p
          role={isError ? 'alert' : 'status'}
          className={`mt-4 text-sm ${isError ? 'text-red-600' : 'text-green-700'}`}
        >
          {message}
        </p>
      )}
    </main>
  )
}

export default function ConfirmNewsletterPage() {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-sm text-gray-600">
            Loading confirmation page...
          </p>
        </main>
      }
    >
      <ConfirmNewsletterContent />
    </Suspense>
  )
}
