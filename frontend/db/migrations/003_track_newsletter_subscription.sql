ALTER TABLE newsletter_confirmation_tokens
ADD COLUMN IF NOT EXISTS subscribed_at timestamptz;
