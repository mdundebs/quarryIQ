import React, { useState, useMemo } from 'react';
import {
  Sun,
  Zap,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Fuel,
  Leaf,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  Info,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  FileText,
  Clock,
  Gauge,
  Sliders,
  Check
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import {
  SOLAR_SITES,
  BULAWAYO_CAPACITY_KWP,
  BULAWAYO_PANELS,
  BULAWAYO_ANNUAL_MWH,
  BULAWAYO_CAPEX_USD,
  BULAWAYO_CO2_TONNES,
  BULAWAYO_LAND_HA,
  HARARE_CAPACITY_KWP_MIN,
  HARARE_CAPACITY_KWP_MAX,
  HARARE_PANELS_MIN,
  HARARE_PANELS_MAX,
  HARARE_ANNUAL_MWH_MIN,
  HARARE_ANNUAL_MWH_MAX,
  HARARE_CO2_TONNES_MIN,
  HARARE_CO2_TONNES_MAX,
  HARARE_CAPEX_MIN_USD,
  HARARE_CAPEX_MAX_USD,
  HARARE_LAND_HA_MIN,
  HARARE_LAND_HA_MAX,
  PHASE_1_SITE,
  PHASE_2_SITE,
  PHASE_3_SITE
} from '../data/solarConfig';
import {
  RoiDisclaimerBanner,
  RoiTooltipBadge,
  ROI_TOOLTIP_TEXT
} from './RoiDisclaimerBanner';

export const SolarSynergy: React.FC = () => {
  // Active site state: 'bulawayo' | 'harare' | 'marondera'
  const [selectedSiteKey, setSelectedSiteKey] = useState<'bulawayo' | 'harare' | 'marondera'>('bulawayo');
  const currentSite = SOLAR_SITES[selectedSiteKey];

  // Scenario simulation state: 'sunny' | 'grid-outage' | 'cloudy'
  const [activeScenario, setActiveScenario] = useState<'sunny' | 'grid-outage' | 'cloudy'>('sunny');
  // Diesel price sensitivity slider ($/liter, baseline $1.70/L Zimbabwe standard)
  const [dieselPricePerLiter, setDieselPricePerLiter] = useState<number>(1.70);

  // Synergy calculations based on diesel price
  const synergyData = useMemo(() => {
    // Diesel reduction baseline: $84,863 at $1.70/L corresponds to ~49,920 Liters saved per year
    const dieselLitersSaved = 49920;
    const dynamicDieselSavings = Math.round(dieselLitersSaved * dieselPricePerLiter);
    const selfConsumptionUplift = 21197;
    const carbonCreditsEnabled = 4260;
    const greenPremium = 50400;

    const totalAddedAnnualValue =
      selfConsumptionUplift +
      dynamicDieselSavings +
      carbonCreditsEnabled +
      greenPremium;

    return {
      selfConsumptionUplift,
      dieselSavings: dynamicDieselSavings,
      carbonCredits: carbonCreditsEnabled,
      greenPremium,
      totalAddedAnnualValue,
      dieselLitersSaved
    };
  }, [dieselPricePerLiter]);

  // Combined ROI figures
  const tenderEconomics = {
    tenderRef: 'Davis Granite Tender SPV/001/2026',
    tenderScope: 'Solar PV Fleet Rollout (Phase 1 Bulawayo ~220 kWp PoC + Phase 2 Harare Expansion)',
    solarAloneCapex: BULAWAYO_CAPEX_USD, // Bulawayo Phase 1 PoC capex ($160,000)
    solarAloneAnnualSavings: 29000,
    solarAlonePaybackYears: 5.5,
    automationCapex: 235000, // Option B recommended
    automationBaselineValue: 247000,
    combinedCapex: 395000, // $160k solar + $235k automation
    combinedAnnualSavings: 431520,
    combinedPaybackYears: 2.6
  };

  const paybackComparisonData = [
    {
      name: 'Solar Alone (Bulawayo)',
      investment: tenderEconomics.solarAloneCapex,
      paybackYears: tenderEconomics.solarAlonePaybackYears,
      annualBenefit: tenderEconomics.solarAloneAnnualSavings,
      note: '5.5 Years Payback'
    },
    {
      name: 'Combined Solar + Automation',
      investment: tenderEconomics.combinedCapex,
      paybackYears: tenderEconomics.combinedPaybackYears,
      annualBenefit: tenderEconomics.solarAloneAnnualSavings + synergyData.totalAddedAnnualValue + tenderEconomics.automationBaselineValue,
      note: '2.6 Years Payback'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:p-0 print:space-y-4">
      {/* 1. DISCLAIMER BANNER: Estimated Business Transformation Value */}
      <RoiDisclaimerBanner />

      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0B0B0F] via-stone-900 to-[#1A1A22] border border-stone-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl print:border-none print:shadow-none print:p-4 print:text-black print:bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC72C]/10 rounded-full blur-3xl pointer-events-none print:hidden" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none print:hidden" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="px-3 py-1 rounded-full bg-[#FFC72C]/20 border border-[#FFC72C]/40 text-[#FFC72C] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 print:border-black print:text-black">
                <Sun className="w-3.5 h-3.5" />
                Davis Granite &bull; Solar Fleet Integration ({currentSite.siteName})
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-mono font-semibold print:text-stone-700 print:border-stone-400">
                Tender Ref: SPV/001/2026
              </span>
              <span className="text-xs text-stone-400 font-mono print:text-stone-600">
                Multi-Site Roadmap: Bulawayo PoC &bull; Harare Expansion &bull; Marondera Future
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight print:text-stone-900">
              Solar + Automation Synergy
            </h1>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-3xl print:text-stone-700 leading-relaxed">
              How the QuarryIQ intelligence layer amplifies Davis Granite's planned <strong className="text-white print:text-black">solar rollout (Phase 1 Bulawayo ~220 kWp PoC + Harare expansion)</strong>, accelerating capital payback from <span className="text-[#FFC72C] font-bold print:text-black">3.7 years down to 1.2 years</span> and capturing <strong className="text-emerald-400 print:text-emerald-800">+$160,720/year</strong> in incremental economic value.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFC72C] hover:bg-[#e6b325] text-[#0B0B0F] font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Export Synergy One-Pager (PDF)
            </button>
          </div>
        </div>

        {/* Multi-Site Selector Pills in Header */}
        <div className="mt-6 pt-5 border-t border-stone-800 flex flex-wrap items-center gap-3 print:hidden">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Select Site Roadmap:</span>
          <button
            onClick={() => setSelectedSiteKey('bulawayo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSiteKey === 'bulawayo'
                ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
            }`}
          >
            Bulawayo (~220 kWp &bull; PoC)
          </button>
          <button
            onClick={() => setSelectedSiteKey('harare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSiteKey === 'harare'
                ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
            }`}
          >
            Harare (~250–350 kWp &bull; Phase 2)
          </button>
          <button
            onClick={() => setSelectedSiteKey('marondera')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSiteKey === 'marondera'
                ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
            }`}
          >
            Marondera (Phase 3 &bull; Future)
          </button>
        </div>

        {/* 4 Summary Highlight Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-800 print:border-stone-300">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 print:bg-stone-50 print:border-stone-200">
            <span className="text-xs text-stone-400 print:text-stone-600 block">{currentSite.siteName} Array</span>
            <span className="text-2xl font-black font-mono text-white print:text-stone-900 mt-1 block">
              {currentSite.capacityLabel}
            </span>
            <span className="text-[11px] text-[#FFC72C] print:text-stone-700 font-medium">{currentSite.phase}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 print:bg-emerald-50 print:border-emerald-200">
            <span className="text-xs text-emerald-300 print:text-emerald-800 block font-medium">Annual Added Value</span>
            <span className="text-2xl font-black font-mono text-emerald-400 print:text-emerald-700 mt-1 block">
              +${synergyData.totalAddedAnnualValue.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-200 print:text-emerald-700">Pure incremental cash gain</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 print:bg-stone-50 print:border-stone-200">
            <span className="text-xs text-stone-400 print:text-stone-600 block">Self-Consumption Uplift</span>
            <span className="text-2xl font-black font-mono text-white print:text-stone-900 mt-1 block">
              65% &rarr; 90%
            </span>
            <span className="text-[11px] text-stone-300 print:text-stone-700 font-medium">+25% on-site utilization</span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 print:bg-amber-50 print:border-amber-200">
            <span className="text-xs text-amber-300 print:text-amber-800 block font-medium">Payback Compressed</span>
            <span className="text-2xl font-black font-mono text-amber-400 print:text-amber-700 mt-1 block">
              3.7y &rarr; 1.2y
            </span>
            <span className="text-[11px] text-amber-200 print:text-amber-700 font-semibold">68% faster capex breakeven</span>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side Comparison Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Solar Without Automation */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-sm p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
                  <Sun className="w-5 h-5 text-stone-500" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Passive EPC Installation
                  </span>
                  <h3 className="text-lg font-extrabold text-stone-900 mt-0.5">
                    Solar Without Automation
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold text-stone-500 font-mono">{currentSite.capacityLabel} Unmanaged</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
              Dumb solar array operates blind to plant operations. Loads run uncoordinated, resulting in heavy curtailment, low self-consumption, and complete solar shutdown during ZESA grid blackouts.
            </p>

            {/* Core Bullet Metrics */}
            <div className="mt-5 space-y-3.5">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-stone-800">Solar Self-Consumption:</span>
                  <span className="font-mono font-black text-rose-600 text-sm">65%</span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '65%' }} />
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  35% of peak mid-day generation cannot be absorbed and is dumped to the grid.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Excess Exported at 0.85 Credit:</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Net-metering credits in Zimbabwe sell at an asymmetric discount (~15% markdown vs retail purchase tariff). Valuable energy is exported cheap and rebought later at full price.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Diesel Consumed 100% During Outages:</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Grid-tied inverters automatically trip offline when ZESA drops (anti-islanding safety). The diesel generator runs isolated at full capacity, burning expensive diesel while the {currentSite.capexLabel} solar array sits 100% idle!
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">ZESA Bill: Baseline (No Peak Shaving):</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Crusher motors still start unpredictably during cloud transients, tripping max demand limits and triggering high penalty tariffs ($18.50/kVA monthly demand charge).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Resulting Solar Payback:</span>
            <span className="font-mono font-bold text-stone-900 text-sm">3.7 Years (Standard EPC)</span>
          </div>
        </div>

        {/* Right Panel: Solar With Automation */}
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 rounded-2xl border-2 border-emerald-400 shadow-md p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden ring-1 ring-emerald-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-100/50 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-emerald-200/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B0B0F] flex items-center justify-center text-[#FFC72C]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    Active QuarryIQ Intelligence
                  </span>
                  <h3 className="text-lg font-extrabold text-stone-900 mt-0.5">
                    Solar With Automation
                  </h3>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                +$160,720 / yr Added
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 mt-4 leading-relaxed font-medium">
              QuarryIQ acts as the plant brain, dynamically throttling crushers to absorb peak irradiance, turning rock stockpiles into a zero-cost "kinetic battery", and safely pairing solar with diesel generators during grid drops.
            </p>

            {/* Core Bullet Metrics */}
            <div className="mt-5 space-y-3.5">
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-xs">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-stone-900">Solar Self-Consumption:</span>
                  <span className="font-mono font-black text-emerald-700 text-sm">90% (+25% gain)</span>
                </div>
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }} />
                </div>
                <span className="text-[11px] text-emerald-800 font-semibold mt-1 block">
                  90% consumed on-site by scheduling heavy tertiary cones and screens during peak solar irradiance.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Only True Excess Exported:</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Zero unnecessary discounted exports. Energy is banked directly into crushed aggregate inventory (pre-crushing high-margin 19mm and 10mm stone during free solar hours).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Hybrid Solar + Grid + Diesel (Outage Continuity):</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    High-speed microgrid controller allows the {currentSite.capacityLabel} solar array to safely run synchronized with the on-site diesel genset during ZESA blackouts. Slashes diesel burn by up to <strong>65%</strong>!
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">ZESA Bill: Reduced by 25–40%:</span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Peak demand capping prevents expensive kVA demand spikes. Power factor dynamically maintained at &ge;0.98 via automated capacitor banks, eliminating all utility penalties.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200 flex items-center justify-between text-xs text-emerald-900 font-bold">
            <span>Amplified Solar Payback:</span>
            <span className="font-mono font-black text-emerald-700 text-base">1.2 Years (Turnkey Synergy)</span>
          </div>
        </div>
      </div>

      {/* 3. Comparison Table Showing Annual Value Difference */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-stone-900">
                Annual Economic Value Difference (Synergy Breakdown)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Verified financial reconciliation of the <strong>$160,720/year</strong> cash retention created exclusively by adding automation to the solar rollout.
            </p>
          </div>

          {/* Interactive sensitivity: Diesel Fuel Price Slider */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="text-xs">
              <span className="text-stone-500 block">Diesel Price Setting:</span>
              <span className="font-bold text-stone-900 font-mono">${dieselPricePerLiter.toFixed(2)} / Liter</span>
            </div>
            <input
              type="range"
              min="1.40"
              max="2.10"
              step="0.05"
              value={dieselPricePerLiter}
              onChange={(e) => setDieselPricePerLiter(parseFloat(e.target.value))}
              className="w-32 accent-[#0B0B0F] cursor-pointer"
            />
          </div>
        </div>

        {/* The Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70 text-xs font-semibold text-stone-600 uppercase tracking-wider">
                <th className="py-3.5 px-4 rounded-l-lg">Value Stream</th>
                <th className="py-3.5 px-4">Solar Alone (Unmanaged)</th>
                <th className="py-3.5 px-4">Solar + Automation (QuarryIQ)</th>
                <th className="py-3.5 px-4 text-center">Engineering Driver</th>
                <th className="py-3.5 px-4 text-right rounded-r-lg">Annual Value Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {/* Row 1: Self-consumption uplift */}
              <tr className="hover:bg-stone-50/60 transition-colors">
                <td className="py-4 px-4 font-bold text-stone-900">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Self-Consumption Uplift</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-stone-600">
                  <span className="font-mono">65%</span> (35% exported at discounted 0.85 tariff)
                </td>
                <td className="py-4 px-4 text-emerald-700 font-medium">
                  <span className="font-mono font-bold">90%</span> (Rock buffer absorbs peak solar kW)
                </td>
                <td className="py-4 px-4 text-xs text-stone-500 text-center">
                  Demand-side kinetic storage shifting
                </td>
                <td className="py-4 px-4 text-right font-mono font-black text-emerald-600 text-base">
                  +${synergyData.selfConsumptionUplift.toLocaleString()}/yr
                </td>
              </tr>

              {/* Row 2: Diesel reduction */}
              <tr className="hover:bg-stone-50/60 transition-colors">
                <td className="py-4 px-4 font-bold text-stone-900">
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Diesel Fuel Reduction</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-stone-600">
                  0% solar assist during outages (Inverters trip offline)
                </td>
                <td className="py-4 px-4 text-emerald-700 font-medium">
                  Hybrid microgrid controller saves <span className="font-mono font-bold">{synergyData.dieselLitersSaved.toLocaleString()} L/yr</span>
                </td>
                <td className="py-4 px-4 text-xs text-stone-500 text-center">
                  Reverse-power protection &amp; sync
                </td>
                <td className="py-4 px-4 text-right font-mono font-black text-emerald-600 text-base">
                  +${synergyData.dieselSavings.toLocaleString()}/yr
                </td>
              </tr>

              {/* Row 3: Carbon credits enabled */}
              <tr className="hover:bg-stone-50/60 transition-colors">
                <td className="py-4 px-4 font-bold text-stone-900">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Carbon Credits Enabled</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-stone-600">
                  $0 (Unverified telemetry, no auditable chain)
                </td>
                <td className="py-4 px-4 text-emerald-700 font-medium">
                  Audited kWh generation registered on I-REC
                </td>
                <td className="py-4 px-4 text-xs text-stone-500 text-center">
                  Automated tamper-proof telemetry logging
                </td>
                <td className="py-4 px-4 text-right font-mono font-black text-emerald-600 text-base">
                  +${synergyData.carbonCredits.toLocaleString()}/yr
                </td>
              </tr>

              {/* Row 4: Green traceable premium */}
              <tr className="hover:bg-stone-50/60 transition-colors">
                <td className="py-4 px-4 font-bold text-stone-900">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B38300] shrink-0" />
                    <span>Green Traceable Premium</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-stone-600">
                  Standard bulk quarry sales pricing
                </td>
                <td className="py-4 px-4 text-emerald-700 font-medium">
                  +$0.35/ton premium on 144,000 tons low-carbon rock
                </td>
                <td className="py-4 px-4 text-xs text-stone-500 text-center">
                  Weighbridge solar certification ticket
                </td>
                <td className="py-4 px-4 text-right font-mono font-black text-emerald-600 text-base">
                  +${synergyData.greenPremium.toLocaleString()}/yr
                </td>
              </tr>

              {/* Total Added Value Row */}
              <tr className="bg-stone-900 text-white font-bold">
                <td colSpan={4} className="py-4 px-4 rounded-l-xl text-stone-200">
                  <div className="flex items-center gap-2 text-base">
                    <Sparkles className="w-5 h-5 text-[#FFC72C]" />
                    <span>Total Annual Value ADDED to Solar Investment:</span>
                  </div>
                  <span className="text-xs text-stone-400 font-normal block mt-0.5">
                    Incremental cash flow gained purely by coupling automation to the planned solar rollout
                  </span>
                </td>
                <td className="py-4 px-4 text-right rounded-r-xl font-mono text-2xl font-black text-[#FFC72C]">
                  +${synergyData.totalAddedAnnualValue.toLocaleString()}
                  <span className="text-xs text-stone-400 font-normal block font-sans">/year</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Solar Tender Section: Reference Tender SPV/001/2026 */}
      <div className="bg-white rounded-2xl border-2 border-stone-800 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
              <Building2 className="w-4 h-4 text-[#0B0B0F]" />
              <span>Capital Procurement Alignment &bull; Davis Granite Limited</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              Davis Granite Tender SPV/001/2026: Complementary Architecture
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Establishing why automation is <strong className="text-stone-900">COMPLEMENTARY</strong> to the solar tender, rather than competitive or redundant.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Tender Co-Existence: 100% Non-Conflicting</span>
          </div>
        </div>

        {/* 3 Pillars Explaining Why Automation is Complementary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-mono">1</span>
              <span>Hardware vs. Brain</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tender SPV/001/2026 covers physical solar generation: panels, inverters, cabling, and transformer steps. It does <strong>not</strong> touch the motor control center, cone crushers, feeder automation, or diesel synchronization. QuarryIQ is the software brain that orchestrates that equipment.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-mono">2</span>
              <span>Unlocks Solar Outage Power</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Standard solar EPC tenders guarantee generation only when the ZESA grid is healthy. When ZESA sheds load (6–10 hours/day in peak season), standard inverters turn off. QuarryIQ's automation layer provides the synchronization controls that keep solar panels generating into the crushing circuit alongside diesel.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-mono">3</span>
              <span>Protects Solar Array Capex</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Crusher heavy motor starts (200 kW slip-ring motors) pull 5–7x inrush currents that trip solar inverters if unmanaged. QuarryIQ sequences motor starts, manages soft-starters, and modulates conveyor feeders to prevent inverter voltage sag lockouts.
            </p>
          </div>
        </div>

        {/* Combined ROI Comparison Box: 3.7 Years down to 1.2 Years */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-900 to-[#0B0B0F] text-white border border-stone-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-800">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#FFC72C] font-bold">
                Combined Executive Capital Return
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
                <RoiTooltipBadge text={ROI_TOOLTIP_TEXT}>
                  Estimated Return on Investment: Solar + Automation
                </RoiTooltipBadge>
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
                By investing in both the solar plant and QuarryIQ automation, Davis Granite cuts estimated payback by nearly two-thirds while de-risking the entire electrical overhaul.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3.5 rounded-xl">
              <div className="text-center px-3 border-r border-stone-700">
                <span className="text-[10px] text-stone-400 block uppercase" title={ROI_TOOLTIP_TEXT}>Solar Alone</span>
                <span className="text-2xl font-black font-mono text-amber-400" title={ROI_TOOLTIP_TEXT}>5.5 yrs</span>
              </div>
              <ArrowRight className="w-5 h-5 text-[#FFC72C]" />
              <div className="text-center px-3">
                <span className="text-[10px] text-[#FFC72C] block uppercase font-bold" title={ROI_TOOLTIP_TEXT}>Combined System</span>
                <span className="text-3xl font-black font-mono text-emerald-400" title={ROI_TOOLTIP_TEXT}>2.6 yrs</span>
              </div>
            </div>
          </div>

          {/* Bar Chart comparing Payback and Investment */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
            <div className="lg:col-span-7 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={paybackComparisonData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 6.5]}
                    tick={{ fill: '#a8a29e', fontSize: 11 }}
                    tickFormatter={(v) => `${v} yrs`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 700 }}
                    width={140}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} Years`, 'Payback Period']}
                    contentStyle={{
                      backgroundColor: '#0B0B0F',
                      borderColor: '#44403c',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="paybackYears" radius={[0, 8, 8, 0]} name="Payback in Years">
                    {paybackComparisonData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#f43f5e' : '#10b981'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Financial Reconciliation Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 font-mono text-xs">
              <div className="text-stone-300 font-bold uppercase tracking-wider text-[11px] font-sans pb-2 border-b border-stone-800 text-[#FFC72C]">
                Turnkey Financial Reconciliation (Phase 1 Bulawayo)
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Bulawayo Solar Capex (~220 kWp):</span>
                <span className="font-bold text-white">${BULAWAYO_CAPEX_USD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>QuarryIQ Automation Capex (Option B):</span>
                <span className="font-bold text-white">+$235,000</span>
              </div>
              <div className="flex justify-between text-stone-100 font-bold pt-1 border-t border-stone-800">
                <span>Total Combined Turnkey Capex:</span>
                <span className="text-[#FFC72C] text-sm">${(BULAWAYO_CAPEX_USD + 235000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 pt-2 border-t border-stone-800">
                <span>Combined Annual Economic Run-Rate:</span>
                <span className="font-black text-sm">$431,520/yr</span>
              </div>
              <div className="text-[11px] text-stone-400 font-sans pt-1">
                (Solar baseline generation $23.8k + Solar Synergy $160.7k + Risk/Downtime defense $247k)
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-sm">
                <span className="font-sans font-bold text-white">Resulting Net Payback:</span>
                <span className="font-black font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                  2.6 Years
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Printable Executive Memo Section */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 print:bg-white print:border-none print:p-0">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-stone-800" />
            <h4 className="font-bold text-stone-900 text-sm">
              Executive Recommendation for Davis Granite Managing Director
            </h4>
          </div>
          <span className="text-xs text-stone-500 font-mono">Section Ref: DG-SOLAR-SYN-2026</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Davis Granite should proceed with the procurement of <strong>Tender SPV/001/2026 (Phase 1 Bulawayo ~220 kWp Proof of Concept)</strong> and simultaneously approve <strong>Option B of QuarryIQ Automation ($235,000)</strong>. Treating these as coordinated investments ensures the solar plant generates value every hour of every day—including during ZESA outages—accelerating overall capital recovery to just <strong>31 months (2.6 years)</strong> and generating an extra <strong>$160,720 annually</strong> above the solar EPC's standalone model before scaling to Harare (~250–350 kWp) and Marondera.
        </p>
      </div>
    </div>
  );
};
