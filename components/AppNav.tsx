"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useIsClient } from "@/lib/use-is-client";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "Chat with Ollie" },
];

export default function AppNav() {
  const pathname = usePathname();
  const isClient = useIsClient();

  return (
    <header className="sticky top-0 z-50 border-b border-aqua/20 bg-primary backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="sm" />

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const active = isClient && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  active
                    ? "bg-aqua/15 text-aqua ring-1 ring-aqua/40"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
