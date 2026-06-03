import { useState, useEffect } from "react";
import type { NavLink } from "../../types";

type Props = {
  title: string;
  navLinks: NavLink[];
  currentPath?: string;
  className?: string;
};

export default function Header({ title, navLinks, currentPath, className }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleSwap = () => setMenuOpen(false);
    document.addEventListener("astro:after-swap", handleSwap);
    return () => document.removeEventListener("astro:after-swap", handleSwap);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`flex items-center justify-between gap-6 px-4 py-4 sm:px-8 sm:py-6 ${className || ""}`}
    >
      <a className="text-xl font-bold sm:text-2xl" href="/">
        {title}
      </a>

      {/* Desktop nav — visible at md+ */}
      <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Primary navigation">
        {navLinks.map((link) => {
          const isActive = currentPath === link.href || currentPath === link.href.replace(/\/$/, "");
          return (
            <a
              key={link.href}
              href={link.href}
              className={`text-base font-bold tracking-wide transition duration-300 sm:text-lg ${
                isActive
                  ? "text-primary underline decoration-2 underline-offset-4"
                  : "text-slate-800 hover:text-primary hover:underline hover:decoration-2 hover:underline-offset-4"
              }`}
            >
              {link.text}
            </a>
          );
        })}
      </nav>

      {/* Mobile hamburger — visible below md */}
      <button
        className="relative z-50 inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md md:hidden"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 ${
            menuOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 ${
            menuOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile slide-in panel */}
      <nav
        className={`fixed right-0 top-0 z-40 flex h-full w-64 flex-col bg-white px-6 pb-8 pt-20 shadow-lg transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => {
          const isActive = currentPath === link.href || currentPath === link.href.replace(/\/$/, "");
          return (
            <a
              key={link.href}
              href={link.href}
              className={`border-b border-slate-100 py-3 text-lg font-semibold transition duration-300 ${
                isActive
                  ? "text-primary"
                  : "text-slate-700 hover:text-primary"
              }`}
            >
              {link.text}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
