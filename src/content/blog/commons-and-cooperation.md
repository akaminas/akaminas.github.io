---
title: "Why cooperation over a commons can persist"
date: 2027-06-22
summary: "Hardin expected shared resources to be ruined, yet many communities manage them for generations. Two payoff tables show how the numbers decide whether cooperation collapses or holds."
draft: true
---

A pasture, a fishery or an irrigation canal is shared, and each user gains by taking a bit more than their share, whatever the others do. Followed through, that logic ends with the resource used up. Often it doesn't.

## The argument and the evidence

Hardin (1968) set out the logic in "The tragedy of the commons". Each herder on a shared pasture gains the full benefit of one more animal and bears only a share of the cost of the extra grazing, so each adds animals and the pasture is overgrazed. Ostrom (1990), in *Governing the Commons*, collected cases that run the other way: alpine pastures, forests and irrigation systems managed by their users, some of them for centuries, along with others that failed. She found features that the long-lived arrangements tended to share. Her list has eight in all, and four of them matter here: clear boundaries around who may use the resource, monitoring by the users or by people answerable to them, sanctions that start small and grow with repeated breaches, and cheap ways of settling disputes.

Part of the disagreement is about the word. Hardin's pasture is open to anyone. Most of the arrangements Ostrom described aren't: someone decides who is in.

It's worth seeing what the tragedy costs, in numbers. Take the standard open-access fishery model: the stock grows logistically (rate r, carrying capacity K), the catch is proportional to effort times stock, each fish sells at a fixed price, and each unit of effort costs a fixed amount. Boats keep entering while there's a profit, so effort settles where profit is zero. Choose the cost so that the zero-profit stock is 20 per cent of K, and a bit of algebra gives the following (the parameters are mine, not from any real fishery). Open access ends with twice the effort that would maximise profit, a stock at 20 per cent of K where the profit-maximising effort would leave 60 per cent, and a sustained catch of 0.16 rK against 0.24 rK. So the fleet takes two thirds of the catch with twice the effort from a stock a third the size.

## A model with two strategies

Take a large population in which each user either cooperates, keeping to the agreed take, or defects, taking more. Let x be the share of cooperators. Users meet at random and receive payoffs, and a strategy that earns more than average becomes more common, because it is copied or because it reproduces. This is the replicator equation (Taylor and Jonker 1978): the share changes at the rate x (1 - x) times the payoff to cooperating minus the payoff to defecting.

Two games, with these payoffs to a user:

| Your choice, the other's choice | Game 1 | Game 2 |
|---|---|---|
| cooperate, cooperate | 3 | 4 |
| cooperate, defect | 0 | 0 |
| defect, cooperate | 5 | 3 |
| defect, defect | 1 | 2 |

In game 1 defecting pays more whatever the other user does, which makes it a dilemma. In game 2 cooperating pays when the other cooperates and defecting pays when the other defects, so there is a payoff for coordinating.

![Two panels of the growth of the share of cooperators against the share itself. In game 1 the growth is negative everywhere and the share falls to zero. In game 2 it falls to zero below a tipping point and rises to one above it.](figure:commons-and-cooperation "The flow of the share of cooperators under the two payoff tables. Above the horizontal line the share grows, below it the share falls. Filled dots are stable outcomes, open dots are not.")

## What happens

The only thing the share depends on is the payoff to cooperating minus the payoff to defecting. In game 1 a cooperator earns 3x and a defector 5x + (1 - x), so the difference is -(1 + x). It's negative everywhere, and the share of cooperators falls to zero from any start, which is Hardin's result. In game 2 the cooperator earns 4x and the defector 3x + 2(1 - x), so the difference is 3x - 2. Full cooperation and full defection are both stable, and the two payoffs are equal at a share of two thirds. A population that starts above two thirds cooperators ends with all of them cooperating, and one that starts below ends with none.

The threshold comes from the payoffs, and it can be fragile. In general it's (P - S) / ((R - T) + (P - S)), where R, S, T and P are the four payoffs in the order of the table. Game 2 has R = 4, S = 0, T = 3 and P = 2, which gives 2/3. Raise the payoff for defecting against a cooperator from 3 to 3.5 and the threshold moves to 0.8. At 3.9 it's 0.95, and cooperation needs nearly everyone to be on board before it can hold. The nearer the temptation gets to the payoff for mutual cooperation, the less room there is.

That cooperation can persist in game 2 doesn't mean it will. Both ends are stable, so where the population starts decides. One way to read Ostrom's design principles is as ways of moving a community from game 1 to game 2, so that keeping to the rule pays when most others keep to it. That's my reading, not her claim, and a model with four payoffs can't say which rules do it.

What it can do is show what a rule has to achieve. Take game 1 and put a fine s on every act of defection. The difference becomes s - 1 - x. With s at 1 or below, defecting still wins from every start. With s between 1 and 2 there's a stable mix in which a share s - 1 cooperates (half of them at s = 1.5). Above 2, cooperation wins from every start. I checked those against a simulation of the equation. A fine only bites when it's imposed, so what matters is the chance of being caught times the fine: a fine of 6 imposed on one defector in three is worth 2, right at the edge. Monitoring and sanctions trade off, and the model sees only their product.

There's also the third case, which I haven't drawn, in which cooperators and defectors coexist. Take payoffs of 3, 1, 5 and 0 for the four rows of the table in order. Cooperating against a defector now beats mutual defection, but defecting against a cooperator still beats cooperating with one. The difference is 1 - 3x, and the population settles at one third cooperators from any start. The middle range of the fine above is the same case.

## The same mathematics elsewhere

The equation is also used for microbes that secrete a molecule others can use, where x is the share of cells and the payoffs are growth rates, and for people choosing whether to keep to a rule, where x is the share of users and the payoffs are what they gain. A shared equation doesn't make the mechanisms alike: cells don't deliberate, and people do. With cells, payoffs set by growth are a natural thing to put in. With people they're a modelling choice, and "copy whoever is doing better" is a strong assumption about how a fisher or a farmer decides.

## Limits

The population is large, well mixed and without memory. Users meet at random, once, with fixed payoffs. Real users meet again, know one another and can change the rules, and these are the features Ostrom emphasised. A village of thirty users doesn't have a smooth share of cooperators either: it has individuals, and one household can move the share by three points.

The tipping point is also sharper on paper than it would be in a small population with noise: a group just above two thirds can lose cooperation through a run of defections, and one just below can recover it. The payoffs are fixed, and for a real resource they aren't. As a stock falls, the gain from defecting changes, and the community can drift from one game to another without anyone changing a rule. The model shows what the payoffs would have to look like for cooperation to persist, and says nothing about whether real commons have them.

## Questions for a shared resource

- Who may use it?
- Can use be seen by the others?
- What happens to someone who takes too much, and who decides?
- How cheaply are disputes settled?
- Do the users meet again?
- Do the payoffs change as the stock falls?

Each answer changes a payoff in the table.
