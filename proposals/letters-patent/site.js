// Letters patent: theme toggle, copy-address, and the hidden layer's triggers.
// Eggs are lazy modules: nothing below loads an egg until it is triggered.

const root = document.documentElement;
const darkQuery = matchMedia("(prefers-color-scheme: dark)");

// ---- Microfilm (theme): follows the system until the reader chooses ----
const toggle = document.querySelector(".theme");
const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : darkQuery.matches);
if (toggle) {
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
  const status = btn.nextElementSibling;
  btn.hidden = false;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "copied";
      status.textContent = "Address copied to the clipboard";
      setTimeout(() => { btn.textContent = "copy"; status.textContent = ""; }, 2000);
    } catch {}
  });
}

// ---- Hidden layer ----
const EGGS = { galt: () => import("./egg-galt.js") };
const WORDS = { galt: "galt", johngalt: "galt", whoisjohngalt: "galt" }; // typed words and #hashes

function remember(id) {
  try {
    const found = new Set(JSON.parse(localStorage.getItem("patent:found") || "[]"));
    found.add(id);
    localStorage.setItem("patent:found", JSON.stringify([...found]));
  } catch {}
}

let busy = false;
async function hatch(id) {
  if (busy || document.querySelector("dialog[open]")) return;
  busy = true;
  try { (await EGGS[id]()).default(); remember(id); } finally { busy = false; }
}

// The drawing sheet: the single modal every egg uses. Native <dialog> gives
// Escape, an inert page and the top layer; we add backdrop-click and focus return.
export function sheet(label, html, onClose) {
  const opener = document.activeElement;
  const d = document.createElement("dialog");
  d.className = "sheet";
  d.setAttribute("aria-label", label);
  d.innerHTML = html;
  d.querySelector("[data-close]").addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
  });
  d.addEventListener("close", () => {
    onClose?.();
    d.remove();
    if (WORDS[location.hash.slice(1)]) history.replaceState(null, "", location.pathname + location.search);
    opener?.focus?.({ preventScroll: true });
  });
  document.body.append(d);
  d.showModal();
  d.querySelector("[data-close]").focus({ preventScroll: true });
  return d;
}

// Trigger 1: the cited document itself (the obvious door).
for (const el of document.querySelectorAll("button[data-egg]")) el.addEventListener("click", () => hatch(el.dataset.egg));

// Trigger 2: typed words (never while typing in a field).
let typed = "";
addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  typed = (typed + e.key.toLowerCase()).slice(-16);
  for (const w in WORDS) if (typed.endsWith(w)) { typed = ""; hatch(WORDS[w]); }
});

// Trigger 3: URL hash, on load and on change.
const fromHash = () => { const id = WORDS[location.hash.slice(1)]; if (id) hatch(id); };
addEventListener("hashchange", fromHash);
fromHash();
