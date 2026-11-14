---
title: "What a random seed does and does not do"
date: 2027-05-25
summary: "A seed makes a stochastic run repeatable, which isn't the same as right. Notes on replicates, separate streams for parallel runs, sharing random numbers when you compare, and not choosing the seed."
draft: true
---

A stochastic simulation takes its random numbers from a generator, and a generator started from the same seed gives the same numbers every time. So given its seed a run is deterministic. That's useful, and I think it's easy to take it for more than it is.

## What a seed gives you

Repeatability. Same code, seed, generator and software give the same output, so someone else can reproduce your number and you can step through a rare event again. I'd write down three things with every result: the seed, the generator (Mersenne Twister, PCG64, whichever it is) and the software version. The version matters because the seed fixes the stream of numbers, not what a program does with them. R 3.6.0 changed the default way sample() turns random numbers into a draw, so after that release the same seed gives a different sample unless you ask for the old method. Your own code does the same if you change the order of draws: one extra draw early on shifts everything after it.

Even the repeatability has conditions. If several threads take numbers from one shared generator, each gets whatever happens to come next, so the split changes with the timing from run to run and the seed no longer fixes the result. Floating-point sums depend on the order of the additions, so a different number of processors, or a library that reduces in a different order, can change the last digits, and in a chaotic model a lot more than that. If the seed comes from the clock or the operating system, print it. Otherwise it's gone when the run ends.

## What a seed doesn't give you

A right answer. One seed is one draw from the distribution of outcomes.

The example I'll use is a noisy population rule, x' = x exp(r (1 - x) - h + s e), where e is a standard normal draw each generation, r = 2.5 and s = 0.3. The h is a loss per generation on the log scale, a harvest say. A run starts at x = 1, throws away 50 generations and averages the density over the next 100. The estimate is the mean density at h = 0 minus the mean at h = 0.05, so a positive number means the harvest lowers the density. Averaging 20,000 experiments gives a long-run difference of 0.020.

Now repeat the experiment 200 times, each setting with its own seed. The estimates have a standard deviation of 0.020, the same size as the thing being estimated. They run from -0.030 to 0.086, and 29 of the 200 have the wrong sign. Run each setting once and about one time in seven you'd conclude that the harvest raised the density.

So you need replicates, with the spread reported next to the mean. How many? With a standard deviation of 0.020 per experiment, the mean of n experiments has a standard error of 0.020 / sqrt(n). For a 95 per cent interval of plus or minus 0.005 around the difference that's (1.96 x 0.020 / 0.005)^2, about 62 experiments. The sign settles much sooner. For each n, a quick simulation drew 4,000 sets of n independent experiments and counted how often the mean of a set was negative: 14 per cent of the time for n = 1, 6 per cent for 2, 3.5 per cent for 3, 2 per cent for 4, 1 per cent for 5 and 0.2 per cent for 8. A handful of replicates gives the direction of this effect, and it takes about sixty to say how big it is.

Seeds are fragile in another way. In the same model, one unused draw before the run (what happens when a new line of code consumes a number) changes the estimate for h = 0 from 1.0205 to 1.0006 with seed 1. Over 500 seeds the change has a standard deviation of 0.019. That's what two unrelated seeds would give: one run's estimate has a standard deviation of 0.014, and the difference of two independent ones is 0.014 x sqrt(2). So editing the code can move a result as far as changing the seed does, and a fixed seed is still one draw.

Replicates have a limit too. They shrink the Monte Carlo error, the part that comes from the random numbers, and say nothing about the parameter values or the form of the model. An interval from 200 replicates describes the simulator, not the world. A cheap check that you have enough is to split them into two halves and see whether the two means agree within their standard errors.

The mean can also describe no run at all. In an epidemic model on a network, or a population model with a risk of extinction, some runs die out early and others take off, and the average of the two is a size that no run reaches. There the share of runs that take off, and the size of those that do, are the results.

## Parallel runs

Replicates on several processors need a separate stream each. Start every worker from the same seed and you get the same run many times over. Seeds 1, 2, 3 usually work, but nothing guarantees the streams don't overlap or correlate, and it depends on the generator. Use something built for the purpose: SeedSequence.spawn in NumPy, or the L'Ecuyer-CMRG generator with the stream functions in R's parallel package.

This is where it goes wrong quietly. Take the estimate above, with common random numbers, and start eight workers from seed 1. They return 0.0251 eight times: a spread of exactly zero and an apparently perfect standard error. Seeds 1 to 8 give 0.0251, 0.0184, 0.0205, 0.0227, 0.0216, 0.0187, 0.0122 and 0.0212, a mean of 0.0200 and a standard deviation of 0.0038. Nothing crashes, and the output looks like a very stable result. Seeding from the clock to the nearest second does the same to jobs that start together on a cluster. I'd make every seed from one master seed, write the master seed down, and give each job its index.

## Common random numbers

When the question is the difference between two settings, give both the same random numbers. The variance of a difference is Var(A) + Var(B) - 2 Cov(A, B), so if the two runs share their shocks and respond to them alike, the covariance is positive and the variance falls.

![Two rows of dots on one axis, each dot an estimate of the same difference from a repeated experiment. With independent random numbers the dots are spread from below zero to well above the long-run difference. With common random numbers they sit in a narrow band around it.](figure:random-seeds "The same 200 experiments done twice, with independent random numbers and with common ones. Each dot is mean density at h = 0 minus mean density at h = 0.05. The long-run difference is the average of 20,000 experiments with common random numbers.")

With common random numbers the 200 estimates have a standard deviation of 0.005, from 0.003 to 0.035, and none has the wrong sign. The variance is about sixteen times smaller, so independent numbers would need about sixteen times as many experiments for the same precision: 62 against 4 for a half-width of 0.005. Each setting's own mean is no more precise than before. The difference is. A quick way to see why: across experiments, the mean densities at h = 0 and h = 0.05 that share a seed have a correlation of 0.93 (2,000 pairs of runs), so most of what varies between experiments cancels in the subtraction. I'm not sure how far the sixteen-fold gain carries over to a model where the noise enters through the parameters rather than every generation. I'd expect less, and I'd check before counting on it.

How much you gain depends on the model and the quantity compared, and it isn't guaranteed. It needs the two runs to respond to a shock in the same direction. If one setting amplifies a shock and the other damps it, the covariance is negative and sharing the numbers makes the difference noisier.

The practical difficulty is keeping the runs in step. The shocks have to be used for the same purpose in both runs and drawn in the same order. If the number of draws depends on the state (say each individual draws once, and the two settings give different numbers of individuals) the runs drift apart after the first difference and the sharing is lost. One stream per source of randomness, one for births, one for deaths, one for the environment, keeps them aligned for longer. The noisy rule above has one draw per generation in both runs, so it doesn't hit this.

For the figure: generator mulberry32, seeds 1 to 200 and 1001 to 1200 for the independent experiments and 2001 to 2200 for the common ones, run in Node 26.13. The other numbers in this post come from the same generator and version with other seeds.

## The seed you wanted

With estimates ranging from -0.030 to 0.086 you can find a seed for almost any conclusion about the difference. Picking the one that gives the answer you hoped for is one of the forking paths that a later post takes up, and it leaves no trace in the results.

The arithmetic is short. If one seed in seven gives the wrong sign, the chance that at least one of ten tried seeds does is 1 - (6/7)^10, about 0.79. It doesn't need bad faith. A seed used while debugging that gave a sensible plot tends to stay in the script, and the sensible-looking draw then becomes the reported one.

So choose the seeds in advance, keep every run, and before reporting rerun the analysis with a new set. The conclusion shouldn't change.
