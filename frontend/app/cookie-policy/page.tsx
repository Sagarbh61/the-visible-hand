import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Learn about cookies and similar technologies used by The Visible Hand.',
  alternates: {
    canonical: '/cookie-policy',
  },
}

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-12 border-b border-current/20 pb-8">
        <p className="mb-3 text-sm uppercase tracking-widest opacity-60">
          The Visible Hand
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm opacity-60">
          Last updated: October 20, 2026
        </p>
      </header>

      <div className="space-y-10 leading-7">
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            1. What cookies are
          </h2>
          <p>
            Cookies are small pieces of information stored by a website in
            your browser. Websites and their service providers may also use
            related technologies to support functionality, security, and
            performance.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            2. How this website uses cookies
          </h2>
          <p>
            The Visible Hand does not currently integrate a dedicated
            advertising or general-purpose analytics platform in its
            application code.
          </p>
          <p className="mt-3">
            The website uses Next.js draft mode for editorial preview
            functionality. When an authorized editor enables preview mode,
            the framework may set a cookie so that unpublished content can
            be previewed. This is a functional use associated with editorial
            preview, rather than an advertising feature.
          </p>
          <p className="mt-3">
            Hosting infrastructure and other website components may also
            process technical information needed to deliver and secure the
            site. The exact behavior can depend on the service and the
            request.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            3. Newsletter links and email
          </h2>
          <p>
            Newsletter confirmation uses a link containing a temporary
            token. The application uses this token to confirm a subscription;
            the link itself does not establish that a cookie has been set.
            Email providers may have their own technologies and privacy
            practices when you interact with their messages.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            4. Managing cookies
          </h2>
          <p>
            Most browsers let you view, restrict, or delete cookies through
            their settings. Blocking cookies may affect features that depend
            on them, including editorial preview functionality.
          </p>
          <p className="mt-3">
            Browser controls do not necessarily control every form of
            technical processing performed by hosting or other service
            providers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            5. Changes and contact
          </h2>
          <p>
            This policy may be updated if the website introduces new
            functionality or third-party services. For questions, contact
            The Visible Hand using the email address listed in the site
            footer.
          </p>
        </section>
      </div>
    </main>
  )
}