// The shelf is plain HTML; this only adds the search box.
const form = document.querySelector(".search");
if (form) {
  const input = form.querySelector("input");
  const count = form.querySelector("[data-count]");
  const empty = document.querySelector("[data-empty]");
  const books = [...document.querySelectorAll(".book")];
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
    count.textContent = count.dataset.template.replace("{n}", n);
    empty.hidden = n > 0;
    empty.textContent = n ? "" : empty.dataset.template.replace("{q}", input.value.trim());
  });
}
