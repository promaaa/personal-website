// Egg: frame 0000, the one that only appears to those who wait. Loaded only when triggered.
import { dialog } from "../shared/site.js";

export default () => dialog("Frame 0000: Château d’If", `
  <p class="frame-no data">Frame 0000 · 43°17′N 5°20′E</p>
  <h2 lang="fr">Château d’If</h2>
  <div class="face">
    <blockquote lang="fr"><p>« Toute la sagesse humaine sera dans ces deux mots : Attendre et espérer ! »</p></blockquote>
    <blockquote><p>“All human wisdom is contained in these two words: Wait and hope.”</p></blockquote>
  </div>
  <p class="sign">Edmond Dantès, fourteen years a prisoner here. Alexandre Dumas, <cite lang="fr">Le Comte de Monte-Cristo</cite>, 1844.</p>
  <p class="actions"><button class="mark-button" type="button" data-close>Close</button></p>`);
