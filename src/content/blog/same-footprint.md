---
title: "When two causes leave the same footprint"
date: 2027-01-26
summary: "If different parameter values give the same output, the data can't tell them apart. Check identifiability on simulated data before you fit real data, and treat a flat answer as a result."
draft: true
---

Parameters are identifiable if different values give different outputs. They're structurally unidentifiable if some different values give exactly the same output, and practically unidentifiable if the outputs differ by less than the noise. Two different models can also give the same pattern, which is a case of equivalence. The idea is simple. The consequences are easy to miss.

## The smallest example

Take a model that returns only the product, y = a × b. The pairs (a, b) = (2, 3) and (6, 1) both give 6. From y alone you can read the product and nothing else. In a plot of the two parameters the pairs that give the same output lie along a curve, a ridge, and a fit to y alone can't locate the true values along it.

![A plane of two parameters, a and b, with curves of constant product. The pairs (2, 3) and (6, 1) lie on the same curve, where the output is 6.](figure:same-footprint "Each curve is the set of parameter pairs that give one output. (2, 3) and (6, 1) sit on the same curve, y = 6, so the output can't tell them apart.")

An optimiser shows the ridge better than a plot does. Ask a least-squares routine to fit a and b to y = 6 and it returns a pair with ab = 6, and which pair depends on where it started. From (1, 1) it stops at (2.449, 2.449). From (4, 0.5) it stops at (4.11, 1.46), from (0.5, 8) at (0.748, 8.018), and from (6, 0.2) at (5.854, 1.025). Each fits perfectly, with zero error and no warning, and the answer only records the starting point.

More data of the same kind don't help: the product is all that y contains, however often it's measured. A different measurement does, say a separate determination of a or b, which cuts the ridge at one point. Failing that, report what can be estimated, the product, and say that a and b aren't separately known.

## An example from ecology

A standard way to infer how a community assembled is to count its species and measure how closely related or similar they are. Strong competition removes species by crowding. A low rate of arrival supplies fewer species to begin with. Both can give the same pattern as far as richness or tree-based statistics go: fewer species, similarly structured. If so, those statistics can't separate the two processes on a single island, and an inference built on them inherits the confound.

One way out is a statistic that cuts across the ridge. Competition acts on traits directly and colonisation doesn't, so the spread of traits could vary along the ridge and pin down the position. Whether it does is an empirical question about a model, and the answer may differ between systems. I'd find out with the check below: simulate communities under competition alone and under limited colonisation alone, tuned to the same richness, and see whether the trait statistic differs between them.

## Check before you fit

The rule I'd follow is to test identifiability on simulated data before touching real data. Simulate from the model with known parameters, run the inference you plan to use, and see whether the known values come back and with what uncertainty. Then repeat across the range of parameters that matter, corners included.

A fit to real data can return a nice-looking answer in a region where the model could never have told the parameters apart. The precision then comes from the method, not the data.

Now a case where the ridge isn't exact. Logistic growth, N(t) = K / (1 + (K / N0 - 1) exp(-r t)), with r = 0.5, K = 100 and N0 = 5. The population is counted 21 times, evenly spaced over a window, with a normal error of standard deviation 2 individuals. A quick simulation generated 1,000 data sets for each of three windows and fitted r and K to every one by least squares. With the window running from time 0 to 4 the population has only risen from 5 to 28, and the ceiling isn't in view. The estimates of r are tolerable, 90 per cent of them between 0.43 and 0.61. Those of K aren't: 90 per cent lie between 44 and the upper limit I allowed the optimiser, a million, and 19 per cent are above 1,000. A window to time 8, where the population has reached 74, brings K to between 93 and 109. A window to time 20 gives K between 99 and 101 and r between 0.49 and 0.51.

You can see why in the curves. A curve with K = 1,000 and r adjusted to 0.444 stays within 0.9 of an individual of the true curve everywhere in the early window, which is less than half the measurement error. The estimates of r and K also move together, with a correlation of -0.71 on the log scale in the early window. That's the ridge again, tilted and blurred by noise. Nothing in the equations forbids finding K, and longer data would find it. So this is practical rather than structural unidentifiability, and only a simulation like this tells you which kind of trouble a given design has. (I used additive noise. With noise proportional to the count the early points would be tighter, and I'd guess the picture changes, but I haven't run that.)

Other ways to see the same thing: fix one parameter on a grid, refit the rest and plot the fit (a flat profile means the data don't constrain it); in a Bayesian fit, compare the posterior with the prior, and if they look alike the data added little. When you do find a ridge there are three honest options. Report the combination that is determined. Bring in outside information about one parameter and say where it came from. Or change the design, here by counting for longer.

## When the answer stays at the prior

If the answer stays at the prior, or the likelihood surface is flat in some direction, that's a finding. It says those data carry no information about that parameter, or that pair, and it tells the reader where the method is uninformative, which they need to know as much as where it works. I'd say in advance which kinds of data should carry power and which shouldn't, and report the negative cases.

Work on phylogenies shows how general the problem is. Louca and Pennell showed in 2020 that very different histories of speciation and extinction can give exactly the same likelihood for a tree of living species. That doesn't make trees useless. It means the question has to be set so that the answer is something the tree can supply. They also defined combinations of the parameters that a tree does determine, which is the same move as reporting the product ab when a and b can't be had separately.

## Outside ecology

The oldest case in economics is supply and demand. Observed prices and quantities are the points where the two curves cross, and if both curves move from year to year the points trace out neither. Something that shifts one curve and leaves the other alone, such as the weather for a crop, is what lets you draw the other.

Another one is the age-period-cohort problem. A survey records people of several ages in several years, and the birth year is the year minus the age. A model with a linear effect of each, y = a age + p year + c cohort, collapses to (a - c) age + (p + c) year. The coefficient sets (a, p, c) = (1, 2, 0) and (2, 1, 1) give the same prediction for every person. With 41 ages and 41 years the design matrix has four columns (counting the intercept) and rank three. The usual remedy is a constraint, such as setting two of the effects equal, and then the split of the trend between the three is the constraint's choice, not the data's.

The same shape turns up in sustainability. A 2019 review of circular-economy indicators by Saidani and colleagues counted 55 sets. If two indicators rank the same alternatives differently, the choice of indicator decides the verdict, and the question is how often that happens. The design is simple: take one system, compute several published indicators, and report the share of comparisons in which the choice flips the decision. That would be a critique, so it needs a constructive half, a stated rule for which indicator suits which question.

Ecosystem services are a second case. If provision depends on which species are present, and the number of species is only part of that, a forecast built on richness inherits any confound in the richness pattern.

## What I'd ask

When a model offers two explanations, ask what each predicts that the other doesn't. If the answer is nothing, collect a different kind of data before you fit, not after.

For someone else's fit I'd want to know whether the model was run forwards from known parameters over the whole range the fit might visit, and whether the answer survives a different starting point for the optimiser.
