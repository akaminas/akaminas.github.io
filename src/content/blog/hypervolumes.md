---
title: "Hypervolumes: an underused way to describe biological systems"
date: 2026-12-22
summary: "A community can lose species without losing function, or lose function while the count stays flat. Hypervolumes in trait space measure that, if traits, scaling and dimensions are chosen with care."
draft: true
---

A community can lose species without losing functions, or lose functions while the number of species stays flat. A species count cannot tell these cases apart. A description of the trait space that the community occupies can.

## The idea

G. E. Hutchinson proposed in 1957 that the niche of a species be seen as a region in a space whose axes are environmental variables, an n-dimensional hypervolume. The same idea works for communities. Take the traits that matter for what the species do: body size, diet, position in the water column, and so on. Each species is a point in the space of those traits, and the community is a cloud of points. The volume it occupies, its position and its overlap with another cloud can all be estimated.

The simplest estimate is the **convex hull**, the smallest convex shape that contains all the points. Its volume is a standard measure of functional richness. The hull has weaknesses: it is set by the most extreme species, it can only grow as species are added, and it behaves badly in many dimensions. Kernel-density and support-vector methods, as implemented in the R package `hypervolume` by Blonder and colleagues (2014, 2018), estimate a smoother region that follows the cloud more closely and copes better with outliers and holes.

![Thirty points in the plane of two traits, in a curved band with one point far to the right. A dashed convex hull encloses all of them, including empty space inside the curve, and a shaded kernel-density region follows the band more closely.](figure:hypervolumes "Thirty made-up species in two traits. The convex hull (dashed) is stretched by the outermost species and takes in empty space. The kernel-density region, which holds 90 per cent of the estimated density, leaves that space out and keeps the extreme species apart.")

## Why I think it is underused

This is an opinion from my own reading, so treat it accordingly. The method seems to me to be used mostly for niche overlap and functional richness in plants and animals, and less for questions where its answer would be informative:

- Does the occupied volume shrink, shift or fragment when a community is fished or warmed?
- Does an alien species fill empty parts of the trait space, or overlap with residents? That says more than the fact that it has arrived.
- In models where traits evolve, does diversification fill the space or spread along one axis? The shape of the cloud is itself a result there, and it says something about the processes behind it.

Nor is it limited to biology. Any set of things described by many measurements has a trait space, including organisations described by sustainability indicators.

I suspect the main reason for the slight use is the number of choices involved, which makes the method seem hard to defend.

## The choices

Which traits? The answer changes with the set. Choose them for a reason connected to function, say why, and show the result under a reduced or alternative set.

What scaling? Axes in different units must be put on a common footing, and the way this is done changes the shape. Standardise deliberately, and do not use whatever default the software provides.

How many dimensions? Estimation becomes harder with each dimension added (see the earlier post on dimensions). Reducing the traits first, for example by ordination, is common and has its own cost. Report what was done.

How to compare communities of different size? A larger community will tend to have a larger hull. Compare after rarefaction, or against null communities of the same number of species drawn from the regional pool, never raw.

What about missing traits? Trait databases are incomplete. One option is to impute missing values from the phylogeny, since related species tend to be similar. That requires a phylogeny, which for some groups must itself be inferred, and the imputation error should be carried through to the final volume.

How sure are we? A volume without an interval cannot be interpreted. Resample the species, perturb the traits and see how far the answer moves.

## What it is for

The hypervolume does not replace species richness, and it does not remove its limits. It answers one question well: how much of a space of possible ways of living does this community use, and is that changing? Report the traits, the scaling, the number of dimensions and the interval with every volume.
