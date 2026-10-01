# Changelog

All notable changes to promaa.tech. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/):

- **major**: redesign, or any change to a public URL
- **minor**: a new section, essay, book list entry or easter egg
- **patch**: fixes, copy edits, performance and accessibility work

Each release is a git tag (`vX.Y.Z`) on `main`. Work lands through pull requests.

## [Unreleased]

## [2.0.0-alpha.1] - 2026-10-01

### Added
- `proposals/`: design directions for the v2 redesign. The previews are `noindex` and not linked from the live site. See `proposals/README.md`.
  - Round 1: Letters patent and Chart.
  - Round 2, hybrids of the two built around a real image: Sheet, Fiducial and As-built. Each has its own `tokens.css` and one easter egg, and they share one runtime (`proposals/shared/site.js`).
- This changelog.

### Removed
- Marginalia, the round 1 direction rejected in review.

## [1.0.0] - 2026-10-01

The legacy easter-egg portfolio, as published on promaa.tech.

### Included
- Homepage with the WebGL wave hero, works, about, favourite books and contact.
- Three cinematic easter eggs: Galt, Monte Cristo, Assange.
- Five essays, the bilingual book shelf, and the LaTeX reading guides (EN/FR).

[Unreleased]: https://github.com/promaaa/personal-website/compare/v2.0.0-alpha.1...HEAD
[2.0.0-alpha.1]: https://github.com/promaaa/personal-website/compare/v1.0.0...v2.0.0-alpha.1
[1.0.0]: https://github.com/promaaa/personal-website/releases/tag/v1.0.0
