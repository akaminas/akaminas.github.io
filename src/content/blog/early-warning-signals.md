---
title: "Early-warning signals"
date: 2027-03-30
summary: "Near a fold, recovery from small disturbances slows, and variance and autocorrelation rise. The signal needs long, dense records, fits only some transitions, and no signal doesn't mean safe."
draft: true
---

Some systems change abruptly: a clear lake turns turbid, a fishery collapses, a forest gives way to grassland. A warning in the data beforehand would be useful. Theory offers one, for one kind of transition, and I think its limits matter as much as the signal.

## Slowing down

A fold is the point where a stable state merges with an unstable one and disappears. Close to it the stable state pulls the system back ever more weakly. The rate of recovery from a small disturbance falls to zero at the threshold, roughly as the square root of the distance to it, and Wissel (1984) described this slowing of the return. A system that recovers slowly remembers a disturbance for longer, so successive records resemble each other more and the shocks pile up. Two statistics follow. The variance rises, and the lag-1 autocorrelation (the correlation of each record with the one before) moves towards 1. Scheffer and colleagues (2009) review these and other indicators.

The simplest model is dx = -lambda x dt + sigma dW, where x is the distance from the stable state, lambda is the recovery rate and the last term is random noise. In the figure lambda falls in a straight line from 1 to 0.05, the simplest stand-in for an approach to a threshold, and sigma is 0.3. The state is recorded once per unit of time for 1000 units, and the indicators are computed in a rolling window of 200 records. The first window has a variance of 0.056 and a lag-1 autocorrelation of 0.32. The last has 0.198 and 0.79.

![A simulated time series that wanders around zero with growing swings and slower return, and beneath it two lines, the rolling variance and the rolling lag-1 autocorrelation, both rising from left to right.](figure:early-warning-signals "Simulated, with the recovery rate falling from 1 to 0.05. Variance and lag-1 autocorrelation in a rolling window of 200 records both rise. The model is linear, so nothing tips in it.")

This is the linearised dynamics near a fold. There's no tipping in it, only what the indicators do while recovery slows. They trail the true recovery rate, since each window averages over the 200 records before it.

You can turn the autocorrelation back into a recovery time. For this model sampled once per unit of time the lag-1 autocorrelation is exp(-lambda), so lambda = -ln r. The 0.32 in the first window gives a recovery time (1/lambda) of 0.9 time units, and the 0.79 in the last gives 4.2. The model's own rate, averaged over those two windows, is 0.9 and 0.145, so recovery times of 1.1 and 6.9. The estimate runs behind, as I said, and it's noisy.

The square-root law has a catch, which is that the warning comes late. Say lambda is 1 when the system is at distance 1 from the threshold. At distance 0.25 it is 0.5, and at 0.01 it is 0.1. To see recovery slow down tenfold you have to be within a hundredth of the starting distance from the edge. The straight-line fall in the figure is a convenient stand-in, and it makes the approach look kinder than a fold would.

Variance is the weaker of the two. In this model the stationary variance is sigma^2 / (2 lambda), so it rises when the noise grows as well as when recovery slows. I held lambda at 1 and doubled sigma from 0.3 to 0.6 halfway through each run. Averaged over 200 runs the variance went from 0.047 to 0.188, a factor of 4.0, and the lag-1 autocorrelation stayed at 0.34. Nothing had slowed, and the variance still gave a signal. The autocorrelation was untouched, which is a reason to look at both. That depends on the noise being independent from one step to the next, though, and real noise often has a memory of its own.

## What the data must support

A window of n records gives a lag-1 autocorrelation that scatters by about 1/sqrt(n) by chance when the series has no memory. That's 0.07 for 200 records, so a rise of about 0.5 stands out. For 20 records it's 0.22, and a trend is hard to separate from the scatter. A series of thirty annual counts can't supply windows of 200 records at all. A lake sampled monthly for twenty years has 240 records, and the seasonal cycle has to come out first. Forty years of quarterly economic figures give 160.

Records must also be frequent compared with the recovery time. Records much further apart than that carry little of the memory the indicator is looking for. Detrending, the window length and the choice of indicator all change the result, and Dakos and colleagues (2012) compare these choices on simulated ecological data.

Here's a quick test of what a trend statistic can do with series of these lengths. Take the same model with the recovery rate held at 0.3 throughout, so nothing changes. Compute the rolling variance and autocorrelation and measure the trend with Kendall's tau, the rank correlation between the statistic and time. I ran 400 such series per case. With 1000 records and a window of 200, tau exceeds 0.5 in about 4 to 5 per cent of the series with no change, for the variance and the autocorrelation alike. When lambda falls from 1 to 0.05 as in the figure it exceeds 0.5 in essentially every series. Now shorten the record to 200 records with a window of 50. False alarms rise to 6 or 7 per cent, and the series that really are slowing down are caught less often: the variance in 78 per cent of them and the autocorrelation in 66.5 per cent. So with records of the length most field data have, a rising trend is weak evidence, and a flat one is weak reassurance. Overlapping windows are strongly dependent on each other, so the usual p-value for tau doesn't apply. I'd compare against simulated series with no change instead.

## Not every transition is a fold

The theory is for a transition in which the stable state loses its stability. A system can also be carried across a threshold by a large random shock with nothing changing beforehand, which is noise-induced tipping. Or it can be driven by a control that changes faster than the system can follow, which is rate-induced tipping. Ashwin and colleagues (2012) set out these routes alongside the bifurcation. In neither of the other two does recovery have to slow first, and Hastings and Wysham (2010) show regime shifts in model ecosystems that occur with no warning.

Where the approach to a fold can be controlled and repeated, the signals do show up. Drake and Griffen (2010) saw rising indicators in water flea populations driven towards extinction by worsening conditions, and Dai and colleagues (2012) saw them in yeast populations heading for collapse. Those were controlled experiments, with the approach in the experimenter's hands. A lake or a fishery is a different matter: nobody controls the approach, and nobody can say in advance which kind of transition it faces.

Social and economic series are harder still. They're short, the mechanism itself changes while you watch (rules, institutions, behaviour), and sometimes a policy pushes the system across a threshold on purpose. None of that fits the fold picture. I'd be wary of a claim of slowing down in a short economic series that doesn't show what the same statistic does in series with no change.

## False alarms and silent transitions

Rising variance or autocorrelation has other causes: a change in the noise (as above), a change in how the data were collected, an artefact of detrending. A rising trend therefore needs a comparison with a system that did not change. Boettiger and Hastings (2012) point out that testing the indicators on systems already known to have made a transition biases the result, and in simulations of systems that shifted purely by chance the usual statistics gave more false positives than expected.

Screening makes the false alarms worse. If you check 100 systems and flag every one with tau above 0.5, then at the false-alarm rates above you expect four or five flags even when none of them is near a transition.

The reverse also holds. No signal may mean that the system is far from a threshold, that the transition isn't a fold, or that the record can't resolve a change. In the short-series simulation above, about a third of the autocorrelation trends and about a fifth of the variance trends were missed even though the system really was slowing down. Absence of a signal isn't evidence of safety.

## Before reading a warning

- Is this a transition in which recovery should slow, a fold, and not a noise-driven or rate-driven one?
- How long is the record, and how often was it sampled, compared with the recovery time?
- How was it detrended, and does the result hold across window lengths?
- Compared with what: records of systems that did not change?
- If there is no signal, could the test have seen one?
