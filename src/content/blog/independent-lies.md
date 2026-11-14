---
title: "Truth at the intersection of independent lies"
date: 2027-02-02
summary: "Two programs that share an assumption agree by construction. Checking a model needs an independent implementation, and it must keep verification apart from validation."
draft: true
---

Richard Levins wrote in 1966 that, because every model of a complex system is wrong in some respect, "our truth is the intersection of independent lies". The point is that agreement between differently built models carries weight where agreement between copies of one model does not. The same argument applies to the checking of code.

## Verification and validation

**Verification** asks whether the code solves the stated equations correctly. **Validation** asks whether the stated equations describe the real system. A check at one level cannot vouch for the other. Two computations of the same number can agree to ten decimal places because they share the same rule, and any difference between them is then a coding difference. Their agreement says nothing about whether the rule fits any island, lake or market.

"The code is right" and "the model is right" are different claims. Say which one a test supports.

## Layers of correctness

It helps to separate at least five layers: the mathematics, the numerics, the implementation, the statistics, and the biology. Each fails differently and needs its own check. An error in a derivation is not found by a unit test, and a rounding problem is not found by a literature review.

## Why a second implementation

A check is worth something only if it could fail. If the second piece of code is written by the same hand from the first, or shares an assumption, it agrees by construction. An independent implementation, in a different language and written from the specification rather than from the first program, can disagree, and the disagreement is the information.

In my doctoral work the main simulator is written in C++ and a second implementation in R is written to check it. Identities taken from the literature are tested against code written by others, and not against my own algebra restated. In practice a check that I wrote with both sides scaled the same way would agree automatically, so the real test is whether an outside implementation, with its own conventions, reproduces the number.

Reading other people's source code, and not only their papers, belongs in the same practice. It can settle questions that the paper leaves open, and it can expose an error in a published coefficient.

## Pieces and assembly

Checking every piece in isolation does not check how they fit together. A model whose parts have all been verified and never assembled is a model nobody has tested. The tests should cover the composition: the full model against a reference, at least for cases where the answer is known.

Similarly, assert the configuration and not only the outcome. Outcome agreement is a weak detector for a setup error, since the dynamics compensate and the result looks plausible.

## The wider version

Levins's remark was about models of nature, and it holds for the models themselves. If several models built on different assumptions, with different simplifications, reach the same qualitative conclusion, the conclusion does not depend on any one simplification. This is robustness analysis, and it is the best available substitute for a controlled experiment in systems that cannot be experimented on. It is only as good as the independence of the models. Three versions of the same idea do not count as three.

The same applies when a policy conclusion rests on a single model. The question to ask is what a differently built model would say.

## A short list

- Name the layer a test checks.
- Write the second implementation from the specification, in another language if possible.
- Test the assembled model, and not only its pieces.
- Check identities against someone else's code.
- Agreement of code with code is not agreement with the world, and should not be reported as though it were.
