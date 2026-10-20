
'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

type Consent = 'accepted' | 'rejected' | 'unset'

const CONSENT_KEY = 'tvh-analytics-consent'
const GA_ID = 'G-037N3WNEK2'

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY)

    setConsent(
      saved === 'accepted' || saved === 'rejected'
        ? saved
        : 'unset',
    )
  }, [])

  function chooseConsent(choice: 'accepted' | 'rejected') {
    const previous = window.localStorage.getItem(CONSENT_KEY)

    window.localStorage.setItem(CONSENT_KEY, choice)
    setConsent(choice)
    setShowSettings(false)

    // Reload after withdrawing previously granted consent.
    // The new page load will not mount Google Analytics.
    if (previous === 'accepted' && choice === 'rejected') {
      window.location.reload()
    }
  }

  if (consent === null) {
    return null
  }

  return (
    <>
      {consent === 'accepted' && <GoogleAnalytics gaId={GA_ID} />}

      {consent === 'unset' || showSettings ? (
        <aside
          aria-label="Analytics and privacy preferences"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-5 shadow-lg sm:p-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-base font-semibold text-gray-900">
                Your privacy choices
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                The Visible Hand would like to use Google Analytics to
                understand how visitors use the site. Analytics will remain
                disabled unless you accept. You can change your choice later
                in Cookie settings. Read our{' '}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-red-800"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href="/cookie-policy"
                  className="underline underline-offset-2 hover:text-red-800"
                >
                  Cookie Policy
                </a>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => chooseConsent('rejected')}
                className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
              >
                Reject analytics
              </button>
              <button
                type="button"
                onClick={() => chooseConsent('accepted')}
                className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="fixed bottom-3 right-3 z-40 rounded border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm hover:bg-gray-100"
        >
          Cookie settings
        </button>
      )}
    </>
  )
}
