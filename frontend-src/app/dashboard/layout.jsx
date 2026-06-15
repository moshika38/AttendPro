"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DashboardLayout({ children }) {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Attendance", href: "/dashboard/attendance" },
    { name: "Students", href: "/dashboard/students" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      <aside className="flex flex-col w-72 bg-slate-950 text-slate-100 shadow-2xl">
        <div className="px-6 py-8 border-b border-slate-800">
          <div className="inline-flex items-center gap-3 bg-slate-800/80 p-4 rounded-3xl shadow-inner">
            <div className="flex items-center justify-center w-14 h-14 rounded-3xl bg-amber-400 text-slate-950 font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-lg font-semibold">AttendPro</h1>
              <p className="text-sm text-slate-400">Attendance system</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-7">
          <nav>
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex items-center rounded-3xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-slate-100 text-slate-950 shadow-sm shadow-slate-900/10"
                          : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                      }`}
                    >
                      <span className="w-full">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mt-auto px-6 pb-8">
          <button className="w-full rounded-3xl bg-slate-800 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-700 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 xl:p-10">{children}</main>
    </div>
  );
}

export default DashboardLayout;
