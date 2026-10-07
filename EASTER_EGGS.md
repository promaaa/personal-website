# The hidden layer

The site is written like a letter: a dateline, a body, a P.S. The hidden layer follows the same idea of **correspondence**. There are things written in the margins, lines struck out, a postmark from the other side of the date line, the envelope's source, the copy that gets printed, and a letter returned to sender. Each egg draws on a book from the shelf or on the work itself.

There are ten eggs and one ledger. They are found in layers:

- **Obvious**: a door you can see and click.
- **Hinted**: something visible invites a closer look.
- **Obscure**: you need the right moment, key or tool.

Spoilers below.

## The eggs

| Egg | Layer | Trigger | Idea | File |
| --- | --- | --- | --- | --- |
| **Galt** | obvious | *Who set the type?* under the homepage painting; type `galt`; `#galt` | Van Gogh painted the almond tree; a machine set the type, and nobody signs a machine, so the question has no answer, like *Who is John Galt?* It opens the motor of the world, a drawing whose rotor turns, with an opt-in hum. | `assets/js/eggs/galt.js` |
| **Monte-Cristo** | hinted | Stay still for 60 seconds and a *P.P.S. wait and hope* appears; type `dantes` or `attendre`; `#montecristo` | Only those who wait see it. It shows Dantès's last words, in French and English. | `assets/js/eggs/montecristo.js` |
| **Assange** | hinted | Select the struck-out P.S. at the end of the homepage; type `assange`; `#wikileaks` | A line in black ink that selection reveals (CSS only), then the portrait: “Courage is contagious.” Opening the note clears the selection, so closing it does not select the line again. | `assets/js/eggs/assange.js` |
| **Snowden** | hinted | An HTML comment at the top of the homepage source points to `#permanent-record` | Shows everything the site stores about you (only `localStorage`: theme and eggs), with a *Forget me* button. | `assets/js/eggs/snowden.js` |
| **The Gambler** | hinted | The 404 page: *spin the wheel* | Returned to sender. The egg counts only when the wheel stops on zero, as it did for the grandmother. | `assets/js/eggs/gambler.js`, `404.html` |
| **Verne** | obscure | Visit when it is already tomorrow in Seoul; the dateline then reads *(posted tomorrow, for you)*. Also type `fogg`; `#fogg` | Phileas Fogg gained a day travelling east. | `assets/js/eggs/verne.js` |
| **Frankl** | obscure | Visit between midnight and 5 am, your time: *It’s late where you are* appears under the intro. Also type `frankl`; `#frankl` | The last of the human freedoms, for whoever is still up. | `assets/js/eggs/frankl.js` |
| **Bostrom** | obscure | Open the developer console: a riddle ends with `paperclip()` | The paperclip maximiser, answered in the console where it was asked. | `assets/js/eggs/bostrom.js`, riddle in `site.js` |
| **Gombrich** | obscure | Print any page | The printed letter ends with “There really is no such thing as Art. There are only artists.” | `assets/css/print.css`, `beforeprint` in `site.js` |
| **La Boétie** | obscure | Press `Escape` three times with nothing open | *Soyez résolus de ne servir plus, et vous voilà libres.* Nothing to escape from. | `assets/js/eggs/laboetie.js` |

### The ledger

The footer shows **postmarks n/10**, which links to `#postmarks`. The ledger lists the eggs this browser has found, with a hint for each one still missing. Found eggs are stored under the `localStorage` key `eggs`, wrapped in `try/catch`, so private windows and blocked storage just mean an empty ledger. The ledger appears only with JavaScript on, since it is useless without it. File: `assets/js/eggs/postmarks.js`.

## Rules every egg follows

- **Nothing loads until it is triggered.** Each egg is its own ES module, pulled in with `import()` by `assets/js/site.js`. The homepage loads no egg code.
- **One dialog.** Every egg opens the same native `<dialog>`, so they all get the same behaviour:
  - `Escape` closes it;
  - the rest of the page is inert;
  - a backdrop click closes it too;
  - focus moves into the dialog and returns to whatever opened it.
- **Hashes are cleared on close.** An egg's URL hash does not stick to the page.
- **Sound only on request.** The only sound (Galt's hum) starts with an explicit *Run the motor* button, has a stop button, and stops when the dialog closes.
- **Reduced motion.** The dialog appears instantly and the rotor stands still.
- **Without JavaScript**, the struck P.S. still reveals itself on selection and the print quote still prints. Doors that need JavaScript are hidden.
- **Typing in a field never triggers a word.** The shelf search is safe.

## Add an egg

1. Write `assets/js/eggs/<id>.js`. Export a default function: it receives `{ dialog, found, EGGS }` from `site.js` and calls `dialog(label, html)`. Never import `../site.js` in an egg: the pages load `site.js?v=…`, so a second import runs it twice and every door opens two notes. Return `false` if this run should not count as found.
2. Add the id to `EGGS` in `assets/js/site.js`, plus any typed words or hashes to `WORDS`.
3. Give it a door: a `data-egg="<id>"` attribute on a button, a `data-egg-select` on text, or a condition in `site.js`.
4. Add its title and hint to `BOOK` in `assets/js/eggs/postmarks.js`, and a row to this file.
