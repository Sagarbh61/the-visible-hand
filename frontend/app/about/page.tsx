
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about The Visible Hand, an editorial journal exploring culture, policy, economics, books, art, and fiction.',
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <header className="mb-12 border-b border-neutral-300 pb-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Culture, Policy &amp; Ideas
        </p>

        <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          About The Visible Hand
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          An editorial journal exploring the ideas, institutions, and cultural
          forces that shape society.
        </p>
      </header>

      <div className="space-y-10 text-base leading-8 text-neutral-700">
        <section>
          <h2 className="mb-4 font-serif text-2xl text-neutral-900">
            The publication
          </h2>

          <p>
            The Visible Hand is a space for essays and criticism on economics,
            politics, books, art, and fiction. It explores how ideas influence
            institutions, how institutions shape human behaviour, and how
            culture helps us understand the world around us.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl text-neutral-900">
            An approach to ideas
          </h2>

          <p>
            Understanding social and political questions requires more than
            slogans or easy explanations. It requires attention to evidence,
            incentives, institutions, historical context, and the trade-offs
            involved in public choices.
          </p>

          <p className="mt-4">
            The aim is to examine arguments seriously, question assumptions,
            and make the reasoning behind conclusions clear. Agreement is less
            important than understanding what an argument claims, what
            supports it, and where its limitations lie.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl text-neutral-900">
            What you will find here
          </h2>

          <ul className="space-y-3">
            <li>
              <strong className="text-neutral-900">Economics:</strong>{' '}
              Markets, development, institutions, and economic ideas.
            </li>
            <li>
              <strong className="text-neutral-900">Politics:</strong>{' '}
              Power, public policy, and the institutions that govern society.
            </li>
            <li>
              <strong className="text-neutral-900">Book Reviews:</strong>{' '}
              Critical engagement with books and the ideas they explore.
            </li>
            <li>
              <strong className="text-neutral-900">Art:</strong>{' '}
              Art, culture, and their place in public and intellectual life.
            </li>
            <li>
              <strong className="text-neutral-900">Fiction:</strong>{' '}
              Literary works, narrative, and the craft of writing.
            </li>
          </ul>
        </section>

        <section className="border-t border-neutral-300 pt-8">
          <h2 className="mb-4 font-serif text-2xl text-neutral-900">
            About the editor
          </h2>

          <p>
            The Visible Hand is edited by Sagar Bhattarai. The publication
            brings together an interest in economics, political institutions,
            literature, and the ideas that shape how we understand society.
          </p>
        </section>
      </div>
    </main>
  )
}
