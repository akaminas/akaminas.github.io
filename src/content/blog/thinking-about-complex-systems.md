---
title: "How to think about modelling a complex system"
date: 2026-08-14
summary: "My notes on building a model: write the question first, pick the kind of model, list the states and the feedback loops, and decide before you start what finished means."
draft: false
---

A model is a short list of rules that stands for a system. It's built to answer one question, so it keeps what the question needs and leaves out the rest. Most of the trouble in modelling comes from skipping that sentence.

## Begin with the question

Write the question down in one sentence, with a date. A question that drifts without anyone noticing costs a rewrite of the introduction and the discussion, and sometimes of the model. A model is judged against its question. One that holds everything is hard to check, because every output then depends on many inputs.

A good question names an output, a horizon and something to compare against. "Would a 10 per cent cut in the catch let the stock recover to half its unfished size within 15 years?" can be answered yes or no by a model, and it says what to put in and what to read out. "How does the fishery work?" can't, and a model built for it will keep growing.

## One idea, four kinds of model

The same idea can be expressed in four ways, and it helps to know which one you are using.

Take the idea that crowding lowers growth.

| Kind | Form |
|---|---|
| Verbal | Crowding lowers growth. |
| Analytical | N' = N R exp(-N / K), with an equilibrium at N* = K ln R |
| Simulation | Draw the next population size from a Poisson distribution with that mean, many times |
| Statistical | Regress ln(N' / N) on N. The slope estimates -1 / K and the intercept estimates ln R |

The kinds combine, and most working models do. The analytical form gives the equilibrium and the way to test the code, the simulation adds noise, and the statistical form links parameters to data.

It is worth pushing numbers through all four once. Take R = 2 and K = 100. The equilibrium is N* = 100 x ln 2 = 69.3. That is not K: the population sits well below the parameter called the carrying capacity. Iterating the map from N = 10 settles on 69.3. Turn R up and the fixed point stays stable until ln R reaches 2, that is R = e^2 = 7.39. At R = 7 it still settles (on 194.6). At R = 7.5 it flips into a two-year cycle between 171.6 and 231.4, at R = 12 between 73.7 and 423.3, and at R = 15 I found no repeating pattern in the eight steps I looked at. So "the population settles" isn't a claim about the model until you have said for which R.

The simulation gives the test. With R = 2, K = 100 and Poisson draws, a run of 2000 years has a mean of 68.7 after the first 100, close to 69.3 and not equal to it. (The mean of a noisy nonlinear map needn't sit at the deterministic fixed point.) If the mean had been 50 I would have gone looking for a bug. Then the statistical form: simulate 30 years of counts from a start of 50, regress ln(N' / N) on N, and read off K and R. In 2000 such data sets, the estimate of K had a median of 94, with 5th to 95th percentiles of 67 to 141, and the estimate of R a median of 2.08 with 1.62 to 2.76. Thirty points don't pin K down, and the reason is easy to see: the series wander only between about 53 and 86, so the slope is estimated from a narrow range of N.

## Generality, realism and precision

Richard Levins argued in 1966 (The strategy of model building in population biology) that a model of a population cannot maximise generality, realism and precision at once. Improving two usually costs the third. His three strategies map roughly onto three of the kinds above. A verbal or qualitative model keeps generality and realism and gives up precision. An analytical model keeps generality and precision and gives up realism. A detailed simulation is usually built for one system, so it keeps realism and precision and gives up generality. Knowing which one you have given up is part of describing the model honestly. The same split shows up outside ecology: a supply and demand diagram sits at the analytical end, and a microsimulation of one country's tax system at the other.

![A triangle with generality at the top, realism at the bottom left and precision at the bottom right. Verbal models sit on the left side, analytical models on the right side and simulations on the bottom side, each between the two things it keeps.](figure:thinking-about-complex-systems "Each kind of model keeps two of the three and gives up the third. The positions are schematic, not measured.")

## States, parameters and loops

A state variable changes during a run. A parameter stays fixed during it. Which is which is a choice, and a different choice gives a different model. If a quantity you treat as fixed would in fact drift, it needs a rule of its own. Fishing effort is the standard case. Fix it, and you are asking what happens at this effort. Let it respond to profit, and you have a different model with a loop the first one lacked: more fish, more profit, more effort, fewer fish.

Then look for loops. A chain of links in which a change comes back to its own source is a feedback loop, and its sign is the product of the signs of its links. Density raises crowding (plus), crowding lowers growth (minus), growth raises density (plus): the product is minus, and the density settles. A loop whose signs multiply to a plus runs away or locks in, whether it has two plus links or two minus links. Write the signs down before naming the loop, since the sign of a link depends on how the quantities are defined.

Two plus links give the runaway: more users make a technology more useful, and a more useful technology gets more users. Two minus links give the lock-in: two species that each lower the other's growth. Whether that loop does lock in depends on how strong the two links are compared with each species' own self-limitation, which is a number and not a sign. The fishing loop has two plus links and one minus, so it is a minus loop. If the fleet is slow to respond, I'd expect it to overshoot and cycle rather than settle smoothly.

## Scale

If one process is much faster than another, the fast one settles to a value set by the slow one, and it can be treated as already settled. This is a common way to shrink a model without damaging it. It stops working when the fast variable slows down, as it does near a threshold.

What counts as fast is easy to get wrong. A small test: let a fast variable x relax towards 1 / (1 + N / 50) at rate a, and let a slow variable N change as N' = N (0.5 x - 0.2), starting at N = 5. Both versions settle at N = 75. The reduced model replaces x by 1 / (1 + N / 50) and drops its equation. Near the equilibrium the slow variable relaxes at a rate of 0.12 per unit time. Run to t = 60, the largest gap between the full and reduced models is 0.09 for a = 50, 0.92 for a = 5, 5.0 for a = 1 and 22 for a = 0.3. At a = 0.1, which is about the same rate as the slow variable's, the full model overshoots to 193, more than twice the equilibrium, while the reduced one never exceeds 75. So "fast" means fast compared with 0.12 here, and not compared with 1.

## Mechanism or shape

A mechanistic term stands for a process that happens. A phenomenological term is a curve chosen because it has about the right shape. Most models contain both. The shape needs a reason written next to it, because a curve chosen freely is a common place for wrong results to enter.

Here is how easily it goes wrong. I generated 12 points between x = 0.5 and x = 5 from the saturating curve 10 x / (4 + x), with normal noise of standard deviation 0.4, and fitted two saturating shapes by least squares: a x / (h + x), and A (1 - exp(-x / c)). Both fit about equally, with residual root mean square errors of 0.353 and 0.360. At x = 5 they agree at 5.4. At x = 20 the first predicts 8.1 and the second 6.6, and the ceilings are 9.7 and 6.6. In five data sets made this way, the two predictions at x = 20 differed by 1.5 to 2.0, and the fits differed in error by 0.011 at most. The first curve is the one the data came from, so it extrapolates better here. With real data you don't know that, and the fit won't tell you.

## Decide when to stop

A model needs a stopping rule that is written before the results are known. "Does it reproduce this data set?" is a poor rule, because there is always another data set. It belongs to the results of a finished model, not to its completion. A better rule is a list of checkable conditions: no mechanism left with an open question, a statement short enough that a reader can learn what the model is from it, tests that cover the assembled model and not only the pieces, and an independent implementation that agrees.

For the tests I'd use limits with known answers. Set the growth rate to zero and check that nothing changes. Set the noise to zero and check that the run lands on the equilibrium the algebra gives. For the independent implementation, write it twice, in different languages or by different people, and treat every disagreement as a bug in one of them. Finding those is the point of doing it.

## A short checklist

1. Fix the question in one sentence.
2. Choose the kind of model and say what has been given up.
3. List the states and the parameters, and say why.
4. Draw the loops and write down their signs.
5. Compare the timescales and settle the fast ones.
6. Give a reason for every shape you chose.
7. Check the code against the equations, then run, then read the output against the question.
8. Stop when the conditions you wrote at the start are met.

None of this is specific to ecology. The same questions apply to a model of almost any system.
