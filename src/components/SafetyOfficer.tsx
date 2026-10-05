import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Wind,
  Volume2,
  Droplets,
  Flame,
  CheckCircle2,
  Clock,
  FileCheck,
  Radio,
  Eye,
  Activity
} from 'lucide-react';
import { SAFETY_DATA } from '../mockData';

export const SafetyOfficer: React.FC = () => {
  const [data, setData] = useState(SAFETY_DATA);
  const [mistingOverride, setMistingOverride] = useState(data.haulRoadMistingActive);

  // Calculate percentage of dust opacity gauge (0 to 60 mg/m³)
  const gaugePercent = Math.min(Math.round((data.dustOpacityMgM3 / 60) * 100), 100);

  return (
    <div className="space-y-8">
      {/* Top Banner: Incident Free Counter & High-Level Safety Health */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Mines Act Statutory Compliance: 100% Green
              </span>
            </div>
            <h2 className="text-xl font-black text-stone-900 mt-1">
              Safety, Environmental &amp; Dust Opacity Command
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Continuous monitoring defending against regulatory mine shutdowns and environmental penalties
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-[#0B0B0F] text-white px-5 py-3.5 rounded-xl self-start md:self-auto border border-stone-800">
          <div>
            <span className="text-[11px] text-stone-400 font-medium block uppercase tracking-wider">
              Zero-Harm Record
            </span>
            <span className="text-2xl font-black text-[#FFC72C] font-mono">
              {data.daysIncidentFree}
            </span>
            <span className="text-[11px] text-stone-400 ml-1">Days LTI-Free</span>
          </div>
          <div className="border-l border-stone-700 pl-4">
            <span className="text-[11px] text-stone-400 font-medium block uppercase tracking-wider">
              Blasting Status
            </span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              All Clear (Bench 3)
            </span>
          </div>
        </div>
      </div>

      {/* Main Environmental & Dust Opacity Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dust Opacity Gauge Card */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-stone-900" />
                <h3 className="text-base font-bold text-stone-900">
                  Real-Time Dust Opacity (PM10/PM2.5)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Safe Envelope
              </span>
            </div>

            {/* Gauge Graphic Representation */}
            <div className="my-6 text-center">
              <div className="relative inline-flex flex-col items-center justify-center">
                {/* Visual Radial Gauge Ring */}
                <svg className="w-44 h-44 transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="72"
                    stroke="#f1efe7"
                    strokeWidth="14"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="72"
                    stroke={data.dustOpacityMgM3 > 40 ? '#EF4444' : '#FFC72C'}
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={452}
                    strokeDashoffset={452 - (452 * gaugePercent) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-stone-900 font-mono">
                    {data.dustOpacityMgM3}
                  </span>
                  <span className="text-xs font-semibold text-stone-500 uppercase">
                    mg / m³
                  </span>
                </div>
              </div>

              {/* Threshold Labels */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-semibold text-stone-600">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span>Normal</span>
                  <div className="font-mono text-[11px]">&lt; 30.0</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                  <span>Warning</span>
                  <div className="font-mono text-[11px]">40.0 mg/m³</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50 text-red-800 border border-red-200">
                  <span>Statutory Cap</span>
                  <div className="font-mono text-[11px]">50.0 mg/m³</div>
                </div>
              </div>
            </div>
          </div>

          {/* Misting Suppression Controls */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-stone-800">
                  Haul Road &amp; Feeder Misting Cannons
                </span>
              </div>
              <button
                onClick={() => setMistingOverride(!mistingOverride)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  mistingOverride
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-300 text-stone-700'
                }`}
              >
                {mistingOverride ? 'Auto-Active' : 'Suppression Off'}
              </button>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Triggered automatically when optical sensors read &gt;25.0 mg/m³ for 30 continuous seconds.
            </p>
          </div>
        </div>

        {/* Environmental Telemetry Metrics */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-stone-900" />
                <h3 className="text-base font-bold text-stone-900">
                  Perimeter &amp; Community Environmental Sensors
                </h3>
              </div>
              <span className="text-xs text-stone-500">Live IoT LoRaWAN Mesh</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Boundary Noise</span>
                  <Volume2 className="w-4 h-4 text-[#B38300]" />
                </div>
                <div className="mt-2 text-2xl font-black text-stone-900 font-mono">
                  {data.noiseDbBoundary} <span className="text-xs font-normal text-stone-500">dBA</span>
                </div>
                <div className="mt-1 text-xs text-emerald-700 font-semibold">
                  Well under statutory 85.0 dBA day threshold
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Settling Pond Water pH</span>
                  <Droplets className="w-4 h-4 text-blue-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-stone-900 font-mono">
                  7.4 <span className="text-xs font-normal text-stone-500">pH</span>
                </div>
                <div className="mt-1 text-xs text-emerald-700 font-semibold">
                  Neutral runoff; turbidity 14 NTU (Limit &lt; 25)
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Peak Particle Velocity (PPV)</span>
                  <Radio className="w-4 h-4 text-purple-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-stone-900 font-mono">
                  4.8 <span className="text-xs font-normal text-stone-500">mm/s</span>
                </div>
                <div className="mt-1 text-xs text-emerald-700 font-semibold">
                  Compliant with residential buffer (&lt;10.0 mm/s)
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Pit Slope Georadar</span>
                  <Eye className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-stone-900 font-mono">
                  0.0 <span className="text-xs font-normal text-stone-500">mm shift</span>
                </div>
                <div className="mt-1 text-xs text-emerald-700 font-semibold">
                  Zero bench displacement detected over 30 days
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
            <span className="font-bold">Managing Director Compliance Defense:</span> All continuous 
            sensor data is cryptographically timestamped and stored in immutable audit logs. In the event 
            of a community or government inspection, an official PDF compliance certificate is generated instantly.
          </div>
        </div>
      </div>

      {/* Statutory Compliance Table & Incident Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compliance Table */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-stone-900" />
              <h3 className="text-base font-bold text-stone-900">
                Statutory Regulatory Audit Ledger
              </h3>
            </div>
            <span className="text-xs text-stone-500">Quarterly Tracking</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider">
                  <th className="pb-2.5 font-bold">Standard &amp; Regulation</th>
                  <th className="pb-2.5 font-bold">Agency</th>
                  <th className="pb-2.5 font-bold">Audit Status</th>
                  <th className="pb-2.5 font-bold">Audit Log / Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data.complianceItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50">
                    <td className="py-3 font-semibold text-stone-800 pr-2">
                      {item.regulation}
                    </td>
                    <td className="py-3 text-stone-500 whitespace-nowrap pr-2">
                      {item.agency}
                    </td>
                    <td className="py-3 whitespace-nowrap pr-2">
                      <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-stone-600 font-mono text-[11px]">
                      {item.lastInspected}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-Time Incident / Near-Miss Log */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-stone-900" />
              <h3 className="text-base font-bold text-stone-900">
                Safety Event &amp; Near-Miss Log
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">Telemetry Log</span>
          </div>

          <div className="space-y-3">
            {data.incidentLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl border border-stone-200 bg-[#FFFDF7] text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        log.severity === 'Low'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {log.severity} Severity
                    </span>
                    <span className="font-semibold text-stone-800">{log.zone}</span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">{log.timestamp}</span>
                </div>
                <p className="text-stone-700 mt-1">{log.description}</p>
                <div className="mt-2 pt-2 border-t border-stone-200/80 text-[11px] text-emerald-800 font-medium flex items-start gap-1.5">
                  <span className="font-bold text-stone-600">Action:</span>
                  <span>{log.actionTaken}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
