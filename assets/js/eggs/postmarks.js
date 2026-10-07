// The ledger: which postmarks this browser has collected, and a hint for the rest.

const BOOK = {
  galt: ["Who is John Galt?", "A painting with no painter asks a question."],
  montecristo: ["Wait and hope", "Some lines only appear to those who wait."],
  assange: ["P.S.", "Not everything struck out stays hidden."],
  verne: ["Posted from tomorrow", "Read the letter from the other side of the date line."],
  frankl: ["Still up?", "Come back after midnight."],
  bostrom: ["One paperclip", "The developers’ console has a riddle."],
  snowden: ["Permanent record", "Read the source of this letter."],
  gambler: ["Zéro", "Get lost, then try your luck."],
  gombrich: ["No such thing as Art", "Put it on paper."],
  laboetie: ["Nothing to escape from", "Refuse three times."],
};

export default ({ dialog, found, EGGS }) => {
  const got = found();
  const items = EGGS.map((id) => {
    const [title, hint] = BOOK[id];
    return got.has(id)
      ? `<li><span class="got" aria-hidden="true">✓</span><span>${title}</span></li>`
      : `<li><span aria-hidden="true">·</span><span class="muted">${hint}</span></li>`;
  }).join("");
  dialog("Postmarks", `
    <h2>Postmarks: ${got.size} of ${EGGS.length}</h2>
    <p>The hidden layer of this site, as collected by this browser.</p>
    <ul class="plain stamps">${items}</ul>`);
  return false; // the ledger is not an egg of its own
};
