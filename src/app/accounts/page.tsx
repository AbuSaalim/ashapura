"use client";

import { useState } from "react";
import { mockDemands, Demand, mockProjects } from "@/lib/mockData";
import { useProject } from "@/context/ProjectContext";
import { clsx } from "clsx";
import { Wallet, AlertCircle, Send, CheckCircle, FileText, Plus, Bell, RefreshCcw, Handshake, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const statusStyles: Record<Demand["status"], { bg: string, text: string, border: string, icon: any }> = {
  PAID: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle },
  PENDING: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: RefreshCcw },
  OVERDUE: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", icon: AlertCircle },
};

export default function AccountsPage() {
  const { selectedProject } = useProject();
  const [demands, setDemands] = useState<Demand[]>(mockDemands);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Demand["status"] | "ALL">("ALL");
  const [projectFilter, setProjectFilter] = useState<string>("ALL");

  const filteredDemands = demands.filter(d => {
    const matchesTab = activeTab === "ALL" || d.status === activeTab;
    const matchesProject = projectFilter === "ALL" || d.projectId === projectFilter;
    return matchesTab && matchesProject;
  });

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const handleTriggerDemand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const demandType = formData.get("type") as Demand["type"];
    const newDemand: Demand = {
      id: `D00${demands.length + 1}`,
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      flatNo: formData.get("flatNo") as string,
      customerName: formData.get("customerName") as string,
      milestone: formData.get("milestone") as string,
      amount: Number(formData.get("amount")),
      dueDate: new Date(Date.now() + 86400000 * 15).toISOString(),
      type: demandType || "CUSTOMER_MILESTONE",
      status: "PENDING"
    };
    setDemands([newDemand, ...demands]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto pb-8 sm:pb-12 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs max-w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Accounts, MahaRERA Demands & Society Ledger</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Automated milestone collection notices and society redevelopment rent disbursals
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Trigger Demand / Rent Disbursal
        </button>
      </div>

      {/* Financial Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        <div className="bg-emerald-50/80 border border-emerald-200 p-4 sm:p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="font-bold text-emerald-800 text-xs uppercase tracking-wider">Total Milestone Inflow</h3>
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700"><Wallet className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-950">{formatPrice(18420000)}</p>
          <p className="text-xs text-emerald-700 mt-1 font-medium">Received across all active project escrows</p>
        </div>
        
        <div className="bg-amber-50/80 border border-amber-200 p-4 sm:p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="font-bold text-amber-800 text-xs uppercase tracking-wider">Pending Customer Demands</h3>
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700"><FileText className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-950">{formatPrice(4600000)}</p>
          <p className="text-xs text-amber-700 mt-1 font-medium">Construction linked notices due this month</p>
        </div>

        <div className="bg-purple-50/80 border border-purple-200 p-4 sm:p-5 rounded-2xl shadow-xs sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="font-bold text-purple-800 text-xs uppercase tracking-wider">Society Redevelopment Outflow</h3>
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700"><Handshake className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-950">{formatPrice(1800000)}</p>
          <p className="text-xs text-purple-700 mt-1 font-medium">Transit rent & hardship allowance to CHSL members</p>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Table Tabs & Filter */}
        <div className="p-3 sm:p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex space-x-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
            {["ALL", "PAID", "PENDING", "OVERDUE"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={clsx(
                  "px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0",
                  activeTab === tab 
                    ? "bg-slate-900 text-white shadow-xs" 
                    : "text-slate-600 hover:bg-slate-200/70"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-start">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Project:</span>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-2.5 sm:px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-blue-500 bg-white flex-1 md:flex-initial"
            >
              <option value="ALL">All Project Escrows</option>
              {mockProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold bg-slate-50/40">
                <th className="py-3.5 px-4 sm:px-6">Demand Notice ID</th>
                <th className="py-3.5 px-4 sm:px-6">Project & Unit</th>
                <th className="py-3.5 px-4 sm:px-6">Allottee / Payee</th>
                <th className="py-3.5 px-4 sm:px-6">Milestone Scope</th>
                <th className="py-3.5 px-4 sm:px-6">Amount (INR)</th>
                <th className="py-3.5 px-4 sm:px-6">Due Date</th>
                <th className="py-3.5 px-4 sm:px-6">Ledger Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Dispatch Notice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredDemands.map((demand) => {
                const style = statusStyles[demand.status];
                const StatusIcon = style.icon;
                return (
                  <tr key={demand.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-bold text-slate-800">
                      {demand.id}
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6">
                      <p className="font-bold text-slate-800 flex items-center">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 mr-1 shrink-0" />
                        {demand.projectName}
                      </p>
                      <span className="text-[11px] text-slate-500 font-semibold">{demand.flatNo}</span>
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6">
                      <p className="font-semibold text-slate-800">{demand.customerName}</p>
                      {demand.type === "SOCIETY_CORPUS" && (
                        <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-1.5 py-0.2 rounded mt-0.5 inline-block">
                          CHSL Hardship Allowance
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600">
                      {demand.milestone}
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-bold text-slate-900">
                      {formatPrice(demand.amount)}
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-500">
                      {format(new Date(demand.dueDate), 'dd MMM yyyy')}
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6">
                      <span className={clsx(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center w-max border",
                        style.bg, style.text, style.border
                      )}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {demand.status}
                      </span>
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-right">
                      <button 
                        onClick={() => alert(`Demand Letter dispatched for ${demand.id} (${demand.customerName}) via WhatsApp & Registered Email with Escrow payment link.`)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-bold transition-colors inline-flex items-center space-x-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Notice</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredDemands.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No demands recorded for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trigger Demand Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-3 sm:p-4 border-b border-slate-100 bg-slate-50/60 rounded-xl mb-4">
                <h2 className="text-sm sm:text-base font-bold text-slate-800">Trigger New Demand Notice</h2>
                <p className="text-xs text-slate-500">Dispatch construction milestone or society transit rent</p>
              </div>
              <form onSubmit={handleTriggerDemand} className="space-y-3 sm:space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Project</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={`${selectedProject.name} (${selectedProject.location})`} 
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg font-semibold text-slate-700 cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Notice Category</label>
                  <select name="type" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="CUSTOMER_MILESTONE">Customer Construction Slab Milestone</option>
                    <option value="SOCIETY_CORPUS">Society Member Transit Rent / Hardship Allowance</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Allottee / Society Payee</label>
                  <input required name="customerName" type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. Ramesh Joshi / Amar CHSL" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit Number / Wing</label>
                  <input required name="flatNo" type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. Tower 1-801 or All Rehab Allottees" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Milestone Description</label>
                  <input required name="milestone" type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. 5th Slab Casting (MahaRERA 45%)" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Demand Amount (₹)</label>
                  <input required name="amount" type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="1250000" />
                </div>
                <div className="pt-3 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-xs">
                    Dispatch Notice
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
