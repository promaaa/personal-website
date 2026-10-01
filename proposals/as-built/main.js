// As-built: shared runtime + the handle between drawing and photograph.
import { init } from "../shared/site.js";

init({
  key: "as-built",
  dialogClass: "sheet",
  eggs: { galt: () => import("./egg-galt.js") },
  words: { galt: "galt", johngalt: "galt", whoisjohngalt: "galt" },
});

// The handle is a native range input: drag, click, arrow keys, Home/End.
const split = document.querySelector(".split");
const handle = split?.querySelector(".handle");
const hint = document.querySelector(".galt-hint");
if (handle) {
  handle.hidden = false;
  handle.addEventListener("input", () => {
    split.getAnimations().forEach((a) => a.cancel()); // the visitor takes over from the first sweep
    const v = Number(handle.value);
    split.style.setProperty("--split", `${v}%`);
    handle.setAttribute("aria-valuetext", v >= 100 ? "Entirely drawn" : v <= 0 ? "Entirely built" : `${v}% drawn, ${100 - v}% built`);
    if (v >= 100) hint.hidden = false; // some machines exist only as drawn
  });
}
