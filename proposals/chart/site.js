// Chart: theme toggle, copy-address, and the hidden layer's triggers.
// Eggs are lazy modules: nothing below loads an egg until it is triggered.

const root = document.documentElement;
const darkQuery = matchMedia("(prefers-color-scheme: dark)");

// ---- Dusk (theme): follows the system until the reader chooses ----
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
const EGGS = { montecristo: () => import("./egg-montecristo.js") };
const WORDS = { montecristo: "montecristo", dantes: "montecristo", attendre: "montecristo", esperer: "montecristo" }; // typed words and #hashes

function remember(id) {
  try {
    const found = new Set(JSON.parse(localStorage.getItem("chart:found") || "[]"));
    found.add(id);
    localStorage.setItem("chart:found", JSON.stringify([...found]));
  } catch {}
}

let busy = false;
async function hatch(id) {
  if (busy || document.querySelector("dialog[open]")) return;
  busy = true;
  try { (await EGGS[id]()).default(); remember(id); } finally { busy = false; }
}

// The letter: the single modal every egg uses. Native <dialog> gives Escape,
// an inert page and the top layer; we add backdrop-click and focus return.
export function letter(label, html) {
  const opener = document.activeElement;
  const d = document.createElement("dialog");
  d.className = "letter";
  d.setAttribute("aria-label", label);
  d.innerHTML = `${html}<p class="actions"><button class="link-button" type="button" data-close>Close</button></p>`;
  d.querySelector("[data-close]").addEventListener("click", () => d.close());
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
  d.querySelector("[data-close]").focus({ preventScroll: true });
}

// Trigger 1: URL hash (the islet on the chart links to #montecristo).
const fromHash = () => { const id = WORDS[location.hash.slice(1)]; if (id) hatch(id); };
addEventListener("hashchange", fromHash);
fromHash();

// Trigger 2: typed words (never while typing in a field).
let typed = "";
addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  typed = (typed + e.key.toLowerCase()).slice(-12);
  for (const w in WORDS) if (typed.endsWith(w)) { typed = ""; hatch(WORDS[w]); }
});

// Trigger 3: wait. After a long stillness the doubtful islet emerges and is named.
// It never opens anything by itself: reading is never interrupted.
const idleMs = Number(getComputedStyle(root).getPropertyValue("--idle-ms")) || 45000;
let idle;
const still = () => {
  clearTimeout(idle);
  idle = setTimeout(() => root.classList.add("emerged"), idleMs);
};
for (const type of ["pointermove", "keydown", "scroll", "touchstart"]) addEventListener(type, still, { passive: true });
still();
