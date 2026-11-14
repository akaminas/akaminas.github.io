---
title: "Timescales decide what a model can show"
date: 2027-01-05
summary: "A run shows a process only if the process has time to act inside it. Work out how long each process takes and compare it with the length of the run before reading a result."
draft: true
---

A simulation shows a process only if the process has time to act inside the run. That sounds obvious, and it is forgotten often enough to deserve a post of its own.

## The rule

For each process in a model, work out the time it takes to act and compare it with the length of the run. Do this before choosing the run length, and again before reading a null. If the process takes longer than the run, a null result is a statement about the run and not about the process.

## Fast and slow variables

Many models contain a fast variable and a slow one. Take a simple model of a trait in a population. The variance of the trait settles quickly, because mating restores it: each generation it moves half of the way towards its fixed point, so the gap shrinks by a factor of e about every 1.4 generations. The mean moves by the selection gradient times the variance. With a gradient of 0.1 and a variance of 0.006, an illustration and not a measured quantity, the mean moves by 0.0006 per generation, and travelling 0.6 takes about a thousand generations.

![Two curves on one time axis, in generations on a log scale. The variance reaches its fixed point within about ten generations. The mean has barely moved by generation 30 and has moved by about 0.6 by generation 1000.](figure:timescales "The post's model, computed. At generation 30 the variance has settled and the mean has shifted by less than 0.02. At generation 1000 the mean has shifted by about 0.6.")

A run read at generation 30 sees a settled variance and a mean that has hardly moved. Read at generation 1000, the same model has moved the mean by about 0.6. Because the variance is fast, it can be treated as settled while the mean moves, which removes a dimension from the model. The same comparison tells you how long the run must be to see the mean move at all.

## Where it fails

The separation fails when the fast variable slows down. Near a tipping point the time a system takes to recover from a small push grows without bound, which is why slowing recovery is used as an early-warning signal. A model that assumed an instant return will then be wrong exactly where the interesting behaviour begins.

## Two quantities that are really one

A common mistake concerns the length of the run and the per-step rates. Suppose a model runs on a fixed history, for example a branching schedule given in advance. Stretching the run over more steps, with every per-step rate unchanged, applies more selection, growth and mutation over the same stretch of history. The horizon and the per-step rates form one quantity, and changing one without the other changes the dynamics. If you refine the time step, rescale the rates by the same factor.

Not everything can be rescaled in this way. A parameter that enters a model in two places may satisfy only one of the conditions, and no single rescaling serves both. Say which quantities were rescaled and which were not.

## A null is about the horizon

Suppose two daughter lineages can only separate where selection is disruptive, and the time to separate is known. A run shorter than that time will show no separation. The null is real, and it says nothing about the mechanism. The same applies to slow competition: the outcome can take longer to appear than a run allows, and a configuration that needs many steps to settle can be reported as having no stationary state because the run was stopped first.

A run that has stopped moving may simply be slow. A result should name the time at which it was read.

## Outside ecology

Mismatched timescales are a common cause of policy trouble. A fish stock can take decades to recover from a depleted state, a budget cycle lasts a year, and an election cycle a few. A discount rate sets how far into the future a cost is allowed to count. In each case the question is the same as in the model: does the process have time to act inside the horizon used to judge it?

## A habit

Before a grid of runs, write a short table with a row for each process: its time, the length of the run, and the ratio. If a ratio is far from where you need it, change the design. The table takes minutes. A grid of runs that was too short to show anything takes days.
