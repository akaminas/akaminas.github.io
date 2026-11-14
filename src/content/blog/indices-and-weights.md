---
title: "What a composite index hides"
date: 2027-06-15
summary: "A composite index combines indicators with weights and an aggregation rule, and the ranking depends on both. Show the components, vary the choices, and report how much of the ranking survives."
draft: true
---

A sustainability or wellbeing index turns several indicators into one number, and the number is used to rank regions, countries or projects. The ranking is what people remember. It rests on choices the number does not show.

## What goes into the number

To build an index you pick indicators, put them on a common scale, give each a weight and combine them. Two of these choices matter more than they look. The first is the weights, and equal weights are a decision too, not necessarily the one the users of the index would make. The second is the aggregation rule. An arithmetic mean lets a high score on one indicator make up for a low score on another. A geometric mean allows less of that, and a zero on any indicator gives a zero overall. The Human Development Index moved from an arithmetic to a geometric mean in 2010, so the rule settles how far one dimension may substitute for another.

## A small example

Take eight regions, A to H, scored from 0 to 100 on an economic, a social and an environmental indicator. The scores are made up, drawn from a seeded random generator, and I picked a seed where the effect is easy to see. Region F scores 86, 92 and 33. With equal weights and an arithmetic mean it is first. With a geometric mean it is second, and when the environmental indicator counts double it is fourth. Region A (56, 95, 17) is fifth under the first scheme and eighth under the other two. Region E (33, 75, 89) is third, third and then first.

![A bump chart of the ranks of eight regions under three schemes: equal weights with an arithmetic mean, equal weights with a geometric mean, and the environmental indicator counted double. Region F drops from first to fourth.](figure:indices-and-weights "Ranks of eight regions under three schemes, from made-up scores. Region F, first with equal weights and an arithmetic mean, is fourth when the environmental indicator counts double.")

None of the three rankings is wrong. Each answers a different question about how much a weak environmental score should cost a region, and the single number does not say which question was asked.

## Testing the ranking

Saisana, Saltelli and Tarantola (2005) argued that a composite indicator should come with an uncertainty analysis and a sensitivity analysis, so that its ranks can be judged against the choices made in building it. The procedure is short. List the choices that could reasonably have gone another way, draw many combinations of them at random, recompute the ranking each time, and report the spread of ranks, not only the rank from the default choices.

I tried the simplest version on the made-up regions: 10,000 random sets of weights, each set adding to one, with the arithmetic mean. Region F is first in 53 per cent of the draws and E in 30 per cent. F's rank runs from first to sixth, and E's from first to eighth. Even H, which sits near the bottom in all three schemes, takes ranks from third to eighth. In this example a single rank is one point in a wide spread.

## When the index becomes the target

Goodhart's law is named after the economist Charles Goodhart, who observed in the 1970s that a statistical regularity tends to break down once it is used for control. The wording usually quoted, that when a measure becomes a target it ceases to be a good measure, is a later paraphrase. For a composite index it takes a specific form: a region can raise its rank by improving whichever indicator is cheapest to move, or by changing what is counted, without improving what the index was meant to describe. A heavy weight on one indicator makes that indicator the one to move.

## Questions to ask of an index

1. Are the components published beside the composite?
2. Who chose the weights, and on what grounds?
3. Is the aggregation arithmetic or geometric, and what does that say about trade-offs between indicators?
4. How does the ranking change under other reasonable weights and rules?
5. What would a region do to raise its score, and would that improve the thing being measured?

If the ranking survives those changes, report it with some confidence. If it does not, report a group of regions that cannot be told apart.
