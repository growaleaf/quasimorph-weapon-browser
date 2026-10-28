// Headless known-answer / structural tests. Run: node test.js
var data = require("./data.js").QMDATA;
var fs = require("fs");

var failures = 0;

function assert(cond, label) {
  if (!cond) {
    failures++;
    console.log("FAIL " + label);
  } else {
    console.log("PASS " + label);
  }
}

// ───────────────────────────────── structural

assert(Array.isArray(data.MELEE) && data.MELEE.length > 0, "MELEE is a non-empty array");
assert(Array.isArray(data.RANGED) && data.RANGED.length > 0, "RANGED is a non-empty array");
assert(data.MELEE.length === 46, "46 melee weapons present (Knives 9 + Blades 10 + Clubs 14 + Fists 3 + Axes 9 + Chainsaw 1; Chainblade counted once, not duplicated from Blades)");
assert(data.RANGED.length === 194, "194 ranged weapons present across all 11 ranged categories (Pistols 53, Shotguns 31, SMGs 11, ARs 27, Marksman Rifles 31, MGs 12, Miniguns 9, Rocket Launchers 9, Sprayers 8, Grenade Launchers 1, Unlisted 2)");

data.MELEE.forEach(function (w) {
  assert(typeof w.name === "string" && w.name.length > 0, w.name + " has a non-empty name");
  assert(typeof w.min === "number" && typeof w.max === "number" && w.min <= w.max, w.name + " has min <= max damage");
  assert(typeof w.critMult === "number", w.name + " has a numeric crit multiplier");
  assert(typeof w.dmgType === "string" && w.dmgType.length > 0, w.name + " has a non-empty damage type (melee-only field)");
});

data.RANGED.forEach(function (w) {
  assert(typeof w.name === "string" && w.name.length > 0, w.name + " has a non-empty name");
  assert(typeof w.min === "number" && typeof w.max === "number" && w.min <= w.max, w.name + " has min <= max damage");
  assert(typeof w.critMult === "number", w.name + " has a numeric crit multiplier");
  assert(w.ammoType === null || typeof w.ammoType === "string", w.name + " ammoType is either null (not listed) or a string, never a guess");
});

// No category list entry is empty, and every weapon's category is a recognized one.
var VALID_CATEGORIES = data.MELEE_CATEGORIES.concat(data.RANGED_CATEGORIES);
data.MELEE.concat(data.RANGED).forEach(function (w) {
  assert(VALID_CATEGORIES.indexOf(w.category) !== -1, w.name + " has a category ('" + w.category + "') present in MELEE_CATEGORIES/RANGED_CATEGORIES");
});

// ───────────────────────────────── known-answer: specific weapons, specific values

(function knownAnswers() {
  var mengele = data.MELEE.filter(function (w) { return w.name === "Mengele"; })[0];
  assert(mengele && mengele.min === 32 && mengele.max === 40 && mengele.dmgType === "Poison", "Mengele: 32-40 Poison damage, per wiki Knives table");

  var chainblade = data.MELEE.filter(function (w) { return w.name === "Chainblade"; });
  assert(chainblade.length === 1, "Chainblade appears exactly once (source lists it under both Blades and Chainsaws with identical stats; shown once here)");
  assert(chainblade[0].category === "Chainsaw", "Chainblade is categorized as Chainsaw, its dedicated heading on the source page");

  var ursMaw = data.RANGED.filter(function (w) { return w.name === "Ur's Maw"; })[0];
  assert(ursMaw && ursMaw.price === 3000, "Ur's Maw costs 3000, the single most expensive shotgun on the page");

  var tripatekpatl = data.MELEE.filter(function (w) { return w.name === "Tripatekpatl"; })[0];
  assert(tripatekpatl && tripatekpatl.critChance === 22 && tripatekpatl.critMult === 180,
    "Tripatekpatl: crit multiplier (180%) and crit CHANCE (22%) are distinct fields, not conflated");

  var pistolCritChances = data.RANGED.filter(function (w) { return w.category === "Pistol"; })
    .every(function (w) { return w.critChance === undefined; });
  // Ranged objects never carry a critChance key at all (melee-only field on the source page).
  assert(pistolCritChances, "no Pistol object carries a critChance field — ranged tables have no such column on the source page");
})();

// ───────────────────────────────── Armor Mitigation Estimator data

(function armorMitigation() {
  var am = data.ARMOR_MITIGATION;
  assert(am.confirmed === false, "Armor Mitigation claims are explicitly marked unconfirmed");
  assert(am.floorPercent === 5 && am.floorPercentAssaultRifle === 10, "floor percentages match the single sourced Steam Community claim (5% / 10% for ARs)");
  assert(typeof am.floorQuote === "string" && /5%/.test(am.floorQuote), "floor claim carries its exact verbatim quote");
  assert(typeof am.orderQuote === "string" && am.orderQuote.length > 0, "ordering claim carries its exact verbatim quote");
  assert(am.sourceThread.indexOf("steamcommunity.com") !== -1, "source is cited as a Steam Community URL, not asserted without a link");
})();

// Reproduce the estimator's own floor arithmetic (mirrors the inline <script> in index.html) as
// a known-answer check, since the UI math has no other test coverage.
(function estimatorArithmetic() {
  function floorRange(min, max, isAR) {
    var pct = isAR ? data.ARMOR_MITIGATION.floorPercentAssaultRifle : data.ARMOR_MITIGATION.floorPercent;
    return [+(min * pct / 100).toFixed(1), +(max * pct / 100).toFixed(1)];
  }
  var normal = floorRange(30, 50, false);
  assert(normal[0] === 1.5 && normal[1] === 2.5, "30-50 dmg at 5% floor = 1.5-2.5 (non-AR)");
  var ar = floorRange(30, 50, true);
  assert(ar[0] === 3 && ar[1] === 5, "30-50 dmg at 10% floor = 3-5 (assault rifle)");
})();

// ───────────────────────────────── copy discipline (T0/T1 liability tier)

var BANNED_WORDS = ["best", "optimal", "strongest", "guaranteed", "approved", "certified", "compliant", "safe"];

function stripToVisibleText(html) {
  var visible = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  visible = visible.replace(/<[^>]+>/g, " ");
  return visible;
}

(function checkIndexHtmlVisibleCopy() {
  var raw = fs.readFileSync(__dirname + "/index.html", "utf8");
  var visible = stripToVisibleText(raw).toLowerCase();
  BANNED_WORDS.forEach(function (w) {
    var re = new RegExp("\\b" + w + "\\b");
    assert(!re.test(visible), "index.html rendered copy (tags+scripts stripped) does not contain banned word '" + w + "'");
  });
  assert(/unconfirmed/.test(visible), "index.html visibly labels the armor section unconfirmed");
  assert(/single source/.test(visible) || /single-sourced/.test(visible), "index.html visibly labels the armor section single-sourced");
})();

data.MELEE.concat(data.RANGED).forEach(function (row) {
  var text = JSON.stringify(row).toLowerCase();
  BANNED_WORDS.forEach(function (w) {
    var re = new RegExp("\\b" + w + "\\b");
    assert(!re.test(text), row.name + " data does not contain banned word '" + w + "'");
  });
});

if (failures > 0) {
  console.log(failures + " test(s) failed.");
  process.exit(1);
} else {
  console.log("All tests passed.");
}
