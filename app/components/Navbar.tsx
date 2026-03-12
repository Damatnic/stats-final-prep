"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/study", label: "Study Guide" },
  { href: "/practice", label: "Practice" },
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/formulas", label: "Formulas" },
  { href: "/ai-tutor", label: "AI Tutor" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-[#3B82F6]">
            Stats Final Prep
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-[#3B82F6] text-white"
                    : "text-gray-300 hover:text-white hover:bg-[#1e293b]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <div className="relative group">
      <button className="p-2 text-gray-300 hover:text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="absolute right-0 top-full mt-2 w-48 bg-[#1e293b] rounded-lg shadow-xl border border-[#334155] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 text-sm ${
              pathname === item.href
                ? "bg-[#3B82F6] text-white"
                : "text-gray-300 hover:text-white hover:bg-[#334155]"
            } first:rounded-t-lg last:rounded-b-lg`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
