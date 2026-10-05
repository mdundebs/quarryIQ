import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  TrendingDown,
  Layers,
  Thermometer,
  ShieldAlert,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { ASSET_HEALTH, AssetHealthItem } from '../mockData';

export const Maintenance: React.FC = () => {
  const [assets, setAssets] = useState<AssetHealthItem[]>(ASSET_HEALTH);
  const [selectedAsset, setSelectedAsset] = useState<AssetHealthItem | null>(ASSET_HEALTH[3]); // Default to CV-02 critical
  const [dispatchedKit, setDispatchedKit] = useState<boolean>(false);

  const criticalCount = assets.filter((a) => a.failureRisk === 'Critical Failure Imminent').length;
  const warningCount = assets.filter((a) => a.failureRisk === 'Moderate Warning').length;
  const avgHealth = Math.round(
    assets.reduce((acc, a) => acc + a.healthScore, 0) / assets.length
  );

  const handleDispatchAction = () => {
    setDispatchedKit(true);
    setTimeout(() => {
      setDispatchedKit(false);
    }, 3500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Predictive Maintenance Health Summary */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B0B0F] flex items-center justify-center text-[#FFC72C]">
            <Wrench className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                AI Vibration &amp; Thermal Acoustic Telemetry
              </span>
            </div>
            <h2 className="text-xl font-black text-stone-900 mt-1">
              Asset Health &amp; Predictive Failure Prevention
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Continuous high-frequency accelerometer and bearing temperature analysis to prevent catastrophic quarry stoppage
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-stone-500 block font-medium">Plant Health Index</span>
            <span className="text-2xl font-black text-stone-900 font-mono">{avgHealth}%</span>
          </div>
          <div className="pl-4 border-l border-stone-200 text-right">
            <span className="text-xs text-stone-500 block font-medium">Action Required</span>
            <span className="text-sm font-bold text-red-600 flex items-center gap-1 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              1 Critical / 1 Warning
            </span>
          </div>
        </div>
      </div>

      {/* Critical Failure Alert Banner */}
      {criticalCount > 0 && (
        <div className="bg-red-50/80 border-l-4 border-red-500 rounded-xl p-5 border border-red-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-100 px-2 py-0.5 rounded">
                  Predictive Alert (RUL &lt; 72 Hours)
                </span>
                <span className="text-xs text-stone-500 font-mono">Asset ID: ast-04</span>
              </div>
              <h3 className="text-base font-bold text-red-950 mt-1">
                Main Overland Surge Conveyor CV-02 — Tail Pulley Bearing Failure Imminent
              </h3>
              <p className="text-xs text-stone-700 mt-0.5">
                Vibration frequency spectrum indicates micro-spalling on outer race. Temperature running at 84.1°C (Threshold 80.0°C).
              </p>
            </div>
          </div>

          <button
            onClick={handleDispatchAction}
            className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs shrink-0"
          >
            {dispatchedKit ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Replacement Kit Dispatched!</span>
              </>
            ) : (
              <>
                <PackageCheck className="w-4 h-4 text-white" />
                <span>Stage Swap Kit for Lunch Lull (12:30)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Asset Health Table */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Live Asset Condition &amp; Remaining Useful Life (RUL)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Click any equipment row to inspect detailed bearing harmonic waveforms and maintenance prescriptions
            </p>
          </div>
          <span className="text-xs font-mono text-stone-500">6 Heavy Assets Monitored</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider">
                <th className="pb-3 font-bold">Equipment Asset</th>
                <th className="pb-3 font-bold">Category</th>
                <th className="pb-3 font-bold">Hours</th>
                <th className="pb-3 font-bold">Vibration (mm/s)</th>
                <th className="pb-3 font-bold">Temp (°C)</th>
                <th className="pb-3 font-bold">Health Score</th>
                <th className="pb-3 font-bold">Remaining Life (RUL)</th>
                <th className="pb-3 font-bold">Condition Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {assets.map((asset) => {
                const isSelected = selectedAsset?.id === asset.id;
                let statusBadge = (
                  <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Normal
                  </span>
                );

                if (asset.failureRisk === 'Moderate Warning') {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Warning
                    </span>
                  );
                } else if (asset.failureRisk === 'Critical Failure Imminent') {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      Critical Imminent
                    </span>
                  );
                }

                return (
                  <tr
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`hover:bg-stone-50 cursor-pointer transition-all ${
                      isSelected ? 'bg-amber-50/40 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 pr-2 font-bold text-stone-900">
                      {asset.assetName}
                    </td>
                    <td className="py-3.5 pr-2 text-stone-500">
                      {asset.category}
                    </td>
                    <td className="py-3.5 pr-2 font-mono text-stone-700">
                      {asset.operatingHours.toLocaleString()} hrs
                    </td>
                    <td className="py-3.5 pr-2 font-mono">
                      <span
                        className={
                          asset.vibrationMmS > asset.vibrationThreshold
                            ? 'text-red-600 font-bold'
                            : 'text-stone-700'
                        }
                      >
                        {asset.vibrationMmS} / {asset.vibrationThreshold}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 font-mono">
                      <span
                        className={
                          asset.temperatureC > asset.tempThreshold
                            ? 'text-red-600 font-bold'
                            : 'text-stone-700'
                        }
                      >
                        {asset.temperatureC}°C / {asset.tempThreshold}°C
                      </span>
                    </td>
                    <td className="py-3.5 pr-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-stone-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              asset.healthScore > 80
                                ? 'bg-emerald-500'
                                : asset.healthScore > 65
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${asset.healthScore}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-stone-900 font-bold">
                          {asset.healthScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-2 font-mono font-bold text-stone-800">
                      {asset.rulHours.toLocaleString()} hrs
                    </td>
                    <td className="py-3.5 pr-2 whitespace-nowrap">
                      {statusBadge}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Asset Deep Dive Card */}
      {selectedAsset && (
        <div className="bg-[#0B0B0F] text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                  Detailed Telemetry Inspector
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Tag: {selectedAsset.id}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {selectedAsset.assetName}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 text-right">
                <span className="text-[11px] text-stone-400 block uppercase">Calculated Health</span>
                <span className="text-xl font-black text-[#FFC72C] font-mono">
                  {selectedAsset.healthScore} / 100
                </span>
              </div>
              <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 text-right">
                <span className="text-[11px] text-stone-400 block uppercase">Projected RUL</span>
                <span className="text-xl font-black text-stone-100 font-mono">
                  {selectedAsset.rulHours} hrs
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Acoustic &amp; Thermal Diagnosis
              </h4>
              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-400">Vibration Level:</span>
                  <span className="font-mono font-bold text-white">
                    {selectedAsset.vibrationMmS} mm/s (Peak Tri-Axial)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Motor / Bushing Temp:</span>
                  <span className="font-mono font-bold text-white">
                    {selectedAsset.temperatureC} °C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Failure Diagnosis:</span>
                  <span className="text-amber-400 font-medium">
                    {selectedAsset.predictedFailureReason || 'No anomalous harmonic peak detected.'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Prescribed Maintenance Intervention
              </h4>
              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-xs">
                <p className="text-stone-200 leading-relaxed font-medium">
                  {selectedAsset.recommendedAction}
                </p>
                <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Target Execution Window:</span>
                  <span className="font-bold text-[#FFC72C]">Next Scheduled Lull / Shift Change</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
