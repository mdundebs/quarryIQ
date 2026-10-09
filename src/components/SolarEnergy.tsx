import React, { useState, useMemo } from 'react';
import {
  Sun,
  Cloud,
  Zap,
  BatteryCharging,
  DollarSign,
  TrendingDown,
  Clock,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Info,
  MapPin,
  Building2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ENERGY_DATA } from '../mockData';
import {
  SOLAR_SITES,
  BULAWAYO_CAPACITY_KWP,
  BULAWAYO_PANELS,
  BULAWAYO_ANNUAL_MWH,
  BULAWAYO_CAPEX_USD,
  BULAWAYO_CO2_TONNES,
  BULAWAYO_LAND_HA,
  PHASE_1_SITE,
  PHASE_2_SITE,
  PHASE_3_SITE
} from '../data/solarConfig';
import { RoiDisclaimerBanner } from './RoiDisclaimerBanner';

export const SolarEnergy: React.FC = () => {
  const [selectedSiteKey, setSelectedSiteKey] = useState<'bulawayo' | 'harare' | 'marondera'>('bulawayo');
  const [weatherCondition, setWeatherCondition] = useState<'sunny' | 'cloudy'>('sunny');
  const currentSite = SOLAR_SITES[selectedSiteKey];

  // Dynamic hourly profile reflecting Sunny (peak 220 kW at midday) vs Cloudy (dips to ~44 kW, 20% of rated)
  const chartProfile = useMemo(() => {
    return ENERGY_DATA.hourlyEnergyProfile.map((point) => {
      if (weatherCondition === 'cloudy') {
        // Dips to 20% of rated capacity (~44 kW max at midday)
        const cloudySolar = Math.round(point.solarKw * 0.2);
        return {
          ...point,
          solarKw: cloudySolar,
          gridKw: point.gridKw + Math.round((point.solarKw - cloudySolar) * 0.75),
        };
      }
      return point;
    });
  }, [weatherCondition]);
  return (
    <div className="space-y-8">
      {/* 1. DISCLAIMER BANNER: Estimated Business Transformation Value */}
      <RoiDisclaimerBanner />

      {/* Top Banner: Solar & Virtual Battery System Status */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#B38300]">
            <Sun className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Solar Microgrid &amp; Tariff Arbitrage
              </span>
            </div>
            <h2 className="text-xl font-black text-stone-900 mt-1">
              Energy Cost Optimization &amp; "Virtual Battery"
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Turning solar kilowatt-hours into kinetic crushed rock inventory before peak utility tariff surcharges strike
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#0B0B0F] text-white px-5 py-3.5 rounded-xl border border-stone-800 self-start md:self-auto">
          <div>
            <span className="text-[11px] text-stone-400 font-medium block uppercase tracking-wider">
              Current Tariff Tier
            </span>
            <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">
              {ENERGY_DATA.gridTariffTier}
            </span>
          </div>
          <div className="border-l border-stone-700 pl-4">
            <span className="text-[11px] text-stone-400 font-medium block uppercase tracking-wider">
              Solar Contribution
            </span>
            <span className="text-xl font-black text-[#FFC72C] font-mono">
              {ENERGY_DATA.solarSharePercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Real-Time Power Mix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Solar PV Active</span>
            <Sun className="w-4 h-4 text-[#B38300]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-stone-900 font-mono">205</span>
            <span className="text-sm font-semibold text-stone-500">kW</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-semibold">
            ~{BULAWAYO_CAPACITY_KWP} kWp array &bull; {BULAWAYO_PANELS} panels (600W)
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Utility Grid Draw</span>
            <Zap className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-stone-900 font-mono">{ENERGY_DATA.gridKw}</span>
            <span className="text-sm font-semibold text-stone-500">kW</span>
          </div>
          <div className="mt-2 text-xs text-stone-500 font-medium">
            Baselined for secondary screens
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Diesel Gensets</span>
            <Zap className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-stone-900 font-mono">{ENERGY_DATA.dieselKw}</span>
            <span className="text-sm font-semibold text-stone-500">kW</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-semibold">
            Standby (0L diesel burned today)
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Energy Cost / Ton</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-stone-900 font-mono">
              ${ENERGY_DATA.energyCostPerTonAvg}
            </span>
            <span className="text-sm font-semibold text-stone-500">/ t</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-semibold">
            Down 34% from $4.30 pre-solar
          </div>
        </div>
      </div>

      {/* Multi-Site Solar Fleet Rollout: Bulawayo, Harare, Marondera */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#B38300]" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Davis Granite Multi-Site Solar Fleet
              </span>
            </div>
            <h3 className="text-lg font-black text-stone-900 mt-0.5">
              Site Solar Specifications &amp; Rollout Roadmap
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-mono">Active Site:</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-bold text-xs border border-amber-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              {currentSite.siteName} ({currentSite.status})
            </span>
          </div>
        </div>

        {/* Site Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Bulawayo Card */}
          <div
            onClick={() => setSelectedSiteKey('bulawayo')}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              selectedSiteKey === 'bulawayo'
                ? 'border-[#FFC72C] bg-amber-50/50 shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Phase 1 &bull; Primary Site
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Proof of Concept
              </span>
            </div>
            <h4 className="text-base font-black text-stone-900 mt-1">Bulawayo</h4>
            <div className="mt-3 space-y-1.5 text-xs text-stone-600 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Capacity:</span>
                <span className="font-bold text-stone-900">~{BULAWAYO_CAPACITY_KWP} kWp</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Panels (600W):</span>
                <span className="font-bold text-stone-900">~{BULAWAYO_PANELS}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Annual Generation:</span>
                <span className="font-bold text-stone-900">~{BULAWAYO_ANNUAL_MWH} MWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">CO₂ Avoided:</span>
                <span className="font-bold text-emerald-700">~{BULAWAYO_CO2_TONNES} t/yr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Solar CAPEX:</span>
                <span className="font-bold text-stone-900">~${BULAWAYO_CAPEX_USD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Land Area:</span>
                <span className="font-bold text-stone-900">~{BULAWAYO_LAND_HA} ha</span>
              </div>
            </div>
          </div>

          {/* Harare Card */}
          <div
            onClick={() => setSelectedSiteKey('harare')}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              selectedSiteKey === 'harare'
                ? 'border-[#FFC72C] bg-amber-50/50 shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                Phase 2 &bull; Expansion Site
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                Pending PoC
              </span>
            </div>
            <h4 className="text-base font-black text-stone-900 mt-1">Harare</h4>
            <div className="mt-3 space-y-1.5 text-xs text-stone-600 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Capacity:</span>
                <span className="font-bold text-stone-900">~250–350 kWp</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Panels (600W):</span>
                <span className="font-bold text-stone-900">~417–583</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Annual Generation:</span>
                <span className="font-bold text-stone-900">~467–654 MWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">CO₂ Avoided:</span>
                <span className="font-bold text-emerald-700">~300–420 t/yr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Solar CAPEX:</span>
                <span className="font-bold text-stone-900">~$100K–$140K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Land Area:</span>
                <span className="font-bold text-stone-900">~0.4–0.6 ha</span>
              </div>
            </div>
          </div>

          {/* Marondera Card */}
          <div
            onClick={() => setSelectedSiteKey('marondera')}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              selectedSiteKey === 'marondera'
                ? 'border-[#FFC72C] bg-amber-50/50 shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Phase 3 &bull; Future Site
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-200 text-stone-700">
                Pending
              </span>
            </div>
            <h4 className="text-base font-black text-stone-900 mt-1">Marondera</h4>
            <div className="mt-3 space-y-1.5 text-xs text-stone-600 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Capacity:</span>
                <span className="font-bold text-stone-500">TBC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Panels (600W):</span>
                <span className="font-bold text-stone-500">TBC after survey</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Annual Generation:</span>
                <span className="font-bold text-stone-500">TBC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">CO₂ Avoided:</span>
                <span className="font-bold text-stone-500">TBC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Solar CAPEX:</span>
                <span className="font-bold text-stone-500">TBC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Land Area:</span>
                <span className="font-bold text-stone-500">TBC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 220 kW Reference Financial & Payback Analysis */}
      <div className="bg-stone-900 text-white rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                Bulawayo Reference Case (220 kW)
              </span>
              <span className="text-xs text-stone-400 font-mono">1,868 kWh/kWp specific yield</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Solar PV System — 220 kW
            </h3>
            <div className="text-xs font-bold font-mono text-amber-300 mt-0.5">
              Total Installed Value: $160,000
            </div>
            <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Standardized on Bulawayo site reference: 220 kWp capacity, 411 MWh annual output (~1,126 kWh/day), and tariff benchmark of $0.1421/kWh.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700 text-right">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Solar Alone Payback</span>
              <span className="text-2xl font-black text-[#FFC72C] font-mono">~5.5 yrs</span>
              <span className="text-[10px] text-stone-400 block">$160k Capex / ~$29k Value</span>
            </div>
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 text-right">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block">Solar + Auto Payback</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">~2.6 yrs</span>
              <span className="text-[10px] text-emerald-300/80 block">$395k Total / ~$150k Value</span>
            </div>
          </div>
        </div>

        {/* 4 Financial Pillar Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Card 1: Solar Generation & Direct Use */}
          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700">
            <span className="text-xs text-[#FFC72C] uppercase font-bold font-mono block">
              1. Solar Generation &amp; Self-Use
            </span>
            <div className="text-2xl font-black text-white font-mono mt-1.5">
              411 MWh <span className="text-xs text-stone-400 font-normal">/ yr</span>
            </div>
            <div className="text-xs text-stone-300 mt-1">
              Daily average: <strong className="text-white font-mono">~1,126 kWh</strong>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-700/80 text-[11px] text-stone-400">
              Direct use lifted from <strong>267 MWh</strong> (65%) to <strong>370 MWh</strong> (90%) via automation (+$14,640/yr lift).
            </div>
          </div>

          {/* Card 2: Carbon Credits Range */}
          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700">
            <span className="text-xs text-emerald-400 uppercase font-bold font-mono block">
              2. Carbon Credits (CO₂ Avoided)
            </span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1.5">
              ~329 <span className="text-xs text-emerald-200 font-normal">tCO₂/yr</span>
            </div>
            <div className="text-xs text-stone-300 mt-1">
              Range: <strong className="text-emerald-300 font-mono">$4,935 &ndash; $9,870/yr</strong>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-700/80 text-[11px] text-stone-400">
              411 MWh × 0.8 tCO₂/MWh. Valued at $15/t (conserv.) to $30/t (premium verified).
            </div>
          </div>

          {/* Card 3: Diesel Displacement */}
          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700">
            <span className="text-xs text-amber-400 uppercase font-bold font-mono block">
              3. Diesel Displacement
            </span>
            <div className="text-2xl font-black text-amber-300 font-mono mt-1.5">
              $25k &ndash; $40k <span className="text-xs text-stone-400 font-normal">/ yr</span>
            </div>
            <div className="text-xs text-stone-300 mt-1">
              Outage load coverage: <strong className="text-white">~60% daytime</strong>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-700/80 text-[11px] text-stone-400">
              Estimated ~30% reduction in genset run-time during recurring ZETDC outages.
            </div>
          </div>

          {/* Card 4: Combined System Value */}
          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700">
            <span className="text-xs text-[#FFC72C] uppercase font-bold font-mono block">
              4. Combined Solar + Automation
            </span>
            <div className="text-2xl font-black text-white font-mono mt-1.5">
              ~$150,000 <span className="text-xs text-stone-400 font-normal">/ yr</span>
            </div>
            <div className="text-xs text-stone-300 mt-1">
              Total Capex: <strong className="text-white font-mono">$395,000</strong>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-700/80 text-[11px] text-stone-400">
              $160k Solar + $235k QuarryIQ. Conservative payback ~2.6 years across entire transformation.
            </div>
          </div>
        </div>
      </div>

      {/* The Virtual Battery Explained - Specific Explainer Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900 text-[#FFC72C]">
                ZETDC Grid Arbitrage
              </span>
              <h3 className="text-xl font-black text-stone-900">
                The Virtual Battery Explained
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Comparison of solar self-consumption efficiency and peak credit yield
            </p>
          </div>

          {/* Highlight +25% Value in gold box */}
          <div className="bg-[#FFC72C] text-[#0B0B0F] px-4 py-2.5 rounded-xl font-black text-center font-mono text-lg shadow-sm border border-[#e5af1f] flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto">
            <span>+25% Value</span>
          </div>
        </div>

        {/* Two Columns: WITHOUT Automation vs WITH Automation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: WITHOUT Automation */}
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  WITHOUT Automation
                </span>
                <span className="text-xs text-stone-400 font-mono">Unmanaged Solar</span>
              </div>
              <div className="text-3xl font-black text-stone-800 font-mono mt-1">
                65%
              </div>
              <div className="text-xs font-semibold text-stone-500 mt-0.5">
                Self-consumption rate (267 MWh / 411 MWh)
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200 rounded-full h-3 mt-3 overflow-hidden">
                <div className="bg-stone-500 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-stone-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                  <span>Direct consumption: <strong>267 MWh/yr</strong> of 411 MWh total</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                  <span>144 MWh exported at discounted unmanaged feed-in tariff</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                  <span>Crusher runs fixed rate regardless of solar irradiance</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-mono">
              Direct Solar Value: ~$37,940/yr (Baseline Conventional)
            </div>
          </div>

          {/* Column 2: WITH Automation */}
          <div className="p-5 rounded-xl bg-amber-50/70 border border-[#FFC72C]/80 ring-1 ring-[#FFC72C]/50 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  WITH Automation
                </span>
                <span className="text-xs text-[#B38300] font-bold font-mono px-2 py-0.5 rounded bg-[#FFC72C]/30 border border-[#FFC72C]/60">
                  QuarryIQ SCADA
                </span>
              </div>
              <div className="text-3xl font-black text-stone-950 font-mono mt-1">
                90%
              </div>
              <div className="text-xs font-semibold text-amber-900 mt-0.5">
                Self-consumption rate (370 MWh / 411 MWh)
              </div>

              {/* Progress bar */}
              <div className="w-full bg-amber-200 rounded-full h-3 mt-3 overflow-hidden">
                <div className="bg-[#FFC72C] h-full rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-stone-800 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Direct consumption: <strong>370 MWh/yr</strong> (+103 MWh direct use)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Extra energy value: <strong>+$14,640/year</strong> (103 MWh × $0.1421/kWh)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Kinetic energy stored in pre-crushed rock surge pile</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/80 text-[11px] text-amber-900 font-mono font-bold flex items-center justify-between">
              <span>Direct Solar Value: ~$52,580/yr</span>
              <span className="text-emerald-700 font-black">+~$14,640/yr Lift</span>
            </div>
          </div>
        </div>

        {/* Text explanation */}
        <div className="mt-6 p-4 rounded-xl bg-stone-900 text-stone-100 text-xs sm:text-sm leading-relaxed border border-stone-800">
          <p className="font-medium text-stone-200">
            "The ZETDC grid acts as a free battery. Our automation maximizes self-consumption during daylight, using the 0.85 kWh credit to offset night-time consumption."
          </p>
        </div>
      </div>

      {/* The "Virtual Battery" Deep-Dive Card */}
      <div className="bg-[#0B0B0F] text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F] flex items-center gap-1.5">
                <BatteryCharging className="w-3.5 h-3.5" />
                The Virtual Battery Innovation
              </span>
              <span className="text-xs text-stone-400 font-mono">Capex Avoidance</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Why Spend $1.4M on Lithium Batteries When You Have 15,000 Tons of Rock?
            </h3>
            <p className="text-stone-300 text-sm mt-2 max-w-3xl leading-relaxed">
              Chemical batteries degrade over 8–10 years and cost upwards of $400/kWh. 
              QuarryIQ implements a <strong className="text-[#FFC72C]">Virtual Kinetic Battery</strong>: during 
              cheap midday solar peaks (10:00 – 14:00), primary crushers run at 110% capacity, stockpiling 
              pre-crushed rock into a surge buffer. During peak grid tariff hours (16:00 – 18:00 at $0.285/kWh), 
              primary crushing halts completely while screening feeds off the pre-crushed buffer.
            </p>
          </div>

          <div className="bg-stone-900 p-5 rounded-xl border border-stone-800 shrink-0 min-w-[220px]">
            <span className="text-xs text-stone-400 uppercase font-semibold block">
              Buffered Energy in Surge Pile
            </span>
            <span className="text-3xl font-black text-[#FFC72C] font-mono block mt-1">
              34,944 kWh
            </span>
            <span className="text-xs text-stone-400 mt-1 block">
              Equiv. stored across 11,200 tonnes
            </span>
            <div className="mt-3 pt-3 border-t border-stone-800 text-[11px] text-emerald-400 font-bold">
              Avoids $1,400,000 Lithium Capex
            </div>
          </div>
        </div>

        {/* 3 Step Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <span className="text-[#FFC72C] font-bold text-xs uppercase font-mono block mb-1">
              Phase 1: 10:00 - 14:00 (Solar Peak)
            </span>
            <h4 className="font-bold text-sm text-white">Over-Crush at Zero Fuel Cost</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Solar PV pumps up to ~220 kW of free on-site electricity. Primary Metso C140 ramps smoothly to fill the surge pile without drawing expensive grid kVA.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <span className="text-amber-400 font-bold text-xs uppercase font-mono block mb-1">
              Phase 2: 16:00 - 18:00 (Tariff Surcharge)
            </span>
            <h4 className="font-bold text-sm text-white">Choke-Stop Heavy Primary Load</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Utility grid tariff surges to $0.285/kWh. Primary jaw stops automatically, slashing plant demand by 520 kW.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <span className="text-emerald-400 font-bold text-xs uppercase font-mono block mb-1">
              Phase 3: Dispatch &amp; Cash Realization
            </span>
            <h4 className="font-bold text-sm text-white">Secondary Screens Feed Off Buffer</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Screening decks continue sizing aggregate for evening customer trucks directly from pre-crushed rock stockpile.
            </p>
          </div>
        </div>
      </div>

      {/* Hourly Energy Profile & Tariff Curve */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-stone-900">
                Solar Generation vs. Utility Tariff Arbitrage (24-Hour Profile)
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                Max Y-Axis: 220 kW
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Bulawayo 220 kWp reference: Peak output of 220 kW at midday (12:00). Cloudy conditions dip to ~44 kW (20% of rated capacity).
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Weather Mode Toggle */}
            <div className="flex items-center p-1 bg-stone-100 rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() => setWeatherCondition('sunny')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  weatherCondition === 'sunny'
                    ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Sunny (220 kW Peak)</span>
              </button>
              <button
                type="button"
                onClick={() => setWeatherCondition('cloudy')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  weatherCondition === 'cloudy'
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>Cloudy (44 kW Dip)</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-semibold text-stone-700">
                <span className="w-3 h-3 rounded-full bg-[#FFC72C]"></span>
                Solar PV (kW)
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-stone-700">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Grid (kW)
              </span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartProfile}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFC72C" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFC72C" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1efe7" />
              <XAxis dataKey="hour" stroke="#8c8a82" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#8c8a82"
                fontSize={11}
                tickLine={false}
                domain={[0, (dataMax: number) => Math.max(220, Math.ceil(dataMax / 50) * 50)]}
                unit=" kW"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B0B0F',
                  borderRadius: '8px',
                  border: '1px solid #2b2b36',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="solarKw"
                name={weatherCondition === 'cloudy' ? 'Solar PV Cloudy (kW)' : 'Solar PV Peak (kW)'}
                stroke="#B38300"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#solarGrad)"
              />
              <Area
                type="monotone"
                dataKey="gridKw"
                name="Grid Draw (kW)"
                stroke="#2563EB"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#gridGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
