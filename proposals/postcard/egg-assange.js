// Egg: the struck postscript. Loaded only when triggered.
import { dialog } from "../shared/site.js";

export default () => dialog("P.S.", `
  <h2>P.S.</h2>
  <img src="../../pictures/assange.jpg" width="800" height="923" alt="Black and white portrait of Julian Assange." class="portrait">
  <blockquote><p>“Courage is contagious.”</p></blockquote>
  <p class="muted">Julian Assange, publisher.</p>
  <p class="actions"><button class="pen" type="button" data-close>Close</button></p>`);
