import Icon from "./Icon";

type Props = {
  currentPage: number;
  lastPage: number;
  prevUrl?: string;
  nextUrl?: string;
};

export default function Pagination({ currentPage, lastPage, prevUrl, nextUrl }: Props) {
  return (
    <nav
      aria-label="Pagination"
      className="mx-auto my-12 max-w-3xl border-t border-slate-200 pt-12 sm:my-16 sm:pt-16"
    >
      <div className="relative px-12 text-center">
        {prevUrl && (
          <a
            className="absolute left-0 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-50 text-lg text-slate-700 transition duration-300 hover:bg-primary hover:text-white hover:shadow-button"
            href={prevUrl}
            aria-label={`Go to page ${currentPage - 1} of ${lastPage}`}
          >
            <Icon icon="arrow-left" className="h-5 w-5 fill-current" />
          </a>
        )}
        <span
          className="text-sm uppercase tracking-wider text-slate-500"
          aria-current="page"
        >
          Page {currentPage} of {lastPage}
        </span>
        {nextUrl && (
          <a
            className="absolute right-0 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-50 text-lg text-slate-700 transition duration-300 hover:bg-primary hover:text-white hover:shadow-button"
            href={nextUrl}
            aria-label={`Go to page ${currentPage + 1} of ${lastPage}`}
          >
            <Icon icon="arrow-right" className="h-5 w-5 fill-current" />
          </a>
        )}
      </div>
    </nav>
  );
}
