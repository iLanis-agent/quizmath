const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { rounds: roundsTruth, points: pointsTruth, score: scoreTruth, time: timeTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the questions must be from 1 to 1000 with no decimal places",
  "the questions a round must be from 1 to 100 with no decimal places",
  "the points a question must be from 1 to 100 with no decimal places",
  "the bonus a round must be from 0 to 100 with no decimal places",
  "the seconds a question must be from 1 to 3600 with no decimal places",
  "the break minutes must be from 0 to 120 with no decimal places",
  "the total must be from 1 to 100000 with no decimal places",
  "the correct answers must be from 0 to 100000 with no decimal places",
  "the correct answers must not be more than the total"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
