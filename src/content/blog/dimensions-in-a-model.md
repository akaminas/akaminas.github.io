---
title: "How many dimensions a model needs"
date: 2026-10-14
summary: "Every extra variable, parameter or trait multiplies the work and changes the geometry. Cutting dimensions is a modelling decision with consequences, so I think it should be made in the open."
draft: false
---

"Dimension" gets used in at least four ways in modelling, and they're easy to mix up. It can be the number of state variables, the number of parameters, the number of traits that describe an individual or a species, or the number of columns in the data. Each one costs something, and the costs grow faster than intuition says.

## The cost of a grid

Say a model has six parameters and you want to see how it behaves at ten values of each. That's a million combinations. If the model is stochastic each one needs many replicates: at 100 replicates and one second a run, the million combinations come to 10^8 seconds, a little over three years on one core. A seventh parameter multiplies that by ten, to about 32 years. Most of the effort goes on combinations nobody would have picked by hand, so it pays to ask first which parameters matter for the question.

Richard Bellman called this the curse of dimensionality, in the 1950s, about grids over the state space in dynamic programming. It's the same arithmetic. One way round it for parameters is to stop using a grid: sample the parameter space at random, or with a Latin hypercube, and choose the number of runs yourself. The budget then doesn't depend on the number of parameters, though what you can see in each direction gets thinner. A few thousand runs can already show which parameters the output responds to, and those are the ones worth a finer look.

Parameters can also outrun state variables by a lot. A generalised Lotka-Volterra model of S species has S state variables, but it has S growth rates and S x S interaction coefficients as well. For 30 species that's 30 state variables and 30 + 900 = 930 parameters. Forty annual counts of each species give 1200 numbers, barely more than 930, and counts from successive years are far from independent. I suspect that's one reason interaction matrices often get filled with zeros or random draws, and both of those are reductions that belong in the write-up.

## The geometry changes

Space behaves differently as you add dimensions. A ball fits inside a cube, and the fraction of the cube it fills shrinks fast. In five dimensions the ball fills about 16 per cent of the cube. In ten it fills about 0.25 per cent. If you draw points uniformly from a ball by sampling the cube and throwing away the ones outside, almost every draw is wasted at ten dimensions.

![The share of a cube filled by the ball inscribed in it, for one to twelve dimensions on a logarithmic axis. It falls from 100 per cent in one dimension to 16 per cent at five and 0.25 per cent at ten.](figure:dimensions-in-a-model "Each gridline is ten times lower than the one above. By ten dimensions the ball fills about a quarter of one per cent of the cube.")

Two more facts come out of the same geometry. In a uniform ball, the fraction of points within half the radius is one half to the power of the dimension: about 3 per cent in five dimensions, 0.1 per cent in ten. Nearly all the volume sits near the surface. And distances between random points become more alike as dimensions go up, so the nearest neighbour of a point is hardly nearer than a typical point. Clustering and neighbour searches rely on distances, so they get worse for the same reason.

I checked that last one with a quick simulation. Take 1000 points uniform in the unit cube and, for a random point, divide the distance to its nearest neighbour by the mean distance to the others. Averaged over 200 random points that ratio is 0.04 in 2 dimensions, 0.40 in 10, 0.82 in 100 and 0.94 in 1000. In 1000 dimensions the nearest of a thousand points is barely closer than the average one. Sampling is hit too: a hundred points is a decent sample along a line, but to space them as well across a ten-dimensional cube you'd need 100^10 = 10^20.

The convex hull of a set of points, the smallest convex shape that contains them, also gets awkward. The number of facets can grow like the number of points raised to half the dimension. Exact hull volumes become expensive as the dimension rises, and they're set by the most extreme points, so a single outlier can change them.

All of this is for points spread evenly through the volume, and real data usually aren't. If twelve traits measured on a set of species are strongly correlated, the species may sit close to a surface of three or four dimensions, and distances then behave more like they do in three or four. That's the usual reason high-dimensional data are less hopeless than the cube suggests. It's also a reason to find out how many dimensions the data really use before quoting any of the numbers above (a principal components analysis is the quickest look).

## Reducing dimensions on purpose

Modellers cut dimensions all the time, and the methods differ in what they assume.

The first is to separate timescales. If one variable relaxes much faster than another, replace it with its settled value. The state space loses a dimension, at the price of an assumption that needs checking wherever the fast variable slows down. A small example: a slow variable s and a fast one f, with ds/dt = s(1 - s) - 0.5 f and df/dt = (s - f)/eps. Setting f = s gives ds/dt = s(0.5 - s), one dimension instead of two. Starting from s = f = 0.1 and comparing at t = 5, the reduced model gives s = 0.376. The full model gives 0.378 when eps = 0.01, 0.388 when eps = 0.1 and 0.486 when eps = 1. All of them head for the same equilibrium, s = 0.5. The reduction goes wrong on the way there, and badly when the "fast" variable isn't fast, so I'd compare the transient and not only the end state.

The second is to describe a distribution by a few numbers. The trait values in a population form a distribution, which in principle has infinitely many dimensions. Keep the mean and the variance, assume the rest has a standard shape, and you're down to two numbers. The shape is an assumption. The moments that were dropped can be computed, to see whether they stay small.

The third is to work with populations instead of individuals. Following every individual in a species of a billion for 150,000 generations takes about 1.5 x 10^14 updates. Following a handful of numbers for the whole population takes a handful per generation. The saving is large and the price is an assumption about the shape of the cloud.

The last is the one most people meet without noticing: compressing indicators into an index. A composite index of an organisation's commitment to sustainability folds many measurements into one number through a choice of weights. Whether a different defensible set of weights would reorder the organisations is worth asking before the ranking is published, and it's rarely asked. Here's a quick version with made-up numbers: 10 organisations, 5 indicators each between 20 and 80, drawn independently. Rank them with equal weights, then again with 10,000 weight vectors drawn at random from all the ways of making five weights sum to 1. The organisation at the top under equal weights is still top in 41.5 per cent of the weightings. The whole order survives in 0.2 per cent, and one organisation's rank ranges over all ten places. Independent indicators are close to the worst case, since indicators that move together make the weights matter less. Even so, "no defensible weights would change the ranking" is a claim to test, not to assume.

## A way of working

What I'd do with a new model, roughly in this order:

1. Count the dimensions you need to answer the question, not the number you could measure.
2. Add them one at a time and see what each changes.
3. Write down every reduction, in the open, as an assumption, with the check that would show it failing.
4. Watch for more parameters than the data can tell apart. If two parameters only ever enter as a product, the data can give you the product and nothing else: (a, b) = (2, 3) and (1, 6) predict exactly the same thing, and where an optimiser lands among such pairs depends on where it started.
5. Compare things in the same number of dimensions, and compare against a null of the same size.

The columns of a dataset need the same care. Take fifty countries and eighty indicators. A regression of some outcome on all eighty will reproduce the fifty values exactly, even if every indicator is random noise, because there are more free coefficients than data points. A perfect fit there tells you nothing.
