import { useState } from "react";
import type { ProjectLink, ProjectType } from "../../types";

type Props = {
  title: string;
  category: ProjectType;
  organization?: string;
  bullets: string[];
  links?: ProjectLink[];
};

export default function ProjectCard({
  title,
  category,
  organization,
  bullets,
  links,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = bullets.length > 2;
  const visibleBullets = expanded ? bullets : bullets.slice(0, 2);

  return (
    <article className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h3>
          {organization && (
            <p className="mt-0.5 text-sm text-slate-500">{organization}</p>
          )}
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {category}
        </span>
      </div>

      <ul className="space-y-1.5 text-sm text-slate-700 sm:text-base">
        {visibleBullets.map((bullet, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        {links && links.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
              >
                {link.text}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        ) : (
          <span />
        )}

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-200"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </article>
  );
}
