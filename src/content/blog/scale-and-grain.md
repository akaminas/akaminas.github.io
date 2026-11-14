---
title: "The pattern depends on the grain"
date: 2027-04-13
summary: "Two variables can be negatively correlated cell by cell and strongly positive when averaged over larger areas. The grain, the extent and the boundaries of the units are all part of the result."
draft: true
---

Any statement about a pattern holds at a particular scale. Summarise the same data on a coarser grid and the correlation, the trend or the ranking of places can change, and sometimes the sign changes with it.

## Grain and extent

Grain is the size of the smallest unit that the data resolve: a pixel, a quadrat, a census tract, a county. Extent is the whole area, or period, that the study covers. Both are decisions, taken by an instrument or by an analyst, and both belong to the finding. Levin (1992) argued that there is no single natural scale at which ecological phenomena should be studied, because systems vary on a range of scales at once.

Extent bounds what can be seen. A study area much smaller than a pattern sees only a gentle trend across it, and a pattern that is longer-ranged than the area cannot be measured at all. Grain bounds the other end: nothing finer than the unit can be resolved, and what is finer is averaged away.

## A worked case

I built two fields on a grid of 64 by 64 cells. Each is the sum of a broad pattern, shared by both, and a fine-scale pattern that enters with opposite signs. The broad pattern has a length scale of about six cells and the fine one of about one. I built them this way so that the answer is known: cell by cell the fields pull against each other, and over larger areas they agree.

Then I averaged each field over square blocks and correlated the block averages. The correlation was -0.22 for single cells, -0.14 for blocks of 2 by 2, 0.08 for 4 by 4, 0.49 for 8 by 8 and 0.72 for 16 by 16. The sign changes between 2 and 4 cells.

![Two grids of shaded cells, labelled field X and field Y, above a curve of the correlation between them rising from -0.22 for single cells to 0.72 for blocks of 16 cells a side.](figure:scale-and-grain "Two simulated fields and the correlation between them after both are averaged over square blocks. Shaded cells are above the median of their own field. The faint lines on the grids mark blocks of 16 cells.")

There are only 16 blocks of the largest size, so the last value is the least certain. Across eight different sets of random numbers, this one included, the finest grain gave -0.22 every time and the 16-cell blocks gave between 0.69 and 0.82.

## Why averaging raises the correlation

Averaging cancels the part of each variable that varies at a fine scale and keeps what varies over broad areas. If the fine part is unrelated noise, averaging removes it and the correlation rises towards what the broad pattern alone implies. In the example the fine part was opposed, so the correlation also changed sign.

Gehlke and Biehl (1934) reported that correlations between census-tract variables tended to rise as the tracts were merged into larger groups. Robinson (1950) showed that a correlation between the averages of areas cannot stand in for the correlation between individuals. The two answer different questions: how areas differ from one another, and how individuals differ within them.

## The boundaries are a choice too

The modifiable areal unit problem, a name that goes back to Openshaw and Taylor (1979), has two parts. The scale effect is what the example shows, the change in results with the size of the units. The zoning effect is the change with the placement of the boundaries when the size is held fixed.

To see the zoning effect I kept blocks of 16 cells and moved the block grid across the same two fields, in steps of two cells in each direction, wrapping round the edges. Over the 64 positions the correlation ranged from 0.55 to 0.87. The unshifted grid gave 0.72. Nothing about the fields changed, only where the lines were drawn.

## What I do about it

- State the grain and the extent next to every pattern, with the unit of measurement.
- Choose the grain from the process under study, such as the neighbourhood a plant competes in or the market a household buys in, and not from the form in which the data arrived.
- Repeat the analysis at two or three grains and report how the result moves, as a curve like the one above.
- Move the boundaries and see whether the result survives.
- Do not read a correlation between areas as a correlation between the individuals living in them.
