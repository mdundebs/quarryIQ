import React from 'react';
import {
  Zap,
  Cpu,
  Info,
  Activity,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Server
} from 'lucide-react';

interface ElectricalAsset {
  id: string;
  name: string;
  type: string;
  status: 'HEALTHY' | 'ONLINE' | 'CONNECTED';
  metric: string;
  detail: string;
}

const PHASE1_ELECTRICAL_ASSETS: ElectricalAsset[] = [
  {
    id: 'elec-01',
    name: 'ABB VSD 1 (Primary Conveyor)',
    type: 'Variable Speed Drive (22kW)',
    status: 'HEALTHY',
    metric: '40Hz - 45°C',
    detail: 'Optimal frequency modulation & controlled soft ramp active',
  },
  {
    id: 'elec-02',
    name: 'WEG Soft Starter (C140 Jaw)',
    type: 'Heavy Duty Starter (110kW/155kW/191kW)',
    status: 'HEALTHY',
    metric: '110A Current',
    detail: '20-second smooth voltage acceleration eliminates transformer surges',
  },
  {
    id: 'elec-03',
    name: 'Siemens PLC',
    type: 'Programmable Controller',
    status: 'ONLINE',
    metric: 'CPU Load: 18%',
    detail: 'SCADA interlock telemetry & Modbus RTU busbar operational',
  },
  {
    id: 'elec-04',
    name: 'BST100 Scale',
    type: 'Weighbridge Integrator',
    status: 'CONNECTED',
    metric: 'Modbus RTU Active',
    detail: 'Continuous live belt tonnage feed synchronized with optical AI camera',
  },
  {
    id: 'elec-05',
    name: 'MCC Incomer',
    type: 'Main Motor Control Center',
    status: 'HEALTHY',
    metric: '800A (1000A busbar)',
    detail: 'Sized for 500kVA Transformer',
  },
  {
    id: 'elec-06',
    name: 'Energy Meters',
    type: 'Substation Power Integrator',
    status: 'CONNECTED',
    metric: 'ACTIVE',
    detail: 'Tracking Power Factor & Phase Currents',
  },
];

export const Maintenance: React.FC = () => {
  return (
    <div className="space-y-6 text-[#E2E8F0]">
      {/* Top Banner: Electrical Infrastructure Focus */}
      <div className="bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFC72C] to-[#b38300] flex items-center justify-center font-bold text-[#0B0B0F] text-lg shadow-md shrink-0">
            <Zap className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Electrical Health</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F] font-mono">
                PHASE 1 ELECTRICAL STABILIZATION
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5 font-mono">
              Live telemetry monitoring newly installed ABB VSDs, WEG Soft Starters, Siemens S7 PLC, and BST100 Scale
            </p>
          </div>
        </div>

        <div className="text-right shrink-0 font-mono text-xs text-[#FFC72C] bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg">
          <div>Delivery Partner: Ivevane Automation</div>
          <div className="text-stone-400 text-[10px]">Tier-1 Electrical Infrastructure</div>
        </div>
      </div>

      {/* Installed Electrical Assets Grid */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-6 shadow-xl space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="font-bold text-white text-base">Phase 1 Electrical Equipment Status</h2>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30">
            6 / 6 SYSTEMS OPERATIONAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PHASE1_ELECTRICAL_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className="bg-stone-900/90 border border-stone-800 rounded-xl p-5 hover:border-[#FFC72C]/40 transition-colors space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">{asset.type}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    {asset.status}
                  </span>
                </div>

                <div className="font-bold text-white text-sm sm:text-base leading-snug">{asset.name}</div>
              </div>

              <div className="text-lg font-black text-[#FFC72C] bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                {asset.metric}
              </div>

              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                {asset.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Note Box */}
      <div className="bg-stone-900 border-2 border-[#FFC72C]/40 rounded-xl p-4 sm:p-5 text-xs font-mono flex items-start gap-3 shadow-md">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-stone-300 leading-relaxed font-sans">
          <strong>Electrical Stabilization Summary:</strong> Phase 1 replaces unmonitored switchgear with high-integrity ABB VSDs and WEG Soft Starters. Controlled motor acceleration prevents voltage dips on the local substation transformer and stops mechanical shock on conveyor belts.
        </div>
      </div>
    </div>
  );
};
