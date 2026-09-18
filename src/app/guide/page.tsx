"use client";

import Link from "next/link";
import { 
  Building2, 
  Grid, 
  Users, 
  FileText, 
  Wallet, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Handshake, 
  Calculator, 
  PhoneCall, 
  Printer, 
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";

export default function GuidePage() {
  const modules = [
    {
      id: "dashboard",
      title: "1. Super Admin Executive Dashboard",
      route: "/",
      badge: "C-Suite & Founder Control",
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-200",
      summary: "High-level command center giving promoters and executive management real-time visibility across the company's entire 27-site portfolio in Mumbai and Palghar.",
      features: [
        "Portfolio Overview: Tracks 8 ongoing towers, 13 upcoming society redevelopments, and 6 completed developments (e.g. Ronak Villa, Jay Gagan).",
        "Interactive Charts: Powered by Recharts, visualizing monthly milestone cash flows (₹2.62 Cr peak) and weekly lead conversion ratios.",
        "Operational Audit Stream: Real-time logging of construction milestones, tenant hardship rent disbursements, and booking token clearances.",
        "Head Office Synchronization: Centralized control tied directly to the Malad West headquarters."
      ]
    },
    {
      id: "inventory",
      title: "2. Interactive Inventory Matrix & Society Tie-Ups",
      route: "/inventory",
      badge: "Core Architectural Matrix",
      icon: Grid,
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-200",
      summary: "A live, visual architectural grid mapping every unit across towers with specialized support for Society Redevelopment (CHSL) tenant quotas.",
      features: [
        "Society Rehab Allotment (Tie-Up): Dedicated purple badge isolating flats reserved for original society tenants under Permanent Alternate Accommodation Agreements (PAAA).",
        "Multi-Wing Navigation: Switch dynamically between Wing A, Wing B, or Phase towers with custom floor counts (up to 16 floors).",
        "Unit State Machine: Color-coded visual tags for Available (Free Sale), Token/Hold, Sold, Society Rehab, and Investor JV Share.",
        "Interactive Unit Inspection: Click any tile to inspect RERA carpet area, base rate, allottee names (e.g. Smt. Geeta Bhatt - Old Flat 901), and trigger instant token holds."
      ]
    },
    {
      id: "leads",
      title: "3. Lead CRM & Sales Velocity Pipeline",
      route: "/leads",
      badge: "Privyr-Inspired Automation",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200",
      summary: "High-velocity sales management software designed to replicate the instant-action workflow of Privyr, enabling agents to convert inquiries rapidly.",
      features: [
        "Omnichannel Lead Capture: Aggregates inquiries from Meta Ads (Facebook/Instagram), 99acres, MagicBricks, Website, and Walk-ins.",
        "1-Tap Communication: Direct WhatsApp and Telephony triggers for rapid first-touch outreach within seconds of inquiry.",
        "Pipeline Stages: Track prospects across 5 standardized stages: New → Contacted → Visit Planned → Negotiation → Booked.",
        "Project & Budget Filtering: Filter prospects by target development (e.g. Meghmala Crysta Malad vs Aloha Palghar) and budget brackets."
      ]
    },
    {
      id: "documents",
      title: "4. Dynamic Cost Sheet & MahaRERA Quotation Engine",
      route: "/documents",
      badge: "Instant A4 Printable Engine",
      icon: FileText,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-200",
      summary: "An automated real-time financial calculator and formal sales document generator that produces legally compliant quotations in seconds.",
      features: [
        "Official Ashapura Letterhead: Pre-formatted with corporate office credentials (101 Jay Gagan, Malad West), contact info, and active MahaRERA registration IDs.",
        "Automated Tax Computation: Computes Maharashtra Stamp Duty (6%), statutory Registration Fee (₹30,000 cap), and RERA GST (5%) in real time.",
        "Configurable Parameters: Adjust Carpet Area, Base Rate, Floor Rise charges, and Car Parking bays with instant recalculation.",
        "Construction-Linked Milestone Plan: Embeds standard 5-stage MahaRERA payment milestones (Booking, Agreement, Plinth, Slabs, Finishing)."
      ]
    },
    {
      id: "accounts",
      title: "5. Accounts Ledger, MahaRERA Demands & Society Rent",
      route: "/accounts",
      badge: "Dual-Inflow/Outflow Ledger",
      icon: Wallet,
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-200",
      summary: "Comprehensive financial ledger balancing construction milestone demand notices against society redevelopment transit rent obligations.",
      features: [
        "Milestone Demand Generation: Dispatches payment requests directly linked to civil milestones (e.g. 3rd Slab Casting, Plinth Completion).",
        "Society Redevelopment Outflows: Tracks and disburses monthly transit rent and displacement hardship allowances to CHSL society members.",
        "Escrow Status Tracking: Classifies demands into Paid, Pending, and Overdue with aging analysis under MahaRERA rules.",
        "Automated Dispatch Simulator: Simulates delivering official demand letters with bank escrow payment links via WhatsApp and Email."
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 flex items-center">
              <Cpu className="w-3.5 h-3.5 mr-1.5" />
              Software Architecture & Working Guide
            </span>
            <span className="text-slate-400 text-xs">• Enterprise Release 2.4</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            Ashapura Builders ERP & CRM Platform
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            This executive guide details how each component of the software functions. The application is built specifically around the real business model of Ashapura Builders—balancing outright residential sales with large-scale Co-operative Housing Society (CHSL) redevelopments and suburban townships.
          </p>
        </div>

        {/* Floating Metrics Badge */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MahaRERA Architecture Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Multi-Project Global Context</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Handshake className="w-4 h-4 text-purple-400" />
            <span>Society Redevelopment Tie-Up Mode</span>
          </div>
        </div>
      </div>

      {/* Global Context Architecture Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-6 shadow-xs">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-xs shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Global Project Switcher Architecture (Top Navigation Bar)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              Unlike single-building software, this ERP features a persistent <strong>Global Project Context Provider</strong>. Selecting a project from the top dropdown (such as <em>Amar CHSL</em>, <em>Meghmala Crysta</em>, or <em>Aloha Palghar</em>) dynamically reconfigures the entire application: the Inventory Matrix adjusts floor counts and wings, the Quotation engine updates base rates and RERA IDs, and the Accounts ledger isolates site-specific escrows.
            </p>
          </div>
        </div>
      </div>

      {/* Modules Detailed Breakdown */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          Comprehensive Module-by-Module Walkthrough
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {modules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl border ${mod.bg} ${mod.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{mod.title}</h3>
                      <span className="text-xs font-semibold text-slate-400">{mod.badge}</span>
                    </div>
                  </div>

                  <Link 
                    href={mod.route}
                    className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs w-max"
                  >
                    <span>Launch Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {mod.summary}
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    Core Functional Capabilities:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {mod.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack & Implementation Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center">
          <Zap className="w-4 h-4 text-amber-500 mr-2" />
          Technical Foundation & Performance Stack
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-slate-400 font-medium">Framework</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">Next.js 15 (App Router)</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-slate-400 font-medium">Bundler & Runtime</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">Turbopack Engine</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-slate-400 font-medium">Styling & Aesthetics</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">Tailwind CSS + Glassmorphism</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-slate-400 font-medium">Motion & Charts</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">Framer Motion & Recharts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
