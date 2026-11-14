---
title: "A null result is a result, if it is reported properly"
date: 2027-01-12
summary: "Failing to find a difference is not evidence of none. Claiming sameness needs a test built for it, with a margin fixed in advance, and a bounded null says what has been excluded."
draft: true
---

A common sentence in results sections is "the two did not differ significantly". It is often read as "the two are the same". Those are different claims, and mixing them up is one of the more common errors in reporting.

## The mistake

Suppose two groups are called indistinguishable whenever their gap is below two combined standard errors. With a small number of replicates, a pair whose true difference is half a standard deviation and a pair whose true difference is zero can look alike. Reporting both as the same treats absence of evidence as evidence of absence.

## A test for sameness

The standard remedy is an equivalence test. Fix a margin in advance: the largest difference that would not matter for the question. Then call two things equivalent only if the whole 90 per cent confidence interval of their difference lies inside the margin. This is equal to two one-sided tests at the 5 per cent level, a procedure that goes back to Schuirmann in 1987. If it succeeds, a true difference larger than the margin would have been detected.

There are four outcomes, and only one licenses the word "equivalent".

| Interval for the difference | Verdict |
|---|---|
| Narrow, and clear of zero and of the margin | Different |
| Narrow, and entirely inside the margin | Equivalent |
| Wide, and straddling zero | Unresolved |
| Includes zero, but extends beyond the margin | **Not** equivalent: the trap |

The last row is the important one. It contains zero, so a test of difference passes it and reports "indistinguishable". It also extends past the margin, so a real difference as large as the margin was never excluded.

## What the design can resolve

The width of the interval depends on the number of replicates, so the number needed can be worked out in advance. Take a margin of 0.5 units and a true difference of zero. If the standard error is 0.31, the 90 per cent interval is about 0.51 on each side and does not fit. At a standard error of 0.22 it is about 0.36 and fits. Those figures are an illustration, but the lesson is general: work out which effect size the design can resolve before reading its output, then choose the replication.

In one of my own simulation checks, the same comparison was unresolved with ten pairs and equivalent with twenty. The difference between the two outcomes was the width of the interval, not the size of the effect, and the new pairs were run on new random seeds. The earlier cells were not patched.

## A bounded null is informative

"Underpowered" on its own is no result. A bounded null is, for example: "the mean difference was -0.15 with a standard error of 0.13, and a difference larger than 0.5 is excluded at the 5 per cent level". That tells the reader how much the data rule out. A bare statistic with a label of "underpowered" says only that the row can be ignored, which is the opposite of what the interval shows.

## Related habits

**Two results on the same side are not evidence.** Two measurements, each below two standard errors and both positive, can pool to a larger z and look like a signal. At such magnitudes, two draws landing the same way is close to a coin toss. When replication is matched, the effect often goes.

**Distinguishable from zero and equivalent are two questions.** A difference can be distinguishable from zero and still small enough to sit inside the margin on average, without equivalence at that margin being shown. A criterion on the size of a difference, a test against zero and a test of equivalence answer three different questions, and a report can state all three.

**Quote the interval, not two means.** And put the number in the sentence that makes the claim.

## Why it matters beyond the laboratory

The same logic applies wherever someone concludes "no effect": an intervention evaluated on a small sample, an index that "did not change", a policy compared with its predecessor. If nobody planned for the comparison to have power, the null was never in doubt.
