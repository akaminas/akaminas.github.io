---
title: The evolutionary consequences of isolation
question: How does restricted immigration change the ecological and evolutionary dynamics of a community?
summary: An eco-evolutionary modelling framework linking isolation, immigration, ecological interactions, diversification and extinction. PhD research at the University of Groningen.
domain: ecology-evolution
role: PhD researcher
period: 2025 – present
status: ongoing
methods:
  - Eco-evolutionary modelling
  - Stochastic simulation
  - Community assembly
  - Diversification and extinction dynamics
tools:
  - C++
  - R
  - Python
institutions:
  - University of Groningen — Theoretical Research in Evolutionary Life Sciences (TRÊS)
  - Etienne group (Theoretical and Evolutionary Community Ecology)
  - Van Doorn group (Evolutionary Systems Biology)
collaborators:
  - G. Sander van Doorn
  - Rampal S. Etienne
funding: EVOLVE fellowship (EU MSCA COFUND)
publications: []
talks:
  - nvtb-2026-isolation
links:
  - label: University of Groningen research profile
    url: https://research.rug.nl/en/persons/alexandros-kaminas/
motif: patches
featured: true
order: 1
---

## Question

Isolation is usually treated as a fixed property of a place: an island is remote, a habitat patch is fragmented. This project treats it instead as a dynamic quantity. Immigration can be rare or frequent, and its rate feeds back on the community that receives it. The central question is how the degree of isolation changes what emerges, what persists and what goes extinct in a community, and how evolution responds.

## System

Communities of interacting populations in spatially structured, fragmented environments, where the arrival of new lineages is limited by dispersal. The empirical motivation is the ecology and evolution of isolated systems such as islands and habitat fragments, but the framework is formulated generally.

## Model structure

The framework couples four processes that are usually studied separately:

- **immigration**, the rate at which new lineages arrive;
- **ecological interactions** among resident populations;
- **diversification**, the origin of new lineages in place;
- **extinction**, the loss of lineages.

Evolutionary change acts on the traits that govern these interactions, so ecological and evolutionary dynamics are coupled rather than separated by timescale. The models are stochastic and are studied by simulation, with C++ for the simulation engine and R and Python for analysis.

## Status

Ongoing doctoral research (started October 2025) in the Etienne and Van Doorn groups at TRÊS, University of Groningen, funded by an EVOLVE fellowship (EU MSCA COFUND). The framework was presented at the NVTB Annual Schoorl Meeting in June 2026. Nothing from this project has been peer reviewed yet.
