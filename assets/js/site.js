// promaa.tech runtime: theme toggle, copy-address, and the hidden layer.
// Every egg is its own module in ./eggs/, imported only when triggered.
// Nothing here phones home: the only storage is this browser's localStorage.

const root = document.documentElement;
const darkQuery = matchMedia("(prefers-color-scheme: dark)");

// ---- Theme: follows the system until the visitor chooses ----
const toggle = document.querySelector("[data-theme-toggle]");
if (toggle) {
  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : darkQuery.matches);
  const sync = () => toggle.setAttribute("aria-pressed", String(isDark()));
  toggle.hidden = false;
  sync();
  darkQuery.addEventListener("change", sync);
  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.classList.add("theme-switching"); // theme changes never animate
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    sync();
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
  });
}

// ---- Copy address: inline feedback next to the trigger ----
for (const btn of document.querySelectorAll("[data-copy]")) {
  if (!navigator.clipboard) continue;
  const label = btn.textContent;
  const status = btn.nextElementSibling;
  btn.hidden = false;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "copied";
      status.textContent = "Address copied to the clipboard";
      setTimeout(() => { btn.textContent = label; status.textContent = ""; }, 2000);
    } catch {}
  });
}

// Doors that only work with JavaScript stay hidden without it.
for (const el of document.querySelectorAll("[data-needs-js]")) el.hidden = false;

// ---- The hidden layer ----
// Ten eggs. The ledger ("postmarks") is the eleventh door and lists them.
export const EGGS = ["galt", "montecristo", "assange", "verne", "frankl", "bostrom", "snowden", "gambler", "gombrich", "laboetie"];
const WORDS = {
  galt: "galt", johngalt: "galt", whoisjohngalt: "galt",
  dantes: "montecristo", montecristo: "montecristo", attendre: "montecristo", esperer: "montecristo",
  assange: "assange", julian: "assange", wikileaks: "assange",
  fogg: "verne", passepartout: "verne",
  frankl: "frankl",
  "permanent-record": "snowden", snowden: "snowden",
  laboetie: "laboetie",
  postmarks: "postmarks",
};

export function found() {
  try { return new Set(JSON.parse(localStorage.getItem("eggs") || "[]")); } catch { return new Set(); }
}
export function remember(id) {
  if (!EGGS.includes(id)) return;
  try {
    const all = found();
    all.add(id);
    localStorage.setItem("eggs", JSON.stringify([...all]));
  } catch {}
  stampCount();
}

let busy = false;
export async function hatch(id) {
  if (busy || document.querySelector("dialog[open]")) return;
  busy = true;
  try {
    const egg = await import(`./eggs/${id}.js`);
    if (egg.default() !== false) remember(id); // an egg can decline (the wheel did not stop on zero)
  } catch {} finally { busy = false; }
}

// The note: one native <dialog> for every egg. It brings Escape, an inert
// page and the top layer; we add backdrop click, focus in and focus back.
export function dialog(label, html, { onClose, extra = "" } = {}) {
  const opener = document.activeElement;
  const d = document.createElement("dialog");
  d.className = "note";
  d.setAttribute("aria-label", label);
  d.innerHTML = `${html}<p class="actions">${extra}<button class="pen" type="button" data-close>Close</button></p>`;
  const close = d.querySelector("[data-close]");
  close.addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
  });
  d.addEventListener("close", () => {
    onClose?.();
    d.remove();
    if (WORDS[location.hash.slice(1).toLowerCase()]) history.replaceState(null, "", location.pathname + location.search);
    opener?.focus?.({ preventScroll: true });
  });
  document.body.append(d);
  d.showModal();
  close.focus({ preventScroll: true });
  return d;
}

// Visible doors: anything carrying data-egg.
document.addEventListener("click", (e) => {
  const door = e.target.closest?.("[data-egg]");
  if (door) { e.preventDefault(); hatch(door.dataset.egg); }
});

// Typed words, never while typing in a field. Escape three times with
// nothing open is La Boétie's door.
let typed = "";
let escapes = [];
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (document.querySelector("dialog[open]")) return;
    const now = Date.now();
    escapes = [...escapes.filter((t) => now - t < 1500), now];
    if (escapes.length >= 3) { escapes = []; hatch("laboetie"); }
    return;
  }
  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  typed = (typed + e.key.toLowerCase()).slice(-20);
  for (const w in WORDS) if (typed.endsWith(w.replace("-", ""))) { typed = ""; hatch(WORDS[w]); }
});

// URL hashes, on load and on change (#postmarks opens the ledger).
const fromHash = () => { const id = WORDS[location.hash.slice(1).toLowerCase()]; if (id) hatch(id); };
addEventListener("hashchange", fromHash);
fromHash();

// Selecting a struck line (one end of the selection inside it).
const checkSelection = () => {
  const sel = getSelection();
  if (!sel || sel.isCollapsed || sel.toString().trim().length < 4) return;
  const el = [...document.querySelectorAll("[data-egg-select]")].find((n) => n.contains(sel.anchorNode) || n.contains(sel.focusNode));
  if (el) hatch(el.dataset.eggSelect);
};
document.addEventListener("pointerup", () => setTimeout(checkSelection));
document.addEventListener("keyup", (e) => { if (e.shiftKey) checkSelection(); });

// Waiting: after a long stillness the P.P.S. appears. It never opens itself.
const pps = document.querySelector("[data-after-wait]");
if (pps) {
  const ms = Number(getComputedStyle(root).getPropertyValue("--idle-ms")) || 60000;
  let t;
  const still = () => { clearTimeout(t); t = setTimeout(() => { pps.hidden = false; }, ms); };
  for (const type of ["pointermove", "keydown", "scroll", "touchstart"]) addEventListener(type, still, { passive: true });
  still();
}

// Time: after midnight, a word from Frankl; and when Seoul is already on
// tomorrow for you, a postmark Phileas Fogg would recognise.
const night = document.querySelector("[data-night]");
if (night && new Date().getHours() < 5) night.hidden = false;
const seoulDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
const localDay = new Intl.DateTimeFormat("en-CA").format(new Date());
const dateline = document.querySelector("[data-dateline]");
if (dateline && seoulDay > localDay) dateline.hidden = false;

// Print: the printed letter carries a line from Gombrich (see print.css).
addEventListener("beforeprint", () => remember("gombrich"));

// The console: a riddle for whoever opens the developer tools.
const red = `color: ${getComputedStyle(root).getPropertyValue("--accent")}`;
console.log(
  "%cpromaa.tech%c\nAn engineer was asked for one paperclip.\nThe engineer was very, very good at the job.\nAsk for yours: %cpaperclip()",
  red, "", red,
);
window.paperclip = () => { hatch("bostrom"); return "📎"; };

// The postmark counter in the footer: the way into the ledger.
function stampCount() {
  const el = document.querySelector("[data-stamps]");
  if (!el) return;
  el.textContent = `${found().size}/${EGGS.length}`;
  el.closest("[hidden]")?.removeAttribute("hidden"); // the ledger needs JS, so its door does too
}
stampCount();
