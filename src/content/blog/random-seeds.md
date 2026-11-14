---
title: "What a random seed does and does not do"
date: 2027-05-25
summary: "A seed makes a stochastic run repeatable, which is a different thing from making it right. Record it, use replicates, give parallel runs separate streams, and share random numbers when comparing."
draft: true
---

A stochastic simulation draws its random numbers from a generator, and a generator started from the same seed produces the same numbers. Given its seed, a run is deterministic. That is useful, and it is easy to take for more than it is.

## What a seed gives you

A seed makes a run repeatable. The same code, seed, generator and software give the same output, so a colleague can reproduce a number and you can step through a rare event again. Record three things with every result: the seed, the generator (Mersenne Twister, PCG64 or another) and the version of the software. The version matters because a seed fixes the stream of numbers, not what a program does with them. R 3.6.0 changed the default way sample() turns random numbers into a draw, so the same seed gives a different sample after that release unless the old method is asked for. Changing the order of draws in your own code does the same: one extra draw early on shifts everything after it.

## What a seed does not give you

A seed does not make a result likely to be right. One seed is one draw from the distribution of outcomes.

Take a noisy population rule, x' = x exp(r (1 - x) - h + s e), where e is a standard normal draw each generation, r = 2.5 and s = 0.3. The term h is a loss per generation on the log scale, a harvest for instance. A run starts at x = 1, discards 50 generations and averages the density over the next 100. Compare h = 0 with h = 0.05: the estimate is the mean density at h = 0 minus the mean at h = 0.05, so a positive difference means the harvest lowers the density. Averaging 20,000 experiments gives a long-run difference of 0.020.

Now repeat the experiment 200 times, giving each setting its own seed. The estimates have a standard deviation of 0.020, the same size as the thing being estimated. They run from -0.030 to 0.086, and 29 of the 200 have the wrong sign. Someone who ran each setting once would, about one time in seven, conclude that the harvest raised the density.

The remedy is replicates, with the spread reported alongside the mean.

## Parallel runs

Replicates run on several processors need a separate stream each. Starting every worker from the same seed gives the same run many times over. Seeds 1, 2, 3 usually work, but nothing guarantees that the streams do not overlap or correlate, and it depends on the generator. Use a method built for the purpose, such as SeedSequence.spawn in NumPy or the L'Ecuyer-CMRG generator with the stream functions in R's parallel package.

## Common random numbers

When the question is the difference between two settings, give both the same random numbers. The variance of a difference is Var(A) + Var(B) - 2 Cov(A, B), so if the two runs share their shocks and respond to them alike, the covariance is positive and the variance falls.

![Two rows of dots on one axis, each dot an estimate of the same difference from a repeated experiment. With independent random numbers the dots are spread from below zero to well above the long-run difference. With common random numbers they sit in a narrow band around it.](figure:random-seeds "The same 200 experiments, with independent random numbers and with common random numbers. The estimate is mean density at h = 0 minus mean density at h = 0.05. The long-run difference is the average of 20,000 experiments with common random numbers.")

With common random numbers the 200 estimates have a standard deviation of 0.005, from 0.003 to 0.035, and none has the wrong sign. The variance is about sixteen times smaller, so independent numbers would need about sixteen times as many experiments for the same precision. How much is gained depends on the model and the quantity compared, and it is not guaranteed. The shocks also have to be used for the same purpose in both runs, drawn in the same order, or the sharing is lost. Each setting's own mean is no more precise than before, but the difference between them is.

For the figure, the record is: generator mulberry32, seeds 1 to 200 and 1001 to 1200 for the independent experiments and 2001 to 2200 for the common ones, run in Node 26.13.

## The seed you wanted

With estimates ranging from -0.030 to 0.086, a seed can be found for almost any conclusion about the difference. Choosing the one that gives the answer you hoped for is one of the forking paths that a later post takes up, and it leaves no trace in the results.

- Record the seed, generator and software version with each result.
- Use replicates and report the spread, not a single seed.
- Give parallel workers streams made by a method designed for it.
- Use common random numbers when comparing settings, with the draws in the same order.
- Choose the seeds in advance, and keep every run.
