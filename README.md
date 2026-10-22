# The Visible Hand

**An Editorial Journal on Culture, Policy & Ideas**

[Visit the live website](https://the-visible-hand.vercel.app) · [View the source code](https://github.com/Sagarbh61/the-visible-hand)

The Visible Hand is an independent editorial publication exploring ideas across economics, politics, literature, art, and fiction. It provides a space for essays, commentary, book reviews, and creative work, with an emphasis on thoughtful analysis and clear writing.

The project combines an editorial website with a headless content management system, bringing together content publishing, responsive design, search, and article discovery in a single platform.

## Features

- **Editorial homepage** with a structured presentation of published articles.
- **Category archives** for browsing content by subject.
- **Individual article pages** with publication metadata, featured images, and article content.
- **Related articles** to help readers discover relevant writing.
- **Search functionality** for finding articles across the publication.
- **Content management** through Sanity.
- **Responsive design** for desktop, tablet, and mobile screens.
- **SEO support**, including page metadata, Open Graph metadata, and sitemap generation.
- **Privacy-conscious analytics** with consent-gated Google Analytics.
- **Newsletter functionality** for reader subscriptions and confirmation flows.
- **Legal pages** covering privacy and cookie policies.

## Editorial Categories

The publication currently organizes content into five categories:

- **Economy** — Markets, development, and economic ideas.
- **Politics** — Power, institutions, and public policy.
- **Book Reviews** — Critical engagement with books and their arguments.
- **Art** — Art, culture, and creative expression.
- **Fiction** — Literary and creative writing.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Web application and routing |
| React | User interface |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling |
| Sanity | Headless content management |
| next-sanity | Integration between Next.js and Sanity |
| Vercel | Website deployment |
| Google Analytics 4 | Consent-gated website analytics |

## Project Structure

The repository is organized around the frontend application and its content-management integration.

```text
the-visible-hand/
├── frontend/
│   ├── app/
│   │   ├── components/       # Reusable interface components
│   │   ├── category/         # Category archive pages
│   │   ├── posts/            # Individual article pages
│   │   ├── search/           # Article search page
│   │   ├── privacy/          # Privacy policy
│   │   └── ...               # Other routes and layouts
│   ├── sanity/
│   │   └── lib/
│   │       └── queries.ts    # Sanity content queries
│   ├── sanity.types.ts       # Generated Sanity TypeScript types
│   └── package.json
├── sanity.schema.json
└── README.md
```

*The structure above highlights the main application areas rather than listing every project file.*

## Getting Started

### Prerequisites

- Node.js and npm
- A Sanity project with access to the relevant content dataset
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Sagarbh61/the-visible-hand.git
cd the-visible-hand
```

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Configure environment variables

Create a local `.env.local` file in the `frontend` directory and configure the environment variables required by the Sanity client and application.

Use the variable names expected by the project's existing configuration. Set up your own Sanity project credentials and dataset details where required.

For the production website URL, the application supports:

```env
NEXT_PUBLIC_SITE_URL=https://the-visible-hand.vercel.app
```

Do not commit API tokens, private credentials, or other secrets to the repository.

### 4. Start the development server

From the `frontend` directory, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

To generate an optimized production build, run:

```bash
npm run build
```

The production build includes Sanity type generation before the Next.js build.

## Content Management

Sanity serves as the content management system for the publication. It stores editorial content and makes that content available to the Next.js application through Sanity queries.

The frontend uses these queries to retrieve articles and category information for the homepage, article pages, category archives, search, and related-content sections.

To work on the content-management side, use the Sanity project configuration and schema included in the repository. Access to the relevant Sanity project and dataset may be required.

## Deployment

The website is deployed on Vercel:

**Production URL:** https://the-visible-hand.vercel.app

The source code is maintained on GitHub. Deployment settings, environment variables, and the connected Git repository determine how changes reach production.

## Development Goals

The project brings together editorial publishing and practical web development. Its ongoing development focuses on:

- Improving article readability and navigation.
- Maintaining consistent layouts across pages and screen sizes.
- Making editorial content easier to search and discover.
- Supporting a maintainable content-management workflow.
- Improving accessibility, metadata, and production reliability.

## Author

**Sagar Bhattarai**

Creator and editor of The Visible Hand.

The publication explores economics, institutions, politics, literature, and culture through essays, reviews, and creative work.

---

*The Visible Hand — An Editorial Journal on Culture, Policy & Ideas.*