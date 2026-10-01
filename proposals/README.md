# Phase 1: three directions

Three radically different homepages, each built with real content, its own `tokens.css` and one easter egg working end to end. Nothing here touches the live site: the essays, books, PDFs and LaTeX pipeline are unchanged and linked as they are.

| | [Marginalia](marginalia/) | [Letters patent](letters-patent/) | [Chart](chart/) |
|---|---|---|---|
| Reference world | A critical edition (Pléiade volume) | A patent specification (WIPO front page) | A nautical chart and its pilot books |
| Voice | The reader who builds | The engineer who discloses | The voyager who plots |
| Faces | EB Garamond | IBM Plex Serif + IBM Plex Mono | Newsreader + Atkinson Hyperlegible Mono |
| Accent | Rubric red | Examiner’s violet stamp | Chart magenta |
| Dark theme | Lamplight | Microfilm negative | Dusk |
| Egg built | Assange: select the redaction | Galt: the abandoned motor patent | Monte-Cristo: wait, and the islet appears |
| Lighthouse (mobile) | 100 · 100 · 100 · 63* | 100 · 100 · 100 · 63* | 99 · 100 · 100 · 63* |

Lighthouse order is Performance · Accessibility · Best practices · SEO. \*The SEO score is capped on purpose: each preview carries `<meta name="robots" content="noindex">` so the drafts are not indexed. That `is-crawlable` check is the only SEO audit that fails, and the meta goes away in Phase 2.

To try each egg:

- **Marginalia**: select the black bar under *Manufacturing Consent*, type `assange`, or open `#wikileaks`.
- **Letters patent**: click “Galt, J.” under *Patent documents*, type `galt`, or open `#whoisjohngalt`.
- **Chart**: activate the islet marked *E.D.*, type `dantes`, or open `#attendre`. Or stay still for 45 seconds and watch the islet get its name.

---

## A. Marginalia

**Concept.** The site is a critical edition of a life’s work in progress: the main text is what Marc builds, and the margin carries what he reads, cites and notes.

**Reference world.** A Bibliothèque de la Pléiade volume. The title page reads “Édition établie, présentée et annotée par…”. Then come a *Notice*, a chronology, the text with its apparatus, a bibliography with small-capital surnames, a table of contents with dot leaders, and a colophon (“Achevé d’imprimer…”).

**Typography.** One family on purpose: EB Garamond (Georg Duffner, Octavio Pardo), roman and italic at weight 400. The Pléiade is set in Garamond, and a real edition varies roles, not typefaces: roman for the text, italic for titles and the French voice, true small capitals (`smcp`, `c2sc`) for acronyms, surnames and running heads, and oldstyle figures with tabular figures in the contents. There is no bold anywhere. Files: 46 KB + 49 KB woff2, subset to Latin and French, plus ❧ and ☞.

**Palette** (Open Props values):

| Token | Day | Lamplight |
|---|---|---|
| `--paper` | `--stone-0` #f8fafb | mix(`--choco-12` 30%, `--stone-12`) |
| `--ink` | `--stone-12` #121210 | `--sand-1` #e6e4dc |
| `--ink-2`, `--ink-3` | `--stone-9`, `--stone-8` | `--sand-3`, `--sand-5` |
| `--rule` | `--sand-2` | `--sand-10` |
| `--rubric` | `--red-10` #b02525 | `--red-4` #ff8787 |

The paper is neutral, not cream. Cream + serif + warm accent is the first “generated look” in the ui-skills audit, so the warmth only appears in the lamplight theme.

**Grid.** A book page, not a screen. The page is `--measure` 34rem (about 66 characters) + `--gutter` + `--margin-col` 15rem. Each entry is a two-column grid, with its note in the outer margin, aligned with the text it annotates. Section numerals (I–IV) hang outside the text block. Below 62rem the notes fall inline under their paragraph, behind a rubric hairline.

**Motion.** Almost nothing moves, and that is the point. Links answer within `--dur-quick` (180ms, `--ease-quick`). The egg plate rises by `--lift` with `--ease-expressive` and fades with `--ease-quick`. There is no scroll-triggered motion. Under reduced motion only the fade remains.

**Interaction language: the rubricator’s pen.** Every link and text button rests on a hairline underline in secondary ink. On hover or focus the rule thickens and turns rubric. One rule for everything.

**Egg mechanic family: close reading.** Text selection, footnote marks, the margin itself, typed words, the print stylesheet, view-source.

- **Built:** *Assange*. Under *Manufacturing Consent* an editor’s note has a redacted passage. Text selection reveals it through `::selection` alone (CSS only, so it works without JS). With JS, the selection then tips in a plate: the portrait and “Courage is contagious.”
- **Sketch for Phase 2:**
  - *Galt*: a ‡ after *Atlas Shrugged* leads to a note.
  - *Monte-Cristo*: a margin that fills in while you wait.
  - *Gary*: the surname becomes “Émile Ajar” on long press.
  - *Gombrich*: on print, “There really is no such thing as Art. There are only artists.”
  - *Frankl*: after midnight, the running head changes.
  - *Bostrom*: a riddle in the console.
  - *Snowden*: a view-source comment counting what the page keeps about you.
  - *The Gambler*: the 404 lands on zero.
  - *La Boétie*: Escape pressed three times with nothing open.
  - **Ledger**: “Errata”, a printed slip opened from the colophon’s ❧.

**Risks.**

- It is the quietest direction. Some visitors will read it as “a nice blog” before they notice the apparatus.
- It sits closest to the generic serif look, and only the structure (margin, small caps, leaders, bibliography) keeps it out.
- It depends on a 15rem margin that only exists from 62rem up. On phones the margin becomes inline notes, so the signature is weaker there.

---

## B. Letters patent

**Concept.** A personal patent specification: everything disclosed, nothing claimed. *Patent* comes from the Latin *patens*, “lying open”, which ties it to the open-source repositories and to the Snowden and Assange line in the reading list.

**Reference world.** The front page of a published patent application, with INID codes (WIPO ST.9: (12), (54), (72), (73), (57)…), the title and abstract published in English and French as PCT applications do, a representative drawing with reference numerals and curved leader lines, [0001] paragraph numbering, claims, and “* * * * *” at the end.

**Typography.**

- **IBM Plex Serif** for the specification. Plex was drawn for IBM, the company that topped the US patent rankings for decades, and it is sturdy at the 16–18px of a dense document.
- **IBM Plex Mono** only for the lettering of the drawings (reference numerals, “Fig. 1”), the way patent drawings were lettered with stencils.
- INID codes stay in the serif, as on real front pages; the ui-skills audit flags monospace data labels as template chrome.
- Files: 14–15 KB per style.

**Palette:**

| Token | Paper | Microfilm |
|---|---|---|
| `--paper` | `--gray-0` #f8f9fa | `--gray-11` #0d0f12 |
| `--ink` | `--gray-12` #030507 | `--gray-1` #f1f3f5 |
| `--ink-2` | `--gray-7` #495057 | `--gray-5` #adb5bd |
| `--rule` | `--gray-4` | `--gray-8` |
| `--stamp` | `--indigo-10` #2f44ad | `--indigo-3` #91a7ff |

The dark theme is a microfilm negative, the way patent archives were actually kept.

**Grid.**

- **Front page.** A double rule under the masthead. Then a bibliographic column, with INID codes hanging in a 2.75rem gutter, beside the abstract and Fig. 1 (5fr | 7fr from 56rem up).
- **Body.** One 40rem column, with paragraph numbers hanging in a 4.5rem gutter. I deliberately did **not** use multi-column body text: on screen it forces scrolling up and down, and it is the “broadsheet” tell from the audit.

**Motion.** One orchestrated moment: Fig. 1 is plotted once on load, stroke by stroke (`--ease-standard`, staggered by `--stagger`), like a pen plotter. Nothing else moves except the egg’s rotor. Under reduced motion the figure is simply there.

**Interaction language: the examiner’s highlight.** Underlined at rest. On hover the passage is washed in stamp violet, the way an examiner marks a citation. Buttons share the same behavior.

**Egg mechanic family: citations and numerals.** Cited documents that open, reference numerals, typed commands, the console, drawing sheets.

- **Built:** *Galt*. Under *References cited › Patent documents* sits “Galt, J., motor converting the static electricity of the atmosphere into kinetic energy. Application abandoned.” It opens drawing sheet 7 of 7: the motor, with its rotor turning (stopped under reduced motion), and “Who is John Galt?”. A **Run the motor (sound)** button is the only way to start audio. It stays mutable and stops when the sheet closes.
- **Sketch for Phase 2:**
  - *Assange*: a redacted claim.
  - *Monte-Cristo*: a maintenance-fee notice, “wait and hope”.
  - *Nand2cpu*: type `7+8=` and the ALU sheet answers `0000000000001111`.
  - *Bostrom*: a paperclip-maximiser claim in the console.
  - *Snowden*: view-source.
  - *Gombrich*: the print stylesheet.
  - *The Gambler*: a 404 “application rejected” on zero.
  - *La Boétie*: Escape pressed three times.
  - **Ledger**: “File wrapper”, the record of your discoveries, opened from the publication number (10).

**Risks.**

- The legal register can feel dry. It relies on the wit of the claim language (“An engineer comprising…”) to stay warm.
- It is the most “engineer” of the three, and the essays read as cited literature rather than as the heart of the site.
- Visitors unfamiliar with patents may not get the joke, although the layout stays plainly readable.

---

## C. Chart

**Concept.** The portfolio is a nautical chart of a voyage still under way, from Rouen to Seoul, with its lights, sailing directions and notices to mariners.

**Reference world.** SHOM and Admiralty charts, the List of Lights, Sailing Directions, Notices to Mariners, and the bilingual EN/FR legends of Canadian charts. Through Verne and Dumas, the sea is already in the reading list.

**Typography.**

- **Newsreader** follows the cartographers’ rule: land features in roman, water features in italic. Section names (*List of lights*, *Sailing directions*) are italic and blue, like named waters.
- **Atkinson Hyperlegible Mono** is used for positions only (42°20′N 10°19′E), because a misread digit is a navigational error. It lacks the prime glyph, so ′ falls back to Newsreader.
- Files: 41 + 25 + 15 KB, with optical size fixed at 16 for roman text and 36 for italic display.

**Palette:**

| Token | Day | Dusk |
|---|---|---|
| `--sea` | `--stone-0` | mix(`--blue-12` 30%, `--gray-12`) |
| `--shoal` | `--blue-0` | mix(`--blue-12` 55%, `--gray-12`) |
| `--land` (cartouche) | `--choco-0` | `--sand-11` |
| `--ink`, `--ink-2` | `--gray-12`, `--gray-7` | `--sand-1`, `--stone-5` |
| `--depth` | `--blue-9` | `--blue-4` |
| `--magenta` (the only accent) | `--pink-9` #a61e4d | `--pink-4` #f783ac |

The dark theme is *Dusk*, the dimmed palette electronic chart displays switch to after sunset.

**Grid.**

- **Plotting sheet.** A Mercator sheet from 15°W to 135°E, framed by the alternating graduated border. The real positions are plotted (Rouen, KAUST at Thuwal, SNU) and joined by rhumb lines, which are straight on Mercator. IMT Atlantique is marked *PA* (position approximate) because the repo doesn’t say which campus. The fine grid behind it is bg.ibelick’s “large grid” in CSS. Below 52rem the sheet scrolls sideways inside a focusable region, never the page.
- **Rest of the page.** A title cartouche, then a *List of lights* table (a real table from 60rem up, stacked records below), *Sailing directions* with the four legs beside the prose, and the essays numbered as notices (3/2025…).

**Motion.**

- The route is plotted once through a mask (`--ease-standard`, 1.6s).
- The compass rose settles from −16° with the spring (`--ease-expressive`).
- The islet’s emergence is a slow fade.
- All of it is removed under reduced motion.

**Interaction language: the track line.** Links rest on a dashed track. On hover the track is laid solid in magenta, as a planned course becomes the course made good.

**Egg mechanic family: positions, time and waiting.** Coordinates as URL hashes, long idle, time of day and date, things drawn on the chart.

- **Built:** *Monte-Cristo*. A dotted islet at the real position of Montecristo is marked *E.D.* (existence doubtful). Activating it opens the novel’s final letter, found on that island, set en face in French and English. The deeper layer: if you stay still for 45 seconds, the doubtful islet fills in and is named. It never opens anything by itself. Wait, and hope.
- **Sketch for Phase 2:**
  - *Galt*: Galt’s Gulch marked *PD* (position doubtful).
  - *Assange*: an extinguished light in the list.
  - *Verne*: cross the date line and gain a day, or visit at 20:45, Fogg’s deadline.
  - *Frankl*: a night-watch notice after midnight.
  - *Gary*: Nice appears when you type `ajar`.
  - *Bostrom*: the console.
  - *Gombrich*: on print, “Not to be used for navigation” plus the quote.
  - *The Gambler*: the 404 is a roulette zero.
  - *La Boétie*: Escape pressed three times.
  - **Ledger**: “Ship’s log”, opened from *Small corrections*.

**Risks.**

- It is the most illustrative direction, so it costs the most to keep consistent on the essays and books pages. Those will need a lighter “pilot book” template.
- The plotting sheet is wide by nature, so phones get a sideways-scrolling figure. The same information is repeated as text in *Sailing directions*.
- It has a slightly stronger risk of looking themed rather than authored.

---

## Shared system (all three)

- **Tokens.** Each direction has one `tokens.css`, and `style.css` reads only `var()`s. The only literals left outside are the documented breakpoint (custom properties can’t be used in media queries) and the 1px of the visually-hidden utility.
- **Type and space.** Generated with `utopia-core` 1.6, the engine behind utopia.fyi, from 320 to 1440px. No WCAG zoom warnings.

  | Direction | Base size | Scale |
  |---|---|---|
  | Marginalia | 18→21px | ×1.2→×1.333 |
  | Letters patent | 16→18px | ×1.125→×1.2 |
  | Chart | 17→19px | ×1.2→×1.25 |

- **Colours, radii and shadows.** Open Props 1.7 names and values, trimmed to what is used.
- **Motion.** **Kinetics publishes no `linear()` strings**: every curve on kinetics.colorion.co is a `cubic-bezier()`, and the subagent checked the HTML, the JS, the CSS and the GitHub repo. So I took its three curves and sampled them point by point into `linear()`: “glide” `(0.16, 1, 0.3, 1)` → `--ease-quick`, “underline draw” `(0.65, 0, 0.35, 1)` → `--ease-standard`, and “spring(280, 18)” `(0.34, 1.56, 0.64, 1)` → `--ease-expressive`. Those are the only three motion tokens.
- **Eggs.**
  - Each egg is a separate ES module loaded with `import()` only when triggered; the tests confirm nothing loads before.
  - One native `<dialog>` per direction (plate / sheet / letter). It provides Escape and an inert page; I added backdrop click and focus return to the trigger.
  - Egg hashes are cleared on close. Found eggs are written to `localStorage` inside `try/catch`, which is the seed of the ledger.
  - Typed words are ignored while typing in a field.
- **Theme.** Follows `prefers-color-scheme` until the visitor uses the toggle. The choice is saved to `localStorage` and applied before first paint. The toggle stays hidden without JS, and theme switches never animate.
- **No icons.** None of the three needed one: typography does the work. The favicons are inline SVG that follow the colour scheme.

## Audit: ui-skills playbooks

| Playbook | Found | Fixed |
|---|---|---|
| Generic AI design (`baseline-ui`, `frontend-design`) | (1) Marginalia started on cream + serif + red, the generic look #1. (2) Tracked uppercase eyebrows over titles. (3) “A · B · C” tag strings. (4) `§ 1…5` numbering on projects that aren’t a sequence. (5) Patent drafted with monospaced INID codes and two-column body text (“broadsheet”, “monospace data labels”). (6) Patent title in capitals. | Neutral paper. Eyebrow moved into the imprint. Tags rewritten as sentences. Project numbers removed (numbers are kept only where they are a real sequence: claims, notices, legs, light numbers). INID codes in the serif, single-column body. Title in sentence case. No gradients, no glow, no cards, no appended →. One accent per view. Letter-spacing untouched except slightly tighter display headings (Playbook). `text-wrap: balance` on headings, `pretty` on body. Tabular figures on dates and positions. |
| Motion (`fixing-motion-performance`) | First Marginalia draft gave dialogs an exit transition on `display`. | Removed. Only `opacity`, `translate`/`scale`/`rotate` and SVG dash offsets are animated, always on small elements, once. The one infinite loop (the Galt rotor) lives inside a dialog removed on close, and is off under reduced motion. Interaction feedback ≤ 180ms. No scroll-driven anything. |
| Accessibility (`fixing-accessibility`) | axe flagged duplicate `aside` landmarks (Marginalia notes). The first Chart SVG was `role="img"`, which hid the islet link. | Notes are now `role="note"`. The sheet is `role="group"` with title and description. The rest was already in place: skip link, named nav, real lists and table, visible `:focus-visible`, 44px hit areas on text buttons, `aria-pressed` toggles, a polite live region for copy, dialogs with focus moved in and restored, no `tabindex > 0`. axe-core: **0 violations** in light and dark at 320 and 1440px for all three. |
| Polish | Dialogs pinned to the corner by the margin reset. Patent CLS of 0.18 when the semibold face swapped in. Chart labels crossing the track. | `dialog { margin: auto }`. Semibold preloaded and the front head turned into a grid (CLS now 0). Cartographic halos (`paint-order: stroke`). Also: solid backdrops, no blur. |

## Rauno’s interface checklist: what applies

| Item | How it is handled |
|---|---|
| Focus states | `:focus-visible` outline in the accent colour, 2px, with an offset. I chose outline over box-shadow so it survives Windows forced-colours mode; Safari ≥ 16.4 follows the radius. |
| Hit areas | Text buttons get a 44×44px `::after` without moving the text. Nav links get block padding. The Chart islet has a 22-unit invisible hit circle. |
| Text selection | `::selection` uses the accent background with paper-coloured text. In Marginalia, selection *is* an egg mechanic. |
| Hover-only affordances | None. Hover styles sit behind `@media (hover: hover)`, and every hover effect has a focus twin. |
| Scroll behaviour | `scroll-behavior: smooth` only without reduced motion, plus `scroll-padding-top` so anchors don’t touch the edge. The Chart sheet scrolls in its own focusable region with `overscroll-behavior` contained. |
| Optical alignment | Hanging section numerals (Marginalia), hanging INID codes and paragraph numbers (Patent), hanging indents in bibliographies, `hanging-punctuation: first` (Safari). |
| Tabular numbers | `tnum` on dates, positions, publication data and the table of contents. Marginalia’s running text keeps oldstyle figures. |
| Typography | `-webkit-font-smoothing`, `text-rendering: optimizeLegibility`, `-webkit-text-size-adjust: 100%`, fonts subset per language, no weight change on hover, no weight under 400, fluid `clamp()` sizes. |
| Motion | Theme switches never transition (a class blocks transitions for one frame). Interactions ≤ 200ms. Dialogs enter from 0.96 scale or 0.5rem travel, never from 0. |
| Touch | `-webkit-tap-highlight-color: transparent`, replaced by an `:active` state. |
| SVG favicon with `prefers-color-scheme` | Done in Patent and Chart. Marginalia’s single red mark works on both. |
| Copy feedback next to the trigger | “Copy” turns into “Copied” inline, and a polite live region announces it. |
| Inputs (16px, labels, types) | Not applicable on these homepages. Applies to the books search in Phase 2. |

## Design System Checklist: satisfied so far

- **Color**: accessible pairings (axe in both themes), semantic tokens, dark mode that follows the OS, plus a manual choice.
- **Layout**: units (Utopia), grid per direction, documented breakpoints, spacing scale.
- **Typography**: responsive (fluid), readability (measure 34–40rem, leading per role), performance (woff2 subsets, preload, `font-display: swap`).
- **Elevation**: one shadow level (Marginalia) and the top layer for dialogs, so no z-index scale is needed.
- **Motion**: easing set, duration set, reduced motion.
- **Components**:
  - Button (hover, active, focus, role)
  - Link (inherits font, multiline-safe)
  - List (`role="list"` restored where `list-style: none`)
  - Modal (title, close action, focus trap, keyboard)
  - Divider (CSS borders, no fake elements)
  - Table (Chart)
- **Brand**: tone of voice and terminology per direction.
- **Maintenance**: getting started, release cycle (SemVer + CHANGELOG).
- **Remaining for Phase 2**: iconography (if any), guidelines pages, internationalisation of the homepage.

## Measurements

| | Marginalia | Letters patent | Chart |
|---|---|---|---|
| HTML + CSS + JS, raw | 36.9 KB | 36.0 KB | 40.6 KB |
| … gzipped | 12.3 KB | 12.3 KB | 13.3 KB |
| Egg module (lazy) | 0.5 KB | 3.2 KB | 1.0 KB |
| Fonts (excluded from budget) | 95 KB | 63 KB | 81 KB |
| LCP / CLS (Lighthouse mobile) | 1.7 s / 0.02 | 1.5 s / 0 | 1.7 s / 0.03 |

**Automated egg checks**, run with a puppeteer script on all three, all passing:

- The egg module is not loaded before the trigger.
- Typed word, visible door and hash all open the dialog.
- Focus moves inside the dialog.
- Escape closes it and focus returns to the trigger.
- The hash is cleared on close.
- The ledger is written.
- No animation runs longer than 200ms (and none loops) under reduced motion.
- With JS disabled, all content is readable and the toggles are hidden.
- The Chart islet emerges after idle.

**Not good enough yet:** GitHub Pages caches for 10 minutes and that can’t be changed. Two render-blocking stylesheets cost about 0.4–0.6s on simulated slow 4G; Phase 2 will merge them into a single file.
