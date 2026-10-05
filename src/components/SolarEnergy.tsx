import React from 'react';
import {
  Sun,
  Zap,
  BatteryCharging,
  DollarSign,
  TrendingDown,
  Clock,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Info
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

export const SolarEnergy: React.FC = () => {
  return (
    <div className="space-y-8">
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
            <span className="text-3xl font-black text-stone-900 font-mono">{ENERGY_DATA.solarKw}</span>
            <span className="text-sm font-semibold text-stone-500">kW</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-semibold">
            850 kW rated ground-mount array
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
                Self-consumption rate
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200 rounded-full h-3 mt-3 overflow-hidden">
                <div className="bg-stone-500 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-stone-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                  <span>Midday excess power exported at low feed-in value</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                  <span>Crusher runs fixed rate regardless of solar irradiance</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-mono">
              Status: Baseline Conventional Operation
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
                Self-consumption rate
              </div>

              {/* Progress bar */}
              <div className="w-full bg-amber-200 rounded-full h-3 mt-3 overflow-hidden">
                <div className="bg-[#FFC72C] h-full rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-stone-800 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Primary crushing surges during peak sunlight hours</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Kinetic energy stored in pre-crushed rock surge pile</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/80 text-[11px] text-amber-900 font-mono font-bold">
              Benefit: Maximum Energy Capture &amp; Tariff Neutrality
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
              Solar PV pumps 850 kW of free electricity. Primary Metso C140 ramps to maximum 460 t/h to fill the 16k ton surge pile.
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Solar Generation vs. Utility Tariff Arbitrage (24-Hour Profile)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Notice solar generation peaking perfectly before late afternoon utility peak tariff spike
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
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

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={ENERGY_DATA.hourlyEnergyProfile}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
              <YAxis stroke="#8c8a82" fontSize={11} tickLine={false} />
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
                name="Solar PV (kW)"
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
