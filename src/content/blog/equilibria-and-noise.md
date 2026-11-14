---
title: "Equilibria, and what noise does to them"
date: 2026-09-14
summary: "An equilibrium is a state the rules leave unchanged. Stability, slow transients and random variation each change what that's worth, and a stochastic model answers with a distribution."
draft: false
---

An equilibrium is a state that the rules of a model leave unchanged. It's the easiest thing to calculate in a model and the easiest to misread.

## Finding it, and testing it

Take a population with density x, measured in units of its carrying capacity, and the Ricker rule

    x' = x exp(r (1 - x))

The rule comes from fisheries (Ricker 1954), and May (1976) showed how one-line rules like it go from a steady state to chaos as the growth rate rises. The fixed point is x = 1, which is easy: the exponent is zero there, so x stays at 1. From x = 0.5 and r = 1 the next values are 0.824, 0.983 and 0.9998, so the population approaches it and then sits on it. The approach is the transient, and the state it settles at is the equilibrium.

What's less obvious is whether it's stable, and that depends on the slope of the rule at that point. Near x = 1 a small deviation d is multiplied by 1 - r each step. At r = 1 the factor is 0, so a small deviation is removed in a single step, to first order. At r = 1.5 the factor is -0.5, so deviations shrink and swap sign each step. At r = 2.5 it's -1.5, so they grow. The equilibrium is stable for r below 2. At r = 2 it gives way to a cycle of period two, the period doubles again and again as r grows, and the behaviour becomes chaotic near r = 2.69. (That's chaos and not noise, since no randomness has gone in, and the difference matters below.) The same equation, with one number changed, gives a settled population, a regular cycle or something that looks random.

![The values the Ricker rule visits for growth rates from 0.5 to 3, after the first 600 steps: one value up to r = 2, then two, four, and a scatter.](figure:equilibria-and-noise "One equation, one number changed. Each dot is a density the rule visits once it has settled into its long-run behaviour.")

Stability in this sense concerns small deviations and says nothing about large ones. A run that has stopped moving may also only be slow. So I'd claim an equilibrium after solving for it, or after a convergence test run from more than one starting value (a model with two stable states gives different answers from different starts), and not because the plot looks flat.

How slow is slow? To first order a deviation shrinks by |1 - r| per step, so near r = 0 (and near r = 2) the factor is close to 1 and the settling takes a long time. Running the rule from x = 0.5 with r = 0.05, it takes 104 steps to bring the deviation down to 1 per cent of its starting size, and after 50 steps 14.5 per cent of it is still there. A 50-generation run at that growth rate would end well short of the equilibrium and look as though it had stopped. At r = 1.95 the same thing takes 74 steps, with the sign swapping each time. The first-order estimate for both is about 90 steps, which is the right order of magnitude and no better than that.

## What noise adds

Real populations don't follow the rule exactly. Births and deaths are discrete events, so a population that the rule expects to be 600 next generation won't be exactly 600. If the next size is a Poisson draw with mean 600, its standard deviation is about 24.5, so roughly 95 per cent of draws fall between 551 and 649.

A single run of a stochastic model is one draw from a distribution, so the answer is the distribution. Report the spread over many runs, and note that the standard error of an average over n runs is the standard deviation of one run divided by the square root of n. To halve the error you need four times as many replicates. With a standard deviation of 24.5 per run, 100 runs give a standard error of 2.4 on the mean. To tell apart two scenarios whose means differ by 5, at 5 per cent significance and 80 per cent power, you'd need about 377 runs of each. Since you choose the number of runs, a p-value from a simulation mostly tells you how many you chose, and I'd report the size of the difference and its spread instead.

The deterministic equilibrium becomes a cloud of states around it, wide where the stabilising pull is weak and narrow where it is strong. Here's a quick check. Take the Ricker rule with noise on the log scale, x' = x exp(r (1 - x) + 0.1 e), where e is a standard normal draw. Near x = 1 the deviations behave like a first-order autoregression with coefficient 1 - r, so the long-run standard deviation should be about 0.1 / sqrt(1 - (1 - r)^2). Simulating 200,000 steps gives 0.101 at r = 1 (predicted 0.100) and 0.167 at r = 0.2 (predicted 0.167), so a weak pull spreads the cloud out by a factor of about 1.7. At r = 1.9 the prediction is 0.23 and the simulation gives 0.19, which I put down to the rule curving away from its linear approximation. The lag-1 autocorrelation there is -0.84, so the series swings above and below 1 in turn. It looks like a cycle in the noise, though the deterministic cycle only starts at r = 2.

Extinction also becomes possible. With demographic noise a population of finite size will eventually reach zero, however stable the deterministic equilibrium looks. The time this takes grows very quickly with population size. Here's a simulation: next size drawn from a Poisson distribution with mean N exp(r (1 - N / K)), r = 1, starting at the carrying capacity K, 400 runs for each K. With K = 5 the median time to extinction is 37 generations. With K = 10 it's about 2000, and 99 per cent of the runs had gone extinct within 20,000 generations. With K = 15 only 10 per cent had, and with K = 20 none of the 400 had. For a large population, then, the long-lived distribution around the equilibrium is what one sees in practice, and the better description is a quasi-stationary distribution, not a point.

Noise also matters where a system has more than one stable state. Near the edge between two of them, random variation can carry the system across, and a run may flicker between the two for a long time. That's a more realistic picture than a clean jump at a threshold, and it is the subject of a later post.

## Equilibrium thinking outside ecology

Economics often reasons in terms of equilibria and ecology in terms of dynamics, and each is the right choice for some questions. The advice is the same in both: say whether you're describing a steady state or a transient, because a result that's true of the path to an equilibrium reads as an error to a reader who assumes you meant the end state.

The slope test isn't specific to ecology either. Take n firms choosing quantities, with price a - Q, where Q is total output, and no costs. Each firm's best reply to the others is q = (a - their total) / 2, and the equilibrium has every firm producing a / (n + 1). Suppose all firms reply at once to what the others did last round. A small deviation from equilibrium is then multiplied by -(n - 1) / 2 each round. With 2 firms that's -0.5 and the deviation dies away. With 3 it's -1, and it flips sign for ever. With 4 it's -1.5, the same as the Ricker rule at r = 2.5. Take a = 100, so the equilibrium is 20 per firm, and start every firm at 21: firm 1 then produces 18.5, 22.25, 16.63, 25.06 and 12.41 in the next rounds. The equilibrium is still there, it's just not where this process goes. Whether firms behave like this is a separate question. The point is that "there is an equilibrium" and "it's stable under this adjustment rule" are two statements.

## What I check

- Is the equilibrium solved for, or only observed?
- Is it stable, and for which parameter values?
- How long is the transient, compared with the length of the run?
- If the model is stochastic, how many replicates, and what is the spread?
- Does noise add something qualitative, such as extinction or switching, or only blur?
