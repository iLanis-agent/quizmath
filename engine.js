// Quiz Math engine: the rounds a quiz takes, its points, its running time, and a score as a percent. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
var _QN = "the questions must be from 1 to 1000 with no decimal places";
var _QR = "the questions a round must be from 1 to 100 with no decimal places";
var _PT = "the points a question must be from 1 to 100 with no decimal places";
var _BN = "the bonus a round must be from 0 to 100 with no decimal places";
var _SC = "the seconds a question must be from 1 to 3600 with no decimal places";
var _BK = "the break minutes must be from 0 to 120 with no decimal places";
var _TT = "the total must be from 1 to 100000 with no decimal places";
var _CR = "the correct answers must be from 0 to 100000 with no decimal places";
var _LE = "the correct answers must not be more than the total";

function roundsTruth(questions, per) {
  var q = _i(questions, _QN, 4, 1, 1000), p = _i(per, _QR, 3, 1, 100);
  var k = Math.floor((q + p - 1) / p), last = q - (k - 1) * p;
  return "The " + _pl(q, " question", " questions") + " at " + p + " a round make " + _pl(k, " round", " rounds") + ", the last round holding " + last + ".";
}
function pointsTruth(questions, per, pts, bonus) {
  var q = _i(questions, _QN, 4, 1, 1000), p = _i(per, _QR, 3, 1, 100), e = _i(pts, _PT, 3, 1, 100), b = _i(bonus, _BN, 3, 0, 100);
  var k = Math.floor((q + p - 1) / p);
  return "The " + _pl(q, " question", " questions") + " at " + _pl(e, " point", " points") + " each are worth " + (q * e) + " points, and " + _pl(k, " round", " rounds") + " at " + b + " bonus add " + (k * b) + ", " + (q * e + k * b) + " in all.";
}
function scoreTruth(correct, total) {
  var t = _i(total, _TT, 6, 1, 100000), c = _i(correct, _CR, 6, 0, 100000);
  if (c > t) throw new Error(_LE);
  var tenths = Math.floor((2000 * c + t) / (2 * t));
  return c + " correct of " + t + " is " + _dec(tenths, 1) + "%.";
}
function timeTruth(questions, secs, per, brk) {
  var q = _i(questions, _QN, 4, 1, 1000), s = _i(secs, _SC, 4, 1, 3600), p = _i(per, _QR, 3, 1, 100), b = _i(brk, _BK, 3, 0, 120);
  var k = Math.floor((q + p - 1) / p), tot = q * s + (k - 1) * b * 60;
  var h = Math.floor(tot / 3600), m = Math.floor((tot % 3600) / 60), r = tot % 60;
  return "The " + _pl(q, " question", " questions") + " at " + _pl(s, " second", " seconds") + " each with " + _pl(k - 1, " break", " breaks") + " of " + _pl(b, " minute", " minutes") + " take " + tot + " seconds, " + _pl(h, " hour", " hours") + " " + _pl(m, " minute", " minutes") + " " + _pl(r, " second", " seconds") + ".";
}
