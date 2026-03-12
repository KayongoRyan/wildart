export interface Work {
  id: string;
  title: string;
  kw: string;
  artist: string;
  medium: string;
  price: number;
  animal: string;
  emoji: string;
  available: boolean;
  size: string;
  year: number;
  description: string;
}

export const works: Work[] = [
  {
    id: "1",
    title: "Amahoro",
    kw: "Amahoro",
    artist: "Christine Mukamana",
    medium: "Graphite",
    price: 480,
    animal: "Mountain Gorilla",
    emoji: "🦍",
    available: true,
    size: "50×70cm",
    year: 2024,
    description:
      "Amahoro — meaning 'peace' in Kinyarwanda — captures a silverback at rest, the weight of the forest around him held in a single exhaled breath. Christine built up this piece over four weeks using graduated graphite layering on 300gsm cotton paper.",
  },
  {
    id: "2",
    title: "Isoko",
    kw: "Isoko",
    artist: "Josue Habimana",
    medium: "Ink",
    price: 560,
    animal: "Elephant",
    emoji: "🐘",
    available: true,
    size: "60×80cm",
    year: 2024,
    description:
      "Isoko — 'source' or 'origin' — shows a matriarch elephant at a watering hole at first light. Josue's fluid ink technique captures the ripples and reflections with minimal line work, letting the white of the paper breathe.",
  },
  {
    id: "3",
    title: "Ubwoba",
    kw: "Ubwoba",
    artist: "Rigobert Nzeyimana",
    medium: "Charcoal",
    price: 620,
    animal: "Lion",
    emoji: "🦁",
    available: true,
    size: "70×90cm",
    year: 2024,
    description:
      "Ubwoba — 'awe' or 'reverence' — a lion pausing mid-stride, fully aware of being watched. Rigobert's charcoal work uses heavy blending and lifted highlights to give the mane a sculptural depth.",
  },
  {
    id: "4",
    title: "Igikara",
    kw: "Igikara",
    artist: "Rigobert Nzeyimana",
    medium: "Mixed Media",
    price: 440,
    animal: "Eagle",
    emoji: "🦅",
    available: true,
    size: "50×60cm",
    year: 2023,
    description:
      "Igikara — 'the wild' — a martial eagle mid-descent, wings folded in a stoop. Rigobert combined charcoal, graphite, and a wash of raw umber pigment to convey the speed and power of the strike.",
  },
  {
    id: "5",
    title: "Inyana",
    kw: "Inyana",
    artist: "Christine Mukamana",
    medium: "Charcoal",
    price: 320,
    animal: "Gorilla Juvenile",
    emoji: "🦍",
    available: true,
    size: "40×55cm",
    year: 2023,
    description:
      "Inyana — 'young one' — a juvenile gorilla peering through bamboo leaves, curiosity and caution perfectly balanced. One of Christine's most intimate studies, worked on a single afternoon in Volcanoes National Park.",
  },
  {
    id: "6",
    title: "Urukundo",
    kw: "Urukundo",
    artist: "Christine Mukamana",
    medium: "Graphite",
    price: 390,
    animal: "Mountain Gorilla",
    emoji: "🦍",
    available: false,
    size: "50×70cm",
    year: 2023,
    description:
      "Urukundo — 'love' — a mother gorilla cradling her infant. Sold to a private collector in 2024. A print edition is available in the shop if you'd like to own a version of this work.",
  },
  {
    id: "7",
    title: "Agaciro",
    kw: "Agaciro",
    artist: "Josue Habimana",
    medium: "Ink",
    price: 510,
    animal: "Elephant",
    emoji: "🐘",
    available: true,
    size: "60×75cm",
    year: 2024,
    description:
      "Agaciro — 'dignity' — a lone bull elephant standing at the edge of the savanna, tusks catching the last of the afternoon light. Josue rendered this entirely in undiluted sumi ink, the tones built through cross-hatching alone.",
  },
  {
    id: "8",
    title: "Intwari",
    kw: "Intwari",
    artist: "Rigobert Nzeyimana",
    medium: "Charcoal",
    price: 580,
    animal: "Leopard",
    emoji: "🐆",
    available: true,
    size: "60×80cm",
    year: 2024,
    description:
      "Intwari — 'the brave one' — a leopard resting in the fork of an acacia tree at dusk, its gaze level and unhurried. Rigobert used vine charcoal for the initial blocking and compressed charcoal for the deep shadows in the coat.",
  },
];

/** Featured works for hero (newest available, max 3) */
export function getFeaturedWorks(): Work[] {
  return works
    .filter((w) => w.available)
    .sort((a, b) => b.year - a.year || parseInt(b.id) - parseInt(a.id))
    .slice(0, 3);
}

/** Newest works (for New In section) */
export function getNewInWorks(limit = 4): Work[] {
  return [...works]
    .filter((w) => w.available)
    .sort((a, b) => b.year - a.year || parseInt(b.id) - parseInt(a.id))
    .slice(0, limit);
}
