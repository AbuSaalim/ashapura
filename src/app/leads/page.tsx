"use client";

import { useState } from "react";
import { mockLeads, Lead, mockProjects } from "@/lib/mockData";
import { useProject } from "@/context/ProjectContext";
import { clsx } from "clsx";
import { Plus, Search, Filter, Phone, MoreHorizontal, MessageCircle, Calendar, Building2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const statusColors: Record<Lead["status"], string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  CONTACTED: "bg-purple-50 text-purple-700 border-purple-200",
  VISIT_PLANNED: "bg-orange-50 text-orange-700 border-orange-200",
  NEGOTIATION: "bg-amber-50 text-amber-700 border-amber-200",
  BOOKED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  LOST: "bg-slate-50 text-slate-700 border-slate-200",
};

export default function LeadsPage() {
  const { selectedProject } = useProject();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Lead["status"] | "ALL">("ALL");
  const [projectFilter, setProjectFilter] = useState<string>("ALL");

  const filteredLeads = leads.filter(l => {
    const matchesTab = activeTab === "ALL" || l.status === activeTab;
    const matchesProject = projectFilter === "ALL" || l.preferredProject.toLowerCase().includes(projectFilter.toLowerCase());
    return matchesTab && matchesProject;
  });

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLead: Lead = {
      id: `L00${leads.length + 1}`,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      preferredProject: formData.get("project") as string,
      preferredConfig: formData.get("config") as string,
      budget: formData.get("budget") as string,
      source: formData.get("source") as string,
      status: "NEW",
      date: new Date().toISOString()
    };
    setLeads([newLead, ...leads]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto pb-8 sm:pb-12 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs max-w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Lead CRM & Sales Pipeline</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Centralized buyer inquiries across Mumbai & Palghar developments</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Ingest Walk-In / Ad Lead
        </button>
      </div>

      {/* Analytics / Stats quick view */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        {[
          { label: "Active Inquiries", value: leads.length, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
          { label: "Site Visits Scheduled", value: leads.filter(l => l.status === "VISIT_PLANNED").length, color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
          { label: "Price Negotiations", value: leads.filter(l => l.status === "NEGOTIATION").length, color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
          { label: "Converted / Booked", value: leads.filter(l => l.status === "BOOKED").length, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
        ].map((stat) => (
          <div key={stat.label} className={`p-3 sm:p-4 rounded-xl border ${stat.bg} flex flex-col justify-center shadow-xs`}>
            <p className="text-slate-600 font-semibold text-[11px] sm:text-xs mb-0.5">{stat.label}</p>
            <p className={clsx("text-xl sm:text-2xl font-black", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        {/* Filter Controls Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          {/* Stage Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
            {["ALL", "NEW", "CONTACTED", "VISIT_PLANNED", "NEGOTIATION", "BOOKED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0",
                  activeTab === tab 
                    ? "bg-slate-900 text-white shadow-xs" 
                    : "text-slate-600 hover:bg-slate-200/70"
                )}
              >
                {tab.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Project Filter Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-start">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Site:</span>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-2.5 sm:px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-blue-500 bg-white flex-1 md:flex-initial"
            >
              <option value="ALL">All Projects (Mumbai & Palghar)</option>
              {mockProjects.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider font-bold">
                <th className="py-3 px-4 sm:px-6">Prospect Name</th>
                <th className="py-3 px-4 sm:px-6">Pipeline Stage</th>
                <th className="py-3 px-4 sm:px-6">Target Project & Config</th>
                <th className="py-3 px-4 sm:px-6">Budget</th>
                <th className="py-3 px-4 sm:px-6">Source</th>
                <th className="py-3 px-4 sm:px-6 text-right">Instant CRM Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mr-3 shrink-0">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{lead.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <span className={clsx(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      statusColors[lead.status]
                    )}>
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <p className="font-semibold text-slate-800 flex items-center">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 mr-1 shrink-0" />
                      {lead.preferredProject}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{lead.preferredConfig} Layout</p>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {lead.budget}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <span className="text-[11px] text-slate-600">
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => alert(`Opening WhatsApp Chat with ${lead.name} (${lead.phone}) for ${lead.preferredProject}...`)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 flex items-center space-x-1 font-semibold text-[11px] transition-colors"
                        title="Instant WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                      <button 
                        onClick={() => alert(`Dialing ${lead.phone} via Ashapura Malad HO PBX system...`)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                        title="Call"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No leads found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
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
                <h2 className="text-sm sm:text-base font-bold text-slate-800">Add New Walk-In / Online Lead</h2>
                <p className="text-xs text-slate-500">Directly register inquiry for Ashapura Builders projects</p>
              </div>
              <form onSubmit={handleAddLead} className="space-y-3 sm:space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Prospect Name</label>
                  <input required name="name" type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. Jayesh Shah" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input required name="phone" type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="+91 98200 12345" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Interested Project</label>
                  <select name="project" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                    {mockProjects.map(p => (
                      <option key={p.id} value={`${p.name} (${p.location})`}>{p.name} - {p.location}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Requirement</label>
                    <select name="config" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Budget</label>
                    <select name="budget" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="Under 50 Lacs">Under 50 Lacs (Palghar)</option>
                      <option value="1.0 Cr - 1.5 Cr">1.0 Cr - 1.5 Cr</option>
                      <option value="1.5 Cr - 2.2 Cr">1.5 Cr - 2.2 Cr</option>
                      <option value="2.2 Cr+">2.2 Cr+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lead Source</label>
                  <select name="source" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="Walk-in (Malad HO)">Walk-in (Malad HO)</option>
                    <option value="Walk-in (Goregaon Site)">Walk-in (Goregaon Site)</option>
                    <option value="Meta Ads (Digital)">Meta Ads (Digital)</option>
                    <option value="Channel Partner (CP)">Channel Partner (CP)</option>
                    <option value="Website Direct">Website Direct</option>
                  </select>
                </div>
                <div className="pt-3 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-xs">
                    Save Prospect
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
