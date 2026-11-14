---
title: "Complexity and stability"
date: 2027-03-23
summary: "May showed in 1972 that random communities get less stable as they gain species and links. That's a result about random matrices, and the debate since is about what real ones have that they lack."
draft: true
---

In 1972 Robert May showed that a community whose species interact at random becomes less likely to be stable as it gains species and connections. People often quote the result as if it were about nature. It's about a particular class of random matrices, and what interests me is the gap between the two.

## The set-up

Take S species near an equilibrium. The community matrix has an entry for each pair, saying how a small change in the density of one species changes the growth of another (for Lotka-Volterra equations, entry ij is the interaction coefficient times the equilibrium density of species i). The equilibrium is locally stable when every eigenvalue of this matrix has a negative real part, so that small disturbances die away.

May built the matrix at random. Each species regulates itself with strength d (the same for every species, which is already a simplification), which puts -d on the diagonal. Each other pair interacts with probability C, called the connectance, and the strength of an interaction is drawn from a distribution with mean zero and standard deviation sigma.

## The result

For large S the eigenvalues of such a matrix fill a disc centred at -d with radius sigma times sqrt(S C). The reason is that each row has about S C non-zero entries, each with variance sigma^2, so the row has variance S C sigma^2, and the disc's radius is the square root of that. The matrix is stable when the disc stays on the left of zero, which is when

    sigma sqrt(S C) < d

Species, connectance and interaction strength enter as one product. Adding species, adding links or strengthening interactions all push towards the threshold, and past it a large random community is almost certainly unstable (May 1972). Solved for the number of species, the threshold is S = d^2 / (sigma^2 C). So halving the typical interaction strength allows four times as many species: at connectance 0.1 and d = 1, sigma = 0.5 allows 40 species, sigma = 0.25 allows 160, and sigma = 0.125 allows 640.

Only the variance of the strengths counts, not the shape of their distribution. Compare two communities with the same mean strength m. In one every link has strength m. In the other the strengths are exponentially distributed with mean m, so many are weak and a few are strong. The second has twice the mean square (2 m^2 against m^2), so its threshold falls to half as many species. This is inside the random model, where a few strong links dominate the variance. The stabilising effect of weak links that gets discussed below is another mechanism, in models with trophic structure.

The figure shows this for sigma = 0.25 and d = 1. For each number of species and three connectances, 200 random matrices were generated and their eigenvalues computed. The dashed lines mark where the rule puts the threshold.

![The share of random communities that are stable, against the number of species, for connectances 1, 0.5 and 0.2. Each curve stays near 1 for small communities and then falls to near 0, and the curves with more connections fall at smaller numbers of species.](figure:complexity-and-stability "Computed from 200 random matrices for each point, with sigma = 0.25 and self-regulation 1. The more connected the community, the fewer species it takes for stability to fail. Dashed lines mark where sigma sqrt(S C) = 1.")

| Connectance C | Threshold from the rule | Species at which half are stable |
|---|---|---|
| 1 | 16 | 22 |
| 0.5 | 32 | 39 |
| 0.2 | 80 | 89 |

The rule is exact only as S grows, and at these sizes the drop comes somewhat later than it predicts. The order and the effect of connectance are as it says. The drop isn't gradual either. At connectance 1, a separate run of 400 matrices per size gave about 90 per cent stable at 14 species and about 10 per cent at 28.

## What it says and what it does not

It says that if nothing is known about who interacts with whom, a larger and more connected system is less likely to be stable. It doesn't say that real communities are unstable, or that diversity destabilises them, because real communities aren't random. A predator-prey pair has opposite signs. Food webs have trophic levels, a few strong links among many weak ones, and groups of species that interact mostly with each other.

Structure changes the answer, and the smallest case shows why. Two species, each with self-regulation d = 1, and interaction entries a and b between them. The eigenvalues are -1 plus or minus sqrt(ab). If the signs are opposite (a predator and its prey) the square root is imaginary, the real part stays at -1 whatever the strengths, and a = 1.5, b = -1.5 gives -1 plus or minus 1.5i, which is stable. If the signs are the same (competition or mutualism) the square root is real. With a = b = 1.1 the eigenvalues are 0.1 and -2.1, so the pair is unstable once the product ab is bigger than d^2. Opposite-sign pairs push the eigenvalues sideways, off the real axis. Same-sign pairs push one of them to the right, towards zero and past it.

I think that's the mechanism behind Allesina and Tang (2012), who showed that the criterion depends on the type of random interaction: random predator-prey pairs are more stable than May's matrices, while random competition or mutualism is less so. In the set-up of the figure, with 40 species and connectance 0.5, 45 per cent of 200 random matrices were stable. When each interacting pair was instead built as one positive and one negative entry, all 200 were. Both sets have the same expected number of non-zero entries and the same distribution of interaction sizes, and differ only in the pairing. Averaging the largest real part of the eigenvalues over 1000 fresh matrices of each kind gives +0.02 for May's and -0.63 for the paired ones. So the paired communities aren't just across the line, they're well inside it.

The result also concerns only local stability near an equilibrium, and it treats the matrix as given. It doesn't ask whether the equilibrium densities are positive, nor how a community fares under a variable environment.

The same question gets asked about other networks, banks lending to each other for one. I'd be careful there. The links are exposures, not interactions with a sign pattern like predator and prey, and I wouldn't carry the threshold over before building the matrix for the system in question.

## The debate

Before May, the common view was that diverse communities are more stable, usually traced to MacArthur (1955) and Elton (1958). May's result showed that the reverse follows for random systems, which turned a belief into a question: what do real communities have that random ones lack? Proposed answers include the distribution of interaction strengths, with weak links stabilising (McCann, Hastings and Huxel 1998), trophic structure, and compartments.

The rule gives a rough use as a null expectation. For a real community, estimate S, C and a typical interaction strength and see where sigma sqrt(S C) sits against d. If it's well below 1, May's result says nothing worrying. If it's above 1 and the community persists, something other than randomness is doing the stabilising, and that's the thing to look for. One caution is that observed communities are the ones that lasted, so some of the unstable assemblages the rule describes may already be gone.

Stability also turned out to have several meanings. A population can be unstable while the total biomass of the community is steady, and local stability is a different property from resilience or from variability. Even a stable matrix can make a disturbance grow before it dies. Take two species with self-regulation 1, where the second affects the first with strength 10 and the first doesn't affect the second. Both eigenvalues are -1, so it's stable. But a disturbance of size 1 in the second species gives the first a response 10 t e^(-t), which peaks at 3.7 at t = 1. So "stable" tells you where the system ends up and not how far it travels first. McCann (2000) reviews the debate, and it hasn't ended.

## Reading a stability claim

- What is called stable: local stability of an equilibrium, or something else?
- Was the interaction structure drawn from data or from a random rule?
- Is the system near the threshold, or far on either side of it?
- Does the conclusion survive a change of interaction type?
- If the matrix entries were estimated, how well?

On the last one, here's a quick check. I took 400 of the paired communities above (40 species, connectance 0.5, sigma 0.25, all stable) and added independent noise to every non-zero entry, as a crude stand-in for estimation error. The typical entry is about 0.2 in size. With noise of standard deviation 0.1, half that, all 400 stayed stable. At 0.2, 91 per cent did. At 0.3, 10 per cent did. A stability verdict from an estimated matrix is only as good as the entries, and it can hold for a long time and then go quickly once the errors are as big as the interactions.
