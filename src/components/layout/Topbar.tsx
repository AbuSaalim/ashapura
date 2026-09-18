"use client";

import { Bell, Search, Building2, ChevronDown, MapPin, ShieldCheck } from "lucide-react";
import { useProject } from "@/context/ProjectContext";
import { useState } from "react";

export function Topbar() {
  const { selectedProject, selectedProjectId, setSelectedProjectId, projects } = useProject();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20 shadow-xs">
      {/* Left: Active Project Selector */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 px-3.5 py-1.5 rounded-xl transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {selectedProject.name}
                </span>
                {selectedProject.isRedevelopment && (
                  <span className="bg-purple-100 text-purple-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-sm">
                    CHSL Tie-Up
                  </span>
                )}
              </div>
              <div className="flex items-center text-[11px] text-slate-500 space-x-1">
                <MapPin className="w-3 h-3 text-slate-400 inline" />
                <span>{selectedProject.location}</span>
                {selectedProject.reraId && (
                  <span className="text-slate-400">| RERA: {selectedProject.reraId}</span>
                )}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 ml-1 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Project Dropdown Menu */}
          {showDropdown && (
            <div className="absolute left-0 mt-2 w-84 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Switch Project Portfolio</span>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">6 Active</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setShowDropdown(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left flex items-start space-x-3 hover:bg-blue-50/60 transition-colors ${
                      proj.id === selectedProjectId ? 'bg-blue-50/80 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs mt-0.5 ${
                      proj.isRedevelopment ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 truncate">{proj.name}</span>
                        {proj.status === "COMPLETED" ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-semibold">Delivered</span>
                        ) : (
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-semibold">Ongoing</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{proj.location}</p>
                      {proj.isRedevelopment && (
                        <span className="inline-block mt-0.5 text-[10px] text-purple-600 font-medium">
                          🤝 Society Rehab: {proj.rehabFlatsCount} Flats Allotted
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex items-center w-72 bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search flats, leads, or society members..." 
            className="bg-transparent border-none outline-none w-full text-xs text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right Side: Office Badge, Notifications & Admin Info */}
      <div className="flex items-center space-x-3">
        {/* Head Office Tag */}
        <div className="hidden xl:flex items-center space-x-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>HO: 101 Jay Gagan, Malad (W)</span>
        </div>

        <button 
          onClick={() => alert("Notification: Amar CHSL 5th Slab reached. Ready to trigger 4 customer milestone demands.")}
          className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="flex items-center space-x-2.5 pl-3 border-l border-slate-200 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-xs">
            AB
          </div>
          <div className="hidden md:block text-left">
            <p className="font-semibold text-xs text-slate-800 leading-tight">Ashapura Super Admin</p>
            <p className="text-slate-400 text-[10px]">admin@ashapurabuilder.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
