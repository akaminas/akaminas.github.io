---
title: "From a model in a paper to a program that runs it"
date: 2027-02-16
summary: "Reading a model, designing an algorithm, writing the code, checking it and drawing only the conclusions the model supports. Those steps are a skill of their own, and they can be taught."
draft: true
---

A scientist who reads a mathematical model in a paper should be able to understand its assumptions, design an algorithm for it, implement it, check that the code is correct, run simulation experiments and draw conclusions that say no more than the model supports. That is a long chain, and each link can be taught on its own.

![Six boxes joined by arrows, from reading the model to drawing conclusions, each with its check beside it: four things written down, one step worked by hand, state and parameters kept apart, a known answer and the moments, the same random numbers and replicates, and a claim about the model only.](figure:from-paper-to-program "The chain from a model in a paper to a claim the model supports, with the check that belongs to each step. A step that is skipped cannot be made up for by the steps after it.")

## Reading the model

Before any code, write down four things about the model in the paper: its state variables, its parameters, its rules and its time step. Then ask what the rules assume, and where the assumptions are stated and where they are only implied. A model that cannot be summarised in these terms is not yet understood.

## Designing the algorithm

A rule written as an equation is not yet a procedure. It has to become a sequence of steps: what is computed first, what is stored, what is updated in place. For a deterministic rule this is a loop. For a stochastic model there is a choice of method: a fixed time step, an event-driven algorithm such as Gillespie's, or following each individual. Each has costs, and the right one depends on the question. Work one step by hand before writing anything, so that the algorithm has a number to be compared with.

## Implementing it

Here is the Ricker rule from an earlier post, in C++.

```cpp
#include <cmath>
#include <iostream>

int main() {
    const double r = 1.5;
    double x = 0.5;                      // density in units of carrying capacity
    for (int t = 1; t <= 10; ++t) {
        x = x * std::exp(r * (1.0 - x));
        std::cout << t << ' ' << x << '\n';
    }
}
```

The code is short. The care goes into naming, into keeping the state and the parameters visibly apart, and into recording the seed of the random number generator, so that a run can be repeated.

## Checking it

A program can run and be wrong. The first check is against a case with a known answer. A population of 100 that grows by a factor of 1.2 each generation should have about 248.8 individuals after five generations, since 100 times 1.2 to the fifth power is 248.8. For the Ricker rule above, with r = 1.5, the density should approach 1 and alternate around it, because the slope of the rule there is 1 minus r, or -0.5.

For a stochastic model, check the moments: over many draws, the sample mean and variance should match the theoretical ones. Then check against an independent implementation if one is available. An earlier post makes the case for that.

## Running experiments

Simulation experiments need a design. Use the same random numbers for the two conditions you compare, so that any difference is due to the condition. Run enough replicates to say how large the error is. Change one thing at a time, and write down what each comparison can resolve before reading it.

## Saying only what the model supports

What a simulation shows is that, under the stated rules, something follows. That is a claim about the model. It becomes a claim about the world only through a further argument, which has its own evidence. Simulation output is easily over-read: a pattern in the output can be produced by more than one mechanism, and a run that is too short says nothing about a slow process.

## Teaching it

The same steps can serve as an outline for teaching biologists who learn programming as a route to scientific modelling. The order matters: a student who has not read the model carefully cannot check the code, and one who has not checked the code cannot trust the experiment.
