
'use server'

import { Resend } from 'resend'

export async function subscribeToNewsletter(formData: FormData) {
  const emailValue = formData.get('email')

  if (
    typeof emailValue !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim())
  ) {
    return { error: 'Please provide a valid email address.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    console.error('Newsletter configuration is missing.')
    return {
      error: 'Newsletter subscriptions are temporarily unavailable.',
    }
  }

  try {
    const resend = new Resend(apiKey)

    const { error } = await resend.contacts.create({
      email: emailValue.trim().toLowerCase(),
      audienceId,
      unsubscribed: false,
    })

    if (error) {
      console.error('Newsletter subscription failed:', error.name)
      return {
        error: 'Failed to subscribe. Please try again shortly.',
      }
    }

    return {
      success: 'Thank you for subscribing!',
    }
  } catch (error) {
    console.error('Newsletter subscription failed.')

    return {
      error: 'Failed to subscribe. Please try again shortly.',
    }
  }
}
