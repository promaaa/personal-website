// The shelf is plain HTML; this only adds the search box.
const form = document.querySelector(".search");
if (form) {
  const input = form.querySelector("input");
  const count = form.querySelector("[data-count]");
  const empty = document.querySelector("[data-empty]");
  const books = [...document.querySelectorAll(".book")];
  const plural = new Intl.PluralRules(document.documentElement.lang);
  form.hidden = false;
  form.addEventListener("submit", (e) => e.preventDefault());
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let n = 0;
    for (const b of books) {
      const hit = !q || b.dataset.words.includes(q);
      b.hidden = !hit;
      if (hit) n++;
    }
    for (const s of document.querySelectorAll("#shelf section")) s.hidden = !s.querySelector(".book:not([hidden])");
    const one = plural.select(n) === "one"; // "1 book", and in French "0 livre", "1 livre"
    count.textContent = (one ? count.dataset.templateOne : count.dataset.template).replace("{n}", n);
    empty.hidden = n > 0;
    empty.textContent = n ? "" : empty.dataset.template.replace("{q}", input.value.trim());
  });
}
