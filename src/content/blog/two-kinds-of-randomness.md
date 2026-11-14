---
title: "Two kinds of randomness"
date: 2027-04-20
summary: "Chance in individual births and deaths averages out as a population grows. Chance in a shared environment doesn't. They affect extinction risk differently and need different data."
draft: true
---

Population models can be noisy in two ways. In a single time series the two look alike. As the population grows they go in opposite directions, and a model that has only one of them can get the extinction risk badly wrong.

## Individual luck and shared luck

Demographic stochasticity is chance in the fate of individuals: whether this one dies this year, whether that one breeds. If the individuals are independent, the total change is a sum of N independent pieces. Its variance grows in proportion to N, so the variance of the change per individual falls as 1/N and its standard deviation as 1/sqrt(N). In the example below this source alone gives a standard deviation of 23 per cent a year at N = 10 and 0.2 per cent at N = 100,000.

Environmental stochasticity is chance in the conditions: a dry summer, a hard winter, a price collapse. It hits every individual in the same year, so averaging over individuals doesn't remove it. The part of the variance of the growth rate that comes from the environment is the same at every population size.

The same split exists in economics, which is partly why I like it. One household losing its income is individual luck, and an insurer or a neighbourhood can pool it: with enough households the average loss is predictable. A recession is shared luck, and pooling more households doesn't help, because they all lose together.

The distinction goes back a long way in conservation biology. Shaffer (1981) named four sources of uncertainty for a small population: demographic and environmental stochasticity, natural catastrophes, and genetic stochasticity.

## A simulated example

Each year every individual survives with probability 0.7 and bears a Poisson number of young with mean 0.3 times e, where e is the year's environment. The value e is one number shared by the whole population, lognormal with mean 1 and a standard deviation of the logarithm of 0.3. The mean growth rate is zero. The growth rate per individual is N' / N - 1, where N' is next year's population.

The variance of that rate has two terms. The demographic one is (0.3 + 0.7 x 0.3) / N = 0.51 / N, coming from the Poisson births and from the survival or death of each individual. The environmental one is 0.3^2 times the variance of e (0.094), which is 0.0085, a standard deviation of 0.092 or about 9 per cent a year, whatever the population size. The two are equal at N = 0.51 / 0.0085, about 60.

I simulated one year of growth 40,000 times at each of 14 population sizes from 5 to 100,000 and took the standard deviation of the growth rate. It was 0.24 at N = 10, 0.12 at 100, 0.095 at 1,000 and 0.092 at 100,000. At N = 10 the demographic term is 86 per cent of the variance, and at 1,000 it's 6 per cent. The simulated values stay within about half a per cent of the formula.

![The standard deviation of the yearly growth rate per individual against population size, both axes logarithmic. Simulated points fall along a line of slope minus one half at small sizes and level off at a floor of about 0.09.](figure:two-kinds-of-randomness "Simulated standard deviation of the yearly growth rate per individual against population size. The sloping dashed line is demographic noise alone, falling as 1/sqrt(N). The flat dashed line is environmental noise alone.")

In principle you can separate the two in data by how the variance of the growth rate changes with population size. The part that falls as 1/N is demographic, and the part that doesn't is environmental.

## What each does to extinction risk

Demographic noise can finish off a small population by itself, when the last few individuals happen to die in the same year. In the example it dominates below about 60 individuals, and in a large population you can ignore it.

Environmental noise acts at every size, and it pulls the long-run growth rate below the mean growth rate by about half the environmental variance. In the example the mean rate is zero, yet the long-run rate, the average of ln(0.7 + 0.3e), is -0.004 a year. (A numerical integral gives -0.0041.) The median trajectory of a large population halves in about 170 years, even though the average growth rate is zero. The mean stays put, held up by a few lucky trajectories, and the typical one declines.

Lande (1993) compared how long a population lasts as the carrying capacity K grows, when the mean growth rate is positive. With demographic noise alone, the mean time to extinction rises nearly exponentially with K. With environmental noise, or with random catastrophes, it rises only as a power of K. His conclusion was that demographic stochasticity matters mainly for small populations and environmental stochasticity at all sizes. In the example, a population of 100,000 has no demographic risk worth modelling and still varies by about 9 per cent a year.

## Extinction in numbers

The example has mean growth exactly zero, which makes extinction certain in the end if only demographic noise acts, so I used a finite horizon: 100 years. For each starting size I ran 20,000 populations, once with the shared environment switched off and once with it on. The table gives the fraction extinct by year 100.

| Start | Demographic noise only | With shared environment |
|---|---|---|
| 10 | 69.3% | 72.7% |
| 50 | 14.7% | 25.5% |
| 100 | 2.2% | 9.1% |
| 250 | 0.005% | 1.0% |

At 10 individuals the environment hardly matters. At 250 it's most of the story: the demographic-only risk is one run in 20,000 and the risk with the environment is about 1 in 100. A model without the shared environment would call a population of 250 safe over a century, and it would be out by two orders of magnitude.

Quick check on the first column. For a population with mean growth zero and offspring variance 0.51 per individual, the chance of extinction by year t is about exp(-2N / (0.51 t)). For N = 100 and t = 100 that's 2.0 per cent, against 2.2 per cent simulated.

## When the assumptions fail

All of this leans on assumptions that real populations break, so it's worth saying which.

Individuals have to be independent for the 1/N law to hold. If they live in groups that share their fate (a herd, a flock, a household), the noise falls with the number of groups and not the number of individuals. Take 100,000 animals in 500 groups of 200 that live or die together: the noise is sqrt(100,000 / 500) = 14 times what the same animals would give if they acted independently.

The environment has to be the same for everyone. Real environments are patchy, and a population spread over patches with independent weather averages that weather out in the same way as individual luck. The less correlated the patches, the more the shared noise behaves like the individual kind, which is the argument for spreading risk.

And the years have to be independent. If good and bad years come in runs, with a correlation of 0.5 between successive years, the average of ln(growth) is unchanged but the variance of the accumulated log population is (1 + 0.5)/(1 - 0.5) = 3 times as large over long runs. (A quick simulation of an AR(1) series gives 3.02.) Trajectories spread out more.

One more simplification: the example has no density dependence, which is why the mean growth is zero and the numbers are easy. With a ceiling, Lande's results are the ones to use.

## What the data can tell you

I said that you can separate the two kinds by how the variance falls with N. That needs counts over a range of population sizes, from many sites or a long series that moves a lot, and it needs the counting error to be handled. Counting error adds variance as well, and depending on how the count is made it can look like either kind.

The long-run growth rate is the harder case. In the example the standard deviation of the yearly log growth rate is 0.089. With 20 years of data the standard error of its mean is 0.089 / sqrt(20) = 0.020, five times the quantity you're after (-0.004). To pin it down to plus or minus 0.004 you'd need about 1,900 years. You can't read the sign of the long-run rate off a time series of this kind. You estimate the variance, which from 20 years has a relative standard error of about sqrt(2/19) = 32 per cent, and compute the rate from that. So the answer is uncertain by about a third even before you worry about whether the model is right.

## What I check

- Does the model have noise shared by individuals, or only noise in individual fates?
- At the population sizes that matter, which term of the variance is larger, and where do they cross?
- Is the long-run growth rate computed, and not only the mean?
- Do the extinction results change when a shared environment is added to an individual-based model?
