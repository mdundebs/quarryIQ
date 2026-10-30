import React, { useState } from 'react';
import {
  AlertTriangle,
  Activity,
  Zap,
  ShieldCheck,
  DollarSign,
  OctagonAlert,
  Power,
  CheckCircle2,
  HelpCircle,
  X,
  Gauge,
  Sliders,
  Camera,
  Cpu
} from 'lucide-react';

interface DashboardProps {
  liveDataEnabled?: boolean;
}

interface PlantSectionState {
  id: string;
  name: string;
  subtitle: string;
  status: string;
  isStopped: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ liveDataEnabled = true }) => {
  const [guideOpen, setGuideOpen] = useState<boolean>(false);

  // Plant Master Control State (4 plant health items)
  const [plantSections, setPlantSections] = useState<PlantSectionState[]>([
    {
      id: 'sec-1',
      name: 'C140 Jaw',
      subtitle: 'Primary Jaw Crusher (110kW Drive)',
      status: 'Running - Healthy',
      isStopped: false,
    },
    {
      id: 'sec-2',
      name: 'Primary Conveyor',
      subtitle: 'CV-01 Main Feeder (22kW VSD)',
      status: 'Running - VSD Active',
      isStopped: false,
    },
    {
      id: 'sec-3',
      name: '19mm Discharge Camera',
      subtitle: 'Optical Volumetric Sizer',
      status: 'Streaming',
      isStopped: false,
    },
    {
      id: 'sec-4',
      name: 'MCC Energy Meters',
      subtitle: 'Substation Incomer & Relays',
      status: 'Tracking kWh & PF',
      isStopped: false,
    },
  ]);

  const handleToggleEmergencyStop = (id: string) => {
    setPlantSections((prev) =>
      prev.map((sec) => {
        if (sec.id === id) {
          const nextStopped = !sec.isStopped;
          return {
            ...sec,
            isStopped: nextStopped,
            status: nextStopped ? 'Stopped (E-STOP)' : sec.status === 'Stopped (E-STOP)' ? 'Running - Healthy' : sec.status,
          };
        }
        return sec;
      })
    );
  };

  return (
    <div className="space-y-6 text-[#E2E8F0] font-mono">
      {/* 1. TOP BANNER (The Disclaimer) */}
      <div className="bg-amber-950/40 border-2 border-[#FFC72C]/80 rounded-xl p-4 shadow-lg flex items-start justify-between gap-3 animate-fadeIn">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFC72C]/20 border border-[#FFC72C]/50 flex items-center justify-center text-[#FFC72C] shrink-0 mt-0.5">
            <AlertTriangle className="w-4.5 h-4.5" />
          </div>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-mono">
            <strong className="text-[#FFC72C] font-bold">⚠️ PRELIMINARY ESTIMATES:</strong> Targets (4,000 t/day) and baseline (1,000 t/day) are placeholders based on initial assessment. Management will configure final targets in the settings.
          </p>
        </div>
      </div>

      {/* CEO Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">CEO View — Executive Dashboard</h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
              PHASE 1 STABILIZATION
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Physical Plant Reality &bull; Risk Mitigation Matrix &bull; Commercial Investment Snapshot
          </p>
        </div>

        <button
          onClick={() => setGuideOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-[#FFC72C] text-xs font-bold border border-stone-800 transition-all cursor-pointer shrink-0"
        >
          <HelpCircle className="w-4 h-4 text-[#FFC72C]" />
          <span>Executive Brief Guide</span>
        </button>
      </div>

      {/* 2. ROW 1: THE PHYSICAL REALITY (3 KPI Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Live Throughput (TPH) */}
        <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-3 hover:border-[#FFC72C]/50 transition-all relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Live Throughput (TPH)</span>
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">166 t/h</span>
            <span className="text-xs text-stone-400 font-mono font-bold">
              Target: <strong className="text-white">4,000 t/day</strong>
            </span>
          </div>

          <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden border border-stone-800">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
          </div>

          <p className="text-xs text-stone-400 font-sans leading-normal pt-1 border-t border-stone-800/80">
            Est. Current Output: ~1,000 t/day
          </p>
        </div>

        {/* Card 2: Power Quality */}
        <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-3 hover:border-emerald-500/50 transition-all relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Power Quality</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">PF: 0.98</span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
              OPTIMAL
            </span>
          </div>

          <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden border border-stone-800">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '98%' }}></div>
          </div>

          <p className="text-xs text-stone-400 font-sans leading-normal pt-1 border-t border-stone-800/80">
            800A MCC Incomer Active
          </p>
        </div>

        {/* Card 3: Revenue Protection */}
        <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-3 hover:border-[#FFC72C]/50 transition-all relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Revenue Protection</span>
            <ShieldCheck className="w-4 h-4 text-[#FFC72C]" />
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl sm:text-4xl font-black text-[#FFC72C] font-mono">Active</span>
            <span className="text-xs text-[#FFC72C] font-bold bg-amber-950 px-2 py-0.5 rounded border border-[#FFC72C]/40">
              VERIFYING
            </span>
          </div>

          <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden border border-stone-800">
            <div className="bg-[#FFC72C] h-full rounded-full" style={{ width: '100%' }}></div>
          </div>

          <p className="text-xs text-stone-400 font-sans leading-normal pt-1 border-t border-stone-800/80">
            19mm Camera cross-referencing BST100 scale.
          </p>
        </div>
      </div>

      {/* 3. ROW 2: RISKS VS. AUTOMATION (The Engineering Solution) */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FFC72C]" />
              <h2 className="text-lg font-bold text-white tracking-tight">Plant Risks vs. Phase 1 Automation</h2>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Direct alignment between identified site operational risks and engineering safeguards.
            </p>
          </div>

          <span className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[#FFC72C] text-xs font-bold shrink-0">
            4 SAFEGUARDS ACTIVE
          </span>
        </div>

        {/* Clean 2-Column Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse font-mono">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-900 text-stone-400 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 rounded-l-lg w-1/2">Plant Risk</th>
                <th className="py-3.5 px-4 rounded-r-lg w-1/2">Phase 1 Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              <tr className="hover:bg-stone-900/50 transition-colors">
                <td className="py-4 px-4 font-bold text-rose-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Transformer Overload
                  </div>
                </td>
                <td className="py-4 px-4 font-bold text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    WEG Soft Starters
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-stone-900/50 transition-colors">
                <td className="py-4 px-4 font-bold text-rose-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Belt Snapping
                  </div>
                </td>
                <td className="py-4 px-4 font-bold text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    VSDs &amp; Starters
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-stone-900/50 transition-colors">
                <td className="py-4 px-4 font-bold text-rose-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Night Shift Spillage
                  </div>
                </td>
                <td className="py-4 px-4 font-bold text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ABB VSDs (Variable Speed)
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-stone-900/50 transition-colors">
                <td className="py-4 px-4 font-bold text-rose-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Revenue Leakage
                  </div>
                </td>
                <td className="py-4 px-4 font-bold text-[#FFC72C]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC72C] shrink-0" />
                    AI Camera (Scale Drift Check)
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ROW 3: COMMERCIAL SNAPSHOT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Phase 1 Setup Investment (Gold Border) */}
        <div className="bg-[#1A1A1F] border-2 border-[#FFC72C] rounded-2xl p-6 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-[#FFC72C]">
            <span className="uppercase tracking-wider">Phase 1 Setup Investment</span>
            <DollarSign className="w-5 h-5 text-[#FFC72C]" />
          </div>

          <div className="text-3xl sm:text-4xl font-black text-[#FFC72C] font-mono">
            $102,200
          </div>

          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed pt-2 border-t border-stone-800">
            Includes ABB VSDs, WEG Starters, 800A MCC, PLC, Cabling &amp; Installation.
          </p>
        </div>

        {/* Card 2: 12-Month Support & Handover (Blue/Green Border) */}
        <div className="bg-[#1A1A1F] border-2 border-cyan-500/80 rounded-2xl p-6 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
            <span className="uppercase tracking-wider">12-Month Support &amp; Handover</span>
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono">
            $1,999 / month
          </div>

          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed pt-2 border-t border-stone-800">
            Includes SCADA monitoring, cybersecurity, AI updates, and on-site staff training.
          </p>
        </div>
      </div>

      {/* 5. ROW 4: MASTER PLANT CONTROL (Plant Health) */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <OctagonAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Plant Master Control</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Executive interlock console allowing instant shutdown of any plant section.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-stone-400 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-lg shrink-0">
            PLC Interlock Status: <strong className="text-emerald-400">ARMED</strong>
          </div>
        </div>

        {/* 4 Status Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plantSections.map((sec) => (
            <div
              key={sec.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3.5 ${
                sec.isStopped
                  ? 'bg-red-950/40 border-2 border-red-500 text-red-200 shadow-lg'
                  : 'bg-stone-900/90 border-stone-800 text-stone-200'
              }`}
            >
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-white">{sec.name}</div>
                <div className="text-[11px] text-stone-400 font-sans line-clamp-1">{sec.subtitle}</div>
                <div className="pt-2 flex items-center gap-1.5">
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      sec.isStopped
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {sec.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleToggleEmergencyStop(sec.id)}
                className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md w-full ${
                  sec.isStopped
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{sec.isStopped ? 'RESET INTERLOCK' : '🛑 Emergency Stop'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Brief Guide Modal */}
      {guideOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={() => setGuideOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#1A1A1F] text-white shadow-2xl border-l border-stone-800 flex flex-col justify-between font-mono">
              <div className="p-6 border-b border-stone-800 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-white">CEO View Plain-English Guide</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Key executive metrics for Eric Chirombe</p>
                </div>
                <button onClick={() => setGuideOpen(false)} className="p-1.5 rounded-lg text-stone-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-stone-300">
                <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="font-bold text-[#FFC72C]">Live Throughput (166 t/h)</div>
                  <div>Monitors current aggregate processing rate needed to meet 4,000 t/day output.</div>
                </div>
                <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="font-bold text-[#FFC72C]">Power Quality (PF 0.98)</div>
                  <div>Monitors substation power factor to ensure zero utility penalty charges.</div>
                </div>
                <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="font-bold text-[#FFC72C]">Plant Risk vs Solution</div>
                  <div>Maps Transformer Overload, Belt Snapping, Night Shift Spillage, and Revenue Leakage directly to Phase 1 equipment.</div>
                </div>
                <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="font-bold text-[#FFC72C]">Commercial Investment ($102,200)</div>
                  <div>Fixed preliminary quote covering turnkey hardware, MCC assembly, cabling, and commissioning.</div>
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
