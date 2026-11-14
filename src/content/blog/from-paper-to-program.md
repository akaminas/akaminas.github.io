---
title: "From a model in a paper to a program that runs it"
date: 2027-02-16
summary: "Reading a model, designing the algorithm, writing the code, checking it, and saying only what the model supports. Each step has its own check, and each can be taught."
draft: true
---

Getting from a mathematical model in a paper to a conclusion is a chain. You understand the assumptions, design an algorithm, write the code, check that the code is right, run simulation experiments, and draw conclusions that say no more than the model supports. Each link can be taught on its own, and each has its own check.

![Six boxes joined by arrows, from reading the model to drawing conclusions, each with its check beside it: four things written down, one step worked by hand, state and parameters kept apart, a known answer and the moments, the same random numbers and replicates, and a claim about the model only.](figure:from-paper-to-program "The chain from a model in a paper to a claim the model supports, with the check that goes with each step. If one step is skipped, the later ones can't make up for it.")

## Reading the model

Before any code, write down four things about the model in the paper: the state variables, the parameters, the rules and the time step. Add the units, and where the randomness enters. Then ask what the rules assume, and where the assumptions are stated and where they're only implied. If I can't summarise a model in these terms, I haven't understood it yet.

The misreadings I'd expect are small ones. A rate read as a probability per time step. Updates the paper does all at once, which the code does one after another, so later units see values that are already updated. A parameter given per year when the time step is a day. None of these crashes anything.

## Designing the algorithm

A rule written as an equation isn't a procedure yet. It has to become a sequence of steps: what's computed first, what's stored, what's updated in place. For a deterministic rule this is a loop. For a stochastic model there's a choice of method: a fixed time step, an event-driven algorithm such as Gillespie's (1977), or following each individual. Each has costs, and the right one depends on the question. Gillespie's idea fits in two sentences. If the total rate of all events is a0, the time to the next event is exponential with mean 1/a0, and the event that happens is chosen with probability proportional to its rate.

The time step is part of the model, and that's easy to forget. Take dx/dt = r x (1 - x) with r = 2.5 and x starting at 0.1. The solution climbs smoothly to 1. Euler with a step of 1 is x' = x + 2.5 x (1 - x), and it goes 0.1, 0.325, 0.873, 1.150, 0.719, 1.224, 0.538, and keeps bouncing between about 0.54 and 1.23 for ever, a cycle of length 4. With a step of 0.1 it stays within 0.04 of the exact solution at every whole time and settles at 1.

Work one step by hand before writing anything, so that the algorithm has a number to be compared with.

## Writing the code

Here's the Ricker rule from an earlier post, in C++.

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

The code is short. The care goes into naming and into keeping the state and the parameters visibly apart. For a stochastic model I'd also use an explicit generator with an explicit seed, std::mt19937_64 seeded with an integer that gets written to the output file, so that a run can be repeated, and not rand(). One catch: the standard fixes the sequence of std::mt19937 exactly, but not the algorithms behind the distributions (std::normal_distribution and the rest), so the same seed can give different numbers under a different compiler or library. If a run has to be repeated bit for bit, fix the toolchain or write the transformation yourself. And print enough digits to compare: the default six above is fine for looking and poor for checking.

## Checking it

A program can run and be wrong. The first check is against a case with a known answer. A population of 100 that grows by a factor of 1.2 each generation should have about 248.8 individuals after five generations, since 100 times 1.2 to the fifth power is 248.8. For the Ricker rule above, with r = 1.5, the density should approach 1 and alternate around it, because the slope of the rule there is 1 minus r, or -0.5.

Quick check on the code itself. By hand the first step is 0.5 x exp(0.75) = 1.0585, so that's what the first line should say, followed by 0.969575 and 1.01485. Each distance from 1 is about half the last, with the sign flipped, as the slope of -0.5 says. (I got these from the same recurrence in a script, not by compiling the C++.)

For a stochastic model, check the moments: over many draws, the sample mean and variance should match the theoretical ones. Let each of 100 individuals survive a generation with probability 0.8, so the number of survivors has mean 80 and variance 16. Ten thousand runs gave a mean of 80.00 and a variance of 16.43. The standard error of that variance is about 0.23, so it's inside two standard errors, but I wouldn't call it checked. A hundred thousand runs gave 16.09 and a million gave 16.01.

For an event-driven algorithm, use a process with a known stationary law. Immigration at rate 10 and death at rate 0.5 per individual gives a Poisson distribution with mean 20 and variance 20, and a Gillespie run of 20,000 time units gave a time-weighted mean of 19.95 and variance of 19.74.

If the method has a step, halve it and look at the error. Euler on dx/dt = x (1 - x), starting at 0.1, has the exact value 0.8585 at t = 4. The errors at steps 1, 0.5, 0.25 and 0.125 are 0.044, 0.014, 0.0055 and 0.0025. The ratio between successive errors heads for 2, as it should for a first-order method. If it didn't, I'd look for a bug before looking for a better method.

Then check against an independent implementation if one is available. An earlier post makes the case for that.

## Running experiments

Simulation experiments need a design. Use the same random numbers for the two conditions you compare, so that any difference is due to the condition. Run enough replicates to say how large the error is. Change one thing at a time, and write down what each comparison can resolve before reading it.

The same-random-numbers rule is worth more than it sounds. Take a stochastic Ricker model with noise of standard deviation 0.2 on the log scale, and compare the standard deviation of the density over years 51 to 100 at r = 1.5 and r = 1.8, with 100 replicates per condition. The difference is about 0.055. Repeating the experiment 1,000 times, the estimate had a standard deviation of 0.0052 with independent noise in the two conditions and 0.0020 with the same noise sequences in both: the precision of about seven times as many replicates, for free.

## Saying only what the model supports

What a simulation shows is that, under the stated rules, something follows. That's a claim about the model. It becomes a claim about the world only through a further argument, which has its own evidence. Schelling's segregation model (1971) is the standard example: agents with mild preferences about the type of their neighbours end up in strongly segregated patterns. That shows the mechanism is enough, in the model. It doesn't show that it's what segregates any real city, and the model has no way to tell you.

Simulation output is easily over-read in other ways too. A pattern in the output can be produced by more than one mechanism. And a run that's too short says nothing about a slow process: logistic growth at 10 per cent a step from a millionth of carrying capacity is at 1.4 per cent of capacity after 100 steps, and doesn't reach half until step 145.

## Teaching it

The same steps can serve as an outline for teaching biologists who learn programming as a route to scientific modelling. The order matters: a student who hasn't read the model carefully can't check the code, and one who hasn't checked the code can't trust the experiment.
