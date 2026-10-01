// Fiducial: shared runtime + the long exposure that waiting earns.
import { init, onIdle } from "../shared/site.js";

const words = { dantes: "montecristo", montecristo: "montecristo", attendre: "montecristo", esperer: "montecristo", chateaudif: "montecristo" };
init({ key: "fiducial", dialogClass: "frame-dialog", eggs: { montecristo: () => import("./egg-montecristo.js") }, words });

// Stay still and the exposure lengthens; frame 0000 appears on the strip.
const ms = Number(getComputedStyle(document.documentElement).getPropertyValue("--idle-ms")) || 30000;
onIdle(ms, () => document.documentElement.classList.add("long-exposure"));
