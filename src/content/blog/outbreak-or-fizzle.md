---
title: "The average outbreak never happens"
date: 2027-05-04
summary: "Start with one case and R0 = 2 and about half of simulated epidemics fizzle while half reach about 800 of 1,000 people. The average, 392, is neither. A deterministic model shows only the second."
draft: true
---

A deterministic epidemic model with R0 above 1 always produces an epidemic, however small the first infection. Real epidemics begin with a few people, and whether they spread is partly luck.

## The deterministic answer

Take an SIR model, in which people are susceptible, infectious or recovered, in a population of 1,000 with R0 = 2 and one initial case. The fraction z infected by the end solves z = 1 - exp(-R0 z). For R0 = 2 that gives z = 0.797, or 797 people. The model has no way to fail. It starts with an infected fraction of 0.001, treats that as a quantity that can grow, and never asks whether 0.001 of a person is a person. Any starting infection, however small, grows and runs its course.

## What individuals do

Now make each event a random one. The infection rate is 2 S I / N, where S and I are the numbers of susceptible and infectious people, and each infectious person recovers at rate 1. I ran this 10,000 times, each from one case, with a seeded random number generator.

Half of the runs fizzled: 50.9 per cent of them ended with no more than 41 people ever infected, and the mean size was 2.1. In one third of all runs the first case recovered before infecting anyone. The other 49.1 per cent took off and ended with between 650 and 871 people infected, a mean of 795. That's within half a per cent of the deterministic 797. Not one of the 10,000 runs ended between 42 and 649.

The average over all runs was 392. No run ended anywhere near it.

![A histogram of the number of people infected at the end of 10,000 simulated outbreaks, with one tall bar at zero and a second bump near 800. A solid line marks the deterministic final size of 797 and a dashed line the average of all runs, 392, in the empty gap.](figure:outbreak-or-fizzle "Final sizes of 10,000 simulated outbreaks in a population of 1,000 with R0 = 2 and one first case. The first bar is cut. The dashed line, the average of all runs, falls where no run ended.")

A plan sized for 392 is about 190 times too big for the typical fizzle, whose mean size is 2.1, and about half of what a takeoff needs.

## Why one half

While few people are infected, nearly everyone else is still susceptible, so each case acts independently of the others. The process is then a branching process. In this model an infectious person infects a geometric number of others, because infection and recovery are competing random events: the chance of exactly k is (1/3) x (2/3)^k. The mean is 2, which is R0. The chance that a line of descent dies out is q, where q = 1 / (3 - 2q), and its smaller solution is q = 1/2. In this model it's 1/R0 for any R0 above 1, so the chance of a major outbreak is 1 - 1/R0 = 0.5. The simulation gave 0.49, with a standard error of about 0.005 for 10,000 runs, so it agrees.

The 1/R0 rule depends on the infectious period being exponentially distributed. If every case were infectious for exactly the same time, the number of people infected would be Poisson with mean 2, and the chance of fizzling would be 0.20. The table shows how far the chance of a major outbreak from one case moves when R0 stays put and only the spread of infections across cases changes. Each entry is 1 - q, where q solves q = G(q) and G is the generating function of the offspring distribution. "Gamma period" means an infectious period with a gamma distribution of shape 2, which makes the offspring distribution negative binomial with dispersion 2. "Very uneven" has dispersion 0.16, so about two thirds of cases infect nobody and a few infect many, which is the kind of variation Lloyd-Smith and colleagues (2005) describe for superspreading.

| R0 | Exponential period | Fixed period | Gamma period | Very uneven |
|---|---|---|---|---|
| 1.2 | 0.17 | 0.31 | 0.22 | 0.05 |
| 1.5 | 0.33 | 0.58 | 0.43 | 0.10 |
| 2 | 0.50 | 0.80 | 0.62 | 0.16 |
| 3 | 0.67 | 0.94 | 0.79 | 0.24 |
| 5 | 0.80 | 0.99 | 0.91 | 0.32 |

At R0 = 2 the chance runs from 0.16 to 0.80 with the mean unchanged. R0 alone doesn't fix the risk.

More starting cases change this quickly. With five initial cases the chance that all five lines die out is about (1/2)^5 = 0.03. At R0 = 1.5 the chance of a major outbreak from n cases is 1 - (2/3)^n: 0.33 for one, 0.70 for three, 0.87 for five and 0.98 for ten. The same formula says how many infectious people you need at once before the outcome is nearly settled. With R0 = 2 and the exponential period it's seven (the chance that all seven lines die out is (1/2)^7 = 0.008), and at R0 = 1.5 it's twelve. That's roughly why nothing in the simulation ended between 42 and 649.

A consequence for control, which I find easy to get wrong. Cutting R0 from 2 to 1.5 slows the growth of a takeoff a lot, since the growth rate is R0 - 1 per infectious period and so halves from 1 to 0.5. It changes the chance that one case takes off from 0.50 to 0.33, and for five cases arriving together from 0.97 to 0.87. So a measure that helps a great deal against a large epidemic does much less to the chance that one starts.

## When it takes off, and when

A second set of 20,000 runs, this time recording event times, gave 49.5 per cent takeoffs. Among those the final size stays close to the deterministic one, and the timing doesn't. Time is measured in mean infectious periods. The epidemic peaked at a median of 6.4 periods, with the middle 90 per cent of runs between 4.7 and 9.3. The deterministic equations started from one case in 1,000 give 6.8. If an infectious period were five days, 4.7 to 9.3 would be 23 to 47 days, a spread of three weeks in when the hospital sees the most patients. The peak number infectious was 130 to 205 in the middle 90 per cent (median 167, deterministic 154).

The early growth is the random part, and everything after it is shifted by what happened there.

## Beyond epidemics

The same arithmetic holds wherever something spreads by copying and starts from few individuals. An invading species begins as a handful of animals, and a new practice or rumour begins with a few people. If each one passes it on to two others on average and the passing is random, many attempts fail in the first generations, however favourable the average. A deterministic model of the same process gives the second outcome only.

For a population founded by n individuals that each give birth at rate b and die at rate d, with b larger than d, the chance of extinction is (d/b)^n. That's the same calculation with R0 = b/d. With b/d = 1.5 it's 0.67 for one founder, 0.13 for five and 0.017 for ten. It ignores everything else that can go wrong, so it's a lower bound on the extinction risk. Lockwood, Cassey and Blackburn (2005) review the evidence that propagule pressure, the number of individuals released and the number of releases, predicts whether an introduced species establishes.

## What I check

- How many individuals start the process? If it's a handful, a deterministic model is answering a different question.
- Are the probability of taking off and the size if it takes off reported separately?
- Is the whole distribution of outcomes shown, not only the average? Does the average fall in a gap between clusters?
- How much does the takeoff probability change with the assumed distribution of infectious periods or of offspring? The table above says: a lot.
- If timing matters, how wide is the spread in when the peak comes, and does the plan survive the early end of it?
