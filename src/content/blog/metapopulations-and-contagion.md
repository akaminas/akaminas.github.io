---
title: "A species can vanish before its habitat does"
date: 2027-07-13
summary: "In a patch model, a species persists only if colonisation outpaces extinction. Destroying a fraction of patches can push it below that threshold, and an epidemic model has the same structure."
draft: true
---

A species that lives in patches, whether ponds, forest fragments or islands, persists only if empty patches are colonised as fast as occupied ones empty. That balance gives a threshold, and habitat loss can carry a species across it well before the habitat is gone.

## The model

Levins (1969) described a population as a set of patches, each occupied or empty. Let p be the fraction occupied. An occupied patch empties at rate e. An empty patch is colonised at a rate c times p, since the more patches are occupied, the more colonists there are. Then

dp/dt = c p (1 - p) - e p

and setting it to zero gives p* = 1 - e/c. This is positive only when c is larger than e. Below that, occupancy falls to zero from any start. The model assumes many identical patches, a colonist as likely to reach any one of them, and patches that go extinct independently.

## Destroying habitat

Suppose a fraction D of the patches is destroyed, so that colonists that land on them are lost. Then dp/dt = c p (1 - D - p) - e p, and the equilibrium is p* = 1 - D - e/c. The species persists only if c (1 - D) is larger than e, which is the same as saying D is smaller than 1 - e/c. The fraction of patches that can be destroyed before the species is lost equals the fraction it occupied to begin with. A species that occupies 20 per cent of the patches, which is c/e = 1.25, is lost once 20 per cent are destroyed, with 80 per cent of the habitat still standing.

![Equilibrium fraction of patches occupied against the ratio of colonisation to extinction. Two curves, for intact habitat and for 30 per cent of patches destroyed, leave zero at c/e = 1 and at a larger value. Dots from a simulation of 200 patches follow the curves, apart from some below them near the thresholds.](figure:metapopulations-and-contagion "The Levins equilibrium for intact habitat and with 30 per cent of the patches destroyed. Dots are time-averaged runs of a stochastic simulation with 200 patches. Near each threshold chance extinctions pull them below the curve.")

## The debt

The loss is not immediate. When c (1 - D) is only a little below e, occupancy declines slowly. Take c/e = 1.25 and destroy a quarter of the patches. In the deterministic model the occupied fraction falls from 0.20 to 0.01 only after about 25 patch lifetimes, a lifetime being 1/e. The species is doomed and still present. In a finite number of patches, chance can end the decline sooner.

This delay is called an extinction debt. Tilman and colleagues (1994) used a model of several competing species to show that extinctions after habitat destruction can come long after the destruction, and that the best competitors, which are the poorest colonisers, are among the first to go. Nee and May (1992) studied habitat destruction in the same kind of model. Counting the species that live in what remains of a habitat can therefore overstate how many it will keep.

## The same structure in epidemics

Read patches as people, occupied as infected, extinction as recovery and colonisation as infection. The SIS epidemic, in which people recover and can be infected again, is dI/dt = b I (1 - I) - g I, where b is the infection rate and g the recovery rate. Its endemic level is I* = 1 - g/b, positive only when b/g is larger than 1, which is the condition R0 > 1. Immunising a fraction D of the population, so that those people can no longer be infected, gives I* = 1 - D - g/b. The disease dies out once D exceeds 1 - g/b, which is 1 - 1/R0, the familiar herd immunity threshold. Destroying habitat for a species and immunising people against a pathogen are the same operation in this model.

## Limits

Real patches differ in size and isolation. Colonisation depends on distance, and habitat is rarely lost at random. People mix unevenly. The simulation has 200 patches, so near a threshold the species can disappear by chance when the deterministic equation says it should persist.

Occupancy is a number a survey can give. In this model, with habitat lost at random, it is also the fraction of the patches that the species cannot afford to lose.
