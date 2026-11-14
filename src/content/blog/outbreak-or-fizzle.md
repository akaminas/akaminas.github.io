---
title: "The average outbreak never happens"
date: 2027-05-04
summary: "With one first case and R0 = 2, half of simulated epidemics die out and half reach about 800 of 1,000 people. The average of the runs, 392, matches neither, and a deterministic model shows only one."
draft: true
---

A deterministic epidemic model with R0 above 1 always produces an epidemic, however small the first infection. Real epidemics begin with a few people, and whether they spread is partly luck.

## The deterministic answer

Take an SIR model, in which people are susceptible, infectious or recovered, in a population of 1,000 with R0 = 2 and one initial case. The fraction z of the population infected by the end solves z = 1 - exp(-R0 z). For R0 = 2 that gives z = 0.797, or 797 people. The model has no way to fail. Any starting infection, however small, grows and runs its course.

## What individuals do

Now make each event a random one. The infection rate is 2 S I / N, where S and I are the numbers of susceptible and infectious people, and each infectious person recovers at rate 1. I ran this 10,000 times, each starting from one case, with a seeded random number generator.

Half of the runs fizzled: 50.9 per cent of them ended with no more than 41 people ever infected, and the mean size was 2.1. In one third of all runs the first case recovered before infecting anyone. The other 49.1 per cent took off and ended with between 650 and 871 people infected, a mean of 795. That is within half a per cent of the deterministic 797. Not one of the 10,000 runs ended between 42 and 649.

The average over all runs was 392. No run ended anywhere near it.

![A histogram of the number of people infected at the end of 10,000 simulated outbreaks, with one tall bar at zero and a second bump near 800. A solid line marks the deterministic final size of 797 and a dashed line the average of all runs, 392, in the empty gap.](figure:outbreak-or-fizzle "Final sizes of 10,000 simulated outbreaks in a population of 1,000 with R0 = 2 and one first case. The first bar is cut. The dashed line, the average of all runs, falls where no run ended.")

## Why one half

While few people are infected, nearly everyone else is still susceptible, so each case acts independently of the others. The process is then a branching process. In this model an infectious person infects a geometric number of others, because infection and recovery are competing random events: the chance of exactly k is (1/3) x (2/3)^k. The mean is 2, which is R0. The chance that a line of descent dies out is q, where q = 1 / (3 - 2q), and its smaller solution is q = 1/2. In this model it is 1/R0 for any R0 above 1, so the chance of a major outbreak is 1 - 1/R0 = 0.5. The simulation gave 0.49.

The 1/R0 rule depends on the infectious period being exponentially distributed. If every case were infectious for exactly the same time, the number of people infected would be Poisson with mean 2, and the chance of fizzling would be 0.20. R0 alone does not fix the risk.

More starting cases change this quickly. With five initial cases the chance that all five lines die out is about (1/2)^5 = 0.03.

## Beyond epidemics

The same arithmetic holds wherever something spreads by copying and starts from few individuals. An invading species begins as a handful of animals, and a new practice or rumour begins with a few people. If each one passes it on to two others on average and the passing is random, many attempts fail in the first generations, however favourable the average. A deterministic model of the same process gives the second outcome only.

No run ended at the average of the two outcomes, so a plan sized for it, whether for hospital beds or for control of an invader, fits neither kind of outcome.

## What I check

- How many individuals start the process? If it is a handful, a deterministic model is answering a different question.
- Are the probability of taking off and the size if it takes off reported separately?
- Is the whole distribution of outcomes shown, not only the average?
- Does the average of the runs fall in a gap between clusters?
- How much does the takeoff probability change with the assumed distribution of infectious periods or of offspring?
