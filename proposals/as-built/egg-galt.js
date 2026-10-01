// Egg: the machine that exists only as drawn. Loaded only when triggered.
// Sound is opt-in (explicit button), always stoppable, and stops on close.
import { dialog } from "../shared/site.js";

const teeth = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6, c = Math.cos(a), s = Math.sin(a);
  return `M${150 + 58 * c} ${125 + 58 * s}L${150 + 70 * c} ${125 + 70 * s}`;
}).join("");

const drawing = `
<svg viewBox="0 0 300 220" role="img" aria-label="Line drawing of a motor: a collector mast above a toothed stator around a three-spoke rotor.">
  <g class="draw-group">
    <path d="M150 55V14M138 22h24M141 30h18M144 38h12"/>
    <circle cx="150" cy="125" r="70"/><circle cx="150" cy="125" r="58"/>
    <path d="${teeth}"/>
    <g class="rotor"><circle cx="150" cy="125" r="34"/><circle cx="150" cy="125" r="6"/><path d="M150 119V91M155.2 128l24.3 14M144.8 128l-24.3 14"/></g>
    <path d="M150 14q20-8 40 2M206 70q24-14 44-6M178 125q40 6 66 30M150 131q-6 60 -40 70"/>
  </g>
  <g><text x="194" y="22">20</text><text x="254" y="66">22</text><text x="248" y="162">24</text><text x="92" y="212">26</text></g>
</svg>`;

let audio;
function hum(on) {
  if (!on) {
    if (!audio) return;
    const { ctx, gain } = audio;
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
    setTimeout(() => ctx.close(), 400);
    audio = null;
    return;
  }
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(ctx.destination);
  for (const [f, type, level] of [[55, "sine", 0.5], [110.4, "sine", 0.3], [220, "triangle", 0.06]]) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = f; g.gain.value = level;
    o.connect(g).connect(gain); o.start();
  }
  gain.gain.setTargetAtTime(0.05, ctx.currentTime, 0.6);
  audio = { ctx, gain };
}

export default () => {
  const d = dialog("Fig. 7: the motor of the world", `
    <p class="sheet-no"><span>As drawn, never built</span><span>Fig. 7</span></p>
    ${drawing}
    <h2>The motor of the world.</h2>
    <p>A motor converting the static electricity of the atmosphere into kinetic energy: collector (20), stator (22), rotor (24), shaft (26). Found abandoned in the Twentieth Century Motor Company. Its inventor withdrew and took the method along.</p>
    <p><i>Who is John Galt?</i></p>
    <p class="actions">
      <button class="text-button" type="button" data-sound aria-pressed="false">Run the motor (sound)</button>
      <button class="text-button" type="button" data-close>Close</button>
    </p>`, () => hum(false));
  const btn = d.querySelector("[data-sound]");
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") !== "true";
    hum(on);
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "Stop the motor" : "Run the motor (sound)";
  });
};
