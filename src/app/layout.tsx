import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashapura ERP - Real Estate Management",
  description: "End-to-End Real Estate ERP & CRM",
};

import { ProjectProvider } from "@/context/ProjectContext";
import { BottomNav } from "@/components/layout/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 flex h-screen overflow-hidden`}>
        <ProjectProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-2.5 sm:p-4 md:p-6 pb-20 md:pb-6">
              {children}
            </main>
            <BottomNav />
          </div>
        </ProjectProvider>
      </body>
    </html>
  );
}
