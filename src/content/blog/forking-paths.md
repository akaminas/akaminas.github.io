---
title: "The garden of forking paths"
date: 2027-06-08
summary: "Twenty independent tests at the 0.05 level give a 64 per cent chance of at least one false positive. The larger problem is the choices made after seeing the data. Record a plan; report every analysis."
draft: true
---

A single test, fixed in advance, run at the 0.05 level when there is no effect, gives a false positive 5 times in 100. A study with many analyses has no such guarantee, and it makes no difference if the final report shows only one of them.

## Counting tests

Suppose k independent tests are each run at the 0.05 level, and no effect exists in any of them. The chance that at least one comes out significant is 1 - 0.95^k. For 20 tests, 0.95^20 is 0.36, so the chance is 0.64. It passes one half at 14 tests, where it is 0.51, and at 50 tests it is 0.92.

![The chance of at least one false positive rising with the number of independent tests, from 0.05 for one test to 0.92 for fifty, with simulated points lying on the curve, and a flat line near 0.05 for Bonferroni correction. The point for 20 tests is marked at 0.64.](figure:forking-paths "Chance of at least one false positive among k independent tests of true nulls. Circles are simulated (4,000 studies at each k), the curve is 1 - 0.95^k, and the lower line is the Bonferroni correction.")

For each number of tests I simulated 4,000 studies in which every null was true. The circles lie within about 0.01 of the formula.

Bonferroni's correction runs each test at 0.05 divided by the number of tests. For 20 tests that is 0.0025 each, and the chance of at least one false positive falls to 0.049. The price is power. The critical value of the test statistic, for a standard normal, rises from 1.96 to 3.02, so a real effect has to be larger, or the sample bigger, to be found. Less conservative corrections exist, and the choice among them belongs in the plan.

## The tests you did not run

Counting the tests you ran is not enough. Gelman and Loken (2013) described a "garden of forking paths": when the details of an analysis depend on the data, there is a multiple-comparisons problem even if the researcher ran only one test and acted in good faith. With different data, a different outcome, a different cut-off or a different subgroup might have looked sensible, and the analysis would have followed it. The p-value of the test that was run says nothing about those other paths.

In a modelling study the forks are easy to list. Which output is the result: the final value, the mean, the peak? How long is the burn-in, and how long the run? Which parameter range is swept, which runs are shown, which seed? Suppose an analysis has 3 candidate outcomes, 2 ways of treating outliers, 2 subgroup splits and 4 sets of covariates. That is 3 x 2 x 2 x 4 = 48 analyses, and each of them can look reasonable after the fact.

The formula above assumes independent tests, and analyses of one dataset overlap. The chance of a false positive is therefore lower than 1 - 0.95^48 would give. By how much depends on the data and cannot be recovered from the finished report, and it is still well above 0.05.

## What to do

Write down the plan before looking at the outcome data. It should name the outcome, the comparison, the exclusion rules, the model, the number of runs and the seeds, and it should carry a date. A file under version control does the job, and a registered protocol does it more publicly.

Report every analysis that was run, including the ones that were dropped, in a table or an appendix. Mark what was decided after seeing the data as exploratory. Exploratory results can be good ideas for the next study, but their p-values cannot be read at face value.

Where many reasonable choices exist and none is obviously right, show the result under several of them. If the conclusion holds across the choices, it does not rest on the one that was picked. If it holds under only one, the reader should know that.

When k tests answer one question, adjust for k or report all of them. Among 20 tests of true nulls, at least one significant result turns up about two times in three.

- Date the plan before the outcome data are examined.
- List every analysis run, not only the reported one.
- Label analyses decided after seeing the data as exploratory.
- Adjust for the number of tests in a family, or show them all.
- Show whether the conclusion survives the other reasonable choices.
