import { photo } from "@/lib/photo";
import type { Category } from "@/lib/types";

export const services: Array<{
  slug: string;
  title: Category;
  summary: string;
  body: string;
  typical: string[];
  image: string;
  imageAlt: string;
}> = [
  {
    slug: "residential",
    title: "Residential",
    summary: "Houses, and the occasional small court of them.",
    body: "New houses, extensions and courtyard homes. Most of them are in Nairobi — Karen, Lavington, Runda, Muthaiga — and in Kiambu, where a plot still has room to set the building back from the road. We build in concrete, stone and timber, and we would rather a house be calm than clever.",
    typical: [
      "New family houses",
      "Pairs and small courts of houses",
      "Extensions that match what is already there",
      "Gates, walls and the short drive",
    ],
    image: photo("photo-1600585154340-be6161a56a0c", 1600),
    imageAlt: "A finished pale house with a deep roof overhang and a pool in front.",
  },
  {
    slug: "commercial",
    title: "Commercial",
    summary: "Offices, clinics, schools and the ground floor people enter.",
    body: "Workplaces and rooms the public uses. We are used to sites where a neighbour, or the client, has to keep working. Deliveries are timed. The entrance that is already open stays open. The new building is allowed to be quiet about itself.",
    typical: [
      "Office buildings and annexes",
      "Clinics and school buildings",
      "Retail fitted into an existing shell",
      "Occupied sites, planned around the people staying",
    ],
    image: photo("photo-1486406146926-c627a92ad1ab", 1600),
    imageAlt: "A glass office tower seen from below against a clear sky.",
  },
  {
    slug: "industrial",
    title: "Industrial",
    summary: "Sheds, yards and the buildings a harvest has to pass through.",
    body: "A shed is a simple building until the floor, the drainage and the turning circle are wrong. We build the plain ones carefully: a dry roof, a slab that can take a forklift, a gatehouse that actually controls the gate.",
    typical: [
      "Steel sheds and warehouses",
      "Yards, gatehouses and hardstanding",
      "Packhouses, with the cold rooms coordinated",
      "A narrow office along the edge of the floor",
    ],
    image: photo("photo-1553413077-190dd305871c", 1600),
    imageAlt: "The long interior of a warehouse with racking and a high roof.",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    summary: "The road, the drain and the wall that make a site usable.",
    body: "Not highways. The pieces of ground around a building: an estate access road, a storm drain, a retaining wall where the plot has started to slip, a market approach that floods every April. Small civil works, done by a building contractor who stays to see the rains.",
    typical: [
      "Estate access roads",
      "Storm drains",
      "Retaining walls",
      "Small civic packages with a county or a developer",
    ],
    image: photo("photo-1515162816999-a0c47dc192f7", 1600),
    imageAlt: "A wide paved road curving through an open landscape.",
  },
  {
    slug: "renovation",
    title: "Renovation",
    summary: "Buildings that should stay, brought back to working order.",
    body: "Old houses and tired blocks. We would rather repair a building than cover it. If people are living there, the programme is written so that water comes back on in the evening. Stone is matched. New wings are asked not to win an argument with the old house.",
    typical: [
      "Stone and plaster houses",
      "Apartment blocks with residents in them",
      "New services inside old walls",
      "Façades brought back, not boarded over",
    ],
    image: photo("photo-1560185007-cde436f6a4d0", 1600),
    imageAlt: "A bright renovated living room with tall windows and pale timber floors.",
  },
];

export const process = [
  {
    title: "Walk the site",
    text: "We come and look. Bring the drawings if you have them. If you don't, a conversation and a boundary are enough to begin.",
  },
  {
    title: "Price what is included",
    text: "A measured survey, then a price and a programme. The price says what is in, and what is not. We would rather lose a job here than argue about it later.",
  },
  {
    title: "Build, and write weekly",
    text: "One foreman stays with the job. Every Friday you get a short note: what happened, what is next, and a photograph.",
  },
  {
    title: "Hand over",
    text: "A snag list, a defects period, and drawings that match what was built. We stay until the list is closed.",
  },
];

export const principles = [
  { title: "Say the true date", text: "If the rain moves a slab, you hear it the same day. The programme is a document, not a hope." },
  { title: "One foreman, one job", text: "The person who sets the building out is still there when the key is handed over." },
  { title: "Price it before we start", text: "Variations happen. They are written down. They are not a surprise at the end." },
  { title: "Leave the access tidy", text: "The street in front of the site is part of the work. Neighbours remember it." },
];

export const team = [
  {
    initials: "AO",
    name: "Amina Okello",
    role: "Managing Director",
    bio: "Started the company in 2008 after ten years as a site agent. She still walks a job before it is priced.",
  },
  {
    initials: "DK",
    name: "David Kamau",
    role: "Projects Director",
    bio: "Writes the programme and the Friday note. If a date moves, he is the one who calls.",
  },
  {
    initials: "WM",
    name: "Wanjiku Mwangi",
    role: "Design coordination",
    bio: "Sits between the architect and the foreman, so the drawing and the wall describe the same building.",
  },
  {
    initials: "JO",
    name: "James Otieno",
    role: "Site lead",
    bio: "Runs the Nairobi houses. The same crew, from setting out to the day the key changes hands.",
  },
  {
    initials: "FH",
    name: "Fatuma Hassan",
    role: "Commercial",
    bio: "Contracts, certificates and the conversation about money. She would rather a price is dull and correct.",
  },
  {
    initials: "PN",
    name: "Peter Njoroge",
    role: "Quantity surveyor",
    bio: "Measures the work, then measures it again when a wall is opened and the old house disagrees.",
  },
];

export const budgets = [
  "Under KES 5 million",
  "KES 5–20 million",
  "KES 20–50 million",
  "KES 50–150 million",
  "Over KES 150 million",
  "Not sure yet",
];

export const timelines = [
  "As soon as you can walk the site",
  "Within three months",
  "This year",
  "Next year",
  "Just asking",
];
