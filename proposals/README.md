# Phase 1: design directions

## Round 3: simple, one comic monospace, one AI painting

What the round 2 feedback asked for:

- The round 2 designs were too complex.
- The serif fonts are the ones seen on every AI-generated site; you love **Comic Code**.
- You wanted an **AI-generated image**, chosen in the style of the essay paintings.

**The shared rules for this round:**

- **One family, one weight.** **Comic Shanns Mono** (MIT) stands in for Comic Code, which is a paid font. The font stack already names `"Comic Code"` second, so dropping licensed files into `shared/fonts/` and adding one `@font-face` is the whole switch.
- **Hierarchy from size and colour only.** `font-synthesis: none` so the browser never fakes a bold.
- **One AI painting per variation.** Old-master style with one warm light, in the same family as the essay pictures.
- **One plain column of content, five blocks:** name, machines, background, writing, contact.
- **No frames, tables, data strips or decorative chrome.**

| | [Wall label](wall-label/) | [Diptych](diptych/) | [Postcard](postcard/) |
|---|---|---|---|
| Idea | A painting in a museum, with its label | Two panels: the painting holds still while the text moves | A short letter with a picture slipped in |
| Layout | Painting full width (up to 78svh), then a label and one 40rem column | Painting fixed on the left half (top on phones), text scrolling on the right | One narrow column; the painting is a postcard tilted 1.5° that straightens on hover |
| Painting | *Fisherman on a golden lake* | *The astronomer* (brass telescope, a Verne-like scene) | *Lighthouse in a storm* |
| Palette (light / dark) | Umber `--choco-9` / gold `--orange-3` on stone | Slate `--cyan-11` / brass `--yellow-6` on night | Airmail: blue ink `--blue-11` and red `--red-9` / `--blue-2` and `--red-4` |
| Egg built | “Inv. 1844” on the label → Monte-Cristo, “wait and hope” | “Who painted this?” → *Who is John Galt?*, the motor, opt-in hum | P.S. struck in ink; select it → Assange, “Courage is contagious” |
| Lighthouse (mobile) | 100 · 100 · 100 · 66* | 100 · 100 · 100 · 66* | 100 · 100 · 100 · 66* |
| Whole page (HTML, CSS, JS, font, image) | 58 KB | 73 KB | 75 KB |

Lighthouse order is Performance · Accessibility · Best practices · SEO. \*The SEO score is capped on purpose: the previews carry `noindex`. LCP is 1.4–1.5s, CLS 0. axe-core reports **0 violations** in light and dark, at 320 and 1440px. HTML + CSS + JS come to about 9 KB gzipped per page.

To try each egg:

- **Wall label**: click *Inv. 1844*, type `dantes`, or open `#attendre`.
- **Diptych**: click *Who painted this?*, type `galt`, or open `#whoisjohngalt`.
- **Postcard**: select the P.S., type `assange`, or open `#wikileaks`.

### Images and licences

| Painting | Source | Licence |
|---|---|---|
| *Fisherman on a golden lake* | [Kyraxys on Pixabay](https://pixabay.com/illustrations/lacustrine-golden-dystopian-dusk-10131925/) | Pixabay Content License |
| *The astronomer* | [Suraajm20 on Pixabay](https://pixabay.com/illustrations/ai-generated-steampunk-astronomer-9610010/) | Pixabay Content License |
| *Lighthouse in a storm* | [alanajordan on Pixabay](https://pixabay.com/illustrations/ai-generated-lighthouse-storm-waves-9049904/) | Pixabay Content License |

- **Licence.** All three are marked “AI generated” on their pages. The [Pixabay Content License](https://pixabay.com/service/license-summary/) allows free use without attribution; each page credits its uploader anyway.
- **Selection.** They were picked from 12 licensed candidates, against what the essay paintings share: oil-painting texture, one warm light source, a solitary figure, and ideally an engineered object (telescope, lighthouse).
- **Resolution.** The files used are Pixabay’s free 1280px previews. The originals go up to 6144px and can be downloaded with a free Pixabay account for Phase 2.
- **Rejected candidates.** Candidates whose page did not say “AI generated” were rejected, even when they looked it.

### Per variation

**Wall label.**
- **Reference.** A museum wall: the work first, then a small label (title, “AI-generated image”, source, inventory number).
- **Motion.** None beyond the 160ms link colour.
- **Egg family.** The label’s details: inventory numbers, provenance.
- **Risk.** It is the quietest of the three. The painting does all the talking, so the choice of painting matters most.

**Diptych.**
- **Reference.** A two-panel altarpiece, or a book spread.
- **Layout.** The painting is `position: sticky`, so it stays while the work scrolls past. Below 56rem it becomes a 62svh band on top.
- **Motion.** None beyond the links.
- **Egg family.** Questions about the picture itself: an AI painting has no painter, and “Who painted this?” has no answer, like the other question.
- **Risk.** The left half is decorative, so on a wide screen half the page is image. That is the point, and also the cost.

**Postcard.**
- **Reference.** A letter written in blue ink, with a postcard tucked in and a P.S.
- **Motion.** The card straightens with the spring curve on hover, 400ms; it stays flat under reduced motion.
- **Egg family.** Things written then crossed out: a P.S., margins.
- **Risk.** The tilted card is the only playful gesture; take it out and the page is very plain. Blue ink for running text is unusual, and has to stay readable (it passes AA in both themes).

### What stays from before

- **Tokens.** Each variation has one `tokens.css`: Utopia fluid scales (16 → 18px, ×1.2 → ×1.25), Open Props colours, and the three motion tokens (Kinetics curves sampled into `linear()`).
- **Shared code.** `shared/base.css` holds the common rules and reads only tokens. `shared/site.js` holds the runtime:
  - theme toggle (system first, choice remembered, never animated);
  - copy-to-clipboard with inline feedback;
  - lazy egg modules;
  - one native `<dialog>` with Escape and focus return;
  - typed-word, hash and selection triggers;
  - the `localStorage` ledger.
- **Automated egg checks (puppeteer), passing on all three:**
  - the egg isn’t loaded before its trigger;
  - word, door and hash all open it;
  - focus goes in and comes back;
  - the hash is cleared and the ledger written;
  - nothing over 200ms runs under reduced motion;
  - JS-off content is readable.

### Earlier rounds (git history)

- **Round 2** (too complex): Sheet, Fiducial, As-built, at commit `2a1b73d` (`git checkout 2a1b73d -- proposals`).
- **Round 1**: Letters patent and Chart at the same commit, and Marginalia at `5069bbc`.
