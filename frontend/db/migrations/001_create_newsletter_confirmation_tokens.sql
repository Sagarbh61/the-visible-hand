CREATE TABLE IF NOT EXISTS newsletter_confirmation_tokens (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email text NOT NULL,
    token_hash text NOT NULL UNIQUE,
    expires_at timestamptz NOT NULL,
    confirmed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_confirmation_tokens_email_created_at
    ON newsletter_confirmation_tokens (email, created_at DESC);
