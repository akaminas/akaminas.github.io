---
title: "Transparent reporting, and why a quantitative scientist belongs in the room"
date: 2026-12-01
summary: "A number should come with its estimator, its comparison and its uncertainty. Asking for those early is cheap, and it's most of what a quantitative scientist adds to a meeting."
draft: true
---

A report is transparent when a reader can tell what a number means, how it was obtained and what else it could have been. It's statistically correct when the method suits the question. The two are linked, because a method nobody can see is a method nobody can check, and an error in it can survive all the way to publication.

A number reaches a reader through four links: the data, the code that processes them, the number that comes out, and the sentence that reports it. Something has to be written down at each link, or the reader can't trace the sentence back.

![Four boxes in a row joined by arrows: data, code, number, sentence. Under each box are two things to record: source and what repeats, version and what it checks, estimator and interval, comparison and margin. A line runs back under them all from the sentence to the data.](figure:transparent-reporting "The four links between the data and the sentence. Each has something that has to be recorded if a reader is to trace the sentence back.")

## What transparency asks for

Here's the list I keep coming back to.

- Name the estimator next to the number. A column called "predicted" with no formula beside it is a future disagreement. Put it in the table and not only in the text.
- Say how a quantity was aggregated. The mean of the variances, the mean of the standard deviations and the median give different answers from the same data. Which one is right depends on what the observed statistic is, and that should be worked out before anything is computed.
- Quote the interval, and put it on the difference. Two means side by side invite the reader to judge the gap by eye.
- Be careful with "no difference". Failing to find one isn't evidence that there is none. If the claim is that two things are the same, it needs a test built for sameness, with a margin fixed in advance.
- Fix the criteria before looking. If a test is meant to confirm something, write the criteria down first, in a form that can't be quietly changed, and report the cases where they fail. Criteria chosen after the results are in will always look reasonable, which is the trouble with them.
- Account for what repeats. If runs, patients or organisations come in clusters, the standard error has to respect the clusters.
- Keep checks of the code apart from checks of the world. That the program solves the stated equations correctly is one claim. That the equations describe the system is another. Say which one a test supports. A solver that reproduces a known analytic solution to six digits tells you the code is right, and nothing about whether a logistic curve is a fair description of the lake.
- Make the number reproducible. Someone else should be able to get it from what you give them.

## Checks that take a minute

Most of these are easier to believe once you've seen the arithmetic, so here are four.

Start with intervals on the difference. Suppose two means are 10.0 and 13.0, each with a standard error of 1.0. Their 95 per cent intervals are 8.0 to 12.0 and 11.0 to 15.0, and they overlap, so it looks like no difference. But the difference is 3.0 with a standard error of sqrt(2) = 1.41, which gives an interval of 0.2 to 5.8. Overlap between two intervals doesn't tell you what the interval on the difference will do. Move the second mean to 12.5 and the same overlap goes with a difference interval of -0.3 to 5.3, which includes zero. The overlap alone can't tell those two cases apart.

Then out of how many. A simulation study reports that 13 of 20 runs ended in extinction. That's 65 per cent, and the 95 per cent Wilson interval is 43 to 82 per cent. With 200 runs and the same 65 per cent it's 58 to 71, and with 2,000 it's 63 to 67. Reporting "65%" without the denominator hides which of these you're looking at.

Then absence of a difference. Take two groups of 10 and a real difference of half a standard deviation. A two-sided t-test at the 5 per cent level finds it in about 18 per cent of studies (a simulation of 400,000 gives 18.4 per cent). So four times in five the study finds nothing, even though the difference is there. About 64 per group gets you to 80 per cent power. "No significant difference" from a study of 10 per group says very little.

And clusters. Take 20 clusters of 10 observations, with a correlation of 0.3 between observations in the same cluster. The standard error of the overall mean is inflated by sqrt(1 + 9 x 0.3) = 1.92, and the effective sample size is 200/3.7 = 54, not 200. I simulated this (100,000 data sets): the true standard error was 0.136 and the naive one averaged 0.070, so the naive 95 per cent interval covered the true mean 69 per cent of the time.

## A common case

Suppose the text of a report describes one way of averaging and its table reports another. Each looks right on its own. A colleague who reproduces the number finds the difference, and a check by the author often doesn't. The way to find it is dull: recompute the number from the raw data with the formula as the text writes it, then with the formula as the code has it, and see whether they agree. Correcting the estimator changes the size of the effect, and it doesn't rescue a comparison that has its own flaw. So two things, I think: independent reproduction catches what self-review misses, and a correct estimator on the wrong comparison is still wrong.

## Why every room needs one

Meetings where decisions rest on numbers are everywhere: project consortia, boards, funders, policy teams. In a lot of them, asking the questions above is nobody's job. A quantitative scientist asks them early, when a change costs a sentence and not a retraction.

The questions are short.

- Compared with what?
- Out of how many?
- How uncertain is it, and who chose the weights or the boundary?
- What would change the conclusion?
- Could someone else reproduce this?

"Compared with what" is the one I'd ask first. If unemployment goes from 4.0 to 4.4 per cent, that's a rise of 10 per cent or of 0.4 percentage points, and both are correct. They sound very different in a headline.

"Who chose the weights" matters whenever a composite index is used to rank things. Take three units scored on two indicators (made-up numbers): X scores 80 and 40, Y scores 60 and 65, Z scores 45 and 90. With equal weights the totals are 60, 62.5 and 67.5, so Z comes first. Put 0.8 on the first indicator and 0.2 on the second and they become 72, 61 and 54, and X comes first. The ranking reversed completely. It's usually not obvious from the published index that this could happen.

For "could someone else reproduce this", a page is enough. Where the data came from and when they were retrieved, the version of the code, the random seed, the software versions, and the formula for the estimator. Reproduction then means someone else running it from a clean folder and getting the same number.

A quantitative scientist in the room makes the numbers a shared object that everyone can examine. People who know the subject often see at once that an assumption is wrong, but only if it has been stated.

## A caution

Quantitative scientists make the errors above as readily as anyone. The argument is for a habit of explicit questions and independent checks, and for at least one person in the room whose job is to supply them. That person also needs to listen to the domain experts, since the best check on a model is often a remark from someone who has worked with the system for years. There's a cost as well: all this takes time, and some data can't be shared. Then the least you can do is describe them, and say what a reader would need to reproduce the result if they had access.
