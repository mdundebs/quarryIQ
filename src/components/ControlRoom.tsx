import React from 'react';
import { Camera, Radio, Sparkles, Scale, AlertTriangle, ArrowRight } from 'lucide-react';

export const ControlRoom: React.FC = () => {
  return (
    <div className="space-y-6 text-[#E2E8F0]">
      {/* Header Banner */}
      <div className="bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Throughput Test (Phase 1 Optical Sizing)</h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
              1 CAMERA ONLINE &bull; PHASE 1 TEST
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-0.5 font-mono">
            Optical particle sizing &amp; real-time volumetric throughput measurement at the 19mm discharge conveyor
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#FFC72C] bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg shrink-0">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Live Optical Telemetry Active</span>
        </div>
      </div>

      {/* ONE Large Camera Widget Titled "19mm ST Discharge (Throughput Monitor)" */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between text-xs font-mono border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="font-bold text-white text-base">19mm ST Discharge (Throughput Monitor)</h2>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            1080p AI AGGREGATE SIZING FEED
          </span>
        </div>

        {/* Camera Feed Box */}
        <div className="relative bg-stone-950 border-2 border-emerald-500/40 rounded-2xl h-80 sm:h-96 flex flex-col justify-between p-5 font-mono overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-black/80"></div>

          {/* Top Status Overlay */}
          <div className="relative z-10 flex items-center justify-between text-xs text-stone-300 bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-white">CAM-01 (19mm ST Discharge Conveyor CV-04)</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-stone-400">
              <span>Resolution: 1920x1080</span>
              <span className="text-emerald-400 font-bold">FPS: 60 (Edge AI)</span>
            </div>
          </div>

          {/* Center AI Volumetric Bounding Box */}
          <div className="relative z-10 mx-auto my-auto w-72 sm:w-96 h-40 sm:h-48 border-2 border-emerald-400 rounded-xl bg-emerald-500/10 p-3 flex flex-col justify-between animate-pulse shadow-lg">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-500 text-[#0B0B0F] text-[11px] font-black px-2 py-0.5 rounded shadow-xs">
                AI AGGREGATE COUNTER &bull; SIZING OK
              </span>
              <span className="text-xs text-emerald-300 font-bold">
                19mm Fraction (Pass: 98.4%)
              </span>
            </div>

            <div className="text-center font-bold text-white text-sm sm:text-base bg-stone-950/80 py-2 px-3 rounded-lg border border-emerald-400/40">
              VOLUMETRIC AI CALC: <span className="text-[#FFC72C] text-lg font-black font-mono">1,040 t/day</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
              <span>Live TPH: 104 t/h</span>
              <span>3D Density Calibrated</span>
            </div>
          </div>

          {/* Bottom Telemetry Overlay */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-400 bg-stone-900/80 p-3 rounded-lg border border-stone-800">
            <div>
              BST100 Controller Scale Telemetry: <strong className="text-white">1,000 t/day</strong>
            </div>
            <div className="text-[#FFC72C] font-bold">
              Optical Cross-Verification Active
            </div>
          </div>
        </div>

        {/* Text Under Feed */}
        <div className="bg-stone-900/90 border border-[#FFC72C]/40 rounded-xl p-4 sm:p-5 text-xs sm:text-sm font-mono flex items-start gap-3 shadow-md">
          <Sparkles className="w-5 h-5 text-[#FFC72C] shrink-0 mt-0.5" />
          <div className="text-stone-200 leading-relaxed font-sans">
            Reference Case Study: Belt scales drift 2-4%. This $3,500 test cross-references the BST100 scale against visual volume to catch revenue leakage.
          </div>
        </div>

        {/* Simple "Scale vs. AI" Comparison Widget */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-[#0B0B0F] border-2 border-amber-500/80 rounded-xl p-5 shadow-xl font-mono space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
            <div className="flex items-center gap-2 text-[#FFC72C] font-bold text-sm">
              <Scale className="w-5 h-5" />
              <span>Scale vs. AI Camera Cross-Check Widget</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              REVENUE DRIFT DETECTED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-stone-950 p-3.5 rounded-lg border border-stone-800">
              <span className="text-stone-400 block text-[11px]">BST100 Scale Telemetry</span>
              <span className="text-xl font-black text-white font-mono block mt-1">1,000 t/day</span>
              <span className="text-[10px] text-stone-500">Traditional weigh integrator</span>
            </div>

            <div className="bg-stone-950 p-3.5 rounded-lg border border-stone-800">
              <span className="text-stone-400 block text-[11px]">AI Camera Volumetric Calc</span>
              <span className="text-xl font-black text-[#FFC72C] font-mono block mt-1">1,040 t/day</span>
              <span className="text-[10px] text-stone-500">3D optical aggregate profiler</span>
            </div>

            <div className="bg-amber-950/40 p-3.5 rounded-lg border border-amber-500/50">
              <span className="text-amber-400 block text-[11px] font-bold">Variance Outcome</span>
              <span className="text-xl font-black text-emerald-400 font-mono block mt-1">+4% (+40 tonnes/day)</span>
              <span className="text-[10px] text-amber-300 font-bold">Revenue Leak Detected &bull; Scale Drift</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
