# Quasimorph — Weapon & Armor Stat Browser (GCT-029)

Single static page, `index.html` + `data.js`, no build step, no dependencies, no backend, no
account/login.

## What it does

A sortable, filterable table of every weapon on Quasimorph's wiki Weapons page — 46 melee weapons
across 6 categories (Knife, Blade, Club, Fist, Axe, Chainsaw) and 194 ranged weapons across 11
categories (Pistol, Shotgun, SMG, Assault Rifle, Marksman Rifle, Machine Gun, Minigun, Rocket
Launcher, Sprayer, Grenade Launcher, Unlisted). Filter by weapon class, category, damage type, or
name; click any column header to sort. No "best weapon" output anywhere — this is a browser, not a
verdict generator.

A second section, the Armor Mitigation Estimator, is clearly separated and labeled
unconfirmed/single-source (see below).

## Data source (fetched directly 2026-10-28)

`quasimorph.wiki.gg/wiki/Weapons` — sole source for every weapon's name, category, min/max
damage, crit multiplier, crit chance (melee only), damage type (melee only), accuracy,
scatter/knockback, range, ammo type/capacity, reload, condition, special effect, weight, and
price. Fetched via WebFetch in multiple passes (the page is ~171K characters; WebFetch truncates
and was called repeatedly with increasing `offset` to cover the whole page), transcribed
table-by-table, verbatim where the tool could reproduce it directly and cross-checked where it
could not (see "Discrepancy found" below).

**Two crit-related columns exist, and they are not the same thing.** Melee tables carry both a
"Crit." column (a damage multiplier, ~150%–290%, e.g. 190% = 1.9× damage on a crit) and a separate
"Critical chance" column (the probability of landing a crit, ~3%–40%). Ranged tables carry only
the "Crit." multiplier column — no critical-chance probability is given for any ranged weapon
anywhere on the source page. The table and `data.js` keep these as two distinct fields
(`critMult` vs. `critChance`) and never conflate them; ranged weapons show `critChance` as
"not listed" rather than a guessed or borrowed melee value.

**Damage type is melee-only on the source page.** No ranged weapon table (Pistols, Shotguns, SMGs,
etc.) carries a damage-type column at all. The browser shows "not listed" for every ranged
weapon's damage type rather than inferring one from ammo type or weapon name.

## Discrepancy found on direct read

The first WebFetch pass over the Fists and Axes tables returned only ONE crit-related number per
weapon, condensed under a generic "Crit chance" label. Cross-checking the actual values (22%, 16%,
9%, 18%...) against the already-confirmed Knives/Blades/Clubs data showed these numbers fell in
the "Critical chance" range (3%–40%), not the "Crit." multiplier range (150%–290%) — meaning the
first pass had silently dropped the multiplier column for those two categories. A second, more
explicit WebFetch call ("give me BOTH crit-related columns separately") recovered the missing
multiplier values for all 12 Fists/Axes rows. Both values are now present for every melee weapon.

**A known quirk in the source data itself (not a fetch error):** the wiki lists "Chainblade" once
under the "Blades" category table and again under its own single-row "Chainsaws" category table,
with identical stats both times. `data.js` includes it once, under category `"Chainsaw"` (its
dedicated heading), to avoid a literal duplicate row in the sortable table — `test.js` asserts
this explicitly.

## Armor Mitigation Estimator — per charter, single-sourced and labeled as such

The charter specified two claims to ship, both from Steam Community threads on app 2059170:
1. Armor cannot reduce damage below a floor: 5% of raw damage (10% for assault rifles).
2. A damage-taken multiplier applies before armor reduction.

**Research correction from the charter's framing:** a direct WebSearch + WebFetch pass on
2026-10-28 found BOTH claims in the SAME Steam Community thread
(`steamcommunity.com/app/2059170/discussions/0/6426156954539202467`, "Why is armor so damn
useless?"), posted by two different community members (phoagne for the floor, GreatPalm for the
ordering) — not two separate threads as the charter described. This doesn't change the
epistemic status (still a single thread, zero official corroboration), but the page's sources
section states the correction rather than repeating the charter's framing as fact.

**No second independent source was found for either claim** after checking three other
Quasimorph Steam Community threads and one third-party armor guide (xmodhub.com) that discuss
armor mechanics generally but state no floor number and no armor-value-to-reduction formula.

**A further, more basic gap:** no source found anywhere — official, wiki, or community — documents
how a specific armor VALUE converts into a reduction percentage in Quasimorph. Only the floor
exists as a claim. Because of this, the estimator does NOT take an armor-value input and compute
a reduction curve (that would require fabricating a formula, which the charter's own FAILURE
PROTOCOL and the Hive's research principles prohibit). Instead it computes the floor-protected
damage range directly from a weapon's own min/max damage and an assault-rifle toggle — the only
arithmetic the single source actually supports — and states plainly, in the UI, that this is a
floor bound, not a prediction for any specific armor value.

Both quotes are reproduced verbatim on the page with their author and date, directly under an
unconfirmed/single-source banner, exactly matching this lane's GCT-027/GCT-021 precedent for
shipping a single-sourced mechanic labeled rather than omitted.

## Liability tier

T0/T1 — no "best"/"optimal"/"strongest"/"guaranteed"/"approved"/"certified"/"compliant"/"safe"
anywhere in rendered copy or in the underlying data. `test.js` checks the rendered HTML (tags and
scripts stripped) and every weapon data row for all eight banned words.

## Tests

`node test.js` — 46+194 structural checks (every weapon has a name, min ≤ max damage, a numeric
crit multiplier; melee rows have a damage type, ranged rows never carry a `critChance` key at
all), known-answer checks (Mengele's exact stats, the Chainblade dedup, Ur's Maw's price, the
Tripatekpatl crit-multiplier-vs-crit-chance distinction), the Armor Mitigation Estimator's own
floor arithmetic reproduced as a known-answer check, and the copy-discipline banned-word sweep.

`python3 Tools/slop_lint.py Products/QuasimorphWeaponBrowser/` — clean, 0 findings.
