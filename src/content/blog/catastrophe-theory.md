---
title: "Catastrophe theory for ecosystems and for economies"
date: 2026-12-15
summary: "Catastrophe theory classifies how equilibria appear and vanish as controls change. It describes abrupt change in both ecosystems and societies, and it needs data to be more than a picture."
draft: true
---

Some systems respond smoothly to pressure: push a little harder, get a little more change. Others stay nearly unchanged for a long time and then jump. Catastrophe theory is a branch of mathematics that classifies how the equilibria of a system appear, merge and vanish as its control variables change. It gives the abrupt cases names.

## The fold and the cusp

Consider a system with one state variable x that rolls downhill on a surface called a potential. The simplest abrupt case is the **fold**. As a control parameter changes, a stable equilibrium and an unstable one approach each other, merge and disappear. If the system was resting at the stable one, it has to go somewhere else, and it does so quickly. Undoing the change does not undo the jump, since the state has landed elsewhere, so the path out differs from the path back. That difference is **hysteresis**.

Add a second control variable and the picture is the **cusp**. In its standard form the equilibria satisfy

    x^3 + a x + b = 0

where a and b are the two controls. In a wedge-shaped region of the (a, b) plane, where 4a^3 + 27b^2 is negative, there are three equilibria, two stable and one unstable. Outside it there is one. Fix a = -1 and change only b, and the wedge is the range of b from -0.385 to 0.385. At each edge of it one of the stable equilibria disappears. A system resting on that one has to jump to the other, and the jump happens at a different value of b depending on the direction of travel.

![The equilibrium curve of a fold against a control b: a backward S with two solid stable branches, a dashed unstable branch between them, and two arrows marking the jumps at b = 0.385 and b = -0.385.](figure:catastrophe-theory "The equilibria of x^3 - x + b = 0, the cusp at a = -1. Solid is stable, dashed is unstable. A system whose b is rising jumps down at 0.385, and one whose b is falling jumps up at -0.385, so the way out differs from the way back.")

## Ecosystems

The picture was taken up in ecology early. Ludwig, Jones and Holling's 1978 model of spruce budworm outbreaks contains folds of this kind. Scheffer and colleagues' 2001 review of catastrophic shifts in ecosystems collects lakes, coral reefs, drylands and others that appear to have alternative stable states. The state variable might be clear water or turbid, coral or algae, and the controls nutrients, grazing or fishing, and temperature.

Marine communities under two pressures, such as climate change and fishing, raise the question of whether they reorganise gradually or jump between alternative states, and how the pressures act together. The two pressures are natural candidates for the control variables of a cusp.

## Economies and societies

Christopher Zeeman, who popularised the theory in the 1970s, applied it to stock-market crashes and to prison riots, among other cases. The appeal is clear: markets and norms also stay put for long periods and then change quickly, and the path back is often not the path forward. Institutions that lock in, and behaviour that tips once enough others have changed, have the same shape.

## The critique

The theory had a rough reception. Sussmann and Zahler (1978) argued that applications to biology and the social sciences were often loose: a cusp could be drawn through almost any data without being tested against it. That is a fair complaint. Two points keep the theory useful.

First, strictly, the elementary catastrophes describe systems whose dynamics follow a potential. Many real systems do not. But the fold and the cusp reappear as local descriptions near a transition in the general theory of bifurcations, which does not require a potential.

Second, a catastrophe is a testable claim only with data that can show it. The signatures are bimodality in the observed states, abrupt jumps, hysteresis between the upward and downward paths and, near a fold, slower recovery from disturbance and rising variance. The last two were developed as early-warning signals. Each can arise for other reasons, so several together are more convincing than any one.

## Noise

With random variation, a system near a fold does not wait for the equilibrium to vanish. It can flicker between the two states, the more so the closer it gets to the edge. A transition at a threshold then looks like a change in the proportion of time spent in each state. Models that combine a deterministic skeleton with a stochastic component are the natural way to describe this.

## What it is good for

Catastrophe theory does not tell you that a particular system has a fold. It tells you what a fold would look like, what it would do and what data would show it. That is enough to ask the question properly.
