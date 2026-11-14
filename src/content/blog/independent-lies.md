---
title: "Truth at the intersection of independent lies"
date: 2027-02-02
summary: "Two programs that share an assumption agree by construction. Checking a model needs an independent implementation, and it must keep verification apart from validation."
draft: true
---

In 1966 Richard Levins argued for treating one problem with several models, each with different simplifications, because "our truth is the intersection of independent lies". Agreement between differently built models carries weight. Agreement between copies of one model does not. The same argument applies to checking code.

## Verification and validation

Verification asks whether the code solves the stated equations correctly. Validation asks whether the stated equations describe the real system. A check at one level cannot vouch for the other. Two programs can agree to ten decimal places because they share a rule, and any difference between them is then a coding difference. Their agreement says nothing about whether the rule fits any island, lake or market.

"The code is right" and "the model is right" are different claims. Say which one a test supports.

## Layers of correctness

Separate at least five layers: the mathematics, the numerics, the implementation, the statistics and the biology. Each fails in its own way and needs its own check. A unit test will not find an error in a derivation, and a literature review will not find a rounding problem.

## Why a second implementation

A check is worth something only if it could fail. A second piece of code written by the same hand from the first, or resting on the same assumption, agrees by construction. An independent implementation, in a different language and written from the specification rather than from the first program, can disagree, and the disagreement is the information.

Identities taken from the literature are best tested against code written by others, not against one's own algebra restated. A test that scales both sides the same way will agree automatically. The real test is whether an outside implementation, with its own conventions, reproduces the number.

Reading other people's source code, and not only their papers, belongs in the same practice. It can settle questions that a paper leaves open, and it can expose an error in a published coefficient.

## Pieces and assembly

Checking every piece in isolation does not check how they fit together. A model whose parts have all been verified and never assembled is a model nobody has tested, so the tests should cover the composition: the full model against a reference, at least where the answer is known.

Assert the configuration too, not only the outcome. Agreement on the outcome is a weak detector of a setup error, because the dynamics compensate and the result looks plausible.

## The wider version

Levins's remark was about models of nature, and it applies equally to the models themselves. If several models built on different assumptions reach the same qualitative conclusion, that conclusion does not depend on any one of the simplifications.

A small case shows both halves. Take four models of a harvested population: a logistic equation, a Beverton-Holt map, a two-stage model in which only adults are harvested, and a two-patch model with a refuge. Give each the same carrying capacity, the same growth rate when rare and the same present density, 0.7 of carrying capacity. Then raise the harvest rate by half. The logistic model says the equilibrium density falls by 21 per cent, the Beverton-Holt map by 19, the refuge model by 16 and the stage model by 14. The models disagree about how far it falls and agree that it falls. Five fits of the logistic model to survey estimates of the present density, scattered by about 0.01, give falls between 20 and 23 per cent. That is a tighter answer, and no better evidence, because all five share one form.

![Dot plot of the fall in equilibrium density, in per cent, when the harvest rate rises by half: five fits of a logistic model between 20 and 23, and four differently built models at 14, 16, 19 and 21, with the range they span shaded.](figure:independent-lies "Four differently built models, fitted to the same carrying capacity, growth rate and present density (all made-up numbers), disagree on how far the density falls and agree that it falls. Five fits of one model agree closely because they share a form.")

This is robustness analysis. It cannot show that a conclusion is true, since models can share a flaw, but it can show that the conclusion is not an artefact of one simplification, and where a system cannot be experimented on it is often what is available. It is only as good as the independence of the models. Three versions of the same idea do not count as three.

The same applies when a policy conclusion rests on a single model. The question to ask is what a differently built model would say.

## A short list

- Name the layer a test checks.
- Write the second implementation from the specification, in another language if possible.
- Test the assembled model, and not only its pieces.
- Check identities against someone else's code.
- Agreement of code with code is not agreement with the world, and should not be reported as though it were.
