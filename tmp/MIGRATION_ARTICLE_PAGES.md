# Migration: remove dynamic articles → manual pages + WP-derived listing

## Delete

- `middleware.ts`
- `app/category/articles/[slug]/page.tsx` (folder)
- `components/article-body.tsx`, `article-related.tsx`, `article-rich-text.tsx`
- `data/articles.ts`, `article-types.ts`, `article-slugs.ts`, `article-builders.ts`
- `data/article-bodies/` (all `.ts`)
- `scripts/fetch-article-heroes.mjs`
- CSS block `/* Article detail` through end in `app/globals.css`

## Add

- `data/article-listing-types.ts` — `{ path, title, excerpt, image }`
- `data/article-listing-data.ts` — 50 rows; generate from `https://www.annabelkarmel.com/wp-json/wp/v2/posts?per_page=100&page=1`
- `app/category/articles/page.tsx` — import `articleListingItems`, paginate, `Link href={item.path}`
- Per-article routes: `app/<slug>/page.tsx` — one folder per AK URL segment (e.g. `app/development-milestones-toddlers-expect/page.tsx`)

## Listing

Paths must equal AK pathname: `/development-milestones-toddlers-expect`.

## Milestones page

Custom JSX matching [AK milestones layout](https://www.annabelkarmel.com/development-milestones-toddlers-expect/) — sections per age, category headings, ULs; omit broken “Accordion #2” lorem content.
