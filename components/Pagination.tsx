import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      <PageLink
        href={pageHref(currentPage - 1)}
        disabled={currentPage === 1}
        label="Previous"
      />
      <ul className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <Link
              href={pageHref(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                page === currentPage
                  ? "bg-moss text-paper"
                  : "text-ink hover:bg-cream"
              }`}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
      <PageLink
        href={pageHref(currentPage + 1)}
        disabled={currentPage === totalPages}
        label="Next"
      />
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  label,
}: {
  href: string;
  disabled: boolean;
  label: string;
}) {
  if (disabled) {
    return (
      <span className="cursor-not-allowed px-3 py-2 text-sm text-bark/30">
        {label}
      </span>
    );
  }
  return (
    <Link href={href} className="px-3 py-2 text-sm text-ink hover:text-moss">
      {label}
    </Link>
  );
}
