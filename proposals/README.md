# Phase 1: design directions

## Round 2: three hybrids of “patent” and “chart”, bolder, each with one strong image

What the round 1 feedback asked for:

- You liked **Letters patent** and **Chart** for their classy look, and hated Marginalia.
- The portfolio was still boring, and needed at least one strong image.
- You didn’t like Chart’s colours.

So all three directions below keep the shared DNA of round 1’s directions 2 and 3: technical drawings, framed sheets, precise data and a single accent. Each is built around a real image of your own work.

| | [Sheet](sheet/) | [Fiducial](fiducial/) | [As-built](as-built/) |
|---|---|---|---|
| Reference world | An engineering drawing sheet (ISO frame, zones, title block, revisions, parts list) | An aerial survey plate (fiducial marks, data strip burned into the frame) | As-built record drawings: design vs reality |
| Hero image | SmartChess CAD render, exploded, with numbered item balloons | Your dawn photograph (Sony A7 III, 20 July 2024, 04:55), full bleed | The ball-collecting robot, half line drawing, half photograph, with a handle |
| Faces | Source Serif 4 + Martian Mono | Bodoni Moda + Azeret Mono | Instrument Serif + Instrument Sans |
| Accent | Redline red | Dawn amber | Engineering green |
| Dark theme | Light table (prints read as negatives) | Night plate (the photo’s own mood) | After hours |
| Egg built | Assange: select the struck note | Monte-Cristo: wait, and frame 0000 appears | Galt: push the handle until the robot is all drawing |
| Lighthouse (mobile) | 99 · 100 · 100 · 66* | 98 · 100 · 100 · 66* | 99 · 100 · 100 · 66* |

Lighthouse order is Performance · Accessibility · Best practices · SEO. \*The SEO score is capped on purpose: the previews carry `noindex`, and `is-crawlable` is the only SEO audit that fails. axe-core reports **0 violations** in light and dark, at 320 and 1440px, for all three.

To try each egg:

- **Sheet**: select the black bar in note 6, type `assange`, or open `#wikileaks`.
- **Fiducial**: stay still for 30 seconds (the plate brightens, the shutter reads 30 s and *Frame 0000* appears on the strip), type `dantes`, or open `#attendre`.
- **As-built**: drag the handle (or press End) until the robot is fully drawn, type `galt`, or open `#whoisjohngalt`.

### Image sources

- **Your photograph.** `assets/images/DSC06061.jpg`. The data strip uses its real EXIF: 35 mm, f/9, 1/40 s, ISO 200, 2024-07-20 04:55.
- **Your project repositories.** `smart-chess` (CAD render and built board), `ball-collecting-robots` (`robot1.jpg`) and `kaust-5G-research` (lab testbed).
- **The robot’s line drawing** is honest about its origin: it is traced from the photograph by edge detection (ImageMagick Canny), and the caption says so. It is stored as an alpha mask, so its colour follows the theme tokens.
- **Format.** Every image is WebP with `srcset`. The hero is preloaded with `fetchpriority="high"`; the rest is lazy.
- **Not used.** The essays’ illustrations, which read as generated.

---

### 1. Sheet

**Concept.** The whole portfolio is one engineering drawing sheet, revised as the work goes on.

**Reference world.** An ISO 5457 drawing sheet:

- a frame with zone references (1–8 across, A–E down, one letter per section);
- a title block (drawn: M. Duboc, checked: *in practice*, scale 1 : 1, rev D);
- a revision table that *is* the CV: A CPGE, B IMT Atlantique, C KAUST, D SNU;
- a parts list, detail views, general notes (“Unless otherwise specified, every part is argued in theory and tested in practice”), and reference documents for the essays.

**Hero image.** The SmartChess CAD render, exploded, in graphite, with ISO item balloons and leader lines.

- The parts list underneath names the visible parts (playing surface, enclosure, 32 pieces) and the *hidden* ones taken from the repo: 64 reed switches through 4 × MCP23017, 72 LEDs through 2 × HT16K33, and a Raspberry Pi 5 running IA-Marc V2.
- Hovering a row or a balloon marks both in red.

**Typography.**

- **Source Serif 4** for the text and the name: classy, sturdy and modern.
- **Martian Mono**, narrowed (width 87.5), for drafting lettering: zones, tables, balloons, data.
- The mono only appears where a draughtsman would letter by hand.

**Palette:**

| Token | Drafting film | Light table |
|---|---|---|
| `--film` | `--gray-0` | `--gray-10` |
| `--ink` / `--ink-2` | `--gray-12` / `--gray-7` | `--gray-1` / `--gray-5` |
| `--hair` | `--gray-3` | `--gray-9` |
| `--redline` | `--red-9` #c92a2a | `--red-5` #ff6b6b |

Renders and photos are grayscale. On the light table they are inverted (`--photo-filter: invert(1)`) and read as negatives.

**Grid.**

- The sheet frame holds a 1.75rem zone band on each side.
- The hero splits 5 | 7 (intro and revisions | view and parts list), with the title block anchored bottom-left.
- Details form a ruled 2-column grid of views, with the robot photo as a wide detail.
- On phones everything stacks inside the frame, and the document-number column is dropped.

**Motion.** One orchestrated moment: the balloons land (spring) and their leaders are drawn (pen, in-out), staggered. Otherwise, only the 160ms redline on hover.

**Interaction language: the redline.** Hairline underline at rest; on hover the line is redrawn in red, as a checker marks what must change.

**Egg family: revisions and drawings.** Struck notes, revision clouds, hidden parts, zones as URL hashes (`#Z9`), title-block fields.

- **Built:** note 6 is a revision-D note struck in black, “Struck from the reading list at the request of no one”. Selecting it reveals the text through `::selection` (CSS only) and opens the Assange plate.
- **Ledger idea:** the revision table itself gains a row for each egg found (“E: found the motor of the world”).

**Risks.**

- It is the most structured direction. Tables and hairlines can tip into the “broadsheet” tell, and the large image and the frame are what keep it on the drawing side.
- The mono lettering is a deliberate exception to the audit’s “monospace data labels” rule, because that is what drawings are lettered in.

### 2. Fiducial

**Concept.** Every page is a photographic survey plate: the image first, then measured, with fiducial marks, a graduated frame and the data strip burned into its edge.

**Reference world.** Aerial survey photographs (Zeiss and Wild cameras):

- corner and edge fiducials for photogrammetry;
- the data panel imaged on the frame (frame number, clock, focal length, exposure);
- chart scale ticks along the edge.

The work becomes *frames* on the roll (0002–0006), the background a *flight line* with real coordinates, and the essays *plates*.

**Hero image.** Your dawn photograph, full bleed, measured. The name is set in Bodoni over the sky.

**Typography.**

- **Bodoni Moda** (variable optical size) for everything typographic: dramatic at 10rem, readable at 20px.
- **Azeret Mono** for the data strip and exposure data only.
- One catch I found and fixed: Bodoni Moda’s hyphens and dashes thin to nothing above optical size 24. Running text is capped at opsz 20, and only `h1` and `h2`, which carry no dashes, use the full optical range.

**Palette:**

| Token | Night plate | Contact print |
|---|---|---|
| `--ground` | `--stone-12` #121210 | `--stone-0` |
| `--ink` / `--ink-2` | `--sand-1` / `--sand-4` | `--stone-12` / `--stone-8` |
| `--amber` | `--orange-5` #ff922b | `--orange-10` #bf400d |
| `--on-photo`, `--on-photo-data` | `--sand-1`, `--orange-4` | (same; type on the photograph) |

Project photos are black and white so the amber only ever means *data*.

**Grid.**

- The hero is a 100svh plate, with a scrim for legibility, the fiducials, ticks and the strip.
- Frames alternate 7 | 5 and 5 | 7 around a ruled line; Nand2cpu’s frame is typographic (`0111 + 1000 = 1111`).
- The flight line puts prose beside four legs with positions, the plates are a ruled index, and contact is a 10rem italic line.

**Motion.**

- The fiducials settle inward once on load (spring).
- The long exposure is a 6s brightness change on the plate, after stillness only.
- Hover answers in 160ms.
- Reduced motion: no settle, and the exposure becomes a 200ms fade.

**Interaction language: the exposure.** Underline in the ink’s second tone; on hover it takes the strip’s amber.

**Egg family: time and exposure.** Waiting, the clock, the frame counter, coordinates as hashes, the shutter.

- **Built:** stay still for 30 seconds and the exposure lengthens. The plate brightens, the shutter reads 30 s, and **Frame 0000** appears at the end of the strip: Château d’If, 43°17′N 5°20′E, “Attendre et espérer / Wait and hope”. Nothing ever opens on its own.
- **Ledger idea:** “contact sheet”, the found frames as thumbnails.

**Risks.**

- It is dark-first, and near-black with one warm accent is a known generated look. Here it comes from the photograph itself, and the light “contact print” theme is equally complete.
- The whole first screen rests on one photo. If you would rather not lead with a landscape, it needs another image of the same strength.
- The location of the photo isn’t stated, because I don’t know it (GR20?).

### 3. As-built

**Concept.** Every machine is shown twice, as drawn and as built. The line between theory and practice is a handle you can move.

**Reference world.** As-built drawings (the engineering record of what was actually constructed, as opposed to what was designed), patent figures and product photographs. It is the site’s own motto made literal: *Built through theory. Tested in practice.*

**Hero image.** The ball-collecting robot.

- On the left, the line drawing in ink; on the right, the photograph; a green seam with a knob between them.
- It sweeps once from fully drawn to half on load, then belongs to the visitor.
- The handle is a native `<input type="range">`: drag anywhere, click, arrow keys, Home/End, with `aria-valuetext` (“62% drawn, 38% built”).
- Without JS it rests at 50/50.

SmartChess gets a second pair further down: *as designed* (the CAD render) and *as built* (the finished board on a table).

**Typography.**

- **Instrument Serif**, a condensed and contemporary classic, for the name, headings, numbers and essay titles.
- **Instrument Sans** for text and UI. Same foundry, so the pair is coherent; the serif carries the class, the sans the clarity.

**Palette:**

| Token | Paper | After hours |
|---|---|---|
| `--paper` | `--stone-0` | `--gray-11` |
| `--ink` / `--ink-2` | `--gray-12` / `--gray-7` | `--gray-1` / `--gray-5` |
| `--rule` | `--gray-3` | `--gray-8` |
| `--green` | `--teal-10` #066649 | `--teal-4` #38d9a9 |

**Grid.**

- The hero splits 5 | 7 (claim | figure).
- Machines are a numbered index; the SmartChess row widens to 3 columns to hold its twin images.
- Background is prose beside a dated path, essays are a large-type index, and contact is set at step 7, italic.

**Motion.**

- One orchestrated moment: the seam sweeps (spring, 1.4s, after 0.4s).
- `--split` is a registered `@property`, so the sweep is pure CSS.
- Hover answers in 160ms. Reduced motion: no sweep.

**Interaction language: the seam.** Hairline underline at rest; on hover the text crosses the seam and turns green.

**Egg family: theory vs practice.** Pushing a figure to an extreme, things that exist only as drawn, designs never built, tolerances.

- **Built:** push the handle all the way to *drawn*, and the caption admits “Some machines exist only as drawn. *Who is John Galt?*”. It opens Fig. 7, the motor of the world, with its rotor turning (stopped under reduced motion) and an opt-in, stoppable hum.
- **Ledger idea:** a “bill of materials” of the eggs found, as drawn vs as built.

**Risks.**

- The hero depends on a real photo with a busy background (a desk, a box); a cleaner studio shot of a machine would make it sing.
- Instrument Serif is fashionable right now.
- The traced drawing is computer-made. A hand-made or CAD line drawing would be stronger and is worth doing for Phase 2.

### Shared system (round 2)

- **Tokens.** One `tokens.css` per direction; `style.css` reads only `var()`s. The documented breakpoint and the 1px of the visually-hidden utility are the only literals.
- **Type and space.** Utopia (`utopia-core` 1.6), 320 → 1440px:

  | Direction | Base size | Scale |
  |---|---|---|
  | Sheet | 16→18px | ×1.2→1.25 |
  | Fiducial | 17→20px | ×1.25→1.414 |
  | As-built | 17→19px | ×1.2→1.333 |

  Fiducial’s step 7 failed Utopia’s WCAG zoom check and was dropped.
- **Colours.** Open Props 1.7, trimmed.
- **Motion.** The Kinetics curves (glide, in-out, spring) sampled into `linear()`, because **Kinetics publishes no `linear()` strings**, only `cubic-bezier()`. Three motion tokens.
- **Runtime.** `proposals/shared/site.js`, about 130 lines, provides:
  - the theme toggle (system first, choice remembered in `localStorage`, applied before paint, never animated);
  - copy-to-clipboard with inline feedback;
  - lazy egg modules (`import()` on trigger only);
  - one native `<dialog>` with backdrop click and focus return;
  - typed words, hashes, selection and stillness triggers;
  - a `localStorage` ledger (`try/catch`).
- **Weights.** HTML + CSS + JS, eggs and images excluded (the 150 KB budget):

  | | Sheet | Fiducial | As-built |
  |---|---|---|---|
  | Raw | 39.6 KB | 35.8 KB | 32.7 KB |
  | Gzip | 13.0 KB | 12.2 KB | 11.4 KB |
  | Egg module | 0.5 KB | 0.8 KB | 2.9 KB |
  | Fonts | 91 KB | 93 KB | 63 KB |
  | Images (hero is one of these) | 123 KB | 438 KB | 243 KB |

- **Automated checks (puppeteer), all passing:**
  - the egg isn’t loaded before its trigger;
  - typed word, visible door and hash all open it;
  - focus moves in;
  - Escape closes and returns focus;
  - the hash is cleared and the ledger written;
  - nothing longer than 200ms runs under reduced motion;
  - JS-off rendering is readable;
  - the long exposure fires after stillness.

### Audit (round 2)

**ui-skills, generic AI design.**
- No gradients except the functional photo scrim, no glow, no cards, no appended →, one accent per view, and no eyebrow labels.
- Two tells are kept on purpose and stated above: Sheet’s mono lettering, and Fiducial’s dark + warm accent.
- `text-wrap: balance` on headings and `pretty` on text, tabular figures on data.

**ui-skills, motion.**
- Only `opacity`, `scale`, SVG dash offsets, `filter` (once, after idle) and a registered `--split` driving `clip-path` are animated.
- Each direction has one orchestrated moment and no scroll-triggered motion.

**ui-skills, accessibility.** Fixed during the round:
- a prohibited `aria-label` on a `<p>`;
- grid overflow at 320px (`minmax(0, 1fr)`);
- tables too wide on phones;
- revision triangles losing their letter (now SVG with a visually-hidden label).

**Polish.**
- Dialogs centred.
- CLS ≤ 0.034.
- LCP 2.0–2.2s on simulated slow 4G, with the hero image preloaded.

**Rauno.** Same handling as round 1 (table below): focus outlines in the accent, 44px hit areas (the As-built knob is 2.75rem), `::selection` styled (and used by the Sheet egg), `(hover: hover)` guards, smooth scroll only without reduced motion, tabular figures, no font-weight change on hover, theme switches never animate.

---

## Round 1 (kept for comparison)

- **[Letters patent](letters-patent/)**: a personal patent specification, with INID codes, a bilingual title and abstract, a Fig. 1 closed loop, [0001] paragraphs, references and claims. Egg: Galt’s abandoned motor patent.
- **[Chart](chart/)**: a nautical chart, with a Mercator plotting sheet, real positions, a compass rose, the List of lights, Sailing directions and Notices to mariners. Egg: the Monte-Cristo islet that appears to those who wait.
- **Marginalia**: removed after feedback; it is still in git history (`d364ad7`).

Round 1 shared the same token method (Utopia, Open Props, Kinetics → `linear()`). Results: Lighthouse 99–100 / 100 / 100, and axe 0 violations.

### Rauno checklist: what applies (both rounds)

| Item | Handling |
|---|---|
| Focus states | `:focus-visible` outline in the accent colour. I chose outline over box-shadow so it survives forced-colours mode; Safari ≥ 16.4 follows the radius. |
| Hit areas | Text buttons get a 44×44px `::after`; nav links get block padding. |
| Text selection | `::selection` uses the accent with paper text. |
| Hover-only affordances | None. Hover sits behind `@media (hover: hover)`, and every effect has a focus twin. |
| Scroll | `scroll-behavior: smooth` only without reduced motion, plus `scroll-padding-top`. |
| Optical alignment | Hanging numbers and codes, hanging indents. |
| Tabular numbers | Dates, positions, data strips, tables. |
| Typography | Font smoothing, `optimizeLegibility`, `text-size-adjust`, subset fonts, no weight under 400, fluid sizes. |
| Motion | Theme switches never animate; interactions ≤ 200ms; dialogs enter from 0.96 scale. |
| Touch | Tap highlight removed and replaced by `:active` and focus states. |
| SVG favicon with `prefers-color-scheme` | Done where the mark needs it. |
| Copy feedback | Inline “copied”, plus a polite live region. |
