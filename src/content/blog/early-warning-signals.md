---
title: "Early-warning signals"
date: 2027-03-30
summary: "Near a fold, recovery from small disturbances slows and variance and autocorrelation rise. The signal needs long, dense records, fits only some transitions, and its absence does not mean safety."
draft: true
---

Some systems change abruptly: a clear lake turns turbid, a fishery collapses, a forest gives way to grassland. A warning in the data beforehand would be useful. Theory offers one, for one kind of transition, and its limits matter as much as the signal.

## Slowing down

A fold is the point where a stable state merges with an unstable one and disappears. Close to it, the stable state pulls the system back ever more weakly. The rate of recovery from a small disturbance falls to zero at the threshold, roughly as the square root of the distance to it, and this slowing of the return was described by Wissel (1984). A system that recovers slowly remembers a disturbance for longer, so successive records resemble each other more and the shocks pile up. Two statistics follow: the variance rises, and the lag-1 autocorrelation, the correlation of each record with the one before, moves towards 1. Scheffer and colleagues (2009) review these and other indicators.

The simplest model of this is dx = -lambda x dt + sigma dW, where x is the distance from the stable state, lambda is the recovery rate and the last term is random noise. In the figure lambda falls in a straight line from 1 to 0.05, the simplest stand-in for an approach to a threshold, and sigma is 0.3. The state is recorded once per unit of time for 1000 units, and the indicators are computed in a rolling window of 200 records. The first window has a variance of 0.056 and a lag-1 autocorrelation of 0.32. The last has 0.198 and 0.79.

![A simulated time series that wanders around zero with growing swings and slower return, and beneath it two lines, the rolling variance and the rolling lag-1 autocorrelation, both rising from left to right.](figure:early-warning-signals "Simulated with the recovery rate falling from 1 to 0.05. Variance and lag-1 autocorrelation in a window of 200 records both rise. The model is linear, so no transition occurs in it.")

The model is the linearised dynamics near a fold. It contains no tipping, and shows only what the indicators do while recovery slows. They trail the true recovery rate, since each window averages over the 200 records before it.

## What the data must support

A window of n records gives a lag-1 autocorrelation that scatters by about 1/sqrt(n) by chance when the series has no memory. That is 0.07 for 200 records, so a rise of about 0.5 stands out. For 20 records it is 0.22, and a trend is hard to separate from the scatter. A series of thirty annual counts cannot supply windows of 200 records at all.

Records must also be frequent compared with the recovery time. Records much further apart than that carry little of the memory the indicator is looking for. Detrending, the window length and the choice of indicator all change the result, and Dakos and colleagues (2012) compare these choices on simulated ecological data.

## Not every transition is a fold

The theory is for a transition in which the stable state loses its stability. A system can also be carried across a threshold by a large random shock with nothing changing beforehand, which is noise-induced tipping. Or it can be driven by a control that changes faster than the system can follow, which is rate-induced tipping. Ashwin and colleagues (2012) set out these routes alongside the bifurcation. In neither of the other two does recovery have to slow first, and Hastings and Wysham (2010) show regime shifts in model ecosystems that occur with no warning.

## False alarms and silent transitions

Rising variance or autocorrelation has other causes: a change in the noise, a change in how the data were collected, an artefact of detrending. A rising trend therefore needs a comparison with a system that did not change. Boettiger and Hastings (2012) point out that testing the indicators on systems already known to have made a transition biases the result, and in simulations of systems that shifted purely by chance the usual statistics gave more false positives than expected.

The reverse also holds. No signal may mean that the system is far from a threshold, that the transition is not a fold, or that the record cannot resolve a change. Absence of a signal is not evidence of safety.

## Before reading a warning

- Is this a transition in which recovery should slow, a fold, rather than a noise-driven or rate-driven one?
- How long is the record, and how often was it sampled, compared with the recovery time?
- How was it detrended, and does the result hold across window lengths?
- Compared with what: records of systems that did not change?
- If there is no signal, could the test have seen one?
