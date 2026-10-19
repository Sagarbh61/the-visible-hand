import 'server-only'

import { createHash, randomBytes } from 'node:crypto'
import { sql } from './client'

const TOKEN_TTL_HOURS = 24

export async function createNewsletterConfirmation(email: string) {
  const token = randomBytes(32).toString('hex')
  const tokenHash = createHash('sha256').update(token).digest('hex')

  await sql`
    INSERT INTO newsletter_confirmation_tokens (
      email,
      token_hash,
      expires_at
    )
    VALUES (
      ${email},
      ${tokenHash},
      NOW() + (${TOKEN_TTL_HOURS} * INTERVAL '1 hour')
    )
    ON CONFLICT (email) WHERE confirmed_at IS NULL
    DO UPDATE SET
      token_hash = EXCLUDED.token_hash,
      expires_at = EXCLUDED.expires_at,
      created_at = NOW()
  `

  return token
}
