import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how The Visible Hand handles personal information and newsletter subscriptions.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-12 border-b border-current/20 pb-8">
        <p className="mb-3 text-sm uppercase tracking-widest opacity-60">
          The Visible Hand
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm opacity-60">
          Last updated: October 20, 2026
        </p>
      </header>

      <div className="space-y-10 leading-7">
        <section>
          <h2 className="mb-3 text-xl font-semibold">1. About this policy</h2>
          <p>
            The Visible Hand is an independent editorial publication. This
            policy explains what personal information may be processed when
            you visit the website or subscribe to the newsletter, why it is
            used, and how you can contact us about your information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            2. Information we collect
          </h2>
          <p>
            You can read publicly available articles without creating an
            account. If you request a newsletter subscription, we collect the
            email address you provide.
          </p>
          <p className="mt-3">
            To manage confirmation, the newsletter system stores your email
            address and associated records, including a confirmation-token
            hash, token expiry, creation time, confirmation time, and
            subscription time where applicable.
          </p>
          <p className="mt-3">
            Like most websites, the site infrastructure may also process
            technical information associated with requests, such as IP
            addresses, browser details, and request timestamps, for delivery,
            reliability, and security. The precise information retained
            depends on the services involved.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            3. How we use information
          </h2>
          <p>Information is used as necessary to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Send and manage newsletter confirmation emails.</li>
            <li>Record confirmation and subscription status.</li>
            <li>Maintain newsletter contact and subscription preferences.</li>
            <li>Operate, secure, and troubleshoot the website.</li>
            <li>Respond to privacy or subscription-related requests.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            4. Newsletter and service providers
          </h2>
          <p>
            Newsletter subscriptions use a database to manage confirmation
            records. Resend is used to send confirmation emails and manage
            newsletter contacts. Your email address is processed by these
            services as needed to provide the newsletter.
          </p>
          <p className="mt-3">
            The website is hosted using Vercel, and its editorial content is
            managed through Sanity. These providers may process technical or
            account-related information as part of delivering their services.
            Their own privacy policies and practices also apply.
          </p>
          <p className="mt-3">
            We do not currently integrate a general-purpose analytics service
            in the application code. This may change if the website's needs
            change, in which case this policy should be updated.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            5. Retention and security
          </h2>
          <p>
            Information is retained as needed to operate the newsletter,
            maintain subscription preferences, and meet applicable
            obligations. We do not currently state a fixed deletion period
            for newsletter records.
          </p>
          <p className="mt-3">
            The site uses technical safeguards such as server-side processing
            of newsletter operations and hashed confirmation tokens. No
            internet transmission or storage system can be guaranteed to be
            completely secure.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            6. Your choices and requests
          </h2>
          <p>
            You do not need to subscribe to read the publication. If you want
            to ask about your newsletter information, correct it, request
            deletion, or change your subscription preference, contact The
            Visible Hand using the email address provided in the site footer.
          </p>
          <p className="mt-3">
            We will review requests and respond as appropriate under
            applicable law. Some records may need to be retained for
            legitimate operational or legal reasons.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            7. International processing
          </h2>
          <p>
            Our hosting, database, and email providers may process information
            in countries other than your own. The safeguards and rules that
            apply depend on the providers and the relevant jurisdictions.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            8. Changes and contact
          </h2>
          <p>
            This policy may be updated as the website develops. The latest
            version will be published on this page with its revision date.
            For questions about this policy or your information, contact us
            using the email address in the site footer.
          </p>
        </section>
      </div>
    </main>
  )
}