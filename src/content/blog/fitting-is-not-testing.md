---
title: "Fitting is not testing"
date: 2027-03-02
summary: "A model that matches the data it was tuned to has not been tested. Overfitting, held-out data, cross-validation and information criteria, and why the model has to be fixed before the test."
draft: true
---

A model that reproduces its data has shown that it can be tuned. Whether it describes the system is a separate question, and answering it takes data the model has not seen.

## Calibration and validation

Calibration adjusts the parameters until the output matches the observations. Validation asks how well the calibrated model predicts observations that played no part in the tuning. With enough adjustable parts almost any model, including a wrong one, can be made to fit, so the fit alone separates very little.

Ten points show how far this goes. They were simulated from a smooth curve, with random noise of standard deviation 0.2 added to each. A polynomial of degree 9 has ten coefficients, so ten points determine it exactly, and a least-squares fit passes through every one.

![Ten noisy points, with fitted polynomials of degree 1, 3 and 9 and, dashed, the smooth curve the points came from. The degree-9 curve passes through all ten points and swings far from the true curve between and beyond them.](figure:fitting-is-not-testing "The same ten simulated points fitted three ways; the dashed line is the curve they came from. The degree-9 curve has no error on the points and is wrong almost everywhere else.")

The table gives the root mean square error of each fit on the ten points and on 200 new points drawn from the same curve with fresh noise. A model that knew the true curve would score about 0.2 on the new points, which is the noise level.

| Degree | Error on the ten points | Error on 200 new points |
|---|---|---|
| 1 | 0.34 | 0.30 |
| 3 | 0.10 | 0.25 |
| 9 | 0.00 | 0.67 |

Degree 1 is too stiff to follow the bend. Degree 3 does best on the new points, though its error there is more than twice its error on the points it was fitted to, which is the usual gap. Degree 9 scores more than three times the noise level on new data. Yet if the ten points were all you had, it would look like the best fit of the three.

## Testing on data the model has not seen

The direct remedy is to hold data back. Set some observations aside before fitting, fit on the rest, and score the prediction on what was set aside. Cross-validation repeats this: it splits the data into k groups, fits k times leaving out one group each time, and averages the scores. A degree-9 polynomial is not even determined by nine points, because it has more coefficients than there are data.

Random splits flatter a model when the data have structure. Records from adjacent years, neighbouring sites or related species are not independent, so a left-out point sits next to points the model was fitted to. Roberts and colleagues (2017) discuss splitting by blocks for data with temporal, spatial, hierarchical or phylogenetic structure. Leaving out whole years, sites or clades answers the question you usually have: how well does the model predict a new year, a new place or a new species?

## Penalising parameters

Information criteria give a score without holding data out. Akaike's criterion (1974) is 2k - 2 ln L, where k is the number of fitted parameters and L is the maximised likelihood. The 2k term charges for each parameter and the ln L term rewards fit. The Bayesian information criterion replaces 2k with k ln(n), which charges more once n exceeds 7. Lower is better.

They rank only the models you supply, so the best of a poor set still wins, and they compare models fitted to the same data under a stated error model. Counting parameters is easy for a polynomial and harder for a mechanistic model with priors or hierarchical structure.

## Fix the model, then test

A validation set can be used once. If you look at the error, change the model and look again, the validation data have become calibration data, and the score is optimistic by an amount you cannot see. Settle the structure, the parameters to fit, the error measure and the score that would count as failure before the test, and write them down.

The test should resemble the use. A model meant to project forward is tested by fitting early years and predicting later ones. A model meant for new regions is tested in regions it was not fitted to. If you need to iterate, keep a final set back and use it once.

## Before trusting a fit

- What was held out, and was it separated before any fitting?
- Does the test resemble the use: next year, a new site, a new species?
- How many fitted parameters are there, against how many independent observations?
- Was the model changed after the test score was seen?
- Was the score that counts as failure decided in advance?
