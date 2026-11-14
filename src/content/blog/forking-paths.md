---
title: "The garden of forking paths"
date: 2027-06-08
summary: "Twenty independent tests at the 0.05 level give a 64 per cent chance of at least one false positive. The bigger problem is the choices made after seeing the data. Write the plan down first."
draft: true
---

A single test, fixed in advance, run at the 0.05 level when there's no effect, gives a false positive 5 times in 100. A study with many analyses has no such guarantee, and it makes no difference if the final report shows only one of them.

## Counting tests

Suppose k independent tests are each run at the 0.05 level, and no effect exists in any of them. The chance that at least one comes out significant is 1 - 0.95^k. For 20 tests, 0.95^20 is 0.36, so the chance is 0.64. It passes one half at 14 tests, where it's 0.51, and at 50 tests it's 0.92.

![The chance of at least one false positive rising with the number of independent tests, from 0.05 for one test to 0.92 for fifty, with simulated points lying on the curve, and a flat line near 0.05 for Bonferroni correction. The point for 20 tests is marked at 0.64.](figure:forking-paths "Chance of at least one false positive among k independent tests when every null is true. Circles: 4,000 simulated studies at each k. Curve: 1 - 0.95^k. Lower line: the Bonferroni correction.")

For each number of tests I simulated 4,000 studies in which every null was true. The circles lie within about 0.01 of the formula.

The independence assumption matters. If the tests are positively correlated, say several outcomes measured on the same animals, the chance is lower. I simulated 20 z tests with a common correlation between their statistics and every null true (200,000 studies each). The chance of at least one significant result was 0.64 at correlation 0, 0.54 at 0.3, 0.42 at 0.5 and 0.22 at 0.8. Correlation helps, but it takes a lot of it to get anywhere near 0.05.

Bonferroni's correction runs each test at 0.05 divided by the number of tests. For 20 tests that's 0.0025 each, and the chance of at least one false positive falls to 0.049. The price is power. The critical value of the test statistic, for a standard normal, rises from 1.96 to 3.02, so a real effect has to be larger, or the sample bigger, to be found. Take an effect of half a standard deviation and 64 observations per group: a two-sample z test has 81 per cent power at the 0.05 level and 42 per cent at 0.0025. Getting back to 80 per cent takes about 120 per group instead of 63, nearly twice the sample. (Both numbers come straight from the normal distribution.)

Less conservative corrections exist, and the choice among them belongs in the plan. Holm's step-down procedure (1979) controls the same chance of any false positive, with no assumption about how the tests depend on each other, and it's never less powerful than Bonferroni. A made-up case: four p-values of 0.001, 0.01, 0.02 and 0.04. Bonferroni's threshold is 0.05 / 4 = 0.0125, so it keeps two. Holm compares the smallest with 0.05 / 4, the next with 0.05 / 3, then 0.05 / 2 and 0.05 / 1, and keeps all four. Benjamini and Hochberg (1995) control something different, the expected share of false discoveries among the results called significant, under independence or some forms of positive dependence. That suits screening a few hundred species or sites when you expect some of them to be real.

## The tests you didn't run

Counting the tests you ran isn't enough. Gelman and Loken (2013) described a "garden of forking paths": when the details of an analysis depend on the data, there's a multiple-comparisons problem even if the researcher ran only one test and acted in good faith. With different data, a different outcome, a different cut-off or a different subgroup might have looked sensible, and the analysis would have followed it. The p-value of the test that was run says nothing about those other paths. Simmons, Nelson and Simonsohn (2011) called these researcher degrees of freedom, and showed by simulation that a few of them, used freely, push the false-positive rate far above 5 per cent.

In a modelling study the forks are easy to list. Which output is the result: the final value, the mean, the peak? How long is the burn-in, and how long the run? Which parameter range is swept, which runs are shown, which seed? In a field survey or an economic study it's the sample window, the sites or countries included, the control variables, and whether a continuous variable such as income or species richness gets cut into bands and where. Suppose an analysis has 3 candidate outcomes, 2 ways of treating outliers, 2 subgroup splits and 4 sets of covariates. That's 3 x 2 x 2 x 4 = 48 analyses, and each of them can look reasonable after the fact.

The formula above assumes independent tests, and analyses of one dataset overlap, so 1 - 0.95^48 = 0.91 is too high. How much too high depends on the data, so I tried a made-up case with exactly that structure. Eighty units are split at random into two groups of 40, and nothing differs between the groups. There are three outcomes correlated at about 0.5, and two covariates (age and site) that do affect them. The 48 analyses are each a t test of the group difference: one of the 3 outcomes, with or without dropping values more than 2.5 standard deviations out, on everyone or only on the units above the median age, with no covariates, age, site or both.

Over 5,000 simulated datasets the pre-specified analysis (first outcome, all the data, no covariates) was significant 5 per cent of the time, as it should be. At least one of the 48 was significant in 36 per cent of datasets, and at least one below 0.01 in 10 per cent. The mean number of significant analyses per dataset was 2.4, which is what 48 independent tests would give, but the median was 0: the significant ones arrive together. So in this case the chance is well below 0.91 and still about seven times 0.05, and in a real study you couldn't recover it from the finished report.

Stopping rules are forks too. Test after every 10 observations per group, stop at the first p below 0.05, and carry on to 100 per group if it never happens. With a z test and no effect that gave a false-positive rate of 0.19 over 100,000 simulated studies (five looks, one every 20, gave 0.14), against 0.05 for a single test at the end. The version in simulation work is running more replicates until the difference is significant. With enough runs any difference becomes significant, however small, so the p-value ends up measuring how many runs you chose to do. White and colleagues (2014) argue for that reason that ecologists shouldn't use significance tests on simulation output. I'd report the size of the difference and how well it's pinned down.

## What I'd do

Write down the plan before looking at the outcome data. It should name the outcome, the comparison, the exclusion rules, the model, the number of runs and the seeds, and it should carry a date. A file under version control does the job, and a registered protocol does it more publicly.

For a model comparison the plan can be one paragraph. Something like: the outcome is the mean population over years 200 to 500; the comparison is scenario A against scenario B with 50 seeds each, the same seeds in both; runs that go extinct before year 200 are kept and counted as zero; the result is the difference in means with a 95 per cent interval. Each sentence closes a fork that would otherwise be open when the results arrive.

Report every analysis that was run, including the ones that were dropped, in a table or an appendix. Mark what was decided after seeing the data as exploratory. Exploratory results can be good ideas for the next study, but their p-values can't be read at face value.

Where many reasonable choices exist and none is obviously right, show the result under several of them. Steegen and colleagues (2016) call this a multiverse analysis: run every reasonable processing choice and show the lot. If the conclusion holds across the choices, it doesn't rest on the one that was picked. If it holds under only one, the reader should know that.

When k tests answer one question, adjust for k or report all of them. Among 20 tests of true nulls, at least one significant result turns up about two times in three.

A plan can't foresee everything. A sensor fails, a site floods, an exclusion rule that looked fine doesn't fit the data that arrived. I'd change the plan then, date the change, and say what had been seen when I made it, so the reader can judge whether it was made blind. And when you don't yet know what to measure, you have to look at the data to find out. That's fine, as long as the paper says that's what happened and the p-values from that stage are left out of the argument.
