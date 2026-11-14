---
title: "Better a simple and correct model than a complex and erroneous one"
date: 2026-12-29
summary: "My rule for models: every mechanism needs a source or derivation for the form that's in the code, a test and a keep-or-delete decision. A model that's going well should get smaller as it develops."
draft: true
---

When a model doesn't reproduce something, the instinct is to add machinery: a new term, another feedback, one more parameter. Each addition looks small, and the sum is a model nobody can check. The rule I try to work under is this: better a simple and correct model than a complex and erroneous one.

Correct here doesn't mean true. Every model leaves things out. I mean that the code does what the equations say and that the equations follow from stated assumptions, and both can be checked. Simple doesn't mean as small as possible either. A model simpler than its question is wrong in another way, so the question has to be stated first.

## What the rule asks for

Every mechanism needs an anchor for the form that's implemented. "Competition declines with trait similarity" is an idea. A Gaussian function of the distance between traits, with a stated width, is a form. The idea is rarely controversial and the form is often chosen freely, and a freely chosen form is where wrong results usually come from. So each mechanism needs a derivation, a source or a stated reason for the form that's actually in the code, together with a run that exercises it, a test, and a decision to keep or delete it.

![Six mechanisms, each drawn as a row with a circle for its source, a circle for its test and a decision. Four have both circles filled and are kept; two have a dashed, empty circle and are deleted.](figure:simple-and-correct "A sketch, not a real model. A mechanism stays if its form has a source, a test exercises it and a decision to keep it is on record. The rest are deleted, so the model gets smaller.")

Density dependence shows how much a free choice of form can matter. "Growth slows as density rises" is an idea nobody disputes. Two standard forms are the Ricker map (Ricker 1954), x' = x exp(r (1 - x)), and the Beverton-Holt map (Beverton and Holt 1957), x' = L x / (1 + (L - 1) x). Set L = exp(r) and both have the same growth rate at low density and the same equilibrium, x = 1. With r = 2.5 and a start at 0.1, the Ricker map goes 0.100, 0.949, 1.078, 0.886, 1.177 and settles into a two-cycle between 0.29 and 1.71. The Beverton-Holt map goes 0.100, 0.575, 0.943, 0.995, 1.000 and stays there. The cause is the slope at x = 1, which is -1.5 for one map and 0.08 for the other, and a slope beyond -1 makes an equilibrium unstable. The two forms rest on different pictures of how individuals compete: Beverton-Holt is usually associated with contest for a limited resource and Ricker with scramble. For a given organism one may fit, and neither fits all. A model that says only "density-dependent growth" has left the most consequential choice to whoever wrote the code.

The model that survives isn't everything that was tried. It's what survived contact with evidence. The practical test for a mechanism is to replace it with its simplest version, a constant or a linear term or nothing, and rerun the outputs that matter. If they move by less than the run-to-run noise, the mechanism isn't earning its place. If they move, it needs its anchor more than any other does. When a specific question has a measurable answer, such as whether an approximation holds when a quantity isn't quadratic, you can improve the model by answering it. Asking in general whether the model is sound has no end.

Agent-based models of social systems invite the opposite habit: a rule for imitation, one for memory, one for loss aversion, each with a literature behind it and few with a form pinned down by data. The replacement test applies to each rule in turn.

An inconvenient null gets no rescue. If a result isn't what you hoped, the instinct is to build a mechanism that makes it go away. It's better to keep the failure in the record and report it, since a null bounds what the mechanism can claim.

A term that carries most of a model's output deserves checking before it's deleted. That doesn't make it correct, and it doesn't justify keeping it. The same holds the other way: a mechanism with no anchor, no launching script and no archived output can still be used by a manuscript, so read what it's for before deleting it.

Deletion has its own checklist. The parameter and every branch it guards are gone. The scripts stop recording it. The manuscript stops claiming it exists. No comment or note still explains a term in terms of it. The tests have been run before and after.

## How to tell the model is finished

The question "is the model assailable?" never ends. It can be answered about one mechanism, one parameter or one test at a time, and not about the model in general. So closure should be defined by conditions you can check:

1. No mechanism carries an open question.
2. The model is specified rather than inferred: a reader can learn what it is from one statement.
3. The tests pass and cover the composition, not only the pieces.
4. An independent reimplementation reproduces the simulator.
5. The code that produces the numbers is committed, so a number can be cited.

With six mechanisms there are 64 combinations of on and off and 15 pairs. Six tests of the pieces say nothing about whether any pair works together, and with ten mechanisms there are 45 pairs and 1,024 combinations. That's why the third condition asks for the composition. The fourth is cheap to start early. Axtell, Axelrod, Epstein and Cohen (1996) compared two simulation models of different origin by altering one until it reproduced the other, and called the process docking. Where two implementations disagree, either the specification was ambiguous or one of them has a bug, and it's easier to find out which while the model is small. For a large model a full second implementation may not be affordable. A second implementation of the core update rule alone is better than none.

None of these mentions data. Whether the model reproduces a particular taxon is a result of running a finished model. If it were a precondition the process would have no exit, since there's always another case and another data set. Calibration, in this scheme, looks for holes. It doesn't adjust parameters until the output looks right.

This is about when to stop building. Fit to data still matters, and validation against the world is still necessary. It belongs after the model is fixed, where it can fail honestly.

## What I'd expect to see

A model built under these rules should shrink during development. If it keeps growing, the reasons for each addition are worth rereading. Improvements tend to come from asking a specific question, not from general doubt.

There's an arithmetic reason as well. A model with ten free parameters and six observed summary numbers can reproduce all six with room to spare, and the agreement then says almost nothing about the mechanisms. Each unanchored parameter is a number that could have been tuned, and the fewer there are, the more a match means.

For a colleague's model I'd ask for five things: the list of mechanisms with the source of each form, the test that exercises each one, the outputs with and without each, the commit that produced the numbers, and a statement of what the model isn't meant to answer.
