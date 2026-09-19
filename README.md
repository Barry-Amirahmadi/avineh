# آوینه / AVINEH

RTL-first Persian atelier site for made-to-measure bridal and occasion wear —
homepage, collection, gown detail, gallery and about/contact, statically
exported. A template shown as a portfolio piece, not a live storefront: there is
no cart, no checkout and no payment, and the contact numbers are deliberate
placeholders.

Derived from the PARNIAN template. Same architecture, same routes, same
guarantees; different trade, palette, typography and copy.

```bash
npm install
npm run dev      # http://localhost:3210
npm run build
npm run typecheck
```

## Where things are

| Path | What it holds |
|---|---|
| `src/app/tokens.css` | **Every** colour, size, duration and easing. Nothing is hardcoded elsewhere. |
| `src/app/globals.css` | Cascade layers, typography, grid, motion, the ambient-shade signature. |
| `src/app/components.css` | Buttons, nav, gallery, lightbox, thumbnail strip. |
| `src/content/*.ts` | All copy and imagery. This is what a CMS would replace. |
| `src/types/content.ts` | The content contract. Components read only these shapes. |
| `src/components/` | `layout · navigation · hero · products · gallery · sections · ui · motion` |
| `scripts/generate-media.mjs` | Regenerates the placeholder "material studies" in `public/media`. |

## Content architecture

Content is modelled, not written into components. Every user-facing string and
every image on the site comes from `src/content/*.ts`, and every one of those
exports is annotated against an explicit interface in `src/types/content.ts` —
never left to inference, so deleting a field fails the type check rather than
silently rendering nothing.

Nine gowns across three collections, eight gallery plates. Each gown carries a
required primary photograph plus two to four additional `views` shown only on
its own page.

## Verification

```bash
npm run typecheck
npm run lint
npm run build:pages
npm run preview:pages   # http://localhost:4321/avineh/
npm run test:smoke
```

`build:pages` exists because Git Bash rewrites a leading-slash argument into a
Windows path. Run it rather than passing `NEXT_PUBLIC_BASE_PATH` by hand, or
export `MSYS_NO_PATHCONV=1` first.

## Deployment

GitHub Pages via `.github/workflows/deploy.yml`, which reads the base path from
`actions/configure-pages` rather than hardcoding it. `output: 'export'` — there
is no Node runtime in production, so no API routes, no Server Actions, no
middleware and no ISR, anywhere, ever.

The site is excluded from search engines on purpose: `robots.ts` disallows
everything and the root metadata sets `index: false`. It is a demonstration
under a personal account, not a business that wants to be found.
