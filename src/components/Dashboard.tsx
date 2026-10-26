import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Package,
  Info,
  X,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Clock
} from 'lucide-react';
import { BASELINE } from '../config/baseline';

interface DashboardProps {
  liveDataEnabled?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ liveDataEnabled = true }) => {
  const [showAssumptions, setShowAssumptions] = useState<boolean>(true);
  const [guideOpen, setGuideOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6 text-[#E2E8F0]">
      {/* Top Business Banner */}
      {showAssumptions && (
        <div className="bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-xl p-4 sm:p-5 shadow-lg flex items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFC72C]/20 border border-[#FFC72C]/40 flex items-center justify-center text-[#FFC72C] shrink-0 mt-0.5 sm:mt-0">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
              <strong className="text-[#FFC72C] font-bold">CEO Executive Summary:</strong> {BASELINE.ASSUMPTIONS_BANNER_TEXT}
            </p>
          </div>
          <button
            onClick={() => setShowAssumptions(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
            title="Dismiss Banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Bar with Plain English Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">CEO View — Business Health &amp; Key Targets</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">EXECUTIVE CONSOLE</span>
          </div>
          <p className="text-xs text-stone-400 mt-0.5 font-mono">
            High-level operational outcomes &bull; FY2026 Monthly Target vs Daily Performance
          </p>
        </div>

        <button
          onClick={() => setGuideOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-[#FFC72C] text-xs font-bold border border-stone-700 shadow-xs transition-all cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-[#FFC72C]" />
          <span>Dashboard Guide</span>
        </button>
      </div>

      {/* ROW 1: THE TARGETS (3 Simple Cards) */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#FFC72C] font-mono">
          Row 1: The Targets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Today's Sales */}
          <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md hover:border-[#FFC72C]/50 transition-all space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider font-mono">Today's Sales</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">$45,000</div>
            <p className="text-xs text-stone-400 font-mono">
              Banked sales revenue from dispatch weighbridge today
            </p>
          </div>

          {/* Card 2: Monthly Target Progress */}
          <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md hover:border-[#FFC72C]/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider font-mono">Monthly Target Progress</span>
              <Package className="w-5 h-5 text-[#FFC72C]" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono text-white">22,000 / 24,000</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">91.6%</span>
            </div>
            {/* Green Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-stone-900 rounded-full h-3 overflow-hidden border border-stone-800">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '91.6%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-stone-400">
                <span>Total Tonnes Crushed</span>
                <span className="text-emerald-400 font-bold">On Track</span>
              </div>
            </div>
          </div>

          {/* Card 3: 19mm Strategic Target */}
          <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md hover:border-red-500/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider font-mono">19mm Strategic Target</span>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono text-white">1,000 / 4,000</span>
              <span className="text-xs font-bold text-red-400 font-mono">25.0%</span>
            </div>
            {/* Red Progress Bar indicating Shortfall */}
            <div className="space-y-1">
              <div className="w-full bg-stone-900 rounded-full h-3 overflow-hidden border border-stone-800">
                <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-red-400 font-bold">
                <span>Current Daily Capacity</span>
                <span>Shortfall: -3,000 tonnes/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: THE FORECAST (2 Simple Outcome Cards) */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#FFC72C] font-mono">
          Row 2: The Forecast
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Forecast 1: Monthly Target */}
          <div className="bg-[#1A1A1F] border border-emerald-500/40 rounded-xl p-5 shadow-md flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-stone-400 uppercase font-mono">Forecast to hit monthly target?</div>
              <div className="text-2xl font-black text-stone-200 mt-1">24,000 Tonnes Overall Goal</div>
            </div>
            <div className="bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 px-5 py-2.5 rounded-xl text-2xl font-black font-mono tracking-wider">
              YES
            </div>
          </div>

          {/* Forecast 2: 19mm Demand */}
          <div className="bg-[#1A1A1F] border border-red-500/40 rounded-xl p-5 shadow-md flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-stone-400 uppercase font-mono">Forecast to hit 19mm demand?</div>
              <div className="text-2xl font-black text-stone-200 mt-1">4,000 Tonnes/Day Market Demand</div>
            </div>
            <div className="bg-red-500/20 border-2 border-red-500 text-red-400 px-5 py-2.5 rounded-xl text-2xl font-black font-mono tracking-wider">
              NO
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: PLAIN ENGLISH KPI ALERTS */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#FFC72C] font-mono">
          Row 3: Plain English Operational Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Red Alert Box */}
          <div className="bg-red-950/30 border-2 border-red-500/80 rounded-xl p-5 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <span>🚨 Production Shortfall</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-mono">
              Night shift lost 3.5 hours to spillage cleanup.
            </p>
            <div className="text-[11px] text-red-400 font-mono font-bold pt-1">
              Action Required: AI Vision alignment check
            </div>
          </div>

          {/* Yellow Alert Box */}
          <div className="bg-amber-950/30 border-2 border-amber-500/80 rounded-xl p-5 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span>⚠️ Maintenance Risk</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-mono">
              C140 bearing needs replacing within 14 days.
            </p>
            <div className="text-[11px] text-amber-300 font-mono font-bold pt-1">
              Spare found in Store Room: Shelf 4B
            </div>
          </div>

          {/* Green Alert Box */}
          <div className="bg-emerald-950/30 border-2 border-emerald-500/80 rounded-xl p-5 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span>✅ Sales Milestone</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-mono">
              500 tonnes of 19mm dispatched to client today.
            </p>
            <div className="text-[11px] text-emerald-400 font-mono font-bold pt-1">
              Weighbridge Verified &bull; Invoice Generated
            </div>
          </div>
        </div>
      </div>

      {/* Guide Drawer */}
      {guideOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={() => setGuideOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#1A1A1F] text-white shadow-2xl border-l border-stone-800 flex flex-col justify-between">
              <div className="p-6 border-b border-stone-800 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-white">CEO View Plain-English Guide</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Understanding key business metrics</p>
                </div>
                <button onClick={() => setGuideOpen(false)} className="p-1.5 rounded-lg text-stone-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono leading-relaxed text-stone-300">
                <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="font-bold text-[#FFC72C]">Row 1: The Targets</div>
                  <div>Shows live revenue banked, overall monthly tonnage progress, and the 19mm market demand gap.</div>
                </div>
                <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="font-bold text-[#FFC72C]">Row 2: The Forecast</div>
                  <div>Presents clear YES/NO answers to whether current plant capacity will meet executive goals.</div>
                </div>
                <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="font-bold text-[#FFC72C]">Row 3: Plain-English Alerts</div>
                  <div>Directly attributes lost hours to physical causes (e.g. spillage) without engineering jargon.</div>
                </div>
              </div>

              <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-mono">QuarryIQ CEO Console</span>
                <button
                  onClick={() => setGuideOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#FFC72C] text-[#0B0B0F] font-bold text-xs"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
