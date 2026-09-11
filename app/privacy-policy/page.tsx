import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy" }]}
      />

      <h1 className="font-serif text-4xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-3 text-sm text-bark/60">Last updated: September 10, 2026</p>

      <div className="prose prose-lg mt-10 max-w-none font-sans prose-headings:font-serif prose-headings:font-semibold">
        <p>
          This placeholder policy explains, in general terms, how {siteConfig.name}{" "}
          would handle information collected through this site. Replace it
          with a policy reviewed for your actual data practices and
          jurisdiction before launch.
        </p>

        <h2>Information we collect</h2>
        <p>
          If enabled, this site may collect information you provide
          directly, such as your name and email address when subscribing to
          the newsletter or submitting the contact form, along with basic
          usage data collected automatically through analytics tools like
          Google Analytics (page views, device type, and approximate
          location derived from IP address).
        </p>

        <h2>How we use information</h2>
        <p>
          Information collected is used to respond to inquiries, send
          newsletter emails to subscribers who opted in, and understand how
          visitors use the site so we can improve it. We do not sell
          personal information to third parties.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          This site may use cookies and similar technologies through Google
          Analytics to understand aggregate traffic patterns. You can
          disable cookies through your browser settings; doing so may affect
          some site functionality.
        </p>

        <h2>Third-party links</h2>
        <p>
          Posts may link to third-party sites, including retailers and other
          blogs. We aren't responsible for the privacy practices of sites we
          don't operate.
        </p>

        <h2>Your choices</h2>
        <p>
          You can unsubscribe from the newsletter at any time using the link
          included in every email. To request that we delete information
          you've submitted through the contact form, email{" "}
          {siteConfig.contact.email}.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          {siteConfig.contact.email}.
        </p>
      </div>
    </div>
  );
}
