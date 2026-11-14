---
title: "Hypervolumes: an underused way to describe biological systems"
date: 2026-12-22
summary: "A community can lose species without losing function, or lose function while the count stays flat. Hypervolumes in trait space measure that, if traits, scaling and dimensions are chosen with care."
draft: true
---

A community can lose species without losing functions, or lose functions while the number of species stays flat. A species count cannot tell these cases apart. A description of the trait space that the community occupies can.

## The idea

G. E. Hutchinson proposed in 1957 that the niche of a species be seen as a region in a space whose axes are environmental variables, an n-dimensional hypervolume. The same idea works for communities. Take the traits that matter for what the species do: body size, diet, position in the water column, and so on. Each species is a point in the space of those traits, and the community is a cloud of points. The volume it occupies, its position, and its overlap with another cloud are all quantities that can be estimated.

The simplest estimate is the **convex hull**, the smallest convex shape that contains all the points. Its volume is a standard measure of functional richness. The hull has weaknesses: it is set by the most extreme species, it can only grow as species are added, and it behaves badly in many dimensions. Kernel-density and support-vector methods, available in the R package `hypervolume` developed by Blonder and colleagues (the first paper on the n-dimensional hypervolume dates from 2014), estimate a smoother region and cope better with outliers and holes.

## Why I think it is underused

This is an opinion from my own reading, so treat it accordingly. The method seems to me to be used mostly for niche overlap and functional richness in plants and animals, and less for questions where its answer would be informative:

- **Change under pressure.** Does the occupied volume shrink, shift or fragment when a community is fished, warmed or invaded?- **Invasion.** Does an alien species fill empty parts of the trait space or overlap with residents? That is more informative than the fact that it has arrived.
- **Evolution.** In models where traits evolve, the shape of the cloud is itself a result. Whether diversification fills the space or spreads along one axis says something about the processes behind it.
- **Beyond biology.** Any set of things described by many measurements has a trait space, including organisations described by sustainability indicators.

I suspect the main reason for the slight use is the number of choices involved, which makes the method seem hard to defend.

## The choices

**Which traits?** The answer changes with the set. Choose them for a reason connected to function, say why, and show the result under a reduced or alternative set.

**What scaling?** Axes in different units must be put on a common footing, and the way this is done changes the shape. Standardise deliberately, and do not use whatever default the software provides.

**How many dimensions?** Estimation becomes harder with each dimension added (see the earlier post on dimensions). Reducing the traits first, for example by ordination, is common and has its own cost. Report what was done.

**How to compare communities of different size?** A larger community will tend to have a larger hull. Compare after rarefaction, or against null communities of the same number of species drawn from the regional pool, never raw.

**What about missing traits?** Trait databases are incomplete. One option is to impute missing values from the phylogeny, since related species tend to be similar. That requires a phylogeny, which for some groups must itself be inferred, and the imputation error should be carried through to the final volume.
**How sure are we?** A volume without an interval is a number without a meaning. Resample the species, perturb the traits and see how far the answer moves.

## An honest verdict

The hypervolume is neither a replacement for species richness nor a cure for its limits. It is a good tool for a specific question: how much of a space of possible ways of living does this community use, and is that changing? It deserves more use, together with the discipline of reporting the choices that go into it.
