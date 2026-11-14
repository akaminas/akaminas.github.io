---
title: "A species can vanish before its habitat does"
date: 2027-07-13
summary: "In a patch model a species persists only if colonisation beats extinction. Destroy enough patches and it drops below that line with habitat to spare. An epidemic model has the same algebra."
draft: true
---

A species that lives in patches (ponds, forest fragments, islands) persists only if empty patches get colonised as fast as occupied ones empty. That balance gives a threshold, and habitat loss can carry a species across it long before the habitat is gone.

## The model

Levins (1969) described a population as a set of patches, each occupied or empty. Let p be the fraction occupied. An occupied patch empties at rate e. An empty patch is colonised at rate c times p, since the more patches are occupied, the more colonists there are. Then

dp/dt = c p (1 - p) - e p

and setting it to zero gives p* = 1 - e/c. That's positive only when c is larger than e. Below that, occupancy falls to zero from any start. The model assumes many identical patches, a colonist as likely to reach any one of them as any other, and patches that go extinct independently.

One thing I like about it: if the species is at equilibrium, a survey that finds 20 per cent of the patches occupied gives you c/e = 1.25 without your knowing c or e separately.

## Destroying habitat

Suppose a fraction D of the patches is destroyed, so colonists that land on them are lost. Then dp/dt = c p (1 - D - p) - e p, and the equilibrium is p* = 1 - D - e/c. The species persists only if c (1 - D) is larger than e, which is the same as D being smaller than 1 - e/c. So the fraction of patches that can be destroyed before the species is lost equals the fraction it occupied to begin with. A species that occupies 20 per cent of the patches, which is c/e = 1.25, is lost once 20 per cent are destroyed, with 80 per cent of the habitat still standing.

![Equilibrium fraction of patches occupied against the ratio of colonisation to extinction. Two curves, for intact habitat and for 30 per cent of patches destroyed, leave zero at c/e = 1 and at a larger value. Dots from a simulation of 200 patches follow the curves, apart from some below them near the thresholds.](figure:metapopulations-and-contagion "The Levins equilibrium for intact habitat and with 30 per cent of the patches destroyed. Dots are time-averaged runs of a stochastic simulation with 200 patches. Near each threshold chance extinctions pull them below the curve.")

Small losses are worse than they look. Destroy 10 per cent for the same species and p* = 1 - 0.1 - 0.8 = 0.1, so half the occupied patches are gone. Destroying patches at random removes only 10 per cent of the occupied ones directly, which is 0.02 of all patches. The other 0.08 goes because colonists keep landing on destroyed patches and are wasted. In general the equilibrium falls by exactly D, while the direct hit is D times the starting occupancy, so the multiplier is 1 divided by that occupancy, here 5. The rarer the species, the bigger the multiplier.

## The debt

The loss isn't immediate. When c (1 - D) is only a little below e, occupancy declines slowly. Take c/e = 1.25 and destroy a quarter of the patches. In the deterministic model the occupied fraction falls from 0.20 to 0.01 only after about 25 patch lifetimes, a lifetime being 1/e. The species is doomed and still present, unless chance ends the decline sooner in a finite number of patches.

How long depends on how close to the threshold you land. I stepped the equation forward for c/e = 1.25 from p = 0.20. At D = 0.1 the new equilibrium is 0.10 and occupancy covers 90 per cent of the fall in about 14 lifetimes. At D = 0.15 it's 19, and at D = 0.19 (equilibrium 0.01) about 30. At D = 0.2 exactly there's no equilibrium to settle on, and the equation reduces to dp/dt = -c p^2, so p = p0 / (1 + c p0 t) and the fall from 0.20 to 0.01 takes 76 lifetimes. For the same fall to 0.01, D = 0.3 takes about 16 and D = 0.4 about 9. Near the threshold the rate of approach is c (1 - D) - e in size, which goes to zero from both sides, so everything slows down together.

This delay is called an extinction debt. Tilman and colleagues (1994) used a model of several competing species to show that extinctions can come long after the destruction, and that the best competitors, which are the poorest colonisers, are among the first to go. Nee and May (1992) studied habitat destruction in the same kind of model. So counting the species in what remains of a habitat can overstate how many it will keep.

What I'd ask of a survey is how long ago the habitat was lost, in patch lifetimes. If a lifetime is decades, 25 of them is longer than anyone has been counting, and a species found at 20 per cent occupancy may be well above what its remaining habitat can support.

## The same structure in epidemics

Read patches as people, occupied as infected, extinction as recovery and colonisation as infection. The SIS epidemic, where people recover and can be infected again, is dI/dt = b I (1 - I) - g I, with b the infection rate and g the recovery rate. Its endemic level is I* = 1 - g/b, positive only when b/g is larger than 1, which is the condition R0 > 1. Immunise a fraction D of the population, so those people can no longer be infected, and I* = 1 - D - g/b. The disease dies out once D exceeds 1 - g/b, which is 1 - 1/R0, the familiar herd immunity threshold. Destroying habitat for a species and immunising people against a pathogen are the same operation in this model.

It assumes the immunity is perfect, though. If a vaccine protects a fraction E of those who get it, the coverage needed is (1 - 1/R0) / E. For R0 = 2 and E = 0.9 that's 0.56, not 0.50. For R0 = 15 (roughly what's quoted for measles) and E = 0.97 it's 0.96, and at E = 0.9 it's above 1, so vaccination alone can't reach it.

## When colonists only reach their neighbours

Back to the assumption I listed at the start, because it matters most. Put the patches on a square grid where colonists reach only the four nearest ones. A quick simulation (100 x 100 patches on a torus, each occupied patch emptying at rate 1 and colonising each neighbour at rate c/4, run to time 400 and averaged over the second half) gives this. At c/e = 1.5, where the Levins model says a third of the patches are occupied, the species dies out in all three runs. At c/e = 1.8 it persists at 0.23 occupancy against the formula's 0.44, and at c/e = 2 at 0.35 against 0.50. On the grid the threshold lies somewhere between 1.5 and 1.8, not at 1.

Destruction hurts more too. For c/e = 4, where the Levins model tolerates 75 per cent loss, intact habitat holds 0.72 occupancy (formula 0.75), but with 40 per cent destroyed it holds 0.18 where the formula says 0.35. Part of that is geometry. Remove patches at random from a square grid and the rest fall apart into separate clusters at about 41 per cent destroyed (0.593 of sites left is the site percolation threshold). I counted on a 200 x 200 grid: with 30 per cent destroyed, 98 per cent of the surviving patches are in one connected cluster; with 40 per cent it's 53 per cent; with 45 per cent, 6 per cent. A colonist can't cross a gap it can't reach, however high the colonisation rate.

Patches differ in size and distance too. Hanski and Ovaskainen (2000) showed that persistence then depends on the leading eigenvalue of a matrix built from patch areas and distances, which they called the metapopulation capacity, compared with a threshold set by the extinction and colonisation parameters.

People don't mix evenly either. Pastor-Satorras and Vespignani (2001) showed that for SIS epidemics on networks whose contact numbers follow a power law with exponent 3 or less, the epidemic threshold goes to zero as the network grows. I wouldn't read that as epidemics being unstoppable. It says 1 - 1/R0 depends on the mixing assumption, as the grid result does.

## Limits

Habitat is rarely lost at random, and the largest or most accessible patches often go first, which is worse than anything above. The figure's simulation has 200 patches, so near a threshold the species can vanish by chance when the equation says it should persist.

Occupancy is a number a survey can give, and in this model, with habitat lost at random, it's also the fraction of the patches the species can afford to lose. On a grid that second part stops being true.
