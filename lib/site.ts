import { photo } from "@/lib/photo";

/**
 * Studio facts. Change these before the site is published.
 * The phone number below is a placeholder — replace it, or the
 * WhatsApp and call buttons will not reach the company.
 */
export const site = {
  name: "Plinth",
  legalName: "Plinth Construction Limited",
  title: "Plinth Construction",
  founded: 2008,
  years: 18,
  projectsDelivered: "140+",
  ncaCategory: "NCA 2",
  ncaClass: "Building works",
  email: "hello@plinth.co.ke",
  phoneDisplay: "+254 700 000 000",
  phoneTel: "+254700000000",
  whatsapp: "254700000000",
  street: "Studio 4, Muthithi Road",
  area: "Westlands, Nairobi",
  poBox: "P.O. Box 14820-00800, Nairobi",
  hours: [
    { days: "Monday to Friday", time: "8:00 – 17:00" },
    { days: "Saturday", time: "9:00 – 13:00" },
  ],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Muthithi+Road+Westlands+Nairobi",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://plinth.co.ke",
  description:
    "Plinth is an NCA 2 building contractor in Nairobi for houses, workplaces, industrial sheds, renovations and the roads and drains around them.",
  heroImage: photo("photo-1600585154340-be6161a56a0c", 2400),
  heroAlt:
    "A finished contemporary house with a pale facade, a deep overhang and a still pool, photographed in warm light.",
  ogImage: photo("photo-1600585154340-be6161a56a0c", 1200, 630),
};

export const counties = [
  {
    name: "Nairobi",
    slug: "nairobi",
    note: "Most of the work. Houses in Karen, Lavington, Runda and Muthaiga. Offices in Westlands and Upper Hill. Renewals in Kilimani and Kileleshwa.",
  },
  {
    name: "Kiambu",
    slug: "kiambu",
    note: "Estate roads, drains, and houses in Ruaka, Tigoni and beyond the Northern Bypass, where the plots are larger and the rains arrive on time.",
  },
  {
    name: "Kajiado",
    slug: "kajiado",
    note: "Ngong, Kitengela and the occasional site on the way into the hills. Markets, houses and the yards that serve them.",
  },
  {
    name: "Machakos",
    slug: "machakos",
    note: "Sheds and hardstanding at Athi River and Mlolongo, where a lorry has to turn and a floor has to stay dry.",
  },
  {
    name: "Murang'a",
    slug: "muranga",
    note: "Smaller buildings for families and institutions, taken when the crew can stay the week rather than commute it.",
  },
  {
    name: "Nakuru",
    slug: "nakuru",
    note: "Packhouses and farm buildings around Naivasha and the town. The harvest does not move its date for a late roof.",
  },
  {
    name: "Nyeri",
    slug: "nyeri",
    note: "A house or a school building, planned as a single trip with a foreman who stays until the snag list is short.",
  },
  {
    name: "Laikipia",
    slug: "laikipia",
    note: "Lodges and staff housing, set out around the rains and the long drive from Nairobi.",
  },
  {
    name: "Kisumu",
    slug: "kisumu",
    note: "A rarer trip. We take it when the programme is long enough to justify a crew by the lake.",
  },
  {
    name: "Uasin Gishu",
    slug: "uasin-gishu",
    note: "Sheds and a house or two in Eldoret. Plain buildings, priced properly, with someone on site who can decide.",
  },
  {
    name: "Mombasa",
    slug: "mombasa",
    note: "Coastal concrete. We price the salt, the cover to the steel and the distance before we price the paint.",
  },
  {
    name: "Kilifi",
    slug: "kilifi",
    note: "Houses set back from the beach road. We do not take cliff sites we cannot drain.",
  },
] as const;

export function whatsappUrl() {
  const text = `Hello ${site.name}, I would like to talk about a project.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function trustStats() {
  return [
    { value: site.ncaCategory, label: site.ncaClass },
    { value: String(site.years), label: "Years in business" },
    { value: site.projectsDelivered, label: "Projects delivered" },
    { value: String(counties.length), label: "Counties served" },
  ];
}
