// Wall label: shared runtime; the egg is the inventory number.
import { init } from "../shared/site.js";
init({
  key: "wall-label",
  dialogClass: "note",
  eggs: { montecristo: () => import("./egg-montecristo.js") },
  words: { dantes: "montecristo", montecristo: "montecristo", attendre: "montecristo", esperer: "montecristo" },
});
