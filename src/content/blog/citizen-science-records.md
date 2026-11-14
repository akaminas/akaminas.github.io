---
title: "What citizen-science records can and cannot tell you"
date: 2027-02-09
summary: "Records from divers, fishers and the public can show a first occurrence or a range change. Densities and trends need the effort behind them, and effort is what usually goes unrecorded."
draft: true
---

Records of marine species from divers, fishers and the public are useful, and they have limits. It helps to know where one ends and the other begins.

## What they are good at

Divers, fishers and the public are in more places, for more of the year, than any survey team. For a species that spreads faster than formal surveys can follow, their observations may be the first sign. Nobody has the budget to survey a whole coastline every season, and these people are there anyway.

A single well-documented sighting is evidence that a species is present somewhere it wasn't known to be. A photograph can be checked by a taxonomist, which turns an anecdote into a record, and many published first records rest on observations of this kind. A series of records, checked and dated, shows where a species has been found over time, so it can show a change of range.

## What they are not good at

They can't show absence. Records show presence, and a missing record may mean nobody looked, or looked and didn't see the animal. The second case is bigger than it sounds. Suppose a species is present at a site and each dive has a 20 per cent chance of spotting it. Five dives that see nothing happen 33 per cent of the time even though the animal is there (0.8^5 = 0.33). If I thought it was 50:50 whether the species lived at the site, five blank dives would leave about a 25 per cent chance that it does. And for a harder-to-spot animal, 10 per cent per dive, you need 29 dives to be 95 per cent sure of seeing it at least once.

Effort is the hard part. Reports come from where people dive, fish and have a phone. They bunch around harbours and popular dive sites, in summer, in the daytime. Without a record of the effort behind them, a density is a map of observers.

In the figure, the animals are spread evenly over 50 cells, and each observer-hour turns up one report on average wherever it is spent. The observers aren't spread evenly: they gather round a harbour and a dive site. The ten busiest cells, a fifth of the grid, then produce 42 per cent of the reports. Dividing each cell's reports by its hours gives an even map again, between 0.7 and 1.3 reports per hour, with the scatter due to chance. That works only because every hour is worth the same here. In the field the rate varies with the observer and the conditions, which is why reports per hour is an index and not a density.

![Four grids of 50 cells. Animals are shaded evenly. Observer hours and reports are dark in the same two places, one at the left and one right of centre. Reports per hour are shaded evenly again.](figure:citizen-science-records "Animals spread evenly over a grid, observers gathered round a harbour and a dive site. The reports follow the observers. Divide by the hours and the map is even again, because here every hour is worth the same. A seeded simulation with made-up numbers.")

Effort also changes over time, and that's where trends go wrong. Say the number of observer-hours grows by 10 per cent a year and the animal doesn't change at all. Reports per hour stay flat and the reports themselves rise to 2.6 times their starting level in ten years. Now let the animal decline by 5 per cent a year. Reports still rise, by about 4.5 per cent a year (1.1 x 0.95), to 1.55 times the start after ten years, while the population is down to 60 per cent. Anyone reading the raw counts would see a species doing well.

A large, colourful or unusual animal gets reported much more readily than a small, cryptic one, so a trend in reports can follow the attention a species receives and not its abundance. A species that has been in the news tends to be reported more, whatever it's doing. Similar species are also confused, and the confusion isn't random. Verification by experts, and photographs wherever possible, limit the damage.

None of this is special to the sea. Reports of flooding, outages or potholes sent through an app map who has the app, and who thinks it's worth the trouble, as much as they map the problem. Fisheries science has argued about the same thing for a long time with catch per unit effort: if fishers go where the fish are, catch rates can stay high while the stock shrinks.

## A matter of method

Collecting records is data-gathering and monitoring, not modelling. It calls for respect for the people who collect the data and some wariness about what the data can carry. A model fitted to records without regard to the effort behind them can give a confident answer to the wrong question.

Collecting the records is also a form of public engagement. Participants who know why effort matters tend to report better, and that makes a better dataset. It's worth telling them what happened to their records. And for rare species, or ones people collect, the exact positions are often generalised before the records are shared, which costs a little resolution and protects the animals.

## From records to numbers

Turning records into quantities needs a model of how the records arose. The central idea is imperfect detection: a species can be present and unseen, and the probability of seeing it depends on effort, observer and conditions. Occupancy models, developed by MacKenzie and colleagues in 2002, use repeated visits to estimate the detection probability and the occupancy together. Without repeated visits or a measure of effort, the two are confounded, which is the identifiability problem of an earlier post.

Take an example. Let the species occupy 60 per cent of sites (call that psi) and be seen with probability 0.3 on a visit to an occupied site (p). After one visit, 18 per cent of sites have a record, which is psi times p. But psi = 0.3 with p = 0.6, and psi = 0.9 with p = 0.2, give 18 per cent too, so one visit can't tell the three worlds apart. With three visits per site the share of sites with at least one record is 39, 28 and 44 per cent in the three cases, so now they differ. The pattern of detections across visits carries more still: a site has a record on all three visits in 1.6 per cent of sites with psi = 0.6 and p = 0.3, and in 6.5 per cent with psi = 0.3 and p = 0.6.

Effort matters here too. With psi fixed at 0.6 and p = 0.3, three visits per site give 39 per cent of sites with a record, and two visits give 31 per cent. That's a fall of more than a fifth, with the animals exactly where they were.

The model rests on assumptions, and I'd check each against the species. The site has to stay occupied or empty across the visits. For a fish that moves in and out of the site, occupancy really means use, and p is partly about movement. Visits are taken as independent, with detection the same at each, which is shaky when the same diver goes back to a site they know. And a record is taken to be a true record. A misidentified animal counts as presence, which is why the verification step matters.

When effort wasn't recorded at all, I'd look for a stand-in rather than ignore it, such as the length of the list each observer submitted, but that has its own assumptions and I'd say so.

What I'd ask for when setting up a scheme:

- Record effort whenever possible: how long, how many observers, where, which gear.
- Record non-detections, not only detections. A "nothing seen" report is worth a great deal.
- Keep a verification step, and record who verified.
- Give each observer a code, so experience can go into the model.
- Compare against a structured survey in a few places, to calibrate.
- Be explicit about what the numbers mean: reports per observer-hour is not density.
