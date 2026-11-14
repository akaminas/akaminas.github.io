---
title: "What citizen-science records can and cannot tell you"
date: 2027-02-09
summary: "Records from divers, fishers and the public can show a first occurrence or a range change. Turning them into densities or trends needs the effort behind them to be known."
draft: true
---

Records of marine species contributed by divers, fishers and the public are useful, and they have limits. It helps to know where the one ends and the other begins.

## What they are good at

Divers, fishers and the public are in more places, for more of the year, than any survey team. For a species that spreads faster than formal surveys can follow, their observations may be the first sign.

A single well-documented sighting is evidence that a species is present somewhere it was not known to be. A photograph can be checked by a taxonomist, which turns an anecdote into a record, and many published first records rest on observations of this kind. A series of records, checked and dated, shows where a species has been found over time, and so can show a change of range.

## What they are not good at

They cannot show absence. Records show presence, and a missing record may mean that nobody looked, or looked and did not see the animal.

Effort is the hard part. Reports come from where people dive, fish and have a phone. They bunch around harbours and popular dive sites, in summer, in the daytime. Without a record of the effort behind them, a density is a map of observers.

In the figure, the animals are spread evenly over 50 cells, and each observer-hour turns up one report on average wherever it is spent. The observers are not spread evenly: they gather round a harbour and a dive site. The ten busiest cells, a fifth of the grid, then produce 42 per cent of the reports. Dividing each cell's reports by its hours gives an even map again, between 0.7 and 1.3 reports per hour, with the scatter due to chance. That works only because every hour is worth the same here. In the field the rate varies with the observer and the conditions, which is why reports per hour is an index and not a density.

![Four grids of 50 cells. Animals are shaded evenly. Observer hours and reports are dark in the same two places, one at the left and one right of centre. Reports per hour are shaded evenly again.](figure:citizen-science-records "Animals spread evenly over a grid, observers gathered round a harbour and a dive site. The reports follow the observers. Divided by the hours they give an even map again, because here every hour is worth the same. A seeded simulation with made-up numbers.")

A large, colourful or unusual animal gets reported much more readily than a small, cryptic one, so a trend in reports can follow the attention a species receives and not its abundance. Similar species are also confused, and the confusion is not random. Verification by experts, and photographs wherever possible, limit the damage.

## A matter of method

Collecting records is data-gathering and monitoring, not modelling. It calls for respect for the people who collect the data and some wariness about what the data can carry. A model fitted to records without regard to the effort behind them can give a confident answer to the wrong question.

Collecting the records is also a form of public engagement. Participants who know why effort matters tend to report better, and that makes a better dataset.

## From records to numbers

Turning records into quantities needs a model of how the records arose. The central idea is imperfect detection: a species can be present and unseen, and the probability of seeing it depends on effort, observer and conditions. Occupancy models, developed by MacKenzie and colleagues in 2002, use repeated visits to estimate the detection probability and the occupancy together. Without repeated visits or a measure of effort, the two are confounded, which is the identifiability problem of an earlier post.

Practical steps follow.

- Record effort whenever possible: how long, how many observers, where, which gear.
- Record non-detections, not only detections. A "nothing seen" report is worth a great deal.
- Keep a verification step, and record who verified.
- Compare against a structured survey in a few places, to calibrate.
- Be explicit about what the numbers mean: reports per observer-hour is not density.
