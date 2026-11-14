---
title: "Isolation is a rate, not a place"
date: 2027-02-23
summary: "Isolation is usually a fixed label on a place. Treating it as the rate at which new lineages arrive lets it feed back on the community that receives them, and that changes what can be asked."
draft: true
---

Islands are isolated, habitat fragments are isolated, and the usual way to treat this is as a property of the place: how far away it is, how big, how connected. That is a useful simplification. My doctoral project asks what changes if isolation is treated instead as a rate, because the rate may depend on the community that receives the arrivals.

## The classical picture

MacArthur and Wilson's 1967 theory of island biogeography has the number of species on an island settle where the rate of immigration, which falls as more species are already present, equals the rate of extinction, which rises. Distance from the mainland lowers immigration and area lowers extinction, so remote or small islands hold fewer species. The theory is simple and it has structured the field for decades.

In it, isolation is an input. It sets a rate, and the rate does not respond to what happens on the island.

## Why a rate that responds

Arrival is not uniform in what arrives. Whether a new lineage can establish depends on the residents it meets. Residents change by evolving and by going extinct, and these changes alter who can arrive next. Immigration can also bring new variation, which affects how residents adapt.

So the rate of arrival and the community are coupled. The central question becomes how the degree of isolation changes which lineages a community gains and loses, and how evolution responds.

## Four processes

The framework couples four processes that are often studied separately:

- **Immigration**, the rate at which new lineages arrive.
- **Ecological interactions** among the resident populations.
- **Diversification**, the origin of new lineages in place.
- **Extinction**, the loss of lineages.

Evolutionary change acts on the traits that govern the interactions. Ecology and evolution are then coupled directly, instead of being separated by a difference in timescale. The models are stochastic and are studied by simulation, with the simulation engine in C++ and analysis in R and Python.

## What the rate view allows

**A continuum.** At one end is a fully isolated community that only diversifies. At the other is a well-connected one that is mostly sorting arrivals. Between them is a range in which the two processes compete, and it is where much of the interest may lie.

**Identifying processes.** Strong competition and heavy immigration can leave similar marks on a community, as the earlier post on identifiability describes. A model that includes both can ask which statistics tell them apart.

**Timescales.** Arrival, ecological sorting and evolution each take their own time. The reading of a result depends on whether the process had time to act within the run, and a result should name the age at which a community is read.

## What I do not know yet

This is a framework under development. I presented it at the Annual Schoorl Meeting of the Netherlands Society for Theoretical Biology in June 2026, and nothing from the project has been through peer review. The aim of this post is to state the question and the reasoning for it.

The question is a general one. The motivation is the ecology and evolution of islands and habitat fragments, but the framework is formulated generally. It could apply wherever lineages, ideas, firms or people arrive from outside at a rate that depends on what is already there.

## Why it is worth the trouble

If isolation is only a label, it can only be correlated with outcomes. If it is a rate that interacts with the community, it can be put into a model, varied and tested, and the model's predictions can be compared with real islands. That is a better position to be in, even if the answer turns out to be that the label was close to enough.
