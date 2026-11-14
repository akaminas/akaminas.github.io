---
title: "Where you take the average"
date: 2027-01-19
summary: "The same formula on the same data gave answers a factor of three apart, depending on where in the pipeline the mean was taken. Name the estimator, and compute the other forms too."
draft: true
---

The same formula applied to the same data can give quite different answers, depending on where in the pipeline you take the average. Each answer can pass as "the prediction", and that's the trap.

## A small exercise

Take three units with variances 1, 4 and 100, and ask for the typical spread. There are three obvious ways to compute it.

| Form | Expression | Value |
|---|---|---|
| A | square root of the mean of the variances | 5.92 |
| B | mean of the square roots | 4.33 |
| C | square root of the median of the variances | 2.00 |

I made the numbers up for the exercise. The largest answer is about three times the smallest (5.92 / 2.00 = 2.96).

A and B differ by Jensen's inequality. For a concave function such as the square root, the mean of the function is at most the function of the mean, so B can never be larger than A. C changes the question, since the median ignores the unit with the large variance.

The gap between A and B has an exact form. A squared is the mean of the squared standard deviations, and B squared is the squared mean of the standard deviations, so A^2 = B^2 + (variance of the unit standard deviations, with divisor n). Here that's 18.78 + 16.22 = 35.00, which is 5.92 squared. If every unit has the same spread the two forms agree, and the more the units differ the further apart they go. The most extreme case puts all the variance in one unit out of n, and then B/A = 1/sqrt(n). With three units B can't go below 0.58 of A, and with 100 units it can fall to 0.1. In code the whole difference is the order of two calls, sqrt(mean(v)) against mean(sqrt(v)), which is easy to miss when reading someone else's script.

![The square root of the variance drawn as a curve, with the three units on it. The mean of the square roots sits below the curve at the mean variance, and the median answer is lower still.](figure:where-you-take-the-average "The same three variances give A, the square root of their mean, and B, the mean of their square roots. B falls below the curve because the square root is concave. C is the square root of the median.")

## Which one is right

It depends on what the observed quantity is. Say it's the standard deviation, across units, of their displacements. If each unit moves independently from a common start, with zero mean displacement, the second moment of the displacements across units is the mean of the individual displacement variances. So the reference value is the square root of that mean, which is form A.

B averages each unit's own standard deviation. That's a different quantity from A, and it happens to be smaller. I wouldn't read it as a cautious version of A.

A quick simulation to check. I gave 3,000 units the variances 1, 4 and 100 (1,000 of each), drew one displacement per unit from a normal distribution with that variance, took the standard deviation across all 3,000, and repeated that 2,000 times. The average came out at 5.92, which is A. B would have been about 27 per cent too low.

With only three units it's messier. The standard deviation across three displacements is very noisy, and its average over 400,000 repeats is 4.85, well under A. The variance behaves: its average is 35, which is A squared, so A is the right root-mean-square at any number of units. But if the observed statistic is a standard deviation from a handful of units, the typical value sits below A (thirty units give 5.78). Worth knowing before comparing a small system to a reference value.

## The same trap elsewhere

Any pipeline that reduces per-unit quantities to one summary has this problem. Shares of endemic species per island are a good case. Island 1 has 1 endemic species out of 2 and island 2 has 1 out of 10. The mean of the two shares is (0.5 + 0.1) / 2 = 0.30, and the share of the totals is 2 / 12 = 0.17. The first weights each island equally and the second weights each species equally. If a result depends on the choice and nobody wrote down which was used, the number reported and the number described will drift apart sooner or later. Unemployment is the same: a region with a rate of 10 per cent and a labour force of 100,000, next to one with 5 per cent and 900,000, gives a mean rate of 7.5 per cent and a national rate of 5.5 per cent (made-up numbers).

Growth has its own version. A population (or a price) that rises by 50 per cent one year and falls by 50 per cent the next has an average change of zero and ends at 0.75 of where it started. The geometric mean of the two factors is sqrt(0.75) = 0.866, a fall of 13 per cent a year, which is what the trajectory did.

Ratios are where I find it hardest to keep track. Say a model predicts 2, 2 and 20 for three units that were observed at 1, 1 and 100. The ratios are 2, 2 and 0.2. The mean of the ratios is 1.4, which says over-prediction. The ratio of the totals is 24 / 102 = 0.24, which says heavy under-prediction. The geometric mean of the ratios is 0.93, nearly right. One data set, and three different verdicts depending on where the average goes.

The pattern appears in sustainability work too. Life-cycle assessment depends on a functional unit and a system boundary, input-output analysis on how sectors are aggregated, and circularity indicators on how the dimensions are weighted. Each is an analyst's choice that can decide a conclusion, and it's worth asking how much of a published conclusion comes from the system and how much from the method.

## When the text and the table disagree

A claim's text describes one estimator while its table reports another. I'd guess the usual cause is that the text was written from the idea and the table from the code, at different times. Both look right on their own, and the person who finds the difference is usually a colleague who reproduces the number. Switching to the correct form may strengthen one half of a result and weaken the other. A correct estimator doesn't repair a comparison that was set up wrongly.

## Three habits

Name the estimator wherever the number appears. A column called "predicted" with no formula beside it is a future disagreement, so put the formula in the table header, in the script and in the caption.

Work out the aggregation first. Decide which form the observed statistic implies before computing any of them.

When a colleague's number differs from yours, compute all the plausible forms. Say the text quotes 5.92 and your table has 4.33: that's A against B, and you'll see it in a minute instead of an afternoon. The spread across them usually contains both numbers, and the argument is settled in one pass: you see which form each of you used, instead of trading derivations. It also tells you whether the conclusion survives a change of form. If it does, say so in the report. If it doesn't, the conclusion is partly about the aggregation, and the report should say that, with the form you chose and the reason. Where two forms differ by a factor of three, as A and C do above, I'd show both.

The first habit takes a minute to adopt, and it removes most of the occasions on which the other two are needed.
