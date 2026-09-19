"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { 
  Building2, TrendingUp, Users, Home, Activity, ArrowUpRight, ArrowDownRight, 
  MapPin, Handshake, ShieldCheck, CheckCircle2, ChevronRight 
} from "lucide-react";
import { motion } from "framer-motion";
import { useProject } from "@/context/ProjectContext";
import Link from "next/link";

const revenueData = [
  { name: "Jan", revenue: 8500000 },
  { name: "Feb", revenue: 11200000 },
  { name: "Mar", revenue: 9800000 },
  { name: "Apr", revenue: 14500000 },
  { name: "May", revenue: 19400000 },
  { name: "Jun", revenue: 26200000 },
  { name: "Jul", revenue: 22800000 },
];

const leadsData = [
  { name: "Week 1", generated: 65, converted: 18 },
  { name: "Week 2", generated: 82, converted: 24 },
  { name: "Week 3", generated: 58, converted: 16 },
  { name: "Week 4", generated: 95, converted: 31 },
];

export default function Dashboard() {
  const { projects, selectedProject, setSelectedProjectId } = useProject();

  const formatYAxis = (tickItem: number) => {
    if (tickItem === 0) return "0";
    return `₹${(tickItem / 100000).toFixed(0)}L`;
  };

  const statCards = [
    { 
      title: "Portfolio Projects", 
      value: "27 Sites", 
      subtext: "8 Ongoing • 13 Upcoming Redevelopments", 
      icon: Building2, 
      trend: "+4 JV Sites", 
      isPositive: true, 
      color: "text-blue-600", 
      bg: "bg-blue-50 border-blue-200" 
    },
    { 
      title: "Active Units Under Const.", 
      value: "450+ Units", 
      subtext: "Free Sale + Society Rehab Quota", 
      icon: Home, 
      trend: "+12% QoQ", 
      isPositive: true, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50 border-indigo-200" 
    },
    { 
      title: "Total Milestone Collections", 
      value: "₹18.42 Cr", 
      subtext: "YTD Collections Across Clusters", 
      icon: TrendingUp, 
      trend: "+16.8%", 
      isPositive: true, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50 border-emerald-200" 
    },
    { 
      title: "Active Inquiries & Visits", 
      value: "312 Leads", 
      subtext: "Goregaon, Malad & Palghar Desk", 
      icon: Users, 
      trend: "+22%", 
      isPositive: true, 
      color: "text-purple-600", 
      bg: "bg-purple-50 border-purple-200" 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-8 sm:pb-12 space-y-6 sm:space-y-8">
      {/* Top Banner: Real Ashapura Group Profile */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-400/30">
                Ashapura Builders ERP Master Console
              </span>
              <span className="text-slate-400 text-xs">• Mumbai & Palghar Division</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">Super Admin Executive Dashboard</h1>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl">
              Enterprise management covering Society Redevelopment Tie-ups (CHSL/SRA), Free-Sale High Rises, Suburban Townships & Investor Portfolios.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs bg-white/10 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Central Operations Malad HO</p>
              <p className="text-slate-300 text-[11px]">101 Jay Gagan, Liberty Garden</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {statCards.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.title} 
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 sm:p-2.5 rounded-xl border ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend}
                {stat.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 ml-0.5" />}
              </div>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mb-0.5">{stat.value}</p>
              <p className="text-slate-700 font-semibold text-xs">{stat.title}</p>
              <p className="text-slate-400 text-[11px] mt-1">{stat.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Active Projects Quick Selector Grid */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Ashapura Builders Active Sites & Tie-Ups</h2>
            <p className="text-xs text-slate-500">Switch project to inspect dedicated inventory matrix, society rehab allotments and cost sheets</p>
          </div>
          <Link href="/inventory" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center shrink-0">
            Open Full Matrix <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProject.id;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected 
                    ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs" 
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      proj.status === "COMPLETED" ? "bg-emerald-500" : "bg-blue-600 animate-pulse"
                    }`} />
                    <span className="font-bold text-sm text-slate-800">{proj.name}</span>
                  </div>
                  {proj.isRedevelopment && (
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                      <Handshake className="w-3 h-3 mr-1" />
                      CHSL
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 flex items-center mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
                  {proj.location}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                  <div>
                    <span className="text-slate-400">Floors & Wings:</span>
                    <p className="font-semibold text-slate-700">{proj.totalFloors} Floors ({proj.wings.join(", ")})</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Base Price:</span>
                    <p className="font-semibold text-blue-600">₹{proj.baseRate.toLocaleString('en-IN')}/sqft</p>
                  </div>
                </div>

                {proj.isRedevelopment && (
                  <div className="mt-2.5 bg-purple-50/80 text-purple-800 text-[11px] p-2 rounded-lg border border-purple-200/50 flex items-center justify-between">
                    <span>Rehab Members: {proj.rehabFlatsCount}</span>
                    <span className="font-bold">Free Sale: {proj.saleableFlatsCount}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Area Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs"
        >
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800">Portfolio Revenue Collections</h2>
              <p className="text-xs text-slate-500">MahaRERA milestone receipts across Goregaon, Malad & Palghar</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200 w-max">
              ₹2.62 Cr Peak / Month
            </span>
          </div>
          <div className="h-[230px] sm:h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={8} />
                <YAxis tickFormatter={formatYAxis} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  formatter={(value: any) => [`₹${(Number(value || 0) / 100000).toFixed(2)} Lacs`, "Revenue"]}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Leads Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs"
        >
          <div className="mb-4 sm:mb-6">
            <h2 className="text-sm sm:text-base font-bold text-slate-800">Sales Velocity (4 Weeks)</h2>
            <p className="text-xs text-slate-500">Inquiries vs Site Visits Converted</p>
          </div>
          <div className="h-[230px] sm:h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="generated" name="Generated" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="converted" name="Converted" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Log with Redevelopment Events */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-slate-800">Recent Operational Triggers & Audit Log</h2>
          <span className="text-xs text-slate-400 font-medium">Real-time Automated Stream</span>
        </div>
        <div className="space-y-4">
          {[
            { 
              project: "Amar CHSL",
              action: "Society Hardship Rent Disbursed", 
              detail: "Q2 Transit Accommodation Allowance disbursed to 20 registered society members", 
              time: "1 hour ago", 
              color: "text-purple-600", 
              bg: "bg-purple-100" 
            },
            { 
              project: "Meghmala Crysta",
              action: "3rd Slab MahaRERA Demand Dispatched", 
              detail: "Sent via WhatsApp & Email to 14 buyers of Wing A & B (₹1.25 Cr aggregate)", 
              time: "3 hours ago", 
              color: "text-blue-600", 
              bg: "bg-blue-100" 
            },
            { 
              project: "Navkar Heritage",
              action: "Token Amount Cleared", 
              detail: "₹5,00,000 NEFT received for Flat 702 (2BHK) from Sneha Sharma", 
              time: "5 hours ago", 
              color: "text-emerald-600", 
              bg: "bg-emerald-100" 
            },
            { 
              project: "Aloha Palghar",
              action: "Phase 1 Agreement Registered", 
              detail: "Registration confirmed under MahaRERA ID P9900046448", 
              time: "Yesterday", 
              color: "text-amber-600", 
              bg: "bg-amber-100" 
            },
          ].map((log, i) => (
            <div key={i} className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-3 h-3 mt-1.5 rounded-full ${log.bg} ring-4 ring-slate-100 shrink-0`} />
              <div className="ml-4 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {log.project}
                  </span>
                  <p className="font-semibold text-slate-800 text-sm">{log.action}</p>
                </div>
                <p className="text-slate-500 text-xs mt-1">{log.detail}</p>
              </div>
              <div className="text-[11px] font-medium text-slate-400 whitespace-nowrap ml-4">
                {log.time}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
