import React, { useState } from 'react';
import {
  TrendingUp,
  Zap,
  ShieldCheck,
  Wrench,
  Layers,
  Sun,
  FileText,
  Truck,
  ArrowRight,
  CheckCircle2,
  Cpu,
  BarChart3,
  Flame,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  Sliders
} from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: (targetTab?: string) => void;
  onStartAutoPlayDemo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard, onStartAutoPlayDemo }) => {
  const [annualTonnage, setAnnualTonnage] = useState<number>(1400000);
  const [currentCostPerTon, setCurrentCostPerTon] = useState<number>(4.80);

  // ROI estimation calculations based on QuarryIQ automation benchmark (average 18% cost trim + 4.5% yield gain)
  const estimatedSavings = Math.round(annualTonnage * (currentCostPerTon * 0.18));
  const capacityUpliftTons = Math.round(annualTonnage * 0.08);

  const pillars = [
    {
      id: 'dashboard',
      icon: BarChart3,
      title: 'Rock-to-Revenue KPIs',
      tag: 'Real-Time SCADA',
      desc: 'Live telemetry stream tracking real-time crushed tonnage, grid vs. solar power mix, and unit cost per ton.',
    },
    {
      id: 'what-if',
      icon: Cpu,
      title: 'What-If Simulation Engine',
      tag: 'Executive Strategy',
      desc: 'Stress-test your quarry against 4-hour grid blackouts, sudden 50k-ton export rail orders, and crusher jams.',
    },
    {
      id: 'safety',
      icon: ShieldCheck,
      title: 'Air Quality & Dust Opacity',
      tag: '100% Mines Act Defense',
      desc: 'Continuous optical dust sensors, automated misting cannon triggers, and statutory environmental logs.',
    },
    {
      id: 'maintenance',
      icon: Wrench,
      title: 'Predictive Vibration AI',
      tag: 'Prevent Seizure',
      desc: 'Detect eccentric bearing micro-spalling 140+ hours before catastrophic failure on primary jaw and cone crushers.',
    },
    {
      id: 'digital-twin',
      icon: Layers,
      title: 'Quarry Digital Twin',
      tag: 'Zero Shrinkage',
      desc: 'Material balance equation: Closing Stock = Opening + Mined - Dispatched. Automated stockpile loss auditing.',
    },
    {
      id: 'solar',
      icon: Sun,
      title: 'Solar & "Virtual Battery"',
      tag: 'Tariff Arbitrage',
      desc: 'Store cheap solar energy as crushed rock in surge stockpiles rather than purchasing multi-million-dollar chemical batteries.',
    },
    {
      id: 'reports',
      icon: FileText,
      title: '06:00 AM WhatsApp Digest',
      tag: 'C-Suite Briefing',
      desc: 'Concise executive daily briefing delivered directly to the Managing Director’s smartphone every morning.',
    },
    {
      id: 'weighbridge',
      icon: Truck,
      title: 'Unattended Weighbridge',
      tag: 'Phase 2 Preview',
      desc: 'Driver-free ANPR license plate recognition, automated tare calculation, RFID scans, and anti-theft tare auditing.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-stone-900 flex flex-col">
      {/* Top Banner / Announcement */}
      <div className="bg-[#0B0B0F] border-b border-stone-800 text-stone-300 py-2.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFC72C] text-[#0B0B0F]">
              EXECUTIVE SALES DEMO
            </span>
            <span className="hidden sm:inline text-stone-400">
              Prepared for Granite Mine Managing Director &amp; Board of Directors
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              SCADA Telemetry: Operational
            </span>
            <span className="hidden md:inline font-mono">v4.2 Enterprise</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-stone-200 bg-gradient-to-b from-[#FAF7EE] to-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FFC72C]/20 border border-[#FFC72C]/50 text-stone-900">
                <Sparkles className="w-3.5 h-3.5 text-[#B38300]" />
                Next-Gen Quarry Management Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.1]">
                Turn Raw Granite Into <br />
                <span className="relative inline-block text-stone-950">
                  Maximum Revenue
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFC72C]/40 -z-10 rounded-sm"></span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-700 leading-relaxed font-normal max-w-2xl">
                QuarryIQ unifies your blast pit, primary crushers, surge buffers, 
                solar microgrid, and weighbridge into a single real-time intelligence cockpit. 
                Stop guessing daily yield — command your quarry with mathematical precision.
              </p>

              {/* Main Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onEnterDashboard('dashboard')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#FFC72C] text-[#0B0B0F] shadow-lg shadow-[#FFC72C]/25 hover:bg-[#ffcf47] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-[#e5af1f]"
                >
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#0B0B0F]" />
                </button>

                {onStartAutoPlayDemo && (
                  <button
                    onClick={onStartAutoPlayDemo}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 shadow-xs transition-all cursor-pointer"
                  >
                    <span>▶️ Auto-Play Demo (5 minutes)</span>
                  </button>
                )}

                <button
                  onClick={() => onEnterDashboard('control-room')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-[#0B0B0F] text-[#FFC72C] hover:bg-stone-800 shadow-md transition-all cursor-pointer border border-stone-800"
                >
                  <Sliders className="w-4 h-4 text-[#FFC72C]" />
                  <span>Control Room</span>
                </button>

                <button
                  onClick={() => onEnterDashboard('what-if')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 shadow-xs transition-all cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-[#B38300]" />
                  <span>What-If</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real-time Metso &amp; Sandvik PLC Ingestion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Statutory Mines Act Dust Audit Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Cloud Downtime Microgrid Islanding</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive MD Value Projection Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-stone-300 shadow-xl overflow-hidden">
                <div className="bg-[#0B0B0F] p-6 text-white border-b border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#FFC72C]">
                      Managing Director ROI Simulator
                    </span>
                    <Award className="w-4 h-4 text-[#FFC72C]" />
                  </div>
                  <h3 className="text-xl font-bold">Estimated Operational Value</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Calibrated against 1.2M – 2.5M ton/yr hard-rock granite quarries.
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Sliders */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Annual Granite Tonnage</span>
                        <span className="text-stone-900 font-bold font-mono">
                          {(annualTonnage / 1000000).toFixed(2)}M Tons / Year
                        </span>
                      </div>
                      <input
                        type="range"
                        min="500000"
                        max="3000000"
                        step="100000"
                        value={annualTonnage}
                        onChange={(e) => setAnnualTonnage(Number(e.target.value))}
                        className="w-full accent-[#B38300] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Current Production Cost per Ton</span>
                        <span className="text-stone-900 font-bold font-mono">
                          ${currentCostPerTon.toFixed(2)} / Ton
                        </span>
                      </div>
                      <input
                        type="range"
                        min="3.00"
                        max="8.00"
                        step="0.20"
                        value={currentCostPerTon}
                        onChange={(e) => setCurrentCostPerTon(Number(e.target.value))}
                        className="w-full accent-[#B38300] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculations */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                      <div className="text-[11px] font-semibold text-amber-800 uppercase">
                        Annual Cost Trim
                      </div>
                      <div className="text-xl font-black text-stone-900 mt-0.5 font-mono">
                        ${(estimatedSavings / 1000).toLocaleString()}k
                      </div>
                      <div className="text-[11px] text-stone-600 mt-0.5">
                        Via solar virtual battery &amp; idle stop
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <div className="text-[11px] font-semibold text-emerald-800 uppercase">
                        Uncapped Throughput
                      </div>
                      <div className="text-xl font-black text-stone-900 mt-0.5 font-mono">
                        +{(capacityUpliftTons / 1000).toLocaleString()}k t
                      </div>
                      <div className="text-[11px] text-stone-600 mt-0.5">
                        Through crusher choke-feed tuning
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-stone-400">Total Net Impact Year 1</div>
                      <div className="text-2xl font-black text-[#FFC72C] font-mono">
                        ${((estimatedSavings + capacityUpliftTons * 12.5) / 1000000).toFixed(2)}M EBITDA
                      </div>
                    </div>
                    <button
                      onClick={() => onEnterDashboard('dashboard')}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-[#FFC72C] text-[#0B0B0F] hover:bg-[#ffcf47] transition-all cursor-pointer"
                    >
                      View Live Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid / Pillar Modules */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 border border-stone-200 text-stone-700 mb-3">
            System Modules
          </div>
          <h2 className="text-3xl font-black text-stone-900 sm:text-4xl">
            8 Integrated Pillars of Granite Automation
          </h2>
          <p className="mt-3 text-stone-600 text-base">
            Every module is tailored to address specific cost-leakage vectors in a commercial granite quarry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => onEnterDashboard(pillar.id)}
                className="group relative bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-[#FFC72C] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-stone-900 flex items-center justify-center text-[#FFC72C] group-hover:bg-[#FFC72C] group-hover:text-stone-900 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#0B0B0F] group-hover:text-amber-600">
                  <span>Explore Module</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Executive CTA */}
      <section className="bg-[#0B0B0F] text-white py-14 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider">
              Immediate Executive Demonstration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              Ready to examine the live quarry telemetry?
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-xl">
              Access the interactive dashboard now with live simulated sensors, what-if stress tests, and automated weighbridge logging.
            </p>
          </div>
          <button
            onClick={() => onEnterDashboard('dashboard')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm bg-[#FFC72C] text-[#0B0B0F] hover:bg-[#ffcf47] hover:scale-105 transition-all shadow-lg shadow-[#FFC72C]/20 cursor-pointer"
          >
            <span>Launch Executive Dashboard</span>
            <ArrowRight className="w-4 h-4 text-[#0B0B0F]" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-stone-800 text-center text-xs text-stone-500 font-mono">
          Fireflies Energy (Pvt) Ltd | QuarryIQ Demo v1.0 | For Davis Granite Discussion Purposes Only
        </div>
      </section>
    </div>
  );
};
