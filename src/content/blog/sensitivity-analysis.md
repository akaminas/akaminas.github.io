---
title: "Which parameters matter"
date: 2027-03-09
summary: "Sensitivity analysis tells you which parameters drive a model's output. One-at-a-time checks miss interactions and variance-based indices catch them. Worth doing before you calibrate."
draft: true
---

A model with twenty parameters doesn't necessarily have twenty that matter. Sensitivity analysis is how you find out which do, and the answer settles what to measure, what to fix and what to leave out of the calibration.

## One at a time

The usual first check is to pick a baseline, change one parameter at a time up and down, and watch the output. It's cheap and easy to read. But it only describes the neighbourhood of the baseline, and it can't see an interaction, where the effect of one parameter depends on the value of another.

The Ishigami function is the standard test case for this:

    f = sin(x1) + 7 sin(x2)^2 + 0.1 x3^4 sin(x1)

with each input uniform between -pi and pi. Take the baseline (0, 0, 0). Vary x3 alone and f stays at exactly zero, because the x3 term is multiplied by sin(x1) and sin(0) is zero. A one-at-a-time check at that baseline would call x3 irrelevant. Over the whole range of the inputs it isn't.

## Global indices

Global methods vary all the inputs together over their ranges and ask how the variance of the output divides among them. Two numbers per input are in common use. The first-order index is the share of the variance that the input explains by itself: the variance of the average output given that input, divided by the total variance. The total index (Homma and Saltelli 1996) is the share that involves the input at all, alone or in combination with others. The gap between the two is the interaction. They're often called Sobol' indices, after the decomposition of the variance they rest on.

For the Ishigami function with these constants the exact values are known:

| Input | First-order | Total |
|---|---|---|
| x1 | 0.314 | 0.558 |
| x2 | 0.442 | 0.442 |
| x3 | 0.000 | 0.244 |

The input x2 acts alone. The input x3 has no first-order effect and a total of 0.244, all of it through its interaction with x1. That interaction is counted for both inputs, so x1 has 0.314 of its own plus the same 0.244, and the total indices sum to 1.244, which is more than one. The first-order indices sum to 0.756, and the missing 0.244 is the interaction.

In practice the indices are estimated by Monte Carlo sampling. Draw two independent samples of the inputs, then swap each input in turn from one sample into the other, which costs N(k + 2) model runs for k inputs. The estimators here are those of Saltelli and colleagues (2010). In the sample behind the figure, N = 1000 and three inputs, 5000 runs in all, the estimates fall within 0.05 of the exact values and the bootstrap intervals cover them.

![Estimated first-order and total sensitivity indices of the three inputs, as dots with intervals, and the exact values as short vertical ticks. The estimates sit close to the ticks, and the third input has a first-order index near zero and a total index near 0.24.](figure:sensitivity-analysis "Ishigami function, 5000 model runs. Dots are the Monte Carlo estimates with 95 per cent bootstrap intervals. The ticks are the exact values.")

That sample is one of many that could have been drawn. Repeating the estimate with 200 samples at each size (60 at the largest) gives a standard deviation for the first-order index of x1 of 0.15 at N = 100, 0.04 at N = 1000 and 0.014 at N = 10,000. At N = 1000 the first-order estimate for x3, whose true value is zero, came out negative about half the time, with a standard deviation of 0.035. A negative index is zero with noise, and I'd read it as zero. The total index of x3 was steadier in this example, 0.243 on average with a standard deviation of 0.014.

## Many parameters

The sampling scheme costs N(k + 2) runs, which for twenty parameters and N = 1000 is 22,000. That's nothing for a model that runs in a millisecond. For one that takes ten minutes it's about five months on a single processor. So something cheaper has to come first. Morris (1991) proposed trajectories that start at a random point in the input space and change one input at a time by a fixed step. A trajectory costs k + 1 runs and gives one elementary effect, the change in the output per change in the input, for every input. The mean and the spread of the elementary effects over, say, ten trajectories (210 runs for twenty parameters) flag the inputs that matter and, by a large spread, those that interact or act nonlinearly.

What comes out is a ranking, not shares of the variance. Its job is to cut twenty parameters to a handful before the larger budget is spent. When even that is too much, an emulator fitted to a few hundred runs can stand in for the model, at the price of a further error to check.

## What to do with the result

Inputs with a small total index can be fixed at a plausible value without changing the output much, and left out of the calibration. Inputs with a large total index drive the uncertainty of the output, so those are the ones to measure more carefully first. A large gap between total and first-order index means the input can't be tuned in isolation.

Run the analysis before calibrating. A parameter that barely moves the output can't be identified from data on that output. Many values fit equally well, and the fitted value often reflects only where the search started or what the prior said. Better to know that in advance than to fit parameters the data can't inform.

The indices have limits. They depend on the ranges you give the inputs: a wide range makes a parameter look important and a narrow one makes it look inert. They depend on the output examined, since a parameter that's idle for one output can dominate another. And the basic scheme assumes the inputs vary independently, which is often false for parameters that were estimated together.

Two of those limits show up in a small population model. Take logistic growth, N(t) = K / (1 + (K / N0 - 1) exp(-r t)), with r uniform on 0.3 to 0.7, K on 80 to 120 and N0 on 2 to 8, and estimate total indices from 50,000 samples. For the output N at t = 2, the initial size N0 carries 0.73, the growth rate 0.29 and K nothing. At t = 10 the growth rate leads with 0.70, K has come in at 0.24 and N0 has dropped to 0.12. At t = 20 the population is near its ceiling and K carries 0.99. Which parameter matters depends on when you read the output.

Now narrow the range of K to 98 to 102 and leave the model alone. At t = 20 the total index of K falls to 0.46 and that of r rises to 0.52, because the slow populations, with r near 0.3 and N0 near 2, haven't quite reached the ceiling. The variance of the output has dropped from about 130 to 2.8, and what's left is shared out differently.

A cost-benefit calculation behaves the same way. Take the present value of a benefit of B a year, with B uniform from 80 to 120 and the discount rate d uniform from 1 to 5 per cent (made-up numbers). The total index of the discount rate is 0.21 over 10 years, 0.63 over 30 years and 0.90 over 100 years. Over a century the annuity factor is 63.0 at 1 per cent and 19.8 at 5 per cent, a threefold difference that swamps the plus or minus 20 per cent on B. Whoever chooses the discount rate in such a model has chosen most of the answer, which the analysis shows before anyone argues about B.

Correlated inputs need more care than the basic scheme gives them. Estimates of a growth rate and a carrying capacity from the same data are often correlated, so sampling them independently covers combinations the data have already excluded and inflates the variance of the output. Sample from the joint distribution the calibration gave, or reparametrise in terms of quantities that are less tied together, and expect the indices of correlated inputs to be hard to separate.

## Before calibrating

I'd want answers to these first. Which output, and over what ranges for each input? Is the ranking of the inputs stable when either changes? Which inputs have a total index well above the first-order one, and so interact? Which can be fixed, which need measuring, and which are to be calibrated? And are there enough runs: an input you expect to be inert should come out at zero within the noise.
