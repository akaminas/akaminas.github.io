---
title: "Report the interval, not only the verdict"
date: 2027-06-01
summary: "A p-value mixes the size of an effect with the size of the sample. An estimate with its interval says how big the effect is and how well it's known, which 'significant' doesn't."
draft: true
---

A result reported only as "significant" or "not significant" throws away most of what the data say. Two studies of the same effect can fall on opposite sides of the line and agree with each other.

## One effect, eight studies

Take a true difference of 0.4 standard deviations between two groups, and run the study eight times with 40 units per group, each run drawn from a seeded generator. Each study reports its estimate with a 95 per cent interval, the estimate plus and minus 1.96 standard errors. The seed was fixed before the run, and the figure shows what it produced.

Three of the eight have p below 0.05, and five don't. The p-values run from 0.012 to 0.51. Read as verdicts, the set is three yeses and five noes. Read as intervals, all eight overlap and all eight contain the true effect, and the mean of the eight estimates is 0.41.

![A forest plot of eight replicate studies of one true difference of 0.4. Each study is a square with a horizontal 95 per cent interval, and every interval contains the true effect. Three intervals exclude zero and five include it.](figure:intervals-not-verdicts "Eight replicate studies of a true difference of 0.4, with 40 per group. Squares are estimates, bars are 95 per cent intervals, and p is the two-sided value from a normal approximation.")

The significant studies deserve a second look. Their estimates are 0.51, 0.57 and 0.54, all above the true 0.4, and that isn't a quirk of this draw. With 40 per group the chance of a significant result for this effect is only about 43%, and to be significant an estimate has to reach about 0.44, so the studies that clear the line are the ones that happened to overshoot. In 100,000 simulated studies of this design, 43.5% were significant and the mean estimate among those was 0.60, half as big again as the truth. And if you pool all eight, weighting each by its precision, you get 0.40 with a 95% interval of 0.25 to 0.56, which excludes zero by a wide margin. Five of the eight were "not significant" and the eight together rule zero out.

How much does a p-value move between exact repeats of one study? In the same simulation the median p was 0.07 and the middle 80% of p-values ran from 0.002 to 0.58. About a fifth of the repeats gave p below 0.01 and one in eight gave p above 0.5, all from one true effect and one design. The p-value is a noisy summary of a single study, and a verdict taken from it inherits the noise.

## The line between significant and not

Gelman and Stern (2006) made the point that the difference between "significant" and "not significant" is not itself statistically significant. The figure has an example. Study 2 has an estimate of 0.51 and p = 0.024. Study 1 has an estimate of 0.39 and p = 0.053. These are the two studies on either side of the 0.05 line that are closest to it. Their estimates differ by 0.11, with a standard error of 0.30, and the p-value for that difference is 0.71. One is labelled significant and the other isn't, and there's no evidence that they differ.

## A p-value depends on the sample size

The same effect gives different p-values at different sample sizes. For an estimate that equals the true effect of 0.4:

| Per group | Standard error | p |
|---|---|---|
| 10 | 0.447 | 0.37 |
| 40 | 0.224 | 0.074 |
| 160 | 0.112 | 0.00035 |

The effect is the same in every row. Only the sample size differs, and with it how precisely the effect is measured.

The same arithmetic works in the other direction. A difference of 0.02 standard deviations with 20,000 per group has a standard error of 0.01, so z = 2.0 and p = 0.046. That's significant, and it's tiny: a randomly chosen member of one group exceeds a randomly chosen member of the other 50.6 per cent of the time, against 50 per cent for no difference. The p-value doesn't tell you whether an effect of that size matters.

The statement of the American Statistical Association (Wasserstein and Lazar 2016) says as much. A p-value doesn't measure the probability that a hypothesis is true, and it doesn't measure the size of an effect or the importance of a result. Conclusions should not rest on whether a p-value passes a threshold.

The same standard errors give a planning rule. With a standard deviation of 1 and n per group, the half-width of the interval is about 1.96 sqrt(2/n): 0.88 for 10 per group, 0.44 for 40, 0.22 for 160. Each fourfold increase in n halves it. To get a half-width of 0.2 you need about 190 per group, and for 0.1 about 770. I find it easier to plan a study around the width I want than around power, because the width is what I'll end up reporting.

## What to report

Report an effect size, in units a reader can use, with its interval. The interval is a range of effects that the data are compatible with, under the model's assumptions. A procedure that produces 95 per cent intervals covers the true value in 95 per cent of repeated studies. That's a statement about the procedure, not about the one interval in front of you. Quick check: in the 100,000 simulated studies, 94.6% of the intervals contained 0.4 (a little under 95% because 1.96 is the normal multiplier and the t multiplier for these samples is 1.99). With eight studies the chance that all eight contain the truth is 0.95^8, about 66%, so the figure is a likely outcome but not the only one.

The width tells you how well the effect is known, and a wide interval around a "not significant" result says the study couldn't tell, which is different from saying there's nothing there. Say a monitoring scheme reports a population trend of -3% a year with a 95% interval from -9% to +3%, and the write-up says "no significant decline". The interval includes a loss of 9% a year, which halves a population in about seven years, and it also includes growth. The data can't distinguish those, and "stable" goes beyond what was measured. A pilot of a social programme evaluated on a small sample is in the same position: "no significant effect on employment" is a statement about how precise the pilot was.

Decide in advance what the smallest effect worth caring about is, and compare the interval with it. An interval that excludes zero but lies wholly below that size shows an effect, and one too small to matter. An interval that includes zero and also includes a large effect is an inconclusive study. (This is the idea behind equivalence tests.)

The interval has a limit too. It describes sampling error under the model's assumptions, and says nothing about bias, which doesn't shrink as the sample grows. Suppose an estimate is biased upward by 0.1, perhaps because the measurement reads high in one group. With 40 per group that's small next to the standard error of 0.22, and the chance that the interval contains the truth drops only from 95% to about 93%. With 1,000 per group the standard error is 0.045, the interval is narrow, and its coverage of the truth is 39%. A narrow interval around a biased estimate looks like precision and misses.

Independence is the other assumption that fails a lot, in ecology and in the social sciences alike. Suppose the 40 per group aren't 40 independent units but 4 sites with 10 plots each (or 4 villages with 10 households each), with an intraclass correlation of 0.2. The variance of a group mean is inflated by 1 + 9 x 0.2 = 2.8, so the standard error is 1.67 times larger than the independent formula says. An interval computed as if the units were independent covered the true value in 74% of 100,000 simulated studies (the formula predicts about 76%). It looks the same as an honest interval and isn't one.

- Give the estimate and the interval in the units of the problem.
- Say what effect would matter before looking at the data.
- If you give a p-value, give its exact value, and don't rank studies by which side of 0.05 they fall on.
- Compare two results by looking at their difference, not at which one is significant.
