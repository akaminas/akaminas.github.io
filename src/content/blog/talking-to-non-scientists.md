---
title: "Talking about quantitative research with people who are not scientists"
date: 2026-11-24
summary: "My rules for explaining a model to non-scientists: start from their decision, give one number with its uncertainty in words, separate measured from assumed, say what the model can't tell them."
draft: true
---

Much of what I do is mathematical, and many of the people who might use it aren't mathematicians. Explaining a quantitative result to someone who has no reason to read the methods section takes some discipline. These are the rules I try to follow, with a few cases where they bite.

## Start from their decision

Before explaining anything, find out what the listener has to decide, or what they want to understand. A result that bears on that decision is interesting to them. One that doesn't is a digression, however elegant. It also forces you to decide which part of your work matters for the question. A quick test: if you can't say what they would do differently depending on the answer, you haven't found their question yet. A fishery manager choosing between keeping this year's catch and cutting it by a tenth needs to know what each choice does to the stock in twenty years, and how sure you are. The age structure of the model is none of their business unless it changes that answer.

## Say what the model is for

One sentence is enough: "This model asks how much of the stock would remain in twenty years if the catch stayed as it is." It tells the listener what kind of answer to expect, and what kind of question the model doesn't address. Say also what has been left out, and why. If the market price of fish isn't in the model, say so, because someone in the room will assume it is.

## Give one number, and say how sure you are

Choose the number that carries the message, and give its uncertainty in words as well as an interval: "most likely around 40, very unlikely to be below 20, and nine times in ten between 23 and 60". People remember the central value, so the range has to be said aloud and written beside it. Don't give more digits than the uncertainty supports. "40" is honest and "40.3" isn't.

Frequencies are usually easier to grasp than probabilities. "About 1 in 4" tends to land better than "25 per cent", and better still than "a probability of 0.25". Gigerenzer and Hoffrage (1995) found that people reason about medical test results more accurately when the information comes as natural frequencies than when it comes as probabilities, and I have no reason to think other fields differ.

![A bell-shaped curve over the share of today's stock left in twenty years, with a line at the most likely value, 40, a bar over the range from 23 to 60, and a shaded tail below 20.](figure:talking-to-non-scientists "One made-up result, said three ways: the most likely value, the range that holds nine outcomes in ten, and the chance of falling below 20, about 1 in 40.")

Here is how much the format matters, with made-up numbers for a screening test. One person in a hundred has the condition, the test catches 90 per cent of cases, and 9 per cent of healthy people also test positive. As probabilities: P(condition given positive) = 0.009 / (0.009 + 0.0891) = 9.2 per cent, which hardly anyone gets by hand. As frequencies: out of 1000 people, 10 have it and 9 of those test positive. Of the other 990, about 89 test positive. So of roughly 98 positives, 9 have the condition, about 1 in 11. It is the same calculation, and the second version can be done standing in a room.

The same goes for the curve in the figure. A 1 in 40 chance of falling below 20 sounds ignorable, and for one stock it may be. Repeat it over ten independent stocks and the chance that at least one falls below 20 is 22 per cent, and over twenty it is 40 per cent. (Independence is generous. Stocks that share a climate tend to fail together, and that changes the number.) And a 90 per cent interval is meant to miss one time in ten. Quote twenty of them in a year and two misses is about what you should expect, which is not the intervals failing.

## Separate three kinds of statement

Measured quantities are observed, with the instruments and sample size named. Assumed ones are chosen because the model needs them, with the alternatives named. Estimated ones are inferred from the measured, given the assumed.

A report that mixes the three without saying so sounds confident and is fragile. In the fishery case, last year's catch is measured. A natural mortality of 0.2 a year is probably assumed, since it is hard to measure. "The stock is at 40 per cent of its starting size" is an estimate, built from the first under the second. If the listener disagrees about mortality, marking them lets them see which number that moves.

## Say what would change the answer

"The result barely moves if the growth rate is a bit higher, but it moves a lot if the discount rate is." This tells a non-specialist which assumptions to argue about, and which to leave. It is the plain-language form of a sensitivity analysis. I'd rather give two or three of these than a full table of them. The aim is to give the listener something to disagree with.

## One figure, one message

A figure should make one point, and the point should be in its title. Check that it survives for readers with colour-vision differences and when printed in grey. If you want the audience to see an interval, draw the interval. And if the slide needs a minute of reading, you're competing with it while you talk.

## Mind the words

Several scientific terms mean something else in ordinary speech: significant, random, error, theory, model, positive, uncertain. "Uncertain" is the dangerous one. To a scientist it can mean a well-quantified range, and to a listener it can sound like "we don't know". Say "we know this to within about ten per cent" rather than "this is uncertain". "Significant" is nearly as bad: a result can be statistically significant and tiny, and the listener will hear "important".

Words for probability are worse. The IPCC's guidance for its authors gives "likely" as 66 to 100 per cent and "very likely" as 90 to 100 per cent. I wouldn't assume a listener hears them that way, so say the percentage.

## Predictions and scenarios

A model that says "if emissions follow this path, then" is giving a scenario. A forecast says what will happen. Using the first as the second is a common source of misunderstanding, so state which one it is. A scenario also carries no probability for the path itself. If it gives one outcome under path A and another under path B, a listener who takes something in between has made their own forecast without telling you. The model gives consequences. Which consequence is worth having is a judgement for the people deciding, and if I slip a preference in, I should say so.

## Don't apologise, and don't talk down

Say what you know well, what roughly, and what not at all. Apologising for uncertainty makes it sound like a flaw in the person, when it is a feature of the problem. Talking down is no better. The listener may well know their own field far better than you do, and what they lack is only your vocabulary. A fisher will often know where the boats really go, which no model of mine had in it. Ask. Sometimes that is the assumption that needs changing.

## Ask what they heard

At the end, ask them to say in their own words what they take from it. The answer is often not what you meant, and it is much cheaper to find out then than later. I'd ask something specific: what would you do if the number came out at 20 instead of 40?
