"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Grid, 
  Users, 
  FileText, 
  Wallet, 
  Settings,
  BookOpen,
  X
} from "lucide-react";
import { clsx } from "clsx";
import { useProject } from "@/context/ProjectContext";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inventory Matrix", href: "/inventory", icon: Grid },
  { name: "Lead CRM", href: "/leads", icon: Users },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Accounts & Demands", href: "/accounts", icon: Wallet },
  { name: "Software Guide", href: "/guide", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useProject();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Aside */}
      <aside 
        className={clsx(
          "bg-slate-900 text-slate-300 flex flex-col h-screen z-50 transition-transform duration-300 ease-in-out",
          // Desktop behavior
          "md:w-64 md:sticky md:top-0 md:translate-x-0 md:flex shrink-0",
          // Mobile drawer behavior
          "fixed inset-y-0 left-0 w-72 shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-wide">
            Ashapura <span className="text-blue-500">ERP</span>
          </h1>
          {/* Close button on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center px-3.5 py-2.5 rounded-xl transition-all font-medium text-sm group",
                  isActive 
                    ? "bg-blue-600 text-white shadow-sm font-semibold" 
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
                )}
              >
                <Icon className={clsx("w-5 h-5 mr-3 shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Settings */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              alert("Settings: Ashapura Group Corporate Configurations (Malad HO).");
            }}
            className="flex items-center w-full px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
          >
            <Settings className="w-5 h-5 mr-3 shrink-0" />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
