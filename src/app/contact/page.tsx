import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Cube Holdings Ltd. Call our hotline, message us on WhatsApp or visit our head office in Banani, Dhaka.",
};

const CHANNELS = [
  {
    label: "Hotline",
    value: site.hotline,
    href: `tel:${site.hotlineTel}`,
    note: "General enquiries",
  },
  {
    label: "Sales",
    value: site.sales,
    href: `tel:${site.sales}`,
    note: "Apartments and bookings",
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "We reply within a day",
  },
  {
    label: "WhatsApp",
    value: "Message us",
    href: `https://wa.me/${site.whatsapp}`,
    note: "Quickest for a site visit",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        image="/projects/benuka-1.jpeg"
        eyebrow="Get in touch"
        title="Let us talk about your next address."
        lead="Ask about a project, request a floor plan or arrange a site visit. We usually respond within 24 hours."
      />

      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:px-10">
        <Reveal>
          <h2 className="label">Send us a message</h2>
          <div className="mt-7">
            <EnquiryForm />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="label">Reach us directly</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="focus-ring card card-hover group border border-[var(--line)] p-6 hover:border-brand-400"
              >
                <p className="label">{c.label}</p>
                <p className="mt-3 text-[1.0625rem] transition-colors group-hover:text-brand-600">
                  {c.value}
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-[var(--muted)]">
                  {c.note}
                </p>
              </a>
            ))}
          </div>

          <div className="card mt-10 border border-[var(--line)] p-7">
            <h3 className="label">Head office</h3>
            <p className="display mt-4 text-[1.5rem]">{site.office.building}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              {site.office.line}
            </p>
            <a
              href={site.office.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring group mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-600"
            >
              Get directions
              <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="card mt-6 overflow-hidden border border-[var(--line)]">
            <iframe
              title="Map to Cube Holdings head office in Banani, Dhaka"
              src="https://www.google.com/maps?q=Banani%20Block%20D%20Road%2017%20Dhaka&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[280px] w-full grayscale-[0.35]"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
