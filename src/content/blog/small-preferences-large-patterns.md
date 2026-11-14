---
title: "Small preferences, large patterns"
date: 2027-06-29
summary: "In Schelling's model, agents content with a third of their neighbours alike still produce strongly segregated patterns. A pattern in the whole does not reveal the wishes of the parts."
draft: true
---

A pattern across a whole population is easy to see and says less about its members than it seems to. Schelling's model of segregation is the plainest demonstration I know.

## The model

Schelling (1971) described agents of two kinds on a board, each content or not depending on its neighbours, with the discontent ones moving. The version here is on a 30 by 30 grid with 810 agents, 405 of each type, and 90 empty cells. An agent looks at the occupied cells among the eight around it and is content if at least a third of them hold its own type. So an agent with six neighbours is content with two like it and four unlike. Each round, every discontent agent moves to a random empty cell where it would be content, and the run stops when everyone is content.

The start is random, and the mean share of like neighbours is 0.48. After four rounds everyone is content, and the mean share is 0.74. In a dozen other seeds the start lay between 0.49 and 0.51 and the end between 0.73 and 0.80.

![Two 30 by 30 grids of two colours with some empty cells. The left grid is a random mixture. The right grid, after the agents have moved, is made of large single-coloured patches.](figure:small-preferences-large-patterns "Schelling's model, with each agent content if at least one neighbour in three is of its own type. The mean share of like neighbours rises from 0.48 at the random start to 0.74 once everyone is content.")

## The gap between the parts and the whole

No agent in the model asks for a neighbourhood in which its own type dominates. Each accepts being in a one-in-three minority. Yet in the settled grid the average agent is surrounded by close to three quarters of its own type. Each move changes two neighbourhoods, the one the agent leaves and the one it joins, and the change can turn a content neighbour into a discontent one, who then moves in turn. The pattern comes from these chains, and it is much stronger than anything in the individual rule.

## Reading the pattern backwards

Suppose you saw only the settled grid. You would be tempted to conclude that its agents want to live among their own kind, yet every agent in it has accepted a one-in-three minority. The model shows that mild preferences are enough to produce a pattern like this, so the pattern alone cannot tell you what the preferences are. Whether real segregation comes from them is a separate question. Prices, discrimination and the location of jobs and schools can each produce segregation, and none of them is in the model.

Inferring individual attitudes from a group pattern is a case of the ecological fallacy. Robinson (1950) compared correlations across geographical areas with correlations across the individuals living in them and found that the two could differ in size and in sign. A property of the group is not a property of its members.

## Ecology has the same gap

Regular patterns in vegetation, such as the bands and spots seen in dry regions, can arise when plants help their near neighbours and compete with more distant ones, with no template imposed from outside. Rietkerk and van de Koppel (2008) review patterns of this kind in real ecosystems. A clumped distribution of a species is just as ambiguous. It can come from individuals that attract one another, from seeds that fall near their parents, or from a patchy habitat, and a map of where the individuals are does not say which.

## Before reading a mechanism off a pattern

1. Write down the simplest individual rule that could produce the pattern.
2. Simulate it, and see whether it does and by how much.
3. Ask which other rules give the same pattern, including ones with a different mechanism.
4. Look for data on individuals that can tell the rules apart.

If many rules would produce a pattern, the pattern alone is weak evidence for any one of them.
