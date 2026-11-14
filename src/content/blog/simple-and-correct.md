---
title: "Better a simple and correct model than a complex and erroneous one"
date: 2026-12-29
summary: "The rule applies to every mechanism, parameter and output column. A mechanism enters a model with a derivation or a source for the form used, and the model should shrink during development."
draft: true
---

When a model does not reproduce something, the instinct is to add machinery. A new term, another feedback, one more parameter. Each addition looks small, and the sum is a model nobody can check. The rule I try to work under is this: better a simple and correct model than a complex and erroneous one.

## What the rule asks for

**An anchor for the form implemented.** "Competition declines with trait similarity" is an idea. A Gaussian function of the distance between traits, with a stated width, is a form. The idea is rarely controversial and the form is often chosen freely, and a freely chosen form is where wrong results usually come from. Each mechanism needs a derivation, a source or a stated reason for the form that is actually in the code, together with a run that exercises it, a test, and a decision to keep or delete it.

**Evidence before machinery.** The model that survives is not everything that was tried. It is what survived contact with evidence. When a specific question has a measurable answer, such as whether an approximation holds when a quantity is not quadratic, the model can be improved by answering it. Asking in general whether the model is sound has no end.

**No rescue for an inconvenient null.** If a result is not what was hoped, the instinct is to build a mechanism that makes it go away. The better practice is to keep the failure in the record and report it, since a null bounds what the mechanism can claim.

**Care with what carries the result.** A term that carries most of a model's output deserves checking before it is deleted. That does not make it correct, and it does not justify keeping it. The same holds the other way: a mechanism with no anchor, no launcher and no archive can still be used by a manuscript, so read what it is for before deleting it.

**A checklist for deletion.** The parameter and every branch it guards are gone; the scripts stop recording it; the manuscript stops claiming it exists; no comment still explains a term in terms of it; the tests have been run before and after. A rule that forgets the file it is written in has a hole.

## How to tell the model is finished

The question "is the model assailable?" never ends. It can be answered about one mechanism, one parameter or one test at a time, and not about the model in general. So closure should be defined by conditions that can be checked:

1. No mechanism carries an open question.
2. The model is specified rather than inferred: a reader can learn what it is from one statement.
3. The tests pass and cover the composition, not only the pieces.
4. An independent reimplementation reproduces the simulator.
5. The code that produces the numbers is committed, so a number can be cited.

Notably, none of these mentions data. Whether the model reproduces a particular taxon is a result of running a finished model. If it were a precondition, the process would have no exit, since there is always another case and another data set. Calibration, in this scheme, looks for holes; it does not adjust parameters until the output looks right.

This is a stance about when to stop building, not a claim that fit to data is unimportant. Validation against the world is still necessary. It belongs after the model is fixed, where it can fail honestly.

## What it predicts

A model built under these rules should shrink during development. If it keeps growing, the reasons for each addition are worth rereading. Improvements tend to come from asking a specific question, and not from general doubt.
