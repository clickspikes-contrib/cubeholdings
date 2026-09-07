import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description:
    "Terms and conditions governing the use of the CubeSense Properties website and our services.",
};

const SECTIONS: { h: string; p?: string[]; list?: string[] }[] = [
  {
    h: "1. General information",
    p: [
      "CubeSense Properties is a real estate development company operating in Bangladesh, providing residential, commercial and investment-related real estate services.",
    ],
  },
  {
    h: "2. Acceptance of terms",
    p: [
      "By accessing this website or communicating with CubeSense Properties, you acknowledge that you have read, understood and agreed to these terms and conditions. If you do not agree, please refrain from using our services or website.",
    ],
  },
  {
    h: "3. Property information",
    p: [
      "All project details, brochures, floor plans, layouts, images, specifications, pricing and availability displayed on this website or in promotional materials are for informational purposes only.",
      "CubeSense Properties reserves the right to:",
    ],
    list: [
      "Modify project designs, layouts, specifications, pricing or features without prior notice.",
      "Correct any typographical, technical or pricing errors.",
      "Update project information at any time.",
    ],
  },
  {
    h: "4. Booking and payment",
    list: [
      "Apartment or property booking is subject to company approval and availability.",
      "Payments must be made according to the agreed payment schedule.",
      "Delayed payments may result in penalties, cancellation or additional charges as per company policy.",
      "Booking money is non-transferable unless approved by management.",
    ],
  },
  {
    h: "5. Cancellation and refund policy",
    list: [
      "Cancellation requests must be submitted in writing.",
      "Refunds, if applicable, will be processed according to the terms mentioned in the buyer agreement.",
      "Administrative and processing charges may be deducted from refundable amounts.",
    ],
  },
  {
    h: "6. Handover timeline",
    p: [
      "CubeSense Properties strives to complete projects within the estimated timeline. However, project completion and handover may be affected by:",
    ],
    list: [
      "Natural disasters",
      "Government policies",
      "Utility connection delays",
      "Labour shortages",
      "Unavoidable technical or legal issues",
    ],
  },
  {
    h: "7. Intellectual property",
    p: [
      "All website content including logos, designs, text, graphics, images, videos, brochures and branding materials are the intellectual property of CubeSense Properties and may not be copied, reproduced, distributed or used without written permission.",
    ],
  },
  {
    h: "8. Website usage",
    p: ["Users agree not to:"],
    list: [
      "Misuse the website",
      "Attempt unauthorised access",
      "Spread malicious software or harmful content",
      "Use website content for illegal purposes",
    ],
  },
  {
    h: "9. Third-party links",
    p: [
      "Our website may contain links to third-party websites for convenience. CubeSense Properties is not responsible for the content, policies or practices of external websites.",
    ],
  },
  {
    h: "10. Privacy",
    p: [
      "Any personal information shared with CubeSense Properties through forms, calls or email communication will be handled with reasonable confidentiality and used for business communication purposes only.",
    ],
  },
  {
    h: "11. Limitation of liability",
    p: ["CubeSense Properties shall not be responsible for:"],
    list: [
      "Indirect or incidental damages",
      "Website interruptions or technical issues",
      "Decisions made based on website information",
      "External service provider failures",
    ],
  },
  {
    h: "12. Governing law",
    p: [
      "These terms and conditions are governed by the laws of the People's Republic of Bangladesh. Any dispute shall be subject to the jurisdiction of the courts of Dhaka.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        image="/projects/proshanti-1.jpeg"
        eyebrow="Legal"
        title="Terms & conditions"
        lead="By accessing our website, services or projects, or engaging with our company in any manner, you agree to comply with and be bound by the following terms."
      />

      <article className="shell max-w-[760px] py-20">
        <div className="space-y-12">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="display text-[1.5rem] leading-tight">{s.h}</h2>
              {s.p?.map((para, i) => (
                <p
                  key={i}
                  className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--muted)]"
                >
                  {para}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((li) => (
                    <li
                      key={li}
                      className="flex gap-3 text-[1.0625rem] leading-relaxed text-[var(--muted)]"
                    >
                      <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-brand-500" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="rule my-14" />

        <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          Questions about these terms? Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-2 hover:text-brand-600"
          >
            {site.email}
          </a>{" "}
          or call {site.hotline}.
        </p>
      </article>
    </>
  );
}
