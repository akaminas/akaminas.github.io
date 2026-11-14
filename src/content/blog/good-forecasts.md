---
title: "What makes a probability forecast good"
date: 2027-07-06
summary: "A good probability forecast is calibrated and as sharp as that allows. A proper score such as the Brier score rewards both, but only over many forecasts, never over one."
draft: true
---

A forecast that gives a probability can't be right or wrong on a single occasion. If it says 70 per cent and the event doesn't happen, the forecast may have been fine, because it also said 30 per cent. What can be judged is a forecaster, over many forecasts.

## Calibration and sharpness

A forecaster is calibrated if events given 70 per cent happen about 70 per cent of the time, events given 20 per cent about 20 per cent of the time, and so on. The check is to group the forecasts by stated probability and count how often the event happened. Plot the observed frequency against the forecast probability and you have a reliability diagram. A calibrated forecaster lies on the diagonal.

Calibration isn't enough. Someone who says 50 per cent every time, for events that happen half the time, is calibrated and tells you nothing. Sharpness is how far the forecasts move away from the long-run frequency towards 0 or 1. The aim is to be as sharp as calibration allows: confident when the evidence is strong, and not otherwise.

The same questions apply wherever a model outputs a probability. In ecology it might be the chance a species is present at a site, or that a population drops below a threshold. In economics, the chance of a recession or a default.

## Two forecasters

I simulated 5000 events, each with a true probability, and two forecasters. The numbers are made up. One forecaster states the true probability and so is calibrated. The other has the same information but pushes its probabilities towards 0 and 1, a familiar way for forecasts to go wrong. Its forecasts near 97 per cent came true 89 per cent of the time, and its forecasts near 3 per cent came true 12 per cent of the time. In the reliability diagram its line is flatter than the diagonal.

![A reliability diagram of forecast probability against how often the event happened, with a dashed diagonal. The calibrated forecaster lies on the diagonal. The overconfident forecaster's line is flatter, above the diagonal for low forecasts and below it for high ones. Bars underneath show that the overconfident forecaster uses the extreme probabilities most.](figure:good-forecasts "Reliability diagram for two made-up forecasters over 5000 simulated events. Dashed is perfect calibration. Brier scores: calibrated 0.161, overconfident 0.171 (lower is better).")

The overconfident forecaster isn't useless, because it ranks the events in the same order as the calibrated one. The damage is in the numbers. More than half its forecasts (2,637 of 5000) fall in the two end bins, below 10 or above 90 per cent, against 1,116 for the calibrated forecaster, and in those bins it's wrong far more often than it claims. A model with many fitted parameters often looks like this when it meets new data.

## The Brier score

Brier (1950) proposed scoring probability forecasts by the squared difference between the forecast and what happened, averaged over forecasts. His note was about weather forecasts. In the form now usual for a yes-or-no event, that's the mean of (f - o)^2, where f is the forecast and o is 1 if the event happened and 0 if not. The score lies between 0 and 1, and lower is better.

Four forecasts by hand: 0.9 for an event that happened, 0.9 for one that didn't, 0.2 for one that didn't, 0.6 for one that did. The squared errors are 0.01, 0.81, 0.04 and 0.16, and the average is 0.255. Most of that total is the one confident miss.

On the 5000 events the calibrated forecaster scores 0.161 and the overconfident one 0.171. A forecaster who says 50 per cent every time scores exactly 0.25, whatever happens. The gap between the two forecasters looks small on this scale, and it comes only from the overconfidence. A score means little by itself, so it's read against a simple reference forecast such as the base rate. Here the base rate was 0.502, so the reference scores about 0.25, and a skill score of 1 minus the ratio of the two Brier scores comes to 0.36 for the calibrated forecaster and 0.32 for the overconfident one.

Murphy (1973) split the score into three terms: reliability (how far the calibration curve sits from the diagonal, weighted by how often each forecast was used), minus resolution (how far the observed frequencies in the bins differ from the overall base rate), plus uncertainty (the base rate times one minus the base rate, which no forecast can change). With the forecasts grouped into the ten bins of the diagram, reliability comes to 0.0003 for the calibrated forecaster and 0.0099 for the overconfident one, resolution to 0.089 and 0.088, and uncertainty to 0.250 for both. So nearly all of the 0.010 gap is reliability. (Because of the binning the three terms add up to the score only approximately, within 0.0012.)

## Why the score has to be proper

A scoring rule is proper if a forecaster does best, in expectation, by reporting what they really believe, and strictly proper if no other report does as well (Gneiting and Raftery 2007). The Brier score is strictly proper. Absolute error isn't: a forecaster who believes 70 per cent does best under it by saying 100 per cent, because the expected loss is linear in the stated probability. A rule that rewards exaggeration can't be used to compare forecasters honestly.

The arithmetic is short. If the forecaster believes 70 per cent and reports q, the expected squared error is 0.7 (1 - q)^2 + 0.3 q^2, which is smallest at q = 0.7, where it's 0.21. The expected absolute error is 0.7 (1 - q) + 0.3 q = 0.7 - 0.4 q, smallest at q = 1, where it's 0.30 against 0.42 for the honest report. Plain accuracy has the same flaw: if a forecast counts as right when it's above 50 per cent and the event happens, then 51 per cent and 99 per cent are worth the same, and nothing rewards calibration.

The other proper rule you'll meet is the logarithmic score, the negative log of the probability given to what happened. It punishes confident misses much harder. A forecast of 1 per cent for an event that then happens costs 4.6 under the log score, against 0.98 under the Brier score, and a forecast of exactly 0 costs infinity. For floods or outbreaks, where a confident miss is the thing you most want to avoid, I'd look at the log score as well.

## One forecast, one election

With 20 forecasts at 70 per cent, the number that come true can land anywhere from about 10 to 18 by chance alone, which is a frequency of 50 to 90 per cent. With few forecasts, calibration can't be tested. An election model issues one forecast every few years, and one outcome can't tell an 80 per cent forecast from a 60 per cent one. A model of species presence at 500 sites gives 500 forecasts at once, so a reliability diagram is possible. Even so, nearby sites aren't independent, and the effective number of forecasts is smaller than 500.

How many is enough? Say a forecaster states 80 per cent each time and the events really happen 70 per cent of the time. Telling those apart with a two-sided test at the 5 per cent level and 80 per cent power takes about 140 forecasts at that one probability. (That's the plain normal approximation. An exact binomial calculation gives a power of 0.62 at 100 forecasts and 0.79 at 150.) A ten-point error needs 140 forecasts at a single level, and a diagram with ten bins wants a good deal more.

Each point on a reliability diagram has its own sampling error, about sqrt(p (1 - p) / n) for n forecasts in the bin. With 30 forecasts near 70 per cent that's 0.084, so the point could sit anywhere from about 0.53 to 0.87 (two standard errors either side) and the forecaster still be calibrated. With the 500 or so per bin in the figure it's about 0.02. I don't read much into bins with few forecasts in them.

## What to ask

When someone shows me a forecasting model, these are the questions.

1. How many forecasts were made, and how many at each probability?
2. Is there a reliability diagram?
3. What does a proper score say, and what does a simple reference forecast score?
4. Were the forecasts issued before the outcomes were known?
