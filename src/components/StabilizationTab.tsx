import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  QrCode,
  Video,
  Activity,
  ShieldCheck,
  PackageCheck,
  Wrench,
  Clock,
  Zap,
  Eye,
  Layers,
  Search
} from 'lucide-react';
import { BASELINE } from '../config/baseline';

interface BearingItem {
  id: string;
  name: string;
  equipment: string;
  vibration: string;
  temperature: string;
  status: 'critical' | 'warning' | 'healthy';
  predictedFailure: string;
  shelfLocation: string;
}

const BEARINGS_DATA: BearingItem[] = [
  {
    id: 'BRG-01',
    name: 'C140 Drive Bearing',
    equipment: 'C140 Primary Jaw Crusher',
    vibration: '6.8 mm/s',
    temperature: '82°C',
    status: 'critical',
    predictedFailure: '14 Days (336 Hours)',
    shelfLocation: 'Shelf 4B',
  },
  {
    id: 'BRG-02',
    name: 'Main Shaft Upper Bearing',
    equipment: 'Secondary Cone Crusher',
    vibration: '2.1 mm/s',
    temperature: '48°C',
    status: 'healthy',
    predictedFailure: '> 120 Days',
    shelfLocation: 'Shelf 2A',
  },
  {
    id: 'BRG-03',
    name: 'Vibrator Drive Shaft Bearing',
    equipment: 'Primary Triple-Deck Screen',
    vibration: '3.4 mm/s',
    temperature: '62°C',
    status: 'warning',
    predictedFailure: '45 Days (1,080 Hours)',
    shelfLocation: 'Shelf 3C',
  },
  {
    id: 'BRG-04',
    name: 'Tail Pulley Bearing',
    equipment: 'Primary Discharge Belt CV-01',
    vibration: '1.8 mm/s',
    temperature: '41°C',
    status: 'healthy',
    predictedFailure: '> 180 Days',
    shelfLocation: 'Shelf 1D',
  },
];

interface VisionLogItem {
  time: string;
  camera: string;
  message: string;
  outcome: string;
  severity: 'high' | 'medium' | 'info';
}

const VISION_LOGS: VisionLogItem[] = [
  {
    time: '10:42 AM',
    camera: 'Camera 4 (Transfer Tower 2)',
    message: 'Camera 4 detected belt misalignment.',
    outcome: 'Alert sent to Night Shift Supervisor. Spillage Prevented: 22 Tonnes.',
    severity: 'high',
  },
  {
    time: '08:15 AM',
    camera: 'Camera 2 (Feeder 01 Hopper)',
    message: 'Camera 2 detected oversize boulder (780mm) on Feeder 1.',
    outcome: 'Automated feeder slowdown triggered. Crusher choke prevented.',
    severity: 'medium',
  },
  {
    time: '06:30 AM',
    camera: 'Camera 1 (Chute 03 Transfer)',
    message: 'Camera 1 detected material build-up in transfer chute.',
    outcome: 'Cleaning notification dispatched. Unplanned downtime prevented: 1.5 Hours.',
    severity: 'info',
  },
];

interface AssetItem {
  name: string;
  category: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  lastInspection: string;
  uptime: string;
}

const ASSET_REGISTER: AssetItem[] = [
  { name: 'C140 Jaw Crusher', category: 'Crushing', status: 'Warning', lastInspection: 'Today, 07:00', uptime: '94.2%' },
  { name: 'Primary Belt CV-01', category: 'Conveyors', status: 'Healthy', lastInspection: 'Today, 06:30', uptime: '99.1%' },
  { name: 'Secondary Cone Crusher', category: 'Crushing', status: 'Healthy', lastInspection: 'Yesterday', uptime: '98.5%' },
  { name: 'Triple-Deck Screen 01', category: 'Screening', status: 'Warning', lastInspection: 'Today, 08:15', uptime: '92.0%' },
  { name: 'Product Belt CV-04 (19mm)', category: 'Conveyors', status: 'Healthy', lastInspection: 'Today, 09:00', uptime: '99.8%' },
  { name: 'Tertiary Cone Crusher', category: 'Crushing', status: 'Healthy', lastInspection: 'Yesterday', uptime: '97.4%' },
];

export function StabilizationTab() {
  const [selectedBearing, setSelectedBearing] = useState<BearingItem | null>(BEARINGS_DATA[0]);
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredAssets = ASSET_REGISTER.filter((a) =>
    a.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-[#E2E8F0]">
      {/* Top Banner */}
      <div className="bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FFC72C]/20 border border-[#FFC72C] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#FFC72C]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Phase 1: Stabilization Baseline</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">ACTIVE</span>
            </h2>
            <p className="text-xs text-stone-300 mt-0.5 font-mono">
              {BASELINE.ASSUMPTIONS_BANNER_TEXT}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right font-mono text-xs text-[#FFC72C]">
          <div>Target: 4,000 t/day</div>
          <div className="text-stone-400">Current: ~1,000 t/day</div>
        </div>
      </div>

      {/* Main Grid: Modules A, B, C */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Module A: Predictive Maintenance (Bearing Health Table) */}
        <div className="lg:col-span-2 bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-[#FFC72C]" />
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Module A: Predictive Maintenance &amp; Spares</h3>
                <p className="text-xs text-stone-400">Vibration telemetry &amp; failure prediction model</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
              1 Critical Alert
            </span>
          </div>

          {/* Critical Bearing Spotlight Card */}
          <div className="bg-red-950/30 border-2 border-red-500/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="font-bold text-white text-sm">C140 Drive Bearing Alert</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500 text-white">
                CRITICAL VIBRATION
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 font-mono">
              Vibration: <span className="font-bold text-red-400">6.8 mm/s (Critical)</span>. Predicted Failure: <span className="font-bold text-[#FFC72C]">14 Days (336 Hours)</span>.
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="text-xs text-stone-400 font-mono">
                Location: Shelf 4B &bull; Part # BRG-C140-DRV-02
              </div>
              <button
                onClick={() => setQrModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFC72C] text-[#0B0B0F] font-bold text-xs hover:bg-[#ffcf47] transition-all cursor-pointer shadow-xs"
              >
                <QrCode className="w-4 h-4 text-[#0B0B0F]" />
                <span>Check Spares (QR)</span>
              </button>
            </div>
          </div>

          {/* Bearing Telemetry Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-stone-900/80 text-stone-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-2.5">Component / Bearing</th>
                  <th className="p-2.5">Equipment</th>
                  <th className="p-2.5">Vibration</th>
                  <th className="p-2.5">Temp</th>
                  <th className="p-2.5">Predicted Failure</th>
                  <th className="p-2.5 text-right">Spares</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {BEARINGS_DATA.map((brg) => (
                  <tr key={brg.id} className="hover:bg-stone-900/50 transition-colors">
                    <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                      {brg.status === 'critical' ? (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      ) : brg.status === 'warning' ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      )}
                      <span>{brg.name}</span>
                    </td>
                    <td className="p-2.5 text-stone-300">{brg.equipment}</td>
                    <td className={`p-2.5 font-bold ${brg.status === 'critical' ? 'text-red-400' : 'text-stone-200'}`}>
                      {brg.vibration}
                    </td>
                    <td className="p-2.5 text-stone-300">{brg.temperature}</td>
                    <td className="p-2.5 text-stone-300">{brg.predictedFailure}</td>
                    <td className="p-2.5 text-right">
                      <span className="px-2 py-0.5 rounded bg-stone-800 text-[#FFC72C] text-[11px] font-bold border border-stone-700">
                        {brg.shelfLocation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Module B: AI Vision & Spillage Control */}
        <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-[#FFC72C]" />
              <div>
                <h3 className="font-bold text-white text-sm">Module B: AI Vision &amp; Spillage</h3>
                <p className="text-xs text-stone-400">Real-time conveyor &amp; chute analytics</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              3 CAMERAS ONLINE
            </span>
          </div>

          {/* Camera Feed Widget */}
          <div className="relative bg-black rounded-lg overflow-hidden border border-stone-800 h-44 flex flex-col justify-between p-3 font-mono">
            {/* Feed Background simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-stone-900/60 to-stone-900/20 opacity-80"></div>
            
            {/* Bounding box simulation */}
            <div className="absolute top-10 left-12 right-16 bottom-12 border-2 border-red-500/80 rounded bg-red-500/10 p-2 flex flex-col justify-between">
              <div className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 w-max rounded">
                MISALIGNMENT DETECTED +4.2cm
              </div>
              <div className="text-[10px] text-red-300 font-bold text-right">
                SPILL RISK HIGH
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="font-bold text-white text-[11px]">CAM-04 Transfer Tower 2</span>
              </div>
              <span className="text-[10px] bg-stone-900/90 px-1.5 py-0.5 rounded text-stone-400">1080p @ 30fps</span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400">
              <span>Primary Conveyor CV-02</span>
              <span className="text-[#FFC72C] font-bold">22 Tonnes Saved Today</span>
            </div>
          </div>

          {/* Vision Event Log */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">
              Live AI Detection Logs
            </div>
            <div className="space-y-2">
              {VISION_LOGS.map((log, idx) => (
                <div key={idx} className="bg-stone-900/80 border border-stone-800 rounded-lg p-2.5 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between text-stone-400">
                    <span className="font-bold text-[#FFC72C]">{log.time}</span>
                    <span className="text-[10px]">{log.camera}</span>
                  </div>
                  <div className="text-white font-medium">{log.message}</div>
                  <div className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{log.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module C: Asset Register (Full Width below or 3-col) */}
        <div className="lg:col-span-3 bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#FFC72C]" />
              <div>
                <h3 className="font-bold text-white text-base">Module C: Plant Equipment &amp; Asset Register</h3>
                <p className="text-xs text-stone-400">Physical operational status across all 6 primary assets</p>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="bg-stone-900 border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#FFC72C] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssets.map((asset, i) => (
              <div
                key={i}
                className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 hover:border-stone-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400 uppercase">{asset.category}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                      asset.status === 'Warning'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : asset.status === 'Critical'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {asset.status}
                  </span>
                </div>

                <div className="font-bold text-white text-sm">{asset.name}</div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-stone-800 text-stone-400">
                  <div>
                    <span className="block text-[10px] text-stone-500">Last Inspection</span>
                    <span className="text-stone-200">{asset.lastInspection}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-500">Uptime Rate</span>
                    <span className="text-emerald-400 font-bold">{asset.uptime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* QR Spares Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1F] border border-[#FFC72C] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <PackageCheck className="w-6 h-6 text-[#FFC72C]" />
                <h3 className="font-bold text-white text-base">Store Room Inventory (QR Scan)</h3>
              </div>
              <button
                onClick={() => setQrModalOpen(false)}
                className="text-stone-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 text-center space-y-3 font-mono">
              <div className="w-28 h-28 mx-auto bg-white p-2 rounded-lg flex items-center justify-center">
                {/* SVG Mock QR Code */}
                <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h20 v10 h-20 z M10,40 h10 v20 h-10 z M40,40 h20 v20 h-20 z M70,40 h20 v10 h-20 z M40,70 h20 v20 h-20 z M70,70 h20 v20 h-20 z" />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-stone-400">Match Found in Local Inventory:</div>
                <div className="text-sm font-bold text-[#FFC72C]">Spare found in Store Room: Shelf 4B</div>
                <div className="text-xs text-white">Part # BRG-C140-DRV-02 &bull; In Stock: 1 Unit</div>
                <div className="text-[11px] text-emerald-400 pt-1">Reserved for C140 Jaw Crusher Maintenance</div>
              </div>
            </div>

            <button
              onClick={() => setQrModalOpen(false)}
              className="w-full py-2.5 rounded-lg bg-[#FFC72C] text-[#0B0B0F] font-bold text-xs hover:bg-[#ffcf47] transition-all cursor-pointer"
            >
              Close Inventory Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
