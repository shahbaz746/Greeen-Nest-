import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms-of-service" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Terms of Service", href: "/terms-of-service" }]}
      />

      <h1 className="font-serif text-4xl font-semibold text-ink">Terms of Service</h1>
      <p className="mt-3 text-sm text-bark/60">Last updated: September 10, 2026</p>

      <div className="prose prose-lg mt-10 max-w-none font-sans prose-headings:font-serif prose-headings:font-semibold">
        <p>
          This placeholder document outlines general terms for using{" "}
          {siteConfig.name}. Have it reviewed by counsel before treating it
          as a binding agreement.
        </p>

        <h2>Use of content</h2>
        <p>
          Articles, photos, and other content on this site are the property
          of {siteConfig.name} unless otherwise credited. You're welcome to
          link to our posts; republishing full articles elsewhere requires
          written permission.
        </p>

        <h2>No professional advice</h2>
        <p>
          Gardening, DIY, and home advice on this site is for general
          informational purposes and reflects our own experience — it isn't
          a substitute for professional guidance specific to your climate,
          soil, structure, or local building codes.
        </p>

        <h2>User conduct</h2>
        <p>
          If commenting or submitting content through this site, you agree
          not to post anything unlawful, abusive, or infringing on someone
          else's rights.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          {siteConfig.name} is provided "as is" without warranties of any
          kind. We aren't liable for damages arising from your use of the
          site or reliance on its content, to the fullest extent permitted
          by law.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          site after changes are posted means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          {siteConfig.contact.email}.
        </p>
      </div>
    </div>
  );
}
