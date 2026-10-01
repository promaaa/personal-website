// Egg: the struck note under Notes, revealed by selecting it. Loaded only when triggered.
import { dialog } from "../shared/site.js";

export default () => dialog("Plate: Julian Assange", `
  <img src="../../pictures/assange.jpg" width="800" height="923" alt="Black and white portrait of Julian Assange.">
  <blockquote><p>“Courage is contagious.”</p></blockquote>
  <p>Julian Assange, publisher. Note 6, as drawn before revision D.</p>
  <p class="actions"><button class="pen" type="button" data-close>Close</button></p>`);
