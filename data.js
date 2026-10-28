// Quasimorph weapon data, transcribed directly from https://quasimorph.wiki.gg/wiki/Weapons
// fetched 2026-10-28. Every row below maps 1:1 to a row of that page's category tables.
// Field order is positional (see m() and r() below) to mirror the source table's own columns,
// not reshuffled into a different schema.
//
// AMMO CODES (as the source page defines them, collapsed to one display string per family):
//   Nails, Shells, .42, 9mm, 7.97, 12.7, Battery, Igvas, Chemtrail, Disc, Gasoline, Flies, Missile, Grenade
//
// null means the source page itself has no value for that cell (shown as "—" or "n/l" on the
// page) — it is never a guess filling a gap.

(function (global) {
  "use strict";

  // Melee row: [name, min, max, critMult, critChance, dmgType, accuracy, knockback, condition, effect, weight, price]
  function m(category, row) {
    return {
      name: row[0], category: category, min: row[1], max: row[2],
      critMult: row[3], critChance: row[4], dmgType: row[5],
      accuracy: row[6], knockback: row[7], condition: row[8],
      effect: row[9], weight: row[10], price: row[11],
    };
  }

  // Ranged row: [name, min, max, critMult, range, ammoType, ammoCap, reload, accuracy, scatter, condition, effect, weight, price]
  function r(category, row) {
    return {
      name: row[0], category: category, min: row[1], max: row[2],
      critMult: row[3], range: row[4], ammoType: row[5], ammoCap: row[6],
      reload: row[7], accuracy: row[8], scatter: row[9], condition: row[10],
      effect: row[11], weight: row[12], price: row[13],
    };
  }

  var KNIVES = [
    ["Mengele", 32, 40, 190, 20, "Poison", 75, 0, 60, "Wounding; Throwable (range 4)", 0.5, 375],
    ["Digital Knife", 22, 32, 190, 6, "Shock", 75, 0, 0, "Accurate Throw; Critical Throw; Throwable (range 4)", 0.4, 150],
    ["Claw", 20, 25, 200, 15, "Piercing", 75, 0, 80, "Accurate Throw; Backstab; Throwable (range 4)", 0.3, 100],
    ["Elite Knife", 33, 37, 180, 15, "Piercing", 80, 0, 90, "Accurate Throw; Critical Throw; Throwable (range 4)", 0.3, 250],
    ["Shiv", 29, 33, 230, 15, "Piercing", 70, 0, 70, "Backstab; Critical Throw; Throwable (range 4)", 0.4, 100],
    ["Glass Shank", 24, 30, 220, 40, "Piercing", 75, 0, 30, "Backstab; Throwable (range 4); Unrepairable", 0.1, 40],
    ["Tecpatl", 28, 34, 230, 40, "Piercing", 80, 0, 50, "Accurate Throw; Backstab; Throwable (range 4)", 0.2, 250],
    ["Big Bone", 19, 27, 200, 15, "Piercing", 70, 0, 15, "Fragile; Throwable (range 4)", 0.7, 100],
    ["Spider Claw", 25, 31, 190, 8, "Poison", 75, 0, 40, "Wounding; Throwable (range 4); Unrepairable", 0.5, 300],
  ].map(function (row) { return m("Knife", row); });

  var BLADES = [
    ["Starwalker", 35, 42, 185, 13, "Radiation", 15, 0, 75, "Amputates When Injured; Unwieldy; Cannot be thrown", 1.2, 450],
    ["Blade-23", 18, 24, 165, 6, "Mode 1: Lacerating; Mode 2: Piercing", 35, 0, null, "Amputates When Injured; Wounding (mode 1)", null, null],
    ["Han Dao", 26, 30, 180, 6, "Mode 1: Lacerating; Mode 2: Piercing", 20, 0, 80, "Amputates When Injured; Cannot be thrown", 1, 100],
    ["Starblade", 92, 117, 185, 13, "Radiation", 30, 0, 90, "Amputates When Injured; Cleave; Cannot be thrown", 1.6, 825],
    ["Hinjal", 22, 30, 170, 6, "Mode 1: Lacerating; Mode 2: Piercing", 30, 0, 90, "Amputates When Injured; Critical Throw; Wounding (mode 1); Throwable (range 3)", 0.6, 300],
    ["Machete", 27, 35, 185, 12, "Cut", 15, 0, 70, "Amputates When Injured; Unwieldy; Wounding; Cannot be thrown", 0.9, 75],
    ["Razor", 36, 48, 170, 10, "Cut / Pierce", 20, 0, 80, "Amputates When Injured; Cannot be thrown", 0.8, 450],
    ["Dhulfaqar", 53, 66, 185, 12, "Cut", 35, 0, 90, "Amputates When Injured; Wounding; Cannot be thrown", 1, 400],
    ["Reaper", 35, 43, 175, 6, "Mode 1: Lacerating; Mode 2: Piercing", 25, 0, 150, "Amputates When Injured; Backstab; Wounding (mode 1); Cannot be thrown; Unrepairable", 0.7, 375],
    ["Duggur's Saber", 98, 117, 190, 12, "Cut", 30, 0, 100, "Amputates When Injured; Unwieldy; Wounding; Cannot be thrown", 2.1, 600],
  ].map(function (row) { return m("Blade", row); });

  var CLUBS = [
    ["Digital Staff", 34, 42, 165, 3, "Shock", 55, 70, 0, "Add. Knockback Range; Knockdown (Heavy); Knockback (Heavy); Cannot be thrown", 1.1, 150],
    ["Lead Bull", 78, 92, 160, 16, "Blunt", 45, 70, 150, "Heavy Weapon; Knockdown (Heavy); Knockback (Heavy); Cannot be thrown", 2, 375],
    ["Archpriest", 65, 78, 165, 16, "Fire", 50, 0, 85, "Incendiary (Heavy); Knockdown (Heavy); Throwable (range 3)", 1.3, 450],
    ["Quauhololli", 39, 48, 170, 16, "Blunt", 55, 0, 30, "Knockdown (Heavy); Throwable (range 3)", 1.1, 150],
    ["Metal Pipe", 34, 42, 165, 16, "Blunt", 50, 70, 45, "Knockback (Heavy); Knockdown (Heavy); Unwieldy; Throwable (range 3)", 1.1, 75],
    ["Hierarch", 29, 38, 165, 16, "Blunt", 55, 0, 55, "Backstab; Knockdown (Heavy); Throwable (range 3)", 0.8, 100],
    ["Macuahuitl", 50, 62, 175, 16, "Blunt", 50, 70, 85, "Add. Knockback Range; Knockdown (Heavy); Knockback (Heavy); Throwable (range 3)", 1.4, 550],
    ["Arm", 39, 50, 150, 3, "Blunt", 20, 0, 60, "Throwable (range 4)", 2, 10],
    ["Leg", 39, 53, 150, 3, "Blunt", 20, 0, 60, "Throwable (range 4); Unrepairable", 2.5, 10],
    ["Crusher", 50, 63, 165, 9, "Blunt", 50, 70, 65, "Knockdown (Heavy); Knockback (Heavy); Armor Penetration; Cannot be thrown", 1.3, 150],
    ["Crowbar", 35, 43, 170, 16, "Blunt", 55, 0, 85, "Knockdown (Heavy); Throwable (range 3)", 1, 100],
    ["Wrench", 41, 49, 170, 16, "Blunt", 50, 70, 75, "Add. Knockback Range; Knockdown (Heavy); Knockback (Heavy); Throwable (range 3)", 1.1, 150],
    ["Zeus", 48, 61, 165, 20, "Shock", 55, 70, 55, "Knockback (Heavy); Throwable (range 3)", 0.9, 150],
    ["Duggur's Morningstar", 35, 46, 175, 16, "Blunt", 60, 70, 105, "Knockdown (Heavy); Knockback (Heavy); Cannot be thrown", 1.5, 375],
  ].map(function (row) { return m("Club", row); });

  var FISTS = [
    ["Tripatekpatl", 39, 48, 180, 22, "Piercing", 60, 0, 65, null, 0.6, 450],
    ["Knuckles", 28, 36, 170, 16, "Blunt", 45, 0, 65, null, 0.4, 100],
    ["Hangover", 63, 77, 170, 9, "Blunt", 55, 0, 70, null, 0.9, 375],
  ].map(function (row) { return m("Fist", row); });

  var AXES = [
    ["Vorpal Ax", 58, 67, 185, 18, "Lacerating", 50, 0, null, null, 0.8, 225],
    ["Tepoztli (Axe)", 68, 78, 175, 9, "Cut", 35, 0, null, null, 1.1, 375],
    ["Saw Blade Bat", 48, 59, 170, 18, "Cut", 35, 0, null, null, 0.9, 75],
    ["Varangian", 62, 73, 175, 9, "Cut", 30, 0, null, null, 0.8, 150],
    ["Choppa", 73, 83, 180, 9, "Cut", 25, 0, null, null, 1.3, 150],
    ["Hawk", 69, 79, 175, 18, "Cut", 35, 0, null, null, 0.9, 275],
    ["MPL-95", 53, 62, 165, 16, "Blunt", 45, 70, null, null, 1.3, 225],
    ["Rough Cleaver", 66, 77, 170, 9, "Cut", 25, 0, null, null, 1.1, 75],
    ["Tepoztli (Halberd)", 82, 91, 180, 9, "Cut", 40, 0, null, null, 1.6, 650],
  ].map(function (row) { return m("Axe", row); });

  var CHAINSAWS = [
    // The source page lists Chainblade once under "Blades" and again under its own "Chainsaws"
    // heading with identical stats. Shown once here, under its dedicated category, to avoid a
    // literal duplicate row in a sortable table — see README.md.
    ["Chainblade", 38, 53, 185, 8, "Cut", 10, 0, 60, "Amputates When Injured; Wounding; Cannot be thrown", 1.3, 225],
  ].map(function (row) { return m("Chainsaw", row); });

  var MELEE = KNIVES.concat(BLADES, CLUBS, FISTS, AXES, CHAINSAWS);

  var PISTOLS = [
    ["Nail Gun", 10, 24, 130, 3, "Nails", 40, 3, 41, 5.4, 240, "Backup Gun", 0.61, 75],
    ["Starlock 2", 26, 34, 155, 4, "Shells", 6, 1, 57, 3.4, 100, "Backup Gun; Single Load", 0.24, 50],
    ["Starlock MD-6", 30, 46, 170, 4, "Shells", 8, 1, 53, 3.9, 100, "Backup Gun; Single Load", 0.81, 100],
    ["Starlock ADP", 51, 64, 145, 4, "Shells", 9, 3, 41, 3.7, 80, "Backup Gun; Collimator", 1.1, 175],
    ["Ripper", 58, 68, 155, 4, "Shells", 9, 3, 44, 3.1, 70, "Backup Gun; Collimator", 1.28, 225],
    ["Eagle", 19, 23, 160, 4, ".42", 8, 2, 58, 2.4, 50, "Backup Gun", 0.15, 75],
    ["Silent Eagle", 18, 22, 180, 4, ".42", 8, 2, 64, 2.4, 50, "Backup Gun; Silencer", 0.15, 75],
    ["Eagle ST-13", 19, 27, 165, 4, ".42", 24, 3, 54, 4, 160, "Backup Gun", 0.58, 175],
    ["Westside", 14, 27, 150, 4, "9mm", 30, 3, 45, 4.7, 300, "Painful Crits; Silencer", 0.47, 125],
    ["Man-Of-War", 49, 69, 165, 4, "12.7", 6, 3, 42, 4, 100, "Pierce Through (Full); Collimator; Unwieldy", 0.92, 200],
    ["Hydra-12", 16, 24, 150, 4, "9mm", 17, 3, 52, 3.6, 150, "Backup Gun", 0.32, 75],
    ["Hydra-24", 23, 29, 160, 4, "9mm", 17, 3, 51, 3.4, 130, "Backup Gun; Laser Sight", 0.57, 125],
    ["Hydra-33S", 29, 38, 140, 4, "9mm", 19, 3, 39, 4.4, 150, "Backup Gun; Collimator", 0.62, 150],
    ["Sharvara", 30, 39, 175, 4, "9mm", 24, 3, 53, 3.8, 150, "Laser Sight; Collimator", 1.12, 275],
    ["Liberator", 24, 32, 175, 4, "7.97", 6, 1, 54, 2.8, 140, "Backup Gun; Single Load", 0.5, 100],
    ["Liberator M", 29, 37, 175, 5, "7.97", 6, 1, 50, 3.2, 140, "Pierce Through; Single Load", 0.78, 125],
    ["Redeemer", 37, 46, 200, 5, "7.97", 6, 1, 52, 3.6, 140, "Pierce Through; Laser Sight; Single Load", 0.99, 200],
    ["Law", 59, 72, 210, 5, "12.7", 4, 1, 62, 2.5, 100, "Pierce Through (Full); Laser Sight; Single Load", 1.12, 400],
    ["Order", 55, 62, 165, 5, "7.97", 8, 3, 44, 3.1, 110, "Pierce Through; Laser Sight", 1.27, 325],
    ["Enigma-PT", 20, 20, 160, 5, null, null, null, 49, 2.8, 50, "Backup Gun; Silencer", 0.41, 100],
    ["Enigma", 27, 27, 175, 5, null, null, null, 45, 3.3, 70, "Silencer; Pierce Through", 1.46, 200],
    ["Enigma-M2", 38, 38, 160, 5, null, null, null, 36, 3.7, 70, "Silencer; Pierce Through", 1.83, 325],
    ["Flash", 21, 24, 175, 4, "Battery", 12, 3, 59, 2.4, 60, "Backup Gun", 0.28, 100],
    ["Flash-M", 27, 34, 200, 4, "Battery", 16, 4, 51, 3.3, 100, "Backup Gun", 1.14, 200],
    ["Divider", 42, 48, 240, 5, "Battery", 5, 4, 53, 2.5, 75, "Backup Gun; Corrosive", 1.1, 425],
    ["Galand", 19, 24, 160, 4, "9mm", 9, 2, 58, 2.4, 60, "Backup Gun", 0.14, 50],
    ["Galand NOVO", 19, 24, 180, 4, "9mm", 7, 2, 64, 2.4, 60, "Backup Gun; Collimator; Silencer", 0.14, 75],
    ["Galand ULTIM", 21, 25, 190, 4, "9mm", 7, 2, 67, 1.8, 50, "Collimator; Laser Sight; Silencer", 0.16, 100],
    ["Scorpion", 25, 40, 145, 4, "9mm", 30, 3, 42, 5, 195, "Backup Gun", 0.68, 125],
    ["Cricket", 17, 26, 155, 4, "9mm", 16, 2, 56, 3, 100, "Backup Gun", 0.15, 50],
    ["Prometheus", 41, 54, 160, 4, "Battery", 8, 4, 45, 3.3, 130, "Overheating; Overclocking", 1.29, 250],
    ["Branded Nail Gun", 19, 28, 130, 3, "Nails", 40, 3, 39, 4.9, 160, "Backup Gun", 0.78, 125],
    ["Hren", 26, 40, 150, 4, "9mm", 8, 3, 42, 3.5, 160, "Backup Gun", 0.71, 200],
    ["Sterling A2L4", 29, 42, 140, 4, "9mm", 20, 3, 37, 5, 300, "Backup Gun", 0.94, 300],
    ["Woodcock ANCM", 27, 34, 210, 4, ".42", 9, 2, 50, 3.3, 90, "Backup Gun; Silencer", 0.8, 150],
    ["ASP-Wader", 35, 40, 225, 4, ".42", 9, 2, 53, 2.7, 80, "Backup Gun; Collimator; Silencer", 0.93, 250],
    ["AEP-Alpha", 38, 48, 200, 4, "Igvas", 5, 3, 58, 2.7, 80, "Backup Gun; Pierce Through", 1.18, 575],
    ["Silver-SEP", 24, 24, 165, 4, null, null, null, 52, 3.5, 100, "Silencer; Pierce Through", 1.52, 225],
    ["Spit", 16, 24, 245, 5, "Chemtrail", 10, 3, 56, 3.1, 80, "Silencer", 1.11, 100],
    ["Hel Trinity", 21, 26, 170, 5, "Battery", 9, 3, 60, 2, 50, "Backup Gun", 0.33, 225],
    ["Moneykeeper", 29, 38, 225, 5, ".42", 10, 1, 57, 3.9, 220, "Pierce Through; Single Load", 1.1, 200],
    ["String-21M", 19, 24, 190, 4, "Battery", 6, 3, 64, 2.9, 50, "Backup Gun; Pierce Through", 0.26, 150],
    ["Whiteout", 13, 23, 160, 4, "Battery", 10, 3, 56, 3.5, 70, "Backup Gun; Pierce Through", 0.27, 275],
    ["Le MAF 2150", 23, 27, 150, 4, ".42", 10, 3, 54, 2.8, 75, "Backup Gun", 0.29, 100],
    ["Le MAF 2199", 43, 55, 155, 4, "9mm", 8, 3, 44, 4.3, 140, "Backup Gun", 1.05, 250],
    ["Tremor", 1, 50, 130, 4, "Battery", 15, 4, 40, 4, 160, "Backup Gun; Pierce Through", 0.87, 275],
    ["Type 77", 35, 41, 140, 4, "9mm", 24, 3, 42, 3.8, 150, "Backup Gun", 0.87, 275],
    ["Type 88S", 30, 37, 165, 4, "9mm", 15, 3, 57, 3.4, 140, "Backup Gun; Collimator", 0.81, 400],
    ["Sharen", 28, 42, 155, 5, "Disc", 1, 1, 50, 4.6, 80, "Single Load", 1.33, 125],
    ["VoltGuard", 1, 56, 140, 4, "Battery", 1, 1, 44, 3.4, 60, "Backup Gun; Single Load", 0.34, 200],
    ["Digital Thrower", 19, 26, 155, 5, "Disc", 1, 3, 59, 2.8, 50, "Pierce Through; Self-charging", 0.36, 75],
    ["Igvas-Spitter", 23, 34, 140, 4, "Igvas", 12, 2, 53, 3.8, 90, "Backup Gun", 0.48, 150],
    ["Beak", 41, 49, 175, 3, null, null, null, 52, 3.1, 0, "Marking", 1.69, 325],
  ].map(function (row) { return r("Pistol", row); });

  var SHOTGUNS = [
    ["Düd-Kha", 50, 67, 160, 5, null, null, null, 23, 4.6, 140, null, 4.52, 725],
    ["Border Chief", 47, 79, 175, 5, "Shells", 8, 1, 44, 1.7, 60, "Collimator; Single Load", 2.75, 400],
    ["Cutter", 26, 62, 140, 5, "Disc", 6, 4, 30, 4.3, 60, "Pierce Through", 2.65, 150],
    ["Taiga M", 36, 63, 165, 4, "Shells", 10, 4, 41, 3, 70, null, 2.25, 150],
    ["Taiga ANCM", 47, 72, 160, 4, "Shells", 24, 4, 39, 2.4, 70, "Add. Knockback Range", 2.75, 300],
    ["Jeffhammer", 19, 56, 165, 4, "Shells", 14, 5, 30, 4.4, 200, null, 1.68, 175],
    ["Jeffhammer MD", 34, 69, 165, 5, "Shells", 14, 5, 26, 4.8, 160, null, 2.73, 250],
    ["Jhammer-C22", 47, 73, 200, 5, "Shells", 14, 5, 31, 4.6, 140, "Collimator", 3.67, 350],
    ["Border FN-4", 25, 67, 155, 5, "Shells", 6, 1, 43, 2.5, 75, "Single Load", 1.25, 150],
    ["Border Mark-2", 41, 76, 165, 5, "Shells", 8, 1, 41, 2.3, 60, "Laser Sight; Single Load", 2.26, 225],
    ["Hammer Driver", 33, 66, 160, 3, "Nails", 40, 4, 30, 4, 110, "Laser Sight; Knockback", 2.88, 350],
    ["Discharger", 46, 65, 170, 3, "Battery", 12, 5, 35, 2.8, 120, "Overheating; Overclocking", 3.29, 325],
    ["Heretic", 38, 74, 195, 4, "Shells", 2, 1, 51, 4.1, 105, "Add. Knockback Range; Single Load", 2.16, 200],
    ["Wreck", 27, 68, 155, 4, "Shells", 9, 1, 27, 3, 75, "Single Load", 1.21, 75],
    ["Verdict", 77, 109, 140, 4, "Shells", 9, 5, 26, 2.7, 60, "Add. Knockback Range", 2.76, 350],
    ["Anathema", 54, 86, 155, 5, "Shells", 20, 5, 20, 4.6, 165, "Add. Knockback Range; Laser Sight", 3.86, 575],
    ["Raptor ANCM", 18, 71, 175, 4, "Shells", 24, 4, 24, 5.4, 250, null, 1.97, 300],
    ["AAD-Barracuda", 45, 72, 190, 4, "Shells", 8, 4, 45, 2.6, 60, "Collimator", 1.33, 500],
    ["Silver-SED", 32, 32, 185, 3, null, null, null, 48, 1.7, 60, "Silencer; Pierce Through", 2, 375],
    ["Supernova-7K", 39, 55, 180, 4, "Battery", 20, 6, 22, 5, 190, null, 3.71, 575],
    ["Vintage SEVEN14", 52, 84, 160, 5, "Shells", 6, 1, 35, 3.8, 100, "Single Load", 1.98, 300],
    ["Aspid", 45, 63, 175, 4, "Chemtrail", 15, 5, 21, 2.5, 50, "Silencer", 2.19, 375],
    ["Scadi", 41, 57, 175, 4, "Battery", 8, 5, 42, 2.2, 50, null, 2.34, 700],
    ["Desolation", 27, 54, 140, 3, "Gasoline", 16, 5, 35, 2.6, 185, null, 1.98, 275],
    ["Longhu", 37, 76, 160, 4, "Shells", 16, 1, 31, 2.7, 70, "Single Load", 2.55, 200],
    ["R.O.A.R.", 24, 57, 170, 3, null, null, null, 23, 5.8, 250, "Suppressive Fire", 2.29, 550],
    ["King Ion Discharger", 54, 70, 190, 5, null, null, null, 40, 8, 80, "Backup Gun", 2.46, 625],
    ["GKA-2", 23, 65, 150, 4, "Igvas", 15, 5, 26, 4.8, 200, null, 3.7, 575],
    ["Sa'id al-Qaysar", 34, 64, 155, 4, "Igvas", 3, 1, 43, 4.3, 150, "Single Load; Pierce Through (Full)", 2.19, 325],
    ["Meat Grinder", 46, 80, 140, 5, "Disc", 10, 4, 26, 4.7, 60, "Amputates When Injured; Pierce Through", 4, 375],
    ["Ur's Maw", 52, 108, 150, 4, null, null, null, 35, 8.5, 0, "Pierce Through", 3.32, 3000],
  ].map(function (row) { return r("Shotgun", row); });

  var SMGS = [
    ["Pale Sign", 21, 35, 150, 4, "Battery", 15, 3, 46, 5.1, 135, "Painful Crits; Pierce Through; Laser Sight", 1.05, 600],
    ["Broadcaster", 29, 42, 170, 4, "9mm", 20, 3, 34, 2.6, 180, "Painful Crits; Laser Sight", 1.9, 475],
    ["Silver-SEPp", 28, 28, 230, 4, null, null, null, 52, 1.4, 85, "Painful Crits; Pierce Through; Silencer", 3.67, 450],
    ["A.R.C.", 1, 42, 220, 4, "Battery", 16, 3, 27, 1.9, 95, "Painful Crits; Collimator", 1.22, 325],
    ["Bistrophe-93", 26, 36, 170, 4, "Battery", 24, 5, 34, 2.4, 185, "Painful Crits; Collimator", 3.23, 950],
    ["Breakpoint", 18, 25, 200, 4, "Battery", 28, 3, 34, 2.5, 140, "Painful Crits", 1.87, 725],
    ["Sterling Mk-16", 33, 42, 200, 4, "9mm", 24, 4, 42, 1.7, 130, "Painful Crits; Silencer", 2.69, 450],
    ["Teibi t94", 40, 54, 165, 4, "12.7", 16, 4, 44, 0.9, 85, "Painful Crits; Pierce Through", 1.79, 375],
    ["Xunlei t100", 36, 52, 205, 4, "12.7", 16, 3, 40, 1.7, 100, "Painful Crits; Pierce Through; Optical Sight", 2.98, 550],
    ["Herald of the Flies", 27, 42, 180, 4, "Flies", 32, 6, 39, 2.9, 200, "Painful Crits; Self-charging; Corrosive", 3.02, 350],
    ["Genie's Hand", 33, 38, 195, 5, null, null, null, 49, 0.7, 0, "Painful Crits; Pierce Through (Full)", 3.68, 100],
  ].map(function (row) { return r("SMG", row); });

  var ASSAULT_RIFLES = [
    ["Forge-furnace", 47, 78, 185, 3, "Gasoline", 20, 6, 56, 3.3, 75, "Overclocking; Overheating", 8.84, 675],
    ["SR-78", 31, 45, 180, 5, "7.97", 24, 5, 56, 2.7, 60, "Collimator", 3, 225],
    ["Punishment", 27, 48, 185, 5, "7.97", 36, 6, 25, 4.7, 225, "Collimator", 4.46, 350],
    ["Retribution", 30, 55, 200, 5, "7.97", 48, 6, 28, 4.1, 280, "Collimator", 5.81, 725],
    ["AZ-96", 23, 36, 180, 5, ".42", 30, 5, 53, 3.4, 100, null, 1.52, 125],
    ["AZ-120", 31, 42, 225, 5, "7.97", 24, 5, 45, 3.1, 120, null, 2.74, 425],
    ["Raider M16T", 33, 57, 180, 5, "7.97", 60, 6, 14, 5.2, 240, "Pierce Through; Bipod", 4.8, 500],
    ["Rogue AR", 18, 36, 170, 5, "7.97", 30, 5, 41, 3.2, 160, null, 2.24, 200],
    ["Red Outcast", 20, 55, 160, 5, "7.97", 60, 6, 21, 4.9, 300, "Laser Sight", 3.37, 300],
    ["Internationale AR", 42, 73, 155, 5, "7.97", 90, 6, 14, 4.7, 225, null, 4.92, 600],
    ["Apollo", 45, 60, 210, 5, "Battery", 15, 5, 65, 2.1, 80, "Overheating; Overclocking", 4, 575],
    ["Exorcist", 19, 40, 190, 5, "Battery", 32, 5, 44, 3.1, 150, "Pierce Through; Collimator", 3.55, 750],
    ["Wintermute", 17, 51, 175, 4, "Battery", 28, 5, 54, 3.8, 90, "Pierce Through; Optical Sight", 4.22, 975],
    ["FMAF 300", 47, 64, 150, 5, ".42", 36, 6, 19, 4.7, 270, "Suppressive Fire; Collimator", 4.63, 825],
    ["Kovrov 025MP", 31, 51, 200, 5, "7.97", 30, 5, 57, 3.4, 85, "Pierce Through", 3.57, 350],
    ["High Noon", 19, 54, 170, 4, ".42", 60, 6, 36, 4.7, 465, "Optical Sight", 3.51, 700],
    ["Torture", 27, 53, 140, 5, "7.97", 42, 5, 30, 4.2, 240, "Pierce Through", 4.1, 350],
    ["FrayVector", 37, 56, 185, 5, "Battery", 30, 6, 47, 3.4, 120, "Collimator", 5.24, 1250],
    ["A.P.O.K.", 24, 43, 170, 4, null, null, null, 44, 3.2, 155, "Suppressive Fire", 2.12, 750],
    ["Bicha-ku", 37, 68, 135, 5, "Battery", 36, 7, 16, 4.9, 570, "Overheating; Overclocking", 5.22, 850],
    ["Devourer", 44, 61, 160, 5, "Battery", 30, 5, 31, 3.4, 180, "Overheating; Overclocking", 5.62, 450],
    ["Penance", 47, 94, 150, 3, "Gasoline", 22, 6, 43, 3.9, 80, "Overheating; Overclocking", 5.9, 375],
    ["Kuangji", 33, 62, 145, 6, "Disc", 24, 5, 30, 4.7, 135, "Amputates When Injured; Pierce Through", 6.27, 575],
    ["Type-Leijing", 1, 78, 165, 4, "Battery", 40, 5, 24, 3.6, 160, "Optical Sight", 4.7, 1125],
    ["Lord of the Flies", 40, 73, 170, 5, "Flies", 42, 8, 35, 4.7, 355, "Suppressive Fire; Self-charging; Corrosive", 5.57, 875],
    ["Xiuhcoatl", 27, 51, 140, 5, "Igvas", 54, 6, 26, 4.9, 425, null, 5.49, 1225],
    ["Jahannam", 30, 50, 165, 6, "Igvas", 27, 4, 42, 3.2, 155, "Pierce Through (Full)", 4.78, 525],
  ].map(function (row) { return r("Assault Rifle", row); });

  var MARKSMAN_RIFLES = [
    ["Düd-Zer", 50, 63, 230, 6, null, null, null, 62, 2.5, 40, "Collimator; Pierce Through (Full)", 7.12, 325],
    ["Silver-SAR", 57, 57, 230, 7, null, null, null, 60, 1.3, 65, "Silencer; Pierce Through", 3.66, 1100],
    ["Wheel Of Pain", 35, 67, 135, 5, "Nails", 20, 4, 40, 3.6, 160, "Pierce Through", 3.13, 425],
    ["PV-277", 39, 48, 280, 6, "Battery", 12, 5, 66, 1.2, 75, "Collimator", 2.92, 475],
    ["Coil Tentacle", 1, 94, 200, 6, null, null, null, 50, 2.4, 0, "Pierce Through", 4.98, 625],
    ["Serpent's Mouth", 36, 79, 180, 4, "Igvas", 10, 4, 57, 3.2, 135, "Optical Sight; Bipod", 6.04, 700],
    ["Bishop", 47, 66, 195, 4, "7.97", 7, 1, 58, 2.4, 60, "Pierce Through; Optical Sight; Single Load", 3.84, 225],
    ["Archbishop", 68, 85, 210, 4, "7.97", 9, 5, 56, 2.2, 45, "Bipod; Pierce Through; Optical Sight", 5.49, 425],
    ["Vulture", 41, 71, 205, 4, "7.97", 20, 5, 45, 3.1, 65, "Pierce Through; Optical Sight", 5.75, 500],
    ["Hunter", 33, 55, 185, 6, "7.97", 2, 1, 50, 2.8, 110, "Pierce Through; Single Load", 1.95, 175],
    ["Hunter Rx", 47, 61, 215, 4, "7.97", 12, 1, 55, 1.6, 80, "Pierce Through; Optical Sight; Single Load", 2.66, 400],
    ["Prism", 56, 68, 285, 6, "Battery", 6, 6, 69, 1.5, 40, "Pierce Through (Full); Collimator", 6.12, 700],
    ["Nakhjir", 32, 62, 220, 4, ".42", 16, 5, 60, 2.2, 100, "Bipod; Optical Sight", 4.45, 450],
    ["Hurricane SCD", 41, 75, 175, 4, "9mm", 12, 1, 41, 3.2, 200, "Single Load; Optical Sight", 2.99, 575],
    ["AMW-Snow Wolf", 43, 57, 210, 6, ".42", 12, 5, 52, 1.6, 70, null, 3.82, 475],
    ["AEV-Supremacy", 66, 82, 275, 4, "Igvas", 6, 5, 74, 1.2, 45, "Bipod; Pierce Through; Optical Sight", 4.83, 1300],
    ["Harpy", 81, 91, 290, 7, "Battery", 8, 6, 63, 1, 50, "Corrosive", 3.71, 1125],
    ["Enigma Supreme", 64, 64, 185, 9, null, null, null, 46, 2.2, 40, "Silencer; Pierce Through; Heavy Weapon", 5.73, 600],
    ["Frontier", 29, 63, 185, 6, "7.97", 10, 5, 57, 3.1, 120, "Pierce Through; Collimator", 4.02, 325],
    ["Trigger Special", 67, 128, 220, 6, "12.7", 6, 5, 63, 2.7, 70, "Pierce Through (Full)", 4.77, 650],
    ["Thermostat", 49, 74, 220, 7, "Battery", 12, 6, 72, 1.9, 65, "Silencer; Pierce Through (Full)", 4.69, 1250],
    ["Enlightenment MK", 38, 61, 225, 4, "Battery", 10, 6, 56, 2.7, 65, "Pierce Through (Full); Optical Sight", 6.26, 425],
    ["Crusader", 32, 60, 215, 7, "Battery", 16, 6, 53, 2.5, 85, "Pierce Through (Full); Collimator", 7.8, 750],
    ["Hardcore", 57, 76, 165, 4, "7.97", 7, 1, 53, 2.4, 60, "Pierce Through; Optical Sight; Single Load", 3.94, 350],
    ["Absolution", 74, 97, 160, 4, "Gasoline", 5, 5, 53, 2.4, 95, "Pierce Through; Overheating; Overclocking; Optical Sight", 4.89, 800],
    ["Stormpiercer", 1, 76, 275, 4, "Battery", 8, 5, 55, 1.6, 65, "Pierce Through; Optical Sight", 4.71, 850],
    ["Atzumarka", 38, 56, 170, 6, "Nails", 1, 1, 75, 1.3, 55, "Silencer; Backstab", 2.7, 400],
    ["Crossbow", 63, 83, 165, 6, "Nails", 1, 1, 46, 2.5, 55, "Silencer; Pierce Through", 7.54, 500],
    ["Ash-Shamsa's Staff", 43, 63, 200, 7, "Igvas", 10, 4, 69, 1, 65, "Pierce Through (Full)", 3.84, 650],
    ["Tonalli Prism", 27, 93, 160, 30, null, null, null, 70, 2.5, 0, "Pierce Through (Full)", 5.06, 1000],
    ["LPS Whip", 48, 88, 175, 3, "Battery", 2, 6, 44, 4.3, 50, "Pierce Through (Full); Self-charging", 6.05, 550],
  ].map(function (row) { return r("Marksman Rifle", row); });

  var MACHINE_GUNS = [
    ["Emerald Hand", 16, 50, 150, 5, null, 0, 6, 28, 4.3, 0, null, 1, 75],
    ["Builder", 15, 45, 145, 5, "Nails", 80, 6, 3, 6.6, 560, null, 4.98, 250],
    ["Architect", 25, 54, 145, 5, "Nails", 120, 6, -1, 6.7, 560, "Collimator", 7.06, 500],
    ["Overman", 27, 57, 155, 5, "Nails", 160, 6, 1, 6.1, 520, "Suppressive Fire", 8.67, 850],
    ["Mini Pig", 30, 51, 215, 6, "7.97", 50, 6, 20, 4.8, 360, "Pierce Through; Suppressive Fire", 4.06, 675],
    ["Stoner 93", 39, 56, 170, 6, "9mm", 65, 6, 7, 4.2, 460, "Suppressive Fire", 3.32, 750],
    ["Legacy", 38, 61, 185, 6, "7.97", 80, 6, 6, 5.6, 400, "Pierce Through; Suppressive Fire", 5.2, 575],
    ["Mutilator X1", 41, 73, 155, 6, "7.97", 80, 6, 4, 6.2, 650, "Pierce Through; Suppressive Fire", 5.7, 900],
    ["CS M249", 38, 61, 230, 6, "7.97", 60, 6, 19, 4.6, 440, "Pierce Through; Bipod; Collimator", 6.76, 1025],
    ["Anvil M6", 62, 133, 195, 6, "12.7", 40, 7, 20, 5.5, 250, "Pierce Through (Full); Bipod", 6.62, 975],
    ["Itzpapalotl", 45, 72, 160, 6, "Igvas", 50, 6, 25, 5, 0, "Pierce Through (Full)", 6.18, 3000],
    ["Shar-ur", 40, 95, 150, 6, "Gasoline", 60, 7, 23, 5.4, 0, "Suppressive Fire", 8.3, 1500],
  ].map(function (row) { return r("Machine Gun", row); });

  var MINIGUNS = [
    ["Düd-Mda", 43, 59, 175, 6, null, null, null, 3, 7.8, 555, "Pierce Through; Ramp Up Shot", 7.62, 825],
    ["Kabid", 34, 59, 175, 7, "Igvas", 72, 7, 9, 7.1, 650, "Pierce Through (Full); Ramp Up Shot", 4.53, 1025],
    ["Volcano", 38, 58, 190, 6, "Battery", 80, 7, 7, 6.9, 830, "Overheating; Overclocking", 4.58, 925],
    ["Heatdeath", 15, 58, 180, 6, "Battery", 80, 7, -2, 8.7, 540, "Pierce Through", 6.75, 1400],
    ["Judge ABC", 24, 50, 175, 5, "7.97", 72, 7, 2, 8.1, 0, "Ramp Up Shot", 2.87, 325],
    ["Beast", 36, 72, 185, 6, "7.97", 120, 7, 0, 7.9, 780, "Pierce Through; Ramp Up Shot; Heavy Weapon", 6.29, 1050],
    ["Malice", 29, 55, 190, 6, "7.97", 96, 7, 10, 7.5, 780, "Pierce Through; Ramp Up Shot; Suppressive Fire", 4.42, 750],
    ["Crucifier", 29, 81, 155, 6, "Nails", 120, 7, -7, 8.8, 1000, "Ramp Up Shot; Bipod", 8.03, 1500],
    ["Thunderstorm", 1, 76, 180, 6, "Battery", 100, 7, -19, 8.9, 885, "Ramp Up Shot; Heavy Weapon", 5.19, 750],
  ].map(function (row) { return r("Minigun", row); });

  var ROCKET_LAUNCHERS = [
    ["Chelonopyre", 33, 89, 145, 6, null, null, null, 48, 4.4, 100, "Fragile; Bipod", 6.4, 625],
    ["Omega II", 20, 25, 210, 5, "Battery", 20, 5, 51, 5, 100, "Fragile; Explosive", 1.81, 450],
    ["H.F.C.", 65, 111, 205, 4, "Battery", 40, 7, 129, 1.4, 100, "Heavy Weapon; Fragile; Explosive", 6.17, 975],
    ["RPG-77", 41, 104, 165, 6, "Missile", 1, 3, 48, 3.6, 15, "Single Load", 4.09, 550],
    ["MRS-21", 53, 109, 190, 6, "Missile", 5, 5, 53, 2.4, 60, "Laser Sight; Heavy Weapon", 5.38, 800],
    ["Shachong", 57, 105, 165, 6, "Missile", 2, 3, 46, 3.4, 40, "Heavy Weapon; Single Load", 4.54, 725],
    ["Psychopomp", 66, 104, 215, 6, "Missile", 8, 5, 59, 2.6, 100, null, 4.84, 1000],
    ["Mictlaxotla", 64, 116, 160, 6, "Igvas", 10, 4, 50, 4, 35, "Heavy Weapon; Explosive", 5.97, 975],
    ["Ninurtagun", 51, 133, 155, 6, "Gasoline", 40, 5, 48, 4.6, 0, "Explosive", 5.63, 1375],
  ].map(function (row) { return r("Rocket Launcher", row); });

  var SPRAYERS = [
    ["Mardukan", 30, 47, 140, 4, "Gasoline", 50, 3, 110, 5, 100, null, 3.92, 400],
    ["Firefly", 18, 28, 140, 3, "Gasoline", 10, 3, 58, 4.3, 20, "Backup Gun", 1.27, 100],
    ["Gorgon", 59, 79, 165, 5, "Chemtrail", 60, 5, 80, 5.8, 40, null, 3.44, 450],
    ["Vermin Killer", 23, 66, 130, 4, "Gasoline", 60, 5, 100, 6.2, 60, null, 2.72, 225],
    ["God of Fire", 42, 86, 125, 6, "Gasoline", 120, 5, 90, 6.4, 80, "Heavy Weapon", 7, 500],
    ["EAF-S", 3, 7, 135, 4, null, null, null, 105, 5, 30, "Water Spreading", 2.61, 150],
    ["Ice Breath", 62, 90, 125, 5, null, null, null, 90, 7, 0, null, 4.77, 275],
    ["RW Dragonborn", 28, 54, 130, 5, "Gasoline", 10, 1, 54, 6.4, 0, "Self-charging", 5.39, 225],
  ].map(function (row) { return r("Sprayer", row); });

  var GRENADE_LAUNCHERS = [
    ["Shaker", 1, 1, 100, 7, "Grenade", 6, 1, 50, 3, 45, "Single Load", 3.51, 400],
  ].map(function (row) { return r("Grenade Launcher", row); });

  var UNLISTED = [
    ["Bungee", 99, 99, 100, 7, "7.97", 4, 4, 20, 4, 45, null, 1, 999],
    ["Necrosis-34", 99, 99, 100, 7, "Chemtrail", 4, 4, 20, 4, 45, null, 1, 999],
  ].map(function (row) { return r("Unlisted", row); });

  var RANGED = PISTOLS.concat(SHOTGUNS, SMGS, ASSAULT_RIFLES, MARKSMAN_RIFLES, MACHINE_GUNS,
    MINIGUNS, ROCKET_LAUNCHERS, SPRAYERS, GRENADE_LAUNCHERS, UNLISTED);

  // Armor Mitigation Estimator — SINGLE-SOURCED, unconfirmed. Both claims below come from the
  // SAME Steam Community thread (two different posters), and no second independent source was
  // found after a direct WebSearch + WebFetch pass on 2026-10-28. Ship labeled, per charter.
  var ARMOR_MITIGATION = {
    floorPercent: 5,
    floorPercentAssaultRifle: 10,
    sourceThread: "https://steamcommunity.com/app/2059170/discussions/0/6426156954539202467",
    floorQuote: "Armor doesn't negate the damage entirely, it can't reduce it bellow 5% (10% for assault rifles).",
    floorAuthor: "phoagne (Steam Community, Jul 13, 2024)",
    orderQuote: "Damage taken multiplier applies before damage reduction by armor.",
    orderAuthor: "GreatPalm (Steam Community, Jul 13, 2024, same thread as above)",
    confirmed: false,
  };

  global.QMDATA = {
    MELEE: MELEE,
    RANGED: RANGED,
    MELEE_CATEGORIES: ["Knife", "Blade", "Club", "Fist", "Axe", "Chainsaw"],
    RANGED_CATEGORIES: ["Pistol", "Shotgun", "SMG", "Assault Rifle", "Marksman Rifle",
      "Machine Gun", "Minigun", "Rocket Launcher", "Sprayer", "Grenade Launcher", "Unlisted"],
    ARMOR_MITIGATION: ARMOR_MITIGATION,
    SOURCE_URL: "https://quasimorph.wiki.gg/wiki/Weapons",
    SOURCE_FETCHED: "2026-10-28",
  };
})(typeof module !== "undefined" ? module.exports : (window.QMDATA_NS = window.QMDATA_NS || {}, window));
