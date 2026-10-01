// Shared runtime for the round-2 proposals: theme toggle, copy-address,
// and the hidden layer (lazy eggs, one native <dialog>, a localStorage ledger).
// Each proposal calls init() from its main.js; egg modules import dialog().

const root = document.documentElement;
const darkQuery = matchMedia("(prefers-color-scheme: dark)");
let config;

export function init(options) {
  config = options; // { key, eggs: {id: () => import()}, words: {word: id}, dialogClass }
  theme();
  copy();
  triggers();
}

// ---- Theme: follows the system until the visitor chooses ----
function theme() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
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
function copy() {
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
}

// ---- Hidden layer ----
function remember(id) {
  try {
    const k = `${config.key}:found`;
    const found = new Set(JSON.parse(localStorage.getItem(k) || "[]"));
    found.add(id);
    localStorage.setItem(k, JSON.stringify([...found]));
  } catch {}
}

let busy = false;
export async function hatch(id) {
  if (busy || document.querySelector("dialog[open]") || !config.eggs[id]) return;
  busy = true;
  try { (await config.eggs[id]()).default(); remember(id); } finally { busy = false; }
}

// One modal for every egg. Native <dialog>: Escape, inert page, top layer.
// Added here: backdrop click, focus moved in and returned, egg hash cleared.
export function dialog(label, html, onClose) {
  const opener = document.activeElement;
  const d = document.createElement("dialog");
  d.className = config.dialogClass;
  d.setAttribute("aria-label", label);
  d.innerHTML = html;
  const close = d.querySelector("[data-close]");
  close.addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
  });
  d.addEventListener("close", () => {
    onClose?.();
    d.remove();
    if (config.words[location.hash.slice(1).toLowerCase()]) history.replaceState(null, "", location.pathname + location.search);
    opener?.focus?.({ preventScroll: true });
  });
  document.body.append(d);
  d.showModal();
  close.focus({ preventScroll: true });
  return d;
}

function triggers() {
  // Visible doors: any element carrying data-egg.
  for (const el of document.querySelectorAll("button[data-egg]")) el.addEventListener("click", () => hatch(el.dataset.egg));

  // Typed words, never while typing in a field.
  let typed = "";
  addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
    if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
    typed = (typed + e.key.toLowerCase()).slice(-16);
    for (const w in config.words) if (typed.endsWith(w)) { typed = ""; hatch(config.words[w]); }
  });

  // URL hashes, on load and on change.
  const fromHash = () => { const id = config.words[location.hash.slice(1).toLowerCase()]; if (id) hatch(id); };
  addEventListener("hashchange", fromHash);
  fromHash();

  // Selection: one end of the selection inside an element marked data-egg-select.
  const checkSelection = () => {
    const sel = getSelection();
    if (!sel || sel.isCollapsed || sel.toString().trim().length < 4) return;
    const el = [...document.querySelectorAll("[data-egg-select]")].find((n) => n.contains(sel.anchorNode) || n.contains(sel.focusNode));
    if (el) hatch(el.dataset.eggSelect);
  };
  document.addEventListener("pointerup", () => setTimeout(checkSelection));
  document.addEventListener("keyup", (e) => { if (e.shiftKey) checkSelection(); });
}

// Stillness: calls fn once after ms without input. Never opens a dialog by itself.
export function onIdle(ms, fn) {
  let t;
  const still = () => { clearTimeout(t); t = setTimeout(fn, ms); };
  for (const type of ["pointermove", "keydown", "scroll", "touchstart"]) addEventListener(type, still, { passive: true });
  still();
}
