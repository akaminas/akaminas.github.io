---
title: "What a composite index hides"
date: 2027-06-15
summary: "A composite index turns several indicators into one rank, and the rank depends on the weights, the scaling and the aggregation rule. Show the components, vary the choices, report what survives."
draft: true
---

A sustainability or wellbeing index turns several indicators into one number, and the number is used to rank regions, countries or projects. The ranking is what people remember. It rests on choices the number doesn't show.

## What goes into the number

To build an index you pick indicators, put them on a common scale, give each a weight and combine them. Each step is a choice, and three of them matter more than they look.

The weights. Equal weights are a decision too, not necessarily the one the users of the index would make. A nominal weight also isn't the same as influence: how much an indicator moves the ranking depends on how much it varies across the units and how it correlates with the others, as well as on its weight. And if four of ten indicators are slightly different measures of energy use, energy has 40% of the say however the weights were meant.

The common scale. Rescaling each indicator to run from 0 to 1 across the units amounts to dividing it by its range, so an indicator that varies little gets stretched and ends up with more say. Z-scores do the same with the standard deviation. It's a weighting step that doesn't look like one.

The aggregation rule. An arithmetic mean lets a high score on one indicator make up for a low score on another. A geometric mean allows less of that, and a zero on any indicator gives a zero overall. Take one region scoring 90, 90 and 10 and another scoring 57 on all three. The arithmetic mean puts the first ahead, 63.3 to 57. The geometric mean reverses it, 43.3 to 57.0. The Human Development Index moved from an arithmetic to a geometric mean in 2010, so the rule settles how far one dimension may substitute for another. (It also takes the logarithm of income before averaging, a similar decision inside one dimension: an extra dollar counts for less in a rich country.) At the far end is the rule where the worst indicator decides. The EU Water Framework Directive classifies the ecological status of a water body that way, "one out, all out", which is defensible if you think good water chemistry doesn't rescue a river whose fish community has failed.

## A small example

Take eight regions, A to H, scored from 0 to 100 on an economic, a social and an environmental indicator. The scores are made up, drawn from a seeded random generator, and I picked a seed where the effect is easy to see. Region F scores 86, 92 and 33. With equal weights and an arithmetic mean it is first. With a geometric mean it is second, and when the environmental indicator counts double it is fourth. Region A (56, 95, 17) is fifth under the first scheme and eighth under the other two. Region E (33, 75, 89) is third, third and then first.

![A bump chart of the ranks of eight regions under three schemes: equal weights with an arithmetic mean, equal weights with a geometric mean, and the environmental indicator counted double. Region F drops from first to fourth.](figure:indices-and-weights "Ranks of eight regions under three schemes, from made-up scores. Region F, first with equal weights and an arithmetic mean, is fourth when the environmental indicator counts double.")

None of the three rankings is wrong. Each answers a different question about how much a weak environmental score should cost a region, and the single number doesn't say which question was asked.

Some details I got from running it. Under the first scheme D and E tie exactly (197/3 = 65.7 each), so E's third place depends on how the tie is broken. A, B and G, which are fifth, sixth and seventh, sit within two points of each other (56.0, 55.7 and 54.0). A ranking hides near-ties as well as ties.

The other choices matter less in these data, which is worth saying. Rescaling to run from 0 to 1 leaves the equal-weight arithmetic order unchanged (the ranges of the three indicators are 57, 68 and 72 points, so it's equivalent to weights of 38%, 32% and 30% on the raw scores). Z-scores swap A and B, which were 0.3 points apart. The rule where the worst indicator decides gives a new order: D first, E second, F third, because F's 33 on the environment counts for everything. So F is first, second, fourth or third depending on the rule and the weights.

Equal weights don't give equal influence either. Across the eight regions, the squared correlation of each indicator with the equal-weight composite is 0.0006 for the economic indicator, 0.32 for the social one and 0.05 for the environmental one. Eight regions is a small sample, and the indicators happen to be negatively correlated in this draw, so I wouldn't read the figures closely. The mechanism is real, though: an indicator that varies little, or that pulls against the others, can have a nominal weight of a third and almost no effect on who comes first.

## Testing the ranking

Saisana, Saltelli and Tarantola (2005) argued that a composite indicator should come with an uncertainty analysis and a sensitivity analysis, so that its ranks can be judged against the choices made in building it. The procedure is short. List the choices that could reasonably have gone another way, draw many combinations of them at random, recompute the ranking each time, and report the spread of ranks, not only the rank from the default choices.

I tried the simplest version on the made-up regions: 10,000 random sets of weights, each set adding to one, with the arithmetic mean. Region F is first in 53 per cent of the draws and E in 30 per cent. F's rank runs from first to sixth, and E's from first to eighth. Even H, which sits near the bottom in all three schemes, takes ranks from third to eighth. In this example a single rank is one point in a wide spread.

The rest of the table is similar. A, B and C can each land anywhere from first to eighth, D never falls below sixth (like F), and G ranges from second to eighth. C and D are first in 7.8% and 6.5% of the draws. If I'd been handed only the default ranking I'd have read "F, D, E, C" at the top as a finding. It's closer to a band of four regions whose order depends on the weights.

Letting the aggregation rule vary as well (arithmetic or geometric, chosen at random in each of 10,000 draws) changes little here: F is first in 48% of the draws and never lower than sixth. That's useful to know, since it says the spread comes mostly from the weights. With real data I'd also drop each indicator in turn, and try the other scalings.

## When the index becomes the target

Goodhart's law is named after the economist Charles Goodhart, who observed in the 1970s that a statistical regularity tends to break down once it is used for control. The wording usually quoted, that when a measure becomes a target it ceases to be a good measure, is a later paraphrase. For a composite index it takes a specific form: a region can raise its rank by improving whichever indicator is cheapest to move, or by changing what is counted, without improving what the index was meant to describe. A heavy weight on one indicator makes that indicator the one to move. Say an environmental score includes the share of land formally protected: a region can raise it by designating remote land that was never under pressure, and the same goes for a wellbeing score that counts bank accounts opened, whether or not anyone uses them.

## What I'd ask of an index

1. Are the components published beside the composite?
2. Who chose the weights, and on what grounds?
3. How was each indicator put on a common scale, and does that change the effective weights?
4. Is the aggregation arithmetic, geometric, or a rule where the worst indicator decides, and what does that say about trade-offs between indicators?
5. How does the ranking change under other reasonable weights and rules?
6. Do the indicators measure different things, or one thing several times?
7. What would a region do to raise its score, and would that improve the thing being measured?

If the ranking survives those changes, report it with some confidence. If it doesn't, report a group of regions that can't be told apart.
