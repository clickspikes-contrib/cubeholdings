/**
 * Site-wide identity and contact details.
 *
 * NOTE — carried over from Cube Holdings and NOT yet updated for CubeSense:
 * the email, phone numbers, office address and social handles below still
 * point at the original business. They are left as-is deliberately: making
 * up contact details would put wrong information in front of real visitors.
 * Replace each value marked `verify` before this goes live.
 */
export const site = {
  name: "CubeSense Properties",
  short: "CubeSense",
  tagline: "A way of comfortable living",
  vision: "The Address of Your Dreams.",
  since: 2012,
  url: "https://www.cubesenseproperties.com", // verify
  email: "cubeholdingsltd@gmail.com", // verify
  hotline: "+8801841616104-11", // verify
  hotlineTel: "+8801841616104", // verify
  sales: "+8801841616116", // verify
  whatsapp: "8801841616116", // verify
  office: {
    // verify — building, address and map pin are the previous company's
    building: "Cube Maqbul Inventure",
    line: "Level 5, House 07, Road 17, Block D, Banani, Dhaka 1213, Bangladesh",
    maps: "https://maps.google.com/?q=Cube+Maqbul+Inventure+Banani+Dhaka",
  },
  // GA4 measurement ID. Not a secret — it is served to every visitor in the
  // page source — so it lives here rather than in a build-time env var.
  gaId: "G-GDVS7LBJ5B",
  social: {
    // verify — these accounts belong to the previous company
    facebook: "https://www.facebook.com/cubeholdingsltd",
    instagram: "https://www.instagram.com/cubeholdingsltd",
    youtube: "https://www.youtube.com/@cubeholdingsltd.3721",
    linkedin: "https://www.linkedin.com/company/cubeholdingsltd/",
  },
} as const;

// Kept short so the centred nav pill stays compact; the full route list
// lives in the footer.
export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Properties" },
  { href: "/contact", label: "Contact Us" },
] as const;
