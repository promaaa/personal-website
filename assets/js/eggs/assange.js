// Assange: the struck postscript, revealed by selecting it.
import { dialog } from "../site.js";

const portrait = new URL("../../images/assange.webp", import.meta.url);
export default () => dialog("P.S.", `
  <h2>P.S.</h2>
  <img class="portrait" src="${portrait}" width="600" height="692" alt="Black and white portrait of Julian Assange.">
  <blockquote><p>“Courage is contagious.”</p></blockquote>
  <p class="muted">Julian Assange, publisher.</p>`);
