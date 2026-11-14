---
title: "Isolation is a rate, not a place"
date: 2027-02-23
summary: "Isolation is usually a fixed label on a place. Treating it as the rate at which new lineages arrive lets it feed back on the community that receives them, and that changes what can be asked."
draft: true
---

Islands are isolated, habitat fragments are isolated, and the usual way to treat this is as a property of the place: how far away it is, how big, how connected. That is a useful simplification. It is worth asking what changes if isolation is treated instead as a rate, because the rate may depend on the community that receives the arrivals.

## The classical picture

MacArthur and Wilson's 1967 theory of island biogeography has the number of species on an island settle where the rate of immigration, which falls as more species are already present, equals the rate of extinction, which rises. Distance from the mainland lowers immigration and a larger area lowers extinction, so remote or small islands hold fewer species. The theory is simple, and it has shaped island biogeography ever since.

The figure draws it with straight lines. The two islands have the same extinction curve. The far island has an immigration curve that starts lower, at 0.4 of the near island's rate, so the far island settles at 44 species and the near island at 67, out of a pool of 100.

![Immigration falls and extinction rises with the number of species on an island. A near island has a higher immigration line than a far island, the gap between them is marked isolation, and the near island settles at more species where its line crosses extinction.](figure:isolation-is-a-rate "The classical picture, with isolation drawn as the gap between two immigration curves. Straight lines and made-up rates.")

In it, isolation is an input. It sets the height of the immigration curve, and nothing on the island moves the curve except the number of species already there.

## Why a rate that responds

What arrives is not a random sample. Whether a new lineage can establish depends on the residents it meets. Residents change by evolving and by going extinct, and these changes alter who can arrive next. Immigration can also bring new variation, which affects how residents adapt.

So the rate of arrival and the community are coupled. The question becomes how the degree of isolation changes which lineages a community gains and loses, and how evolution responds.

## Four processes

A model of this could couple four processes that are often studied separately:

- Immigration, the rate at which new lineages arrive.
- Ecological interactions among the resident populations.
- Diversification, the origin of new lineages in place.
- Extinction, the loss of lineages.

Evolutionary change acts on the traits that govern the interactions, so ecology and evolution are coupled directly instead of being separated by a difference in timescale. Such models are stochastic and are usually studied by simulation.

## What the rate view allows

It gives a continuum. At one end is a fully isolated community that only diversifies. At the other is a well-connected one that is mostly sorting arrivals. Between them is a range in which the two processes compete, and much of the interest may lie there.

It also helps with identifying processes. Strong competition and heavy immigration can leave similar marks on a community, as the earlier post on identifiability describes. A model that includes both can ask which statistics tell them apart.

And it makes timescales explicit. Arrival, ecological sorting and evolution each take their own time. The reading of a result depends on whether the process had time to act within the run, so a result should name the age at which a community is read.

## What is not settled

This is a way of framing a question, not a result. The answer may well be that the simple label is close enough.

The question is a general one. The motivation is the ecology and evolution of islands and habitat fragments, but it could apply wherever lineages, ideas, firms or people arrive from outside at a rate that depends on what is already there.

If isolation is only a label, it can only be correlated with outcomes. If it is a rate that interacts with the community, it can be put into a model and varied, and the model's predictions can be compared with real islands.
