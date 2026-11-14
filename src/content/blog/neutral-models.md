---
title: "A neutral model as a baseline"
date: 2027-04-27
summary: "A model in which every individual is ecologically equivalent still produces abundance curves that look like data. It is useful for asking which patterns need a mechanism, and a match proves nothing."
draft: true
---

Ecologists usually explain why one species is common and another rare by something about the species. The neutral theory of Hubbell (2001) asks what would be seen if nothing about the species mattered. The answer looks uncomfortably like data.

## The rule

In a neutral model all individuals are ecologically equivalent. Whatever its species, an individual has the same chance of dying, of reproducing and of dispersing. Species differ in name only. The community is zero-sum, with a fixed number J of individuals. At each step one individual, chosen at random, dies. With probability m it is replaced by an immigrant drawn from a larger metacommunity. Otherwise it is replaced by the offspring of another individual in the community, also chosen at random.

Abundances then change by drift, the accumulated luck of births and deaths, and by what arrives from outside.

## What it produces

I ran this with J = 1,000 and a metacommunity of 380 species whose abundances follow a log-series. After 5,000 generations, where a generation is J deaths, I counted the individuals of each species. At m = 0.003 the community had 16 species, and the commonest had 555 of the 1,000 individuals. At m = 0.03 it had 63 species and the commonest had 123. At m = 0.5 it had 135 species and the commonest had 63.

![Three rank-abundance curves on a logarithmic vertical axis, for immigration rates 0.003, 0.03 and 0.5. Each falls from a few abundant species to a long tail of rare ones; the lowest rate ends after about 16 species and the highest after about 135.](figure:neutral-models "Rank-abundance curves of three simulated neutral communities of 1,000 individuals, one for each immigration rate m. No species has any advantage over another.")

Each curve has the familiar shape, a few abundant species and a long tail of rare ones, although no species has any advantage. The immigration rate sets how far the community resembles a random sample of the metacommunity. Where it is low, drift removes most species and one comes to dominate. Where it is high, many species persist, and many of them are represented by a single individual. Another run with different random numbers changes the details. Six runs at m = 0.003 gave between 8 and 23 species.

Volkov, Banavar, Hubbell and Maritan (2003) derived the abundance distribution of this model in closed form and fitted it to tree abundances on Barro Colorado Island, a tropical forest plot.

## A baseline

The use I find most defensible is as a null model. It shows what a community looks like when the differences between species are switched off. If an observed pattern is reproduced, the pattern alone does not call for niche differences, competition or any other mechanism. If it is not reproduced, there is something left to explain. Gotelli and McGill (2006) discuss how neutral models relate to the null models of community ecology.

The baseline has to be built for the data. It needs the same number of individuals, the same area and a stated immigration rate, or the comparison is between different things.

## A match does not prove neutrality

Reproducing a pattern shows that the pattern can arise from the neutral rule. It does not show that it did. The shape of an abundance curve is a weak signature, because different processes make similar curves. Volkov and colleagues (2005) found that a model with density dependence, in which species are not equivalent, also accounts for tree species abundance and diversity in tropical forests.

The model has few parameters, here J, m and the metacommunity, and the curve it is fitted to is smooth. A good fit to one curve is therefore easy to obtain and says little. A stronger test is a prediction about something that was not used in the fit, such as how the community changes over time or how similar two communities are at different distances.

## What I check

- Does the neutral model have the same number of individuals and the same area as the data?
- Is the comparison made on more than one pattern?
- Which parameters were fitted, and to what?
- Is a non-neutral model fitted to the same data and compared?
- Does the conclusion say what the data exclude, and not which mechanism they prove?
