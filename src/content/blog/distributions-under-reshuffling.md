---
title: "Distributions under reshuffling: mating, and changing parties"
date: 2026-11-14
summary: "Mating mixes parental values and voters move between parties. Both are reshuffling of a distribution, with the same questions: what is conserved, what relaxes, and what can be observed."
draft: false
---

Some changes to a distribution do not come from its members changing. Offspring take values from two parents, and voters move from one party to another. In both cases the group is reshuffled, and it is useful to ask the same questions of each: what stays fixed, what relaxes, how fast, and what can actually be seen.

## Mating

In quantitative genetics, a standard simplification is the infinitesimal model, which goes back to Fisher in 1918. A trait depends on very many genes, each with a small effect. An offspring's value is then the average of its parents' values plus a random deviation, the segregation deviation, whose variance is half of the genic variance, meaning the variance the population would show if there were no association among its genes.

If V is the variance in the population and V0 is the genic variance, then with random mating and no inbreeding the variance in the next generation is

    V' = V / 2 + V0 / 2

Half comes from the spread of the parental averages, half from segregation. The fixed point is V = V0, and each generation the variance moves half of the way towards it. The mean, left alone by mating, stays where it is.

This also explains why selection narrows a population's variance by more than it removes directly. Selection builds up an association among genes, the Bulmer effect, and reshuffling dissolves that association at a steady rate and restores the variance. So the variance is a fast variable that returns to its fixed point within a few generations, and the mean is a slow variable that moves only as quickly as selection pushes it.

## Changing parties

Write the vote shares at one election as a vector s, and let P be a matrix whose entry in row i and column j is the share of party i's earlier voters who vote for party j now. Then the next shares are s multiplied by P. Total mass is conserved, since shares sum to one, as population size is conserved in the mating example. If P stayed fixed, the shares would typically converge to a stationary distribution, which is the leading left eigenvector of P, and the speed of convergence would be set by the size of the second-largest eigenvalue.

P does not stay fixed, and an election is not repeated many times. So this is a way of thinking, not a forecast. It is nevertheless a useful way, because it asks the right questions about what a change in shares means.

## What you can observe

Here the two examples differ. In breeding experiments the parents and offspring can be tracked individually. In elections, what is observed are the totals at two dates, not the matrix P.

Suppose party A has 60 per cent and party B has 40 per cent, and at the next election they have 55 and 45. One account is that 5 points moved from A to B and nothing moved back. Another is that 15 points moved from A to B and 10 moved back. The totals are identical and the gross flows are quite different.

![Two flow diagrams with the same bars: party A falls from 60 to 55 and party B rises from 40 to 45. In the upper one, 5 points move from A to B and none move back. In the lower one, 15 points move from A to B and 10 move back.](figure:distributions-under-reshuffling "The same two sets of totals can come from 5 points moving one way, or from 15 points one way and 10 back. Only the totals are observed.")

Many matrices P are consistent with the same pair of totals, a standard case of the ecological inference problem, which is the problem of recovering behaviour at the individual level from aggregate figures. Panel surveys that follow the same people are the remedy, with their own sampling problems.

Ecology meets the same thing. Net population change hides immigration and emigration, and the gross flow is seen by marking individuals and following them.

## What carries over

1. A conserved quantity: which total does reshuffling leave unchanged, and which does it change?
2. A fixed point: where does the distribution settle if the rule is repeated?
3. A speed: how many steps does it take, and is that long compared with the time over which the rule itself holds?
4. A view of the flows: do the data show the movements, or only the net result?

The mean and the variance of a distribution are often shaped by different processes at different speeds, and the net change in a total can conceal a great deal of movement. Both points are easy to lose when a model reports only one summary.
