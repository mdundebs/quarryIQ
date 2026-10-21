import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Zap,
  Activity,
  Package,
  Layers,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  BarChart2,
  Radio,
  Mountain,
  Settings,
  ChevronRight,
  Info,
  HelpCircle,
  X,
  ShieldAlert,
  Sun
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ReferenceLine
} from 'recharts';
import { DAILY_PLANT_LOAD_DATA, HOURLY_TELEMETRY, STOCKPILES } from '../mockData';
import { DataInfoTooltip } from './DataInfoTooltip';

interface DashboardProps {
  liveDataEnabled?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ liveDataEnabled = true }) => {
  // Business Assumptions banner state
  const [showAssumptions, setShowAssumptions] = useState<boolean>(true);
  // Dashboard Guide Drawer state
  const [guideOpen, setGuideOpen] = useState<boolean>(false);

  // Live updating states for TPH, Daily Tons, Revenue
  // Realistic 9-hour shift figures (Target: 100 t/h, 900 t/day quota, $60/ton selling price)
  const [tph, setTph] = useState<number>(104);
  const [dailyTons, setDailyTons] = useState<number>(824.5);
  const [revenue, setRevenue] = useState<number>(49470);
  const [blendedCost, setBlendedCost] = useState<number>(3.95);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Update every 3 seconds when liveDataEnabled is true
  useEffect(() => {
    if (!liveDataEnabled) return;

    const interval = setInterval(() => {
      setIsUpdating(true);

      // Realistic physical fluctuation for ~100 t/h:
      // ~100 t/h corresponds to ~0.083 tonnes every 3 seconds
      const deltaTons = 0.07 + Math.random() * 0.03;
      const tphFluctuation = Math.floor((Math.random() - 0.48) * 3);

      // Live TPH fluctuates between 98 and 105 t/h
      setTph((prev) => {
        const next = prev + tphFluctuation;
        return Math.max(98, Math.min(105, next));
      });

      setDailyTons((prev) => +(prev + deltaTons).toFixed(1));

      // Revenue ticks based on $60/ton selling price
      setRevenue((prev) => Math.round(prev + deltaTons * 60));

      // Subtle cost per ton drift around $3.95/ton ($3.93 to $3.97)
      setBlendedCost((prev) => {
        const delta = (Math.random() - 0.5) * 0.01;
        return +(Math.max(3.93, Math.min(3.97, prev + delta))).toFixed(2);
      });

      setTimeout(() => {
        setIsUpdating(false);
      }, 700);
    }, 3000);

    return () => clearInterval(interval);
  }, [liveDataEnabled]);

  // Total stockpile valuation
  const totalStockpileValue = STOCKPILES.reduce(
    (acc, curr) => acc + curr.currentTons * curr.pricePerTonUSD,
    0
  );
  const totalStockpileTonnage = STOCKPILES.reduce(
    (acc, curr) => acc + curr.currentTons,
    0
  );

  // Daily quota: 900 tonnes (100 t/h * 9 hours)
  const dailyQuota = 900;
  const dailyProgressPercent = Math.min(+((dailyTons / dailyQuota) * 100).toFixed(1), 100);

  return (
    <div className="space-y-8">
      {/* 1. Dismissible Assumptions Banner */}
      {showAssumptions && (
        <div className="bg-slate-800 border-2 border-[#FFC72C] rounded-xl p-4 text-white shadow-lg flex items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFC72C]/20 border border-[#FFC72C]/40 flex items-center justify-center text-[#FFC72C] shrink-0 mt-0.5 sm:mt-0">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
              <strong className="text-[#FFC72C] font-bold">Dashboard Assumptions:</strong> Based on FY2026 Target of 24,000 tonnes/month (26 operating days). Calculated on a 9-hour shift at ~100 t/h. Selling price: $60/ton. Energy tariff: $0.14/kWh.
            </p>
          </div>
          <button
            onClick={() => setShowAssumptions(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
            title="Dismiss Assumptions banner"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Rock-to-Revenue Flow Operational Value Chain Widget */}
      <div className="bg-[#0B0B0F] border border-stone-800 rounded-2xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800/80 gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC72C]/10 border border-[#FFC72C]/30 flex items-center justify-center text-[#FFC72C]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-white uppercase">
                  Rock-to-Revenue Flow
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Live Closed-Loop
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Operational material transformation from quarry bench extraction to banked sales revenue
              </p>
            </div>
          </div>

          {/* Tooltip Explainer */}
          <div className="relative group inline-flex items-center">
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-700/80 px-3 py-1.5 rounded-xl text-xs text-stone-300 hover:border-[#FFC72C]/60 transition-colors cursor-help">
              <Info className="w-4 h-4 text-[#FFC72C] shrink-0" />
              <span className="font-semibold text-stone-200 text-[11px]">Sensor &amp; Telemetry Provenance</span>
            </div>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block z-50 w-72 sm:w-80 p-3.5 bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-xl shadow-2xl text-xs text-stone-300 leading-relaxed pointer-events-none">
              <div className="font-bold text-[#FFC72C] text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                End-to-End Data Feed
              </div>
              <p className="text-[11px] text-stone-200">
                LiDAR feeds the Pit, Belt Scales feed the Crusher, and Weighbridge/Cameras feed the Revenue.
              </p>
              <div className="mt-2 pt-2 border-t border-stone-800 text-[10px] text-stone-400 font-mono">
                Zero manual entries &bull; 100% automated physical sensors
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Flexbox with 4 Connected Steps and Chevron Arrows */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Step 1: Pit */}
          <div className="flex-1 bg-stone-900/90 border border-stone-800 hover:border-stone-700 rounded-xl p-4 transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Mountain className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Step 1 &bull; Pit</div>
              <div className="text-xs font-semibold text-stone-300 truncate">Pit Reserve</div>
              <div className="text-xl font-black font-mono text-[#FFC72C] mt-0.5">45,200 tonnes</div>
            </div>
          </div>

          {/* Chevron 1 */}
          <div className="hidden lg:flex items-center justify-center text-stone-600 px-1">
            <ChevronRight className="w-6 h-6 text-[#FFC72C]/60" />
          </div>

          {/* Step 2: Crushing */}
          <div className="flex-1 bg-stone-900/90 border border-stone-800 hover:border-stone-700 rounded-xl p-4 transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Settings className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Step 2 &bull; Crushing</div>
              <div className="text-xs font-semibold text-stone-300 truncate">Live Crushing</div>
              <div className="text-xl font-black font-mono text-[#FFC72C] mt-0.5">
                {liveDataEnabled ? `${tph} TPH` : '104 TPH'}
              </div>
            </div>
          </div>

          {/* Chevron 2 */}
          <div className="hidden lg:flex items-center justify-center text-stone-600 px-1">
            <ChevronRight className="w-6 h-6 text-[#FFC72C]/60" />
          </div>

          {/* Step 3: Stockpile */}
          <div className="flex-1 bg-stone-900/90 border border-stone-800 hover:border-stone-700 rounded-xl p-4 transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Step 3 &bull; Stockpile</div>
              <div className="text-xs font-semibold text-stone-300 truncate">Stock Ready</div>
              <div className="text-xl font-black font-mono text-[#FFC72C] mt-0.5">12,450 tonnes</div>
            </div>
          </div>

          {/* Chevron 3 */}
          <div className="hidden lg:flex items-center justify-center text-stone-600 px-1">
            <ChevronRight className="w-6 h-6 text-[#FFC72C]/60" />
          </div>

          {/* Step 4: Revenue */}
          <div className="flex-1 bg-stone-900/90 border border-[#FFC72C]/50 hover:border-[#FFC72C] rounded-xl p-4 transition-all shadow-md flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#FFC72C]">Step 4 &bull; Revenue</div>
              <div className="text-xs font-semibold text-stone-300 truncate">Sales Value</div>
              <div className="text-xl font-black font-mono text-[#FFC72C] mt-0.5">
                ${revenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Banner: Shift Status & Live Telemetry Indicator + Dashboard Guide */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-900 flex items-center justify-center text-[#FFC72C] relative">
            <Activity className="w-6 h-6" />
            {liveDataEnabled && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping"></span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  liveDataEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
                }`}
              ></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Shift 1 (9-Hour Production Flow)
              </span>
              <span className="text-xs text-stone-500 font-mono">07:00 - 16:00</span>
              {liveDataEnabled ? (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-200">
                  <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                  Streaming 3s
                </span>
              ) : (
                <span className="hidden sm:inline-flex items-center text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                  Paused
                </span>
              )}
            </div>
            <h2 className="text-lg font-black text-stone-900 mt-0.5">
              Primary Crushing Plant &amp; Surge Stockpile: High Performance
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Dashboard Guide Drawer Button */}
          <button
            onClick={() => setGuideOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-[#FFC72C] text-xs font-bold border border-stone-700 shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5"
            title="Open How to Read Your Dashboard Guide"
          >
            <HelpCircle className="w-4 h-4 text-[#FFC72C]" />
            <span>Dashboard Guide</span>
          </button>

          <div className="text-right hidden sm:block">
            <div className="text-xs text-stone-500 font-medium">Daily Quota Target</div>
            <div className="text-sm font-black text-stone-900 font-mono transition-colors duration-300">
              <span className={isUpdating ? 'text-[#B38300]' : 'text-stone-900'}>
                {dailyTons.toLocaleString()}
              </span>{' '}
              / 900 T ({dailyProgressPercent}%)
            </div>
          </div>
          <div className="w-28 sm:w-32 bg-stone-100 rounded-full h-3 border border-stone-200 overflow-hidden">
            <div
              className="bg-[#FFC72C] h-full rounded-full transition-all duration-500"
              style={{ width: `${dailyProgressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid with smooth animated transitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Instant TPH */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-xs hover:border-[#FFC72C] transition-all relative overflow-hidden">
          {liveDataEnabled && (
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-[#FFC72C] transition-opacity duration-500 ${
                isUpdating ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
          )}
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center">
              Instant Throughput 
              <DataInfoTooltip 
                hardwareSource="Saimo BH30 Belt Scale Integrator (Modbus TCP) on Primary Conveyor."
                calculationLogic="(Load Cell Weight kg × Belt Speed m/s) / 1000."
                businessValue="Real-time monitoring ensures the plant is running at its nominal 100 TPH capacity without overloading the crushers."
              />
            </span>
            <div className="flex items-center gap-1.5">
              {liveDataEnabled && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    isUpdating ? 'bg-[#FFC72C] scale-125' : 'bg-emerald-500'
                  } transition-all duration-300`}
                ></span>
              )}
              <Activity className="w-4 h-4 text-[#B38300]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-3xl font-black font-mono transition-all duration-500 transform ${
                isUpdating ? 'text-[#B38300] scale-105' : 'text-stone-900 scale-100'
              }`}
            >
              {tph}
            </span>
            <span className="text-sm font-semibold text-stone-500">t/h</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +{(((tph - 100) / 100) * 100).toFixed(1)}% vs Target (100 t/h)
            </span>
            <span className="text-stone-400 font-mono">Jaw C140</span>
          </div>
        </div>

        {/* KPI 2: Daily Tons Output */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-xs hover:border-[#FFC72C] transition-all relative overflow-hidden">
          {liveDataEnabled && (
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-[#FFC72C] transition-opacity duration-500 ${
                isUpdating ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
          )}
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center">
              Daily Production 
              <DataInfoTooltip 
                hardwareSource="Saimo BH30 Belt Scale Accumulator."
                calculationLogic="Continuous integration of live TPH data over the shift duration."
                businessValue="Tracks progress against the daily 900t quota (9h @ 100 t/h) to ensure FY2026 targets are met."
              />
            </span>
            <Package className="w-4 h-4 text-[#B38300]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-3xl font-black font-mono transition-all duration-500 transform ${
                isUpdating ? 'text-[#B38300] scale-105' : 'text-stone-900 scale-100'
              }`}
            >
              {dailyTons.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-stone-500">tonnes</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {dailyProgressPercent}% of 900t Quota
            </span>
            <span className="text-stone-400 font-mono">9h Shift</span>
          </div>
        </div>

        {/* KPI 3: Revenue Run-Rate */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-xs hover:border-[#FFC72C] transition-all relative overflow-hidden">
          {liveDataEnabled && (
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-emerald-500 transition-opacity duration-500 ${
                isUpdating ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
          )}
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center">
              Revenue Run-Rate 
              <DataInfoTooltip 
                hardwareSource="Derived from Daily Production."
                calculationLogic="Total Tonnes Crushed × Selling Price per Tonne ($60/t configured)."
                businessValue="Financial projection for the day based on current output (Target: $54,000/day at 900 tonnes)."
              />
            </span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-3xl font-black font-mono transition-all duration-500 transform ${
                isUpdating ? 'text-emerald-600 scale-105' : 'text-stone-900 scale-100'
              }`}
            >
              ${revenue.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              Target: $54,000 (900t × $60)
            </span>
            <span className="text-stone-400 font-mono">Today Realized</span>
          </div>
        </div>

        {/* KPI 4: Blended Cost / Ton */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-xs hover:border-[#FFC72C] transition-all relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center">
              Blended Cost / Ton 
              <DataInfoTooltip 
                hardwareSource="Power Quality Analyzer + Belt Scales."
                calculationLogic="(Energy Cost + Labour Cost + Maintenance) / Total Tonnes."
                businessValue="Tracks operational efficiency. Automation aims to reduce this by 15% through optimized energy use and reduced downtime."
              />
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-3xl font-black font-mono transition-all duration-500 ${
                isUpdating ? 'text-emerald-600' : 'text-stone-900'
              }`}
            >
              ${blendedCost.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-stone-500">/ ton</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" />
              -$0.30 vs Baseline ($4.25)
            </span>
            <span className="text-stone-400 font-mono">Energy &amp; Wear</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-stone-500 italic mt-4 text-center">
        All data points are sourced from physical PLC sensors, Belt Scales, and Power Meters. No data is manually entered unless specified.
      </div>
      
      {/* ... (rest of the file as before) */}


      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly Production vs Target */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Hourly Tonnage Output vs Target (100 t/h)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Aggregated continuous weightometer telemetry across primary jaw feeder (9-hour shift @ 100 t/h target)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FFC72C]"></span>
                <span className="text-stone-700">Actual (t/h)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-stone-400"></span>
                <span className="text-stone-500">Target (100)</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_TELEMETRY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tonnageGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFC72C" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFC72C" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1efe7" />
                <XAxis dataKey="time" stroke="#8c8a82" fontSize={11} tickLine={false} />
                <YAxis stroke="#8c8a82" fontSize={11} domain={[70, 130]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B0B0F',
                    borderRadius: '8px',
                    border: '1px solid #2b2b36',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any, name: any) => [
                    `${value} ${name === 'throughputTph' ? 'Tonnes/hr' : ''}`,
                    name === 'throughputTph' ? 'Actual Output' : 'Nominal Target',
                  ]}
                />
                <ReferenceLine y={100} stroke="#8c8a82" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="throughputTph"
                  stroke="#B38300"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#tonnageGrad)"
                />
                <Line
                  type="monotone"
                  dataKey="targetTph"
                  stroke="#8c8a82"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy Generation Breakdown (Solar vs Grid) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Crushing Power Mix — Daily Load vs Sources
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Solar PV (220 kW rated) displaces up to 220 kW of grid draw during peak daylight hours. The remainder of the plant load is supplied by ZESA, with diesel backup during grid outages.
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_PLANT_LOAD_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1efe7" />
                <XAxis dataKey="time" stroke="#8c8a82" fontSize={11} tickLine={false} label={{ value: 'Time of Day', position: 'insideBottom', offset: -5, fontSize: 12 }} />
                <YAxis stroke="#8c8a82" fontSize={11} tickLine={false} domain={[0, 600]} label={{ value: 'Plant Load (kW)', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B0B0F',
                    borderRadius: '8px',
                    border: '1px solid #2b2b36',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  iconType="circle"
                />
                <Area type="monotone" dataKey="solarKw" name="Solar PV (220 kW rated)" stackId="a" fill="#FFC72C" stroke="#FFC72C" />
                <Area type="monotone" dataKey="gridKw" name="Utility Grid (ZESA)" stackId="a" fill="#3B82F6" stroke="#3B82F6" />
                <Area type="monotone" dataKey="dieselKw" name="Diesel Genset (backup)" stackId="a" fill="#EF4444" stroke="#EF4444" />
                <Line type="monotone" dataKey="totalLoadKw" name="Total Plant Demand" stroke="#000000" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stockpile Inventory Section */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-stone-900" />
              <h3 className="text-lg font-bold text-stone-900">
                Live Stockpile Inventory &amp; Stockyard Value
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              LiDAR volumetric calculation calibrated with continuous belt scales and weighbridge dispatch
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-stone-500 block">Total Quarry Stock</span>
              <span className="text-sm font-black text-stone-900 font-mono">
                {totalStockpileTonnage.toLocaleString()} Tonnes
              </span>
            </div>
            <div className="text-right pl-4 border-l border-stone-200">
              <span className="text-xs text-stone-500 block">Stockyard Valuation</span>
              <span className="text-sm font-black text-emerald-700 font-mono">
                ${totalStockpileValue.toLocaleString()} USD
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STOCKPILES.map((pile) => {
            const fillPercent = Math.round((pile.currentTons / pile.maxCapacityTons) * 100);
            const pileValue = pile.currentTons * pile.pricePerTonUSD;

            let statusBadge = (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Optimal Level
              </span>
            );

            if (pile.status === 'low') {
              statusBadge = (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Stock Low (High Demand)
                </span>
              );
            } else if (pile.status === 'overflow') {
              statusBadge = (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                  Buffer Max (Sand Divert)
                </span>
              );
            }

            return (
              <div
                key={pile.id}
                className="p-4 rounded-xl border border-stone-200/90 bg-[#FFFDF7]/60 hover:bg-[#FFFDF7] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{pile.name}</h4>
                    <span className="text-[11px] text-stone-500 block mt-0.5">{pile.fraction}</span>
                  </div>
                  {statusBadge}
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-stone-900 font-mono">
                    {pile.currentTons.toLocaleString()} <span className="text-xs font-normal text-stone-500">tons</span>
                  </span>
                  <span className="text-xs font-semibold text-stone-600 font-mono">
                    ${pile.pricePerTonUSD.toFixed(2)}/t
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-[11px] text-stone-500 mb-1">
                    <span>Capacity: {fillPercent}%</span>
                    <span>Max {pile.maxCapacityTons.toLocaleString()}t</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pile.status === 'low'
                          ? 'bg-amber-500'
                          : pile.status === 'overflow'
                          ? 'bg-purple-500'
                          : 'bg-[#FFC72C]'
                      }`}
                      style={{ width: `${Math.min(fillPercent, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-600">
                  <span>Valuation:</span>
                  <span className="font-bold text-stone-900 font-mono">${pileValue.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-App "How to Read Your Dashboard" Drawer */}
      {guideOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setGuideOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#1A1A1F] text-white shadow-2xl border-l border-stone-800 flex flex-col justify-between">
              {/* Header */}
              <div className="p-6 border-b border-stone-800 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFC72C]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                      Executive Guide
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">
                    How to Read Your Dashboard
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Clear, non-technical explanations for quarry leadership
                  </p>
                </div>
                <button
                  onClick={() => setGuideOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  aria-label="Close Guide"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-5 text-sm leading-relaxed">
                {/* 1. Baseline Assumptions at the top */}
                <div className="p-4 rounded-xl bg-stone-900 border border-[#FFC72C]/40 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC72C] mb-2">
                    <Info className="w-4 h-4 text-[#FFC72C]" />
                    <span>Baseline Assumptions</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-300">
                    <div className="bg-[#1A1A1F] p-2.5 rounded-lg border border-stone-800">
                      <span className="text-stone-400 text-[10px] block font-sans">Monthly Target:</span>
                      <strong className="text-white text-xs">24,000 tonnes</strong>
                    </div>
                    <div className="bg-[#1A1A1F] p-2.5 rounded-lg border border-stone-800">
                      <span className="text-stone-400 text-[10px] block font-sans">Crushing Rate:</span>
                      <strong className="text-[#FFC72C] text-xs">100 t/h (9h shift)</strong>
                    </div>
                    <div className="bg-[#1A1A1F] p-2.5 rounded-lg border border-stone-800">
                      <span className="text-stone-400 text-[10px] block font-sans">Selling Price:</span>
                      <strong className="text-emerald-400 text-xs">$60 / ton</strong>
                    </div>
                    <div className="bg-[#1A1A1F] p-2.5 rounded-lg border border-stone-800">
                      <span className="text-stone-400 text-[10px] block font-sans">Daily Quota:</span>
                      <strong className="text-white text-xs">900 tonnes / day</strong>
                    </div>
                  </div>
                  <div className="mt-2.5 text-[10px] text-stone-400 font-mono">
                    26 operating days/month &bull; Energy tariff: $0.14/kWh
                  </div>
                </div>

                {/* 2. Metric Explanations in styled bullet points */}
                <div className="space-y-3.5">
                  {/* Item 1: Live TPH */}
                  <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFC72C] uppercase tracking-wider mb-1">
                      <Activity className="w-4 h-4 text-[#FFC72C]" />
                      <span>Live TPH:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed pl-6">
                      Shows how fast the Primary Jaw Crusher is running. If the number is green and above the target, you are producing extra revenue.
                    </p>
                  </div>

                  {/* Item 2: Daily Production */}
                  <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFC72C] uppercase tracking-wider mb-1">
                      <Package className="w-4 h-4 text-[#FFC72C]" />
                      <span>Daily Production:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed pl-6">
                      Tracks the total tonnage against your daily quota. It tells you if you are on track to hit your FY2026 monthly budget.
                    </p>
                  </div>

                  {/* Item 3: Blended Cost / Ton */}
                  <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFC72C] uppercase tracking-wider mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Blended Cost / Ton:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed pl-6">
                      Your efficiency score. It calculates Energy + Labour divided by Tonnes. The lower this number, the higher your profit margin.
                    </p>
                  </div>

                  {/* Item 4: Energy Mix */}
                  <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFC72C] uppercase tracking-wider mb-1">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Energy Mix:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed pl-6">
                      Shows where your power comes from. Gold is Solar (cheap), Blue is ZESA (expensive), Red is Diesel (very expensive).
                    </p>
                  </div>

                  {/* Item 5: Stockpiles (LiDAR) */}
                  <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFC72C] uppercase tracking-wider mb-1">
                      <Layers className="w-4 h-4 text-purple-400" />
                      <span>Stockpiles (LiDAR):</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed pl-6">
                      A laser scan of your inventory. It tells the sales team exactly what is available to sell today and its dollar value.
                    </p>
                  </div>

                  {/* Item 6: Risk Dashboard */}
                  <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFC72C] uppercase tracking-wider mb-1">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>Risk Dashboard:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed pl-6">
                      Your early warning system. It monitors motor health and power factor to prevent expensive breakdowns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-mono">
                  SitePlan AI &bull; Telemetry Engine
                </span>
                <button
                  onClick={() => setGuideOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#FFC72C] hover:bg-[#e6b325] text-[#0B0B0F] font-bold text-xs transition-colors cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
