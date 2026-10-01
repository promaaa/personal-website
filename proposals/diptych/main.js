// Diptych: shared runtime; the egg answers "Who painted this?".
import { init } from "../shared/site.js";
init({
  key: "diptych",
  dialogClass: "note",
  eggs: { galt: () => import("./egg-galt.js") },
  words: { galt: "galt", johngalt: "galt", whoisjohngalt: "galt" },
});
