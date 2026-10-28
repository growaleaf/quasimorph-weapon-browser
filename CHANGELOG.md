# Changelog

## 2026-10-28

Initial build. Weapon stats sourced from `https://quasimorph.wiki.gg/wiki/Weapons`, snapshot
fetched 2026-10-28 across both its Melee and Ranged category tables (46 melee, 194 ranged weapons).
A first-pass fetch of the Fists and Axes tables silently dropped the crit-multiplier column for
those 12 weapons (returning only crit chance); a follow-up fetch explicitly requesting both
crit-related columns recovered the missing values — see README.md "Discrepancy found" for detail.

The Armor Mitigation Estimator ships two community-reported, unconfirmed claims (an armor damage
floor and a damage-multiplier-ordering rule) from a single Steam Community thread, labeled as such
directly on the page. No second independent source, and no source for an armor-value-to-reduction
formula, was found after a direct research pass the same day — see README.md for the full account.
