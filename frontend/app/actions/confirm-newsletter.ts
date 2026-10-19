
'use server'

import { createHash } from 'node:crypto'
import { sql } from '../../db/client'
import {
  NewsletterPreviouslyUnsubscribedError,
  syncConfirmedNewsletterSubscriber,
} from '../../lib/newsletter-subscription'

export async function confirmNewsletterSubscription(token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) {
    return {
      error: 'This confirmation link is invalid or has expired.',
    }
  }

  const tokenHash = createHash('sha256').update(token).digest('hex')

  try {
    const rows = await sql`
      UPDATE newsletter_confirmation_tokens
      SET confirmed_at = COALESCE(confirmed_at, NOW())
      WHERE token_hash = ${tokenHash}
        AND (
          expires_at > NOW()
          OR (confirmed_at IS NOT NULL AND subscribed_at IS NULL)
        )
      RETURNING email, subscribed_at
    `

    if (rows.length !== 1) {
      return {
        error: 'This confirmation link is invalid or has expired.',
      }
    }

    const { email, subscribed_at } = rows[0]

    if (subscribed_at) {
      return {
        success: 'Your email is already confirmed and subscribed.',
      }
    }

    try {
      await syncConfirmedNewsletterSubscriber(email)

      await sql`
        UPDATE newsletter_confirmation_tokens
        SET subscribed_at = NOW()
        WHERE token_hash = ${tokenHash}
          AND confirmed_at IS NOT NULL
          AND subscribed_at IS NULL
      `

      return {
        success: 'Your email has been confirmed and subscribed.',
      }
    } catch (error) {
      if (error instanceof NewsletterPreviouslyUnsubscribedError) {
        return {
          error:
            'This address has previously unsubscribed. Please contact us if you want to change that preference.',
        }
      }

      console.error('Newsletter subscription synchronization failed.')

      return {
        error:
          'Your email is confirmed, but we could not finish the subscription right now. Please try this link again shortly.',
      }
    }
  } catch {
    console.error('Newsletter confirmation failed.')

    return {
      error: 'We could not confirm your email right now. Please try again.',
    }
  }
}
