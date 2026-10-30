import React from 'react';
import {
  Building2,
  Download,
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu,
  Activity,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Radio,
  Sliders,
  Server,
  Eye,
  BarChart3,
  Terminal,
  Layers
} from 'lucide-react';

export interface CommercialItem {
  item: string;
  justification: string;
  qty: string;
  price: number;
}

export const PricingROI: React.FC = () => {
  // Phase 1 Commercial Investment Table Data ($102,200 Total)
  const phase1Items: CommercialItem[] = [
    {
      item: 'ABB ACS880 VSDs',
      justification: 'Controls 4 main conveyors. Decouples belt speed from grid frequency. Prevents material pile-up and spillage.',
      qty: '4',
      price: 25000,
    },
    {
      item: 'WEG SSW900 Soft Starters',
      justification: '110kW, 155kW, 191kW crushers. Ramps voltage smoothly over 20s to eliminate mechanical jerk & voltage dips.',
      qty: '3',
      price: 34000,
    },
    {
      item: 'Siemens S7-1200 PLC, HMI & Energy Meters',
      justification: 'Motor protection relays, energy meters, and armored cables in steel conduit for dust/vibration survival.',
      qty: '1 set',
      price: 3400,
    },
    {
      item: 'Fireflies Edge PC & 1x AI Camera',
      justification: 'Mounted at 19mm discharge to verify scale accuracy and catch revenue leaks.',
      qty: '1',
      price: 3800,
    },
    {
      item: 'Installation & Commissioning',
      justification: 'Safe LOTO tie-ins, terminations, and load testing.',
      qty: '1 lot',
      price: 36000,
    },
  ];

  const totalPhase1Price = phase1Items.reduce((sum, row) => sum + row.price, 0); // $102,200

  // 06:00 AM Shift Start Timeline Steps
  const shiftStartSteps = [
    {
      time: '06:00 AM',
      title: 'HMI Start Signal',
      device: 'Control Room SCADA',
      desc: 'Operator initiates daily production sequence from main touch console.',
      icon: Clock,
      color: 'border-[#FFC72C] text-[#FFC72C] bg-[#FFC72C]/10',
    },
    {
      time: '06:00 AM',
      title: 'WEG Soft Starter 20s Ramp',
      device: 'Crusher Motors (110kW, 155kW, 191kW)',
      desc: 'Voltage ramps smoothly over 20 seconds. Peak inrush current capped; zero transformer voltage dip.',
      icon: Zap,
      color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
    },
    {
      time: '06:01 AM',
      title: 'ABB VSD 40Hz Belt Ramp',
      device: 'Primary Conveyor CV-01',
      desc: 'Belt speed smoothly accelerates to 40Hz, preventing belt snapping and material back-spill.',
      icon: Sliders,
      color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
    },
    {
      time: '06:05 AM',
      title: 'BST100 & 19mm Camera Active',
      device: '19mm Optical Sizing Unit',
      desc: 'Optical camera captures falling rock volume while BST100 belt scale registers total weight.',
      icon: Eye,
      color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    },
    {
      time: 'Data Translation',
      title: 'Modbus RTU & Profinet to PLC',
      device: 'Siemens S7-1200 PLC',
      desc: 'Raw motor amps, frequency, and optical counts translated into standardized SCADA telemetry.',
      icon: Server,
      color: 'border-blue-500 text-blue-400 bg-blue-500/10',
    },
    {
      time: 'The Brain',
      title: 'Edge PC Modbus TCP',
      device: 'Fireflies Industrial Edge Unit',
      desc: 'Runs live volumetric AI model to cross-verify scale drift and predict spillage risks.',
      icon: Cpu,
      color: 'border-amber-500 text-amber-400 bg-amber-500/10',
    },
    {
      time: 'Command Center',
      title: 'Live Executive Metrics',
      device: 'SitePilot CEO Console',
      desc: '"Live TPH: 166 t/h. C140 Amps: 110A. Throughput Variance: +0.5%." All parameters optimal.',
      icon: BarChart3,
      color: 'border-emerald-400 text-emerald-300 bg-emerald-400/20',
    },
  ];

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:p-0 print:space-y-4 text-[#E2E8F0]">
      {/* 1. PRELIMINARY ESTIMATE DISCLAIMER BANNER */}
      <div className="bg-amber-950/40 border-2 border-amber-500/80 rounded-2xl p-4 sm:p-5 shadow-lg flex items-start gap-3.5 print:border-black print:bg-amber-100">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 print:text-amber-900" />
        <div className="space-y-1 text-xs sm:text-sm font-mono">
          <p className="text-amber-200 font-bold leading-relaxed print:text-amber-950">
            ⚠️ PRELIMINARY ESTIMATE: These figures are based on our initial site assessment. Management will configure final production targets in the QuarryIQ dashboard.
          </p>
        </div>
      </div>

      {/* 2. EXECUTIVE HEADER CARD */}
      <div className="bg-gradient-to-r from-[#0B0B0F] via-stone-900 to-[#1A1A22] border border-stone-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl print:border-none print:shadow-none print:p-4 print:text-black print:bg-white space-y-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC72C]/10 rounded-full blur-3xl pointer-events-none print:hidden" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#FFC72C]/20 border border-[#FFC72C]/40 text-[#FFC72C] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 print:border-black print:text-black">
                <Building2 className="w-3.5 h-3.5" />
                Presented by Fireflies Energy
              </span>
              <span className="text-xs text-stone-400 font-mono print:text-stone-600">Doc Ref: FE-PHASE1-COMMERCIAL-2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight print:text-stone-900">
              Phase 1 Investment &amp; Justification
            </h1>
            <p className="text-[#FFC72C] text-xs sm:text-sm font-mono mt-1 leading-relaxed">
              Delivery Partners: Ivevane Automation (Electrical &amp; Drives) &amp; Ndebele Visionary Nexus (Fabrication, Assessment, Training, Cybersecurity &amp; Smart Transformation)
            </p>
            <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-3xl print:text-stone-700">
              Turnkey electrical stabilization, soft-starters, variable speed drives, and 19mm optical scale verification stack designed to eliminate grid spikes, belt snapped downtime, and revenue drift.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrintPDF}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFC72C] hover:bg-[#e6b325] text-[#0B0B0F] font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 print:hidden"
            >
              <Download className="w-4 h-4" />
              Print / Save Investment PDF
            </button>
          </div>
        </div>

        {/* 3. HIGHLIGHTED SUPPORT & HANDOVER CALLOUT */}
        <div className="relative z-10 bg-stone-900/90 border border-[#FFC72C]/50 rounded-xl p-4 sm:p-5 text-xs sm:text-sm font-mono space-y-2 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#FFC72C] font-bold text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFC72C]" />
              <span>12-Month Support, Training &amp; Handover</span>
            </div>
            <div className="text-base font-black font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-lg">
              $1,999 / month
            </div>
          </div>
          <p className="text-stone-300 leading-relaxed pt-1">
            Includes remote SCADA monitoring, AI updates, cybersecurity protocols, and on-site training for Harare/Bulawayo staff.
          </p>
        </div>
      </div>

      {/* 4. COMMERCIAL PRICING TABLE CARD */}
      <div className="bg-[#1A1A1F] rounded-2xl border border-stone-800 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#FFC72C]" />
              <h2 className="text-xl font-bold text-white">Phase 1 Commercial Scope &amp; Pricing Breakdown</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 font-mono">
              Itemized turnkey setup including electrical equipment, motor protection, installation, and AI camera hardware.
            </p>
          </div>

          <div className="bg-stone-900 border border-[#FFC72C]/40 rounded-xl px-4 py-2.5 flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-wide">TOTAL PHASE 1 SETUP:</span>
            <span className="text-2xl font-black text-[#FFC72C] font-mono">
              ${totalPhase1Price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse font-mono">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-900/90 text-stone-400 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 rounded-l-lg">Item</th>
                <th className="py-3.5 px-4">Engineering Justification</th>
                <th className="py-3.5 px-4 text-center">Qty</th>
                <th className="py-3.5 px-4 text-right rounded-r-lg">Price (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {phase1Items.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-900/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FFC72C]" />
                      {row.item}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-stone-300 max-w-lg leading-relaxed font-sans text-xs sm:text-sm">
                    {row.justification}
                  </td>
                  <td className="py-4 px-4 text-center text-stone-300 font-bold whitespace-nowrap">
                    {row.qty}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-emerald-400 font-mono text-sm whitespace-nowrap">
                    ${row.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#FFC72C]/50 bg-stone-900 font-bold text-white text-sm">
                <td className="py-4 px-4 font-black text-[#FFC72C] uppercase tracking-wider" colSpan={3}>
                  TOTAL PHASE 1 COMMERCIAL INVESTMENT
                </td>
                <td className="py-4 px-4 text-right font-black text-xl text-[#FFC72C] font-mono">
                  ${totalPhase1Price.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 5. THE REAL-TIME OPERATIONAL STORY (06:00 AM Shift Start) */}
      <div className="bg-[#1A1A1F] rounded-2xl border border-stone-800 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                How It All Communicates: The 06:00 AM Shift Start
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 font-mono">
              Step-by-step real-time signal flow showing electrical soft-starts, drive speed ramps, sensor translation, and executive dashboard metrics.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold self-start sm:self-auto">
            AUTOMATED SEQUENCE ACTIVE
          </span>
        </div>

        {/* Timeline Sequence */}
        <div className="relative space-y-4 before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-stone-800 before:hidden sm:before:block">
          {shiftStartSteps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-[#FFC72C]/40 transition-all shadow-md"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${step.color} shadow-sm z-10`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-stone-800 text-[#FFC72C] border border-stone-700">
                        {step.time}
                      </span>
                      <h3 className="font-bold text-white text-sm sm:text-base">{step.title}</h3>
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded border border-stone-800">
                      {step.device}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-mono leading-relaxed pt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
