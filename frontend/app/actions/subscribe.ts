'use server'

import { createNewsletterConfirmation } from '../../db/newsletter-confirmation'
import { sendNewsletterConfirmationEmail } from '../../lib/newsletter-email'

export async function subscribeToNewsletter(formData: FormData) {
  const emailValue = formData.get('email')
  const honeypotValue = formData.get('companyWebsite')

  // Silently ignore likely automated submissions.
  if (typeof honeypotValue === 'string' && honeypotValue.trim() !== '') {
    return { success: 'Thank you for subscribing!' }
  }

  if (
    typeof emailValue !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim())
  ) {
    return { error: 'Please provide a valid email address.' }
  }

  const email = emailValue.trim().toLowerCase()

  try {
    const token = await createNewsletterConfirmation(email)
    await sendNewsletterConfirmationEmail(email, token)

    return {
      success: 'Please check your inbox for a confirmation link.',
    }
  } catch {
    console.error('Newsletter confirmation request failed.')

    return {
      error: 'We could not send a confirmation email right now. Please try again shortly.',
    }
  }
}
