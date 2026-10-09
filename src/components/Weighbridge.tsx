import React, { useState } from 'react';
import {
  Truck,
  Camera,
  Radio,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { WEIGHBRIDGE_TRUCKS, WeighbridgeTruck } from '../mockData';
import { RoiDisclaimerBanner } from './RoiDisclaimerBanner';

export const Weighbridge: React.FC = () => {
  const [trucks, setTrucks] = useState<WeighbridgeTruck[]>(WEIGHBRIDGE_TRUCKS);
  const [activeTicket, setActiveTicket] = useState<WeighbridgeTruck>(WEIGHBRIDGE_TRUCKS[4]); // The active weighing truck
  const [ticketPrinted, setTicketPrinted] = useState<boolean>(false);

  const handlePrintTicket = () => {
    setTicketPrinted(true);
    setTimeout(() => setTicketPrinted(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* DISCLAIMER BANNER */}
      <RoiDisclaimerBanner />

      {/* Top Banner: Phase 2 Vision & Commercial Benefit */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B0B0F] flex items-center justify-center text-[#FFC72C]">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                Phase 2 &bull; Weighbridge Intelligence
              </span>
              <span className="text-xs text-stone-500 font-mono">Zero Operator In-Loop</span>
            </div>
            <h2 className="text-xl font-black text-stone-900 mt-1">
              Unattended Automated Weighbridge &amp; Anti-Collusion System
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Turnaround slashed from 7 minutes to 45 seconds per interlink hauler; eliminates weighbridge operator bribe vectors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
            <span className="text-emerald-800 font-semibold block">Avg Turnaround Time</span>
            <span className="text-lg font-black text-emerald-900 font-mono">42 Seconds</span>
          </div>
        </div>
      </div>

      {/* Traceability & Green Premium Summary Card */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-stone-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                Traceability &amp; Green Premium Attribution
              </span>
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              Low-Carbon Production &amp; Leakage Defense
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-stone-800 rounded-xl border border-stone-700 text-right font-mono">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Combined Total Investment</span>
              <span className="text-xl font-black text-[#FFC72C]">~$420,800</span>
              <span className="text-[10px] text-stone-400 block">$160k Solar + $235k Auto + $25.8k WB</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700 space-y-2">
            <span className="text-amber-400 font-bold uppercase font-mono text-xs block">
              1. Traceability Narrative
            </span>
            <p className="text-stone-300 leading-relaxed text-xs">
              "Every slab is traced from pit to dispatch. The energy used in production is logged — solar contributes up to 220 kW during daylight hours, with the grid covering the rest. This traceability enables green premium pricing and carbon credit registration."
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700 space-y-2">
            <span className="text-emerald-400 font-bold uppercase font-mono text-xs block">
              2. Green Premium &amp; Carbon Offsets
            </span>
            <ul className="text-stone-300 space-y-1 text-xs">
              <li>&bull; <strong>Green Premium:</strong> $50,400/yr (7% export premium via low-carbon production enabled by 220 kW solar PV + grid).</li>
              <li>&bull; <strong>Carbon Offset:</strong> ~329 tonnes CO₂/yr (~$4,935 &ndash; $9,870/yr credit value).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700 space-y-2">
            <span className="text-rose-400 font-bold uppercase font-mono text-xs block">
              3. Fraud Prevention Leakage Defense
            </span>
            <ul className="text-stone-300 space-y-1 text-xs">
              <li>&bull; Fake tickets: $10k–$20k/yr</li>
              <li>&bull; Weight manipulation: $15k–$25k/yr</li>
              <li>&bull; Unauthorized dispatch: $5k–$15k/yr</li>
              <li>&bull; Product substitution: $10k–$20k/yr</li>
              <li>&bull; <strong>Total Leakage Defended: $40k–$80k/yr</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Automated Truck Entry Mockup (Required Phase 2 Feature) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900 text-[#FFC72C]">
              Lane 01 Sensor Telemetry
            </span>
            <h3 className="text-xl font-black text-stone-900">
              Automated Truck Entry Mockup
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Gate Barrier Status:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Barrier: OPEN
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Sensor Readout Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-500 uppercase block tracking-wider">
                  RFID Scan
                </span>
                <div className="text-base font-black text-stone-900 font-mono mt-1 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#B38300]" />
                  <span>RFID Tag Detected: TRK-042</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-500 uppercase block tracking-wider">
                  Optical Recognition
                </span>
                <div className="text-base font-black text-stone-900 font-mono mt-1 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-600" />
                  <span>ANPR Match: ABC 1234 ZW</span>
                </div>
              </div>
            </div>

            {/* Weight Breakdown */}
            <div className="p-4 rounded-xl bg-[#0B0B0F] text-white border border-stone-800">
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                Automated Scale Gross / Tare / Net Breakdown
              </div>
              <div className="text-base sm:text-lg font-black text-[#FFC72C] font-mono">
                Weight: 34.2t (Gross) | 12.4t (Tare) | 21.8t (Net)
              </div>
            </div>

            {/* Core Value Statement */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Process time: 45 seconds. No driver intervention. Fraud eliminated.</span>
            </div>
          </div>

          {/* Right: Photo Captured Placeholder Image Box */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border-2 border-dashed border-stone-300 bg-stone-100/70 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[190px]">
              <div className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-white">
                CAM-ANPR-01
              </div>
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 shadow-2xs mb-2">
                <Camera className="w-6 h-6 text-stone-800" />
              </div>
              <div className="font-mono font-bold text-sm text-stone-900">
                Photo Captured: [Placeholder Image]
              </div>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                License Plate: ABC 1234 ZW &bull; 99.8% Match
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Scale Platform & ANPR Camera Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: ANPR Camera Feed & Scale Telemetry */}
        <div className="lg:col-span-7 bg-[#0B0B0F] text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#FFC72C]" />
              <h3 className="text-base font-bold text-white">
                Lane 1 ANPR Optical Camera &amp; RFID Scanner
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Vehicle In Position
            </span>
          </div>

          {/* Camera Viewport Graphic Simulation */}
          <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 p-6 flex flex-col justify-between min-h-[220px]">
            {/* Viewport Reticle */}
            <div className="absolute top-3 left-3 border-t-2 border-l-2 border-[#FFC72C] w-6 h-6"></div>
            <div className="absolute top-3 right-3 border-t-2 border-r-2 border-[#FFC72C] w-6 h-6"></div>
            <div className="absolute bottom-3 left-3 border-b-2 border-l-2 border-[#FFC72C] w-6 h-6"></div>
            <div className="absolute bottom-3 right-3 border-b-2 border-r-2 border-[#FFC72C] w-6 h-6"></div>

            <div className="flex items-center justify-between text-xs">
              <span className="bg-black/70 px-2 py-1 rounded text-stone-300 font-mono">
                CAM-01 [NORTH GATE ENTRANCE]
              </span>
              <span className="bg-emerald-900/80 text-emerald-300 font-mono px-2 py-1 rounded">
                AI Recognition: {activeTicket.anprMatchConfidence}%
              </span>
            </div>

            {/* License plate recognition display */}
            <div className="text-center my-4">
              <div className="inline-block bg-white text-stone-900 px-6 py-2 rounded border-2 border-stone-400 font-mono font-black text-2xl tracking-widest shadow-inner">
                {activeTicket.plateNumber}
              </div>
              <div className="text-xs text-stone-400 mt-2 font-mono">
                Driver RFID: {activeTicket.rfidDriverName}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800">
              <span>Hauler: {activeTicket.haulerCompany}</span>
              <span className="text-[#FFC72C] font-semibold">Ready for Auto-Release</span>
            </div>
          </div>

          {/* Weight Indicator Readouts */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
              <span className="text-[11px] text-stone-400 uppercase font-semibold block">Gross Weight</span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                {activeTicket.grossWeightKg.toLocaleString()} <span className="text-xs font-normal text-stone-400">kg</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
              <span className="text-[11px] text-stone-400 uppercase font-semibold block">Stored Tare Weight</span>
              <span className="text-xl sm:text-2xl font-black text-stone-300 font-mono mt-1 block">
                {activeTicket.tareWeightKg.toLocaleString()} <span className="text-xs font-normal text-stone-400">kg</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
              <span className="text-[11px] text-[#FFC72C] uppercase font-semibold block">Net Rock Payload</span>
              <span className="text-xl sm:text-2xl font-black text-[#FFC72C] font-mono mt-1 block">
                {activeTicket.netWeightTons} <span className="text-xs font-normal text-stone-400">Tons</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Electronic Weigh Ticket Preview & Release */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-stone-900" />
                <h3 className="text-base font-bold text-stone-900">
                  Electronic Dispatch Ticket
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-stone-500">
                #{activeTicket.ticketNumber}
              </span>
            </div>

            {/* Paper Ticket Mockup */}
            <div className="p-4 rounded-xl bg-[#FFFDF7] border border-stone-200 text-xs space-y-2.5 font-mono text-stone-800">
              <div className="text-center pb-2 border-b border-dashed border-stone-300">
                <div className="font-bold text-stone-900 text-sm">QUARRYIQ ROCK DISPATCH</div>
                <div className="text-[10px] text-stone-500">Autonomous Weighbridge Terminal #01</div>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Timestamp:</span>
                <span>2026-10-04 {activeTicket.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Hauler:</span>
                <span className="font-bold">{activeTicket.haulerCompany}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Product:</span>
                <span className="font-bold text-amber-900">{activeTicket.productType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Truck Plate:</span>
                <span>{activeTicket.plateNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Axle Drift:</span>
                <span className="text-emerald-700">+{activeTicket.axleDiscrepancyKg} kg (Passed)</span>
              </div>

              <div className="pt-2 border-t border-dashed border-stone-300 flex justify-between text-sm font-bold text-stone-900">
                <span>NET BILLABLE:</span>
                <span className="text-base font-black text-stone-950">
                  {activeTicket.netWeightTons} TONNES
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button
              onClick={handlePrintTicket}
              className="w-full py-3 rounded-xl bg-[#FFC72C] text-[#0B0B0F] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#ffcf47] transition-all cursor-pointer shadow-xs"
            >
              {ticketPrinted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#0B0B0F]" />
                  <span>Boom Gate Opened &bull; SMS e-Ticket Sent!</span>
                </>
              ) : (
                <>
                  <Printer className="w-4 h-4 text-[#0B0B0F]" />
                  <span>Generate e-Ticket &amp; Lift Boom Barrier</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-stone-400 text-center">
              Driver receives instant PDF via WhatsApp/SMS without rolling down their window.
            </p>
          </div>
        </div>
      </div>

      {/* Today's Weighbridge Log Table */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Today's Automated Weighbridge Dispatch Ledger
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Every haul truck timestamp, axle variance, and anti-tamper audit status
            </p>
          </div>
          <span className="text-xs text-stone-500 font-mono">148 Trucks Dispatched Today</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider">
                <th className="pb-2.5 font-bold">Ticket #</th>
                <th className="pb-2.5 font-bold">Time</th>
                <th className="pb-2.5 font-bold">Plate / Hauler</th>
                <th className="pb-2.5 font-bold">Material Fraction</th>
                <th className="pb-2.5 font-bold">Gross (kg)</th>
                <th className="pb-2.5 font-bold">Tare (kg)</th>
                <th className="pb-2.5 font-bold">Net Tonnes</th>
                <th className="pb-2.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {trucks.map((truck) => (
                <tr key={truck.ticketNumber} className="hover:bg-stone-50">
                  <td className="py-3 font-mono font-bold text-stone-800 pr-2">
                    {truck.ticketNumber}
                  </td>
                  <td className="py-3 font-mono text-stone-500 pr-2">
                    {truck.timestamp}
                  </td>
                  <td className="py-3 pr-2">
                    <div className="font-bold text-stone-900">{truck.plateNumber}</div>
                    <div className="text-[11px] text-stone-500">{truck.haulerCompany}</div>
                  </td>
                  <td className="py-3 text-stone-700 pr-2">
                    {truck.productType}
                  </td>
                  <td className="py-3 font-mono text-stone-600 pr-2">
                    {truck.grossWeightKg.toLocaleString()}
                  </td>
                  <td className="py-3 font-mono text-stone-600 pr-2">
                    {truck.tareWeightKg.toLocaleString()}
                  </td>
                  <td className="py-3 font-mono font-bold text-stone-900 pr-2">
                    {truck.netWeightTons} T
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    {truck.status === 'Completed' && (
                      <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Dispatched
                      </span>
                    )}
                    {truck.status === 'Audit Flagged' && (
                      <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Axle Audit (490kg)
                      </span>
                    )}
                    {truck.status === 'Weighing Active' && (
                      <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 animate-pulse">
                        <Scale className="w-3 h-3 text-blue-600" />
                        On Platform
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
