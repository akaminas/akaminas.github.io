---
title: "A null result is a result, if it is reported properly"
date: 2027-01-12
summary: "'Did not differ significantly' doesn't mean 'the same'. Claiming sameness needs an equivalence test with a margin fixed beforehand, and a bounded null says exactly what the data rule out."
draft: true
---

"The two did not differ significantly" turns up in a lot of results sections, and it usually gets read as "the two are the same". Those are different claims. The sentence is true whether the groups are the same or the study was too small to see anything, which I think is why nobody notices when it's carrying the wrong meaning.

## The mistake

Suppose two groups count as indistinguishable whenever their gap is under two combined standard errors. With few replicates, a pair whose true difference is half a standard deviation can look just like a pair whose true difference is zero. Quick check on how often: with ten paired replicates, an ordinary paired t test (two-sided, 5 per cent) picks up a true difference of 0.5 standard deviations only 29 per cent of the time. With twenty pairs it's 57 per cent, with thirty 75 per cent (exact values from the noncentral t distribution). So most of the time a study that small writes "no significant difference" about a difference that is really there. Reporting that as sameness treats absence of evidence as evidence of absence.

The usual fix people reach for is computing power afterwards, from the observed effect. I wouldn't. Observed power is a function of the p value (a p of exactly 0.05 always comes with an observed power of about 50 per cent), so it can only say again what the p value already said.

## A test for sameness

The standard remedy is an equivalence test. You fix a margin in advance, the largest difference that wouldn't matter for the question, and call two things equivalent only if the whole 90 per cent confidence interval of their difference lies inside it. That's the same as two one-sided tests at the 5 per cent level, one against each edge of the margin, a procedure that goes back to Schuirmann (1987). The 90 isn't a typo: each one-sided test puts its 5 per cent in one tail, and a 90 per cent interval has 5 per cent in each. If the test passes, a true difference larger than the margin is rejected at the 5 per cent level.

The margin is the hard part, and no formula supplies it. Bioequivalence studies, where the method was worked out, use a ratio of 0.80 to 1.25 for the drug exposure measures, and somebody had to argue for that. For an abundance index or a survey estimate there's no convention to borrow, so you write down the largest change that wouldn't alter a decision, and say why. If I can't say what is too small to matter, I take that as a sign I'm not ready to claim sameness. Fix the margin before you see the data. A margin picked after you've seen the interval doesn't count for anything.

There are four outcomes, and only one licenses the word "equivalent".

| Interval for the difference | Verdict |
|---|---|
| Excludes zero and lies wholly beyond the margin | Different |
| Lies entirely inside the margin | Equivalent |
| Excludes zero but reaches into the margin | Different, with the size unclear |
| Includes zero and extends beyond the margin | Unresolved: the trap |

The last row is the one to watch. It contains zero, so a test of difference passes it and reports "indistinguishable". It also extends past the margin, so a real difference as large as the margin was never excluded.

## What the design can resolve

The width of the interval depends on the number of replicates, so the number needed can be worked out in advance. Take a margin of 0.5 and a true difference of zero. The half-width of a 90 per cent interval is about 1.645 standard errors. If the standard error is 0.31, that's 0.51, wider than the margin on its own, so no result can pass. At a standard error of 0.22 it's 0.36. Those two values are only an illustration, and the second is less comfortable than it looks: the interval fits only if the sample mean also lands within about 0.14 of zero.

How often it does is a job for a quick simulation. I ran 400,000 simulated studies for each sample size, paired differences with a standard deviation of 1 and a true difference of zero, the standard deviation estimated from each study, and counted those whose 90 per cent t interval lay inside plus or minus 0.5. Ten pairs: 6.5 per cent. Twenty: 40. Thirty: 70. Forty: 86. Fifty: 94. About 36 pairs give 80 per cent, and that's with the true difference exactly zero. If it's really 0.2, which is still well inside the margin, it takes about 70.

So the lesson is general: work out which effect size the design can resolve before reading its output, then choose the replication. The figure is one simulated run with a true difference of zero and pair-to-pair differences with a standard deviation of 1. The first ten pairs leave the interval across the margin, and ten more bring it inside. What changed between the two is the width of the interval, not the size of the effect. If you extend a simulation study like this, run the extra pairs on new random seeds and leave the earlier runs alone.

![Two 90 per cent intervals for the same difference, both centred near zero. The one from ten pairs is wide and runs past the dashed margin on both sides. The one from twenty pairs lies inside the margin.](figure:a-null-is-a-result "One simulated study with a true difference of zero. A test of difference finds nothing either way. Only the interval from twenty pairs sits inside the margin of 0.5, and that happens in about two runs in five.")

## What to write instead

"Underpowered" on its own isn't a result. A bounded null is. For example: "the mean difference was -0.15 with a standard error of 0.13, and a difference larger than 0.5 is excluded at the 5 per cent level". That tells the reader how much the data rule out. A bare statistic with the word "underpowered" next to it says only that the result can be ignored, which is the opposite of what the interval shows.

The unresolved case deserves the same treatment, and I think it gets it less often. "The mean difference was 0.20 (standard error 0.31). The 90 per cent interval runs from -0.31 to 0.71, so the data are compatible with no difference and with a difference larger than the margin of 0.5. They don't settle it." That's an honest sentence, and it tells the next study what to aim for.

## Two things that look like evidence

Pooling two weak results. Two measurements, each below two standard errors and both positive, can pool to a larger z and look like a signal: two z values of 1.4 (each p = 0.16) pool to 1.98, p = 0.048. With no true effect, two draws land on the same side half the time. A simulation of two million null pairs says it's not as common as that sounds: of the pairs in which both results were individually non-significant, 1.9 per cent pooled past 1.96. So pooling isn't a large source of false signals by itself. I'd worry about the pooling that's decided after seeing which results disappointed, because an effect that came from that often goes when the experiment is repeated.

Being different from zero and being equivalent are separate questions, and both can hold at once. A mean difference of 0.2 with a standard error of 0.06 has a 90 per cent interval of 0.10 to 0.30. That's clearly not zero, and clearly inside a margin of 0.5. A test against zero, a test of equivalence and a criterion on the size of the difference answer three different questions, and a report can state all three.

Quote the interval, not two means, and put the number in the sentence that makes the claim.

## Outside the lab

The same logic applies wherever someone concludes "no effect": an intervention evaluated on a small sample, an index that "did not change", a policy compared with its predecessor. If nobody planned for the comparison to have power, a null says little.

Two cases with numbers. A monitoring programme counts a population once a year for ten years, and the log of the count scatters around its trend with a standard deviation of 0.2 (an assumed value, not a measured one). The slope of log count on year then has a standard error of 0.022, and its 90 per cent interval is about plus or minus 0.041. A flat-looking series of ten years can't rule out a decline of 4 per cent a year. A population that halves in 20 years loses about 3.4 per cent a year, and ten years of this data would pick that up as significant at 5 per cent only 28 per cent of the time.

Or a household survey asking whether people have cut their energy use, 100 households in each of two groups, about 30 per cent saying yes in both. The standard error of the difference is 0.065, so the 90 per cent interval extends 10.7 percentage points either side of whatever gap is observed. "No significant change" from a survey that size means a difference of up to ten points was never excluded.
