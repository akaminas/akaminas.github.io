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

Isolation is usually treated as a fixed property of a place: an island is remote, a habitat patch is fragmented. This project treats it instead as a dynamic quantity. Immigration can be rare or frequent, and its rate feeds back on the community that receives it. The central question is how the degree of isolation changes which lineages a community gains or loses, and how evolution responds.

## System

Communities of interacting populations in spatially structured, fragmented environments, where the arrival of new lineages is limited by dispersal. The empirical motivation is the ecology and evolution of isolated systems such as islands and habitat fragments, but the framework is formulated generally.

## Model structure

The framework couples four processes that are usually studied separately:

- **immigration**, the rate at which new lineages arrive;
- **ecological interactions** among resident populations;
- **diversification**, the origin of new lineages in place;
- **extinction**, the loss of lineages.

Evolutionary change acts on the traits that govern these interactions, so ecological and evolutionary dynamics are coupled rather than separated by timescale. The models are stochastic and are studied by simulation, with C++ for the simulation engine and R and Python for analysis.

<!--
==============================================================================
MODEL SECTION: SCAFFOLD ONLY, NOT PUBLISHED

This block is an HTML comment, so it is not rendered. To publish it: fill every
slot, go through the checks at the end, then delete the opening and closing
comment markers. Do not publish it with an empty slot, and do not drop a slot.
Fill the slots only with what the project has produced; nothing here is content.
==============================================================================

## Model

### Model class

SLOT: name the class of model, in one sentence.

### State variables and units

SLOT: one row per state variable.

| Symbol | Meaning | Units |
| - | - | - |
|  |  |  |

### The evolving trait

SLOT: what the trait is, what it controls (which rate or interaction), and its range.

### Rate equations

SLOT: every rate the simulation uses. Every symbol in an equation, parameters
included, needs a row in the table below. This site has no maths renderer, so
write each equation as MathML, or as a figure with a text alternative.

| Symbol | Meaning | Units | Value or range used |
| - | - | - | - |
|  |  |  |  |

### Schematic

SLOT: one schematic of the model. Save the file under public/images/.

<figure>
  <img src="SLOT: /images/....svg" alt="SLOT: text alternative" width="SLOT" height="SLOT" />
  <figcaption>SLOT: caption.</figcaption>
</figure>

### Preliminary result

SLOT: one figure from the model, labelled as preliminary.

<figure>
  <img src="SLOT: /images/....svg" alt="SLOT: text alternative" width="SLOT" height="SLOT" />
  <figcaption>Preliminary. SLOT: what is plotted, in what units, with which parameter values and how many replicates.</figcaption>
</figure>

Checks before publishing:

- Both figures follow Vellum (https://akaminas.github.io/vellum/index.html;
  tokens in style/vellum.json and style/vellum.css in the Vellum repository).
- Each figure has a text alternative, and colour is not the only carrier of meaning.
- The caption of the preliminary figure starts with the word "Preliminary".
- Add both figures to ASSET_PROVENANCE.md under original assets.
- Check that the Status paragraph below still says what is true.
==============================================================================
-->

## Status

Ongoing doctoral research (started October 2025) in the Etienne and Van Doorn groups at TRÊS, University of Groningen, funded by an EVOLVE fellowship (EU MSCA COFUND). The framework was presented at the NVTB Annual Schoorl Meeting in June 2026. Nothing from this project has been peer reviewed yet.
