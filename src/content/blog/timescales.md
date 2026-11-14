---
title: "Timescales decide what a model can show"
date: 2027-01-05
summary: "A run shows a process only if the process has time to act inside it. Compute the time of each process, set it against the length of the run, and do so before reading a result."
draft: true
---

A simulation shows a process only if the process has time to act inside the run. That sounds obvious, and it is forgotten often enough that it is worth a post of its own.

## The rule

For each process in a model, work out the time it takes to act, and compare it with the length of the run. Do this before choosing the run length, and again before reading a null. If the process time is longer than the run, a null result is a statement about the run and not about the process.

## Fast and slow variables

Many models contain a fast variable and a slow one. In a simple model of a trait in a population, the variance of the trait settles quickly, because mating restores it: each generation it moves half of the way towards its fixed point, so it relaxes in roughly 1.4 generations. The mean moves by the selection gradient times the variance. With a gradient of 0.1 and a variance of 0.006, an illustration and not a measured quantity, the mean moves by 0.0006 per generation, and travelling 0.6 takes about a thousand generations.

Because the variance is fast, it can be treated as settled while the mean moves, which removes a dimension from the model. The same comparison also tells you how long the run must be to see the mean move at all.

## Where it fails

The separation fails when the fast variable slows down. Near a tipping point the time a system takes to recover from a small push grows without limit, which is why slowing recovery is used as an early-warning signal. A model that assumed an instant return will then be wrong exactly where the interesting behaviour begins.

## Two quantities that are really one

A common mistake concerns the length of the run and the per-step rates. Suppose a model runs on a fixed history, for example a branching schedule given in advance. Stretching the run over more steps, with every per-step rate unchanged, applies more selection, growth and mutation over the same stretch of history. The horizon and the per-step rates form one quantity. Changing one without the other changes the dynamics. If you refine the time step, rescale the rates by the same factor.

Not everything can be rescaled in this way. In one model I worked with, heritability could not be, because it enters in two places and no single rescaling satisfies both. The honest approach is to say which quantities were rescaled and which were not.

## A null is about the horizon

If two daughter lineages can only separate where selection is disruptive, and the time to separate is known, a run shorter than that time will show no separation. The null is real and says nothing about the mechanism. The same applies to slow competition: the outcome of competition can take longer to appear than a run allows, and a configuration that needs many steps to settle can be reported as having no stationary state because the run was stopped first.

A run that has stopped moving may simply be slow. A result should name the time at which it was read.

## Outside ecology

Mismatched timescales are a common cause of policy trouble. A fish stock can take decades to recover from a depleted state, a budget cycle lasts a year, and an election cycle a few. A discount rate sets how far into the future a cost is allowed to count. In each case the question is the same as in the model: does the process have time to act inside the horizon used to judge it?

## A habit

Before a grid of runs, write a short table: each process, its time, the length of the run, and the ratio. If a ratio is far from where you need it, change the design. The table takes minutes and has saved me days.
