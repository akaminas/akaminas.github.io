---
title: "Predicting, explaining and controlling are different jobs"
date: 2027-05-11
summary: "A model can predict well and still say nothing about what happens when you change an input. Prediction, explanation and control are separate goals, and each needs its own model and its own test."
draft: true
---

A model can predict well without explaining how a system works, and neither kind tells you what happens when you change something. Prediction, explanation and control are three different goals, and much bad advice comes from answering one of them when the question was another.

## The three questions

Prediction asks what y will be, given x as it occurs. A predictive model is judged by its error on data it was not fitted to, drawn under the conditions in which it will be used. Explanation asks which mechanism produces y, and is judged by whether the parts of the mechanism can be told apart and whether its other consequences hold. Control asks what happens to y if we set x, and that can only be tested by setting x, in an experiment or in a model whose structure has been checked against one.

Shmueli (2010) argued that explanatory power and predictive power are different things, and that the two goals lead to different choices in building and evaluating a model. A model with a high R^2 on its own data can predict badly on new data, and a model that predicts well may explain nothing.

| Goal | Question | Judged by |
|---|---|---|
| Prediction | What will y be, given x as it occurs? | Error on data not used for fitting, drawn as the future will be |
| Explanation | Which mechanism produces y? | Whether its parts are identified and its other consequences hold |
| Control | What happens to y if we set x? | An intervention, or a model checked against one |

## One system, two answers

Let z be a hidden variable that nobody measures, drawn from a standard normal. Let x = z + noise and y = z + noise, with independent standard normal noise in each. The variable y does not depend on x at all. In 200 simulated units, x as it occurs has a correlation of 0.47 with y, and a fitted line has slope 0.48. A forecaster would be pleased with that.

Now keep the same 200 values of y and give each unit a fresh x, drawn without reference to z and with the same spread as before. This is what setting x ourselves would do. The fitted slope is -0.01.

![Two scatter plots of y against x for the same 200 units. When x is left as it occurs, the points rise to the right and the fitted line has slope 0.48. When x is set by us, the points are a flat cloud and the slope is -0.01.](figure:predict-explain-control "The same y values, with x as it occurs (left) and with x set by us (right). The first panel answers a question about prediction and the second one about control.")

The same kind of line answers the first question and fails the second, and nothing in the fit tells you which one you hold. What differs is how x came to have its values, which is a fact about the world and not about the model. Over a very large sample the first slope settles at 0.5 and the second at zero, and these 200 units gave 0.48 and -0.01.

## Control and the Lucas critique

Lucas (1976) made this argument for economic policy. A relationship estimated from past data reflects how people behaved under the policy of the time. When the policy changes, behaviour changes with it, and the estimated relationship goes along. A model can forecast well while the policy is fixed and still mislead about what happens when it is changed. The concern applies wherever the thing being managed responds to the manager.

I would not read a slope as an effect unless I could say how x got its values. If x was assigned, as in a trial, the slope is evidence about control. If x was only observed, the slope is evidence about control only to the extent that an argument can be made about everything else that moves x and y together.

## What I check

Before fitting anything, I write down which of the three the model is for. Prediction needs the future to look like the past in the ways that matter, and a model that leans on a convenient proxy will keep predicting until the proxy stops tracking. Then:

- For prediction: hold out data that resemble the future, and say when the model would stop applying.
- For explanation: name a consequence of the mechanism that was not used in fitting, and check it. A mechanism that matches only the data it was tuned on has not been tested.
- For control: say what is set, by whom and how, and whether the data were generated the same way. If they were not, the fitted relationship may not apply.
