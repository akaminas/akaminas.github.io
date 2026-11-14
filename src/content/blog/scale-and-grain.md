---
title: "The pattern depends on the grain"
date: 2027-04-13
summary: "Two variables can correlate negatively cell by cell and strongly positively once you average over bigger areas. Grain, extent and where the boundaries fall are all part of the result."
draft: true
---

Any statement about a pattern holds at some scale. Summarise the same data on a coarser grid and the correlation, the trend or the ranking of places can change, and sometimes the sign flips.

## Grain and extent

Grain is the size of the smallest unit the data resolve: a pixel, a quadrat, a census tract, a county. Extent is the whole area, or period, the study covers. Both are decisions, made by an instrument or by an analyst, and both belong to the finding. Levin (1992) argued that there's no single natural scale at which ecological phenomena should be studied, because systems vary on a range of scales at once.

Extent bounds what you can see. If the study area is much smaller than a pattern you only see a gentle trend across it, and a pattern that's longer-ranged than the area can't be measured at all. Grain bounds the other end: nothing finer than the unit can be resolved, and what's finer is averaged away. Time works the same way. A correlation between daily values and one between annual means needn't agree, and a record shorter than the slowest process in the system can't show it.

## A worked case

I built two fields on a grid of 64 by 64 cells. Each is the sum of a broad pattern, shared by both, and a fine-scale pattern that enters with opposite signs. The broad pattern has a length scale of about six cells and the fine one of about one. I built them this way so the answer is known: cell by cell the fields pull against each other, and over larger areas they agree. The weight of 0.8 and the two length scales are my choices. I haven't tried other values, so I wouldn't read anything into where exactly the sign changes.

Then each field is averaged over square blocks and the block averages are correlated. The correlation is -0.22 for single cells, -0.14 for blocks of 2 by 2, 0.08 for 4 by 4, 0.49 for 8 by 8 and 0.72 for 16 by 16. The sign changes between 2 and 4 cells.

![Two grids of shaded cells, labelled field X and field Y, above a curve of the correlation between them rising from -0.22 for single cells to 0.72 for blocks of 16 cells a side.](figure:scale-and-grain "Two simulated fields, and the correlation between them once both are averaged over square blocks. Cells above the median of their own field are shaded. The faint lines on the grids mark blocks of 16 cells.")

There are only 16 blocks of the largest size, so the last value is the least certain. Across eight different sets of random numbers, this one included, the finest grain gave -0.22 every time and the 16-cell blocks gave between 0.69 and 0.82. With 40 sets the range at 16 cells widens to 0.42 to 0.89, and the finest value never moved.

That finest value can be done on paper. Each field has variance 1. The broad part, with weight 0.8, adds 0.64 to the covariance of the two fields, and the fine part, which enters with opposite signs, subtracts 1, so the covariance is 0.64 - 1 = -0.36. The variance of each field is 0.64 + 1 = 1.64, and the correlation is -0.36 / 1.64 = -0.22 whatever the random numbers.

Averaging then removes the fine part faster than the broad one. For the first set, blocks of 8 by 8 keep 85 per cent of the variance of the broad part and 19 per cent of the fine part's, and blocks of 16 by 16 keep 59 and 6 per cent. One step further, blocks of 32 by 32, leaves four blocks, and a correlation from four pairs of numbers is worth very little: it came out at 0.37 for the first set and 0.62 and 0.69 for the next two. So the extent sets how far you can coarsen before there's nothing left to correlate.

## Why averaging raises the correlation

Averaging cancels the part of each variable that varies at a fine scale and keeps what varies over broad areas. If the fine part is unrelated noise, averaging removes it and the correlation rises towards what the broad pattern alone implies. Here the fine part was opposed, so the correlation changed sign as well.

Gehlke and Biehl (1934) reported that correlations between census-tract variables tended to rise as the tracts were merged into larger groups. Robinson (1950) showed that a correlation between the averages of areas can't stand in for the correlation between individuals. The two answer different questions: how areas differ from one another, and how individuals differ within them. Robinson's own case was the 1930 census. Across the 48 states, the share of the population born abroad and the share illiterate were negatively correlated, at about -0.5, while among individuals the correlation was positive, +0.12.

Field data do the same. Chase and Leibold (2002) found that species richness in ponds was hump-shaped against productivity among ponds, and positive and linear when the same data were viewed across watersheds. Neither is the wrong answer. They describe different things, and a study that reports only one of them has chosen a scale without saying so. The constructed fields can be read the same way. If they were the abundances of two species, the species would exclude each other at the scale of a quadrat and follow the same habitat across a region. If they were two social indicators, they'd pull against each other between neighbours and move together between districts.

Inequality moves the other way. If each household is replaced by the average of its district, the differences between districts stay and those within them disappear, so the Gini coefficient can't rise, and coarser districts lower it further. A figure computed on districts understates inequality, by an amount that depends on how the districts were drawn.

## The boundaries are a choice too

The modifiable areal unit problem, a name that goes back to Openshaw and Taylor (1979), has two parts. The scale effect is what the example shows, the change in results with the size of the units. The zoning effect is the change with the placement of the boundaries when the size is held fixed.

To see the zoning effect I kept blocks of 16 cells and moved the block grid across the same two fields, in steps of two cells in each direction, wrapping round the edges. Over the 64 positions the correlation ranged from 0.55 to 0.87. The unshifted grid gave 0.72. Nothing about the fields changed, only where the lines were drawn.

Electoral districts show the zoning effect with the stakes visible. Take 100 voters in five districts of 20, with 60 for party A and 40 for party B. If every district has 12 A and 8 B, A wins five seats to none. If two districts hold 20 A voters each, and the other three hold 7, 7 and 6 A voters among 13, 13 and 14 B voters, B wins three seats to two on 40 per cent of the votes. The voters and their totals are the same, and only the boundaries differ. Gerrymandering is this effect used on purpose.

This example is built to show the effect: two fields with two clean scales. Real data have a continuum of scales, and the curve of correlation against grain may be smoother and may never cross zero. What carries over is that the curve exists and has to be looked at.

## What I do about it

To get a curve like the one above, aggregate the data to successively coarser grains (doubling the side of the block is the simplest), compute the statistic at each, and plot it against the grain. Where the region isn't a multiple of the block size, trim the edge and keep every block the same size, since unequal units bring a scale effect of their own. For irregular units such as parishes or catchments, report the range of their areas.

- State the grain and the extent next to every pattern, with the unit of measurement.
- Choose the grain from the process under study, such as the neighbourhood a plant competes in or the market a household buys in, and not from the form in which the data arrived.
- Repeat the analysis at two or three grains and report how the result moves.
- Move the boundaries and see whether the result survives.
- Give the number of units at each grain. A correlation from 16 blocks isn't the same kind of number as one from 4,096 cells.
- Note where the result changes sign or levels off. That grain is a hint about the scale at which the process changes character.
- Don't read a correlation between areas as a correlation between the individuals living in them.
