import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${siteConfig.name}`,
    description: `Get in touch with the ${siteConfig.name} team.`,
    url: `${siteConfig.domain}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />

      <h1 className="font-serif text-4xl font-semibold text-ink">Get in touch</h1>
      <p className="mt-3 max-w-xl text-base text-bark/70">
        Questions, story ideas, or a photo of a plant you can't identify —
        send it over. We read everything, even if it takes a few days to
        reply.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />

        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink">Email</h2>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-1 block text-sm text-moss hover:text-moss-dark"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-ink">Address</h2>
            <p className="mt-1 text-sm text-bark/70">{siteConfig.contact.address}</p>
            <div className="mt-3 flex h-40 items-center justify-center rounded-sm border border-dashed border-bark/20 bg-cream/50 text-xs text-bark/40">
              Map placeholder
            </div>
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-ink">Follow along</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <a href={siteConfig.social.instagram} className="text-moss hover:text-moss-dark">
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.social.pinterest} className="text-moss hover:text-moss-dark">
                  Pinterest
                </a>
              </li>
              <li>
                <a href={siteConfig.social.facebook} className="text-moss hover:text-moss-dark">
                  Facebook
                </a>
              </li>
              <li>
                <a href={siteConfig.social.youtube} className="text-moss hover:text-moss-dark">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
