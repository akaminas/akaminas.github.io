# Draft: Model section for "The evolutionary consequences of isolation"

Not part of the site. The build does not read this folder, so nothing here is
published or appears in any page source. The file holds slot labels only. Keep
model details out of it until the model is ready to publish: the repository
itself may be public.

To publish: fill every slot, go through the checks at the end, then paste the
section into src/content/projects/evolutionary-consequences-of-isolation.md
between "Model structure" and "Status". Do not publish it with an empty slot,
and do not drop a slot. Fill the slots only with what the project has produced;
nothing below is content.

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
included, needs a row in the table below. The site has no equation renderer yet:
until one is added, write each equation as MathML, or as a figure with a text
alternative.

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
- Check that the Status paragraph still says what is true.
