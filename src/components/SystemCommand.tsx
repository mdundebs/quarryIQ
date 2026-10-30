import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Server,
  Radio,
  Sliders,
  AlertTriangle,
  Bell,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Clock,
  Terminal,
  Calculator,
  Sun,
  Moon
} from 'lucide-react';

interface ToastAlert {
  id: string;
  type: 'choke' | 'leak' | 'trip';
  message: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export const SystemCommand: React.FC = () => {
  // Protocol toggle for Architecture Diagram
  const [showProtocols, setShowProtocols] = useState<boolean>(true);

  // Active Toast Alerts state
  const [activeToast, setActiveToast] = useState<ToastAlert | null>(null);

  // Shift Reports Toggle state ('day' | 'night')
  const [activeShift, setActiveShift] = useState<'day' | 'night'>('day');

  // Trigger Toast Handlers
  const handleSimulateChoke = () => {
    setActiveToast({
      id: Date.now().toString(),
      type: 'choke',
      message: '⚠️ C140 Choke Detected. Feeder stopped automatically. Clear jam.',
      bgClass: 'bg-red-950/90',
      borderClass: 'border-red-500',
      textClass: 'text-red-200',
    });
  };

  const handleSimulateRevenueLeak = () => {
    setActiveToast({
      id: Date.now().toString(),
      type: 'leak',
      message: '📈 Scale Drift: BST100 reads 1,000t, Camera reads 1,040t. Revenue leak detected!',
      bgClass: 'bg-amber-950/90',
      borderClass: 'border-[#FFC72C]',
      textClass: 'text-[#FFC72C]',
    });
  };

  const handleSimulateVsdTrip = () => {
    setActiveToast({
      id: Date.now().toString(),
      type: 'trip',
      message: '🛑 Primary VSD Overload. Motor Amps: 45A. Check belt for debris.',
      bgClass: 'bg-yellow-950/90',
      borderClass: 'border-yellow-500',
      textClass: 'text-yellow-200',
    });
  };

  // BOM Justification Data Table ($102,200 Total)
  const bomRows = [
    {
      item: 'ABB ACS880 VSDs',
      qty: '4',
      formula: 'Energy = Power x Time',
      justification: 'Controls 4 main conveyors. Decouples belt speed from grid frequency.',
      cost: '$25,000',
    },
    {
      item: 'WEG SSW900 Soft Starters',
      qty: '3',
      formula: 'Inrush Current = 6x FLA (DOL)',
      justification: '110kW, 155kW, 191kW crushers. Ramps voltage smoothly over 20s.',
      cost: '$34,000',
    },
    {
      item: 'Siemens S7-1200 PLC, HMI & Energy Meters',
      qty: '1 set',
      formula: 'I = P / (V x sqrt(3))',
      justification: 'Motor protection relays, energy meters, and armored cables in steel conduit.',
      cost: '$3,400',
    },
    {
      item: 'Fireflies Edge PC & 1x AI Camera',
      qty: '1',
      formula: 'TPH = (Vol x Density) * 3.6',
      justification: 'Mounted at 19mm discharge to verify scale accuracy and catch revenue leaks.',
      cost: '$3,800',
    },
    {
      item: 'Installation & Commissioning',
      qty: '1 lot',
      formula: 'Safe LOTO Tie-ins',
      justification: 'Safe LOTO tie-ins, terminations, and load testing.',
      cost: '$36,000',
    },
  ];

  return (
    <div className="space-y-8 text-[#E2E8F0] font-mono">
      {/* Toast Alert Overlay Banner */}
      {activeToast && (
        <div
          className={`fixed top-20 right-4 sm:right-8 z-50 max-w-md w-full p-4 rounded-xl border-2 ${activeToast.bgClass} ${activeToast.borderClass} ${activeToast.textClass} shadow-2xl animate-bounce flex items-start justify-between gap-3`}
        >
          <div className="flex items-start gap-2.5">
            <Bell className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
            <p className="text-xs sm:text-sm font-bold font-mono leading-relaxed">
              {activeToast.message}
            </p>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-black/40 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">System &amp; Command Center</h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
              EXECUTIVE COMMAND
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-0.5">
            Complete plant architecture, BOM justification formulas, interactive alert triggers &amp; shift reports
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#FFC72C] bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg shrink-0">
          <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Interactive Control Panel</span>
        </div>
      </div>

      {/* SECTION 1: THE ARCHITECTURE DIAGRAM */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="text-lg sm:text-xl font-bold text-white">1. System Architecture &amp; Data Flow</h2>
          </div>

          <button
            onClick={() => setShowProtocols(!showProtocols)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              showProtocols
                ? 'bg-[#FFC72C] text-[#0B0B0F] border-[#FFC72C]'
                : 'bg-stone-900 text-stone-300 border-stone-700 hover:text-white'
            }`}
          >
            {showProtocols ? 'Hide Protocols' : 'Show Protocols (Modbus/Profinet)'}
          </button>
        </div>

        {/* 4-Tier Architecture Flowchart */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Tier 1: Field Level */}
          <div className="bg-stone-900 border-2 border-emerald-500/50 rounded-xl p-4 space-y-3 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">1. Field Level</span>
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-sm mb-2">Sensory &amp; Drive Hardware</h3>
              <ul className="space-y-1.5 text-stone-300 text-[11px]">
                <li>• 1x 1080p AI Camera (19mm)</li>
                <li>• 4x ABB VSDs (22kW)</li>
                <li>• 3x WEG Soft Starters</li>
                <li>• 1x BST100 Belt Scale</li>
                <li className="text-[10px] text-[#FFC72C] italic pt-1 border-t border-stone-800 font-sans">*Note: Phase 2 vision expands to LiDAR stockpile scanner &amp; full plant camera grid</li>
              </ul>
            </div>

            {showProtocols && (
              <div className="mt-3 p-2 rounded bg-stone-950 border border-emerald-500/30 text-[10px] text-emerald-300 font-bold text-center">
                Protocol: Analog 4-20mA / Pulsed
              </div>
            )}
          </div>

          {/* Tier 2: Control Level */}
          <div className="bg-stone-900 border-2 border-cyan-500/50 rounded-xl p-4 space-y-3 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">2. Control Level</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-bold text-white text-sm mb-2">PLC &amp; Switchgear Panel</h3>
              <ul className="space-y-1.5 text-stone-300 text-[11px]">
                <li>• Armored XLPE Cabling</li>
                <li>• Siemens S7 PLC</li>
                <li>• 600A MCC Switchgear</li>
                <li>• Motor Protection Relays</li>
              </ul>
            </div>

            {showProtocols && (
              <div className="mt-3 p-2 rounded bg-stone-950 border border-cyan-500/30 text-[10px] text-cyan-300 font-bold text-center">
                Protocol: Modbus RTU / Profinet
              </div>
            )}
          </div>

          {/* Tier 3: Edge Level */}
          <div className="bg-stone-900 border-2 border-purple-500/50 rounded-xl p-4 space-y-3 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">3. Edge Level</span>
                <Server className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="font-bold text-white text-sm mb-2">On-Site Industrial Compute</h3>
              <ul className="space-y-1.5 text-stone-300 text-[11px]">
                <li>• Fireflies Edge PC</li>
                <li>• Volumetric AI Engine</li>
                <li>• Scale Drift Detection</li>
                <li>• LOTO SCADA Interlocks</li>
              </ul>
            </div>

            {showProtocols && (
              <div className="mt-3 p-2 rounded bg-stone-950 border border-purple-500/30 text-[10px] text-purple-300 font-bold text-center">
                Protocol: Modbus TCP
              </div>
            )}
          </div>

          {/* Tier 4: Cloud & Executive Level */}
          <div className="bg-stone-900 border-2 border-[#FFC72C]/60 rounded-xl p-4 space-y-3 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC72C]">4. Cloud &amp; CEO Level</span>
                <Radio className="w-4 h-4 text-[#FFC72C]" />
              </div>
              <h3 className="font-bold text-white text-sm mb-2">Command Center Console</h3>
              <ul className="space-y-1.5 text-stone-300 text-[11px]">
                <li>• Industrial 4G Router</li>
                <li>• QuarryIQ CEO View</li>
                <li>• WhatsApp Daily Digest</li>
                <li>• Executive Telemetry</li>
              </ul>
            </div>

            {showProtocols && (
              <div className="mt-3 p-2 rounded bg-stone-950 border border-[#FFC72C]/40 text-[10px] text-[#FFC72C] font-bold text-center">
                Protocol: Secure HTTPS / 4G LTE
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: BOM JUSTIFICATION & FORMULAS TABLE */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="text-lg sm:text-xl font-bold text-white">2. BOM Justification &amp; Engineering Formulas</h2>
          </div>
          <span className="text-xs text-[#FFC72C] font-bold bg-[#FFC72C]/10 px-3 py-1 rounded border border-[#FFC72C]/30">
            TOTAL PHASE 1: $102,200
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-900 text-stone-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 rounded-l-lg">Item</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4">Formula / Engineering Logic</th>
                <th className="py-3 px-4">Technical Justification</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Cost (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {bomRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">{row.item}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-stone-300">{row.qty}</td>
                  <td className="py-3.5 px-4 text-[#FFC72C] font-bold font-mono">{row.formula}</td>
                  <td className="py-3.5 px-4 text-stone-300 leading-relaxed font-sans">{row.justification}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-400 font-mono text-sm whitespace-nowrap">{row.cost}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#FFC72C]/50 bg-stone-900 font-bold text-white text-sm">
                <td className="py-3.5 px-4 text-[#FFC72C] uppercase" colSpan={4}>TOTAL TURNKEY PHASE 1 SETUP</td>
                <td className="py-3.5 px-4 text-right text-[#FFC72C] font-black text-base">$102,200</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* SECTION 3: INTERACTIVE COMMAND CENTER (TEST ALERTS) */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="text-lg sm:text-xl font-bold text-white">3. Interactive Command Center — Test Live Alerts</h2>
          </div>
          <span className="text-xs text-stone-400 font-mono">
            Click buttons to trigger real-time SCADA executive notifications
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Button 1: Simulate Choke */}
          <button
            onClick={handleSimulateChoke}
            className="p-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border-2 border-red-500/80 text-white font-bold transition-all cursor-pointer shadow-lg text-left space-y-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between text-xs text-red-400">
              <span className="uppercase font-mono tracking-wider">Alert Simulation 1</span>
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="text-sm font-black text-white">Simulate Choke</div>
            <p className="text-[11px] text-red-200/80 font-sans leading-normal">
              Triggers instant jaw choke protection &amp; feeder shutdown alert.
            </p>
          </button>

          {/* Button 2: Simulate Revenue Leak */}
          <button
            onClick={handleSimulateRevenueLeak}
            className="p-4 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border-2 border-[#FFC72C] text-white font-bold transition-all cursor-pointer shadow-lg text-left space-y-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between text-xs text-[#FFC72C]">
              <span className="uppercase font-mono tracking-wider">Alert Simulation 2</span>
              <Radio className="w-4 h-4" />
            </div>
            <div className="text-sm font-black text-[#FFC72C]">Simulate Revenue Leak</div>
            <p className="text-[11px] text-amber-200/80 font-sans leading-normal">
              Triggers scale drift cross-check (+4% variance detection).
            </p>
          </button>

          {/* Button 3: Simulate VSD Trip */}
          <button
            onClick={handleSimulateVsdTrip}
            className="p-4 rounded-xl bg-yellow-950/40 hover:bg-yellow-900/60 border-2 border-yellow-500/80 text-white font-bold transition-all cursor-pointer shadow-lg text-left space-y-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between text-xs text-yellow-400">
              <span className="uppercase font-mono tracking-wider">Alert Simulation 3</span>
              <Sliders className="w-4 h-4" />
            </div>
            <div className="text-sm font-black text-yellow-300">Simulate VSD Trip</div>
            <p className="text-[11px] text-yellow-200/80 font-sans leading-normal">
              Triggers primary conveyor motor overload current alert (45A).
            </p>
          </button>
        </div>
      </div>

      {/* SECTION 4: SHIFT REPORTS */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="text-lg sm:text-xl font-bold text-white">4. Executive Shift Reports</h2>
          </div>

          {/* Day / Night Shift Toggle Switch */}
          <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800 shrink-0">
            <button
              onClick={() => setActiveShift('day')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeShift === 'day'
                  ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Day Shift</span>
            </button>

            <button
              onClick={() => setActiveShift('night')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeShift === 'night'
                  ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Night Shift</span>
            </button>
          </div>
        </div>

        {/* Shift Report Summary Cards */}
        {activeShift === 'day' ? (
          <div className="bg-stone-900/90 border-2 border-emerald-500/60 rounded-xl p-5 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                <Sun className="w-4 h-4 text-emerald-400" />
                DAY SHIFT SUMMARY REPORT (06:00 AM – 03:00 PM)
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                STATUS: OPTIMAL RUN
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 text-center">
                <span className="text-stone-400 text-xs block">Production Tonnes</span>
                <span className="text-2xl font-black text-emerald-400 block mt-1">600 t</span>
                <span className="text-[10px] text-stone-500">Day shift output</span>
              </div>

              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 text-center">
                <span className="text-stone-400 text-xs block">Unplanned Downtime</span>
                <span className="text-2xl font-black text-white block mt-1">1.5 hours</span>
                <span className="text-[10px] text-stone-500">Routine deck adjustments</span>
              </div>

              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 text-center">
                <span className="text-stone-400 text-xs block">Target Goal</span>
                <span className="text-2xl font-black text-[#FFC72C] block mt-1">4,000 t/day</span>
                <span className="text-[10px] text-stone-500">Daily market capacity</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 font-sans leading-relaxed">
              <strong>Operational Log:</strong> Primary jaw crusher operated under optimal choke-feed conditions with zero soft starter electrical trips.
            </div>
          </div>
        ) : (
          <div className="bg-stone-900/90 border-2 border-red-500/60 rounded-xl p-5 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="font-bold text-red-400 text-sm flex items-center gap-2">
                <Moon className="w-4 h-4 text-red-400" />
                NIGHT SHIFT SUMMARY REPORT (03:00 PM – 12:00 AM)
              </span>
              <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/40">
                STATUS: SPILLAGE DELAY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 text-center">
                <span className="text-stone-400 text-xs block">Production Tonnes</span>
                <span className="text-2xl font-black text-amber-400 block mt-1">400 t</span>
                <span className="text-[10px] text-stone-500">Night shift output</span>
              </div>

              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 text-center">
                <span className="text-stone-400 text-xs block">Unplanned Downtime</span>
                <span className="text-2xl font-black text-red-400 block mt-1">3.5 hours</span>
                <span className="text-[10px] text-stone-500">Spillage cleanup delay</span>
              </div>

              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 text-center">
                <span className="text-stone-400 text-xs block">Target Goal</span>
                <span className="text-2xl font-black text-[#FFC72C] block mt-1">4,000 t/day</span>
                <span className="text-[10px] text-stone-500">Daily market capacity</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-500/40 text-xs text-red-200 font-sans leading-relaxed">
              <strong>Operational Log:</strong> Night shift lost 3.5 hours to spillage cleanup prior to VSD feeder belt speed synchronization.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
