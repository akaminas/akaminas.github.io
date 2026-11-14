---
title: "Catastrophe theory for ecosystems and for economies"
date: 2026-12-15
summary: "Catastrophe theory names the ways equilibria appear and vanish as controls change. It fits abrupt change in ecosystems and economies, but only data can show that a given system has a jump."
draft: true
---

Some systems respond smoothly to pressure: push a bit harder, get a bit more change. Others stay almost unchanged for a long time and then jump. Catastrophe theory is the mathematics of how a system's equilibria appear, merge and vanish as its control variables change, and it gives the abrupt cases names. It's René Thom's, from the 1960s and 70s, and Christopher Zeeman made it famous. Thom's classification has seven basic forms for systems that roll downhill on a potential with up to four controls. I only need two.

## The fold and the cusp

Take one state variable x rolling downhill on a surface called a potential. The simplest abrupt case is the **fold**. As a control parameter changes, a stable equilibrium and an unstable one approach each other, merge and disappear. If the system was resting at the stable one, it has to go somewhere else, and it does so quickly. Undoing the change doesn't undo the jump, since the state has landed elsewhere, so the path out differs from the path back. That difference is **hysteresis**.

Add a second control and you get the **cusp**. In its standard form the dynamics are dx/dt = -(x^3 + a x + b), so the equilibria satisfy

    x^3 + a x + b = 0

where a and b are the two controls. Roughly, a decides whether there are two states at all, and b tilts the balance between them. In a wedge-shaped region of the (a, b) plane, where 4a^3 + 27b^2 is negative, there are three equilibria, two stable and one unstable (an equilibrium is stable where 3x^2 + a is positive). Outside the wedge there's one. Fix a = -1 and change only b, and the wedge is the range of b from -0.385 to 0.385, which is 2/(3 sqrt 3). At each edge of it one of the stable equilibria disappears. A system resting on that one has to jump to the other, and the jump happens at a different value of b depending on the direction of travel.

![The equilibrium curve of a fold against a control b: a backward S with two solid stable branches, a dashed unstable branch between them, and two arrows marking the jumps at b = 0.385 and b = -0.385.](figure:catastrophe-theory "The equilibria of x^3 - x + b = 0, the cusp at a = -1. Solid is stable, dashed is unstable. Raise b and the system drops at 0.385. Lower it again and nothing happens there: it only jumps back up at -0.385.")

Some numbers from that curve. Rising b, the upper state reaches the fold at x = 0.577 and has to land on the only equilibrium left, x = -1.155, a drop of 1.73. Coming back, nothing happens at b = 0.385, because the lower state stays stable all the way down to b = -0.385. So b has to be taken back by 0.77, twice the distance from zero to the fold, before the system jumps up again.

The wedge gets wider as a gets more negative, in proportion to |a|^(3/2): its half-width in b is 0.136 at a = -0.5, 0.385 at a = -1 and 1.09 at a = -2. For a above zero there's no wedge at all, one equilibrium for every b, and the response is smooth. So the second control decides whether the response to the first is smooth or abrupt, and you can go round the cusp point without jumping.

How fast b moves matters as well. I ran the equation with b rising from -0.8 at 0.1 per unit of time (Euler steps of 0.002; the return time at b = 0 is 0.5 in these units), and x crossed zero at b = 0.72, not 0.385. The fold value is what you'd see if b changed infinitely slowly, so an observed hysteresis loop comes out wider than the one the equation draws.

## Ecosystems

The picture was taken up in ecology early. Ludwig, Jones and Holling's 1978 model of spruce budworm outbreaks contains folds of this kind. Scheffer and colleagues' 2001 review of catastrophic shifts in ecosystems collects lakes, coral reefs, drylands and others that appear to have alternative stable states. The state variable might be clear water or turbid, coral or algae, and the controls nutrients, grazing or fishing, and temperature.

One condition is easy to forget: the state variable has to be fast compared with the controls. Algae respond in days to weeks, and the nutrient load of a lake drifts over years, so treating the load as a fixed control and the algae as the state is reasonable. If the controls move as fast as the state does, there's no fixed picture to draw. And the hysteresis is the part with consequences: whether a real lake or reef needs a push back as large as the cusp above does (twice the distance to the fold) has to be found out case by case. I wouldn't assume it.

Marine communities under two pressures, such as climate change and fishing, raise the question of whether they reorganise gradually or jump between alternative states, and how the pressures act together. The two pressures are natural candidates for the control variables of a cusp.

## Economies and societies

Zeeman applied the theory to stock-market crashes and to prison riots, among other cases. The appeal is clear: markets and norms also stay put for long periods and then change quickly, and the path back is often not the path forward. Institutions that lock in, and behaviour that tips once enough others have changed, have the same shape.

One difference from ecology matters, I think. A lake's nutrient load is mostly set from outside. In an economy the thing playing the control, say confidence or a price, responds to the state it's supposed to be controlling, and then the picture of a state sliding along a curve as a knob is turned doesn't hold as it stands.

## The critique

The theory had a rough reception. Sussmann and Zahler (1978) argued that applications to biology and the social sciences were often loose: a cusp could be drawn through almost any data without being tested against it. That's a fair complaint. Two points keep the theory useful.

First, strictly, the elementary catastrophes describe systems whose dynamics follow a potential. Many real systems don't. But the fold and the cusp reappear as local descriptions near a transition in the general theory of bifurcations, which doesn't require a potential.

Second, a catastrophe is a testable claim only with data that can show it. The signatures are bimodality in the observed states, abrupt jumps, hysteresis between the upward and downward paths and, near a fold, slower recovery from disturbance and rising variance. The last two were developed as early-warning signals. Each can arise for other reasons, so several together are more convincing than any one.

The recovery one can be put in numbers. On the upper branch the rate of return is 3x^2 - 1 (with a = -1), and it goes to zero at the fold:

| b | x | rate of return | return time |
|---|---|---|---|
| 0 | 1.00 | 2.00 | 0.5 |
| 0.20 | 0.88 | 1.32 | 0.8 |
| 0.30 | 0.79 | 0.86 | 1.2 |
| 0.35 | 0.71 | 0.53 | 1.9 |
| 0.38 | 0.63 | 0.19 | 5.3 |

Between b = 0 and b = 0.38 the return time grows tenfold, and the variance of small fluctuations grows with it, as s^2/(2 x rate) for noise of size s (a linear approximation that gets worse near the fold). With s = 0.2 that's 0.01 at b = 0 and about 0.1 at b = 0.38. A smooth system whose response just weakens could show the same trend, which is why I'd want the jump too.

To test the cusp rather than draw it, there are methods for fitting a stochastic cusp to data by maximum likelihood and comparing it with a model that has no jumps. If the smooth model fits about as well, the cusp hasn't earned its place.

## Noise

With random variation, a system near a fold doesn't wait for the equilibrium to vanish. It can flicker between the two states, the more so the closer it gets to the edge. A transition at a threshold then looks like a change in the proportion of time spent in each state. Models that combine a deterministic skeleton with a stochastic component are the natural way to describe this.

For the cusp with additive noise, dx = -(x^3 - x + b) dt + s dW, the long-run density of x is exactly proportional to exp(-2V/s^2), where V is the potential x^4/4 - x^2/2 + b x. I integrated that to get the share of time spent on the upper side, x > 0. With s = 0.4 it is 0.99 at b = -0.2, 0.91 at -0.1, 0.50 at 0, 0.09 at 0.1 and 0.01 at 0.2. So the changeover is spread over b from about -0.2 to 0.2, well inside the range of -0.385 to 0.385 where the noiseless system has two stable states. Less noise (s = 0.3) gives 0.99 at b = -0.1, more (s = 0.5) gives 0.80. With noise, "where it tips" stops being a single number, and I'd say which definition I'm using whenever I quote one.

## What it is good for

Catastrophe theory doesn't tell you that a particular system has a fold. It tells you what a fold would look like, what it would do and what data would show it. What I'd ask of any claimed catastrophe: is the state variable fast compared with the control, is the control really independent of the state, is there a jump or hysteresis in the data and not only in the model, and what would a smooth model with the same data predict differently?
