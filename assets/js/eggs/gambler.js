// The Gambler: the 404 page's wheel. Found only when it stops on zero.

export default ({ dialog }) => {
  const n = crypto.getRandomValues(new Uint8Array(1))[0] % 37;
  if (n !== 0) {
    const out = document.querySelector("[data-wheel]");
    if (out) out.textContent = `The wheel stops on ${n}. Not zero. Again?`;
    return false;
  }
  dialog("Zero", `
    <h2>Zéro !</h2>
    <p>The grandmother would have been delighted: she put everything on zero, and for one evening zero kept coming up.</p>
    <p class="muted">Fyodor Dostoevsky, <cite>The Gambler</cite>, 1866.</p>`);
};
