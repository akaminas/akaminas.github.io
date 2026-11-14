---
title: "When two causes leave the same footprint"
date: 2027-01-26
summary: "If different parameter values give the same output, the data cannot tell them apart. Identifiability should be checked on simulated data before real data are fitted, and a flat answer is a result."
draft: true
---

Parameters are identifiable if different values give different outputs. They are structurally unidentifiable if some different values give exactly the same output, and practically unidentifiable if the outputs differ by less than the noise. Two different models can also give the same pattern, which is a case of equivalence. The concept is simple, and its consequences are easy to overlook.

## The smallest example

Suppose a model returns only the product y = a × b. The pairs (a, b) = (2, 3) and (6, 1) both give 6. From y alone you can read the product and nothing else. In a plot of the two parameters, the pairs that give the same output lie along a curve, a ridge, and a fit to y alone cannot locate the true values along it.

## An example from ecology

A standard way to infer how a community assembled is to count its species and measure how closely related or similar they are. Strong competition removes species by crowding. A low rate of arrival supplies fewer species to begin with. Both can produce the same pattern from the point of view of richness or of tree-based statistics: fewer species, similarly structured. If so, those statistics cannot separate the two processes on a single island, and an inference built on them inherits the confound.

One way out is a statistic that cuts across the ridge. Competition acts on traits directly and colonisation does not, so the spread of traits could vary along the ridge and so identify the position. Whether it does is an empirical question about a model, and one I am studying in my doctoral work. I will not claim an answer here, since nothing from it has been through peer review.

## Check before you fit

The practical rule is to check identifiability on simulated data before fitting real data.

1. Simulate data from the model with known parameters.
2. Run the inference you plan to use on those data.
3. See whether the known parameters come back, and with what uncertainty.
4. Repeat across the range of parameters that matter, including the corners.

A fit to real data may return a nice-looking answer in a region where the model could not have told the parameters apart. If so, the apparent precision comes from the method, not the data.

## A flat result is a result

When the answer stays at the prior, or the likelihood surface is flat in some direction, that is a finding. It shows that those data carry no information about that parameter, or that pair. It tells the reader where the method is uninformative, which they need to know as much as where it works. The right posture is to state in advance which kinds of data carry power and which do not, and to report the negative cases.

Work on phylogenies shows how general the problem is. Louca and Pennell showed in 2020 that very different histories of speciation and extinction can give exactly the same likelihood for a tree of living species. That does not make trees useless. It means the question has to be set so that the answer is something the tree can supply.

## Outside ecology

The same shape appears in sustainability. A review of circular-economy indicators counted more than fifty sets. If two indicators rank the same alternatives differently, the choice of indicator decides the verdict, and the honest question is how often that happens. The design is simple: take one system, compute several published indicators, and report the share of comparisons in which the choice flips the decision. It would be a critique, and a constructive half is needed to go with it: a stated rule for which indicator suits which question.

Ecosystem services give a second case. If service provision depends on which species are present, and the number of species is only part of that, then a forecast built on richness inherits any confound in the richness pattern.

## What to take away

When a model offers two explanations, ask what each predicts that the other does not. If the answer is nothing, collect a different kind of data before you fit, and not after.
