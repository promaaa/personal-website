// Snowden: the permanent record. Everything this site keeps about you, shown in full.
import { dialog } from "../site.js";

export default () => {
  let rows = "";
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      rows += `<li><code>${k}</code>: <code>${(localStorage.getItem(k) || "").replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"))}</code></li>`;
    }
  } catch {}
  const d = dialog("Permanent record", `
    <h2>Permanent record</h2>
    <p>This is everything promaa.tech keeps about you. It lives in your browser and nothing leaves it: no cookie, no analytics, no server.</p>
    <ul class="plain">${rows || "<li>Nothing at all.</li>"}</ul>
    <p class="muted">After Edward Snowden, <cite>Permanent Record</cite>, 2019.</p>`,
    { extra: `<button class="pen" type="button" data-forget>Forget me</button>` });
  d.querySelector("[data-forget]").addEventListener("click", () => {
    try { localStorage.clear(); } catch {}
    d.close();
  });
};
