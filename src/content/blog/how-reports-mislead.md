---
title: "How reports mislead with statistics, usually without anyone lying"
date: 2026-12-08
summary: "Averages, denominators, subgroups, percentages and missing data can each flip a conclusion, usually through an honest choice nobody looked at. These are the ones I check first."
draft: true
---

Most of the reports I distrust don't contain a false number. They contain true numbers arranged so that the wrong conclusion is the easy one to draw. The cause is usually an honest choice that nobody looked at twice (which average, which denominator, which subgroup), and once you know the common ones you're much harder to mislead.

## Which average

Take three units with variances 1, 4 and 100. The square root of the mean variance is 5.92. The mean of the three standard deviations is 4.33. The square root of the median variance is 2.00. Each is a fair summary of "the typical spread", each could be quoted as "the prediction", and they're a factor of three apart. The first two differ by Jensen's inequality. The third differs because it ignores the unit with the largest variance. Which one is right depends on what was observed, so derive the form first, then compute it, and write its name next to the number.

Growth rates are the same trap in a form people meet more often. A population grows by 50% in one year and falls by 50% in the next. The arithmetic mean of the two rates is zero, which sounds like no change. The population has actually ended at 1.5 times 0.5 = 0.75 of where it started, and the geometric mean growth rate is sqrt(0.75) - 1, about -13.4% a year. The arithmetic mean does answer a question, the average size of a yearly change, but it isn't the one about where you end up. Prices, returns and anything else that multiplies behave the same way.

## Which denominator

Suppose island 1 has one endemic species out of two and island 2 has one out of ten. The mean of the two shares is 0.30. The share of the totals is two out of twelve, or 0.17. The first weights each island equally and the second weights each species equally, and a report that gives one without saying which leaves you to guess.

Per-head and total figures do the same thing. Say country P emits 500 megatonnes with 50 million people and country Q emits 2000 megatonnes with 400 million (made-up numbers). Q emits four times as much in total and half as much per head: 10 tonnes a head for P, 5 for Q. Both sentences are true, and a headline can pick whichever one suits the story.

## Simpson's paradox

A treatment can be better in every subgroup and worse overall. A well-known comparison of two treatments for kidney stones (Charig and colleagues, 1986) has these results.

| | Treatment A | Treatment B |
|---|---|---|
| Small stones | 93% (81 of 87) | 87% (234 of 270) |
| Large stones | 73% (192 of 263) | 69% (55 of 80) |
| Both | 78% (273 of 350) | 83% (289 of 350) |

A does better for small stones and for large stones. B looks better overall because it was used mostly on the easier cases: 270 of its 350 patients had small stones, against 87 of A's 350.

![Bars of the success rate of treatments A and B for small stones, for large stones, and for both together: A is higher in the first two groups and B is higher in the third.](figure:how-reports-mislead "A has the higher success rate in each group of stones and B has the higher rate when the groups are pooled. The pooled bars are averages weighted by how many patients each treatment had in each group.")

You can see the mechanism by giving both treatments the same mix of patients. The 700 patients together are 357 with small stones and 343 with large, about 51% and 49%. Weight each treatment's two success rates by those shares and A comes out at 83.3% and B at 77.9%. So the reversal comes from who got which treatment.

Whether to read the subgroups or the total depends on the causal story, which the table can't supply. Here stone size plausibly affects both the choice of treatment and the outcome, so the subgroups are the fairer comparison. Change the story and the total can be the right one. If a training programme raises incomes by moving people into a higher job grade, then comparing incomes within grades after the programme has already removed the thing it did. A report that gives only the total, or only the subgroups, has made that decision for you without saying so.

## Relative and absolute

"Risk doubles" can mean the chance of an event rises from 1 in 10,000 to 2 in 10,000. Both statements are true and they leave very different impressions. The relative risk is 2, the absolute increase is 1 in 10,000, and you'd have to expose 10,000 people to see one extra case.

The baseline matters as much. Halve the share of projects that fail, from 4 in 100 to 2 in 100, and you prevent one failure for every 50 projects. Halve it from 40 in 100 to 20 in 100 and you prevent one for every 5. Both are "50% lower". Ask for the absolute figure and the baseline, and check whether "per cent" has been used where "percentage points" is meant: a rise from 4% to 6% is two percentage points and also a 50% rise, and both get reported.

## When nothing is significant

A non-significant result is often reported as "no effect". With few observations, a true difference of half a standard deviation and a true difference of zero can look identical.

A quick check. Two groups of 20, a true difference of 0.5 standard deviations, an ordinary t-test at the 5% level. The chance of a significant result is 34% (from the noncentral t distribution; a simulation of 200,000 studies agrees). So the study misses a real, moderate effect about two times in three. If the estimate came out at exactly zero, the 95% interval would run about 0.6 either side, which takes in the half standard deviation we started with. The honest statement is an interval and a margin: differences larger than this are excluded, and the study says nothing about smaller ones.

## Who is not in the data

Only the organisations that responded, the species that survived or the projects that were completed enter the analysis. Conclusions about success rates from the survivors alone are optimistic by construction, and it's worth putting a number on how optimistic. Say project outcomes are normal with mean zero and standard deviation one, and any project that ends more than half a standard deviation below the mean is abandoned and never written up. The 69% that remain average +0.51, in a population whose true mean is 0. (That's the mean of a normal distribution cut off at -0.5: the density at the cut, 0.352, divided by the share above it, 0.691.) Nobody lied and every reported outcome is real. Ask who was left out, and how.

## One number for many things

A composite index weights many measurements into one number. Whether a different defensible weighting would reorder the ranking is rarely reported. When several units are close on the composite, a small change in the weights can swap them, and the published order then says more about the weights than about the units.

## A truncated axis

A bar chart that starts above zero exaggerates differences between bars, since length is read as magnitude. Two bars of 52 and 50 on an axis that starts at 48 are drawn 4 and 2 units tall. The first looks twice as big, and it is 4% bigger. Zero is the safe default for bars. For a line a different baseline can be reasonable if it's marked, although the same slope looks gentle or alarming depending on how much vertical room it gets.

## Where the series starts

Trends depend on the window. I made up a series with a slow rise of 0.02 a year and a cycle of 20 years with amplitude 0.5, and fitted a straight line to every stretch of 11 yearly values. The slopes run from -0.096 a year, for a window that starts at a peak, to +0.136 a year, for one that starts at a trough. The underlying rise is 0.02. A report that says "down since 2005" may be describing the cycle. Ask why the series starts where it does, and what the whole record looks like.

## What I ask of a report

None of these is an accusation, and most of the time the answers are harmless. It's quicker to ask early.

1. Compared with what, and out of how many?
2. Which average, and which denominator?
3. Are the groups comparable, and could a subgroup reverse the picture?
4. Is the change shown in absolute as well as relative terms?
5. Is "no difference" backed by an interval and a margin?
6. Who or what is missing from the data?
7. If an index is used, would other defensible weights change the ranking?
8. What does the axis start at, and why does the series start where it does?
