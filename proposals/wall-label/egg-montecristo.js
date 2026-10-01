// Egg: inventory number 1844 on the wall label. Loaded only when triggered.
import { dialog } from "../shared/site.js";

export default () => dialog("Wait and hope", `
  <h2>Inv. 1844</h2>
  <blockquote lang="fr"><p>« Toute la sagesse humaine sera dans ces deux mots : attendre et espérer. »</p></blockquote>
  <blockquote><p>“All human wisdom is contained in these two words: wait and hope.”</p></blockquote>
  <p class="muted">Alexandre Dumas, <cite lang="fr">Le Comte de Monte-Cristo</cite>, 1844.</p>
  <p class="actions"><button class="pen" type="button" data-close>Close</button></p>`);
