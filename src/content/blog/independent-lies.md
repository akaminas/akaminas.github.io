---
title: "Truth at the intersection of independent lies"
date: 2027-02-02
summary: "Two programs that share an assumption agree by construction. Checking a model takes an independent implementation, and verification has to be kept apart from validation."
draft: true
---

In 1966 Richard Levins argued for treating one problem with several models, each with different simplifications, because "our truth is the intersection of independent lies". His reasoning was that a model can't have generality, realism and precision all at once, so each one gives something up. A result that survives in several models that gave up different things is worth more than a result from one. Agreement between differently built models carries weight. Agreement between copies of one model doesn't. The same argument applies to checking code.

## Verification and validation

Verification asks whether the code solves the stated equations correctly. Validation asks whether the stated equations describe the real system. A check at one level can't vouch for the other. Two programs can agree to ten decimal places because they share a rule, and any difference between them is then a coding difference. Their agreement says nothing about whether the rule fits any island, lake or market.

"The code is right" and "the model is right" are different claims. Say which one a test supports.

The gap shows up even inside verification. Take Euler's method for the logistic equation, dx/dt = 0.8 x (1 - x), starting at x = 0.1 and run to t = 4 with a step of 1. I wrote it twice, once in JavaScript and once in Python. Both give 0.6472144032377174, identical to every digit printed. The exact solution at t = 4 is 0.7316039. So two programs agree perfectly and both are 0.084 too low, about 12%. What they agree on is the scheme, and with a step of 1 the scheme is a poor approximation of the equation. The check that could fail is the comparison with the closed form. It also tells you more: halve the step and the error should roughly halve, which is what a first-order method does. It does here (0.084, 0.036, 0.017, 0.008 and 0.004 for steps of 1, 1/2, 1/4, 1/8 and 1/16). If it hadn't, I'd have suspected a bug rather than the step.

## Layers of correctness

Separate at least five layers: the mathematics, the numerics, the implementation, the statistics and the biology (or the economics). Each fails in its own way and needs its own check. A unit test won't find an error in a derivation, and a literature review won't find a rounding problem. The Euler example is a numerics failure. Implementation failures are duller: a transposed index, a wrong unit, a per-capita rate used as a total. In the statistics layer a correct model gets fitted in a way that doesn't answer the question asked. The last layer, whether the model describes the system at all, is the only one a test suite can't reach.

## Why a second implementation

A check is worth something only if it could fail. A second piece of code written by the same hand from the first, or resting on the same assumption, agrees by construction. An independent implementation, in a different language and written from the specification rather than from the first program, can disagree, and the disagreement is the information.

Independence comes in degrees, and it's easy to overestimate. Two programs written from the same specification share its ambiguities and its mistakes. Two people who read the same paper tend to resolve its one unclear sentence the same way. Two programs that call the same library inherit its bugs. When I'm asked whether two codes are independent I'd go down that list: who wrote them, from which document, in which language, with which libraries, tested on which data.

Identities taken from the literature are best tested against code written by others, not against one's own algebra restated. A test that scales both sides the same way will agree automatically. The real test is whether an outside implementation, with its own conventions, reproduces the number. The conventions are where it goes wrong. NumPy's var divides by n by default and R's var divides by n - 1, so for the values 2, 4, 4, 4, 5 they give 0.96 and 1.2, a factor of 5/4 apart. Neither is a bug. A test that compares them without knowing this will either fail for the wrong reason or get "fixed" by rescaling one side until it passes.

Reading other people's source code, and not only their papers, belongs in the same practice. It can settle questions that a paper leaves open, and it can expose an error in a published coefficient.

## Pieces and assembly

Checking every piece in isolation doesn't check how they fit together. A model whose parts have all been verified and never assembled is a model nobody has tested, so the tests should cover the composition: the full model against a reference, at least where the answer is known.

That's available more often than it looks. Switch every process off but one and compare with the closed form. With growth off, a population harvested at rate h should decline as exp(-h t). With harvest off, it should follow its own growth equation. Conservation checks do the same job for assembled code (total population, mass or money shouldn't be created or destroyed by movement between patches). They cost minutes and catch the mistakes that only appear when the pieces are connected, such as a rate applied twice.

Assert the configuration too, not only the outcome. Agreement on the outcome is a weak detector of a setup error, because the dynamics compensate and the result looks plausible. A model that settles to an equilibrium forgets part of its starting conditions, so a wrong initial value can hide for a long time.

## The wider version

Levins's remark was about models of nature, and it applies equally to the models themselves. If several models built on different assumptions reach the same qualitative conclusion, that conclusion doesn't depend on any one of the simplifications.

A small case shows both halves. Take four models of a harvested population: a logistic equation, a Beverton-Holt map, a two-stage model in which only adults are harvested, and a two-patch model with a refuge. Give each the same carrying capacity, the same growth rate when rare and the same present density, 0.7 of carrying capacity. Then raise the harvest rate by half. The logistic model says the equilibrium density falls by 21 per cent, the Beverton-Holt map by 19, the refuge model by 16 and the stage model by 14. The models disagree about how far it falls and agree that it falls. Five fits of the logistic model to survey estimates of the present density, scattered by about 0.01, give falls between 20 and 23 per cent. That is a tighter answer, and no better evidence, because all five share one form. The four models span seven points (14 to 21) and the five fits span about three, so a report built on the fits alone would give a range less than half as wide.

![Dot plot of the fall in equilibrium density, in per cent, when the harvest rate rises by half: five fits of a logistic model between 20 and 23, and four differently built models at 14, 16, 19 and 21, with the range they span shaded.](figure:independent-lies "Four differently built models, fitted to the same carrying capacity, growth rate and present density, all made-up numbers. They disagree on how far the density falls and agree that it falls. Five fits of one model agree closely because they share a form.")

This is robustness analysis. It can't show that a conclusion is true, since models can share a flaw, but it can show that the conclusion isn't an artefact of one simplification, and where a system can't be experimented on it is often what is available. It's only as good as the independence of the models. Three versions of the same idea don't count as three.

The four models above do share a flaw, and it's worth seeing what it costs. Every one of them takes the catch to be proportional to the density, which amounts to a fixed fishing effort. Make it a fixed catch instead. In the logistic version with growth rate 0.8 and carrying capacity 1, the largest catch the population can sustain is r K / 4 = 0.2 a year. At a density of 0.7 under proportional harvesting the catch is 0.24 times 0.7 = 0.168. Raise it by half and it's 0.252, which is more than 0.2, so there's no equilibrium at all and the density runs to zero (about 8.7 years in a simulation from 0.7). The agreement in the figure holds only given the assumption that all four make. A fifth model with a different harvest rule would have told us more than a fifth with a different stage structure.

The same applies when a policy conclusion rests on a single model, and equally when it rests on an ensemble of many. If the models share a code base, a data set or a parameterisation, they share its errors. The question to ask is what a differently built model would say.

## What I'd do

- Say which layer a test checks.
- Write the second implementation from the specification, in another language if you can, and ask how much else the two share.
- Test the assembled model against a case with a known answer, not only the pieces.
- Check identities against someone else's code, and find out their conventions first.
- Halve the step, or double the grid, and see whether the error falls at the rate the method promises.
- Don't report agreement of code with code as agreement with the world.
