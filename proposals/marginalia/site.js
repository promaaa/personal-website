// Marginalia: theme toggle, copy-address, and the hidden layer's triggers.
// Eggs are lazy modules: nothing below loads an egg until it is triggered.

const root = document.documentElement;
const darkQuery = matchMedia("(prefers-color-scheme: dark)");

// ---- Lamplight (theme): follows the system until the reader chooses ----
const lamp = document.querySelector(".lamp");
const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : darkQuery.matches);
if (lamp) {
  const sync = () => lamp.setAttribute("aria-pressed", String(isDark()));
  lamp.hidden = false;
  sync();
  darkQuery.addEventListener("change", sync);
  lamp.addEventListener("click", () => {
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
  const status = btn.nextElementSibling;
  btn.hidden = false;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Copied";
      status.textContent = "Address copied to the clipboard";
      setTimeout(() => { btn.textContent = "Copy"; status.textContent = ""; }, 2000);
    } catch {}
  });
}

// ---- Hidden layer ----
const EGGS = { assange: () => import("./egg-assange.js") };
const WORDS = { assange: "assange", julian: "assange", wikileaks: "assange" }; // typed words and #hashes

function remember(id) {
  try {
    const found = new Set(JSON.parse(localStorage.getItem("marginalia:found") || "[]"));
    found.add(id);
    localStorage.setItem("marginalia:found", JSON.stringify([...found]));
  } catch {}
}

let busy = false;
async function hatch(id) {
  if (busy || document.querySelector("dialog[open]")) return;
  busy = true;
  try { (await EGGS[id]()).default(); remember(id); } finally { busy = false; }
}

// The plate: the single modal every egg uses. Native <dialog> gives Escape,
// an inert page and the top layer; we add backdrop-click and focus return.
export function plate(label, html) {
  const opener = document.activeElement;
  const d = document.createElement("dialog");
  d.className = "plate";
  d.setAttribute("aria-label", label);
  d.innerHTML = `${html}<p class="close"><button class="text-button" type="button">Close</button></p>`;
  d.querySelector(".close button").addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
  });
  d.addEventListener("close", () => {
    d.remove();
    if (WORDS[location.hash.slice(1)]) history.replaceState(null, "", location.pathname + location.search);
    opener?.focus?.({ preventScroll: true });
  });
  document.body.append(d);
  d.showModal();
  d.querySelector(".close button").focus({ preventScroll: true });
}

// Trigger 1: typed words (never while typing in a field).
let typed = "";
addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  typed = (typed + e.key.toLowerCase()).slice(-12);
  for (const w in WORDS) if (typed.endsWith(w)) { typed = ""; hatch(WORDS[w]); }
});

// Trigger 2: URL hash, on load and on change.
const fromHash = () => { const id = WORDS[location.hash.slice(1)]; if (id) hatch(id); };
addEventListener("hashchange", fromHash);
fromHash();

// Trigger 3: selecting a redaction (one end of the selection inside it).
function checkSelection() {
  const sel = getSelection();
  if (!sel || sel.isCollapsed || sel.toString().trim().length < 4) return;
  const el = [...document.querySelectorAll("[data-egg]")]
    .find((n) => n.contains(sel.anchorNode) || n.contains(sel.focusNode));
  if (el) hatch(el.dataset.egg);
}
document.addEventListener("pointerup", () => setTimeout(checkSelection));
document.addEventListener("keyup", (e) => { if (e.shiftKey) checkSelection(); });
