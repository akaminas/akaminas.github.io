---
title: "Three kinds of uncertainty"
date: 2027-03-16
summary: "The range around a projection mixes uncertainty in the parameters, in the form of the model and in chance. Each has a different remedy, so I'd show them separately before combining them."
draft: true
---

A projection usually comes with a range around it, and the range often mixes several things with different causes. Separating them shows which part more data would shrink and which part it would not.

## Three sources, and a fourth

Parameter uncertainty exists because the parameters are estimated from limited data. More or better data narrows it. It is usually shown by projecting from many plausible parameter sets, such as posterior draws or bootstrap fits.

Structural uncertainty is doubt about the form of the model: which processes are included, how density dependence enters, whether a threshold exists. The parameters of one form can be known exactly and the form can still be wrong. The remedy is to carry several forms through to the answer, ideally forms that agree equally well with the data so far.

Stochasticity is randomness in the system. Births, deaths and weather vary from year to year, and a projection with exactly known parameters is still a distribution. No amount of data on the past removes it.

The lines between the three are partly a modelling choice. If growth varies from year to year because of weather you haven't measured, that is chance. If you model growth as a function of temperature, the same variation moves into the temperature coefficient, which is a parameter, and into future temperature, which is a scenario and none of the three. The split depends on what you put in the model.

Nothing here is specific to populations. An economic projection has the same three: the elasticity you estimated, whether demand saturates or keeps growing, and next winter's weather.

Measurement error is a fourth thing and belongs to the observations. Counts are imperfect, so the data aren't the state of the system. It affects what the model is fitted to and where the projection starts. A fit that ignores it tends to credit the system with noise that came from the counting, and state-space models (de Valpine and Hastings 2002) separate observation error from process noise for that reason.

It can also invent structure. A quick simulation: 30 years of a population that is a random walk on the log scale, so no density dependence at all, with process noise of 0.1 and log-normal counting error of 0.2. Regress the observed growth ln(Y(t+1) / Y(t)) on the observed ln Y(t), which is the usual check for density dependence. Over 2000 such series the slope was negative in every one, and a naive t-test (t below -2.05) called it significant in 91 per cent. With perfect counts the same naive test already fires 27 per cent of the time, since regressing a series' change on its own level has that problem even without error, so the counting error took it from bad to nearly certain.

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
| All three together | 168 to 382 | 295 to 885 | 651 to 1384 |

The chance range is the widest at year 5, before the parameter range has had time to open, and it stays wide. The parameter range grows with the horizon because K sets the destination. By year 30 the model forms agree closely, because the three were forced to share K and the present growth rate. That is a property of this set-up, and a set of forms that differ in more than the shape of density dependence could spread further. The model-form band is also only as wide as the forms somebody wrote down. A fourth form that did something else would widen it, and nothing in the band says how likely that is.

The last row is the three together: draw the parameters, pick one of the three forms with equal probability (a choice I have no data for), add the noise, and repeat 20,000 times. The widths don't add. At year 5 the three separate widths are 104, 34 and 169, which sum to 307, and the combined band is 215 wide. At year 10 they sum to 894 and the combined band is 590. At year 30 they sum to 1108 and it is 733. (The parameter and chance widths are 5th to 95th percentiles and the model-form width is the full range of three forms, so the comparison is rough.)

## What each one answers to

More data on growth and carrying capacity narrows the parameter band. It does little for the model-form band unless the data discriminate between the forms. Here that would take growth observed at sizes well above the present one. The chance band doesn't narrow with data about the past, so planning has to be done for a distribution of outcomes.

How much does extra data buy? Suppose four times the data halves the spread of each estimate, the usual square-root rule, which holds only if the new data are as informative as the old. The spread of the draws then falls from 0.15 to 0.075. At year 30 the parameter band goes from 787 to 1260 down to 877 to 1107, about half as wide. But with chance included (parameters and chance together, logistic form), the band at year 30 goes from 723 wide to 603, a drop of about a sixth, and at year 10 from 476 to 417. The square-root rule is probably too kind here anyway. The population has only been seen at around 100 and K is 1000, so more counts at that size say little about K.

The three do not add up by simple arithmetic. To get the overall range, run them together in one simulation: draw the parameters, choose a form, add the noise, and repeat. Report that range along with the three separate ones, so a reader can see where the width comes from.

The reason to bother is coverage. Take the world to be the logistic with uncertain parameters and yearly shocks, and ask how often a simulated outcome lands inside the 5th to 95th percentile band of one source alone. For the parameter band it is 60, 67 and 70 per cent at years 5, 10 and 30. For the chance band alone it is 83, 80 and 79 per cent. The band with both is 90 per cent by construction. So someone who plans on a band that shows only the parameters will be outside it three or four times in ten.

A threshold question shows the same thing. The chance that the population is below 800 at year 30 comes out at 6 per cent from the parameters alone, 13 per cent from chance alone, and 21 per cent from the three together (20,000 runs). Each separate figure is true of a model that leaves something out, and the one worth planning on is the last.

## Reading a projected range

- Which of the three sources are in the range shown, and which were left out?
- Were the parameters drawn jointly, or was the correlation between them dropped?
- Do the alternative forms fit the past data equally well?
- Is the noise in the model the kind that acts on the real system?
- Was observation error separated from process noise before fitting?
