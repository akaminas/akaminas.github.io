---
title: "Confounders, mediators and colliders"
date: 2027-05-18
summary: "Adjusting for a variable can remove a false association, hide a real effect or create an association that was not there. Which one it does depends on the causal arrows, not on the correlations."
draft: true
---

Adjusting for a variable means holding it fixed, by including it in a regression or by comparing like with like. It is often done because the variable is correlated with both the cause and the outcome, and that is not enough to say whether adjusting helps. Depending on the causal arrows, it can remove a false association, hide a real effect or create an association that was not there.

## Three structures

Call the cause x, the outcome y and the third variable z. A causal diagram draws an arrow from each thing to what it influences, and there are three ways z can sit between them.

A confounder is a common cause of x and y. Age affects who is given a treatment and also how well people recover, so a comparison of treated and untreated people mixes the effect of the treatment with the effect of age. Adjust for it.

A mediator lies on the path from x to y. A subsidy might raise farm income by raising yields, so yield is a mediator between subsidy and income. Adjusting for yield removes the part of the effect that passes through it. If you want the total effect of the subsidy, do not adjust. If you want the part that does not pass through yield, do.

A collider is caused by both x and y. Two causes that are independent of each other stay independent, unless you look only at cases where the collider takes a particular value or range. Adjusting for z, or selecting on it, opens a path that was closed.

A variable counts as a confounder because of where its arrows point. Correlation with both x and y does not settle it: such a variable can be a confounder, a mediator or a collider, and the data alone do not say which.

## Selection on a collider

Berkson (1946) pointed out that hospital patients are a selected sample. If admission depends on having either of two conditions, the conditions can appear associated among patients even when they are unrelated in the population. The same thing happens wherever a sample is chosen by something both variables feed into.

A simulation shows how little it takes. Draw 500 pairs of scores, x and y, independently from a standard normal distribution. Across all 500 the correlation is -0.02. Now keep only the pairs whose sum exceeds 1, which is 121 of them, a little under a quarter. Among those kept the correlation is -0.60.

![Left, three small diagrams with variables x, y and z: z as a common cause of x and y, z between x and y, and z caused by both. Right, a scatter of 500 pairs of independent scores, with the 121 pairs whose sum exceeds 1 marked, in which the correlation among the marked pairs is -0.60.](figure:confounders-and-colliders "Left, z as a confounder, a mediator and a collider. Right, 500 independent pairs; keeping the 121 above the dashed line, where the sum exceeds 1, makes x and y correlate at -0.60.")

The selection rule created the association. Suppose a funder ranks proposals on the sum of two independent scores, say the strength of the idea and the track record of the team, and funds the top quarter. Among funded proposals the two scores will be negatively related, and someone looking only at that list could conclude that a strong idea compensates for a weak record, or the reverse. The same would hold for papers accepted on a combination of novelty and rigour, if those two were unrelated among the papers submitted.

## What to do

Draw the diagram before choosing what to adjust for. It need not be elaborate: x, y, and the other variables with an arrow wherever you would defend one. The adjustment set then follows from the diagram. It does not follow from which variables came out significant in a regression, and adding every measured variable is not a safe default, because a collider among them does damage.

Two further habits help.

- Ask how each unit came to be in the data. A sample chosen by a score, a survey that people had to answer, a list of funded projects and a set of published results are all selected, and the selection may be a collider.
- State the effect wanted before adjusting: total or direct. The same mediator is right to include for one and wrong for the other.

The diagram is also a record of assumptions. Two analysts who disagree about an adjustment can look at the arrows and find which one they disagree about, which is quicker than arguing about the regression.
