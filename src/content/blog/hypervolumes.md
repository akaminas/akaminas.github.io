---
title: "Describing a community as a hypervolume"
date: 2026-12-22
summary: "A community can lose species and keep its functions, or keep its species and lose functions. A hypervolume in trait space can tell the two apart, if traits, scaling and bandwidth are chosen with care."
draft: true
---

A community can lose species without losing functions, or lose functions while the number of species stays flat. A species count can't tell those cases apart. A description of the trait space that the community occupies can.

## The idea

G. E. Hutchinson proposed in 1957 that the niche of a species be seen as a region in a space whose axes are environmental variables, an n-dimensional hypervolume. The same idea works for communities. Take the traits that matter for what the species do (body size, diet, position in the water column, whatever fits the question). Each species is a point in the space of those traits, and the community is a cloud of points. The volume it occupies, its position and its overlap with another cloud can all be estimated.

The simplest estimate is the convex hull, the smallest convex shape that contains all the points. Its volume is a standard measure of functional richness. It has weaknesses: it's set by the most extreme species, it can only grow as species are added, and it behaves badly in many dimensions. Kernel-density and support-vector methods, as implemented in the R package `hypervolume` by Blonder and colleagues (2014, 2018), estimate a smoother region that follows the cloud more closely and copes better with outliers and holes.

![Thirty points in the plane of two traits, in a curved band with one point far to the right. A dashed convex hull encloses all of them, including empty space inside the curve, and a shaded kernel-density region follows the band more closely.](figure:hypervolumes "Thirty made-up species in two traits. The dashed convex hull is stretched by the outermost species and takes in empty space inside the curve. The shaded kernel-density region holds 90 per cent of the estimated density, leaves that space out and keeps the extreme species apart.")

Some numbers for that picture, since the shapes are easy to over-read. The hull has an area of 1.96 (in the units of the made-up traits, squared). Take the one extreme species away and it falls to 1.70, 13% smaller, from one species in thirty. The kernel region, at the bandwidth used in the figure, goes from 1.69 to 1.47, so it loses about as much. What it doesn't do is claim the empty space between that species and the band. Leave each species out in turn: the hull changes only for the 7 species that are its corners, by up to 13.5%, and the kernel region changes a little with every drop, from 13% smaller to 3% larger. A volume that moves by a tenth when one species out of thirty goes is not something to quote to three digits.

The same figure shows the point I started with. Drop 7 of the 30 species. If they're the 7 corners of the hull, the hull area falls to 63% of what it was and the kernel region to 68%. If they're 7 of the 23 species inside, picked at random, the hull doesn't change at all and the kernel region ends up between 91% and 115% of the original (20 random picks; it can go up because the rule-of-thumb bandwidth depends on the number of points). Seven species lost either way, and the count can't say which of the two happened.

## Why I think it's underused

This is an opinion from my own reading, so treat it accordingly. The method seems to me to be used mostly for niche overlap and functional richness in plants and animals, and less for questions where its answer would be informative:

- Does the occupied volume shrink, shift or fragment when a community is fished or warmed? Fishing tends to take the large species first, and that kind of loss removes corners rather than interior points.
- Does an alien species fill empty parts of the trait space, or overlap with residents? That says more than the fact that it has arrived.
- In models where traits evolve, does diversification fill the space or spread along one axis? The shape of the cloud is itself a result there, and it says something about the processes behind it.

It isn't limited to biology either. Any set of things described by many measurements has a trait space: organisations described by sustainability indicators, say, or cities described by density, income and emissions.

Overlap needs care too. The usual indices (Jaccard, Sorensen) are symmetric, but "how much of A is inside B" isn't. If B is four times the size of A and contains it completely, the Jaccard index is 1/4 = 0.25 and the Sorensen index is 2/(1 + 4) = 0.4, although A sits wholly inside B. Report the fraction of each volume that is unique to it as well.

I suspect the main reason for the slight use is the number of choices involved, which makes the method seem hard to defend. They are real choices.

## The choices

Which traits? The answer changes with the set. Choose them for a reason connected to function, say why, and show the result under a reduced or alternative set.

What scaling? Axes in different units must be put on a common footing, and the way this is done changes the shape. Standardise deliberately, and don't use whatever default the software provides. A log of body mass and body mass itself give different clouds: on the raw scale a few huge species stretch the axis and everything else is squeezed into one corner.

What counts as a point? In the hull and the kernel region of the figure, every species is one point, so a species with a handful of individuals counts the same as the dominant one. That's sometimes what you want (does the community contain this way of living at all?) and sometimes not. Say which, because weighting by abundance asks a different question and gives different volumes.

How wide a kernel? This one surprised me. Take the same 30 points as in the figure and set the bandwidth to 0.2, 0.4, 0.7 and 1.0 times Silverman's rule of thumb (the figure uses 0.4). The areas of the region holding 90% of the density are 0.85, 1.69, 2.58 and 3.43. That's a factor of four from one smoothing choice. At the widest setting the kernel region is bigger than the hull (1.96), so "the kernel region is tighter than the hull" holds only for small enough bandwidths. Report the bandwidth, and show the volume at a couple of others.

How many dimensions? Estimation becomes harder with each dimension added (see the earlier post on dimensions). A hull in d dimensions has no volume at all unless there are at least d + 1 species. And the hull gets uninformative well before that. Draw 30 points from a standard normal distribution: the share that end up as corners of the hull is 24% in two dimensions, 49% in three, 85% in five and 99% in eight (averages over 100 random draws each). In ten dimensions every point was a corner in all 30 draws I ran. Reducing the traits first, for example by ordination, is common and has its own cost. Report what was done.

How to compare communities of different size? A larger community will tend to have a larger hull, even when nothing about the species differs. I drew n species from one fixed two-trait normal distribution and averaged the hull area over 3,000 draws for each n. It comes out at 5.4 for 10 species, 8.7 for 20, 12.3 for 40, 16.0 for 80 and 19.9 for 160, in units of the trait standard deviation squared. Each doubling adds roughly 3.3 to 3.9. So a community with twice the species "has more functional richness" on the hull alone. Compare after rarefaction, or against null communities of the same number of species drawn from the regional pool, never raw.

What about missing traits? Trait databases are incomplete. One option is to impute missing values from the phylogeny, since related species tend to be similar. That requires a phylogeny, which for some groups must itself be inferred, and the imputation error should be carried through to the final volume.

How sure are we? A volume without an interval can't be interpreted. Resample the species, perturb the traits and see how far the answer moves.

## What it's for

It doesn't replace species richness, and it doesn't remove its limits. It answers one question reasonably well: how much of the space of possible ways of living does this community use, and is that changing? That holds as long as the traits, the scaling, the number of dimensions, the bandwidth and an interval travel with the number.
