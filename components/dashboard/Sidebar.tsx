"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    {
      label: "Add Blog",
      href: "/dashboard/add",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
        </svg>
      ),
    },
    {
      label: "All Blogs",
      href: "/dashboard/all-blogs",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
          <path d="M9 12h6M9 16h4"/>
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`${open ? "w-56" : "w-16"} transition-all duration-300 bg-white border-r border-rose-100 flex flex-col py-8 px-3 shrink-0 min-h-screen`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 px-2 overflow-hidden">
        <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
          <span className="text-rose-600 text-xs font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            A
          </span>
        </div>
        {open && (
          <span className="text-black font-bold text-sm whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dashboard
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active ? "bg-rose-100 text-rose-500" : "text-gray-500 hover:bg-rose-50 hover:text-rose-400"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            >
              {item.icon}
              {open && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-rose-100 text-gray-400 hover:text-rose-400 hover:border-rose-300 transition-all mx-auto mt-4"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
        </svg>
      </button>
    </aside>
  );
}