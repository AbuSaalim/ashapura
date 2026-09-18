"use client";

import { useState, useEffect } from "react";
import { mockInventory, Flat, UnitStatus, UnitQuota } from "@/lib/mockData";
import { useProject } from "@/context/ProjectContext";
import { clsx } from "clsx";
import { X, User, Home, Tag, Handshake, Users, Shield, CheckCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const statusStyles: Record<UnitStatus, string> = {
  AVAILABLE: "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100/80 shadow-xs",
  HOLD: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100/80 shadow-xs",
  BOOKED: "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100/80 shadow-xs",
  SOCIETY_REHAB: "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100/80 shadow-xs ring-1 ring-purple-300/50",
  INVESTOR_HOLD: "bg-cyan-50 border-cyan-200 text-cyan-800 hover:bg-cyan-100/80 shadow-xs",
};

const statusBadges: Record<UnitStatus, string> = {
  AVAILABLE: "bg-emerald-100 text-emerald-800 border-emerald-200",
  HOLD: "bg-amber-100 text-amber-800 border-amber-200",
  BOOKED: "bg-rose-100 text-rose-800 border-rose-200",
  SOCIETY_REHAB: "bg-purple-100 text-purple-900 border-purple-200",
  INVESTOR_HOLD: "bg-cyan-100 text-cyan-900 border-cyan-200",
};

export default function InventoryPage() {
  const { selectedProject } = useProject();
  const [activeWing, setActiveWing] = useState<string>(selectedProject.wings[0] || "Wing A");
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);
  const [quotaFilter, setQuotaFilter] = useState<string>("ALL");

  // Keep activeWing in sync when project changes
  useEffect(() => {
    if (selectedProject.wings.length > 0) {
      setActiveWing(selectedProject.wings[0]);
    }
  }, [selectedProject]);

  const projectFlats = mockInventory.filter(f => f.projectId === selectedProject.id);
  const wingFlats = projectFlats.filter(f => f.wing === activeWing);

  // Filtered by Quota tab
  const displayFlats = wingFlats.filter(f => {
    if (quotaFilter === "ALL") return true;
    if (quotaFilter === "BUILDER_SALE") return f.quota === "BUILDER_SALE";
    if (quotaFilter === "SOCIETY_REHAB") return f.quota === "SOCIETY_REHAB";
    if (quotaFilter === "INVESTOR_SHARE") return f.quota === "INVESTOR_SHARE";
    return true;
  });

  const floors = Array.from(
    { length: selectedProject.totalFloors }, 
    (_, i) => selectedProject.totalFloors - i
  );
  
  const availableCount = wingFlats.filter(f => f.status === "AVAILABLE").length;
  const holdCount = wingFlats.filter(f => f.status === "HOLD").length;
  const bookedCount = wingFlats.filter(f => f.status === "BOOKED").length;
  const rehabCount = wingFlats.filter(f => f.status === "SOCIETY_REHAB").length;
  const investorCount = wingFlats.filter(f => f.status === "INVESTOR_HOLD").length;

  const formatPrice = (carpetArea: number, baseRate: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(carpetArea * baseRate);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-800">{selectedProject.name}</h1>
            {selectedProject.isRedevelopment && (
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-purple-200 flex items-center space-x-1">
                <Handshake className="w-3.5 h-3.5 mr-1" />
                Society Redevelopment Tie-up
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {selectedProject.location} • {selectedProject.totalFloors} Floors Matrix • Total {projectFlats.length} Units in Project
          </p>
        </div>

        {/* Wing / Tower Switcher */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {selectedProject.wings.map(wing => (
            <button
              key={wing}
              onClick={() => setActiveWing(wing)}
              className={clsx(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                activeWing === wing 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {wing}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Cards including Society Tie-up */}
      <div className={`grid gap-3 ${selectedProject.isRedevelopment ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-4'}`}>
        {selectedProject.isRedevelopment && (
          <div className="bg-purple-50/80 border border-purple-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
            <div>
              <p className="text-purple-700 text-xs font-bold uppercase tracking-wider mb-1 flex items-center">
                <Handshake className="w-3.5 h-3.5 mr-1" />
                Society Rehab
              </p>
              <p className="text-2xl font-black text-purple-900">{rehabCount}</p>
              <p className="text-[11px] text-purple-600 font-medium">Tenant Member Quota</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-700" />
            </div>
          </div>
        )}

        <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">AVAILABLE</p>
            <p className="text-2xl font-black text-emerald-800">{availableCount}</p>
            <p className="text-[11px] text-emerald-600 font-medium">Free Sale Inventory</p>
          </div>
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-emerald-700" />
          </div>
        </div>

        <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">TOKEN / HOLD</p>
            <p className="text-2xl font-black text-amber-800">{holdCount}</p>
            <p className="text-[11px] text-amber-600 font-medium">Advance Under Process</p>
          </div>
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Tag className="w-5 h-5 text-amber-700" />
          </div>
        </div>

        <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-rose-700 text-xs font-bold uppercase tracking-wider mb-1">BOOKED / SOLD</p>
            <p className="text-2xl font-black text-rose-800">{bookedCount}</p>
            <p className="text-[11px] text-rose-600 font-medium">Agreements Executed</p>
          </div>
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-rose-700" />
          </div>
        </div>

        <div className="bg-cyan-50/80 border border-cyan-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-cyan-700 text-xs font-bold uppercase tracking-wider mb-1">INVESTOR / JV</p>
            <p className="text-2xl font-black text-cyan-900">{investorCount}</p>
            <p className="text-[11px] text-cyan-600 font-medium">Partner Share</p>
          </div>
          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-cyan-700" />
          </div>
        </div>
      </div>

      {/* Quota Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Filter View:</span>
        <button
          onClick={() => setQuotaFilter("ALL")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            quotaFilter === "ALL" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All Units ({wingFlats.length})
        </button>
        <button
          onClick={() => setQuotaFilter("BUILDER_SALE")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            quotaFilter === "BUILDER_SALE" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          Builder Free-Sale ({wingFlats.filter(f => f.quota === "BUILDER_SALE").length})
        </button>
        {selectedProject.isRedevelopment && (
          <button
            onClick={() => setQuotaFilter("SOCIETY_REHAB")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              quotaFilter === "SOCIETY_REHAB" ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            🤝 Society Rehab Quota ({rehabCount})
          </button>
        )}
        <button
          onClick={() => setQuotaFilter("INVESTOR_SHARE")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            quotaFilter === "INVESTOR_SHARE" ? "bg-cyan-600 text-white" : "bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
          }`}
        >
          Investor / JV Share ({investorCount})
        </button>
      </div>

      {/* Matrix Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {activeWing} • Floor-Wise Architectural Grid
          </span>
          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 mr-1.5"></span> Available</span>
            <span className="flex items-center"><span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 mr-1.5"></span> Token / Hold</span>
            <span className="flex items-center"><span className="w-3 h-3 rounded bg-rose-100 border border-rose-300 mr-1.5"></span> Sold</span>
            {selectedProject.isRedevelopment && (
              <span className="flex items-center"><span className="w-3 h-3 rounded bg-purple-200 border border-purple-400 mr-1.5"></span> Society Rehab</span>
            )}
            <span className="flex items-center"><span className="w-3 h-3 rounded bg-cyan-100 border border-cyan-300 mr-1.5"></span> Investor</span>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="min-w-[680px]">
            {/* Table Header with Units */}
            <div className="grid grid-cols-12 gap-3 mb-3 text-center text-xs font-bold text-slate-400">
              <div className="col-span-2 text-left pl-3">FLOOR</div>
              {Array.from({ length: selectedProject.unitsPerFloor }, (_, i) => (
                <div key={i} className={`col-span-${Math.floor(10 / selectedProject.unitsPerFloor)}`}>
                  UNIT 0{i + 1}
                </div>
              ))}
            </div>

            {/* Matrix Floors */}
            <div className="space-y-2.5">
              {floors.map(floor => (
                <div key={floor} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-2 font-bold text-sm text-slate-600 pl-3">
                    Floor {floor.toString().padStart(2, '0')}
                  </div>
                  
                  {Array.from({ length: selectedProject.unitsPerFloor }, (_, unitIdx) => {
                    const uIdx = unitIdx + 1;
                    const unitSuffix = uIdx.toString().padStart(2, '0');
                    const flat = displayFlats.find(f => f.floor === floor && f.unitNumber.endsWith(unitSuffix));

                    if (!flat) {
                      return (
                        <div 
                          key={uIdx} 
                          className={`col-span-${Math.floor(10 / selectedProject.unitsPerFloor)} h-14 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-300`}
                        >
                          Filtered
                        </div>
                      );
                    }

                    return (
                      <motion.div
                        key={flat.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedFlat(flat)}
                        className={clsx(
                          "col-span-2 h-14 rounded-xl border p-1.5 flex flex-col justify-between cursor-pointer transition-all relative overflow-hidden",
                          statusStyles[flat.status]
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{flat.unitNumber}</span>
                          <span className="text-[10px] font-semibold opacity-75">{flat.type}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="opacity-90">{flat.carpetArea} sqft</span>
                          {flat.status === "SOCIETY_REHAB" ? (
                            <span className="bg-purple-200/80 text-purple-900 font-bold px-1 rounded text-[9px]">
                              Rehab
                            </span>
                          ) : flat.status === "INVESTOR_HOLD" ? (
                            <span className="bg-cyan-200/80 text-cyan-900 font-bold px-1 rounded text-[9px]">
                              JV
                            </span>
                          ) : (
                            <span className="capitalize text-[10px] font-medium">{flat.status.toLowerCase()}</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flat Details Interactive Modal */}
      <AnimatePresence>
        {selectedFlat && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-slate-800">
                      Unit {selectedFlat.unitNumber} ({selectedFlat.wing})
                    </h3>
                    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-bold border", statusBadges[selectedFlat.status])}>
                      {selectedFlat.status === "SOCIETY_REHAB" ? "SOCIETY REHAB (TIE-UP)" : selectedFlat.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedFlat.projectName}</p>
                </div>
                <button 
                  onClick={() => setSelectedFlat(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Society Member / Allotment Info if Rehab */}
              {selectedFlat.quota === "SOCIETY_REHAB" ? (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-5">
                  <div className="flex items-center space-x-2 mb-2">
                    <Handshake className="w-4 h-4 text-purple-700" />
                    <span className="text-xs font-bold text-purple-900 uppercase">Society Allotment Details</span>
                  </div>
                  <p className="text-sm font-bold text-purple-950">
                    Allottee: {selectedFlat.societyMemberName}
                  </p>
                  <p className="text-xs text-purple-700 mt-1">
                    Redevelopment Category: Permanent Alternate Accommodation (PAAA Registered)
                  </p>
                  <div className="mt-3 pt-3 border-t border-purple-200/60 flex items-center justify-between text-xs text-purple-800">
                    <span>MahaRERA Share: Society Quota</span>
                    <span className="font-semibold">Free of Cost Allotment</span>
                  </div>
                </div>
              ) : selectedFlat.quota === "INVESTOR_SHARE" ? (
                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-5">
                  <div className="flex items-center space-x-2 mb-1">
                    <Shield className="w-4 h-4 text-cyan-700" />
                    <span className="text-xs font-bold text-cyan-900 uppercase">Partner / JV Share</span>
                  </div>
                  <p className="text-sm font-semibold text-cyan-950">
                    Holding Entity: {selectedFlat.investorName}
                  </p>
                  <p className="text-xs text-cyan-700 mt-1">
                    Reserved under Joint Development Agreement (JDA)
                  </p>
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-medium text-slate-400">Configuration</span>
                  <p className="text-base font-bold text-slate-700">{selectedFlat.type} Luxury</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-medium text-slate-400">Carpet Area (RERA)</span>
                  <p className="text-base font-bold text-slate-700">{selectedFlat.carpetArea} sq.ft</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-medium text-slate-400">Base Rate</span>
                  <p className="text-base font-bold text-slate-700">₹{selectedFlat.baseRate.toLocaleString('en-IN')}/sq.ft</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-medium text-slate-400">Estimated Value</span>
                  <p className="text-base font-bold text-blue-600">
                    {formatPrice(selectedFlat.carpetArea, selectedFlat.baseRate)}
                  </p>
                </div>
              </div>

              {selectedFlat.customerName && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400">Current Allottee / Buyer</span>
                    <p className="text-sm font-bold text-slate-700">{selectedFlat.customerName}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {selectedFlat.status === "AVAILABLE" ? (
                  <>
                    <button 
                      onClick={() => {
                        alert(`Unit ${selectedFlat.unitNumber} marked as Token/Hold.`);
                        selectedFlat.status = "HOLD";
                        setSelectedFlat(null);
                      }}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm text-sm"
                    >
                      Hold Unit (Token)
                    </button>
                    <a 
                      href="/documents"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center text-sm"
                    >
                      Generate Quotation <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                  </>
                ) : (
                  <button 
                    onClick={() => setSelectedFlat(null)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Close Inspection
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
