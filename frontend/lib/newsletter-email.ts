import 'server-only'

import { Resend } from 'resend'

export async function sendNewsletterConfirmationEmail(
  email: string,
  token: string,
) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!apiKey || !from || !siteUrl) {
    throw new Error('Newsletter email configuration is missing.')
  }

  const confirmationUrl = new URL('/newsletter/confirm', siteUrl)
  confirmationUrl.searchParams.set('token', token)

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: 'Confirm your subscription to The Visible Hand',
    text: [
      'Thanks for your interest in The Visible Hand.',
      '',
      'Please confirm your newsletter subscription using this link:',
      confirmationUrl.toString(),
      '',
      'This link expires in 24 hours. If you did not request this, you can ignore this email.',
    ].join('\n'),
    html: `
      <p>Thanks for your interest in The Visible Hand.</p>
      <p>Please confirm your newsletter subscription by clicking the link below:</p>
      <p><a href="${confirmationUrl.toString()}">Confirm my subscription</a></p>
      <p>This link expires in 24 hours. If you did not request this, you can ignore this email.</p>
    `,
  })

  if (error) {
    console.error('Newsletter confirmation email failed:', error.name)
    throw new Error('Could not send newsletter confirmation email.')
  }
}
