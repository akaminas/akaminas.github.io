---
title: "Isolation as a rate"
date: 2027-02-23
summary: "Island biogeography usually treats isolation as a label on a place. If it's a rate of arrival that depends on who's already there, it can go into a model. A toy of mine shows what that changes."
draft: true
---

Islands are isolated, and so are habitat fragments. The usual way to handle that is as a property of the place: how far from the mainland, how big, how connected. That's a fine simplification. What I want to know is what changes if isolation is a rate instead, because the rate at which new lineages arrive may depend on the community that receives them.

## The classical picture

MacArthur and Wilson (1967) have the number of species on an island settle where immigration, which falls as more species are already there, meets extinction, which rises. Distance from the mainland lowers immigration and a larger area lowers extinction, so remote or small islands hold fewer species. It's simple and it has shaped island biogeography ever since. Simberloff and Wilson (1969) emptied small mangrove islands of their arthropods and watched them refill. The number of species came back to about the old value within a year or so, though not as the same species.

The figure draws it with straight lines and made-up rates. Both islands share one extinction line, E = 0.5 S / 100. Immigration is I = a (1 - S / 100), with a = 1 for the near island and a = 0.4 for the far one, so the far island's line starts at 0.4 of the near island's. Setting I = E gives S = 100 a / (a + 0.5): 67 species near, 44 far, from a pool of 100.

![Immigration falls and extinction rises with the number of species on an island. A near island has a higher immigration line than a far island, the gap between them is marked isolation, and the near island settles at more species where its line crosses extinction.](figure:isolation-is-a-rate "Isolation drawn as the gap between two immigration lines. Straight lines, made-up rates. Each island settles where its line meets extinction.")

Two other things drop out of the same lines and are easy to miss. At equilibrium immigration equals extinction, so the turnover is 0.5 x 66.7 / 100 = 0.33 species per unit time on the near island and 0.22 on the far one. The far island swaps its species more slowly. It also gets to equilibrium more slowly. The count follows dS/dt = a - S (a + 0.5) / 100, which approaches its end point with time constant 100 / (a + 0.5), so 67 time units near and 111 far. Getting 90 per cent of the way takes 2.3 time constants, about 154 against 256. A far island is poorer, and at any given age it's also further from where it's heading.

In this picture isolation is an input. It sets the height of the immigration line, and the only thing that moves the line is the number of species already on the island.

## Why a rate that responds

What arrives isn't a random sample. Whether a new lineage establishes depends on the residents it meets, and residents change: they evolve, they go extinct, and that alters who can arrive next. Immigration can also bring in variation that changes how the residents adapt. So the arrival rate and the community are coupled, and the question becomes how the degree of isolation changes which lineages a community gains and loses, and how evolution responds.

A toy, to see how much this can matter. It's mine, it's made up, and it can be solved exactly. Split the pool of 100 into 10 guilds of 10 species, and let an island hold one species per guild, so an arrival into an occupied guild fails. Keep the rates from above: each species not on the island arrives at rate a / 100, each resident goes extinct at rate 0.5 / 100. A guild is now either empty or full. An empty one fills at rate 10 a / 100, since any of its ten species will do, and a full one empties at 0.005. The chance that a guild is full is 10 a / 100 divided by (10 a / 100 + 0.005), which is 0.952 for a = 1 and 0.889 for a = 0.4. So 9.5 species near and 8.9 far, against 67 and 44 when species arrive independently, with the same arrival and extinction rates throughout.

Isolation has almost stopped mattering for how many species there are. It still matters for how fast: a guild fills with time constant 1 / (10 a / 100 + 0.005), which is 9.5 time units near and 22 far. I wouldn't trust the numbers, since real communities aren't ten slots with strict exclusion. It's the extreme case, picked so the arithmetic stays short. The only point is that what a given arrival rate does depends on how the receiving community responds, and a label on the place can't hold that.

## Four processes

A model of this would couple four things that are usually studied separately: immigration, the arrival of new lineages; ecological interactions among the residents; diversification, the origin of new lineages in place; and extinction. Evolution acts on the traits that govern the interactions, so ecology and evolution are coupled directly and not separated by a difference in timescale. Such models are stochastic and are usually studied by simulation.

Parts of this have been done. Losos and Schluter (2000) found that on the islands of the Greater Antilles, Anolis lizards form new species within an island only above a threshold in island area, and that this adds more and more to richness as area grows. Rosindell and Phillimore (2011) put arrival and speciation on the island into one neutral model and used it to ask when speciation within an island starts to count alongside arrival. What I'm after is the same coupling with the residents' interactions and traits put in.

## What the rate view allows

It gives a continuum. At one end is a fully isolated community that only diversifies, at the other a well-connected one that is mostly sorting its arrivals. In between the two compete, and I suspect much of the interest is there.

Strong competition and heavy immigration can leave similar marks on a community, as the earlier post on identifiability describes. A model that has both can ask which statistics separate them.

Timescales become explicit as well. Arrival, ecological sorting and evolution each take their own time, and what a result means depends on whether the process had time to act within the run. A result should say the age at which the community is read. The far island above is a small case of this, since age matters more there.

With island data in hand I wouldn't regress richness on distance and stop. I'd ask what distance means for the taxon, since a bird, a snail and a seed cross the same 50 km at very different rates. I'd ask whether the effect of distance differs between young and old communities. And I'd ask whether the species that are there are the ones the arrival rate would predict.

None of this is tied to islands. A town has the same structure. Distance to the nearest city is a label, but what arrives (a shop, a clinic, a new family) depends on who is already there, because a bakery needs customers and a second bakery competes with the first.

## What is not settled

This is a way of framing a question, not a result. The classical model already lets arrival depend on how many species are present. What it can't do is let arrival depend on which species, and the toy above only shows the direction of that effect, not its size in any real community. The simple label may well be close enough for many questions.

If isolation is only a label, it can only be correlated with outcomes. If it's a rate that interacts with the community, it can go into a model and be varied, and the model's predictions can be set against real islands.
