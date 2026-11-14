---
title: "Transparent reporting, and why a quantitative scientist belongs in the room"
date: 2026-12-01
summary: "A number should carry its estimator, its comparison and its uncertainty. Asking those questions early is cheap, and it is the main thing a quantitative scientist adds to a meeting."
draft: true
---

A report is transparent when a reader can tell what a number means, how it was obtained and what else it could have been. It is statistically correct when the method suits the question. The two are linked, since most statistical errors that survive to publication do so because the method was not visible.

## What transparency asks for

**Name the estimator next to the number.** A column called "predicted" with no formula beside it is a future disagreement. The estimator should appear in the table, not only in the text.

**State how a quantity was aggregated.** The mean of the variances, the mean of the standard deviations and the median give different answers from the same data. Which is correct depends on what the observed statistic is, and the choice should be derived before it is computed.

**Quote the interval.** Two means beside each other invite the reader to judge the gap by eye. An interval on the difference is the quantity of interest.

**Treat "no difference" with care.** Failing to find a difference is not evidence that there is none. If the claim is that two things are the same, it needs a test designed for sameness, with a margin fixed in advance.

**Fix criteria before looking.** If a test is meant to confirm something, write the criteria down first, ideally in a form that cannot be quietly changed, and report the cases where they fail.

**Account for what repeats.** If runs, patients or organisations come in clusters, the standard error should respect the cluster. A naive standard error over observations treats related observations as independent and comes out too small.

**Keep checks of the code apart from checks of the world.** That the program solves the stated equations correctly is one claim. That the equations describe the system is another. Say which one a test supports.

**Make the number reproducible.** Another person should be able to arrive at it from what you provide.

## A familiar example

The text of a claim describes one way of averaging, while its table reports another. Each looks correct on its own. A colleague who reproduces the number finds the difference, and an internal check does not. Correcting the estimator changes the size of the effect, and it does not rescue a comparison that has its own flaw. Two lessons follow. Independent reproduction catches what self-review misses, and a correct estimator on the wrong comparison is still wrong.

## Why every room needs one

Meetings where decisions rest on numbers are common: project consortia, boards, funders, policy teams. In most of them, nobody is paid to ask the questions above. A quantitative scientist asks them early, when a change costs a sentence rather than a retraction.

The questions are short:

- Compared with what?
- Out of how many?
- How uncertain is it, and who chose the weights or the boundary?
- What would change the conclusion?
- Could someone else reproduce this?

The role is not to overrule experts in the subject. It is to make the numbers a shared object that everyone can examine. People who know the subject often see at once that an assumption is wrong, but only if it has been stated.

## A caution

The case is not that quantitative scientists are right. They make the errors described above as readily as anyone. The case is for a habit of explicit questions and independent checks, and for having at least one person in the room whose job is to supply them. In practice that person also needs to listen to the domain experts, since the best check on a model is often a remark from someone who has worked with the system for twenty years.
