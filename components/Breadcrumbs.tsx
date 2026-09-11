import Link from "next/link";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-bark/70">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span className="text-ink" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-moss hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
