import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Ship,
  Wrench,
  Sun,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  DollarSign,
  ShieldAlert,
  Sliders,
  Sparkles
} from 'lucide-react';
import { SCENARIOS, ScenarioResult } from '../mockData';

export const WhatIfSimulator: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('power-cut');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [activeResult, setActiveResult] = useState<ScenarioResult>(SCENARIOS[0]);

  const handleTriggerScenario = (scenario: ScenarioResult) => {
    setSelectedScenarioId(scenario.id);
    setIsLoading(true);

    const steps = [
      'Ingesting SCADA feed & current stockpile states...',
      'Computing dynamic power grid & load shed topology...',
      'Simulating crusher closed-side settings (CSS) & material yield...',
      'Executing QuarryIQ predictive revenue reconciliation...',
    ];

    setLoadingStep(steps[0]);

    setTimeout(() => {
      setLoadingStep(steps[1]);
    }, 500);

    setTimeout(() => {
      setLoadingStep(steps[2]);
    }, 1100);

    setTimeout(() => {
      setLoadingStep(steps[3]);
    }, 1600);

    setTimeout(() => {
      setActiveResult(scenario);
      setIsLoading(false);
    }, 2000);
  };

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'power-cut':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'large-order':
        return <Ship className="w-5 h-5 text-blue-500" />;
      case 'crusher-bearing':
        return <Wrench className="w-5 h-5 text-red-500" />;
      case 'solar-surfeit':
        return <Sun className="w-5 h-5 text-[#B38300]" />;
      case 'diesel-spike':
        return <Flame className="w-5 h-5 text-orange-500" />;
      default:
        return <Cpu className="w-5 h-5 text-[#B38300]" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-stone-900 text-[#FFC72C] mb-2">
              <Cpu className="w-3.5 h-3.5" />
              Executive Decision Simulator
            </div>
            <h2 className="text-2xl font-black text-stone-900">
              Stress-Test Quarry Operations &amp; Cash Flow
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-3xl">
              Select any real-world disruption below. The QuarryIQ digital simulation engine recalculates 
              energy routing, equipment choke points, product fractions, and net P&amp;L impact in real time.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-100 border border-stone-200 text-stone-600 text-xs font-medium self-start md:self-auto">
            <Sparkles className="w-4 h-4 text-[#B38300]" />
            <span>2-Second Physics Engine Recalculation</span>
          </div>
        </div>
      </div>

      {/* Scenario Buttons Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {SCENARIOS.map((scen) => {
          const isSelected = selectedScenarioId === scen.id;
          return (
            <button
              key={scen.id}
              onClick={() => handleTriggerScenario(scen)}
              disabled={isLoading}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0B0B0F] text-white border-stone-900 shadow-md scale-[1.01]'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-[#FFC72C] hover:bg-stone-50/80 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-stone-800' : 'bg-stone-100'}`}>
                    {getScenarioIcon(scen.id)}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#FFC72C] text-[#0B0B0F]'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {scen.category}
                  </span>
                </div>
                <h4 className="font-bold text-sm leading-snug">{scen.title}</h4>
                <p className={`text-xs mt-1.5 line-clamp-2 ${isSelected ? 'text-stone-400' : 'text-stone-500'}`}>
                  {scen.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-stone-100/20 flex items-center justify-between text-xs font-bold">
                <span className={isSelected ? 'text-[#FFC72C]' : 'text-stone-700'}>
                  Simulate
                </span>
                <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FFC72C]' : 'text-stone-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Loading Spinner Screen OR Result Display */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-16 shadow-lg text-center flex flex-col items-center justify-center min-h-[420px] transition-all">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-stone-200 border-t-[#FFC72C] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-stone-900" />
            </div>
          </div>
          <h3 className="text-xl font-black text-stone-900 mt-6">
            Running Quarry Digital Twin Physics Engine...
          </h3>
          <p className="text-sm text-stone-600 font-mono mt-2 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200">
            {loadingStep}
          </p>
          <div className="flex items-center gap-2 text-xs text-stone-400 mt-6">
            <span className="w-2 h-2 rounded-full bg-[#FFC72C] animate-ping"></span>
            Simulating 24-hour plant material balance &amp; energy cost vectors
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Scenario Result Card */}
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-md overflow-hidden">
            {/* Dark Top Header of the Result */}
            <div className="bg-[#0B0B0F] text-white p-6 sm:p-8 border-b border-stone-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                      {activeResult.badge}
                    </span>
                    <span className="text-xs text-stone-400">Simulation ID: {activeResult.id}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {activeResult.title}
                  </h3>
                  <p className="text-stone-300 text-sm mt-2 max-w-3xl leading-relaxed">
                    {activeResult.headlineSummary}
                  </p>
                </div>

                <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 text-right self-start md:self-auto min-w-[200px]">
                  <span className="text-xs text-stone-400 block font-semibold">Net Financial Impact</span>
                  <span className="text-2xl font-black text-[#FFC72C] font-mono block mt-0.5">
                    {activeResult.financialImpactUSD}
                  </span>
                  <span className="text-[11px] text-stone-400">Compared to unmanaged event</span>
                </div>
              </div>
            </div>

            {/* Metrics Before vs After Grid */}
            <div className="p-6 sm:p-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#B38300]" />
                Key Operational Metric Deltas
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeResult.impactMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200/90 bg-[#FFFDF7] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-stone-600 block">{m.metric}</span>
                      <div className="mt-3 flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-stone-400 block">Baseline</span>
                          <span className="text-sm font-semibold text-stone-600 line-through font-mono">
                            {m.before}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-emerald-800 font-semibold block">QuarryIQ</span>
                          <span className="text-lg font-black text-stone-900 font-mono">
                            {m.after}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">Variance:</span>
                      <span className="font-bold text-emerald-700 font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                        {m.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Automated Actions Taken */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-stone-50 rounded-xl p-5 border border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Automated System Interventions Executed
                  </h4>
                  <ul className="space-y-2.5">
                    {activeResult.automatedMitigations.map((action, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 bg-amber-50/60 rounded-xl p-5 border border-amber-200 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-700" />
                      Executive Managing Director Takeaway
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                      "{activeResult.executiveTakeaway}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs text-amber-800">
                    <span className="font-semibold">Automation Status: Verified</span>
                    <span className="font-mono font-bold">100% Autonomous</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
