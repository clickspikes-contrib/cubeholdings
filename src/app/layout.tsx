import type { Metadata } from "next";
import { Public_Sans, Hind_Siliguri } from "next/font/google";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { EnquiryWidget } from "@/components/enquiry-widget";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";
import "./globals.css";

// Public Sans — the face used by the Sneat template (and the US Web Design
// System it came from). Neutral grotesque, high legibility at small sizes.
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

// Bengali project names (তীরে, নিবিড়, …) need Bengali glyph coverage.
const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Since 2012, CubeSense Properties has built residential and commercial developments across Bashundhara, Uttara, Banani and Jolshiri Abashon — designed for comfort, built to last.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Residential and commercial developments across Dhaka's prime addresses. REHAB member since 2012.",
  },
  robots: { index: true, follow: true },
};

// Set theme before paint so there is no flash of the wrong palette.
const themeScript = `(function(){try{var t=localStorage.getItem('cube-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}document.documentElement.classList.add('js')})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The font variables belong on <html>, not <body>: Tailwind's @theme
  // declares --font-sans on :root, and custom properties only inherit
  // downward. Set on <body> they are invisible to :root, and the whole
  // stack silently falls back to the system font.
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${publicSans.variable} ${hind.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <CookieConsent />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <BackToTop />
        <EnquiryWidget />
        <Analytics />
      </body>
    </html>
  );
}
