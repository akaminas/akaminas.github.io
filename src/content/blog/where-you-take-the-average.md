---
title: "Where you take the average"
date: 2027-01-19
summary: "The same formula on the same data gives answers a factor of three apart, depending on where in the pipeline the mean is taken. Name the estimator, derive the aggregation, compute all forms."
draft: true
---

The same formula applied to the same data can give materially different answers, depending on where in the pipeline the average is taken. All of the answers can look like "the prediction", and that is the trap.

## A small exercise

Let three units have variances 1, 4 and 100, and ask for the typical spread. There are three obvious ways to compute it.

| Form | Expression | Value |
|---|---|---|
| A | square root of the mean of the variances | 5.92 |
| B | mean of the square roots | 4.33 |
| C | square root of the median of the variances | 2.00 |

The numbers were chosen for the exercise, and the span is a factor of about three.

A and B differ by Jensen's inequality: for a concave function such as the square root, the mean of the function is at most the function of the mean, so B is never larger than A. C changes the question, since the median ignores the unit with the large variance.

## Which one is right

The answer depends on what the observed quantity is. Suppose it is the standard deviation, across units, of the unit means. If each unit moves independently from a common start, the second moment of the displacements across units is the mean of the individual displacement variances. The reference value is the square root of that mean, which is form A.

Form B is the average of each unit's own standard deviation. It is a different object, and it is smaller. It is not a conservative version of A. It answers another question.

The choice is therefore a consequence of the observed statistic, and not a matter of taste.

## The same trap elsewhere

Any pipeline that reduces per-unit quantities to one summary has this exposure. A share of endemic species per island is a good example. Island 1 has 1 endemic species out of 2, island 2 has 1 out of 10. The mean of the two shares is (0.5 + 0.1) / 2 = 0.30. The share of the totals is 2 / 12, or 0.17. The first weights each island equally. The second weights each species equally. If a result depends on the choice and nobody wrote down which was used, the number reported and the number described will diverge sooner or later.

The pattern appears in sustainability work too. Life-cycle assessment depends on a functional unit and a system boundary, input-output analysis on how sectors are aggregated, and circularity indicators on how the dimensions are weighted. Each is an analyst's choice that can decide a conclusion, and rarely does anyone ask how much of a published conclusion is the system and how much is the method.

## A familiar example

A claim's text describes one estimator while its table reports another. Both look correct on their own. A colleague who reproduces the number finds the difference. Switching to the correct form may strengthen one half of a result and weaken the other, which is what an unbiased correction tends to look like. It does not rescue a comparison that has its own flaw: a right estimator on a wrong comparison is still a wrong comparison.

## Three habits

1. **Name the estimator in the artefact.** A column called "predicted" with no formula beside it is a future disagreement. Put the formula in the table header, the script and the caption.
2. **Derive the aggregation first.** Work out which form the observed statistic implies before computing any of them.
3. **When a colleague's number differs from yours, compute all the plausible forms.** The spread across them usually contains both numbers, and the argument is settled in a single pass: you see which form each of you used, instead of trading derivations.

The first habit takes a minute to adopt, and it removes most of the occasions on which the other two are needed.
