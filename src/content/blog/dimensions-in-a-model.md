---
title: "Dimensions in a model: how many, and which"
date: 2026-10-14
summary: "Every added variable, parameter or trait multiplies the work and changes the geometry. Reducing dimensions is a modelling decision with consequences, and it should be made in the open."
draft: false
---

The word dimension is used in several ways in modelling, and they are easy to mix up. There is the number of state variables, the number of parameters, the number of traits that describe an individual or a species, and the number of columns in the data. Each of them costs something, and the costs grow faster than intuition suggests.

## The cost of a grid

Suppose a model has six parameters and you want to see how it behaves across ten values of each. That is a million combinations, and if the model is stochastic each needs many replicates. One more parameter multiplies the total by ten. Most of the effort in a parameter sweep is spent on combinations nobody would have chosen by hand, which is the reason to ask first which parameters matter for the question.

## The geometry changes

Space behaves differently as dimensions are added. A ball fits inside a cube, and the fraction of the cube it fills shrinks fast. In five dimensions the ball fills about 16 per cent of the cube. In ten it fills about 0.25 per cent. If you sample points uniformly from a ball by drawing them from the cube and rejecting those outside, almost every draw is wasted at ten dimensions.

Two related facts are worth knowing. In a uniform ball, the fraction of points within half the radius is one half raised to the power of the dimension: about 3 per cent in five dimensions and 0.1 per cent in ten. Nearly all the volume sits near the surface. And as dimensions are added, the distances between random points become more alike, so the nearest neighbour of a point is hardly nearer than a typical point. Methods that rely on distances, such as clustering and neighbour searches, weaken accordingly.

For the same reason, the convex hull of a set of points, the smallest convex shape containing them, becomes unwieldy. The number of facets can grow like the number of points raised to half the dimension. Exact hull volumes are expensive and noisy beyond about six to eight trait dimensions, and they are set by the most extreme points.

## Reducing dimensions on purpose

Modellers lower the dimension all the time, and the methods differ in what they assume.

**Separating timescales.** If one variable relaxes much faster than another, replace it with its settled value. The state space loses a dimension, at the price of an assumption that must be checked wherever the fast variable slows down.

**Describing a distribution by a few numbers.** The trait values in a population form a distribution, which in principle has infinitely many dimensions. Keeping the mean and the variance and assuming the rest has a standard shape reduces it to two numbers. The shape is an assumption, and the moments that were dropped can be computed to see whether they stay small.

**Working with populations instead of individuals.** Following every individual in a species of a billion for 150,000 generations needs about 1.5 times ten to the fourteen updates. Following a handful of numbers for the whole population needs a handful per generation. The saving is large, and it costs an assumption about the shape of the cloud.

**Compressing indicators into an index.** This is the dimension reduction that most people meet without noticing it. A composite index of an organisation's commitment to sustainability folds many measurements into one number through a choice of weights. Whether a different defensible set of weights would reorder the organisations is a question worth asking before the ranking is published, and it is rarely asked.

## A way of working

1. Count the dimensions you need to answer the question, not the number you could measure.
2. Add them one at a time, and see what each changes.
3. Write down every reduction as an assumption, with the check that would show it failing.
4. Watch for more parameters than the data can distinguish. When two parameters enter only through their product, the data can tell you the product and nothing else.
5. Compare things in the same number of dimensions, and compare against a null of the same size.

Lowering the dimension is not a defect of a model. Doing it silently is.
