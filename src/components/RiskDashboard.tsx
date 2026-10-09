import React, { useState, useMemo } from 'react';
import {
  Zap,
  Gauge,
  Activity,
  Thermometer,
  Droplets,
  CloudLightning,
  Radio,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Sliders,
  DollarSign,
  Calculator,
  Bot,
  Sparkles,
  ArrowRight,
  Shield,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Send,
  Layers,
  ChevronRight,
  Clock,
  Building2,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import {
  INITIAL_RISK_PARAMETERS,
  RiskParameterItem,
  Risk24hPoint
} from '../mockData';
import {
  RoiDisclaimerBanner,
  RoiTooltipBadge,
  ROI_TOOLTIP_TEXT
} from './RoiDisclaimerBanner';

// Preset configurations for interactive demo
interface DemoPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  values: {
    transformerLoad: number;
    powerFactor: number;
    motorInsulation: number;
    mccTemperature: number;
    mccHumidity: number;
    waterLeakDetection: number;
    lightningRisk: number;
    gridStability: number;
  };
}

const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'nominal',
    name: 'Nominal Operations',
    badge: 'Baseline',
    description: 'All 8 telemetry channels inside certified green operating envelopes.',
    values: {
      transformerLoad: 84,
      powerFactor: 0.97,
      motorInsulation: 2.2,
      mccTemperature: 24.5,
      mccHumidity: 48,
      waterLeakDetection: 0,
      lightningRisk: 30,
      gridStability: 94,
    },
  },
  {
    id: 'peak-load',
    name: 'Mid-Day Crushing Peak',
    badge: 'High Load',
    description: 'Heavy secondary cone feed pushes transformer to 104% with inductive lag.',
    values: {
      transformerLoad: 104,
      powerFactor: 0.91,
      motorInsulation: 1.5,
      mccTemperature: 31.0,
      mccHumidity: 55,
      waterLeakDetection: 0,
      lightningRisk: 45,
      gridStability: 82,
    },
  },
  {
    id: 'thunderstorm',
    name: 'Highveld Summer Thunderstorm',
    badge: 'Nov–Mar Season',
    description: 'Active Highveld lightning front, ZESA grid voltage sags, 74% humidity.',
    values: {
      transformerLoad: 88,
      powerFactor: 0.93,
      motorInsulation: 1.1,
      mccTemperature: 28.0,
      mccHumidity: 74,
      waterLeakDetection: 0,
      lightningRisk: 88,
      gridStability: 55,
    },
  },
  {
    id: 'critical-fault',
    name: 'Cable Trench Ingress & Insulation Sag',
    badge: 'Urgent Action',
    description: 'Water leak alarm in MCC trench 2 and motor megger drops to 0.7 MΩ.',
    values: {
      transformerLoad: 108,
      powerFactor: 0.83,
      motorInsulation: 0.65,
      mccTemperature: 36.2,
      mccHumidity: 79,
      waterLeakDetection: 1,
      lightningRisk: 72,
      gridStability: 40,
    },
  },
];

export const RiskDashboard: React.FC = () => {
  // Live parameters state
  const [params, setParams] = useState(INITIAL_RISK_PARAMETERS);
  const [activePreset, setActivePreset] = useState<string>('custom');

  // Risk Mitigation Calculator state
  const [downtimeCostPerEvent, setDowntimeCostPerEvent] = useState<number>(18500); // $X
  const [downtimeFrequencyPerYear, setDowntimeFrequencyPerYear] = useState<number>(14); // Y
  const [systemPreventionPercent, setSystemPreventionPercent] = useState<number>(78); // %

  // AI Assistant consultation state
  const [assistantQuery, setAssistantQuery] = useState<string>('');
  const [assistantResponse, setAssistantResponse] = useState<{
    topic: string;
    headline: string;
    urgency: 'Low' | 'Moderate' | 'Critical';
    immediateAction: string;
    technicalDiagnosis: string;
    preventativeProtocol: string;
    financialSafeguard: string;
  } | null>(null);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Parameter updater helper
  const updateParamValue = (id: string, value: number) => {
    setActivePreset('custom');
    setParams((prev) => {
      const current = prev[id];
      if (!current) return prev;

      let displayValue = `${value}${current.unit ? ` ${current.unit}` : ''}`;
      let status: 'optimal' | 'warning' | 'critical' = 'optimal';

      if (id === 'transformerLoad') {
        displayValue = `${value}%`;
        if (value >= 110) status = 'critical';
        else if (value >= 100) status = 'warning';
        else status = 'optimal';
      } else if (id === 'powerFactor') {
        displayValue = `${value.toFixed(2)} ${value > 1.0 ? 'CAP' : 'LAG'}`;
        if (value > 1.0 || value < 0.85) status = 'critical';
        else if (value < 0.95) status = 'warning';
        else status = 'optimal';
      } else if (id === 'motorInsulation') {
        displayValue = `${value.toFixed(1)} MΩ`;
        if (value < 0.5) status = 'critical';
        else if (value < 1.0) status = 'warning';
        else status = 'optimal';
      } else if (id === 'mccTemperature') {
        displayValue = `${value.toFixed(1)} °C`;
        if (value >= 35) status = 'critical';
        else if (value >= 27) status = 'warning';
        else status = 'optimal';
      } else if (id === 'mccHumidity') {
        displayValue = `${value} %`;
        if (value >= 70 || value < 25) status = 'critical';
        else if (value >= 56) status = 'warning';
        else status = 'optimal';
      } else if (id === 'waterLeakDetection') {
        displayValue = value === 1 ? 'ALARM (Water Ingress Detected)' : 'OK (Dry Basement)';
        status = value === 1 ? 'critical' : 'optimal';
      } else if (id === 'lightningRisk') {
        displayValue = value >= 75 ? 'HIGH (Nov–Mar Storm Window)' : value >= 50 ? 'MODERATE (Transitional)' : 'LOW (Clear Sky)';
        if (value >= 75) status = 'critical';
        else if (value >= 50) status = 'warning';
        else status = 'optimal';
      } else if (id === 'gridStability') {
        displayValue = value < 40 ? 'ZESA Outage (Island Mode)' : value < 70 ? 'Grid Sag / High THD' : 'Stable ZESA (49.8 Hz / 402V)';
        if (value < 40) status = 'critical';
        else if (value < 70) status = 'warning';
        else status = 'optimal';
      }

      return {
        ...prev,
        [id]: {
          ...current,
          currentValue: value,
          displayValue,
          status,
        },
      };
    });
  };

  // Apply Demo Preset
  const applyPreset = (preset: DemoPreset) => {
    setActivePreset(preset.id);
    Object.entries(preset.values).forEach(([k, v]) => {
      updateParamValue(k, v);
    });
  };

  // Calculate Overall Plant Risk Score (0 - 100)
  const overallRiskScore = useMemo(() => {
    let score = 0;

    // Transformer (max 20 pts)
    const tLoad = params.transformerLoad.currentValue;
    if (tLoad >= 110) score += 20;
    else if (tLoad >= 100) score += 12 + ((tLoad - 100) / 10) * 8;
    else if (tLoad >= 90) score += ((tLoad - 90) / 10) * 10;
    else score += (tLoad / 90) * 4;

    // Power Factor (max 15 pts)
    const pf = params.powerFactor.currentValue;
    if (pf > 1.0) score += 15;
    else if (pf < 0.85) score += 15;
    else if (pf < 0.95) score += 5 + ((0.95 - pf) / 0.10) * 8;
    else score += 2;

    // Motor Insulation (max 20 pts)
    const megger = params.motorInsulation.currentValue;
    if (megger < 0.5) score += 20;
    else if (megger < 1.0) score += 10 + ((1.0 - megger) / 0.5) * 8;
    else if (megger < 2.0) score += ((2.0 - megger) / 1.0) * 5;
    else score += 1;

    // MCC Temp (max 10 pts)
    const temp = params.mccTemperature.currentValue;
    if (temp >= 35) score += 10;
    else if (temp >= 27) score += 4 + ((temp - 27) / 8) * 5;
    else score += 1;

    // MCC Humidity (max 10 pts)
    const hum = params.mccHumidity.currentValue;
    if (hum >= 70) score += 10;
    else if (hum >= 56) score += 3 + ((hum - 56) / 14) * 6;
    else score += 1;

    // Water Leak (max 15 pts)
    if (params.waterLeakDetection.currentValue === 1) score += 15;

    // Lightning Risk (max 10 pts)
    score += (params.lightningRisk.currentValue / 100) * 10;

    // Grid Stability (max 10 pts; lower stability = higher risk)
    const grid = params.gridStability.currentValue;
    score += ((100 - grid) / 100) * 10;

    return Math.min(Math.round(score), 100);
  }, [params]);

  // Color & Badge for Risk Score
  const riskGrade = useMemo(() => {
    if (overallRiskScore >= 75) {
      return {
        label: 'CRITICAL RISK',
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/40',
        badge: 'Immediate Engineering Intervention Required',
        summary: 'Catastrophic downtime or asset damage imminent without load-shedding and trench mitigation.',
      };
    }
    if (overallRiskScore >= 50) {
      return {
        label: 'ELEVATED RISK',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/40',
        badge: 'Warning Thresholds Breached',
        summary: 'Multiple parameters nearing tripping envelope; APFC and HVAC adjustments advised.',
      };
    }
    if (overallRiskScore >= 25) {
      return {
        label: 'MODERATE RISK',
        color: 'text-yellow-600',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/40',
        badge: 'Normal Operational Vigilance',
        summary: 'Minor seasonal or loading variances detected; automated mitigations holding steady.',
      };
    }
    return {
      label: 'LOW RISK',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/40',
      badge: 'Optimal Safety & Dielectric Health',
      summary: 'All Davis Granite electrical, environmental and grid telemetry within certified bounds.',
    };
  }, [overallRiskScore]);

  // Calculated Risk Mitigation Values
  const totalAnnualRiskCost = useMemo(() => {
    return downtimeCostPerEvent * downtimeFrequencyPerYear;
  }, [downtimeCostPerEvent, downtimeFrequencyPerYear]);

  const preventedRiskCost = useMemo(() => {
    return Math.round(totalAnnualRiskCost * (systemPreventionPercent / 100));
  }, [totalAnnualRiskCost, systemPreventionPercent]);

  const residualRiskCost = useMemo(() => {
    return totalAnnualRiskCost - preventedRiskCost;
  }, [totalAnnualRiskCost, preventedRiskCost]);

  // Handle AI Assistant Inquiry
  const handleAskAssistant = (promptText: string) => {
    setIsAiThinking(true);
    setAssistantQuery(promptText);

    setTimeout(() => {
      const q = promptText.toLowerCase();
      let res = {
        topic: 'Davis Granite Substation Telemetry Audit',
        headline: 'SitePlan AI Comprehensive Plant Diagnostic',
        urgency: overallRiskScore > 70 ? ('Critical' as const) : overallRiskScore > 45 ? ('Moderate' as const) : ('Low' as const),
        immediateAction: 'Stagger jaw crusher restarts and ensure APFC stage 3 is engaged.',
        technicalDiagnosis: 'Composite risk score is currently calculated from 8 continuous telemetry sensors across Davis Granite 33kV step-down transformers, switchroom ambient sensors, and motor winding sensors.',
        preventativeProtocol: 'Weekly Megger megohmmeter logging and bi-weekly cable basement inspection.',
        financialSafeguard: `Preventing ~$${preventedRiskCost.toLocaleString()} in annual downtime through predictive threshold alarms.`,
      };

      if (q.includes('transformer') || q.includes('load')) {
        const val = params.transformerLoad.currentValue;
        res = {
          topic: 'Transformer Loading & Thermal Breaker Tripping',
          headline: `Substation 1.5 MVA Transformer Operating at ${val}% Load`,
          urgency: val >= 110 ? 'Critical' : val >= 100 ? 'Moderate' : 'Low',
          immediateAction:
            val >= 100
              ? 'Initiate SCADA choke-feed reduction on secondary cone crusher to lower load by 150 kVA within 5 minutes.'
              : 'Maintain current feed pacing; keep primary jaw crusher feed chute steady to avoid surging.',
          technicalDiagnosis: `At ${val}% loading, winding hot-spot temperature rises. Continuous load >100% causes rapid dielectric breakdown of transformer naphthenic oil. Buchholz gas relay is set to trip at 110%.`,
          preventativeProtocol: 'Schedule quarterly dissolved gas analysis (DGA) and verify oil radiator cooling fan thermostats.',
          financialSafeguard: 'Prevents transformer catastrophic blowout ($140,000 replacement + 6 weeks import lead time from South Africa).',
        };
      } else if (q.includes('power factor') || q.includes('pf') || q.includes('zesa') || q.includes('kvar')) {
        const pf = params.powerFactor.currentValue;
        const isCap = pf > 1.0;
        res = {
          topic: 'Power Factor & ZESA Maximum Demand Billing',
          headline: `Current Power Factor: ${pf.toFixed(2)} ${isCap ? 'CAPACITIVE (LEADING)' : 'INDUCTIVE (LAGGING)'}`,
          urgency: isCap || pf < 0.85 ? 'Critical' : pf < 0.95 ? 'Moderate' : 'Low',
          immediateAction: isCap
            ? 'Disengage 150 kVAR static capacitor bank stage immediately to stop leading voltage resonance.'
            : pf < 0.95
            ? 'Energize APFC bank Stage 3 (75 kVAR) to boost displacement power factor above 0.95 LAG.'
            : 'APFC bank operating optimally. Zero penalty billing expected on next ZESA invoice.',
          technicalDiagnosis:
            'ZESA tariffs impose punitive maximum demand penalties when monthly power factor falls below 0.90 LAG. However, over-correcting past 1.00 into capacitive mode introduces severe harmonic distortion and alternator hunting when running on diesel generator.',
          preventativeProtocol: 'Calibrate automatic power factor controller step timing from 30s to 15s to react faster to jaw crusher rock gulps.',
          financialSafeguard: 'Saves between $2,400 and $4,100 per month in avoided ZESA reactive power surcharge fees.',
        };
      } else if (q.includes('insulation') || q.includes('megger') || q.includes('motor')) {
        const meg = params.motorInsulation.currentValue;
        res = {
          topic: 'Motor Insulation Resistance & Dielectric Health',
          headline: `Primary 250kW Jaw Crusher Megger Reading: ${meg.toFixed(1)} MΩ`,
          urgency: meg < 0.5 ? 'Critical' : meg < 1.0 ? 'Moderate' : 'Low',
          immediateAction:
            meg < 1.0
              ? 'ALERT: Motor insulation below 1.0 MΩ statutory safety threshold. Schedule controlled shutdown at next changeover to inspect stator terminal box for granite dust ingress.'
              : 'Dielectric strength healthy. Verify internal anti-condensation space heaters are energized whenever the motor is de-energized.',
          technicalDiagnosis:
            'Granite rock dust is semi-conductive when combined with ambient moisture. Moisture penetration into class F stator winding slots drops insulation resistance, leading to phase-to-phase flashover.',
          preventativeProtocol: 'Apply high-pressure dry air purge to motor terminal enclosures; conduct annual polarization index (PI) tests.',
          financialSafeguard: 'Avoids motor stator burnout emergency rewinding ($38,000 + 10 days lost quarry throughput).',
        };
      } else if (q.includes('mcc') || q.includes('temp') || q.includes('temperature') || q.includes('hvac')) {
        const t = params.mccTemperature.currentValue;
        res = {
          topic: 'MCC Switchroom Climate & VFD Heatsink Protection',
          headline: `MCC Room Temperature: ${t.toFixed(1)}°C (Threshold 35°C)`,
          urgency: t >= 35 ? 'Critical' : t >= 27 ? 'Moderate' : 'Low',
          immediateAction:
            t >= 27
              ? 'Check Daikin split unit #2 compressor run indicator. Inspect outside condenser coils for granite dust caking.'
              : 'Ambient temperature is within optimal 18°C–26°C envelope for Siemens Sinamics VFD inverters.',
          technicalDiagnosis:
            'For every 10°C rise above 25°C in switchrooms, electrolytic capacitor lifespan in VFD drives and Siemens S7-1500 PLC power supplies is halved. At 35°C, inverters automatically derate output torque.',
          preventativeProtocol: 'Monthly air filter replacement on switchroom intake dampers; test auto-failover between dual HVAC units.',
          financialSafeguard: 'Prevents nuisance VFD over-temperature trips costing $6,800/hour during peak 500 t/h crushing runs.',
        };
      } else if (q.includes('humidity') || q.includes('condensation') || q.includes('moisture')) {
        const h = params.mccHumidity.currentValue;
        res = {
          topic: 'MCC Humidity & Busbar Condensation Prevention',
          headline: `Relative Humidity: ${h}% RH (Safe Envelope 35%–55%)`,
          urgency: h >= 70 ? 'Critical' : h >= 56 ? 'Moderate' : 'Low',
          immediateAction:
            h >= 56
              ? 'Engage secondary industrial desiccant dehumidifier. Keep switchroom airlock access doors closed.'
              : 'Humidity in safe envelope. Non-condensing environment verified.',
          technicalDiagnosis:
            'Rapid night-time temperature drops in Zimbabwe cause air inside the MCC to reach dew point, forming micro-droplets on 400V busbar insulators and causing tracking arc faults.',
          preventativeProtocol: 'Maintain cabinet interior heating strips at 5°C above room ambient.',
          financialSafeguard: 'Protects main switchgear board from catastrophic arc-flash destruction ($85,000 replacement value).',
        };
      } else if (q.includes('leak') || q.includes('water') || q.includes('flood') || q.includes('trench')) {
        const leak = params.waterLeakDetection.currentValue === 1;
        res = {
          topic: 'Underfloor Cable Trench Water Ingress Telemetry',
          headline: leak ? 'CRITICAL ALARM: Liquid Ingress Detected in Trench 2' : 'OK: Sub-floor Cable Basement Completely Dry',
          urgency: leak ? 'Critical' : 'Low',
          immediateAction: leak
            ? 'DISPATCH ELECTRICAL FOREMAN: Start emergency sump ejector pump. Check perimeter stormwater berm adjacent to sand washing slurry line.'
            : 'Continuous resistive sensor ribbon reports zero conductive moisture contact.',
          technicalDiagnosis:
            'Davis Granite site topography allows heavy rain runoff from the quarry pit and washing classification cyclones to pool near underground cable ducts entering the MCC building.',
          preventativeProtocol: 'Quarterly hydrostatic sealing of cable transit penetrations (Roxtec frames) and annual sump pit float switch testing.',
          financialSafeguard: 'Eliminates 33kV cable splice water immersion failure, saving an estimated $45,000 in emergency excavation and re-cabling.',
        };
      } else if (q.includes('lightning') || q.includes('storm') || q.includes('season') || q.includes('zimbabwe')) {
        const lr = params.lightningRisk.currentValue;
        res = {
          topic: 'Zimbabwe Highveld Lightning Defense (Nov–Mar Season)',
          headline: `Lightning Risk Level: ${params.lightningRisk.displayValue}`,
          urgency: lr >= 75 ? 'Critical' : lr >= 50 ? 'Moderate' : 'Low',
          immediateAction:
            lr >= 75
              ? 'Activate Highveld Storm Protocol: Ensure all SCADA fiber optical isolation barriers are active; check 33kV surge arrester discharge counters; put diesel generator on hot-sync standby.'
              : 'Surge arresters armed and operational. Substation earth grid ground resistance tested at 3.2Ω.',
          technicalDiagnosis:
            'Zimbabwe Highveld experiences >15 ground lightning flashes/km²/year between November and March. Direct strikes or induced surges travel through overhead 33kV lines, destroying unprotected PLC analog inputs.',
          preventativeProtocol: 'Pre-season earth rod resistance validation (<5 Ohms) and gas discharge tube (GDT) arrester inspections every October.',
          financialSafeguard: 'Prevents fried S7-1500 PLC racks and weighbridge load cell electronics ($32,000+ per strike event).',
        };
      } else if (q.includes('grid') || q.includes('generator') || q.includes('frequency') || q.includes('genset')) {
        const gs = params.gridStability.currentValue;
        res = {
          topic: 'Grid Stability: ZESA Utility vs 800kVA Cat Genset',
          headline: `Grid Quality Index: ${gs}/100 — ${params.gridStability.displayValue}`,
          urgency: gs < 40 ? 'Critical' : gs < 70 ? 'Moderate' : 'Low',
          immediateAction:
            gs < 70
              ? 'Frequency sag detected on incoming 33kV feed. Pre-heat Caterpillar 800kVA generator jackets and arm ATS for seamless 12s transfer.'
              : 'ZESA grid stable within 49.8–50.2 Hz tolerance. Genset on ready standby with 3,640L diesel buffer.',
          technicalDiagnosis:
            'Unstable grid frequency below 47.5 Hz damages induction motor windings through slip heating. Automatic transfer switch ensures critical plant sections swap to generator before motor stalling occurs.',
          preventativeProtocol: 'Weekly automated 15-minute load-bank test of the diesel generator and ATS contactor cleaning.',
          financialSafeguard: 'Avoids jaw crusher stall under load (clearing jammed 40-tonne rock chute takes 6 man-hours of manual jackhammering).',
        };
      }

      setAssistantResponse(res);
      setIsAiThinking(false);
    }, 450);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header & Engineering Context Banner */}
      <div className="bg-[#0B0B0F] text-white rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle background tech grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#FFC72C_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-[#FFC72C] bg-[#FFC72C]/10 border border-[#FFC72C]/30 px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Davis Granite Site Assessment Context
              </span>
              <span className="text-xs font-mono text-stone-400 bg-stone-900 border border-stone-800 px-2 py-0.5 rounded">
                8 Real-Time Telemetry Parameters
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Continuous Live Telemetry
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Substation &amp; Plant Risk Engineering Command
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Real-time failure defense across the 8 critical engineering vulnerabilities identified during the Davis Granite site assessment. Monitors transformer overloading, inductive power factor penalties, motor dielectric breakdown, MCC switchroom microclimates, cable trench water ingress, Highveld lightning strikes, and ZESA grid quality.
            </p>
          </div>

          {/* Interactive Simulation Preset Switcher */}
          <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-xl flex flex-col gap-2.5 min-w-[280px]">
            <div className="flex items-center justify-between text-xs text-stone-400 font-semibold border-b border-stone-800 pb-2">
              <span className="flex items-center gap-1.5 text-stone-200">
                <Sliders className="w-3.5 h-3.5 text-[#FFC72C]" />
                Demo Simulation Presets:
              </span>
              <span className="text-[10px] text-stone-500 font-mono">Click to test</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_PRESETS.map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`text-left p-2 rounded-lg text-xs transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#FFC72C] text-[#0B0B0F] border-[#FFC72C] font-bold shadow-md'
                        : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border-stone-700/80 hover:border-stone-600'
                    }`}
                  >
                    <div className="font-bold truncate text-[11px]">{preset.name}</div>
                    <div className={`text-[9px] truncate ${isSelected ? 'text-[#0B0B0F]/80' : 'text-stone-400'}`}>
                      {preset.badge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top "Risk Score" Widget (0 - 100 with color coding) */}
      <RoiDisclaimerBanner />

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Circular / Arc Risk Gauge (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 border-b lg:border-b-0 lg:border-r border-stone-200/80 pb-6 lg:pb-0 lg:pr-8">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              {/* SVG Circular Gauge */}
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#f1efe7"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke={
                    overallRiskScore >= 75
                      ? '#ef4444'
                      : overallRiskScore >= 50
                      ? '#f59e0b'
                      : overallRiskScore >= 25
                      ? '#d97706'
                      : '#10b981'
                  }
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={2 * Math.PI * 58 * (1 - overallRiskScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black font-mono text-stone-900 tracking-tight">
                  {overallRiskScore}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  / 100 Risk
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${riskGrade.color} ${riskGrade.bg} ${riskGrade.border}`}
                >
                  {riskGrade.label}
                </span>
              </div>
              <h3 className="text-lg font-black text-stone-900 tracking-tight">
                Plant Overall Risk Score
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
                {riskGrade.summary}
              </p>
              <div className="text-[11px] font-semibold text-stone-600 pt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-stone-400" />
                <span>{riskGrade.badge}</span>
              </div>
            </div>
          </div>

          {/* Breakdown Sub-Scores by Category (col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Electrical Sub-Score */}
            <div className="bg-stone-50 border border-stone-200/90 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-bold mb-2">
                  <span className="flex items-center gap-1.5 text-stone-800">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Electrical Integrity
                  </span>
                  <span className="font-mono text-stone-600 text-[11px]">40 pts max</span>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Transformer Load:</span>
                    <span className="font-mono font-bold">{params.transformerLoad.displayValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Power Factor:</span>
                    <span className="font-mono font-bold">{params.powerFactor.displayValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motor Megger:</span>
                    <span className="font-mono font-bold">{params.motorInsulation.displayValue}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between">
                <span>Status:</span>
                <span className="font-bold text-stone-800">
                  {params.transformerLoad.status === 'critical' || params.motorInsulation.status === 'critical'
                    ? '⚠️ Action Required'
                    : '✅ Balanced'}
                </span>
              </div>
            </div>

            {/* 2. Environmental Sub-Score */}
            <div className="bg-stone-50 border border-stone-200/90 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-bold mb-2">
                  <span className="flex items-center gap-1.5 text-stone-800">
                    <Thermometer className="w-4 h-4 text-blue-500" />
                    MCC Microclimate
                  </span>
                  <span className="font-mono text-stone-600 text-[11px]">35 pts max</span>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span>MCC Temp:</span>
                    <span className="font-mono font-bold">{params.mccTemperature.displayValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MCC Humidity:</span>
                    <span className="font-mono font-bold">{params.mccHumidity.displayValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Water Leak:</span>
                    <span
                      className={`font-mono font-bold ${
                        params.waterLeakDetection.currentValue === 1 ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {params.waterLeakDetection.currentValue === 1 ? 'ALARM' : 'OK'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between">
                <span>Status:</span>
                <span className="font-bold text-stone-800">
                  {params.waterLeakDetection.currentValue === 1 ? '🚨 Ingress Alert' : '✅ Enclosure Sealed'}
                </span>
              </div>
            </div>

            {/* 3. Grid & Atmospheric Sub-Score */}
            <div className="bg-stone-50 border border-stone-200/90 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-bold mb-2">
                  <span className="flex items-center gap-1.5 text-stone-800">
                    <CloudLightning className="w-4 h-4 text-purple-500" />
                    Grid &amp; Lightning
                  </span>
                  <span className="font-mono text-stone-600 text-[11px]">25 pts max</span>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Lightning Risk:</span>
                    <span className="font-mono font-bold">
                      {params.lightningRisk.currentValue >= 75 ? 'HIGH (Nov-Mar)' : 'NORMAL'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grid Quality:</span>
                    <span className="font-mono font-bold">{params.gridStability.currentValue}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gen Standby:</span>
                    <span className="font-mono font-bold text-emerald-600">800kVA Cat OK</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between">
                <span>Status:</span>
                <span className="font-bold text-stone-800">
                  {params.lightningRisk.currentValue >= 75 ? '⚡ Highveld Season' : '✅ Normal Window'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 8 Real-time Monitored Parameter Cards Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#FFC72C]" />
              8 Real-Time Monitored Engineering Parameters
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Live values with interactive demo sliders, threshold envelope indicators, site recommendations, and 24-hour historical trending.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Green: Safe
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 ml-2"></span> Amber: Warning
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 ml-2"></span> Red: Critical
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* CARD 1: Transformer Load % */}
          <ParameterCard
            item={params.transformerLoad}
            icon={Zap}
            iconColor="text-amber-500"
            onValueChange={(val) => updateParamValue('transformerLoad', val)}
            formatTooltip={(val) => `${val}% load`}
          />

          {/* CARD 2: Power Factor (cos φ) */}
          <ParameterCard
            item={params.powerFactor}
            icon={Radio}
            iconColor="text-blue-500"
            onValueChange={(val) => updateParamValue('powerFactor', val)}
            formatTooltip={(val) => `${Number(val).toFixed(2)} cos φ`}
          />

          {/* CARD 3: Motor Insulation Resistance (MΩ) */}
          <ParameterCard
            item={params.motorInsulation}
            icon={Activity}
            iconColor="text-emerald-500"
            onValueChange={(val) => updateParamValue('motorInsulation', val)}
            formatTooltip={(val) => `${Number(val).toFixed(1)} MΩ`}
          />

          {/* CARD 4: MCC Room Temperature (°C) */}
          <ParameterCard
            item={params.mccTemperature}
            icon={Thermometer}
            iconColor="text-orange-500"
            onValueChange={(val) => updateParamValue('mccTemperature', val)}
            formatTooltip={(val) => `${val}°C`}
          />

          {/* CARD 5: MCC Room Humidity (%) */}
          <ParameterCard
            item={params.mccHumidity}
            icon={Droplets}
            iconColor="text-cyan-500"
            onValueChange={(val) => updateParamValue('mccHumidity', val)}
            formatTooltip={(val) => `${val}% RH`}
          />

          {/* CARD 6: Water Leak Detection (Alarm/OK) */}
          <ParameterCard
            item={params.waterLeakDetection}
            icon={Droplets}
            iconColor="text-indigo-500"
            isToggle={true}
            onValueChange={(val) => updateParamValue('waterLeakDetection', val)}
            formatTooltip={(val) => (val === 1 ? 'ALARM' : 'OK')}
          />

          {/* CARD 7: Lightning Risk Status */}
          <ParameterCard
            item={params.lightningRisk}
            icon={CloudLightning}
            iconColor="text-purple-500"
            onValueChange={(val) => updateParamValue('lightningRisk', val)}
            formatTooltip={(val) => `${val} index`}
          />

          {/* CARD 8: Grid Stability (ZESA vs Generator) */}
          <ParameterCard
            item={params.gridStability}
            icon={Gauge}
            iconColor="text-rose-500"
            onValueChange={(val) => updateParamValue('gridStability', val)}
            formatTooltip={(val) => `${val} stability`}
          />
        </div>
      </div>

      {/* 4. Risk Mitigation Value Calculator */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Financial Risk Defense
                </span>
              </div>
              <h3 className="text-xl font-black text-stone-900 mt-0.5">
                Risk Mitigation Value Calculator
              </h3>
            </div>
          </div>
          <p className="text-xs text-stone-500 sm:max-w-md">
            Quantifies the exact operational and capital loss prevented by SitePlan AI predictive telemetry versus unmonitored reactive run-to-failure mining operations.
          </p>
        </div>

        {/* Inputs & Outputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Inputs Section (col-span-5) */}
          <div className="lg:col-span-5 space-y-5 bg-stone-50 p-6 rounded-xl border border-stone-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-stone-700" />
              Plant Downtime Inputs
            </h4>

            {/* Input 1: Cost of One Unplanned Downtime Event ($X) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <label htmlFor="cost-event">Cost of One Unplanned Event ($X):</label>
                <div className="flex items-center font-mono font-bold text-stone-900 bg-white px-2.5 py-1 rounded border border-stone-300">
                  <DollarSign className="w-3.5 h-3.5 text-stone-500" />
                  <input
                    id="cost-event"
                    type="number"
                    value={downtimeCostPerEvent}
                    onChange={(e) => setDowntimeCostPerEvent(Math.max(0, Number(e.target.value) || 0))}
                    className="w-24 text-right bg-transparent focus:outline-hidden"
                  />
                </div>
              </div>
              <input
                type="range"
                min="2000"
                max="50000"
                step="500"
                value={downtimeCostPerEvent}
                onChange={(e) => setDowntimeCostPerEvent(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0B0B0F]"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>$2,000 (Minor VFD trip)</span>
                <span>$25,000 (Cone jam)</span>
                <span>$50,000 (Motor stator flash)</span>
              </div>
            </div>

            {/* Input 2: Frequency of Events per Year (Y) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <label htmlFor="freq-events">Downtime Events per Year (Y):</label>
                <div className="flex items-center font-mono font-bold text-stone-900 bg-white px-3 py-1 rounded border border-stone-300">
                  <input
                    id="freq-events"
                    type="number"
                    value={downtimeFrequencyPerYear}
                    onChange={(e) => setDowntimeFrequencyPerYear(Math.max(1, Number(e.target.value) || 1))}
                    className="w-14 text-right bg-transparent focus:outline-hidden"
                  />
                  <span className="text-xs text-stone-500 ml-1">events</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="36"
                step="1"
                value={downtimeFrequencyPerYear}
                onChange={(e) => setDowntimeFrequencyPerYear(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0B0B0F]"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>1/yr (World Class)</span>
                <span>14/yr (Davis Granite Baseline)</span>
                <span>36/yr (High Failure)</span>
              </div>
            </div>

            {/* Input 3: System Prevention Rate (%) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <label htmlFor="prev-rate">System Prevention Efficiency (%):</label>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {systemPreventionPercent}% Prevented
                </span>
              </div>
              <input
                id="prev-rate"
                type="range"
                min="30"
                max="95"
                step="1"
                value={systemPreventionPercent}
                onChange={(e) => setSystemPreventionPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>30% Basic Alarms</span>
                <span>78% Predictive Telemetry</span>
                <span>95% Automated Interlocks</span>
              </div>
            </div>
          </div>

          {/* Outputs Section (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Output 1: Total Annual Risk Cost */}
              <div className="bg-[#0B0B0F] text-white p-5 rounded-xl border border-stone-800 shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Total Annual Risk Cost ($X × Y)
                  </span>
                  <div className="text-3xl font-black font-mono text-red-400 mt-2">
                    ${totalAnnualRiskCost.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Unmonitored run-to-failure loss exposure
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800 text-[10px] text-stone-400 flex items-center justify-between font-mono">
                  <span>{downtimeFrequencyPerYear} events/yr</span>
                  <span>Avg ${downtimeCostPerEvent.toLocaleString()} / outage</span>
                </div>
              </div>

              {/* Output 2: Total Annual Value Prevented */}
              <div className="bg-emerald-950/30 border border-emerald-500/40 p-5 rounded-xl shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      <RoiTooltipBadge text={ROI_TOOLTIP_TEXT}>
                        Estimated Prevention Value
                      </RoiTooltipBadge>
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {systemPreventionPercent}% Saved
                    </span>
                  </div>
                  <div className="text-3xl font-black font-mono text-emerald-700 mt-2" title={ROI_TOOLTIP_TEXT}>
                    +${preventedRiskCost.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-800/80 mt-1 block">
                    Estimated annual business value preserved through telemetry
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-500/30 text-[10px] text-emerald-800 font-semibold flex items-center justify-between">
                  <span>Residual Exposure:</span>
                  <span className="font-mono font-bold text-stone-700">${residualRiskCost.toLocaleString()}/yr</span>
                </div>
              </div>
            </div>

            {/* Avoided Failure Real-World Case Studies */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-3">
                Key Davis Granite Failure Modes Averted by Telemetry:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Motor Dielectric Flashover:</strong>
                    Continuous megger alert below 1.0 MΩ prevents 250kW motor rewind ($38,000 avoided).
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">ZESA Inductive Penalties:</strong>
                    APFC automated stage engagement keeps PF &gt;0.95 ($31,200/yr utility tariff saved).
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Transformer Buchholz Trip:</strong>
                    Peak load staggering avoids 110% overload thermal tripping during washing runs.
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Cable Trench Water Ingress:</strong>
                    Early underfloor alarm stops moisture short-circuiting 400V busbar ($45,000 saved).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SitePlan AI Assistant (Updated with 8 Risk Parameters Knowledge) */}
      <div className="bg-gradient-to-br from-stone-900 to-[#0B0B0F] text-white rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FFC72C]/20 border border-[#FFC72C]/40 flex items-center justify-center text-[#FFC72C]">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFC72C] bg-[#FFC72C]/10 border border-[#FFC72C]/30 px-2 py-0.5 rounded">
                  SitePlan AI Engineering Engine
                </span>
                <span className="text-[11px] text-stone-400 font-mono">Trained on Davis Granite Site Audit</span>
              </div>
              <h3 className="text-xl font-black text-white mt-0.5">
                Risk &amp; Substation Diagnostic Assistant
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAskAssistant('Comprehensive Plant Risk Audit')}
              className="px-3.5 py-2 rounded-lg bg-[#FFC72C] text-[#0B0B0F] font-bold text-xs hover:bg-[#ffcf4d] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Live Diagnostic Audit</span>
            </button>
          </div>
        </div>

        {/* Quick Question Chips for All 8 Parameters */}
        <div className="pt-6">
          <div className="text-xs text-stone-400 font-semibold mb-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#FFC72C]" />
            <span>Select any of the 8 parameters to get specific engineering recommendations:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: '⚡ Transformer Overload Mitigation', q: 'How do we manage Transformer Load above 100%?' },
              { label: '🔌 Power Factor ZESA Penalty Elimination', q: 'How to fix Power Factor to eliminate ZESA charges?' },
              { label: '⚙️ Motor Insulation Below 1 MΩ Protocol', q: 'What is the action plan for Motor Insulation below 1.0 MΩ?' },
              { label: '🌡️ MCC Temperature & VFD Thermal Trips', q: 'What happens when MCC Temperature exceeds 35°C?' },
              { label: '💧 MCC Humidity & Busbar Condensation', q: 'How does high MCC Humidity damage switchgear?' },
              { label: '🌊 Cable Trench Water Ingress Alarm', q: 'What is the procedure for Water Leak alarm in trenches?' },
              { label: '🌩️ Highveld Nov–Mar Lightning Season', q: 'What is the Zimbabwe lightning defense strategy?' },
              { label: '🔋 ZESA Grid Sag vs Cat Genset ATS', q: 'How does Grid Stability trigger generator changeover?' },
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleAskAssistant(chip.q)}
                className="text-xs bg-stone-800/90 hover:bg-stone-750 text-stone-300 hover:text-white px-3 py-1.5 rounded-lg border border-stone-700/80 hover:border-stone-500 transition-all cursor-pointer whitespace-nowrap"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Custom Query Input Bar */}
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Ask SitePlan AI about any parameter, threshold, statutory standard, or failure mode..."
                value={assistantQuery}
                onChange={(e) => setAssistantQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && assistantQuery && handleAskAssistant(assistantQuery)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#FFC72C] transition-all"
              />
            </div>
            <button
              onClick={() => assistantQuery && handleAskAssistant(assistantQuery)}
              disabled={isAiThinking || !assistantQuery}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-stone-700"
            >
              {isAiThinking ? <RefreshCw className="w-4 h-4 animate-spin text-[#FFC72C]" /> : <Send className="w-4 h-4 text-[#FFC72C]" />}
              <span>Consult</span>
            </button>
          </div>
        </div>

        {/* AI Output Card */}
        {assistantResponse ? (
          <div className="mt-6 bg-stone-950 border border-stone-800 rounded-xl p-5 sm:p-6 space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFC72C] font-bold">
                  {assistantResponse.topic}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {assistantResponse.headline}
                </h4>
              </div>
              <span
                className={`self-start sm:self-auto text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  assistantResponse.urgency === 'Critical'
                    ? 'text-red-400 bg-red-950/40 border-red-800'
                    : assistantResponse.urgency === 'Moderate'
                    ? 'text-amber-400 bg-amber-950/40 border-amber-800'
                    : 'text-emerald-400 bg-emerald-950/40 border-emerald-800'
                }`}
              >
                Urgency: {assistantResponse.urgency}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
              <div className="space-y-1 bg-stone-900/60 p-3.5 rounded-lg border border-stone-800/80">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 text-[#FFC72C]">
                  <ArrowRight className="w-3 h-3" /> Immediate Corrective Action
                </span>
                <p className="text-stone-200 leading-relaxed">{assistantResponse.immediateAction}</p>
              </div>

              <div className="space-y-1 bg-stone-900/60 p-3.5 rounded-lg border border-stone-800/80">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 text-emerald-400">
                  <DollarSign className="w-3 h-3" /> Financial Risk Safeguard
                </span>
                <p className="text-stone-200 leading-relaxed">{assistantResponse.financialSafeguard}</p>
              </div>

              <div className="space-y-1 bg-stone-900/60 p-3.5 rounded-lg border border-stone-800/80">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 text-blue-400">
                  <Info className="w-3 h-3" /> Technical &amp; Dielectric Diagnosis
                </span>
                <p className="text-stone-300 leading-relaxed">{assistantResponse.technicalDiagnosis}</p>
              </div>

              <div className="space-y-1 bg-stone-900/60 p-3.5 rounded-lg border border-stone-800/80">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 text-purple-400">
                  <ShieldCheck className="w-3 h-3" /> Davis Granite Maintenance Protocol
                </span>
                <p className="text-stone-300 leading-relaxed">{assistantResponse.preventativeProtocol}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 bg-stone-950/50 border border-dashed border-stone-800 rounded-xl p-4 text-center text-xs text-stone-400">
            Click any prompt chip above or submit a question to query the SitePlan AI engineering engine.
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Parameter Card with 24h Chart, Threshold Zones & Demo Controls
interface ParameterCardProps {
  item: RiskParameterItem;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  isToggle?: boolean;
  onValueChange: (val: number) => void;
  formatTooltip: (val: number | string) => string;
}

const ParameterCard: React.FC<ParameterCardProps> = ({
  item,
  icon: Icon,
  iconColor,
  isToggle = false,
  onValueChange,
  formatTooltip,
}) => {
  const statusBadge = useMemo(() => {
    if (item.status === 'critical') {
      return {
        text: 'CRITICAL',
        bg: 'bg-red-50 text-red-700 border-red-200',
        dot: 'bg-red-500 animate-ping',
      };
    }
    if (item.status === 'warning') {
      return {
        text: 'WARNING',
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
      };
    }
    return {
      text: 'NORMAL',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
    };
  }, [item.status]);

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between hover:border-stone-300 transition-all">
      <div className="space-y-3">
        {/* Top: Icon + Name + Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center">
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-tight">
                {item.name}
              </h4>
              <span className="text-[10px] text-stone-500 font-mono">
                {item.thresholdText}
              </span>
            </div>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 ${statusBadge.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`}></span>
            {statusBadge.text}
          </span>
        </div>

        {/* Current Value Display */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-2xl font-black font-mono text-stone-900 tracking-tight">
              {item.displayValue}
            </span>
          </div>
          <span className="text-[11px] font-mono text-stone-500 font-medium">
            {item.details.split(' ')[0]} telemetry
          </span>
        </div>

        {/* Interactive Simulation Controls */}
        <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/80 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-stone-600 font-medium">
            <span className="flex items-center gap-1 text-[10px] text-stone-500 font-mono">
              <Sliders className="w-3 h-3 text-stone-400" />
              Demo Simulator:
            </span>
            <span className="font-mono font-bold text-stone-800 text-[10px]">
              {item.currentValue} {item.unit !== 'Status' && item.unit}
            </span>
          </div>

          {isToggle ? (
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-600">Simulate Water Leak:</span>
              <button
                onClick={() => onValueChange(item.currentValue === 1 ? 0 : 1)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  item.currentValue === 1
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                }`}
              >
                {item.currentValue === 1 ? 'ALARM ACTIVE (Triggered)' : 'OK (Dry)'}
              </button>
            </div>
          ) : (
            <input
              type="range"
              min={item.min}
              max={item.max}
              step={item.step}
              value={item.currentValue}
              onChange={(e) => onValueChange(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0B0B0F]"
            />
          )}
        </div>

        {/* Threshold Zones Visual Bar */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Threshold Zones
          </span>
          <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
            <div className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200 truncate" title={item.zones.green}>
              {item.zones.green.split(' ')[0]} Safe
            </div>
            <div className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200 truncate" title={item.zones.amber}>
              {item.zones.amber.split(' ')[0]} Warn
            </div>
            <div className="bg-red-50 text-red-800 px-1.5 py-0.5 rounded border border-red-200 truncate" title={item.zones.red}>
              {item.zones.red.split(' ')[0]} Crit
            </div>
          </div>
        </div>

        {/* 24-Hour Historical Chart */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[10px] text-stone-500">
            <span className="font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              24-Hour Telemetry Trend
            </span>
            <span className="font-mono text-[9px]">Last 24h</span>
          </div>

          <div className="h-24 w-full bg-stone-50/80 rounded-lg border border-stone-200/60 p-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={item.history24h} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id={`grad-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={
                        item.status === 'critical'
                          ? '#ef4444'
                          : item.status === 'warning'
                          ? '#f59e0b'
                          : '#10b981'
                      }
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={
                        item.status === 'critical'
                          ? '#ef4444'
                          : item.status === 'warning'
                          ? '#f59e0b'
                          : '#10b981'
                      }
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 8 }} stroke="#9ca3af" />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 8 }} stroke="#9ca3af" />
                <Tooltip
                  formatter={(value: any) => [formatTooltip(value), item.shortName]}
                  labelStyle={{ fontSize: 10, color: '#111827' }}
                  contentStyle={{
                    backgroundColor: '#0B0B0F',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                {item.warnThreshold && (
                  <ReferenceLine y={item.warnThreshold} stroke="#f59e0b" strokeDasharray="2 2" />
                )}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={
                    item.status === 'critical'
                      ? '#ef4444'
                      : item.status === 'warning'
                      ? '#f59e0b'
                      : '#10b981'
                  }
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#grad-${item.id})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendation Box at Bottom */}
      <div className="mt-3 pt-3 border-t border-stone-100">
        <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-200/80 text-[11px] text-stone-600 leading-snug">
          <strong className="text-stone-900 block text-[10px] uppercase tracking-wider mb-0.5">
            Site Recommendation:
          </strong>
          {item.recommendation}
        </div>
      </div>
    </div>
  );
};
