---
title: "How reports mislead with statistics, usually without anyone lying"
date: 2026-12-08
summary: "Averages, aggregation, subgroups, percentages and silence about uncertainty can each reverse a conclusion. Most of these are honest choices that nobody examined."
draft: true
---

Few reports contain false numbers. Many contain true numbers arranged so that the wrong conclusion is the natural one. The usual causes are honest choices that nobody examined, and for that reason a reader who knows the common ones is much harder to mislead.

## Which average

Take three units with variances 1, 4 and 100. The square root of the mean variance is 5.92. The mean of the three standard deviations is 4.33. The square root of the median variance is 2.00. All three are reasonable summaries of "the typical spread", they differ by a factor of three, and each is readable as "the prediction". The first two differ by Jensen's inequality, the third by quietly ignoring the unit with the largest variance. The right form depends on what was observed, so it should be derived before it is computed, and named beside the number.

## Which denominator

Suppose island 1 has one endemic species out of two and island 2 has one out of ten. The mean of the two shares is 0.30. The share of the totals is two out of twelve, or 0.17. The first weights each island equally and the second weights each species equally. A report that gives one of them without saying which has left the reader to guess.

## Simpson's paradox

A treatment can be better in every subgroup and worse overall. A well-known comparison of two treatments for kidney stones had these results.

| | Treatment A | Treatment B |
|---|---|---|
| Small stones | 93% (81 of 87) | 87% (234 of 270) |
| Large stones | 73% (192 of 263) | 69% (55 of 80) |
| Both | 78% (273 of 350) | 83% (289 of 350) |

A does better for small stones and for large stones, and B looks better overall because B was used more often on the easier, small stones. Whether to read the subgroups or the total depends on the causal story, which the table cannot supply. A report that gives only the total, or only the subgroups, has made that decision for you.

## Relative and absolute

"Risk doubles" may mean that the chance of an event rises from 1 in 10,000 to 2 in 10,000. Both statements are true, and they leave very different impressions. Ask for the absolute figure and the baseline.

## Silence is not a null

A non-significant result is often reported as "no effect". With few observations a true difference of half a standard deviation and a true difference of zero can look identical. The honest statements are an interval and a margin: differences larger than this are excluded.

## Who is not in the data

Only the organisations that responded, the species that survived, or the projects that were completed enter the analysis. Conclusions about success rates from the survivors alone are optimistic by construction. Ask who was left out and how.

## One number for many things

A composite index weights many measurements into one. Whether a different defensible weighting would reorder the ranking is rarely reported, and sometimes the answer is that it would.

## A truncated axis

A bar chart that starts above zero exaggerates differences between bars, since length is read as magnitude. Starting at zero is the safe default for bars. For a line, a different baseline can be reasonable, if it is marked.

## Questions to ask of any report

1. Compared with what, and out of how many?
2. Which average, and which denominator?
3. Are the groups comparable, and could a subgroup reverse the picture?
4. Is the change shown in absolute as well as relative terms?
5. Is "no difference" backed by an interval and a margin?
6. Who or what is missing from the data?
7. If an index is used, would other defensible weights change the ranking?
8. What does the axis start at?

These are not accusations, and most of the time the answers are harmless. Asking is the point, and it is quicker to ask early.
