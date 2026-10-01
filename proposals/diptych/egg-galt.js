// Egg: "Who painted this?" has no answer, like the other question. Loaded only when triggered.
// Sound is opt-in (explicit button), always stoppable, and stops on close.
import { dialog } from "../shared/site.js";

const teeth = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6, c = Math.cos(a), s = Math.sin(a);
  return `M${150 + 58 * c} ${125 + 58 * s}L${150 + 70 * c} ${125 + 70 * s}`;
}).join("");

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
  for (const [f, level] of [[55, 0.5], [110.4, 0.3]]) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = f; g.gain.value = level;
    o.connect(g).connect(gain); o.start();
  }
  gain.gain.setTargetAtTime(0.05, ctx.currentTime, 0.6);
  audio = { ctx, gain };
}

export default () => {
  const d = dialog("Who is John Galt?", `
    <h2>Who is John Galt?</h2>
    <p>Nobody painted this picture, and nobody signed the motor either.</p>
    <svg viewBox="0 0 300 220" role="img" aria-label="Line drawing of a motor: a collector above a toothed stator around a turning rotor." class="drawing">
      <path d="M150 55V14M138 22h24M141 30h18M144 38h12"/>
      <circle cx="150" cy="125" r="70"/><circle cx="150" cy="125" r="58"/><path d="${teeth}"/>
      <g class="rotor"><circle cx="150" cy="125" r="34"/><circle cx="150" cy="125" r="6"/><path d="M150 119V91M155.2 128l24.3 14M144.8 128l-24.3 14"/></g>
    </svg>
    <p class="muted">A motor that turns the static electricity of the atmosphere into motion, abandoned by its inventor. Ayn Rand, <cite>Atlas Shrugged</cite>, 1957.</p>
    <p class="actions">
      <button class="pen" type="button" data-sound aria-pressed="false">Run the motor (sound)</button>
      <button class="pen" type="button" data-close>Close</button>
    </p>`, () => hum(false));
  const btn = d.querySelector("[data-sound]");
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") !== "true";
    hum(on);
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "Stop the motor" : "Run the motor (sound)";
  });
};
