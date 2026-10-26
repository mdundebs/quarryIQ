import React from 'react';
import { Camera, Eye, Activity, CheckCircle2, AlertTriangle, Radio, ShieldCheck } from 'lucide-react';

export const ControlRoom: React.FC = () => {
  return (
    <div className="space-y-6 text-[#E2E8F0]">
      {/* Header Banner */}
      <div className="bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">AI Vision &amp; Spillage Control</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
              4 CAMERAS ONLINE
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-0.5 font-mono">
            Automated optical surveillance &bull; Real-time detection of belt misalignments, chute blockage &amp; spillage
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#FFC72C] bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Live Sensor Telemetry Streaming</span>
        </div>
      </div>

      {/* 2x2 Grid of 4 Visual Camera Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Widget 1: Zone 1 C140 Jaw Feed */}
        <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#FFC72C]" />
              <span className="font-bold text-white">Zone 1: C140 Jaw Feed</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              1080p AI FEED
            </span>
          </div>

          {/* Dark camera box with green AI bounding box around large rock */}
          <div className="relative bg-stone-950 border border-stone-800 rounded-lg h-52 flex flex-col justify-between p-3 font-mono overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-black/80"></div>
            
            {/* Green AI Bounding Box around large rock */}
            <div className="absolute top-12 left-16 w-36 h-28 border-2 border-emerald-400/90 rounded bg-emerald-400/10 p-1 flex flex-col justify-between animate-pulse">
              <span className="bg-emerald-500 text-[#0B0B0F] text-[9px] font-bold px-1.5 py-0.2 rounded w-max">
                ROCK DETECTED: 420mm (OK)
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400">
              <span>CAM-01 Feed Hopper</span>
              <span className="text-emerald-400 font-bold">FPS: 30</span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px]">
              <span className="text-stone-300">Target Size Limit: &lt;650mm</span>
              <span className="text-emerald-400 font-bold">Pass Rate: 100%</span>
            </div>
          </div>

          {/* Text Below */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-lg p-3 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-stone-200">
              <strong>Status:</strong> Monitoring boulder size. No oversized rocks detected.
            </span>
          </div>
        </div>

        {/* Widget 2: Zone 2 C140 Chamber */}
        <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#FFC72C]" />
              <span className="font-bold text-white">Zone 2: C140 Chamber</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              1080p AI FEED
            </span>
          </div>

          {/* Dark camera box */}
          <div className="relative bg-stone-950 border border-stone-800 rounded-lg h-52 flex flex-col justify-between p-3 font-mono overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-black/80"></div>
            
            {/* Chamber clear overlay */}
            <div className="absolute inset-10 border border-stone-700/60 rounded flex items-center justify-center">
              <span className="bg-stone-900/90 text-stone-300 text-[10px] font-bold px-2 py-1 rounded border border-stone-700">
                CHAMBER FLOW NORMAL &bull; ZERO BRIDGING
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400">
              <span>CAM-02 Jaw Cavity</span>
              <span className="text-emerald-400 font-bold">FPS: 30</span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px]">
              <span className="text-stone-300">Level: 68% Capacity</span>
              <span className="text-emerald-400 font-bold">Free Flow</span>
            </div>
          </div>

          {/* Text Below */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-lg p-3 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-stone-200">
              <strong>Status:</strong> Monitoring for material bridging. Chamber clear.
            </span>
          </div>
        </div>

        {/* Widget 3: Zone 3 Primary Belt Input */}
        <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#FFC72C]" />
              <span className="font-bold text-white">Zone 3: Primary Belt Input</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              1080p AI FEED
            </span>
          </div>

          {/* Dark camera box */}
          <div className="relative bg-stone-950 border border-stone-800 rounded-lg h-52 flex flex-col justify-between p-3 font-mono overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-black/80"></div>
            
            {/* Belt Volume line */}
            <div className="absolute bottom-12 left-8 right-8 h-2 bg-emerald-500/30 border-t border-emerald-400 flex items-center justify-center">
              <span className="bg-stone-900 text-emerald-300 text-[9px] px-1.5 font-bold">
                VOLUMETRIC PROFILE: OPTIMAL LOAD (104 TPH)
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400">
              <span>CAM-03 Discharge Chute</span>
              <span className="text-emerald-400 font-bold">FPS: 30</span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px]">
              <span className="text-stone-300">Speed: 2.4 m/s</span>
              <span className="text-emerald-400 font-bold">Load OK</span>
            </div>
          </div>

          {/* Text Below */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-lg p-3 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-stone-200">
              <strong>Status:</strong> Monitoring volume.
            </span>
          </div>
        </div>

        {/* Widget 4: Zone 4 Primary Belt Spillage */}
        <div className="bg-[#1A1A1F] border border-red-500/60 rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-red-400" />
              <span className="font-bold text-white">Zone 4: Primary Belt Spillage</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold animate-pulse">
              MISALIGNMENT ALERT
            </span>
          </div>

          {/* Dark camera box with RED AI bounding box around spillage */}
          <div className="relative bg-stone-950 border-2 border-red-500/80 rounded-lg h-52 flex flex-col justify-between p-3 font-mono overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-stone-900/40 to-black/80"></div>
            
            {/* Red AI Bounding Box around pile of stone on floor */}
            <div className="absolute bottom-6 left-12 right-12 h-20 border-2 border-red-500 rounded bg-red-500/20 p-1.5 flex flex-col justify-between animate-pulse">
              <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded w-max">
                BELT MISALIGNMENT +4.2cm &bull; SPILL RISK
              </span>
              <span className="text-[10px] text-red-300 font-bold text-right">
                Piles on floor detected
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400">
              <span>CAM-04 Transfer Tower 2</span>
              <span className="text-red-400 font-bold">CRITICAL</span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px]">
              <span className="text-red-300 font-bold">Shift Spillage Loss: 22 Tonnes</span>
              <span className="text-stone-400">Tablet Notified</span>
            </div>
          </div>

          {/* Text Below */}
          <div className="bg-red-950/40 border border-red-500/60 rounded-lg p-3 text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-stone-200">
              <strong>Status:</strong> <span className="text-red-400 font-bold">BELT MISALIGNMENT DETECTED.</span> Alert sent to operator tablet.
            </span>
          </div>
        </div>

      </div>

      {/* Sensor Placement Section */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
          <Activity className="w-5 h-5 text-[#FFC72C]" />
          <h2 className="font-bold text-white text-sm sm:text-base">Sensor Placement</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Sensor 1 */}
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <div>
                <span className="text-white font-bold block">Vibration Sensor 1</span>
                <span className="text-stone-400 text-[11px]">C140 Drive Bearing</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              Status: HEALTHY
            </span>
          </div>

          {/* Sensor 2 */}
          <div className="bg-stone-900 border border-amber-500/40 rounded-lg p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <div>
                <span className="text-white font-bold block">Vibration Sensor 2</span>
                <span className="text-stone-400 text-[11px]">Primary Belt Motor</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              Status: WARNING (High Vibration)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
