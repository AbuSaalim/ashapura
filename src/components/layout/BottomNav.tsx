"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Grid, 
  Users, 
  FileText, 
  Wallet
} from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const bottomNavItems = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Grid },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Quotes", href: "/documents", icon: FileText },
  { name: "Accounts", href: "/accounts", icon: Wallet },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden px-1.5 py-1 safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative min-w-[56px] text-center",
                isActive ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800 font-medium"
              )}
            >
              <div className="relative">
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className={clsx(
                    "p-1.5 rounded-xl transition-colors",
                    isActive ? "bg-blue-50 text-blue-600 shadow-xs" : "text-slate-500"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                {isActive && (
                  <motion.span 
                    layoutId="bottomNavDot"
                    className="absolute -top-0.5 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
