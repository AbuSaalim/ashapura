"use client";

import { Bell, Search, Building2, ChevronDown, MapPin, ShieldCheck, Menu } from "lucide-react";
import { useProject } from "@/context/ProjectContext";
import { useState } from "react";

export function Topbar() {
  const { 
    selectedProject, 
    selectedProjectId, 
    setSelectedProjectId, 
    projects,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useProject();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-2 sm:px-6 sticky top-0 z-30 shadow-xs max-w-full">
      {/* Left: Mobile Hamburger & Active Project Selector */}
      <div className="flex items-center space-x-1 sm:space-x-3 min-w-0 flex-1 sm:flex-initial mr-1 sm:mr-0">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Project Selector */}
        <div className="relative min-w-0 flex-1 sm:flex-initial">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-1.5 sm:space-x-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 px-2 sm:px-3.5 py-1.5 rounded-xl transition-all text-left group max-w-[145px] xs:max-w-[210px] sm:max-w-xs md:max-w-none shadow-2xs"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1">
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight truncate block">
                  {selectedProject.name}
                </span>
                {selectedProject.isRedevelopment && (
                  <span className="hidden xs:inline-block bg-purple-100 text-purple-700 text-[9px] font-semibold px-1 py-0.2 rounded-sm shrink-0">
                    CHSL
                  </span>
                )}
              </div>
              <div className="hidden sm:flex items-center text-[10px] sm:text-[11px] text-slate-500 space-x-1 truncate">
                <MapPin className="w-3 h-3 text-slate-400 inline shrink-0" />
                <span className="truncate">{selectedProject.location}</span>
              </div>
            </div>
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-slate-400 ml-0.5 sm:ml-1 shrink-0 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Project Dropdown Menu */}
          {showDropdown && (
            <>
              {/* Backdrop to close dropdown on click outside */}
              <div 
                className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[1px]" 
                onClick={() => setShowDropdown(false)} 
              />
              <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-w-[calc(100vw-1rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Switch Building Portfolio</span>
                  <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{projects.length} Real Projects</span>
                </div>
                <div className="max-h-84 overflow-y-auto divide-y divide-slate-100">
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
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs mt-0.5 shrink-0 ${
                        proj.isRedevelopment ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-slate-800 truncate">{proj.name}</span>
                          {proj.status === "COMPLETED" ? (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-semibold shrink-0">Delivered</span>
                          ) : proj.status === "UPCOMING" ? (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.2 rounded font-semibold shrink-0">Upcoming</span>
                          ) : (
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-semibold shrink-0">Ongoing</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{proj.location}</p>
                        <div className="flex items-center space-x-2 mt-1 flex-wrap gap-y-0.5 text-[10px]">
                          <span className="text-slate-600 font-medium">₹{proj.baseRate.toLocaleString('en-IN')}/sqft</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500">{proj.wings.length} {proj.wings.length === 1 ? 'Wing' : 'Wings'} ({proj.totalFloors} Flr)</span>
                          {proj.isRedevelopment && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-purple-600 font-bold">🤝 Rehab Quota</span>
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Global Search Bar (Desktop only) */}
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
      <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
        {/* Head Office Tag (xl screens only) */}
        <div className="hidden xl:flex items-center space-x-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>HO: 101 Jay Gagan, Malad (W)</span>
        </div>

        {/* Notifications button */}
        <button 
          onClick={() => alert("Notification: Amar CHSL 5th Slab reached. 4 customer milestone demands ready.")}
          className="relative p-1.5 sm:p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors shrink-0"
          title="Notifications"
        >
          <Bell className="w-4 sm:w-4.5 h-4 sm:h-4.5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        {/* Admin profile */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 pl-1.5 sm:pl-3 border-l border-slate-200 cursor-pointer shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            AB
          </div>
          <div className="hidden md:block text-left">
            <p className="font-semibold text-xs text-slate-800 leading-tight">Super Admin</p>
            <p className="text-slate-400 text-[10px]">Malad HO</p>
          </div>
        </div>
      </div>
    </header>
  );
}
