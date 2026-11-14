---
title: "Fitting is not testing"
date: 2027-03-02
summary: "A model that matches the data it was tuned to hasn't been tested. Notes on overfitting, held-out data, cross-validation and AIC, and why the model has to be fixed before the test."
draft: true
---

If a model reproduces the data it was tuned to, that shows it can be tuned, and nothing more. Whether it describes the system is a separate question, and answering it takes data the model hasn't seen.

## Calibration and validation

Calibration means adjusting the parameters until the output matches the observations. Validation asks how well the calibrated model predicts observations that played no part in the tuning. With enough adjustable parts almost any model, including a wrong one, can be made to fit, so a good fit on its own separates very little.

Ten points show how far this goes. I simulated them from a smooth curve and added noise with standard deviation 0.2 to each. A polynomial of degree 9 has ten coefficients, so ten points determine it exactly, and a least-squares fit passes through every one.

![Ten noisy points, with fitted polynomials of degree 1, 3 and 9 and, dashed, the smooth curve the points came from. The degree-9 curve passes through all ten points and swings far from the true curve between and beyond them.](figure:fitting-is-not-testing "The same ten simulated points fitted three ways. The dashed line is the curve they came from. Degree 9 has no error on the points and is wrong almost everywhere else.")

I scored each fit by its root mean square error, on the ten points and on 200 new points drawn from the same curve with fresh noise. A model that knew the true curve would score about 0.2 on the new points, which is just the noise level.

| Degree | Error on the ten points | Error on 200 new points |
|---|---|---|
| 1 | 0.34 | 0.30 |
| 3 | 0.10 | 0.25 |
| 9 | 0.00 | 0.67 |

Degree 1 is too stiff to follow the bend. Degree 3 does best on the new points, though its error there is 2.5 times its error on the points it was fitted to, which is the usual gap. Degree 9 scores more than three times the noise level on new data, and yet if the ten points were all you had, it would look like the best of the three.

That's one draw of ten points, and I wanted to know if I'd picked an unlucky one. So I repeated the whole thing 2,000 times with fresh noise each time. The table's draw is on the bad side for degree 9: over the repeats its median error on new points was 0.44, and 0.67 sits at about the 81st percentile. But degree 9 was still worse than degree 3 in 99.9 per cent of the repeats, and worse than the straight line in 84 per cent. The medians for degrees 1 and 3 were 0.30 and 0.23.

There's a tidy reason the error on the fitted points is so flattering. Take a linear model with p fitted coefficients, n points, noise variance s^2, and a model that's roughly right. The expected squared error on the fitted points is s^2 (1 - p/n), and the expected squared error at the same x values with fresh noise is s^2 (1 + p/n). Each coefficient soaks up a share of the noise. With s = 0.2, n = 10 and a cubic (p = 4) that's 0.024 against 0.056, and the 2,000 repeats gave 0.024 and 0.057. At p = n the first number is zero, which is the degree-9 curve.

## Testing on data the model hasn't seen

The direct remedy is to hold data back. Set some observations aside before fitting, fit on the rest, and score the prediction on what was set aside. Cross-validation repeats this: split the data into k groups, fit k times leaving out one group each time, and average the scores.

On the same ten points, leave-one-out (k = 10) gives errors of 0.44 for degree 1, 0.16 for degree 3 and 30.7 for degree 8. A degree-8 polynomial goes exactly through any nine points, so it has nothing left to learn from and predicts the tenth hopelessly. Degree 9 can't be scored at all, because nine points don't determine ten coefficients. The 0.16 for the cubic makes me suspicious, though. It's below the noise level of 0.2, and on average no model can predict new noisy data better than the noise, so with only ten points that estimate has landed lucky. I'd trust the ranking of the three degrees more than the values.

Random splits flatter a model when the data have structure. Records from adjacent years, neighbouring sites or related species aren't independent, so a left-out point sits next to points the model was fitted to. Roberts and colleagues (2017) discuss splitting by blocks for data with temporal, spatial, hierarchical or phylogenetic structure. Leaving out whole years, sites or clades answers the question you usually have: how well does the model predict a new year, a new place or a new species?

A quick simulation to see the size of the effect. Take a series of 100 yearly values, each 0.9 times the previous one plus noise with standard deviation 1, so it wanders, with a standard deviation of about 2.3 overall. The model predicts a year as the mean of the two nearest years in the training data. Ten-fold cross-validation with random folds gives a typical error of 0.80. Leaving out ten consecutive years at a time gives 1.70. A model that just predicts the mean of the training years scores 2.03 and 2.14 under the two schemes. So random folds say the nearest-years model is about 2.5 times better than the constant, and blocks say it's about 1.3 times better. These are medians over 2,000 simulated series.

The other way this goes wrong is leakage. Anything computed from all the data before the split is part of the fitting: standardising the variables, keeping the predictors that correlate most with the outcome, choosing a transformation. If the held-out data helped make those choices, they aren't held out. The whole pipeline goes inside the loop.

## Penalising parameters

Information criteria give a score without holding data out. Akaike's criterion (1974) is 2k - 2 ln L, where k is the number of fitted parameters and L is the maximised likelihood. The 2k term charges for each parameter and the ln L term rewards fit. The Bayesian information criterion replaces 2k with k ln(n), which charges more once n is above 7 (ln 8 is a little over 2). Lower is better.

For Gaussian errors with the variance estimated, ln L comes down to n ln(RSS/n) plus a constant, where RSS is the residual sum of squares, and k counts the coefficients plus one for the variance. On the ten points AIC is -15.7 for degree 1, -35.1 for degree 3, -33.1 for degree 4 and -26.5 for degree 8. The fourth coefficient barely lowers the RSS and costs 2, which is the penalty doing its job. Leaving out degree 9, BIC picks degree 3 as well. Degree 9 has an RSS of about 10^-29 and an AIC of -666, far below everything else, because the likelihood has no maximum when every residual is zero. So the criterion only works with more points than parameters, like everything else here. The small-sample correction AICc, which adds 2k(k + 1)/(n - k - 1), isn't even defined from degree 7 up.

Two limits. These criteria rank only the models you give them, so the best of a poor set still wins, and they compare models fitted to the same data under a stated error model. And counting parameters is easy for a polynomial but not for a mechanistic model where some values are fixed from the literature or tied together by priors or a hierarchy. For those I'm not sure what k should be.

## Fix the model, then test

A validation set can be used once. If you look at the error, change the model and look again, the validation data have become calibration data, and the score is optimistic by an amount you can't see.

It happens faster than you'd think. Take 30 validation observations of pure noise and 200 candidate predictors that are also pure noise. Pick the candidate that correlates best with the outcome on the validation set. Over 3,000 repeats the median best correlation was 0.48, an R^2 of about 0.23. On 30 fresh observations the chosen candidate correlated at 0.00. With 20 candidates the best correlation was 0.34, and with 5 it was 0.22. Nobody tries 200 models on purpose, but a transformation here, a lag there, a different subset of sites and a different error measure multiply quickly, and each one is a candidate.

So settle the structure, the parameters to fit, the error measure and the score that would count as failure before the test, and write them down. If you need to iterate, keep a final set back and use it once.

The test should look like the use. A model meant to project forward is tested by fitting early years and predicting later ones. A model meant for new regions is tested in regions it wasn't fitted to. A species distribution model scored on randomly held-out records from one survey says how well it interpolates inside the surveyed area, which is a different thing from how it does in a region nobody surveyed. A demand model fitted to a decade of steady growth will score well on held-out years from that decade and say little about what it does in a recession.

## What I'd ask

When I'm handed a fit, the questions are roughly these. What was held out, and was it separated before any fitting, scaling and variable selection included? Does the test look like the use: next year, a new site, a new species? How many parameters were fitted, against how many independent observations (rows aren't always independent)? Was the model changed after the test score was seen? Was the score that counts as failure decided in advance? If the answers are vague, I treat the fit as calibration only.
