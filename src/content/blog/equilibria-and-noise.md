---
title: "Equilibria, and what noise does to them"
date: 2026-09-14
summary: "An equilibrium is a state the rules leave unchanged. Stability, slow transients and random variation each change what that statement is worth, and a stochastic model answers with a distribution."
draft: false
---

An equilibrium is a state that the rules of a model leave unchanged. It is the easiest thing to calculate in a model and the easiest to misread.

## Finding it, and testing it

Take a population with density x, measured in units of its carrying capacity, and the Ricker rule

    x' = x exp(r (1 - x))

At x = 1 the exponent is zero, so x stays at 1. That is the equilibrium. From x = 0.5 and r = 1 the next values are 0.824, 0.983 and 0.9998, so the population approaches it and then sits on it. The approach is the transient, and the state it settles at is the equilibrium.

Whether the equilibrium is stable depends on the slope of the rule at that point. Near x = 1 a small deviation d is multiplied each step by 1 - r. At r = 1 the factor is 0, so a small deviation is removed in a single step, to first order. At r = 1.5 the factor is -0.5, so deviations shrink and swap sign each step. At r = 2.5 it is -1.5, so they grow. The equilibrium is stable for r below 2. At r = 2 it gives way to a cycle of period two, the period doubles again and again as r grows, and the behaviour becomes chaotic near r = 2.69. The same equation, with one number changed, gives a settled population, a regular cycle or something that looks random.

![The values the Ricker rule visits for growth rates from 0.5 to 3, after the first 600 steps: one value up to r = 2, then two, four, and a scatter.](figure:equilibria-and-noise "One equation, one number changed. Each dot is a density the rule visits once it has settled into its long-run behaviour.")

Stability in this sense concerns small deviations and says nothing about large ones. A run that has stopped moving may also only be slow, so claim an equilibrium after solving for it or after a convergence test, not because the plot looks flat.

## What noise adds

Real populations do not follow the rule exactly. Births and deaths are discrete events, so a population that the rule expects to be 600 next generation will not be exactly 600. If the next size is a Poisson draw with mean 600, its standard deviation is about 24.5, so roughly 95 per cent of draws fall between 551 and 649.

Noise has three consequences.

A single run of a stochastic model is one draw from a distribution, so the answer is the distribution. Report the spread over many runs, and note that the standard error of an average over n runs is the standard deviation of one run divided by the square root of n. To halve the error you need four times as many replicates.

The deterministic equilibrium becomes a cloud of states around it, wide where the stabilising pull is weak and narrow where it is strong.

Extinction also becomes possible. With demographic noise, a population of finite size will eventually reach zero, however stable the deterministic equilibrium looks. The time this takes grows very quickly with population size, so for a large population the long-lived distribution around the equilibrium is what one sees in practice. The better description is a quasi-stationary distribution, not a point.

Noise also matters where a system has more than one stable state. Near the edge between two of them, random variation can carry the system across, and a run may flicker between the two for a long time. That is a more realistic picture than a clean jump at a threshold, and it is the subject of a later post.

## Equilibrium thinking outside ecology

Economics often reasons in terms of equilibria and ecology in terms of dynamics, and each is the right choice for some questions. The advice is the same in both: say whether you are describing a steady state or a transient, because a result that is true of the path to an equilibrium reads as an error to a reader who assumes you meant the end state.

## What I check

- Is the equilibrium solved for, or only observed?
- Is it stable, and for which parameter values?
- How long is the transient, compared with the length of the run?
- If the model is stochastic, how many replicates, and what is the spread?
- Does noise add something qualitative, such as extinction or switching, or only blur?
