"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Live", href: "/live" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Teams", href: "/teams" },
    { name: "Matches", href: "/matches" },
    { name: "Players", href: "/players" },
    { name: "Upcoming", href: "/upcoming" },
    { name: "Results", href: "/results" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          CricNova AI
        </Link>

        <div className="hidden gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition ${
                  isActive
                    ? "font-semibold text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}