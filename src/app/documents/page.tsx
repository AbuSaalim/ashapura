"use client";

import { useState, useEffect } from "react";
import { Calculator, Download, Printer, FileText, CheckCircle2, Building2 } from "lucide-react";
import { useProject } from "@/context/ProjectContext";

export default function DocumentsPage() {
  const { selectedProject, setSelectedProjectId, projects } = useProject();

  const [carpetArea, setCarpetArea] = useState(720);
  const [baseRate, setBaseRate] = useState(selectedProject.baseRate);
  const [floorRise, setFloorRise] = useState(150000);
  const [parking, setParking] = useState(selectedProject.baseRate > 10000 ? 500000 : 200000);
  const [clientName, setClientName] = useState("Mr. Rajesh Patel");
  const [unitSelection, setUnitSelection] = useState("Flat 702 (Wing A)");

  // Sync base rate when project changes
  useEffect(() => {
    setBaseRate(selectedProject.baseRate);
    setParking(selectedProject.baseRate > 10000 ? 500000 : 200000);
  }, [selectedProject]);

  // Calculations
  const basePrice = carpetArea * baseRate;
  const agreementValue = basePrice + floorRise + parking;
  
  // Government Taxes & Statutory Fees (Maharashtra)
  const stampDuty = agreementValue * 0.06; // 6% Stamp Duty (Mumbai / MMR)
  const registration = 30000; // Fixed max cap in Maharashtra
  const gst = agreementValue * 0.05; // 5% Standard GST for Under Construction
  
  const grandTotal = agreementValue + stampDuty + registration + gst;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dynamic Cost Sheet & MahaRERA Quotation</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Auto-calculated sales quotation engine with official Ashapura Builders corporate letterhead
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => window.print()}
            className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Quotation</span>
          </button>
          <button 
            onClick={() => alert(`PDF Quotation for ${clientName} generated successfully!`)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Official PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Calculator Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center text-blue-600 font-bold mb-5 pb-3 border-b border-slate-100 text-sm">
              <Calculator className="w-4 h-4 mr-2" />
              Configure Pricing & Unit
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Select Project</label>
                <select
                  value={selectedProject.id}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Prospect / Buyer Name</label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Unit / Flat Selection</label>
                <input 
                  type="text" 
                  value={unitSelection}
                  onChange={(e) => setUnitSelection(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Carpet (sq.ft)</label>
                  <input 
                    type="number" 
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Base Rate (₹/sqft)</label>
                  <input 
                    type="number" 
                    value={baseRate}
                    onChange={(e) => setBaseRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Floor Rise Charges (₹)</label>
                <input 
                  type="number" 
                  value={floorRise}
                  onChange={(e) => setFloorRise(Number(e.target.value))}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Covered Car Parking (₹)</label>
                <input 
                  type="number" 
                  value={parking}
                  onChange={(e) => setParking(Number(e.target.value))}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                <span>Agreement Value:</span>
                <span className="font-semibold text-slate-700">{formatPrice(agreementValue)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                <span>Statutory Taxes:</span>
                <span className="font-semibold text-slate-700">{formatPrice(stampDuty + registration + gst)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-blue-600 pt-2 border-t border-slate-100">
                <span>Net Total:</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Formal A4 Quotation Document Mockup */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-300 rounded-2xl p-8 shadow-md print:border-none print:shadow-none min-h-[820px] flex flex-col justify-between">
            
            {/* Header / Letterhead */}
            <div>
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5 mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-wider">ASHAPURA BUILDERS</h2>
                  <p className="text-xs font-bold text-slate-600 mt-0.5">Premier Real Estate Developers & Society Redevelopers</p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-md leading-relaxed">
                    Head Office: 101 Jay Gagan, Nr. Liberty Garden, Road No. 3, Malad (West), Mumbai - 400104<br />
                    Phone: +91-8108101236 • Email: help.ashapura@gmail.com • Web: www.ashapurabuilder.com
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-slate-900 text-white font-bold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase mb-1">
                    Official Quotation
                  </span>
                  <p className="text-xs text-slate-500">Ref: ASH/QT/{new Date().getFullYear()}/0482</p>
                  <p className="text-xs text-slate-500">Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Project & Client Details Box */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Prepared For Buyer:</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{clientName}</p>
                  <p className="text-slate-600">Allocation: {unitSelection}</p>
                  <p className="text-slate-600">RERA Carpet Area: <strong>{carpetArea} sq.ft</strong></p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Project Details:</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedProject.name}</p>
                  <p className="text-slate-600">{selectedProject.address}</p>
                  {selectedProject.reraId && (
                    <p className="text-blue-600 font-semibold mt-0.5">
                      MahaRERA Reg: {selectedProject.reraId}
                    </p>
                  )}
                </div>
              </div>

              {/* Detailed Cost Breakdown Table */}
              <div className="mb-6">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 text-slate-500 uppercase tracking-wider">
                      <th className="py-2.5 font-bold">Particulars & Milestone Scope</th>
                      <th className="py-2.5 text-center font-bold">Rate / Base</th>
                      <th className="py-2.5 text-right font-bold">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 font-medium text-slate-800">
                        Basic Cost of Apartment ({carpetArea} sq.ft RERA Carpet)
                      </td>
                      <td className="py-3 text-center text-slate-500">₹{baseRate.toLocaleString('en-IN')}/sq.ft</td>
                      <td className="py-3 text-right font-semibold text-slate-800">{formatPrice(basePrice)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-slate-800">Floor Rise Premium</td>
                      <td className="py-3 text-center text-slate-500">Lump sum</td>
                      <td className="py-3 text-right font-semibold text-slate-800">{formatPrice(floorRise)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-slate-800">Dedicated Covered Car Parking Space</td>
                      <td className="py-3 text-center text-slate-500">1 Allotted Bay</td>
                      <td className="py-3 text-right font-semibold text-slate-800">{formatPrice(parking)}</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold text-slate-900">
                      <td className="py-3 px-2">Agreement Value (AV)</td>
                      <td className="py-3 text-center">-</td>
                      <td className="py-3 px-2 text-right">{formatPrice(agreementValue)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-600">Maharashtra Stamp Duty (6% of AV)</td>
                      <td className="py-2.5 text-center text-slate-400">Govt Statutory</td>
                      <td className="py-2.5 text-right font-medium text-slate-700">{formatPrice(stampDuty)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-600">Govt Registration Fee (Max Cap)</td>
                      <td className="py-2.5 text-center text-slate-400">Fixed</td>
                      <td className="py-2.5 text-right font-medium text-slate-700">{formatPrice(registration)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-600">Goods & Service Tax (GST 5% Under RERA)</td>
                      <td className="py-2.5 text-center text-slate-400">Statutory</td>
                      <td className="py-2.5 text-right font-medium text-slate-700">{formatPrice(gst)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-900 font-bold text-base text-blue-700">
                      <td className="py-4">Grand Total (All-Inclusive Cost)</td>
                      <td></td>
                      <td className="py-4 text-right">{formatPrice(grandTotal)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Standard MahaRERA Construction Linked Milestone Payment Plan */}
              <div className="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Standard MahaRERA Construction-Linked Milestone Plan
                </h4>
                <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <p className="font-bold text-slate-800">10%</p>
                    <p className="text-slate-400">Booking Advance</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <p className="font-bold text-slate-800">20%</p>
                    <p className="text-slate-400">Agreement Reg.</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <p className="font-bold text-slate-800">15%</p>
                    <p className="text-slate-400">Plinth Level</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <p className="font-bold text-slate-800">25%</p>
                    <p className="text-slate-400">Slab Milestones</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <p className="font-bold text-slate-800">30%</p>
                    <p className="text-slate-400">Finishing & OC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Signatures */}
            <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500">
              <p>1. This quotation is valid for 15 days from the date of issuance.</p>
              <p>2. Cheques / RTGS payable in favour of official MahaRERA project designated escrow account.</p>
              
              <div className="flex justify-between items-end mt-8 pt-6">
                <div>
                  <div className="border-t border-slate-400 w-40 pt-1 text-center font-bold text-slate-700">
                    Buyer Signature
                  </div>
                </div>
                <div className="text-right">
                  <div className="border-t border-slate-400 w-48 pt-1 text-center font-bold text-slate-700">
                    For Ashapura Builders
                  </div>
                  <p className="text-[9px] text-slate-400 mt-0.5 text-center">Authorized Sales Signatory</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
