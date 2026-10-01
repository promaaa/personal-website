// Sheet: shared runtime + the link between the parts list and the balloons.
import { init } from "../shared/site.js";

init({
  key: "sheet",
  dialogClass: "drawing",
  eggs: { assange: () => import("./egg-assange.js") },
  words: { assange: "assange", julian: "assange", wikileaks: "assange" },
});

// Hovering a parts-list row or its balloon marks both in red.
const mark = (n, on) => document.querySelectorAll(`[data-item="${n}"]`).forEach((el) => el.classList.toggle("on", on));
for (const el of document.querySelectorAll("[data-item]")) {
  el.addEventListener("pointerenter", () => mark(el.dataset.item, true));
  el.addEventListener("pointerleave", () => mark(el.dataset.item, false));
}
