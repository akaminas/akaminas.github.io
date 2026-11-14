---
title: "Complexity and stability"
date: 2027-03-23
summary: "May showed in 1972 that random communities grow less stable as they gain species and links. That is a result about random matrices, and the debate it started is about what real ones have."
draft: true
---

In 1972 Robert May showed that a community whose species interact at random becomes less likely to be stable as it gains species and connections. The result is often quoted as if it were about nature. It concerns a particular class of random matrices, and the interest lies in the gap between the two.

## The set-up

Take S species near an equilibrium. The community matrix has an entry for each pair, saying how a small change in the density of one species changes the growth of another. The equilibrium is locally stable when every eigenvalue of this matrix has a negative real part, so that small disturbances die away.

May built the matrix at random. Each species regulates itself with strength d, which puts -d on the diagonal. Each other pair interacts with probability C, called the connectance, and the strength of an interaction is drawn from a distribution with mean zero and standard deviation sigma.

## The result

For large S the eigenvalues of such a matrix fill a disc centred at -d with radius sigma times sqrt(S C). The matrix is stable when the disc stays on the left of zero, which is when

    sigma sqrt(S C) < d

Species, connectance and interaction strength enter as one product. Adding species, adding links or strengthening interactions all push towards the threshold, and past it a large random community is almost certainly unstable (May 1972).

The figure shows this for sigma = 0.25 and d = 1. For each number of species and three connectances, 200 random matrices were generated and their eigenvalues computed. The dashed lines mark where the rule puts the threshold.

![The share of random communities that are stable, against the number of species, for connectances 1, 0.5 and 0.2. Each curve stays near 1 for small communities and then falls to near 0, and the curves with more connections fall at smaller numbers of species.](figure:complexity-and-stability "Computed from 200 random matrices for each point, with sigma = 0.25 and self-regulation 1. The more connected the community, the fewer species it takes for stability to fail. Dashed lines mark where sigma sqrt(S C) = 1.")

| Connectance C | Threshold from the rule | Species at which half are stable |
|---|---|---|
| 1 | 16 | 22 |
| 0.5 | 32 | 39 |
| 0.2 | 80 | 89 |

The rule is exact only as S grows, and at these sizes the drop comes somewhat later than it predicts. The order and the effect of connectance are as it says.

## What it says and what it does not

It says that if nothing is known about who interacts with whom, a larger and more connected system is less likely to be stable. It does not say that real communities are unstable, or that diversity destabilises them, because real communities are not random. A predator-prey pair has opposite signs. Food webs have trophic levels, a few strong links among many weak ones, and groups of species that interact mostly with each other.

Structure changes the answer. Allesina and Tang (2012) showed that the criterion depends on the type of random interaction: random predator-prey pairs are more stable than May's matrices, while random competition or mutualism is less so. In the set-up of the figure, with 40 species and connectance 0.5, 45 per cent of 200 random matrices were stable. When each interacting pair was instead built as one positive and one negative entry, all 200 were. Both sets have the same expected number of non-zero entries and the same distribution of interaction sizes, and differ only in the pairing.

The result also concerns only local stability near an equilibrium, and it treats the matrix as given. It does not ask whether the equilibrium densities are positive, nor how a community fares under a variable environment.

## The debate

Before May, the common view was that diverse communities are more stable, usually traced to MacArthur (1955) and Elton (1958). May's result showed that the reverse follows for random systems, which turned a belief into a question: what do real communities have that random ones lack? Proposed answers include the distribution of interaction strengths, with weak links stabilising (McCann, Hastings and Huxel 1998), trophic structure, and compartments.

Stability also turned out to have several meanings. A population can be unstable while the total biomass of the community is steady, and local stability is a different property from resilience or from variability. McCann (2000) reviews the debate, and it has not ended.

## Reading a stability claim

- What is called stable: local stability of an equilibrium, or something else?
- Was the interaction structure drawn from data or from a random rule?
- Is the system near the threshold, or far on either side of it?
- Does the conclusion survive a change of interaction type?
