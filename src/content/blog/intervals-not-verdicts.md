---
title: "Report the interval, not only the verdict"
date: 2027-06-01
summary: "A p-value mixes the size of an effect with the size of the sample. An estimate with its interval says how large the effect is and how well it is known, which 'significant' does not."
draft: true
---

A result reported only as "significant" or "not significant" discards most of what the data say. Two studies of the same effect can fall on opposite sides of the line and agree with each other.

## One effect, eight studies

Take a true difference of 0.4 standard deviations between two groups, and run the study eight times with 40 units per group, each run drawn from a seeded generator. Each study reports its estimate with a 95 per cent interval, the estimate plus and minus 1.96 standard errors. The seed was fixed before the run, and the figure shows what it produced.

Three of the eight have p below 0.05, and five do not. The p-values run from 0.012 to 0.51. Read as verdicts, the set is three yeses and five noes. Read as intervals, all eight overlap and all eight contain the true effect, and the mean of the eight estimates is 0.41.

![A forest plot of eight replicate studies of one true difference of 0.4. Each study is a square with a horizontal 95 per cent interval, and every interval contains the true effect. Three intervals exclude zero and five include it.](figure:intervals-not-verdicts "Eight replicate studies of a true difference of 0.4, with 40 per group. Squares are estimates, bars are 95 per cent intervals, and p is the two-sided value from a normal approximation.")

## The line between significant and not

Gelman and Stern (2006) made the point that the difference between "significant" and "not significant" is not itself statistically significant. The figure has an example. Study 2 has an estimate of 0.51 and p = 0.024. Study 1 has an estimate of 0.39 and p = 0.053. These are the two studies on either side of the 0.05 line that are closest to it. Their estimates differ by 0.11, with a standard error of 0.30, and the p-value for that difference is 0.71. One is labelled significant and the other is not, and there is no evidence that they differ.

## A p-value depends on the sample size

The same effect gives different p-values at different sample sizes. For an estimate that equals the true effect of 0.4:

| Per group | Standard error | p |
|---|---|---|
| 10 | 0.447 | 0.37 |
| 40 | 0.224 | 0.074 |
| 160 | 0.112 | 0.00035 |

The effect is the same in every row. Only the sample size differs, and with it how precisely the effect is measured.

The same arithmetic works in the other direction. A difference of 0.02 standard deviations with 20,000 per group has a standard error of 0.01, so z = 2.0 and p = 0.046. That is significant, and it is also tiny: a randomly chosen member of one group exceeds a randomly chosen member of the other 50.6 per cent of the time, against 50 per cent for no difference. The p-value does not tell you whether an effect of that size matters.

The statement of the American Statistical Association (Wasserstein and Lazar 2016) says as much. A p-value does not measure the probability that a hypothesis is true, and it does not measure the size of an effect or the importance of a result. Conclusions should not rest on whether a p-value passes a threshold.

## What to report

Report an effect size, in units a reader can use, with its interval. The interval is a range of effects that the data are compatible with, under the model's assumptions. A procedure that produces 95 per cent intervals covers the true value in 95 per cent of repeated studies. The width tells you how well the effect is known, and a wide interval around a "not significant" result says the study could not tell, which is different from saying there is nothing there.

Decide in advance what the smallest effect worth caring about is, and compare the interval with it. An interval that excludes zero but lies wholly below that size shows an effect, and one too small to matter. An interval that includes zero and also includes a large effect is an inconclusive study.

- Give the estimate and the interval in the units of the problem.
- Say what effect would matter before looking at the data.
- If you give a p-value, give its exact value, and do not rank studies by which side of 0.05 they fall on.
- Compare two results by looking at their difference, not at which one is significant.
