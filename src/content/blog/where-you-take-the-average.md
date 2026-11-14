---
title: "Where you take the average"
date: 2027-01-19
summary: "The same formula on the same data gives answers a factor of three apart, depending on where in the pipeline the mean is taken. Name the estimator, and compute the other forms too."
draft: true
---

The same formula applied to the same data can give quite different answers, depending on where in the pipeline the average is taken. Each answer can pass as "the prediction", and that is the trap.

## A small exercise

Let three units have variances 1, 4 and 100, and ask for the typical spread. There are three obvious ways to compute it.

| Form | Expression | Value |
|---|---|---|
| A | square root of the mean of the variances | 5.92 |
| B | mean of the square roots | 4.33 |
| C | square root of the median of the variances | 2.00 |

The numbers were chosen for the exercise. The largest answer is about three times the smallest.

A and B differ by Jensen's inequality: for a concave function such as the square root, the mean of the function is at most the function of the mean, so B is never larger than A. C changes the question, since the median ignores the unit with the large variance.

![The square root of the variance drawn as a curve, with the three units on it. The mean of the square roots sits below the curve at the mean variance, and the median answer is lower still.](figure:where-you-take-the-average "The same three variances give A, the square root of their mean, and B, the mean of their square roots. B falls below the curve because the square root is concave. C is the square root of the median.")

## Which one is right

The answer depends on what the observed quantity is. Suppose it is the standard deviation, across units, of their displacements. If each unit moves independently from a common start, with zero mean displacement, the second moment of the displacements across units is the mean of the individual displacement variances. The reference value is the square root of that mean, which is form A.

Form B averages each unit's own standard deviation. It is smaller than A, but that does not make it a cautious version of A: it is a different quantity and answers another question. The choice follows from the observed statistic.

## The same trap elsewhere

Any pipeline that reduces per-unit quantities to one summary is open to this. A share of endemic species per island is a good example. Island 1 has 1 endemic species out of 2, island 2 has 1 out of 10. The mean of the two shares is (0.5 + 0.1) / 2 = 0.30. The share of the totals is 2 / 12, or 0.17. The first weights each island equally. The second weights each species equally. If a result depends on the choice and nobody wrote down which was used, the number reported and the number described will diverge sooner or later.

The pattern appears in sustainability work too. Life-cycle assessment depends on a functional unit and a system boundary, input-output analysis on how sectors are aggregated, and circularity indicators on how the dimensions are weighted. Each is an analyst's choice that can decide a conclusion, and it is worth asking how much of a published conclusion comes from the system and how much from the method.

## When the text and the table disagree

A claim's text describes one estimator while its table reports another. Both look correct on their own, and a colleague who reproduces the number is the one who finds the difference. Switching to the correct form may strengthen one half of a result and weaken the other. A correct estimator does not repair a comparison that was set up wrongly.

## Three habits

1. Name the estimator in the artefact. A column called "predicted" with no formula beside it is a future disagreement. Put the formula in the table header, the script and the caption.
2. Derive the aggregation first. Work out which form the observed statistic implies before computing any of them.
3. When a colleague's number differs from yours, compute all the plausible forms. The spread across them usually contains both numbers, and the argument is settled in a single pass: you see which form each of you used, instead of trading derivations.

The first habit takes a minute to adopt, and it removes most of the occasions on which the other two are needed.
