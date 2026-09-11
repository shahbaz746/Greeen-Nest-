import Link from "next/link";
import { siteConfig } from "@/site.config";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="border-t border-bark/10 bg-moss-dark text-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
          <div>
            <p className="font-serif text-2xl font-semibold text-paper">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/80">
              {siteConfig.tagline}
            </p>
            <div className="mt-5 flex gap-4">
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.pinterest} label="Pinterest">
                <PinterestIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.facebook} label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.youtube} label="YouTube">
                <YoutubeIcon />
              </SocialLink>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-cream/60">
              Quick links
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-paper">Home</Link></li>
              <li><Link href="/blog" className="hover:text-paper">Blog</Link></li>
              <li><Link href="/about" className="hover:text-paper">About</Link></li>
              <li><Link href="/contact" className="hover:text-paper">Contact</Link></li>
              <li><Link href="/search" className="hover:text-paper">Search</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-cream/60">
              Categories
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-paper">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-cream/60">
              Stay in the loop
            </p>
            <p className="mt-4 text-sm text-cream/80">
              New posts, seasonal checklists, and a few things we're growing.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="dark" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-paper">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-paper">
              Terms of Service
            </Link>
            <a href="/rss.xml" className="hover:text-paper">
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-cream/70 hover:text-paper"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 17c1-4 1-6.5 1-6.5m0 0c0-2 1.5-3 3-3s2.5 1 2.5 2.8c0 2.2-1 4-2.8 4-1 0-1.5-.7-1.5-.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.5 20V12.5H15.5L15.8 10H13.5V8.5C13.5 7.8 13.8 7.2 15 7.2H16V4.9C15.6 4.85 14.8 4.8 14 4.8C12.2 4.8 11 5.9 11 8V10H9V12.5H11V20" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="currentColor" />
    </svg>
  );
}
