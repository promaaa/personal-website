// Egg: the islet marked E.D. Loaded only when triggered.
// The last letter of the novel, found on the island, set en face (French original, English translation).
import { letter } from "./site.js";

export default () => letter("A letter found on the island of Monte-Cristo", `
  <p class="pos">42°20′N 10°19′E</p>
  <h2 lang="fr">Île de Monte-Cristo</h2>
  <div class="face">
    <blockquote lang="fr"><p>« Vivez donc et soyez heureux, enfants chéris de mon cœur, et n’oubliez jamais que, jusqu’au jour où Dieu daignera dévoiler l’avenir à l’homme, toute la sagesse humaine sera dans ces deux mots : Attendre et espérer ! »</p></blockquote>
    <blockquote><p>“Live, then, and be happy, beloved children of my heart, and never forget that until the day God will deign to reveal the future to man, all human wisdom is contained in these two words: Wait and hope.”</p></blockquote>
  </div>
  <p class="sign">Edmond Dantès, Count of Monte Cristo. Alexandre Dumas, 1844.</p>`);
