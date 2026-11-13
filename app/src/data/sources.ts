// Source registry. Every science note in the game points at one of these
// records, and every record keeps its limitation beside its claim.

export type ScienceSource = {
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

const ACCESSED_ON = "2026-11-13";

export const SOURCES: ScienceSource[] = [
  {
    id: "lola-illumination",
    title: "Lunar Polar Illumination (LOLA) data products",
    organization: "NASA Goddard Space Flight Center, Planetary Geology, Geophysics and Geochemistry Laboratory",
    url: "https://pgda.gsfc.nasa.gov/products/69",
    category: "dataset",
    usedFor: "Site context in the mission briefing and the power planning note",
    claim:
      "LRO's Lunar Orbiter Laser Altimeter produced polar illumination maps. NASA describes the lunar poles as extreme: large areas sit in permanent shadow while a very few locations receive near continuous sunlight. The published maps are averages calculated across an 18.6 year lunar nutation cycle with roughly hourly time steps.",
    limitation:
      "The maps are long term averages. They are not a live solar forecast and do not model the five game cycles. This game does not derive its power units from the maps.",
    accessedOn: ACCESSED_ON,
  },
  {
    id: "mazarico-2011",
    title: "Illumination conditions of the lunar polar regions using LOLA topography",
    organization: "Mazarico et al., Icarus 211, 1066-1081",
    url: "https://doi.org/10.1016/j.icarus.2010.10.030",
    category: "science-reference",
    usedFor: "Required citation for the LOLA illumination maps",
    claim:
      "The 2011 study used 240 metre per pixel LOLA polar maps to compute illumination conditions across a full lunar nutation cycle. The NASA product page asks users to cite this reference when using the illumination maps.",
    limitation:
      "The paper is a scientific reference for the illumination work. It does not supply the game's resource values.",
    accessedOn: ACCESSED_ON,
  },
  {
    id: "crater",
    title: "LRO CRaTER calibrated energy data",
    organization: "NASA Planetary Data System / NASA Open Data",
    url: "https://pds.nasa.gov/ds-view/pds/viewBundle.jsp?identifier=urn%3Anasa%3Apds%3Alro-crater&version=1.6",
    category: "dataset",
    usedFor: "Radiation context note behind the Cycle 2 solar particle event",
    claim:
      "CRaTER measured charged particle energy deposition in lunar orbit to help characterise the lunar radiation environment and its biological effects.",
    limitation:
      "The team did not download or process the archive. No CRaTER measurement appears in the game. The event rule is a teaching simplification.",
    accessedOn: ACCESSED_ON,
  },
  {
    id: "srag",
    title: "How does space radiation affect the body?",
    organization: "NASA Space Radiation Analysis Group, Johnson Space Center",
    url: "https://srag.jsc.nasa.gov/spaceradiation/how/how.cfm",
    category: "science-reference",
    usedFor: "Why shielding matters before a solar particle event",
    claim:
      "Space radiation exposure depends on the environment, the time spent in it, and the shielding around the crew, so protection is planned as part of mission design rather than added afterwards.",
    limitation:
      "The game's Radiation Protection Index, its thresholds, and its crew condition losses are gameplay assumptions on a 0 to 100 scale, not dose modelling.",
    accessedOn: ACCESSED_ON,
  },
  {
    id: "moon-base-systems",
    title: "Moon Base Systems",
    organization: "NASA",
    url: "https://www.nasa.gov/moonbase-systems/",
    category: "mission-context",
    usedFor: "Why a south polar outpost needs a power plan and maintenance",
    claim:
      "A lunar base needs power generation, storage, and distribution working together, along with thermal control, communications, and life support.",
    limitation:
      "The game compresses an entire power architecture into one abstract reserve numbered 0 to 100.",
    accessedOn: ACCESSED_ON,
  },
  {
    id: "lunar-surface-technology",
    title: "Lunar Surface Technology",
    organization: "NASA",
    url: "https://www.nasa.gov/lunar-surface-technology/",
    category: "mission-context",
    usedFor: "Array maintenance and regolith based shielding context",
    claim:
      "NASA is developing surface power, dust mitigation, and construction technologies, including using local regolith, because equipment on the Moon has to keep working in a harsh environment.",
    limitation:
      "The dust penalty in Cycle 4 is a scripted game consequence. It is not a measured dust effect on a real array.",
    accessedOn: ACCESSED_ON,
  },
  {
    id: "deep-space-habitation",
    title: "Deep Space Habitation Overview",
    organization: "NASA",
    url: "https://www.nasa.gov/humans-in-space/deep-space-habitation-overview/",
    category: "mission-context",
    usedFor: "Water recovery and oxygen generation notes",
    claim:
      "Long duration habitats rely on linked life support systems: air revitalisation, water recovery, waste processing, and environmental monitoring all draw on each other.",
    limitation:
      "The recovery rates in this game are tuning values. They are not International Space Station performance figures and are not a validated life support model.",
    accessedOn: ACCESSED_ON,
  },
  {
    id: "space-crops",
    title: "Space Crops",
    organization: "NASA Science",
    url: "https://science.nasa.gov/biological-physical/space-crops/",
    category: "science-reference",
    usedFor: "The greenhouse action and the food production note",
    claim:
      "NASA studies growing plants in controlled environments in space. Crops can supply fresh food and may also contribute to life support systems such as air and water recycling.",
    limitation:
      "The greenhouse action is a compressed production cycle for teaching. It does not mean a real crop grows to harvest in one game cycle.",
    accessedOn: ACCESSED_ON,
  },
];

export function getSource(id: string): ScienceSource | undefined {
  return SOURCES.find((source) => source.id === id);
}
