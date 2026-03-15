export interface Artist {
  name: string;
  slug: string;
  role: string;
  since: string;
  medium: string;
  specialty: string[];
  bio: string;
  quote: string;
  emoji: string;
  bg: string;
  order: number;
}

export const artists: Artist[] = [
  {
    name: "Christine Mukamana",
    slug: "christine-mukamana",
    role: "Lead Artist & Co-founder",
    since: "2020",
    medium: "Graphite · Charcoal",
    specialty: ["Mountain Gorilla", "Golden Monkey", "Crowned Crane"],
    bio: "Christine grew up walking the forest edges of Musanze, memorising the sounds of the Virunga before she ever held a pencil. Self-taught, she developed a hyper-realist graphite style that captures not just anatomy but the emotional weight of wild animals at rest. Her gorilla portraits have been exhibited in Kigali and featured in conservation publications across East Africa.",
    quote: "We don't draw from photographs. We draw from what we see at dawn.",
    emoji: "🦍",
    bg: "#1C2A1E",
    order: 0,
  },
  {
    name: "Josue Habimana",
    slug: "josue-habimana",
    role: "Wildlife Illustrator",
    since: "2021",
    medium: "Ink · Watercolour",
    specialty: ["African Elephant", "Buffalo", "Hippopotamus"],
    bio: "Josue spent three years working as a field guide in Akagera National Park before returning to Musanze to paint. That time in the park transformed his understanding of animal movement — he draws elephants from memory, capturing the exact tilt of a head as a matriarch assesses the horizon. His ink wash technique has become the studio's most requested style among collectors.",
    quote: "I draw from memory and love — both are infinite.",
    emoji: "🐘",
    bg: "#2A1E10",
    order: 1,
  },
  {
    name: "Rigobert Nzeyimana",
    slug: "rigobert-nzeyimana",
    role: "Texture Specialist",
    since: "2022",
    medium: "Charcoal · Mixed Media",
    specialty: ["Lion", "Leopard", "African Eagle"],
    bio: "Rigobert came to SAWA through the Conservation programme, arriving with a sketchbook full of big-cat studies and a fearless approach to scale. His large-format charcoal works — some exceeding 150×200cm — are studies in texture: the grain of a lion's mane rendered hair by hair, the rosettes of a leopard so precise they read as scientific illustration.",
    quote: "Every texture is a story the animal already knows.",
    emoji: "🦁",
    bg: "#1A1810",
    order: 2,
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}
