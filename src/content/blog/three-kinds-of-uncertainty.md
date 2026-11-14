---
title: "Three kinds of uncertainty"
date: 2027-03-16
summary: "The range around a projection mixes uncertainty about parameters, about the form of the model and about chance. They have different remedies, so show them separately before combining them."
draft: true
---

A projection usually comes with a range around it, and the range often mixes several things with different causes. Separating them shows which part more data would shrink and which part it would not.

## Three sources, and a fourth

Parameter uncertainty exists because the parameters are estimated from limited data. More or better data narrows it. It is usually shown by projecting from many plausible parameter sets, such as posterior draws or bootstrap fits.

Structural uncertainty is doubt about the form of the model: which processes are included, how density dependence enters, whether a threshold exists. The parameters of one form can be known exactly and the form can still be wrong. The remedy is to carry several forms through to the answer, ideally forms that agree equally well with the data so far.

Stochasticity is randomness in the system. Births, deaths and weather vary from year to year, and a projection with exactly known parameters is still a distribution. No amount of data on the past removes it.

Measurement error is a fourth thing and belongs to the observations. Counts are imperfect, so the data are not the state of the system. It affects what the model is fitted to and where the projection starts. A fit that ignores it tends to credit the system with noise that came from the counting, and state-space models (de Valpine and Hastings 2002) separate observation error from process noise for that reason.

## One projection, three bands

The example is a population of 100 growing towards a carrying capacity K of 1000, with a per-capita growth rate of 0.2 per year at size 100. All numbers are made up. The model is theta-logistic, dN/dt = r N (1 - (N / K)^theta), and theta = 1 is the ordinary logistic.

![Three stacked panels of population against years from now, each with a shaded band and a central line that rises from 100 and levels near 1000. The bands are widest in the panels for parameters and for chance and narrowest in the one for model form, and the chance panel has ragged lines inside it.](figure:three-kinds-of-uncertainty "Made-up numbers. One source of uncertainty per panel: 500 parameter draws, three model forms, and 1000 stochastic replicates, shown as the 5th to 95th percentile or the full range, with four replicates as thin lines.")

In the top panel the growth rate and K are drawn 500 times, each with a spread of about 15 per cent, and the logistic form is used throughout. The draws are independent, which is a simplification, since parameters estimated from the same data are usually correlated. In the middle panel theta is 1/3, 1 and 3 at the central parameter values, each form given the same present size and growth rate. In the bottom panel the logistic runs 1000 times at the central parameter values with a random shock of about 10 per cent each year.

| | Year 5 | Year 10 | Year 30 |
|---|---|---|---|
| Central projection | 252 | 505 | 989 |
| Parameters | 209 to 313 | 384 to 672 | 787 to 1260 |
| Model form | 235 to 269 | 422 to 657 | 922 to 1000 |
| Chance | 178 to 346 | 336 to 706 | 735 to 1292 |

The chance range is the widest at year 5, before the parameter range has had time to open, and it stays wide. The parameter range grows with the horizon because K sets the destination. By year 30 the model forms agree closely, because the three were forced to share K and the present growth rate. That is a property of this set-up, and a set of forms that differ in more than the shape of density dependence could spread further.

## What each one answers to

More data on growth and carrying capacity narrows the parameter band. It does little for the model-form band unless the data discriminate between the forms. Here that would take growth observed at sizes well above the present one. The chance band does not narrow with data about the past, so planning has to be done for a distribution of outcomes.

The three do not add up by simple arithmetic. To get the overall range, run them together in one simulation: draw the parameters, choose a form, add the noise, and repeat. Report that range along with the three separate ones, so a reader can see where the width comes from.

## Reading a projected range

- Which of the three sources are in the range shown, and which were left out?
- Were the parameters drawn jointly, or was the correlation between them dropped?
- Do the alternative forms fit the past data equally well?
- Is the noise in the model the kind that acts on the real system?
- Was observation error separated from process noise before fitting?
