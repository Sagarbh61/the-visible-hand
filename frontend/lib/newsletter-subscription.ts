
import 'server-only'

import { Resend } from 'resend'

export class NewsletterPreviouslyUnsubscribedError extends Error {
  constructor() {
    super('This contact has previously unsubscribed.')
    this.name = 'NewsletterPreviouslyUnsubscribedError'
  }
}

export async function syncConfirmedNewsletterSubscriber(email: string) {
  const apiKey = process.env.RESEND_API_KEY
  const segmentId = process.env.RESEND_SEGMENT_ID

  if (!apiKey || !segmentId) {
    throw new Error('Newsletter subscription configuration is missing.')
  }

  const resend = new Resend(apiKey)
  let contactResult = await resend.contacts.get({ email })

  if (contactResult.error) {
    if (contactResult.error.statusCode !== 404) {
      throw new Error('Could not look up the newsletter contact.')
    }

    const createResult = await resend.contacts.create({
      email,
      segments: [{ id: segmentId }],
    })

    if (!createResult.error) {
      return
    }

    // Another request may have created the contact concurrently.
    contactResult = await resend.contacts.get({ email })

    if (contactResult.error) {
      throw new Error('Could not create or look up the newsletter contact.')
    }
  }

  if (contactResult.data.unsubscribed) {
    throw new NewsletterPreviouslyUnsubscribedError()
  }

  let after: string | undefined
  let alreadyInSegment = false

  do {
    const options = after
      ? { email, limit: 100, after }
      : { email, limit: 100 }

    const segmentsResult = await resend.contacts.segments.list(options)

    if (segmentsResult.error) {
      throw new Error('Could not check newsletter segment membership.')
    }

    alreadyInSegment = segmentsResult.data.data.some(
      (segment) => segment.id === segmentId,
    )

    if (alreadyInSegment || !segmentsResult.data.has_more) {
      break
    }

    const lastSegment = segmentsResult.data.data.at(-1)

    if (!lastSegment) {
      throw new Error('Could not continue checking segment membership.')
    }

    after = lastSegment.id
  } while (!alreadyInSegment)

  if (!alreadyInSegment) {
    const addResult = await resend.contacts.segments.add({
      email,
      segmentId,
    })

    if (addResult.error) {
      throw new Error('Could not add the contact to the newsletter segment.')
    }
  }
}
