CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_confirmation_one_pending_per_email
    ON newsletter_confirmation_tokens (email)
    WHERE confirmed_at IS NULL;
