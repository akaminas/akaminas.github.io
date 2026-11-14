---
title: "Predicting, explaining and controlling are different jobs"
date: 2027-05-11
summary: "A model can predict well and say nothing about what happens when you change an input. Prediction, explanation and control are separate jobs with separate tests. A small simulation shows the gap."
draft: true
---

A model can predict well without explaining how a system works, and neither tells you what happens when you change something. Prediction, explanation and control are three different jobs, and a lot of bad advice comes from answering one when the question was another.

## The three questions

Prediction asks what y will be, given x as it occurs. A predictive model is judged by its error on data it wasn't fitted to, drawn under the conditions in which it will be used. Explanation asks which mechanism produces y, and is judged by whether the parts of the mechanism can be told apart and whether its other consequences hold. Control asks what happens to y if we set x, and that can only be tested by setting x, in an experiment or in a model whose structure has been checked against one.

Shmueli (2010) argued that explanatory power and predictive power are different things, and that the two goals lead to different choices in building and evaluating a model. A model with a high R^2 on its own data can predict badly on new data, and a model that predicts well may explain nothing.

| Goal | Question | Judged by |
|---|---|---|
| Prediction | What will y be, given x as it occurs? | Error on data not used for fitting, drawn as the future will be |
| Explanation | Which mechanism produces y? | Whether its parts are identified and its other consequences hold |
| Control | What happens to y if we set x? | An intervention, or a model checked against one |

One model can be asked all three. A regression can be a decent predictor, a poor mechanism and silent about control at once. What changes is the question you put to it and the test you'd accept. The reverse also holds: a mechanistic model with the right structure can predict worse than a plain regression, because its parameters have to be estimated from limited data, so a poor forecast isn't a verdict on the mechanism.

## One system, two answers

Let z be a hidden variable that nobody measures, drawn from a standard normal. Let x = z + noise and y = z + noise, with independent standard normal noise in each. The variable y doesn't depend on x at all. In 200 simulated units, x as it occurs has a correlation of 0.47 with y, and a fitted line has slope 0.48. A forecaster would be pleased with that.

Now keep the same 200 values of y and give each unit a fresh x, drawn without reference to z and with the same spread as before. This is what setting x ourselves would do. The fitted slope is -0.01.

![Two scatter plots of y against x for the same 200 units. When x is left as it occurs, the points rise to the right and the fitted line has slope 0.48. When x is set by us, the points are a flat cloud and the slope is -0.01.](figure:predict-explain-control "The same y values, with x as it occurs (left) and with x set by us (right). The first panel answers a question about prediction and the second one about control.")

The same kind of line answers the first question and fails the second, and nothing in the fit tells you which one you hold. What differs is how x came to have its values, which is a fact about the world and not about the model. Over a very large sample the first slope settles at 0.5 and the second at zero, and these 200 units gave 0.48 and -0.01.

Quick check on how good the line is as a forecaster. I took the one fitted to the 200 units and tested it on 400,000 fresh units from the same process. Its root mean square error is 1.22, against 1.41 for predicting the mean every time. That's a real gain (R^2 is 0.25) from a variable that does nothing to y. Then I tested the same line on fresh units where x is set by us. The error is 1.57, worse than the 1.41 you'd get by ignoring x. So the line pays under one regime and costs you under the other, and the extra error isn't noise, it's a bias that points the wrong way.

If z had been measured and put in the regression, the coefficient on x in those 200 units is -0.06 and on z it's 1.03. The mechanism comes back, but only because I happened to have the one variable that matters. Nothing in a regression on x alone says z exists.

My intervention also assumes things. It replaces x by draws that are independent of z, which takes it that setting x leaves z alone and that y really doesn't respond to x. If the way you set x also moves z, the second slope won't be zero. Whether an intervention is clean is a fact about the intervention. In Pearl's notation (2009) the first slope belongs to y given x, the second to y given that x is set, written do(x), and the two differ whenever something else moves both.

## Control and the Lucas critique

Lucas (1976) made this argument for economic policy. A relationship estimated from past data reflects how people behaved under the policy of the time. When the policy changes, behaviour changes with it, and the estimated relationship goes along. A model can forecast well while the policy is fixed and still mislead about what happens when it's changed. The concern applies wherever the thing being managed responds to the manager. The textbook case is the Phillips curve, a negative relation between inflation and unemployment in past data that stopped holding in the 1970s, once policy leaned on it.

I wouldn't read a slope as an effect unless I could say how x got its values. If x was assigned, as in a trial, the slope is evidence about control. If x was only observed, the slope is evidence about control only to the extent that an argument can be made about everything else that moves x and y together.

An ecological case where control was tested directly. Across lakes, those with more phosphorus have more algae, but they also differ in plenty else. Schindler (1974) divided a lake in two with a curtain and fertilised one basin with carbon and nitrogen and the other with carbon, nitrogen and phosphorus. Only the second bloomed. A survey couldn't have said that as cleanly. Here x was set and the rest held.

A market gives a socioeconomic version of the same trap. Say demand is q = 10 - p + u and supply is q = 2 + 0.5 p + v, with independent shocks u and v. What we observe are the pairs of price and quantity where the two curves cross. Over 400,000 simulated markets, regressing q on p gives a slope of -0.25 when the two kinds of shock are the same size, and +0.20 when demand shocks have twice the standard deviation of supply shocks. Neither is the demand slope, -1, or the supply slope, 0.5. You only get one of the true slopes when the other curve stays still: demand shocks alone trace out the supply curve, and supply shocks alone trace out demand. The regression can't tell you which of those worlds you're in, and what happens to quantity when we set the price depends on it.

## When a good predictor misleads

Caruana and colleagues (2015) describe a model built to predict deaths from pneumonia that learned that patients with asthma were at lower risk. That was true in the records. Patients with asthma were sent to intensive care more readily and did better for it. As a predictor of who dies under the hospital's practice at the time it was fine. As a guide to who needs less care it would have been dangerous, and nothing in the fit was wrong.

Prediction also fails more quietly. Lazer and colleagues (2014) discuss Google Flu Trends, which estimated influenza from search queries. It tracked reported flu for some years and then overestimated it. A model that leans on a convenient proxy will keep predicting until the proxy stops tracking, and the fit won't tell you when that is.

## What I check

Before fitting anything I write down which of the three the model is for. Prediction needs the future to look like the past in the ways that matter. When a colleague hands me a coefficient I ask what the data would look like if x did nothing, and whether that world would give the same coefficient. In the first example it would.

- For prediction: hold out data that resemble the future, and say when the model would stop applying.
- For explanation: name a consequence of the mechanism that was not used in fitting, and check it. A mechanism that matches only the data it was tuned on hasn't been tested.
- For control: say what is set, by whom and how, and whether the data were generated the same way. If they weren't, the fitted relationship may not apply.
