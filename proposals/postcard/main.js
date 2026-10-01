// Postcard: shared runtime; the egg is the struck postscript.
import { init } from "../shared/site.js";
init({
  key: "postcard",
  dialogClass: "note",
  eggs: { assange: () => import("./egg-assange.js") },
  words: { assange: "assange", julian: "assange", wikileaks: "assange" },
});
