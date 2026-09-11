"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/site.config";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-bark/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-2xl font-semibold tracking-tight text-moss-dark"
        >
          <LeafMark />
          {siteConfig.name}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) =>
            link.name === "Blog" ? (
              <div
                key={link.href}
                className="relative flex items-center gap-1"
                ref={categoriesRef}
              >
                <Link
                  href={link.href}
                  className="text-[15px] text-ink hover:text-moss"
                >
                  {link.name}
                </Link>
                <button
                  type="button"
                  onClick={() => setCategoriesOpen((v) => !v)}
                  aria-expanded={categoriesOpen}
                  aria-label="Toggle categories menu"
                  className="text-ink/60 hover:text-moss"
                >
                  <ChevronIcon open={categoriesOpen} />
                </button>
                {categoriesOpen && (
                  <div className="absolute left-0 top-full mt-3 w-52 rounded-sm border border-bark/10 bg-paper py-2 shadow-[0_10px_30px_-15px_rgba(43,42,36,0.35)]">
                    {siteConfig.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-2 text-sm text-ink hover:bg-cream hover:text-moss-dark"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] text-ink hover:text-moss"
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
            aria-expanded={searchOpen}
            className="text-ink hover:text-moss"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="text-ink hover:text-moss md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-bark/10 bg-cream/60">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 sm:px-8"
            role="search"
          >
            <label htmlFor="site-search" className="sr-only">
              Search articles
            </label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for tomatoes, houseplants, DIY…"
              className="w-full rounded-sm border border-bark/20 bg-paper px-4 py-2 text-sm text-ink placeholder:text-bark/40 focus:border-moss focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-sm bg-moss px-4 py-2 text-sm font-medium text-paper hover:bg-moss-dark"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-bark/10 bg-paper px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-sm px-2 py-2.5 text-base text-ink hover:bg-cream"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-2 mt-4 px-2 text-xs font-medium uppercase tracking-wide text-bark/50">
            Categories
          </p>
          <ul className="flex flex-col gap-1">
            {siteConfig.categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="block rounded-sm px-2 py-2 text-sm text-ink hover:bg-cream"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function LeafMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M5 21C5 12 10 6 21 5C20 16 14 21 5 21Z"
        fill="#6E7F53"
      />
      <path d="M5 21C9 17 13 13 20 6" stroke="#F3EEE2" strokeWidth="1.2" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7H20M4 12H20M4 17H20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
