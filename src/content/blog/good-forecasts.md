---
title: "What makes a probability forecast good"
date: 2027-07-06
summary: "A good probability forecast is calibrated and as sharp as that allows. A proper score such as the Brier score rewards both, but only over many forecasts, never over one."
draft: true
---

A forecast that gives a probability cannot be right or wrong on a single occasion. If it says 70 per cent and the event does not happen, the forecast may have been fine, because it also said 30 per cent. What can be judged is a forecaster, over many forecasts.

## Calibration and sharpness

A forecaster is calibrated if events given 70 per cent happen about 70 per cent of the time, events given 20 per cent about 20 per cent of the time, and so on. The check is to group the forecasts by stated probability and count how often the event happened. Plotting the observed frequency against the forecast probability gives a reliability diagram, and a calibrated forecaster lies on the diagonal.

Calibration is not enough. Someone who says 50 per cent every time, for events that happen half the time, is calibrated and tells you nothing. Sharpness is how far the forecasts move away from the long-run frequency towards 0 or 1. The aim is to be as sharp as calibration allows: confident when the evidence is strong, and not otherwise.

## Two forecasters

I simulated 5000 events, each with a true probability, and two forecasters. The numbers are made up. One forecaster states the true probability and so is calibrated. The other has the same information but pushes its probabilities towards 0 and 1, a familiar way for forecasts to go wrong. Its forecasts near 97 per cent came true 89 per cent of the time, and its forecasts near 3 per cent came true 12 per cent of the time. In the reliability diagram its line is flatter than the diagonal.

![A reliability diagram of forecast probability against how often the event happened, with a dashed diagonal. The calibrated forecaster lies on the diagonal. The overconfident forecaster's line is flatter, above the diagonal for low forecasts and below it for high ones. Bars underneath show that the overconfident forecaster uses the extreme probabilities most.](figure:good-forecasts "Reliability diagram for two made-up forecasters over 5000 simulated events; the dashed line is perfect calibration. Brier score: calibrated 0.161, overconfident 0.171, lower being better.")

## The Brier score

Brier (1950) proposed scoring probability forecasts by the squared difference between the forecast and what happened, averaged over forecasts. In the form now usual for a yes-or-no event, that is the mean of (f - o)^2, where f is the forecast and o is 1 if the event happened and 0 if not. The score lies between 0 and 1, and lower is better.

On the 5000 events the calibrated forecaster scores 0.161 and the overconfident one 0.171. A forecaster who says 50 per cent every time scores exactly 0.25, whatever happens. The gap between the two forecasters looks small on this scale, and it comes only from the overconfidence. A score means little by itself, so it is read against a simple reference forecast such as the base rate.

## Why the score has to be proper

A scoring rule is proper if a forecaster does best, in expectation, by reporting what they really believe, and strictly proper if no other report does as well (Gneiting and Raftery 2007). The Brier score is strictly proper. Absolute error is not: a forecaster who believes 70 per cent does best under it by saying 100 per cent, because the expected loss is linear in the stated probability. A rule that rewards exaggeration cannot be used to compare forecasters honestly.

## One forecast, one election

With 20 forecasts at 70 per cent, the number that come true can land anywhere from about 10 to 18 by chance alone, which is a frequency of 50 to 90 per cent. With few forecasts, calibration cannot be tested. An election model issues one forecast every few years, and one outcome cannot tell an 80 per cent forecast from a 60 per cent one. A model of species presence at 500 sites gives 500 forecasts at once, so a reliability diagram is possible. Even so, nearby sites are not independent, and the effective number of forecasts is smaller than 500.

## What to ask

1. How many forecasts were made, and how many at each probability?
2. Is there a reliability diagram?
3. What does a proper score say, and what does a simple reference forecast score?
4. Were the forecasts issued before the outcomes were known?
