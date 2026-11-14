---
title: "Which parameters matter"
date: 2027-03-09
summary: "Sensitivity analysis shows which parameters drive a model's output. One-at-a-time checks miss interactions, and variance-based indices find them. It is worth doing before calibrating."
draft: true
---

A model with twenty parameters does not necessarily have twenty that matter. Sensitivity analysis finds out which do, and the answer settles what to measure, what to fix and what to leave out of the calibration.

## One at a time

The usual first check is to choose a baseline, change one parameter at a time up and down, and watch the output. It is cheap and easy to read. It describes only the neighbourhood of the baseline, and it cannot see an interaction, where the effect of one parameter depends on the value of another.

The Ishigami function is a standard test case for this. It is

    f = sin(x1) + 7 sin(x2)^2 + 0.1 x3^4 sin(x1)

with each input uniform between -pi and pi. Take the baseline (0, 0, 0). Vary x3 alone and f stays at exactly zero, because the x3 term is multiplied by sin(x1) and sin(0) is zero. A one-at-a-time check at that baseline would call x3 irrelevant. Over the whole range of the inputs it is not.

## Global indices

Global methods vary all the inputs together over their ranges and ask how the variance of the output divides among them. Two numbers per input are in common use. The first-order index is the share of the variance that the input explains by itself: the variance of the average output given that input, divided by the total variance. The total index (Homma and Saltelli 1996) is the share that involves the input at all, alone or in combination with others. The gap between the two is the interaction.

For the Ishigami function with these constants the exact values are known:

| Input | First-order | Total |
|---|---|---|
| x1 | 0.314 | 0.558 |
| x2 | 0.442 | 0.442 |
| x3 | 0.000 | 0.244 |

The input x2 acts alone. The input x3 has no first-order effect and a total of 0.244, all of it through its interaction with x1. That interaction is counted for both inputs, so x1 has 0.314 of its own plus the same 0.244, and the total indices sum to 1.244, more than one. The first-order indices sum to 0.756, and the missing 0.244 is the interaction.

In practice the indices are estimated by Monte Carlo sampling. Two independent samples of the inputs are drawn, then each input in turn is swapped from one sample into the other, which costs N(k + 2) model runs for k inputs. The estimators here are those of Saltelli and colleagues (2010). With N = 1000 and three inputs, 5000 runs in all, the estimates fall within 0.05 of the exact values and the bootstrap intervals cover them.

![Estimated first-order and total sensitivity indices of the three inputs, as dots with intervals, and the exact values as short vertical ticks. The estimates sit close to the ticks, and the third input has a first-order index near zero and a total index near 0.24.](figure:sensitivity-analysis "Ishigami function, 5000 model runs. Dots are Monte Carlo estimates with 95 per cent bootstrap intervals, ticks are the exact values.")

## What to do with the result

Inputs with a small total index can be fixed at a plausible value without changing the output much, and left out of the calibration. Inputs with a large total index drive the uncertainty of the output, so they are the ones to measure more carefully first. A large gap between total and first-order index means the input cannot be tuned in isolation.

Run the analysis before calibrating. A parameter that barely moves the output cannot be identified from data on that output. Many values fit equally well, and the fitted value often reflects only where the search started or what the prior said. Knowing this in advance saves fitting parameters that the data cannot inform.

The indices have limits. They depend on the ranges given to the inputs: a wide range makes a parameter look important and a narrow one makes it look inert. They depend on the output examined, since a parameter that is idle for one output can dominate another. And the basic scheme assumes the inputs vary independently, which is often false for parameters that were estimated together.

## Before calibrating

- Which output, and over what ranges for each input?
- Is the ranking of the inputs stable when either changes?
- Which inputs have a total index well above the first-order one, and so interact?
- Which can be fixed, which need measuring, and which are to be calibrated?
