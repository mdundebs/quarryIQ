import React, { useState, useEffect, useId } from 'react';
import {
  Sliders,
  Activity,
  Zap,
  DollarSign,
  TrendingUp,
  Package,
  Layers,
  Camera,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Flame,
  Sun,
  ShieldCheck,
  Scale,
  ArrowRight,
  Radio,
  Cpu,
  Eye,
  LineChart as LineChartIcon,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { RoiDisclaimerBanner } from './RoiDisclaimerBanner';

interface ParameterTooltipProps {
  text: string;
}

const ParameterTooltip: React.FC<ParameterTooltipProps> = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="text-stone-400 hover:text-stone-700 transition-colors focus:outline-hidden"
        title={text}
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      {show && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-52 p-2 bg-[#0B0B0F] text-stone-200 text-[11px] rounded-lg shadow-xl border border-stone-800 leading-snug pointer-events-none">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0B0B0F]"></div>
        </div>
      )}
    </div>
  );
};

export const ControlRoom: React.FC = () => {
  // Production Inputs
  const [tph, setTph] = useState<number>(45);
  const [operatingHours, setOperatingHours] = useState<number>(9);
  const [crusherLoad, setCrusherLoad] = useState<number>(75);

  // Financial Inputs
  const [sellingPrice, setSellingPrice] = useState<number>(60);
  const [zesaTariff, setZesaTariff] = useState<number>(0.1421);
  const [dieselPrice, setDieselPrice] = useState<number>(1.55);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(24000);

  // Order Inputs
  const [orderSizeM2, setOrderSizeM2] = useState<number>(2000);
  const [deadlineDays, setDeadlineDays] = useState<number>(14);

  // Energy Inputs
  const [solarKw, setSolarKw] = useState<number>(154); // 154 kW default (70% of 220 kW rated Bulawayo array)
  const [gridAvailable, setGridAvailable] = useState<boolean>(true);

  // AI Vision Forecast Interactive Sliders & Inputs
  const [cameraConfidence, setCameraConfidence] = useState<number>(96); // Camera accuracy / confidence % (70-100)
  const [tolerance, setTolerance] = useState<number>(1.5); // Tolerance % (0.5 - 5.0)
  const [slabSize, setSlabSize] = useState<number>(2.0); // Slab size (m²)
  const [demandIncrease, setDemandIncrease] = useState<number>(15); // Demand increase % (0-50)
  const [beltSpeedDrop, setBeltSpeedDrop] = useState<number>(5); // Belt speed drop % (0-30)

  // Power cut simulator state
  const [powerCutActive, setPowerCutActive] = useState<boolean>(false);

  // Collapsible sections
  const [openSections, setOpenSections] = useState({
    production: true,
    financial: true,
    order: true,
    energy: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Recalculating state pulse
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);

  // Trigger 300ms pulse on any input change
  const triggerRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
    }, 300);
  };

  // Calculations
  const dailyOutput = tph * operatingHours;
  const monthlyProjection = dailyOutput * 30;
  const progressPercent = Math.min(+((monthlyProjection / monthlyTarget) * 100).toFixed(1), 150);
  const isTargetMet = monthlyProjection >= monthlyTarget;

  // Order Feasibility
  const tonnesNeeded = +(orderSizeM2 / 0.7).toFixed(1);
  const daysToFulfil = +(tonnesNeeded / (dailyOutput || 1)).toFixed(1);
  const canDeliver = daysToFulfil <= deadlineDays;

  // Energy Cost
  const totalKwh = dailyOutput * 8;
  const effectiveGrid = gridAvailable && !powerCutActive;

  // Power split model:
  // Plant average load = totalKwh / operatingHours
  const plantAverageKw = totalKwh / (operatingHours || 1);
  let solarKwhSupplied = 0;
  let gridKwhSupplied = 0;
  let dieselKwhSupplied = 0;

  if (!effectiveGrid) {
    // Grid is down: Solar covers peak up to solarKw (avg 55% during run-time)
    solarKwhSupplied = Math.min(totalKwh, solarKw * operatingHours * 0.55);
    dieselKwhSupplied = Math.max(0, totalKwh - solarKwhSupplied);
    gridKwhSupplied = 0;
  } else {
    // Normal operation: Solar supplies daytime load (~65%)
    solarKwhSupplied = Math.min(totalKwh, solarKw * operatingHours * 0.65);
    gridKwhSupplied = Math.max(0, totalKwh - solarKwhSupplied);
    dieselKwhSupplied = 0;
  }

  const gridCostUSD = gridKwhSupplied * zesaTariff;
  // Diesel genset fuel burn: ~0.26 litres per kWh generated
  const dieselLitres = dieselKwhSupplied * 0.26;
  const dieselCostUSD = dieselLitres * dieselPrice;
  const totalEnergyCostUSD = gridCostUSD + dieselCostUSD;
  const energyCostPerTonne = +(totalEnergyCostUSD / (dailyOutput || 1)).toFixed(2);

  // AI Vision Forecast Computations & Charts
  const discrepancyPercent = +Math.abs(((100 - cameraConfidence) * 0.08) + (beltSpeedDrop * 0.07)).toFixed(2);
  const isOptimalAccuracy = discrepancyPercent <= tolerance;

  // Chart 1 data: Belt Scale vs AI Vision
  const timepoints = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  const beltVsVisionData = timepoints.map((time, idx) => {
    const baseEffectiveTph = tph * (1 - (beltSpeedDrop / 100) * 0.65);
    const hourlyVariation = (idx % 2 === 0 ? 1 : -1) * (idx * 1.5);
    const scaleTph = Math.round(baseEffectiveTph + hourlyVariation);
    const accuracyFactor = cameraConfidence / 100;
    const visionNoise = (idx % 3 === 0 ? -1 : 1) * ((100 - cameraConfidence) * 0.08);
    const visionTph = Math.round(scaleTph * accuracyFactor + visionNoise);

    return {
      time,
      beltScale: Math.max(10, scaleTph),
      aiVision: Math.max(10, visionTph),
    };
  });

  // Chart 2 data: Slab Count by Product Grade
  const totalVisionSlabs = Math.round(
    (dailyOutput * 2.8) * (1 + demandIncrease / 100) * (2.0 / (slabSize || 1)) * (1 - (beltSpeedDrop / 100) * 0.4)
  );

  const slabCategories = [
    { category: 'Gangsaw (2cm)', ratio: 0.36 },
    { category: 'Countertops', ratio: 0.26 },
    { category: 'Curbs & Pavers', ratio: 0.18 },
    { category: 'Monument Cut', ratio: 0.12 },
    { category: 'Cladding Tiles', ratio: 0.08 },
  ];

  const slabCountData = slabCategories.map((cat) => ({
    category: cat.category,
    count: Math.round(totalVisionSlabs * cat.ratio),
  }));

  // Revenue Forecast
  const visionTodayM2 = Math.round(totalVisionSlabs * slabSize);
  const visionTodayRevUSD = Math.round(visionTodayM2 * (sellingPrice * 0.45));
  const visionMonthlyRevUSD = visionTodayRevUSD * 30;

  // Demand Prediction
  const recommendedCrushRateTph = Math.round(tph * (1 + demandIncrease / 100));
  const stockyardRunwayDays = Math.max(3, Math.round(20 / (1 + demandIncrease / 100)));

  // Actionable Recommendation Dynamic Text
  let actionableRecommendationText = '';
  if (cameraConfidence < 80) {
    actionableRecommendationText = `🚨 Camera accuracy low (${cameraConfidence}%). Optical stereoscopic vision is degraded by lens dust particulate on CAM-03. Auto-triggering compressed air lens purge nozzle.`;
  } else if (beltSpeedDrop > 15) {
    actionableRecommendationText = `⚠️ Belt speed drop (${beltSpeedDrop}%) detected on Overland CV-02. Tonnage delivery delayed. Inspect drive pulley lagging and pneumatic take-up tensioner before next shift.`;
  } else if (!isOptimalAccuracy) {
    actionableRecommendationText = `⚠️ Variance (${discrepancyPercent}%) exceeds statutory threshold (${tolerance}%). AI optical volume and load cell mass diverge. Perform a 10-minute zero-tare calibration on belt scale weigher.`;
  } else if (demandIncrease > 25) {
    actionableRecommendationText = `📈 Strong market demand (+${demandIncrease}%). Prioritize high-margin gangsaw blocks. Recommend increasing primary jaw operating rate to ${recommendedCrushRateTph} t/h to avoid stockouts.`;
  } else {
    actionableRecommendationText = `✅ AI Vision stereoscopic models operating in optimal calibration (${cameraConfidence}% accuracy). Load cell mass correlates within ±${discrepancyPercent}% error margin. Production yield and slab count are fully verified.`;
  }

  // Power cut simulator metrics
  const effectivePlantLoadKw = Math.round(plantAverageKw);
  const solarCoveragePercent = Math.min(Math.round((solarKw / (effectivePlantLoadKw || 1)) * 100), 100);
  const gensetDeficitKw = Math.max(0, effectivePlantLoadKw - Math.round(solarKw * 0.55));
  const hourlyDieselCost = +(gensetDeficitKw * 0.26 * dieselPrice).toFixed(2);

  const handleResetDefaults = () => {
    setTph(45);
    setOperatingHours(9);
    setCrusherLoad(75);
    setSellingPrice(60);
    setZesaTariff(0.1421);
    setDieselPrice(1.55);
    setMonthlyTarget(24000);
    setOrderSizeM2(2000);
    setDeadlineDays(14);
    setSolarKw(154); // 154 kW default (70% of 220 kW rated)
    setGridAvailable(true);
    setPowerCutActive(false);
    setCameraConfidence(96);
    setTolerance(1.5);
    setSlabSize(2.0);
    setDemandIncrease(15);
    setBeltSpeedDrop(5);
    triggerRecalculate();
  };

  const handleLoadRealData = () => {
    setTph(52);
    setOperatingHours(10);
    setCrusherLoad(84);
    setSellingPrice(64);
    setZesaTariff(0.1421);
    setDieselPrice(1.62);
    setMonthlyTarget(26000);
    setOrderSizeM2(3500);
    setDeadlineDays(18);
    setSolarKw(154); // 154 kW (70% rated default for 220 kW system)
    setGridAvailable(true);
    setPowerCutActive(false);
    setCameraConfidence(98);
    setTolerance(1.2);
    setSlabSize(2.2);
    setDemandIncrease(25);
    setBeltSpeedDrop(3);
    triggerRecalculate();
  };

  return (
    <div className="space-y-8">
      {/* Header Banner with Recalculating Badge */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B0B0F] flex items-center justify-center text-[#FFC72C] shadow-md">
            <Sliders className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                Executive Control Room
              </span>
              <span className="text-xs text-stone-500 font-mono">Dynamic Parametric Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              Live Granite Plant Simulation &amp; Decision Modeler
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Adjust actual plant parameters on the left to immediately inspect operational feasibility and cash flow on the right
            </p>
          </div>
        </div>

        {/* Real-time recalculating pulse indicator */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {isRecalculating ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFC72C] text-[#0B0B0F] shadow-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#0B0B0F] animate-ping"></span>
              RECALCULATING...
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Model Synchronized</span>
            </div>
          )}
        </div>
      </div>

      {/* ROI & Transformation Value Disclaimer Banner */}
      <RoiDisclaimerBanner />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Panel with Collapsible Sections */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#B38300]" />
              Plant Input Parameters
            </h3>
            <span className="text-xs text-stone-500 font-mono">11 Control Points</span>
          </div>

          {/* Section 1: Production Inputs */}
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs overflow-hidden">
            <button
              onClick={() => toggleSection('production')}
              className="w-full px-5 py-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-left text-xs font-bold text-stone-900 border-b border-stone-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#B38300]" />
                Production Inputs
              </span>
              {openSections.production ? (
                <ChevronUp className="w-4 h-4 text-stone-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-500" />
              )}
            </button>

            {openSections.production && (
              <div className="p-5 space-y-4 text-xs">
                {/* Current TPH */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Current TPH (t/h)
                      <ParameterTooltip text="Instant rock throughput measured at primary jaw crusher feeder belt" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">{tph} t/h</span>
                  </div>
                  <input
                    type="number"
                    min="10"
                    max="150"
                    value={tph}
                    onChange={(e) => {
                      setTph(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-hidden focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]"
                  />
                </div>

                {/* Operating Hours */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Operating Hours (hrs/day)
                      <ParameterTooltip text="Planned production run-hours per 24-hour cycle" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">{operatingHours} hrs</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={operatingHours}
                    onChange={(e) => {
                      setOperatingHours(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-hidden focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]"
                  />
                </div>

                {/* Crusher Load % Slider */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Crusher Load %
                      <ParameterTooltip text="Average mechanical load percentage on primary and secondary crushers" />
                    </span>
                    <span className="font-mono font-bold text-[#B38300]">{crusherLoad}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="1"
                    value={crusherLoad}
                    onChange={(e) => {
                      setCrusherLoad(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full accent-[#B38300] cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Financial Inputs */}
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs overflow-hidden">
            <button
              onClick={() => toggleSection('financial')}
              className="w-full px-5 py-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-left text-xs font-bold text-stone-900 border-b border-stone-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Financial Inputs
              </span>
              {openSections.financial ? (
                <ChevronUp className="w-4 h-4 text-stone-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-500" />
              )}
            </button>

            {openSections.financial && (
              <div className="p-5 space-y-4 text-xs">
                {/* Selling Price / Tonne */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Selling Price / Tonne ($)
                      <ParameterTooltip text="Blended average commercial market price per tonne of crushed aggregate / granite" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">${sellingPrice}</span>
                  </div>
                  <input
                    type="number"
                    min="20"
                    max="200"
                    value={sellingPrice}
                    onChange={(e) => {
                      setSellingPrice(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-hidden focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]"
                  />
                </div>

                {/* ZESA Tariff / kWh */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      ZESA Tariff / kWh ($)
                      <ParameterTooltip text="ZETDC industrial electricity tariff in USD per kWh" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">${zesaTariff}</span>
                  </div>
                  <input
                    type="number"
                    step="0.001"
                    min="0.05"
                    max="0.50"
                    value={zesaTariff}
                    onChange={(e) => {
                      setZesaTariff(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-hidden focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]"
                  />
                </div>

                {/* Diesel Price / Litre */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Diesel Price / Litre ($)
                      <ParameterTooltip text="Delivered bulk low-sulfur diesel price per litre for gensets and haulers" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">${dieselPrice}</span>
                  </div>
                  <input
                    type="number"
                    step="0.05"
                    min="0.80"
                    max="3.00"
                    value={dieselPrice}
                    onChange={(e) => {
                      setDieselPrice(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-hidden focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]"
                  />
                </div>

                {/* Monthly Target (Tonnes) */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Monthly Target (Tonnes)
                      <ParameterTooltip text="Monthly production target in tonnes for Davis Granite management quota" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">{monthlyTarget.toLocaleString()} T</span>
                  </div>
                  <input
                    type="number"
                    step="1000"
                    min="5000"
                    max="100000"
                    value={monthlyTarget}
                    onChange={(e) => {
                      setMonthlyTarget(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-hidden focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Order Inputs */}
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs overflow-hidden">
            <button
              onClick={() => toggleSection('order')}
              className="w-full px-5 py-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-left text-xs font-bold text-stone-900 border-b border-stone-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                Order Inputs
              </span>
              {openSections.order ? (
                <ChevronUp className="w-4 h-4 text-stone-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-500" />
              )}
            </button>

            {openSections.order && (
              <div className="p-5 space-y-4 text-xs">
                {/* Order Size */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Order Size (m²)
                      <ParameterTooltip text="Target customer surface area order size in square metres" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">{orderSizeM2.toLocaleString()} m²</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="100"
                      min="100"
                      max="50000"
                      value={orderSizeM2}
                      onChange={(e) => {
                        setOrderSizeM2(Number(e.target.value));
                        triggerRecalculate();
                      }}
                      className="w-full px-3 py-2 pr-10 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-hidden focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]"
                    />
                    <span className="absolute right-3 top-2.5 text-stone-400 font-mono text-xs">m²</span>
                  </div>
                </div>

                {/* Deadline Days */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Deadline Days
                      <ParameterTooltip text="Contractual delivery window in calendar days" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">{deadlineDays} Days</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={deadlineDays}
                    onChange={(e) => {
                      setDeadlineDays(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-hidden focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Energy Inputs */}
          <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs overflow-hidden">
            <button
              onClick={() => toggleSection('energy')}
              className="w-full px-5 py-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-left text-xs font-bold text-stone-900 border-b border-stone-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Energy Inputs
              </span>
              {openSections.energy ? (
                <ChevronUp className="w-4 h-4 text-stone-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-500" />
              )}
            </button>

            {openSections.energy && (
              <div className="p-5 space-y-4 text-xs">
                {/* Solar Available kW */}
                <div>
                  <div className="flex justify-between items-center text-stone-700 font-semibold mb-1">
                    <span>
                      Solar Available kW
                      <ParameterTooltip text="Instant peak solar PV generation capacity available from array" />
                    </span>
                    <span className="font-mono font-bold text-[#B38300]">{solarKw} kW</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={solarKw}
                    onChange={(e) => {
                      setSolarKw(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full accent-[#B38300] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                    <span>0 kW</span>
                    <span>500 kW</span>
                    <span>1,000 kW</span>
                  </div>
                </div>

                {/* Grid Available Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <div>
                    <span className="font-semibold text-stone-800 block">
                      Grid Available (ZETDC)
                      <ParameterTooltip text="ZETDC national utility grid power availability state" />
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {gridAvailable ? 'Utility grid online' : 'Grid load shedding offline'}
                    </span>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={gridAvailable}
                    onClick={() => {
                      setGridAvailable(!gridAvailable);
                      triggerRecalculate();
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      gridAvailable ? 'bg-emerald-600' : 'bg-stone-400'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        gridAvailable ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Simulation Output Cards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#B38300]" />
              Live Simulation Output Cards
            </h3>
            <span className="text-xs text-stone-500 font-mono">Dynamic Response</span>
          </div>

          {/* CARD 1: Production Forecast */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-stone-900" />
                <h4 className="font-bold text-base text-stone-900">
                  Card 1 — Production Forecast
                </h4>
              </div>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isTargetMet
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                {isTargetMet ? 'Target Achievable' : 'Target Deficit'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-stone-200">
                <span className="text-xs text-stone-500 block font-medium">Daily Output (TPH × Hours)</span>
                <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono mt-1 block">
                  {dailyOutput.toLocaleString()} <span className="text-xs font-normal text-stone-500">tonnes/day</span>
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block font-mono">
                  {tph} t/h × {operatingHours} hrs
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-stone-200">
                <span className="text-xs text-stone-500 block font-medium">Monthly Projection (Daily × 30)</span>
                <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono mt-1 block">
                  {monthlyProjection.toLocaleString()} <span className="text-xs font-normal text-stone-500">tonnes</span>
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block font-mono">
                  Quota Target: {monthlyTarget.toLocaleString()} T
                </span>
              </div>
            </div>

            {/* Progress Bar vs Target */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-stone-600 mb-1.5 font-semibold">
                <span>Progress vs Monthly Target ({progressPercent}%)</span>
                <span className={isTargetMet ? 'text-emerald-700 font-bold' : 'text-red-600 font-bold'}>
                  {isTargetMet
                    ? `+${(monthlyProjection - monthlyTarget).toLocaleString()} T Surplus`
                    : `-${(monthlyTarget - monthlyProjection).toLocaleString()} T Shortfall`}
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isTargetMet ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* CARD 2: Order Feasibility */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-base text-stone-900">
                  Card 2 — Order Feasibility
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500">Can Deliver?</span>
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full uppercase border shadow-2xs ${
                    canDeliver
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-red-100 text-red-900 border-red-300'
                  }`}
                >
                  {canDeliver ? 'YES' : 'NO'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 block font-medium">Tonnes Needed (Order / 0.7)</span>
                <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1 block">
                  {tonnesNeeded.toLocaleString()} T
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  For {orderSizeM2.toLocaleString()} m² at 0.7 yield
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 block font-medium">Days to Fulfil (Tonnes / Daily)</span>
                <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1 block">
                  {daysToFulfil} Days
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block font-mono">
                  Contract Deadline: {deadlineDays} Days
                </span>
              </div>
            </div>

            {/* Recommendation Text */}
            <div
              className={`mt-4 p-3.5 rounded-xl border text-xs sm:text-sm font-medium flex items-start gap-2.5 ${
                canDeliver
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-red-50/70 border-red-200 text-red-950'
              }`}
            >
              {canDeliver ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Recommendation:</strong> Can fulfill in {daysToFulfil} days, comfortably inside the {deadlineDays}-day deadline. Allocate 2 haulage trucks to dispatch staging ramp.
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Recommendation:</strong> Order cannot be fulfilled in time ({daysToFulfil} days vs {deadlineDays} days max). Increase operating shift to {Math.ceil(tonnesNeeded / (deadlineDays * tph))} hrs/day or raise TPH to {Math.ceil(tonnesNeeded / (deadlineDays * operatingHours))} t/h.
                  </span>
                </>
              )}
            </div>
          </div>

          {/* CARD 3: Energy Cost */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-base text-stone-900">
                  Card 3 — Energy Cost
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                Daily × 8 kWh/t
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <span className="text-[11px] font-bold text-amber-900 uppercase block">Solar PV Share</span>
                <span className="text-xl font-black text-stone-900 font-mono mt-1 block">
                  {Math.round(solarKwhSupplied).toLocaleString()} kWh
                </span>
                <span className="text-[10px] text-amber-800 mt-0.5 block">
                  {Math.round((solarKwhSupplied / (totalKwh || 1)) * 100)}% of total load
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200">
                <span className="text-[11px] font-bold text-blue-900 uppercase block">ZETDC Grid Draw</span>
                <span className="text-xl font-black text-stone-900 font-mono mt-1 block">
                  {Math.round(gridKwhSupplied).toLocaleString()} kWh
                </span>
                <span className="text-[10px] text-blue-800 mt-0.5 block">
                  ${Math.round(gridCostUSD).toLocaleString()} @ ${zesaTariff}/kWh
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200">
                <span className="text-[11px] font-bold text-red-900 uppercase block">Diesel Burn</span>
                <span className="text-xl font-black text-stone-900 font-mono mt-1 block">
                  {Math.round(dieselKwhSupplied).toLocaleString()} kWh
                </span>
                <span className="text-[10px] text-red-800 mt-0.5 block">
                  {Math.round(dieselLitres)}L (${Math.round(dieselCostUSD).toLocaleString()})
                </span>
              </div>
            </div>

            {/* Total Energy Metrics */}
            <div className="mt-4 p-4 rounded-xl bg-[#0B0B0F] text-white flex items-center justify-between border border-stone-800">
              <div>
                <span className="text-xs text-stone-400 block">Total Daily Energy Consumption</span>
                <span className="text-xl font-black text-white font-mono mt-0.5">
                  {Math.round(totalKwh).toLocaleString()} kWh
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 block">Cost Per Tonne</span>
                <span className="text-2xl font-black text-[#FFC72C] font-mono mt-0.5">
                  ${energyCostPerTonne} <span className="text-xs font-normal text-stone-400">/ t</span>
                </span>
              </div>
            </div>
          </div>

          {/* AI VISION FORECAST PANEL */}
          <div className="bg-white rounded-2xl p-6 border-2 border-stone-300 shadow-md space-y-6">
            {/* Panel Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-900/10 border border-purple-300 flex items-center justify-center text-purple-700">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                      Optical Volumetric AI
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Stereoscopic CAM-01 to 04</span>
                  </div>
                  <h4 className="font-black text-lg text-stone-900 mt-0.5">
                    AI Vision Forecast &amp; Slab Volumetrics
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                    isOptimalAccuracy
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-amber-50 text-amber-900 border-amber-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOptimalAccuracy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  ></span>
                  <span>{isOptimalAccuracy ? 'OPTIMAL ALIGNMENT' : 'CALIBRATION ADVISORY'}</span>
                </span>
              </div>
            </div>

            {/* TOP: Input Controls & Interactive Sliders */}
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#B38300]" />
                  AI Vision &amp; Demand Controls (Interactive Sliders)
                </span>
                <span className="text-[11px] text-stone-500 font-mono">Updates charts &amp; cards instantly</span>
              </div>

              {/* Controls Row 1: Camera Accuracy/Confidence, Tolerance, Slab Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Camera Accuracy % Slider (70-100) */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mb-1">
                    <span>
                      Camera Accuracy / Confidence
                      <ParameterTooltip text="Stereoscopic camera optical confidence score based on lens clarity and lighting" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">{cameraConfidence}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="100"
                    step="1"
                    value={cameraConfidence}
                    onChange={(e) => {
                      setCameraConfidence(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full accent-[#B38300] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-0.5">
                    <span>70% (Dusty)</span>
                    <span>100% (Lab Pristine)</span>
                  </div>
                </div>

                {/* 2. Tolerance Slider % (0.5 - 5.0) */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mb-1">
                    <span>
                      Tolerance Threshold (%)
                      <ParameterTooltip text="Allowable statutory variance percentage between physical belt scale and optical volume" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">±{tolerance}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={tolerance}
                    onChange={(e) => {
                      setTolerance(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full accent-[#B38300] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-0.5">
                    <span>±0.5% (Strict)</span>
                    <span>±5.0% (Wide)</span>
                  </div>
                </div>

                {/* 3. Slab Size Input (m²) */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mb-1">
                    <span>
                      Average Slab Size (m²)
                      <ParameterTooltip text="Average surface area recovery factor per gangsaw / dimensional slab cut" />
                    </span>
                    <span className="font-mono font-bold text-stone-900">{slabSize} m²</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="6.0"
                      value={slabSize}
                      onChange={(e) => {
                        setSlabSize(Number(e.target.value));
                        triggerRecalculate();
                      }}
                      className="w-full px-3 py-1.5 pr-8 rounded-lg border border-stone-300 font-mono text-xs text-stone-900 focus:outline-hidden focus:border-[#FFC72C]"
                    />
                    <span className="absolute right-2.5 top-1.5 text-stone-400 font-mono text-xs">m²</span>
                  </div>
                </div>
              </div>

              {/* Controls Row 2: Demand Increase Slider & Belt Speed Drop Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200">
                {/* 4. Demand Increase % Slider (0-50) */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mb-1">
                    <span>
                      Demand Increase %
                      <ParameterTooltip text="Projected regional market demand surge percentage for civil infrastructure" />
                    </span>
                    <span className="font-mono font-bold text-emerald-700">+{demandIncrease}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={demandIncrease}
                    onChange={(e) => {
                      setDemandIncrease(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-0.5">
                    <span>0% (Baseline)</span>
                    <span>+25%</span>
                    <span>+50% (Max Boom)</span>
                  </div>
                </div>

                {/* 5. Belt Speed Drop % Slider (0-30) */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mb-1">
                    <span>
                      Belt Speed Drop %
                      <ParameterTooltip text="Simulates mechanical conveyor belt slip or motor frequency degradation" />
                    </span>
                    <span className="font-mono font-bold text-red-600">-{beltSpeedDrop}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={beltSpeedDrop}
                    onChange={(e) => {
                      setBeltSpeedDrop(Number(e.target.value));
                      triggerRecalculate();
                    }}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-0.5">
                    <span>0% (Nominal)</span>
                    <span>-15% (Slip)</span>
                    <span>-30% (Severe)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MIDDLE: 2 Charts Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Chart 1: Belt Scale vs AI Vision Line Chart */}
              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">
                      Belt Scale vs. AI Vision Throughput
                    </h5>
                    <span className="text-[10px] text-stone-500 font-mono">
                      Continuous 6-hour correlation profile (t/h)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="flex items-center gap-1 text-blue-600 font-semibold">
                      <span className="w-2.5 h-0.5 bg-blue-500"></span> Scale
                    </span>
                    <span className="flex items-center gap-1 text-[#B38300] font-semibold">
                      <span className="w-2.5 h-0.5 bg-[#FFC72C]"></span> AI Vision
                    </span>
                  </div>
                </div>

                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={beltVsVisionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1efe7" />
                      <XAxis dataKey="time" stroke="#8c8a82" fontSize={10} tickLine={false} />
                      <YAxis stroke="#8c8a82" fontSize={10} tickLine={false} domain={['auto', 'auto']} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#0B0B0F',
                          borderRadius: '8px',
                          border: '1px solid #2b2b36',
                          color: '#fff',
                          fontSize: '11px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="beltScale"
                        name="Belt Scale (t/h)"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="aiVision"
                        name="AI Vision (t/h)"
                        stroke="#FFC72C"
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Slab Count Bar Chart */}
              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">
                      Slab Count by Granite Cut Grade
                    </h5>
                    <span className="text-[10px] text-stone-500 font-mono">
                      Total: {totalVisionSlabs.toLocaleString()} slabs classified
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-bold">
                    Stereo 3D Classified
                  </span>
                </div>

                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={slabCountData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1efe7" />
                      <XAxis dataKey="category" stroke="#8c8a82" fontSize={9} tickLine={false} interval={0} />
                      <YAxis stroke="#8c8a82" fontSize={10} tickLine={false} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#0B0B0F',
                          borderRadius: '8px',
                          border: '1px solid #2b2b36',
                          color: '#fff',
                          fontSize: '11px',
                        }}
                      />
                      <Bar dataKey="count" name="Slabs Counted" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* BOTTOM: 4 Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Result Card 1: Forecast Accuracy */}
              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="font-bold uppercase tracking-wider">Forecast Accuracy</span>
                    <Camera className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-stone-900 font-mono">
                      {discrepancyPercent}%
                    </span>
                    <span className="text-xs font-semibold text-stone-500">discrepancy</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Tolerance: ±{tolerance}%</span>
                    <span
                      className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                        isOptimalAccuracy
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isOptimalAccuracy ? 'PASSED' : 'ADVISORY'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Card 2: Revenue Forecast */}
              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="font-bold uppercase tracking-wider">Revenue Forecast</span>
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-stone-900 font-mono">
                      ${visionTodayRevUSD.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-500 block font-mono">
                      ${visionMonthlyRevUSD.toLocaleString()} / mo
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] text-stone-600 font-mono">
                  {totalVisionSlabs.toLocaleString()} slabs &bull; {visionTodayM2.toLocaleString()} m²
                </div>
              </div>

              {/* Result Card 3: Demand Prediction */}
              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="font-bold uppercase tracking-wider">Demand Prediction</span>
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-stone-900 font-mono">
                      +{demandIncrease}%
                    </span>
                    <span className="text-xs text-stone-500 block">30-day regional trend</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] text-stone-600">
                  <span>Rec Rate: </span>
                  <strong className="text-stone-900 font-mono">{recommendedCrushRateTph} t/h</strong>
                  <span className="text-stone-400 ml-1 font-mono">({stockyardRunwayDays}d buffer)</span>
                </div>
              </div>

              {/* Result Card 4: Actionable Recommendations */}
              <div className="p-4 rounded-xl border border-stone-200 bg-amber-50/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-amber-900 text-xs">
                    <span className="font-bold uppercase tracking-wider">Recommendations</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#B38300]" />
                  </div>
                  <p className="mt-2 text-[11px] text-stone-800 leading-snug font-medium line-clamp-4">
                    {actionableRecommendationText}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-amber-200 text-[10px] text-amber-900 font-mono font-bold flex items-center justify-between">
                  <span>Live Advisory</span>
                  <span>100% Dynamic</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 5: Power Cut Simulator */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500" />
                <h4 className="font-bold text-base text-stone-900">
                  Card 5 — Power Cut Simulator
                </h4>
              </div>

              {/* Grid failure simulation trigger button */}
              <button
                onClick={() => {
                  setPowerCutActive(!powerCutActive);
                  triggerRecalculate();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 ${
                  powerCutActive
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-[#0B0B0F] text-[#FFC72C] hover:bg-stone-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{powerCutActive ? 'Grid Failure Active (Click to Restore)' : 'Simulate Grid Failure'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Solar Coverage</span>
                <span className="text-lg font-black text-[#B38300] font-mono mt-1 block">
                  {solarCoveragePercent}%
                </span>
                <span className="text-[10px] text-stone-400">{solarKw} kW Array</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Generator Load</span>
                <span className="text-lg font-black text-stone-900 font-mono mt-1 block">
                  {gensetDeficitKw} kW
                </span>
                <span className="text-[10px] text-stone-400">Tier-4 CAT Genset</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Diesel Burn Cost</span>
                <span className="text-lg font-black text-red-600 font-mono mt-1 block">
                  ${hourlyDieselCost}/hr
                </span>
                <span className="text-[10px] text-stone-400">${dieselPrice}/L Fuel</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Production Impact</span>
                <span className={`text-lg font-black font-mono mt-1 block ${powerCutActive ? 'text-amber-600' : 'text-emerald-700'}`}>
                  {powerCutActive ? '-15% Choke' : '100% Full Flow'}
                </span>
                <span className="text-[10px] text-stone-400">
                  {powerCutActive ? 'Surge buffer feed' : 'Normal SCADA'}
                </span>
              </div>
            </div>

            {powerCutActive && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 leading-relaxed flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>
                  <strong>ZETDC Outage Simulated:</strong> Microgrid PLC seamlessly directed solar power to Secondary Cone CH440 while standby diesel genset handles the primary jaw. Downstream surge pile buffering absorbs the load shed shock.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar: Reset to Defaults & Load Real Plant Data */}
      <div className="sticky bottom-4 z-40 bg-[#0B0B0F]/95 backdrop-blur-md text-white p-4 rounded-2xl border border-stone-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-stone-300">
          <Sparkles className="w-4 h-4 text-[#FFC72C]" />
          <span>
            <strong>QuarryIQ Control Room Modeler:</strong> Every value above updates production yield and energy economics in real time.
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleResetDefaults}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-stone-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            onClick={handleLoadRealData}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#FFC72C] hover:bg-[#ffcf47] text-[#0B0B0F] font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#FFC72C]/20 border border-[#e5af1f]"
          >
            <Cpu className="w-3.5 h-3.5 text-[#0B0B0F]" />
            <span>Load Real Plant Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
