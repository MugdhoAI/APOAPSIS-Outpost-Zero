# NASA Data and Science Integration Plan

**Project:** Outpost Zero · **Team:** APOAPSIS  
**Purpose:** Make NASA data and research visible in the game, not merely list citations in a footer.

## 1. Non negotiable rule

Do not invent NASA measurements. Every number used in a game rule must be identified as either:

1. A value taken directly from a cited NASA data product.
2. A value calculated from a cited NASA data product, with the formula and inputs recorded.
3. A simplified gameplay assumption, clearly labelled as such.

Never describe the game's resource units, crew condition, shielding index, thresholds, power costs, or turn durations as real lunar engineering parameters.

## 2. Primary NASA data product: LOLA lunar polar illumination

**NASA product:** Lunar Polar Illumination, Planetary Geology, Geophysics and Geochemistry Laboratory (PGDA), NASA Goddard Space Flight Center.  
**Product page:** https://pgda.gsfc.nasa.gov/products/69  
**Instrument:** Lunar Orbiter Laser Altimeter (LOLA) aboard the Lunar Reconnaissance Orbiter (LRO).  
**Data access:** The product page links to NASA PDS nodes and average solar illumination, permanent shadow, Earth visibility, and sky visibility products. South polar products are available at multiple resolutions, including 65°S–90°S at 240 m/pixel and 85°S–90°S at 60 m/pixel.

### How the product informs Outpost Zero

The LOLA illumination maps show that solar access varies across the lunar polar landscape. NASA explains that the average solar illumination products are computed across an approximately 18.6-year lunar nutation cycle using hourly timesteps, and that some polar areas are permanently shadowed while a few locations receive near-continuous sunlight.

Use the product in one of these ways, in priority order:

1. **Preferred:** include a lightweight, properly credited south-polar illumination map or approved preview in the Mission Briefing / Science panel, then explain that site selection affects solar power availability.
2. If a geospatial workflow is available quickly, extract a small, documented sample or a representative site comparison from the official data. Record the exact file, band, coordinates, pixel values, scale/offset, projection, and calculation. Do not claim precision beyond the file metadata.
3. If the full raster is too large or time-consuming, use the NASA-hosted map preview as contextual visual evidence and link the original data product. Do not make up specific illumination percentages or derive game energy values from the image by eye.

**Important limitation:** the long-term average map is not a live forecast and does not model the exact five operational cycles in the game. It supports site context and explains why power planning matters. It must not be represented as a direct time-series forecast for the fictional mission.

**Citation:** Mazarico et al. (2011), *Illumination conditions of the lunar polar regions using LOLA topography*, Icarus 211, 1066–1081, DOI: https://doi.org/10.1016/j.icarus.2010.10.030. Cite this when using the LOLA illumination maps, as the PGDA page requests.

## 3. Radiation science: LRO CRaTER and NASA SRAG

**Supporting NASA dataset reference:** LRO CRaTER calibrated energy data, NASA Planetary Data System.  
**NASA Open Data catalogue record:** https://data.nasa.gov/dataset/lro-moon-crater-3-calibrated-energy-data-v1-0-d9e55  
**PDS bundle:** https://pds.nasa.gov/ds-view/pds/viewBundle.jsp?identifier=urn%3Anasa%3Apds%3Alro-crater&version=1.6  
**NASA radiation explanation:** https://srag.jsc.nasa.gov/spaceradiation/how/how.cfm

The current NASA Open Data catalogue record describes the dataset but reports no downloadable resource on that catalogue page. Use the PDS bundle as the archive entry point. Do not claim that a CRaTER data file was downloaded or parsed unless the file is actually obtained and inspected.

The CRaTER instrument measures charged-particle energy deposition and detector information relevant to the lunar radiation environment. Use it as a supporting source card to explain that radiation risk depends on the environment, location, and shielding. Parsing the archive or displaying raw observations is optional and should not delay the core game.

**Game mapping:** the Radiation Protection Index and Cycle 2 solar particle event are simplified educational mechanics. They do not calculate dose, predict an event, or reproduce CRaTER output. The shielding threshold and crew-condition effect are game assumptions.

## 4. Supporting NASA science sources

### Lunar surface power and infrastructure

- NASA Lunar Surface Technology: https://www.nasa.gov/lunar-surface-technology/
- NASA Moon Base Systems: https://www.nasa.gov/moonbase-systems/
- NASA lunar south pole environment: https://www.nasa.gov/reference/moonbase-environment/

Use these sources to explain why a lunar base needs reliable power generation, storage, distribution, thermal protection, and attention to the south polar environment. Any game power units remain abstract.

### Food production

- NASA Space Crops: https://science.nasa.gov/biological-physical/space-crops/
- NASA Growing Plants in Space: https://www.nasa.gov/exploration-research-and-technology/growing-plants-in-space/

Use these sources to explain controlled-environment crop production and why crops can contribute fresh food and potentially support broader life-support systems. Do not imply crops instantly produce food or that the simplified greenhouse action represents a real crop growth cycle.

### Life support and habitation

- NASA Deep Space Habitation Overview: https://www.nasa.gov/humans-in-space/deep-space-habitation-overview/
- NASA Lunar Surface Technology: https://www.nasa.gov/lunar-surface-technology/

Use these to explain air revitalization, water recovery, waste processing, environmental monitoring, and the relationship between life-support systems. The game must not claim to be a validated environmental control and life support model.

## 5. Minimum credible NASA data implementation

Complete this data workflow before adding optional features:

1. Open the LOLA lunar polar illumination product page.
2. Select the south polar average solar illumination product appropriate for a compact web asset. Prefer an existing lightweight NASA preview if available. Avoid downloading large rasters without a clear need.
3. Verify that the asset is actually hosted by NASA or the linked PDS node. Save the source URL and retrieval date.
4. Add the asset to `app/public/assets/` or the equivalent asset folder.
5. Add a small `NASA DATA` card or modal explaining what the data represents and its limitations.
6. Put the full citation and product URL in the project source registry and README.
7. Record how the data affects the project. The minimum accepted integration is the south polar site context and a power planning explanation, not a decorative image with no explanation.

If the data asset cannot be retrieved within 20 minutes, do not stall the game build. Keep the source card and a simple authored schematic labelled **illustrative**, then return to the data asset after the first playable version works. Never present an illustrative schematic as NASA data.

## 6. Data registry format

Create `app/src/data/sources.ts` or the equivalent. Each record should have:

```ts
type ScienceSource = {
  id: string;
  title: string;
  organization: string;
  url: string;
  category: "dataset" | "science-reference" | "mission-context";
  usedFor: string;
  claim: string;
  limitation: string;
  accessedOn: string;
};
```

Keep science notes beside the mechanic they explain. A source list hidden only on a separate credits page is not enough for a learning game.

## 7. Attribution and asset handling

For every external image, map, audio file, font, video clip, data file, or code dependency, record:
- Asset or dataset title.
- Creator / organization.
- Original URL.
- License or reuse statement.
- Retrieval date.
- Where it appears in the project.
- Any edits or transformations made.

NASA imagery is not automatically cleared of every third party restriction. Check each asset's source page and reuse terms. Do not use NASA insignia or suggest NASA endorsement.

## 8. Submission evidence

The project page and video must be able to answer:
- Which NASA data or science resources did you use?
- What did the team extract, visualize, calculate, or use for context?
- Which parts are measured facts and which parts are game assumptions?
- How did that information influence a player decision or the mission scenario?

A good answer is specific: identify the LOLA south polar illumination product, explain its long-term average nature, show how the outpost site and solar planning panel use it, and explain that the resource costs are tuned for gameplay rather than derived from the map.
