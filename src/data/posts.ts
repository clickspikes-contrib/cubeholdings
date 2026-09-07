export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingMinutes: number;
  body: string[];
}

/**
 * Editorial posts. Titles and dates mirror the published blog; bodies are
 * written for this site. Replace with a CMS fetch when one is available.
 */
export const posts: Post[] = [
  {
    slug: "best-areas-to-buy-an-apartment-in-dhaka-for-investment",
    title: "Which areas of Dhaka are worth buying in for investment?",
    date: "2026-08-31",
    category: "Investment",
    readingMinutes: 6,
    excerpt:
      "Rental yield, resale demand and infrastructure decide which Dhaka address holds its value. A look at where the fundamentals actually point.",
    body: [
      "Buying an apartment as an investment is a different exercise from buying one to live in. The question stops being whether you like the layout and becomes whether somebody else will want it in ten years, at a price higher than you paid.",
      "In Dhaka, three things drive that answer more than anything else: how the surrounding infrastructure is changing, how tightly supply is constrained, and who wants to rent there.",
      "Bashundhara R/A remains the clearest case. Planned plots, wide roads and a steady stream of families moving in have kept demand consistently ahead of new supply. The blocks closest to the main avenues carry a premium, but resale there is rarely difficult.",
      "Uttara has been reshaped by the metro. Proximity to a station has become a pricing factor in its own right, and plots within a short walk of one now behave differently from plots that are not. For rental demand, that walk matters more than the finish of the building.",
      "Banani is a smaller, older market where almost nothing new becomes available. Scarcity does the work: the supply of plots is effectively fixed, so values are supported by the simple fact that little new stock arrives.",
      "Jolshiri Abashon is the opposite bet — an early-stage planned development where you are buying the plan rather than the neighbourhood. The upside is real but slower, and it rewards patience rather than a quick exit.",
      "Whichever address you settle on, look past the brochure at the things that are hard to change later: road width at the front, the orientation of the unit, how many apartments share the building, and whether parking actually works. Those decide the resale conversation long after the paint has been chosen.",
    ],
  },
  {
    slug: "luxury-apartments-in-dhaka-a-guide-to-premium-urban-living",
    title: "Luxury apartments in Dhaka: a guide to premium urban living",
    date: "2026-08-30",
    category: "Guides",
    readingMinutes: 5,
    excerpt:
      "What actually separates a premium apartment from an expensive one — and the specifications worth checking before you sign.",
    body: [
      "The word luxury does a lot of unearned work in property marketing. In practice, the difference between a premium apartment and merely an expensive one comes down to specifics that are easy to verify and easy to skip.",
      "Start with light and air. A genuinely well-planned unit has cross-ventilation and windows on more than one side. No amount of imported fittings compensates for a flat that stays dark by lunchtime.",
      "Then look at usable floor area against the quoted size. Two apartments of identical square footage can differ enormously once corridors, ducts and unusable corners are subtracted. Ask what the carpet area is, not just the built-up figure.",
      "Structure matters more than surfaces. Ask about the grade of concrete and steel, the depth of the foundation and whether the design accounts for seismic load. These are the parts of a building nobody sees and nobody can change afterwards.",
      "Look hard at the shared parts. Lift capacity relative to the number of apartments, generator backup, water reserve, and how the parking actually circulates. A building with too few lifts for its unit count becomes an irritation you live with daily.",
      "Finally, consider density. A building with eight apartments on a five-katha plot lives very differently from one with sixteen. Fewer neighbours per floor means quieter corridors, less pressure on services, and a building that ages better.",
      "Premium, properly understood, is not a longer list of amenities. It is a set of decisions made early — about the plot, the plan and the structure — that cannot be retrofitted once the building is standing.",
    ],
  },
  {
    slug: "what-to-check-before-booking-an-apartment",
    title: "What to check before you book an apartment in Dhaka",
    date: "2026-08-23",
    category: "Guides",
    readingMinutes: 4,
    excerpt:
      "A practical checklist for buyers: approvals, land title, payment schedules and the questions worth asking on site.",
    body: [
      "Booking an apartment is usually the largest commitment a family makes. The checks that protect that commitment are not complicated, but they are easy to postpone until it is awkward to raise them.",
      "Begin with the approval. Ask to see the RAJUK-approved plan and confirm that the building under construction matches it — the floor count in particular. A building constructed beyond its approval is a problem that transfers to you.",
      "Verify the land title separately. Ask for the ownership documents and the joint-venture agreement between the developer and the landowner. A lawyer reading these for an afternoon is inexpensive insurance.",
      "Read the payment schedule against the construction schedule. Instalments should track real progress on site, not arbitrary calendar dates. If the two are unrelated, ask why.",
      "Visit the site more than once, ideally at different times of day. You will learn more about noise, light and traffic in two visits than in any brochure.",
      "Ask about handover in writing: what specification you are receiving, what happens if the schedule slips, and what after-sales service covers. A developer confident in their work will put this on paper without hesitation.",
      "Finally, go and look at something the developer has already completed and handed over. A finished building occupied by real families is the most honest sales material that exists.",
    ],
  },
];

export const bySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
