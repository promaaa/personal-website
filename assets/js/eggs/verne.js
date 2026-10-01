// Verne: the letter is dated tomorrow, wherever you are reading it.
import { dialog } from "../site.js";

export default () => dialog("Posted from tomorrow", `
  <h2>Posted from tomorrow.</h2>
  <p>In Seoul it is already the next day. Phileas Fogg won his wager the same way: travelling east around the world, he gained a day without noticing, and arrived at the Reform Club just in time.</p>
  <p class="muted">Jules Verne, <cite lang="fr">Le Tour du monde en quatre-vingts jours</cite>, 1872.</p>`);
