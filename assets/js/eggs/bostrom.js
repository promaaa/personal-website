// Bostrom: the console riddle. Answered in the console, where it was asked.
export default () => {
  let n = 1;
  const id = setInterval(() => {
    console.log(`📎 × ${n.toLocaleString("en")}`);
    n *= 1000;
    if (n > 1e15) {
      clearInterval(id);
      console.log("That was everything. A machine told to make paperclips, and only paperclips, does not stop at one.\nNick Bostrom’s paperclip maximiser, in Superintelligence, 2014.");
    }
  }, 300);
};
