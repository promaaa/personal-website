# Changelog

All notable changes to promaa.tech. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/):

- **major**: redesign, or any change to a public URL
- **minor**: a new section, essay, book list entry or easter egg
- **patch**: fixes, copy edits, performance and accessibility work

Each release is a git tag (`vX.Y.Z`) on `main`. Work lands through pull requests.

## [Unreleased]

### Changed
- Favicon and touch icon: the site's own M in blue ink on paper, with a red full stop.

## [2.1.0] - 2026-10-01

### Added
- A painting for every page, all in the public domain and redrawn in dots (an 8×8 ordered dither, 400×500 dots):
  - the homepage: *The Ninth Wave*, Ivan Aivazovsky;
  - *The Work of Writing*: *The Monk by the Sea*, Caspar David Friedrich;
  - *Lucid Hope*: *Woman before the Rising Sun*, Friedrich;
  - *Domestic Sovereignty*: *Woman at a Window*, Friedrich;
  - *The Collapse of Money*: *The Tower of Babel*, Pieter Bruegel the Elder;
  - *The Unspoken Dialogue*: *Max Schmitt in a Single Scull*, Thomas Eakins;
  - the essay list: Hokusai's *Whaling off the Gotō Islands* in the site's blue ink, turned to light lines in the dark theme.
- `paint.sh`, which makes a painting in three sizes and a page's 1200×630 social card.
- A social card for each essay and for the essay list.

### Changed
- Paintings are lossless WebP at 2×, 3× and 4× their dots: every dot stays sharp, and each file weighs 40 to 100 KB, where lossy WebP needed 600 KB for the same image. The homepage weighs 95 KB in all, font and painting included.
- The fixed panel appears only on landscape screens (56rem and wider, 5:4 or wider). Tablets held upright get the postcard, which never grows taller than 75% of the screen, so a phone held sideways still shows it whole.
- On ultra-wide screens the panel stops at 95% of the screen height and the text is centred in the space left.
- Each painting sets its own focal point, so the panel crops around the subject.
- `sizes` accounts for the panel's height, so a tablet in landscape loads a sharp enough image.
- The Galt door under the homepage painting reads *Who set the dots?*

### Removed
- The AI paintings: the astronomer on the homepage and the essay illustrations, landscape pictures that the portrait panel cropped badly.

### Fixed
- The Assange note reopened as soon as its Close button was clicked: the selection that opened it was still there, so the click counted as selecting it again. The selection is now cleared when the note opens.

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

[Unreleased]: https://github.com/promaaa/personal-website/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/promaaa/personal-website/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/promaaa/personal-website/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/promaaa/personal-website/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/promaaa/personal-website/compare/v1.0.0...v2.0.0
[2.0.0-alpha.1]: https://github.com/promaaa/personal-website/compare/v1.0.0...v2.0.0-alpha.1
[1.0.0]: https://github.com/promaaa/personal-website/releases/tag/v1.0.0
