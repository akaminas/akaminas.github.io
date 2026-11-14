---
title: "A null result is a result, if it is reported properly"
date: 2027-01-12
summary: "Failing to find a difference is not evidence of none. Claiming sameness needs a test built for it, with a margin fixed in advance, and a bounded null says what has been excluded."
draft: true
---

A common sentence in results sections is "the two did not differ significantly". It is often read as "the two are the same". Those are different claims, and mixing them up is a common reporting error.

## The mistake

Suppose two groups are called indistinguishable whenever their gap is below two combined standard errors. With a small number of replicates, a pair whose true difference is half a standard deviation and a pair whose true difference is zero can look alike. Reporting both as the same treats absence of evidence as evidence of absence.

## A test for sameness

The standard remedy is an equivalence test. Fix a margin in advance: the largest difference that would not matter for the question. Then call two things equivalent only if the whole 90 per cent confidence interval of their difference lies inside the margin. This is the same as running two one-sided tests at the 5 per cent level, a procedure that goes back to Schuirmann (1987). If it succeeds, a true difference larger than the margin is rejected at the 5 per cent level.

There are four outcomes, and only one licenses the word "equivalent".

| Interval for the difference | Verdict |
|---|---|
| Excludes zero and lies wholly beyond the margin | Different |
| Lies entirely inside the margin | Equivalent |
| Excludes zero but reaches into the margin | Different, with the size unclear |
| Includes zero and extends beyond the margin | Unresolved: the trap |

The last row is the one to watch. It contains zero, so a test of difference passes it and reports "indistinguishable". It also extends past the margin, so a real difference as large as the margin was never excluded.

## What the design can resolve

The width of the interval depends on the number of replicates, so the number needed can be worked out in advance. Take a margin of 0.5 units and a true difference of zero. If the standard error is 0.31, the 90 per cent interval is about 0.51 on each side and does not fit. At a standard error of 0.22 it is about 0.36 and fits. Those figures are an illustration, but the lesson is general: work out which effect size the design can resolve before reading its output, then choose the replication.

In a simulation check, the same comparison can be unresolved with ten replicate pairs and equivalent with twenty. The difference between the two outcomes is the width of the interval, not the size of the effect. The extra pairs should be run on new random seeds, and the earlier cells should not be patched. The figure shows one simulated run, with a true difference of zero and pair-to-pair differences that have a standard deviation of 1. The first ten pairs leave the interval across the margin, and ten more bring it inside.

![Two 90 per cent intervals for the same difference, both centred near zero. The one from ten pairs is wide and runs past the dashed margin on both sides. The one from twenty pairs lies inside the margin.](figure:a-null-is-a-result "Simulated data with a true difference of zero. A test of difference finds nothing in either case. Only the second interval, from twenty pairs, lies inside the margin of 0.5.")

## A bounded null is informative

"Underpowered" on its own is no result. A bounded null is, for example: "the mean difference was -0.15 with a standard error of 0.13, and a difference larger than 0.5 is excluded at the 5 per cent level". That tells the reader how much the data rule out. A bare statistic with the label "underpowered" says only that the result can be ignored, which is the opposite of what the interval shows.

## Related habits

Two results on the same side add less than they seem to. Two measurements, each below two standard errors and both positive, can pool to a larger z and look like a signal. With no true effect, two draws land on the same side half the time. When the experiment is repeated, an effect that came from pooling two weak results often goes.

Being distinguishable from zero and being equivalent are separate questions. A difference can be distinguishable from zero and still small enough to sit inside the margin on average, without equivalence at that margin being shown. A criterion on the size of a difference, a test against zero and a test of equivalence answer three different questions, and a report can state all three.

Quote the interval, not two means, and put the number in the sentence that makes the claim.

## Why it matters beyond the laboratory

The same logic applies wherever someone concludes "no effect": an intervention evaluated on a small sample, an index that "did not change", a policy compared with its predecessor. If nobody planned for the comparison to have power, a null says little.
