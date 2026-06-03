import type { NavLink, SocialLink as SocialLinkType } from "../../types";
import SocialLink from "./SocialLink";

type Props = {
  title: string;
  secondaryNavLinks?: NavLink[];
  socialLinks?: SocialLinkType[];
};

export default function Footer({ title, secondaryNavLinks, socialLinks }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 py-8 sm:px-8 sm:py-12">
      {secondaryNavLinks && secondaryNavLinks.length > 0 && (
        <nav
          className="mx-auto mb-6 flex w-full max-w-3xl flex-wrap justify-center gap-x-6 gap-y-1"
          aria-label="Footer navigation"
        >
          {secondaryNavLinks.map((link) => (
            <a
              key={link.href}
              className="text-slate-700 transition hover:text-slate-500"
              href={link.href}
            >
              {link.text}
            </a>
          ))}
        </nav>
      )}
      {socialLinks && socialLinks.length > 0 && (
        <div className="mx-auto mb-6 flex w-full max-w-3xl flex-wrap justify-center gap-x-4 gap-y-3">
          {socialLinks.map((link) => (
            <SocialLink
              key={link.href}
              {...link}
              className="bg-slate-50 text-slate-700 hover:bg-primary hover:text-white hover:shadow-button"
            />
          ))}
        </div>
      )}
      <p className="text-center text-xs uppercase tracking-wider text-slate-700">
        &copy; {currentYear}{" "}
        <a className="text-primary underline hover:no-underline" href="/">
          {title}
        </a>
      </p>
    </footer>
  );
}
