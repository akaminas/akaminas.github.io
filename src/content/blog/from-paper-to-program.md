---
title: "From a model in a paper to a program that runs it"
date: 2027-02-16
summary: "Reading a model, designing an algorithm, writing the code, checking it and drawing only the conclusions the model supports. Those steps are a skill of their own, and they can be taught."
draft: true
---

A scientist who reads a mathematical model in a paper should be able to understand its assumptions, design an algorithm for it, implement it, check that the code is correct, run simulation experiments and draw conclusions that say no more than the model supports. That is a long chain, and each link can be taught on its own.

## Reading the model

Before any code, write down four things about the model in the paper: its state variables, its parameters, its rules and its time step. Then ask what the rules assume, and where the assumptions are stated and where they are only implied. A model that cannot be summarised in these terms is not yet understood.

## Designing the algorithm

A rule written as an equation is not yet a procedure. It has to be turned into a sequence of steps: what is computed first, what is stored, what is updated in place. For a deterministic rule this is a loop. For a stochastic model there is a choice of method: a fixed time step, an event-driven algorithm such as Gillespie's, or following each individual. Each has costs, and the right one depends on the question.

## Implementing it

Here is a small example, the Ricker rule from an earlier post, in C++.

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

The code is short, and the care goes elsewhere: into naming, into keeping the state and the parameters visibly apart, and into making a run reproducible by recording the seed of the random number generator.

## Checking it

A program can run and be wrong. The first check is against a case with a known answer. A population of 100 that leaves 1.2 offspring per individual per generation should have about 248.8 individuals after five generations, since 100 times 1.2 to the fifth is 248.8. For the Ricker rule above, the density should approach 1 and alternate around it, because the slope of the rule there is 1 minus r, or -0.5.

For a stochastic model, check the moments: over many draws, the sample mean and variance should match the theoretical ones. Then check against an independent implementation if one is available. A later post returns to this.

## Running experiments

Simulation experiments need a design. Use the same random numbers for the two conditions you compare, so that the difference is due to the condition. Run enough replicates to say how large the error is. Change one thing at a time, and write down what each comparison can resolve before reading it.

## Saying only what the model supports

What a simulation shows is that, under the stated rules, something follows. That is a claim about the model. It becomes a claim about the world only through a further argument, which has its own evidence. Simulation output is easily over-read: a pattern in the output can be produced by more than one mechanism, and a run too short will say nothing about a slow process.

## Teaching it

These steps are also the outline of a course for biologists who learn programming as a route to scientific modelling. Each step can be taught on its own, and the order matters: a student who has not read the model carefully cannot check the code, and one who has not checked the code cannot trust the experiment.
