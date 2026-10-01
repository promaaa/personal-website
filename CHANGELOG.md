# Changelog

All notable changes to promaa.tech. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/):

- **major**: redesign, or any change to a public URL
- **minor**: a new section, essay, book list entry or easter egg
- **patch**: fixes, copy edits, performance and accessibility work

Each release is a git tag (`vX.Y.Z`) on `main`. Work lands through pull requests.

## [Unreleased]

## [2.0.2] - 2026-10-01

### Fixed
- The shelf search said "1 books". Counts now use `Intl.PluralRules`: "1 book", and in French "0 livre", "1 livre".

### Changed
- README: a link to the live site, a release badge, and a gallery of the main features (both themes, three phones, an essay, the shelf search, the PDF guide), plus HTTPS notes for a Cloudflare-proxied domain.

## [2.0.1] - 2026-10-01

### Fixed
- Dark theme colours. The running text was baby blue and the accent salmon pink on a cold black. The theme is now read by lamplight: warm black (`--stone-12`), parchment text (`--sand-1`), warm grey for secondary text (`--sand-4`) and a true red accent (`--red-6`). Colour stays on titles and accents, never on running text. Contrast still passes AA everywhere (axe, 0 violations).

## [2.0.0] - 2026-10-01

The redesign: the Diptych layout with the Postcard voice, chosen from the third round of proposals.

### Added
- One painting per page, AI-generated, fixed on the left half of wide screens and slipped in as a postcard on phones.
- `assets/css/tokens.css`, the single source of every design value: Utopia type and space, Open Props colours, three Kinetics motion curves in `linear()`.
- Ten easter eggs and a ledger (*postmarks*), each loaded only when triggered. See `EASTER_EGGS.md`.
- French shelf at `/books/fr/`. Both shelves are static HTML generated from the JSON, so they read without JavaScript.
- 404 page (*Returned to sender*), print stylesheet, Speculation Rules prerendering, AVIF images, `apple-touch-icon`.

### Changed
- One font: Comic Shanns Mono (MIT), standing in for Comic Code, with an added middle dot glyph.
- `books/books-en.json` and `books/books-fr.json` now hold all 21 books and drive the shelf and the PDFs. `books/generate-latex.py` became `books/generate.py`.
- Reading guides restyled in the new identity and expanded to the full shelf.
- Essays rebuilt in the new layout, with previous and next links; the essay text is unchanged.
- Public email is marc.duboc@imt-atlantique.net everywhere; location and title aligned on Seoul and robotics & embedded systems.
- New OG image (`assets/images/og.jpg`), favicon, sitemap with hreflang, simpler `robots.txt`.
- README rewritten.

### Removed
- WebGL wave background and the previous CSS and JS.
- Inter and Fraunces fonts, and the `pictures/` folder.
- The essay PNGs, replaced by AVIF and WebP.
- About 60 duplicated or unused images.
- The design proposals, which stay on the `feat/proposals` branch.

## [2.0.0-alpha.1] - 2026-10-01

### Added
- `proposals/`: design directions for the v2 redesign. The previews are `noindex` and not linked from the live site. See `proposals/README.md`.
  - Round 1: Letters patent and Chart.
  - Round 2, hybrids of the two built around a real image: Sheet, Fiducial and As-built. Each has its own `tokens.css` and one easter egg, and they share one runtime (`proposals/shared/site.js`).
  - Round 3, simple: Wall label, Diptych and Postcard. One comic monospace (Comic Shanns Mono, standing in for Comic Code) and one AI-generated painting each (Pixabay Content License), with a shared `base.css`.
- This changelog.

### Removed
- Marginalia, the round 1 direction rejected in review.
- Rounds 1 and 2 removed from the tree after review; they remain in git history at `2a1b73d`.

## [1.0.0] - 2026-10-01

The legacy easter-egg portfolio, as published on promaa.tech.

### Included
- Homepage with the WebGL wave hero, works, about, favourite books and contact.
- Three cinematic easter eggs: Galt, Monte Cristo, Assange.
- Five essays, the bilingual book shelf, and the LaTeX reading guides (EN/FR).

[Unreleased]: https://github.com/promaaa/personal-website/compare/v2.0.2...HEAD
[2.0.2]: https://github.com/promaaa/personal-website/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/promaaa/personal-website/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/promaaa/personal-website/compare/v1.0.0...v2.0.0
[2.0.0-alpha.1]: https://github.com/promaaa/personal-website/compare/v1.0.0...v2.0.0-alpha.1
[1.0.0]: https://github.com/promaaa/personal-website/releases/tag/v1.0.0
