import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Zap,
  Server,
  Radio,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Info,
  Activity,
  ArrowRight,
  Database,
  Cloud,
  Eye,
  FileCode,
  HardDrive,
  Cable,
  Sparkles,
  Gauge,
  Box,
  CornerDownRight
} from 'lucide-react';

interface CubicleSpec {
  id: string;
  number: number;
  title: string;
  type: string;
  rating: string;
  status: 'HEALTHY' | 'ACTIVE' | 'ONLINE' | 'STANDBY';
  specTooltip: string;
  description: string;
  cableSpec: string;
  protocol: string;
  tag: string;
}

export const SystemDesign: React.FC = () => {
  // Selected component for inspection drawer / active tooltip
  const [selectedComponentId, setSelectedComponentId] = useState<string>('mcc-inc');
  // Visual layer filter
  const [activeFilter, setActiveFilter] = useState<'all' | 'power' | 'control' | 'cables'>('all');
  // Animated bus pulse trigger state
  const [pulseActive, setPulseActive] = useState<boolean>(true);

  // 10 MCC Cubicles Data
  const cubicles: CubicleSpec[] = [
    {
      id: 'mcc-inc',
      number: 1,
      title: '800A Main Incomer',
      type: 'Main Air Circuit Breaker',
      rating: '800A / 50kA Fault Withstand',
      status: 'HEALTHY',
      specTooltip: '800A Main Incomer: Sized for 500kVA Transformer + Future Solar.',
      description: 'Main distribution breaker receiving 400V 3-phase power from the 500kVA substation transformer. Equipped with digital trip unit, surge arresters, and busbar capacity for future 220kW solar integration.',
      cableSpec: 'Armored XLPE 2x(3x240mm²) + 120mm² Earth',
      protocol: 'Modbus RTU (Multi-Function Power Meter)',
      tag: 'MCC-CUB-01',
    },
    {
      id: 'plc-master',
      number: 2,
      title: 'Siemens S7 PLC & HMI',
      type: 'Automation & Interlock CPU',
      rating: 'S7-1200 CPU 1214C + KTP700',
      status: 'ONLINE',
      specTooltip: 'Siemens S7-1200 PLC: CPU 1214C with WinCC SCADA RT interlocks.',
      description: 'Central plant controller executing safety interlocks, VSD speed references, and soft-start ramp sequencing. Translates field signals into Profinet and Modbus TCP telemetry.',
      cableSpec: 'Cat6A Industrial Ethernet Shielded',
      protocol: 'Profinet & Modbus TCP Master',
      tag: 'MCC-CUB-02',
    },
    {
      id: 'vsd-01',
      number: 3,
      title: 'ABB ACS880 VSD 1',
      type: 'Variable Speed Drive (CV-01)',
      rating: '22kW / 45A Heavy Duty',
      status: 'ACTIVE',
      specTooltip: 'ABB ACS880 VSD: Prevents harmonic pollution and controls belt speed.',
      description: 'Controls CV-01 Primary Conveyor motor speed (0-50Hz). Direct Torque Control (DTC) eliminates belt snapping jerks and matches feed rate to crusher throughput.',
      cableSpec: 'Shielded VSD Cable 3x35mm² + 3G6mm² EMC',
      protocol: 'Modbus RTU RS-485',
      tag: 'MCC-CUB-03',
    },
    {
      id: 'vsd-02',
      number: 4,
      title: 'ABB ACS880 VSD 2',
      type: 'Variable Speed Drive (CV-02)',
      rating: '22kW / 45A Heavy Duty',
      status: 'ACTIVE',
      specTooltip: 'ABB ACS880 VSD: Decouples belt speed from grid frequency to prevent spillage.',
      description: 'Drives CV-02 Feeder Conveyor. Synchronizes material delivery to prevent overtopping spillage at transfer chutes during peak surges.',
      cableSpec: 'Shielded VSD Cable 3x35mm² + 3G6mm² EMC',
      protocol: 'Modbus RTU RS-485',
      tag: 'MCC-CUB-04',
    },
    {
      id: 'vsd-03',
      number: 5,
      title: 'ABB ACS880 VSD 3',
      type: 'Variable Speed Drive (Screen)',
      rating: '22kW / 45A Heavy Duty',
      status: 'ACTIVE',
      specTooltip: 'ABB ACS880 VSD: Regulates vibrating screen feed rate.',
      description: 'Controls Screen Feed Conveyor drive to ensure even rock bed depth over screening decks.',
      cableSpec: 'Shielded VSD Cable 3x35mm² + 3G6mm² EMC',
      protocol: 'Modbus RTU RS-485',
      tag: 'MCC-CUB-05',
    },
    {
      id: 'vsd-04',
      number: 6,
      title: 'ABB ACS880 VSD 4',
      type: 'Variable Speed Drive (19mm)',
      rating: '22kW / 45A Heavy Duty',
      status: 'ACTIVE',
      specTooltip: 'ABB ACS880 VSD: Stabilizes 19mm aggregate discharge conveyor.',
      description: 'Drives 19mm ST product belt at steady 40Hz under overhead optical AI test camera.',
      cableSpec: 'Shielded VSD Cable 3x35mm² + 3G6mm² EMC',
      protocol: 'Modbus RTU RS-485',
      tag: 'MCC-CUB-06',
    },
    {
      id: 'ssw-01',
      number: 7,
      title: 'WEG SSW900 Soft Starter 1',
      type: 'Crusher Motor Starter (C140)',
      rating: '110kW / 220A Heavy Duty',
      status: 'ACTIVE',
      specTooltip: 'WEG SSW900 Soft Starter: Eliminates 6x FLA inrush current spikes & mechanical torque jerk.',
      description: 'Smooth 20-second voltage ramp start for C140 Primary Jaw Crusher. Prevents transformer voltage dips and mechanical shock to flywheel bearings.',
      cableSpec: 'Armored XLPE 95mm² Cu / SWA',
      protocol: 'Modbus RTU RS-485',
      tag: 'MCC-CUB-07',
    },
    {
      id: 'ssw-02',
      number: 8,
      title: 'WEG SSW900 Soft Starter 2',
      type: 'Secondary Crusher Starter',
      rating: '155kW / 300A Heavy Duty',
      status: 'STANDBY',
      specTooltip: 'WEG SSW900 Soft Starter: 155kW Secondary Cone Crusher soft start.',
      description: 'Provides torque control and motor thermal protection for secondary crushing circuit.',
      cableSpec: 'Armored XLPE 150mm² Cu / SWA',
      protocol: 'Modbus RTU RS-485',
      tag: 'MCC-CUB-08',
    },
    {
      id: 'ssw-03',
      number: 9,
      title: 'WEG SSW900 Soft Starter 3',
      type: 'Tertiary Crusher Starter',
      rating: '191kW / 360A Heavy Duty',
      status: 'STANDBY',
      specTooltip: 'WEG SSW900 Soft Starter: 191kW Tertiary Crusher soft start.',
      description: 'Controls high-inertia tertiary reduction crusher motor acceleration.',
      cableSpec: 'Armored XLPE 185mm² Cu / SWA',
      protocol: 'Modbus RTU RS-485',
      tag: 'MCC-CUB-09',
    },
    {
      id: 'aux-meter',
      number: 10,
      title: 'Auxiliary & Power Meters',
      type: 'Power Quality & Protection',
      rating: 'Class 0.5S Power Quality Meter',
      status: 'HEALTHY',
      specTooltip: 'Energy Meters: Active tracking of Power Factor & Phase Currents.',
      description: 'Monitors voltage imbalance, active power (kW), reactive power (kVAR), power factor, and individual phase currents across MCC busbar.',
      cableSpec: '100/5A CT Wiring + Shielded Data',
      protocol: 'Modbus RTU RS-485',
      tag: 'MCC-CUB-10',
    },
  ];

  const selectedCubicle = cubicles.find((c) => c.id === selectedComponentId) || cubicles[0];

  return (
    <div className="space-y-8 text-[#E2E8F0] font-mono">
      {/* 1. TOP SCADA HEADER BANNER */}
      <div className="bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#FFC72C]/20 border border-[#FFC72C]/50 text-[#FFC72C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              SCADA System Engineering Schematic
            </span>
            <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              PLANT DATA FLOW ARCHITECTURE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Interactive System Design &amp; Signal Flow
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm font-sans max-w-3xl leading-relaxed">
            Full physical and digital layout showing the 10-cubicle Motor Control Center (MCC), field drives, optical AI camera, industrial edge compute, and live telemetry buses.
          </p>
        </div>

        {/* Quick Action Controls */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setPulseActive(!pulseActive)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border ${
              pulseActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
            }`}
          >
            <Activity className={`w-4 h-4 ${pulseActive ? 'text-cyan-400 animate-pulse' : ''}`} />
            <span>{pulseActive ? 'Bus Signals: ACTIVE' : 'Bus Signals: PAUSED'}</span>
          </button>

          {/* Layer Filter Buttons */}
          <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#FFC72C] text-[#0B0B0F]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('power')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'power'
                  ? 'bg-[#FFC72C] text-[#0B0B0F]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Power
            </button>
            <button
              onClick={() => setActiveFilter('control')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'control'
                  ? 'bg-[#FFC72C] text-[#0B0B0F]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Telemetry
            </button>
            <button
              onClick={() => setActiveFilter('cables')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'cables'
                  ? 'bg-[#FFC72C] text-[#0B0B0F]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Cabling
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN SCADA 3-COLUMN LAYOUT MATRIX WITH ANIMATED SVG BUS DATA LINES */}
      <div className="bg-[#121217] rounded-2xl border border-stone-800 p-6 shadow-2xl relative space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="text-lg font-bold text-white">Plant Data Flow Diagram (Left-to-Right Signal Bus)</h2>
          </div>
          <span className="text-[11px] text-stone-400">
            Hover or click any cubicle to inspect hardware specs
          </span>
        </div>

        {/* 3 Main Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* LEFT COLUMN: MCC PANEL (10 CUBICLES) - 5 Cols */}
          <div className="lg:col-span-5 bg-stone-900/90 border-2 border-stone-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FFC72C] animate-ping" />
                  <h3 className="font-bold text-white text-base">1. MCC Switchgear Panel</h3>
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">10-Cubicle Heavy Industrial Switchboard</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-stone-950 border border-[#FFC72C]/40 text-[#FFC72C] text-xs font-bold">
                600A BUSBAR
              </span>
            </div>

            {/* 10 Cubicles Grid (2 columns x 5 rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {cubicles.map((cub) => {
                const isSelected = selectedComponentId === cub.id;
                return (
                  <button
                    key={cub.id}
                    onClick={() => setSelectedComponentId(cub.id)}
                    className={`group text-left p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-stone-950 border-2 border-[#FFC72C] text-white shadow-lg shadow-[#FFC72C]/10 scale-[1.02]'
                        : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-950 text-stone-300'
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#FFC72C]" />
                    )}

                    <div className="flex items-start justify-between gap-1.5 pl-1">
                      <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-stone-900 text-[#FFC72C] border border-stone-800">
                        CUB {cub.number}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          cub.status === 'HEALTHY' || cub.status === 'ONLINE' || cub.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {cub.status}
                      </span>
                    </div>

                    <div className="font-bold text-xs text-white mt-1.5 line-clamp-1 pl-1">
                      {cub.title}
                    </div>

                    <div className="text-[10px] text-stone-400 font-mono line-clamp-1 pl-1 mt-0.5">
                      {cub.rating}
                    </div>

                    {/* Hover spec hint badge */}
                    <div className="mt-2 pt-1.5 border-t border-stone-800/80 flex items-center justify-between text-[9px] text-stone-400 pl-1 font-mono">
                      <span>{cub.tag}</span>
                      <span className="text-[#FFC72C] group-hover:underline">Inspect Specs &rarr;</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MIDDLE COLUMN: FIELD LEVEL & EQUIPMENT - 4 Cols */}
          <div className="lg:col-span-4 bg-stone-900/90 border-2 border-stone-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-white text-base">2. Field Level Assets</h3>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">Crushers, Conveyors &amp; Optical Sensors</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                  IP65 FIELD
                </span>
              </div>

              {/* Field Asset Nodes */}
              <div className="space-y-3 pt-3">
                {/* Node 1: C140 Jaw Crusher */}
                <div
                  onClick={() => setSelectedComponentId('ssw-01')}
                  className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 hover:border-cyan-500/60 transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">C140 Jaw Crusher</span>
                    <span className="text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                      110kW Drive
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 font-sans">
                    Soft Start: 20s smooth voltage acceleration over 110kW motor windings.
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono pt-1">
                    Feed Cable: Armored XLPE 95mm² Cu
                  </div>
                </div>

                {/* Node 2: Primary Conveyor CV-01 */}
                <div
                  onClick={() => setSelectedComponentId('vsd-01')}
                  className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 hover:border-cyan-500/60 transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">Primary Conveyor CV-01</span>
                    <span className="text-cyan-400 text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30">
                      22kW VSD (40Hz)
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 font-sans">
                    Modulated frequency prevents belt snapping and spillage at tail pulley.
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono pt-1">
                    Feed Cable: Shielded VSD 3x35mm² + 3G6mm² EMC
                  </div>
                </div>

                {/* Node 3: 19mm Discharge Camera & BST100 Scale */}
                <div
                  onClick={() => setSelectedComponentId('vsd-04')}
                  className="bg-stone-950 p-3.5 rounded-xl border border-purple-500/40 hover:border-purple-400 transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">19mm Camera &amp; BST100 Scale</span>
                    <span className="text-purple-300 text-[10px] bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                      1080p Optical + Scale
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 font-sans">
                    Overhead volumetric AI grain counter cross-checking BST100 scale weight.
                  </div>
                  <div className="text-[10px] text-purple-300 font-mono pt-1">
                    Telemetry: RS-485 Modbus RTU Shielded Pair
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[10px] text-stone-400 flex items-center justify-between font-mono">
              <span>Field Protection Grade:</span>
              <span className="text-emerald-400 font-bold">IP65 Waterproof &amp; Dustproof</span>
            </div>
          </div>

          {/* RIGHT COLUMN: COMMAND CENTER & EDGE-TO-CLOUD - 3 Cols */}
          <div className="lg:col-span-3 bg-stone-900/90 border-2 border-stone-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#FFC72C]" />
                    <h3 className="font-bold text-white text-base">3. Command Center</h3>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">Edge AI Compute &amp; Executive Cloud</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#FFC72C]/20 border border-[#FFC72C]/50 text-[#FFC72C] text-xs font-bold">
                  EDGE-TO-CLOUD
                </span>
              </div>

              <div className="space-y-4 pt-3">
                {/* Fireflies Edge PC Node */}
                <div
                  onClick={() => setSelectedComponentId('plc-master')}
                  className="bg-stone-950 p-4 rounded-xl border-2 border-amber-500/60 text-white space-y-2 hover:border-[#FFC72C] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FFC72C] flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-[#FFC72C]" />
                      Fireflies Edge PC
                    </span>
                    <span className="text-[9px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                      ON-SITE AI
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                    Industrial fanless compute unit running volumetric particle sizing AI and scale drift detection algorithms.
                  </p>
                  <div className="text-[10px] text-[#FFC72C] font-mono">
                    Protocol: Modbus TCP &amp; HTTP REST
                  </div>
                </div>

                {/* Cloud Icon Node */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFC72C] to-[#b38300] flex items-center justify-center font-bold text-[#0B0B0F] mx-auto shadow-md">
                    <Cloud className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div className="font-bold text-sm text-white">QuarryIQ CEO Dashboard</div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Live executive telemetry feed via secure industrial 4G LTE tunnel.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-stone-950 rounded-xl border border-[#FFC72C]/30 text-[10px] text-[#FFC72C] text-center font-bold font-mono">
              ⚡ LIVE BUS FREQUENCY: 100 Hz REFRESH
            </div>
          </div>
        </div>

        {/* GLOWING SVG BUS DATA LINES overlay banner */}
        <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 font-mono text-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-stone-300">
              <strong className="text-cyan-400">Profinet &amp; Modbus Data Bus:</strong> Telemetry streams continuous motor amps, belt speed, optical counts, and transformer voltage.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-400 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Modbus RTU
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Profinet
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Modbus TCP
            </span>
          </div>
        </div>
      </div>

      {/* 3. HARDWARE SPEC INSPECTOR & HOVER TOOLTIP CARD */}
      <div className="bg-[#1A1A1F] border-2 border-[#FFC72C]/60 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFC72C]/20 border border-[#FFC72C]/50 flex items-center justify-center text-[#FFC72C]">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Selected Component Hardware Specs</h2>
              <p className="text-xs text-stone-400">Deep engineering breakdown for selected MCC cubicle or field asset</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[#FFC72C] text-xs font-bold font-mono">
            TAG: {selectedCubicle.tag}
          </span>
        </div>

        {/* Spec Callout Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-stone-950 p-6 rounded-xl border border-stone-800">
          <div className="md:col-span-8 space-y-3">
            <div className="p-3 rounded-lg bg-amber-950/40 border border-[#FFC72C]/60 text-[#FFC72C] font-bold text-sm sm:text-base">
              💡 {selectedCubicle.specTooltip}
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white">{selectedCubicle.title} ({selectedCubicle.type})</h3>
              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                {selectedCubicle.description}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-3 font-mono text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Rating / Capacity</span>
              <span className="text-white font-bold text-sm">{selectedCubicle.rating}</span>
            </div>

            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Cable Specification</span>
              <span className="text-cyan-300 font-bold">{selectedCubicle.cableSpec}</span>
            </div>

            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Communication Protocol</span>
              <span className="text-emerald-400 font-bold">{selectedCubicle.protocol}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CABLE ROUTING & TERMINATION SCHEMATIC */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
          <Cable className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">Cable Routing &amp; Electrical Termination Visual Schematic</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cable Spec 1: Armored XLPE for C140 */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>HEAVY POWER CABLE</span>
              <span className="px-2 py-0.5 rounded bg-stone-950 text-stone-300 border border-stone-800">C140 FEED</span>
            </div>
            <h3 className="text-base font-bold text-white">Armored XLPE (95mm²)</h3>
            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              Steel Wire Armor (SWA) multi-core copper cable feeding the 110kW C140 Primary Jaw Crusher motor. Designed to withstand falling rock impacts, heavy vibration, and outdoor UV exposure.
            </p>
            <div className="p-2.5 rounded bg-stone-950 border border-stone-800 text-[11px] text-stone-400 font-mono">
              Voltage Drop: &lt;1.8% over 85 meters &bull; 600/1000V Grade
            </div>
          </div>

          {/* Cable Spec 2: Shielded VSD Cable for Conveyor */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-bold text-[#FFC72C]">
              <span>VSD FREQUENCY DRIVE CABLE</span>
              <span className="px-2 py-0.5 rounded bg-stone-950 text-stone-300 border border-stone-800">CV-01 DRIVES</span>
            </div>
            <h3 className="text-base font-bold text-white">Shielded VSD Cable (3x35mm² + 3G6mm²)</h3>
            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              Dual symmetrical copper tape + braided shield EMC cable powering conveyor motors from ABB VSDs. Prevents high-frequency harmonic noise and electromagnetic interference (EMI) on PLC signal lines.
            </p>
            <div className="p-2.5 rounded bg-stone-950 border border-stone-800 text-[11px] text-stone-400 font-mono">
              EMC Class C2 &bull; Double Shielded Against Noise
            </div>
          </div>

          {/* Cable Spec 3: Modbus RTU Shielded Bus Cable */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3 hover:border-purple-400/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-bold text-purple-300">
              <span>INSTRUMENTATION DATA BUS</span>
              <span className="px-2 py-0.5 rounded bg-stone-950 text-stone-300 border border-stone-800">SCALE &amp; PLC</span>
            </div>
            <h3 className="text-base font-bold text-white">Modbus RTU (Shielded Twisted Pair RS-485)</h3>
            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              Low-capacitance 24 AWG foil + braid shielded twisted pair cable in heavy galvanized steel conduit. Connects BST100 belt scale integrator directly to Siemens S7 PLC without packet loss.
            </p>
            <div className="p-2.5 rounded bg-stone-950 border border-stone-800 text-[11px] text-stone-400 font-mono">
              Baud Rate: 19,200 bps &bull; 120-Ohm Termination Resistors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
