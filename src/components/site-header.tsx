"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 40,
    () => false,
  );
  const pathname = usePathname();

  // Keying drawer state to the pathname closes it on navigation without an effect.
  const [menu, setMenu] = useState({ open: false, at: pathname });
  const open = menu.open && menu.at === pathname;
  const setOpen = (v: boolean | ((p: boolean) => boolean)) =>
    setMenu((m) => ({
      open: typeof v === "function" ? v(m.at === pathname && m.open) : v,
      at: pathname,
    }));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The homepage hero is a dark image, so the bar floats over it in white
  // until the user scrolls past it.
  const overHero = pathname === "/" && !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-xl"
          : "bg-transparent"
      } ${pathname === "/" ? "-mb-[76px]" : ""}`}
    >
      <div className="shell flex h-[76px] items-center gap-6">
        <Link
          href="/"
          aria-label="Cube Holdings Limited — home"
          className="focus-ring group shrink-0 rounded"
        >
          <Logo
            priority
            className={`h-10 w-auto transition-all group-hover:opacity-80 ${
              overHero ? "brightness-0 invert" : "dark-logo"
            }`}
          />
        </Link>

        {/* Centred nav pill */}
        <nav
          className={`mx-auto hidden items-center gap-1 rounded-full p-1.5 backdrop-blur-md lg:flex ${
            overHero ? "bg-white/12 ring-1 ring-white/20" : "bg-[var(--surface-2)]"
          }`}
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? overHero
                      ? "bg-white text-ink-900"
                      : "bg-[var(--surface)] text-brand-600 shadow-sm"
                    : overHero
                      ? "text-white/80 hover:text-white"
                      : "hover:text-brand-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <span className={overHero ? "text-white" : ""}>
            <ThemeToggle />
          </span>
          <Link
            href="/contact"
            className={`focus-ring hidden rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 sm:inline-flex ${
              overHero
                ? "bg-white text-ink-900"
                : "bg-ink-900 text-white dark:bg-brand-500"
            }`}
          >
            Enquire
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`focus-ring grid size-10 place-items-center rounded-full border lg:hidden ${
              overHero ? "border-white/30 text-white" : ""
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-[76px] bottom-0 z-40 bg-[var(--bg)] transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 pt-4">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`display border-b py-5 text-[1.75rem] transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-dark mt-8 justify-center">
            Enquire now
          </Link>
        </nav>
      </div>
    </header>
  );
}
