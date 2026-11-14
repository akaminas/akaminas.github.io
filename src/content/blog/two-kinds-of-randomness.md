---
title: "Two kinds of randomness"
date: 2027-04-20
summary: "Chance in individual births and deaths averages out as a population grows. Chance in a shared environment does not. The two act differently on extinction risk and call for different data."
draft: true
---

Population models can be noisy in two ways. In a single time series the two look alike. As the population grows they behave in opposite ways, and a model that includes only one of them can give the wrong answer about the risk of extinction.

## Individual luck and shared luck

Demographic stochasticity is chance in the fate of individuals: whether this one dies this year, whether that one breeds. If the individuals are independent, the total change is a sum of N independent pieces. Its variance grows in proportion to N, so the variance of the change per individual falls as 1/N and its standard deviation as 1/sqrt(N). In the example below, this source alone gives a standard deviation of 23 per cent a year at N = 10 and 0.2 per cent at N = 100,000.

Environmental stochasticity is chance in the conditions: a dry summer, a hard winter, a price collapse. It acts on every individual in the same year, so the average over individuals does not remove it. The variance of the growth rate per individual that comes from the environment is the same at every population size.

## A simulated example

Each year every individual survives with probability 0.7 and bears a Poisson number of young with mean 0.3 times e, where e is the year's environment. The value e is one number shared by the whole population, lognormal with mean 1 and a standard deviation of the logarithm of 0.3. The mean growth rate is zero. The growth rate per individual is N' / N - 1, where N' is next year's population.

The variance of that rate has two terms. The demographic one is (0.3 + 0.7 x 0.3) / N = 0.51 / N, from the Poisson births and the survival or death of each individual. The environmental one is 0.3^2 times the variance of e (0.094), which is 0.0085, a standard deviation of 0.092 or about 9 per cent a year, at any population size. The two are equal at N = 0.51 / 0.0085, about 60.

I simulated one year of growth 40,000 times at each of 14 population sizes from 5 to 100,000 and took the standard deviation of the growth rate. It was 0.24 at N = 10, 0.12 at 100, 0.095 at 1,000 and 0.092 at 100,000. At N = 10 the demographic term is 86 per cent of the variance, and at 1,000 it is 6 per cent. The simulated values stay within about half a per cent of the formula.

![The standard deviation of the yearly growth rate per individual against population size, both axes logarithmic. Simulated points fall along a line of slope minus one half at small sizes and level off at a floor of about 0.09.](figure:two-kinds-of-randomness "Simulated standard deviation of the yearly growth rate per individual, against population size. The sloping dashed line is demographic noise alone, falling as 1/sqrt(N). The flat dashed line is environmental noise alone.")

In principle the two can be separated in data by how the variance of the growth rate changes with population size. The part that falls as 1/N is demographic, and the part that does not is environmental.

## What each does to extinction risk

Demographic noise can finish off a small population by itself, by the last few individuals dying by chance in the same year. In the example it dominates below about 60 individuals, and in a large population it can be ignored.

Environmental noise acts on populations of every size, and it lowers the long-run growth rate below the mean growth rate by about half the environmental variance. In the example the mean rate is zero, yet the long-run rate, the average of ln(0.7 + 0.3e), is -0.004 a year. The median trajectory of a large population halves in about 170 years, even though the average growth rate is zero.

Lande (1993) compared how long a population lasts as the carrying capacity K grows, when the mean growth rate is positive. With demographic noise alone, the mean time to extinction rises nearly exponentially with K. With environmental noise, or with random catastrophes, it rises only as a power of K. He concluded that demographic stochasticity matters mainly for small populations and environmental stochasticity at all sizes. In the example, a population of 100,000 has no demographic risk worth modelling and still varies by about 9 per cent a year.

## What I check

- Does the model have noise that is shared by individuals, or only noise in individual fates?
- At the population sizes that matter, which term of the variance is larger, and where do they cross?
- Is the long-run growth rate computed, and not only the mean?
- Do the extinction results change when a shared environment is added to an individual-based model?
