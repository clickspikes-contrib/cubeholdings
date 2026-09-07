export const site = {
  name: "Cube Holdings Ltd.",
  short: "Cube Holdings",
  tagline: "A way of comfortable living",
  vision: "The Address of Your Dreams.",
  since: 2012,
  url: "https://www.cubeholdingsltd.com",
  email: "cubeholdingsltd@gmail.com",
  hotline: "+8801841616104-11",
  hotlineTel: "+8801841616104",
  sales: "+8801841616116",
  whatsapp: "8801841616116",
  office: {
    building: "Cube Maqbul Inventure",
    line: "Level 5, House 07, Road 17, Block D, Banani, Dhaka 1213, Bangladesh",
    maps: "https://maps.google.com/?q=Cube+Maqbul+Inventure+Banani+Dhaka",
  },
  social: {
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
