---
title: "When the average is not typical"
date: 2027-04-06
summary: "With heavy tails a few draws carry much of the total, the average settles slowly or never, and a straight line on a log-log plot is a poor way to test for a power law."
draft: true
---

A sample average is supposed to settle as the sample grows, and to describe a typical member. For some quantities neither holds, because a few very large values carry most of the total. Incomes and city sizes are the classic candidates.

## A few draws dominate

The Pareto distribution is the simplest example. Above a minimum value xmin, the chance that a draw exceeds x is (x / xmin)^(-alpha), and the smaller alpha is, the heavier the tail. The mean is finite only if alpha is above 1, and the variance only if alpha is above 2. Below those values the mean, or the variance, is infinite, and a sample has nothing finite to approach.

Take alpha = 1.2 and xmin = 1. The mean is alpha / (alpha - 1) = 6 and the variance is infinite. I drew 1,000 samples of 100,000 values each. In the middle sample the largest 1 per cent of the values made up 40 per cent of the total, and in 80 per cent of the samples the share was between 36 and 50 per cent. The single largest value made up 3.6 per cent of the total in the middle sample, and more than 15 per cent in one sample out of ten. For an exponential distribution with the same mean, the top 1 per cent make up 5.6 per cent and the largest value about 0.01 per cent.

![Running averages of six samples from a Pareto distribution and six from an exponential distribution, against the number of draws on a log axis. The exponential averages hug the true mean of 6; the Pareto averages sit mostly below it and jump upwards.](figure:heavy-tails "Six samples of each, both with a true mean of 6 (dashed). The exponential averages settle within about a thousand draws. The Pareto averages mostly sit below 6 and jump whenever a very large draw arrives.")

After 1,000 draws the exponential averages lie between 5.7 and 6.0 and the Pareto averages between 3.9 and 5.7. After 100,000 draws the Pareto averages still range from 5.3 to 8.5.

Those shares are smaller than the population's. For a Pareto distribution with alpha above 1, the top fraction q of the population holds a share q^(1 - 1/alpha) of the total. For q = 0.01 and alpha = 1.2 that's 46 per cent, and the middle sample showed 40 because it hadn't met the very largest values. (The same formula says alpha = 1.16 is the "80/20" case, where the top 20 per cent hold 80 per cent.) The size of the biggest draw follows from the tail too. The median of the largest of n draws is (n / ln 2)^(1/alpha), which for n = 100,000 and alpha = 1.2 is about 19,900, against a total near 600,000. That's 3.3 per cent, close to the 3.6 per cent in the samples.

Another way to see it. The chance that a draw exceeds 1,000 is 1,000^(-1.2), about 1 in 4,000, so a sample of 1,000 draws will usually contain none. Yet in the population those draws account for a quarter of the mean (6 x 1,000^(-0.2) = 1.5 out of 6). So most samples of 1,000 draws lack a quarter of what they're trying to estimate.

If the cost of an event grows like the square of its size, the expected cost is infinite for any alpha below 2. The average of past costs is then a record of the largest event so far, and it isn't an estimate of anything.

## Why the average misleads

The usual error bar is the standard deviation divided by the square root of n, and with an infinite variance it has no meaning. For alpha between 1 and 2 the average still converges, but its error shrinks in proportion to n^(1/alpha - 1) and not n^(-1/2). At alpha = 1.2 that's n^(-1/6): ten thousand times as many draws cut the error by a factor of about 4.6, where a light-tailed sample gains a factor of 100.

I wanted to see how bad the usual interval is. For alpha = 1.2 I took the mean plus or minus 1.96 standard errors, for samples of 100, 1,000, 10,000 and 100,000 draws (2,000 samples each for the first three sizes and 500 for the last), and counted how often it contained the true mean of 6. It did in 43, 46, 45 and 48 per cent of samples. So a nominal 95 per cent interval, and no better with a thousand times more data. The mean was below 6 in about 83 per cent of the samples at every size. The sample standard deviation doesn't know about the draws that haven't turned up either, so the interval is narrow and sits in the wrong place.

The average rises in steps when a big draw does arrive. Below alpha = 1 the mean is infinite and the running average has nothing to settle at, so it tends to keep rising as the sample grows. The median and the other quantiles exist whatever alpha is, and I'd report them first. They behave, too. The true median here is 2^(1/1.2) = 1.78, and the sample median had a standard deviation of 0.16 at 100 draws and 0.05 at 1,000.

Which summary to use depends on the question. If it's about the typical unit, the median does it. If it's about a total, say all the carbon in a forest or all the revenue in a sector, then the tail is the answer and a small random sample misses it. Survey designers who estimate totals of skewed quantities usually sample the largest units with certainty and the small ones at a lower rate.

## Fitting a power law

The density of a Pareto distribution is proportional to x^(-(alpha + 1)), a straight line on log-log axes. Some authors report alpha, as here, and others report the exponent of the density, alpha + 1. The straight line invites a quick estimate: fit a line to a histogram of the data.

That estimate is biased. I drew 1,000 samples of 1,000 values from a Pareto distribution with alpha = 2.5. A line fitted by least squares to a histogram whose bins double in width (log of count per unit width against log of bin centre) averaged 2.36, with a standard deviation of 0.29. A line fitted the same way to a histogram with bins of width one averaged 1.75 (0.49), with empty bins left out. The answer depends on a binning that the data don't choose. The maximum likelihood estimate, n divided by the sum of ln(x / xmin), has no binning to choose. It averaged 2.50 with a standard deviation of 0.08, which matches the standard error alpha / sqrt(n) = 0.079. It works because the mean of ln(x / xmin) is finite whatever alpha is: for a Pareto distribution it's 1/alpha, and the estimate is its reciprocal.

This isn't only a classroom problem. Edwards and colleagues (2007) went back to the albatross, bumblebee and deer movement data that had been read as Lévy flights, which are random walks with power-law step lengths. They found no evidence of Lévy flights in the deer and bumblebee data sets, concluded that the extremely long albatross flights in the original data were spurious, and said the graphical approach of the original studies wasn't sufficient.

Clauset, Shalizi and Newman (2009) set out a better procedure. It estimates the exponent by maximum likelihood, picks xmin, the point above which the power law is supposed to hold, by minimising the Kolmogorov-Smirnov distance, tests the fit with a goodness-of-fit test based on the same statistic, and compares the power law with alternatives such as the lognormal by a likelihood ratio. They applied it to 24 data sets, each of which had been conjectured to follow a power law. In some cases the conjecture was consistent with the data, and in others the power law was ruled out. Surviving the tests means that the data haven't ruled the power law out. It doesn't show that nothing else fits.

The lognormal is the reason the comparison is part of the procedure. I simulated a million values from a lognormal with a standard deviation of 2 on the log scale, and a million from a Pareto with alpha = 2.5 for comparison, and fitted the exponent by maximum likelihood to everything above a threshold. Above the median the lognormal gave 0.63, above the 90th percentile 1.05, above the 99th 1.46 and above the 99.9th 1.77. The Pareto gave 2.50, 2.50, 2.48 and 2.48. A power law has one exponent whatever the threshold, and a lognormal's keeps drifting. The theory agrees: the local slope of this lognormal's log-log survival curve is 0.76 where 16 per cent of the values lie above and 1.64 where 0.13 per cent do. That's slow enough to pass for a straight line over a short range.

One limit I'd keep in mind. Real quantities are bounded: a forest has a finite area and a city finite people. A tail that looks like a power law over the observed range says nothing certain about what happens beyond it, so an infinite mean is a property of the fitted model and not of the world.

## What I check

- Does the largest value keep growing as the sample does, and does the running average settle? Plot both against the sample size.
- What share of the total do the top 1 per cent make up?
- Is the median reported beside the mean, with quantiles?
- For a claimed power law: fitted by maximum likelihood, over a stated range, and compared with a lognormal? Does the exponent hold still when the lower threshold moves?
- Over how many orders of magnitude does the line hold? One is a weak claim.
