---
title: "A neutral model as a baseline"
date: 2027-04-27
summary: "Make every individual equivalent and the abundance curves still look like data. That makes a baseline, and a match proves nothing. I checked how much difference a curve can hide."
draft: true
---

Ecologists usually explain why one species is common and another rare by something about the species. Hubbell's neutral theory (2001) asks what you'd see if nothing about the species mattered. The answer looks uncomfortably like data.

It grew out of island biogeography with the species made identical, and the name echoes Kimura's neutral theory of molecular evolution (1968), where most genetic variants are taken to differ in fitness too little to matter.

## The rule

In a neutral model all individuals are ecologically equivalent. Whatever its species, an individual has the same chance of dying, of reproducing and of dispersing. Species differ in name only. The community is zero-sum, with a fixed number J of individuals. At each step one individual, chosen at random, dies. With probability m it's replaced by an immigrant drawn from a larger metacommunity. Otherwise it's replaced by the offspring of another individual in the community, also chosen at random.

Abundances then change by drift, the accumulated luck of births and deaths, and by what arrives from outside.

Equivalence is a claim about per-capita rates. Species can differ in many traits and still be equivalent in births, deaths and dispersal, so rejecting the model says the species aren't equivalent in those, not that nothing differs. I also held the metacommunity fixed, so there's no speciation in my runs. In the full theory the metacommunity is itself neutral, and the fundamental biodiversity number that sets its diversity is one more parameter to fit.

## What it produces

I ran this with J = 1,000 and a metacommunity of 380 species whose abundances follow a log-series (Fisher's alpha = 50, about 10^5 individuals; the log-series is what a neutral metacommunity with speciation settles to, which is why I chose it). After 5,000 generations, where a generation is J deaths, I counted the individuals of each species. At m = 0.003 the community had 16 species, and the commonest had 555 of the 1,000 individuals. At m = 0.03 it had 63 species and the commonest had 123. At m = 0.5 it had 135 species and the commonest had 63.

![Three rank-abundance curves on a logarithmic vertical axis, for immigration rates 0.003, 0.03 and 0.5. Each falls from a few abundant species to a long tail of rare ones; the lowest rate ends after about 16 species and the highest after about 135.](figure:neutral-models "Rank-abundance curves of three simulated neutral communities of 1,000 individuals, one for each immigration rate m. No species has any advantage over another.")

Each curve has the familiar shape, a few abundant species and a long tail of rare ones, although no species has any advantage. The immigration rate sets how far the community resembles a random sample of the metacommunity. Where it's low, drift removes most species and one comes to dominate. Where it's high, many species persist, and many of them are represented by a single individual (the long tail). Another run with different random numbers changes the details: six runs at m = 0.003 gave between 8 and 23 species.

Volkov, Banavar, Hubbell and Maritan (2003) derived the abundance distribution of this model in closed form and fitted it to tree abundances on Barro Colorado Island, a tropical forest plot.

## A baseline

The use I find most defensible is as a null model. It shows what a community looks like when the differences between species are switched off. If an observed pattern is reproduced, the pattern alone doesn't call for niche differences, competition or any other mechanism. If it isn't, there's something left to explain. Gotelli and McGill (2006) discuss how neutral models relate to the null models of community ecology.

The baseline has to be built for the data: the same number of individuals, the same area and a stated immigration rate. Otherwise the comparison is between different things.

The same m = 0.03 gives 22 species with J = 250, 60 with J = 1,000 and 107 with J = 4,000 (six runs each, 2,000 generations), and the commonest species takes 30, 12 and 9 per cent of the individuals. A plot of 250 trees isn't a plot of 4,000 trees with different luck. Nor is m a property of the species: immigration into a small plot comes mostly from the forest around it, so m is higher for a smaller plot, and the value you fit is tied to the plot you sampled. And compare the data with the spread of many runs, not one: at m = 0.003 the six runs above ranged from 8 to 23 species.

## A match does not prove neutrality

Reproducing a pattern shows that the pattern can arise from the neutral rule. It doesn't show that it did. The shape of an abundance curve is a weak signature, because different processes make similar curves. Volkov and colleagues (2005) found that a model with density dependence, in which species are not equivalent, also accounts for tree species abundance and diversity in tropical forests.

The model has few parameters, here J, m and the metacommunity, and the curve it's fitted to is smooth. A good fit to one curve is easy to get and says little.

How little? Quick check on the simulation. Give each species a fitness weight exp(s z), with z a standard normal draw, and pick the individual that fills a vacancy in proportion to that weight. So s = 0.01 means species differ by about 1 per cent in how likely they are to supply the parent. Everything else as before, 12 runs per setting. At m = 0.03 the curves for s = 0, 0.001 and 0.01 can't be told apart: 58, 57 and 57 species on average, and 118, 126 and 139 individuals in the commonest species. It takes s = 0.03 to show, and then only at the top of the curve (485 individuals in the commonest) while richness barely moves (52 species). At m = 0.003 the same curve is more sensitive. With s = 0.01 the commonest species holds 796 of the 1,000 individuals, against 428 with s = 0, and richness is 12 instead of 16.

So a good match at high immigration rules out fitness differences of a few per cent per generation and says nothing about 1 per cent or less. At low immigration it does rule out 1 per cent. "Consistent with neutral" means different things at different m, and I'd want the m next to it.

## A prediction the fit didn't use

A stronger test is a prediction about something that wasn't used in the fit, such as how a community changes over time or how similar two communities are at different distances. The model is definite about the first, so I measured it. Take the community at generation 5,000 and compare it with itself later, using the overlap: the sum over species of the smaller of the two abundances, divided by J. At m = 0.03 the overlap is 0.89 after 1 generation, 0.55 after 20 and 0.34 after 100. At m = 0.003 it's 0.96, 0.79 and 0.51. After 100 generations the commonest species was still the commonest in 1 of 10 runs at m = 0.03 and in 4 of 10 at m = 0.003.

Those are the model's own generations. To set them against a forest you need a death rate for the real community, to turn J deaths into years, and I'd treat that conversion with some suspicion.

Neutral drift is used outside ecology too. Bentley, Hahn and Shennan (2004) used random copying, which is the same rule with people in place of species, as the null for how popular cultural variants become. Economics has an old version. If firms grow by random proportional amounts that don't depend on their size (Gibrat's law), firm sizes come out highly skewed with no firm better than any other, so a skewed size distribution is not by itself evidence of differences in efficiency.

## What I check

- Does the neutral model have the same number of individuals and the same area as the data?
- Is the comparison made on more than one pattern?
- Which parameters were fitted, and to what?
- Is a non-neutral model fitted to the same data and compared?
- Does the conclusion say what the data exclude, and not which mechanism they prove?
