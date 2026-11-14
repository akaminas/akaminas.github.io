---
title: "Reshuffling, in genetics and in elections"
date: 2026-11-14
summary: "Mating mixes parental values and voters move between parties. Both reshuffle a distribution, and the same questions apply: what's conserved, what relaxes, how fast, and what you can actually observe."
draft: false
---

Some changes to a distribution don't come from its members changing. Offspring take their values from two parents, and voters move from one party to another. In both cases the group is reshuffled, and I find it useful to ask the same questions of each: what stays fixed, what relaxes, how fast, and what can actually be seen.

## Mating

In quantitative genetics the standard simplification is the infinitesimal model, which goes back to Fisher (1918). A trait depends on very many genes, each with a small effect. An offspring's value is then the average of its parents' values plus a random deviation, the segregation deviation, whose variance is half of the genic variance. By genic variance I mean the variance the population would show if there were no association among its genes. Barton, Etheridge and Véber (2017) give a modern definition and derivation.

If V is the variance in the population and V0 is the genic variance, then with random mating and no inbreeding the variance in the next generation is

    V' = V / 2 + V0 / 2

Half comes from the spread of the parental averages (an average of two has half the variance of one), half from segregation. The fixed point is V = V0, and each generation V moves half of the way towards it. The mean, which mating leaves alone, stays where it is.

A quick check of how fast. Start with V = 0.6 V0, as if selection had just trimmed the variance. The next generations give 0.8, 0.9, 0.95 and 0.975, so after five generations V is within 1.3 per cent of V0. The gap halves every time, so a gap of 40 per cent of V0 is under 1 per cent after six generations.

This also explains why selection narrows a population's variance by more than it removes directly. Selection builds up an association among genes (the Bulmer effect, after Bulmer 1971), and reshuffling dissolves that association at a steady rate and restores the variance. Here's a toy version. Suppose each round of selection leaves a fraction k of the variance, so V' = kV / 2 + V0 / 2. The fixed point moves to V0 / (2 - k). With k = 0.8 that's 0.83 V0, so the variance sits about 17 per cent below V0 for as long as selection goes on, and with k = 0.5 it sits at 0.67 V0. The real calculation has heritability in it, so I'd treat these numbers as the logic and not as predictions. Either way the variance is a fast variable that returns to its fixed point within a few generations, and the mean is a slow one that moves only as quickly as selection pushes it. (The textbook rule for the push is R = h^2 S: the response per generation is the heritability times the selection differential, so with h^2 = 0.4 and a differential of 10 units the mean moves 4.)

All of this needs random mating, no inbreeding, no linkage worth speaking of, very many loci of small effect, and a population large enough that V0 doesn't change. When the population is small, drift removes genic variance at about 1/(2N) of it per generation, which is 1 per cent a generation for N = 50, so the fixed point itself creeps down. Inbreeding and mates who resemble each other both change the recursion, and I wouldn't use V / 2 + V0 / 2 for either.

## Changing parties

Write the vote shares at one election as a vector s, and let P be a matrix whose entry in row i and column j is the share of party i's earlier voters who vote for party j now. The next shares are s multiplied by P. Total mass is conserved, since shares sum to one, just as population size is conserved in the mating example. If P stayed fixed, the shares would typically converge to a stationary distribution, the leading left eigenvector of P, and the speed of convergence would be set by the size of the second-largest eigenvalue.

P doesn't stay fixed, and an election isn't repeated many times. So this is a way of thinking, not a forecast. It's still useful, because it asks the right questions about what a change in shares means.

## What you can observe

Here the two examples differ. In breeding experiments the parents and offspring can be tracked individually. In elections what you observe is the totals at two dates, not the matrix P.

Suppose party A has 60 per cent and party B has 40 per cent, and at the next election they have 55 and 45. One account is that 5 points moved from A to B and nothing moved back. Another is that 15 points moved from A to B and 10 moved back. The totals are identical and the gross flows are quite different.

![Two flow diagrams with the same bars: party A falls from 60 to 55 and party B rises from 40 to 45. In the upper one, 5 points move from A to B and none move back. In the lower one, 15 points move from A to B and 10 move back.](figure:distributions-under-reshuffling "Same totals, two stories: 5 points move from A to B and none come back, or 15 move one way and 10 return. All you observe is the totals.")

Many matrices P are consistent with the same pair of totals. This is a standard case of the ecological inference problem, which is recovering behaviour at the individual level from aggregate figures, and Robinson (1950) is the classic warning about it. Panel surveys that follow the same people are the remedy, with their own sampling problems.

How much room is there? If x points go from A to B and y from B to A, the totals only say x - y = 5. And y can't exceed the 40 points B started with, so x can't exceed 45. Anything from 5 to 45 points leaving A fits the two totals. Duncan and Davis (1953) built a method on bounds of this kind, and with results for many districts the bounds can get much tighter.

It matters, because the two accounts behave differently when you run them forward. Take each as a matrix P. In the first, 55/60 of A's voters stay and all of B's do. Its second eigenvalue is 0.917, and the only stationary distribution has B holding everything. In the second, a quarter of each party's voters switch every time, the second eigenvalue is 0.5 and the stationary distribution is 50/50. They agree on the election we saw. At the next one A gets 50.4 under the first and 52.5 under the second, and five elections after the 55/45 one it's 35.6 against 50.2 (this is plain arithmetic on the two matrices, repeated). Same totals now, different futures, and the totals can't say which one you're in.

Even P is an average. Say a third of voters are movers who switch with probability 0.75 at every election and the other two thirds never switch. The overall switching rate is 0.25, the same as if everyone switched with probability 0.25. Two elections on, the share who sit on the other side from where they started is 0.125 in the first case and 0.375 in the second (2s(1 - s) for a voter with switching probability s, averaged over voters). Panel data can separate the two. Totals can't.

Ecology meets the same thing. Net population change hides immigration and emigration, and the gross flow is seen by marking individuals and following them. A population that holds at 200 while 40 individuals leave and 40 arrive each year is turning over 20 per cent a year, and an individual stays for 5 years on average (200 divided by 40). A closed population that doesn't move at all would show the same flat line.

The labour market is a case I like. Net employment change hides job creation and destruction. Davis and Haltiwanger (1992) measured both in US manufacturing plants and found that each was large next to the net change.

## What carries over

Speed is the question I'd least like to skip, because the answer has to be compared with how long the rule itself holds. The variance in the mating example closes half the gap each generation, which is quick. The first voting matrix above halves its distance to the stationary distribution in about eight elections (ln 0.5 / ln 0.917 = 7.97). At one election every four years that's around 32 years, and I doubt any voting rule holds that long. A fixed point that takes that long to approach says little about the next few elections.

The mean and the variance of a distribution are often shaped by different processes at different speeds, and a net change in a total can conceal a great deal of movement. Both points are easy to lose when a model reports only one summary.
