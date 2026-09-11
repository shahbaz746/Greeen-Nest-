import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/site.config";

const fraunces = localFont({
  src: "../public/fonts/fraunces-variable.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-fraunces",
  display: "swap",
});

const inter = localFont({
  src: "../public/fonts/inter-variable.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.domain,
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: siteConfig.analytics.googleSiteVerification,
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.domain}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-moss focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />

        {siteConfig.analytics.googleAnalyticsId &&
          !siteConfig.analytics.googleAnalyticsId.includes("XXXX") && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analytics.googleAnalyticsId}');
                `}
              </Script>
            </>
          )}
      </body>
    </html>
  );
}
