---
title: "How to think about modelling a complex system"
date: 2026-08-14
summary: "A model is a short list of rules built to answer one question. Start from the question, choose the kind of model, name the states and the loops, and decide in advance when to stop."
draft: false
---

A model is a short list of rules that stands for a system. It is built to answer one question, so it keeps what the question needs and leaves out the rest. Most of the trouble in modelling comes from skipping that sentence.

## Begin with the question

Write the question down in one sentence, with a date. A question that drifts without anyone noticing costs a rewrite of the introduction and the discussion, and sometimes of the model. A model is judged against its question. One that holds everything is hard to check, because every output then depends on many inputs.

## One idea, four kinds of model

The same idea can be expressed in four ways, and it helps to know which one you are using.

Take the idea that crowding lowers growth.

| Kind | Form |
|---|---|
| Verbal | Crowding lowers growth. |
| Analytical | N' = N R exp(-N / K), with an equilibrium at N* = K ln R |
| Simulation | Draw the next population size from a Poisson distribution with that mean, many times |
| Statistical | Regress ln(N' / N) on N. The slope estimates -1 / K and the intercept estimates ln R |

The kinds combine, and most working models do. The analytical form gives the equilibrium and the way to test the code, the simulation adds noise, and the statistical form links parameters to data.

## Generality, realism and precision

Richard Levins argued in 1966 that a model of a population cannot maximise generality, realism and precision at once. Improving two usually costs the third. His three strategies map roughly onto three of the kinds above. A verbal or qualitative model keeps generality and realism and gives up precision. An analytical model keeps generality and precision and gives up realism. A detailed simulation is usually built for one system, so it keeps realism and precision and gives up generality. Knowing which one you have given up is part of describing the model honestly.

![A triangle with generality at the top, realism at the bottom left and precision at the bottom right. Verbal models sit on the left side, analytical models on the right side and simulations on the bottom side, each between the two things it keeps.](figure:thinking-about-complex-systems "Each kind of model keeps two of the three and gives up the third. The positions are schematic, not measured.")

## States, parameters and loops

A state variable changes during a run. A parameter stays fixed during it. Which is which is a choice, and a different choice gives a different model. If a quantity you treat as fixed would in fact drift, it needs a rule of its own.

Then look for loops. A chain of links in which a change comes back to its own source is a feedback loop, and its sign is the product of the signs of its links. Density raises crowding (plus), crowding lowers growth (minus), growth raises density (plus): the product is minus, and the density settles. A loop whose signs multiply to a plus runs away or locks in, whether it has two plus links or two minus links. Write the signs down before naming the loop, since the sign of a link depends on how the quantities are defined.

## Scale

If one process is much faster than another, the fast one settles to a value set by the slow one, and it can be treated as already settled. This is a common way to shrink a model without damaging it. It stops working when the fast variable slows down, as it does near a threshold.

## Mechanism or shape

A mechanistic term stands for a process that happens. A phenomenological term is a curve chosen because it has about the right shape. Most models contain both. The shape needs a reason written next to it, because a curve chosen freely is a common place for wrong results to enter.

## Decide when to stop

A model needs a stopping rule that is written before the results are known. "Does it reproduce this data set?" is a poor rule, because there is always another data set. It belongs to the results of a finished model, not to its completion. A better rule is a list of checkable conditions: no mechanism left with an open question, a statement short enough that a reader can learn what the model is from it, tests that cover the assembled model and not only the pieces, and an independent implementation that agrees.

## A short checklist

1. Fix the question in one sentence.
2. Choose the kind of model and say what has been given up.
3. List the states and the parameters, and say why.
4. Draw the loops and write down their signs.
5. Compare the timescales and settle the fast ones.
6. Give a reason for every shape you chose.
7. Check the code against the equations, then run, then read the output against the question.
8. Stop when the conditions you wrote at the start are met.

None of this is specific to ecology. The same questions apply to a model of almost any system.
