---
title: "Timescales decide what a model can show"
date: 2027-01-05
summary: "A run only shows a process if the process has time to act inside it. Work out how long each one takes and compare that with the run before you believe a null."
draft: true
---

A simulation can only show a process that has time to act inside the run. That sounds obvious, and it still gets forgotten often enough that I think it needs writing down.

## The rule

For each process in the model, work out how long it takes to act and compare that with the length of the run. Do it before choosing the run length, and again before reading a null. If the process takes longer than the run, a null result is a statement about the run and says nothing about the process.

## Fast and slow variables

Many models have a fast variable and a slow one. Take a trait in a population. The trait variance settles quickly because mating restores it: each generation it moves half of the way to its fixed point, so the gap halves every generation (a factor of e about every 1.4 generations). The mean moves by the selection gradient times the variance. With a gradient of 0.1 and a variance of 0.006, which are illustrative numbers and not measured ones, the mean moves by 0.0006 per generation, and travelling 0.6 takes about a thousand generations.

![Two curves on one time axis, in generations on a log scale. The variance reaches its fixed point within about ten generations. The mean has barely moved by generation 30 and has moved by about 0.6 by generation 1000.](figure:timescales "Computed from the model in the text. By generation 30 the variance has settled and the mean has shifted by less than 0.02. By generation 1000 the mean has shifted by about 0.6.")

How fast is "fast"? The gap is 0.5^t of where it started, so the variance is within 1 per cent of 0.006 after 7 generations. A run read at generation 30 sees a settled variance and a mean that has hardly moved (0.017). The same model read at generation 1000 has moved the mean by about 0.6.

Because the variance is fast, you can treat it as already settled while the mean moves. That removes a dimension: put V = 0.006 and the mean just grows by 0.0006 a generation. I wanted to know what that costs, so I compared the reduced model with the full one. They differ by 0.0006 at every generation from about 30 on, which is one generation's worth of movement. (The variance starts at zero, so the full model loses a little in the first few generations, and the losses add up to exactly one generation of movement.) The error in the shifted mean is 3 per cent at generation 30 and 0.1 per cent at generation 1000. That's cheap.

The same comparison tells you how long the run has to be to see the mean move at all.

## Where it fails

The separation fails when the fast variable slows down. Near a tipping point the time a system takes to recover from a small push grows without bound (Wissel 1984), which is why slow recovery is used as an early-warning signal (Scheffer and colleagues 2009 review it). A model that assumed an instant return will then be wrong exactly where the interesting behaviour starts.

The smallest example I know is dx/dt = r - x^2. For r > 0 there's a stable state at x = sqrt(r), and a small push away from it decays like exp(-2 sqrt(r) t). So the recovery time is 1/(2 sqrt(r)): 0.5 at r = 1, 5 at r = 0.01, 50 at r = 0.0001. Getting back to within 5 per cent of the push takes about three of those times (ln 20 = 3.0). A run of 100 time units sees a recovery only if r is above roughly 0.0002. Closer to the threshold than that, the system never seems to return, and the model that assumed it would is wrong.

The other way it fails is when the slow variable moves the fast one's fixed point. Then "settled" refers to a moving target, and the fixed point has to be recomputed as you go.

## Two quantities that are really one

A common mistake concerns the length of the run and the per-step rates. Say a model runs on a fixed history, a branching schedule given in advance for example. If you stretch the run over more steps and leave every per-step rate alone, you've applied more selection, growth and mutation over the same stretch of history. The horizon and the rates are one quantity, and changing one without the other changes the dynamics. If you refine the time step, rescale the rates by the same factor.

Some numbers. Growth of 5 per cent per step over 100 steps is 1.05^100 = 131-fold. Cut each step into ten and leave the rate at 5 per cent, and the same history gives 1.05^1000, about 1.5 x 10^21. Rescaled to 0.5 per cent per substep it gives 1.005^1000 = 147, close to 131 but not equal; the rate that reproduces it exactly is 1.05^(1/10) - 1 = 0.489 per cent. Probabilities don't divide by ten either: an event with probability 0.5 per step becomes 1 - 0.5^(1/10) = 0.067 per substep, not 0.05.

Noise needs its own rule. Independent shocks add in variance, so a yearly standard deviation of 0.2 becomes a monthly one of 0.2/sqrt(12) = 0.058, not 0.2/12 = 0.017. Drift scales with the time step and the noise with its square root.

Even so, not everything can be rescaled. A parameter that appears in two places may satisfy the condition in only one of them, and then no single rescaling does both. Say which quantities you rescaled and which you left alone.

## A null is about the horizon

Suppose two daughter lineages can only separate where selection is disruptive, and the time they take to separate is known. A run shorter than that time will show no separation. The null is real, and it says nothing about the mechanism. Slow competition is the same: the outcome can take longer to appear than the run allows, and a configuration that needs many steps to settle can be reported as having no stationary state because the run was stopped first.

Back to the trait model, to see how short a run can be and still look like a null. Say the "data" are the mean of 25 individuals at the start and again at the end. (The model itself has no sampling error, so I'm adding it by hand.) The standard error of the difference is sqrt(2 x 0.006 / 25) = 0.022. At generation 30 the true shift is 0.017, which is 0.8 standard errors, so the comparison shows nothing and can't. It takes about 75 generations to reach two standard errors.

A run that has stopped moving may simply be slow. State the time at which you read the result, and if it's cheap, run it twice as long. If the answer changes, the first run was too short.

## Outside ecology

Mismatched timescales cause a lot of policy trouble. A fish stock can take decades to recover from a depleted state, a budget cycle lasts a year, and an election cycle a few. For a logistic stock with growth rate r, going from 10 to 90 per cent of capacity takes ln(81)/r = 4.4/r: 22 years for r = 0.2 per year, 44 for r = 0.1 (illustrative rates, and real stocks are messier). Against a four-year term, the first is five and a half terms.

A discount rate sets how far into the future a cost is allowed to count. At 5 per cent a year, a cost of 100 in 50 years is worth 8.7 today and one in 100 years is worth 0.76. At 3 per cent the same costs are 22.8 and 5.2. In each case the question is the one from the model: does the process have time to act inside the horizon used to judge it?

## A habit

Before a grid of runs, I'd write a short table with a row for each process: its time, the length of the run, and the ratio. For the trait model with a run of 300 generations:

| Process | Time to act | Run / time |
|---|---|---|
| Variance settles to within 1% | about 7 generations | 43 |
| Mean shifts by 0.6 | about 1000 generations | 0.3 |

A run of 300 is more than enough for the first row and hopeless for the second. If a ratio is far from where you need it, change the design. The table takes minutes, and a grid of runs that was too short to show anything takes days.
