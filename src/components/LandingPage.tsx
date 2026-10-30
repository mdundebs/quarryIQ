import React from 'react';
import {
  Zap,
  ShieldCheck,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Cpu,
  BarChart3,
  Award,
  Clock,
  Sparkles,
  Sliders,
  AlertTriangle,
  Camera,
  DollarSign
} from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: (targetTab?: string) => void;
  onStartAutoPlayDemo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard, onStartAutoPlayDemo }) => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#E2E8F0] flex flex-col font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1A1F] border-b border-stone-800 text-stone-300 py-2.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFC72C] text-[#0B0B0F]">
              EXECUTIVE BRIEFING
            </span>
            <span className="hidden sm:inline text-stone-300">
              Presented by Fireflies Energy &bull; Ivevane Automation &bull; Ndebele Visionary Nexus
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Phase 1 Electrical Stabilization
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-stone-800 bg-gradient-to-b from-[#0B0B0F] via-stone-900 to-[#0B0B0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-mono bg-[#FFC72C]/20 border border-[#FFC72C]/50 text-[#FFC72C]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC72C]" />
                Phase 1 Scope: Electrical Stabilization &amp; Optical Scale Test
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Zero Unplanned Downtime. <br />
                <span className="relative inline-block text-[#FFC72C]">
                  Zero Spillage.
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFC72C]/20 -z-10 rounded-sm"></span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans max-w-2xl">
                QuarryIQ Phase 1 stabilizes your primary crushing circuit with ABB Variable Speed Drives, WEG Soft Starters, and a 19mm optical test camera to verify belt scale accuracy.
              </p>

              {/* Main Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 font-mono">
                <button
                  onClick={() => onEnterDashboard('dashboard')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#FFC72C] text-[#0B0B0F] shadow-lg hover:bg-[#ffcf47] hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>CEO View Console</span>
                  <ArrowRight className="w-4 h-4 text-[#0B0B0F]" />
                </button>

                <button
                  onClick={() => onEnterDashboard('pricing-roi')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-stone-900 text-[#FFC72C] hover:bg-stone-800 border border-stone-800 transition-all cursor-pointer"
                >
                  <DollarSign className="w-4 h-4 text-[#FFC72C]" />
                  <span>Phase 1 Proposal ($102,200)</span>
                </button>

                {onStartAutoPlayDemo && (
                  <button
                    onClick={onStartAutoPlayDemo}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all cursor-pointer"
                  >
                    <span>▶️ Auto-Play Presentation</span>
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center gap-6 text-xs text-stone-400 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ABB VSD 22kW Drive Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>WEG Soft Starter Voltage Ramp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>19mm Optical Scale Cross-Verification</span>
                </div>
              </div>
            </div>

            {/* Right Column: Commercial Scope Summary Card */}
            <div className="lg:col-span-5 font-mono">
              <div className="bg-[#1A1A1F] rounded-2xl border border-stone-800 shadow-2xl overflow-hidden">
                <div className="bg-[#0B0B0F] p-6 text-white border-b border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#FFC72C]">
                      Phase 1 Commercial Scope
                    </span>
                    <Award className="w-4 h-4 text-[#FFC72C]" />
                  </div>
                  <h3 className="text-xl font-bold">Turnkey Setup &amp; Support</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Fixed preliminary quote for Davis Granite plant overhaul.
                  </p>
                </div>

                <div className="p-6 space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/60 text-amber-200">
                    <strong className="text-[#FFC72C]">⚠️ PRELIMINARY ESTIMATES:</strong> Production targets (4,000 t/day) and baseline (1,000 t/day) are placeholders based on initial assessment. Management will configure final targets in QuarryIQ.
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-stone-300">ABB VSDs (22kW) x 4</span>
                      <span className="font-bold text-white">$25,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-stone-300">WEG Soft Starters x 3</span>
                      <span className="font-bold text-white">$34,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-stone-300">Relays &amp; Heavy Cabling</span>
                      <span className="font-bold text-white">$3,400</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-stone-300">Ivevane Installation &amp; Comm.</span>
                      <span className="font-bold text-white">$36,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-stone-300">Fireflies Edge PC &amp; 1x Test Camera</span>
                      <span className="font-bold text-white">$3,800</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-900 border border-[#FFC72C]/40 text-white flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-stone-400">Total Turnkey Setup</div>
                      <div className="text-2xl font-black text-[#FFC72C] font-mono">$102,200</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-stone-400">12-Mo Support</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">$1,999 / mo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 border border-stone-800 text-[#FFC72C] mb-3">
            Core Phase 1 Focus
          </div>
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            4 Core Phase 1 Operational Pillars
          </h2>
          <p className="mt-3 text-stone-400 text-sm">
            Strictly tailored to electrical stabilization, motor protection, and optical scale verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => onEnterDashboard('dashboard')}
            className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-6 hover:border-[#FFC72C] transition-all cursor-pointer space-y-3"
          >
            <BarChart3 className="w-8 h-8 text-[#FFC72C]" />
            <h3 className="font-bold text-white text-base">1. CEO View Console</h3>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              High-level operational targets (4,000 t/day), live TPH (166 t/h), and plain-English risk alerts.
            </p>
          </div>

          <div
            onClick={() => onEnterDashboard('pricing-roi')}
            className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-6 hover:border-[#FFC72C] transition-all cursor-pointer space-y-3"
          >
            <DollarSign className="w-8 h-8 text-[#FFC72C]" />
            <h3 className="font-bold text-white text-base">2. Phase 1 Investment</h3>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              Itemized $102,200 setup quote, $1,999/mo support breakdown, and 06:00 AM shift start story.
            </p>
          </div>

          <div
            onClick={() => onEnterDashboard('control-room')}
            className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-6 hover:border-[#FFC72C] transition-all cursor-pointer space-y-3"
          >
            <Camera className="w-8 h-8 text-[#FFC72C]" />
            <h3 className="font-bold text-white text-base">3. Throughput Test</h3>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              1x 1080p optical test camera at 19mm discharge cross-referencing BST100 belt scale drift.
            </p>
          </div>

          <div
            onClick={() => onEnterDashboard('maintenance')}
            className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-6 hover:border-[#FFC72C] transition-all cursor-pointer space-y-3"
          >
            <Wrench className="w-8 h-8 text-[#FFC72C]" />
            <h3 className="font-bold text-white text-base">4. Electrical Health</h3>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              Real-time telemetry for ABB VSDs, WEG Soft Starters, Siemens PLC, and BST100 Scale.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
