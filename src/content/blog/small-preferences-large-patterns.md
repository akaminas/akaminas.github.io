---
title: "Small preferences, large patterns"
date: 2027-06-29
summary: "In Schelling's model, agents who are content with one neighbour in three alike still end up in strongly segregated patches. A pattern in the whole doesn't tell you what the parts want."
draft: true
---

A pattern across a whole population is easy to see, and it says less about the individuals than it looks like it does. Schelling's segregation model is the clearest case I know.

## The model

Schelling (1971) first did this with coins on a board: two kinds of agent, each content or not depending on its neighbours, and the discontent ones move. The version I ran is on a 30 by 30 grid with 810 agents, 405 of each type, and 90 empty cells. The board has edges, no wrap-around. An agent looks at the occupied cells among the eight around it and is content if at least a third of them hold its own type. So an agent with six neighbours is content with two like it and four unlike. Each round, every discontent agent moves to a random empty cell where it would be content (if there isn't one, it stays put), and the run stops when everyone is content.

The start is random, and the mean share of like neighbours is 0.48. After four rounds everyone is content, and the mean share is 0.74. In a dozen other seeds the start lay between 0.49 and 0.51 and the end between 0.73 and 0.80, after four to eight rounds.

![Two 30 by 30 grids of two colours with some empty cells. The left grid is a random mixture. The right grid, after the agents have moved, is made of large single-coloured patches.](figure:small-preferences-large-patterns "Schelling's model with a tolerance of one neighbour in three. The mean share of like neighbours goes from 0.48 at the random start to 0.74 once everyone is content.")

Counting the moves in the seed that is drawn: 155 of the 810 agents are discontent at the start. After they have moved, 43 are discontent, then 17, then 7, then none. That is 222 moves in all.

## The gap between the parts and the whole

No agent in the model asks for a neighbourhood where its own type dominates. Each accepts being in a one-in-three minority. Yet in the settled grid the average agent has close to three quarters of its own type around it. The difference comes from the chains. Each move changes two neighbourhoods, the one the agent leaves and the one it joins, and either change can turn a content neighbour into a discontent one, who then moves in turn. That is the 155, 43, 17, 7 above. The pattern comes from these chains, and it is much stronger than anything in the individual rule.

How strong depends on the threshold, and not in proportion. I reran the board with 20 seeds for each setting, with the same 10 per cent of empty cells. If agents are content with one neighbour in eight alike, the settled mean share of like neighbours is 0.52, hardly above the random start. At one in four it is 0.59, at one in three 0.76, at one in two 0.87. (With all eight neighbours present, one in four means two like neighbours and one in three means three, so some of the jump from 0.59 to 0.76 is the grid being discrete.) Even agents who want at least half of their neighbours alike end up, on average, at 87 per cent and not 100. Push the threshold to five in eight and the model stops settling reliably: 4 of the 20 runs were still moving after 200 rounds.

The number of empty cells matters less. From 5 to 20 per cent empty, the settled mean stays between 0.74 and 0.76. At 2 per cent only 13 of 20 runs had settled after 200 rounds. I think that is because an unhappy agent rarely finds a free cell where it would be content, but I haven't checked.

## Reading the pattern backwards

Suppose you saw only the settled grid. You would be tempted to conclude that its agents want to live among their own kind, yet every agent in it has accepted a one-in-three minority. The model shows that mild preferences are enough to produce a pattern like this, so the pattern alone can't tell you what the preferences are. Whether real segregation comes from them is a separate question. Prices, discrimination and the location of jobs and schools can each produce segregation, and none of them is in the model.

The average also hides who lives where. In the settled grid, 238 of the 810 agents have no unlike neighbour at all, and 96 are outnumbered, with fewer than half of their neighbours their own type. Those 96 are content, since the rule only asks for a third, and they sit along the edges of the patches.

You can also take the preferences away. Fill the 30 by 30 board completely with two types at random, and at each step let a random cell copy the type of a random neighbour. Nobody prefers anything and nobody moves. A quick simulation (20 runs, a sweep being 900 updates) gives a mean share of like neighbours that first reaches the 0.74 of the settled grid after a median of 20 sweeps, with a range of 7 to 38. So the same summary number comes out of a rule with no preferences in it. The two don't stay alike: the shares of the two types drift (between 0.39 and 0.60 for the first type at that point), and on a finite board this copying rule ends in a single colour if you wait long enough, while Schelling's stops as soon as everyone is content. But with one number for the whole board you couldn't tell them apart.

Inferring individual attitudes from a group pattern is a case of the ecological fallacy. Robinson (1950) compared correlations across geographical areas with correlations across the individuals living in them and found that the two could differ in size and in sign. For the foreign-born and illiteracy it was about -0.5 across states and about +0.1 across individuals. A property of the group isn't a property of its members.

## Ecology has the same gap

Regular patterns in vegetation, such as the bands and spots seen in dry regions, can arise when plants help their near neighbours and compete with more distant ones, with no template imposed from outside. Rietkerk and van de Koppel (2008) review patterns of this kind in real ecosystems. In those models the spacing of the bands comes out of the two ranges, short-range help and longer-range competition, and nothing in any single plant says "make a band". It is Schelling's problem again: you see stripes and look for a stripe-making rule, but nothing in the rule has stripes in it.

A clumped distribution of a species is just as ambiguous. It can come from individuals that attract one another, from seeds that fall near their parents, or from a patchy habitat, and a map of where the individuals are doesn't say which. Each of the three predicts something different at the level of individuals, though. Attraction should show in how close an individual settles to others of its species, seed fall in how far seedlings sit from a parent, and a patchy habitat in how the clumps line up with a map of the habitat. Those are measurements on individuals, and that is what the pattern itself lacks.

## Before reading a mechanism off a pattern

1. Write down the simplest individual rule that could produce the pattern.
2. Simulate it, and see whether it does and by how much. (The threshold runs above give anything from 0.52 to 0.87.)
3. Ask which other rules give the same pattern, including ones with a different mechanism.
4. Look for data on individuals that can tell the rules apart.

If many rules would produce a pattern, the pattern alone is weak evidence for any one of them. For segregation, step 4 means data on moves: who moved, from what kind of neighbourhood to what kind, and what else was on offer. A map of where people live now can't supply that, however detailed it is.
