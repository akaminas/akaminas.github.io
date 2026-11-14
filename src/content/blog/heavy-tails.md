---
title: "When the average is not typical"
date: 2027-04-06
summary: "In a heavy-tailed sample a few draws carry much of the total, the mean settles slowly or never, and a straight line on a log-log plot is a poor way to test for a power law."
draft: true
---

A sample average is supposed to settle as the sample grows, and to describe a typical member. For some quantities neither holds, because a few very large values carry most of the total. Incomes and city sizes are the classic candidates.

## A few draws dominate

The Pareto distribution is the simplest example. Above a minimum value xmin, the chance that a draw exceeds x is (x / xmin)^(-alpha), and the smaller alpha is, the heavier the tail. The mean is finite only if alpha is above 1, and the variance only if alpha is above 2. Below those values the mean, or the variance, is infinite, and a sample has nothing finite to approach.

Take alpha = 1.2 and xmin = 1. The mean is alpha / (alpha - 1) = 6 and the variance is infinite. I drew 200 samples of 100,000 values each. In the middle sample the largest 1 per cent of the values made up 40 per cent of the total, and in 80 per cent of the samples the share was between 36 and 48 per cent. The single largest value made up 3.4 per cent of the total in the middle sample, and more than 15 per cent in one sample out of ten. For an exponential distribution with the same mean, the top 1 per cent make up 5.6 per cent and the largest value about 0.01 per cent.

![Running averages of six samples from a Pareto distribution and six from an exponential distribution, against the number of draws on a log axis. The exponential averages hug the true mean of 6; the Pareto averages sit mostly below it and jump upwards.](figure:heavy-tails "Six samples of each kind, both with a true mean of 6 (dashed). The exponential averages settle within about a thousand draws, and the Pareto averages mostly sit below 6 and jump when a very large draw arrives.")

After 1,000 draws the exponential averages lie between 5.7 and 6.0 and the Pareto averages between 3.9 and 5.7. After 100,000 draws the Pareto averages still range from 5.3 to 8.5.

## Why the average misleads

The usual error bar is the standard deviation divided by the square root of n, and with an infinite variance it has no meaning. For alpha between 1 and 2 the average still converges, but its error shrinks in proportion to n^(1/alpha - 1) and not n^(-1/2). At alpha = 1.2 that is n^(-1/6): ten thousand times as many draws cut the error by a factor of about 4.6, where a light-tailed sample gains a factor of 100.

Most samples also fall short of the mean: the values that carry it are rare, a typical sample has not met them yet, and the average rises in steps when one arrives. Below alpha = 1 the mean is infinite and the running average has nothing to settle at, so it tends to keep rising as the sample grows. The median and the other quantiles exist whatever alpha is, and I would report them first.

## Fitting a power law

The density of a Pareto distribution is proportional to x^(-(alpha + 1)), a straight line on log-log axes. Some authors report alpha, as here, and others report the exponent of the density, alpha + 1. The straight line invites a quick estimate: fit a line to a histogram of the data.

That estimate is biased. I drew 1,000 samples of 1,000 values from a Pareto distribution with alpha = 2.5. The maximum likelihood estimate, n divided by the sum of ln(x / xmin), averaged 2.50 with a standard deviation of 0.08. A line fitted to a histogram whose bins double in width averaged 2.35 (standard deviation 0.28). A line fitted to a histogram with bins of width one averaged 1.74 (0.49), with empty bins left out. The answer depends on a binning that the data do not choose.

Clauset, Shalizi and Newman (2009) set out a better procedure. It estimates the exponent by maximum likelihood, tests the fit with a goodness-of-fit test based on the Kolmogorov-Smirnov statistic, and compares the power law with alternatives such as the lognormal by a likelihood ratio. They applied it to 24 data sets, each of which had been conjectured to follow a power law. In some cases the conjecture was consistent with the data, and in others the power law was ruled out. A lognormal with a wide spread can look straight over a limited range, which is why the comparison is part of the procedure. Surviving the tests means that the data have not ruled the power law out. It does not show that nothing else fits.

## What I check

- Does the largest value keep growing as the sample does, and does the running average settle? Plot both against the sample size.
- What share of the total do the top 1 per cent make up?
- Is the median reported beside the mean, with quantiles?
- For a claimed power law: fitted by maximum likelihood, over a stated range, and compared with a lognormal?
