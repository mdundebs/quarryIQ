import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Scale,
  Sparkles,
  Info,
  ChevronRight,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { DIGITAL_TWIN_NODES, MaterialBalanceNode } from '../mockData';

export const DigitalTwin: React.FC = () => {
  const [nodes, setNodes] = useState<MaterialBalanceNode[]>(DIGITAL_TWIN_NODES);
  const [selectedNode, setSelectedNode] = useState<MaterialBalanceNode>(DIGITAL_TWIN_NODES[2]); // Surge buffer

  // Aggregated Quarry Mass Balance:
  // Total Mined In = 5,400 T
  // Total Dispatched Out = 4,305 T
  // Total Inventory Net Build = +1,070 T
  // Total Discrepancy = -25 T (-0.46% of total mass, well within 1.0% moisture/dust loss standard)
  const totalMinedToday = 5400;
  const totalDispatchedToday = 4305;
  const totalNetAccumulated = 1070;
  const netVarianceTons = 25; // Moisture & dust loss

  return (
    <div className="space-y-8">
      {/* Top Banner: Digital Twin Concept & Live Mass-Balance Status */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-stone-900 flex items-center justify-center text-[#FFC72C]">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Mass Balance: Verified (-0.46% Loss)
              </span>
            </div>
            <h2 className="text-xl font-black text-stone-900 mt-1">
              Quarry Material Balance &amp; Digital Twin
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Closed-loop mathematical reconciliation across extraction, crushing, stockpiles, and dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <span className="text-stone-500 block">Shrinkage Risk</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Zero Theft Flagged
            </span>
          </div>
        </div>
      </div>

      {/* The Material Balance Equation Banner */}
      <div className="bg-[#0B0B0F] text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#FFC72C] flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#FFC72C]" />
            Continuous Plant Conservation of Mass Equation
          </span>
          <span className="text-xs text-stone-400 font-mono">Telemetry Synchronized</span>
        </div>

        <div className="p-4 sm:p-6 rounded-xl bg-stone-900 border border-stone-800 text-center font-mono text-sm sm:text-base md:text-lg text-stone-200 font-bold overflow-x-auto whitespace-nowrap">
          <span className="text-[#FFC72C]">Closing Stock</span>
          <span className="text-stone-500 mx-2">=</span>
          <span className="text-white">Opening Stock</span>
          <span className="text-emerald-400 mx-2">+</span>
          <span className="text-emerald-400">Rock Mined / Produced</span>
          <span className="text-red-400 mx-2">-</span>
          <span className="text-red-400">Weighbridge Dispatched</span>
          <span className="text-stone-500 mx-2">±</span>
          <span className="text-amber-400">Δ Moisture Variance</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
          <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800">
            <span className="text-[11px] text-stone-400 uppercase">Mined Input Today</span>
            <div className="text-xl font-black text-emerald-400 font-mono mt-1">
              +{totalMinedToday.toLocaleString()} T
            </div>
          </div>
          <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800">
            <span className="text-[11px] text-stone-400 uppercase">Dispatched Out</span>
            <div className="text-xl font-black text-red-400 font-mono mt-1">
              -{totalDispatchedToday.toLocaleString()} T
            </div>
          </div>
          <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800">
            <span className="text-[11px] text-stone-400 uppercase">Stockyard Net Build</span>
            <div className="text-xl font-black text-[#FFC72C] font-mono mt-1">
              +{totalNetAccumulated.toLocaleString()} T
            </div>
          </div>
          <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800">
            <span className="text-[11px] text-stone-400 uppercase">Moisture &amp; Dust Loss</span>
            <div className="text-xl font-black text-amber-400 font-mono mt-1">
              -{netVarianceTons} T (-0.46%)
            </div>
          </div>
        </div>
      </div>

      {/* Visual Quarry Flow Line (6 Stages) */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Quarry Production Flow Block Diagram
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Real-time feed rates, continuous conveyor weigh scales, and stage inventory
            </p>
          </div>
          <span className="text-xs text-stone-400">Click any block to inspect node balance</span>
        </div>

        {/* Responsive Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {nodes.map((node, index) => {
            const isSelected = selectedNode.nodeId === node.nodeId;
            return (
              <div
                key={node.nodeId}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-amber-50/70 border-[#FFC72C] shadow-sm ring-1 ring-[#FFC72C]'
                    : 'bg-[#FFFDF7] border-stone-200 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-bold font-mono">Stage 0{index + 1}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 font-bold">
                      {node.feedRateTph} t/h
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-stone-900 leading-snug">
                    {node.stageName}
                  </h4>
                </div>

                <div className="mt-4 pt-2 border-t border-stone-200/60">
                  <div className="text-[11px] text-stone-500 flex justify-between">
                    <span>Stock:</span>
                    <span className="font-mono font-bold text-stone-900">
                      {node.closingStockTons.toLocaleString()}t
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-1 font-semibold flex items-center justify-between">
                    <span>Loss:</span>
                    <span>{node.lossPercentage}%</span>
                  </div>
                </div>

                {index < nodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep Dive Inspector */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900 text-[#FFC72C]">
                Stage Node Audit
              </span>
              <h3 className="text-lg font-bold text-stone-900">{selectedNode.stageName}</h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Continuous weightometer mass-balance ledger for this process stage
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Status: Mathematically Balanced
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
            <span className="text-xs font-semibold text-stone-500 block">Opening Stock</span>
            <div className="text-xl font-black text-stone-900 font-mono mt-1">
              {selectedNode.openingStockTons.toLocaleString()} T
            </div>
            <span className="text-[11px] text-stone-400 mt-0.5 block">At 00:00 Shift Start</span>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
            <span className="text-xs font-semibold text-stone-500 block">Material Ingested</span>
            <div className="text-xl font-black text-emerald-700 font-mono mt-1">
              +{selectedNode.minedInputTons.toLocaleString()} T
            </div>
            <span className="text-[11px] text-stone-400 mt-0.5 block">Feed Conveyor Scale</span>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
            <span className="text-xs font-semibold text-stone-500 block">Discharged / Screened</span>
            <div className="text-xl font-black text-red-700 font-mono mt-1">
              -{selectedNode.processedTons.toLocaleString()} T
            </div>
            <span className="text-[11px] text-stone-400 mt-0.5 block">Exit Belt Weigher</span>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
            <span className="text-xs font-semibold text-stone-500 block">Current Closing Stock</span>
            <div className="text-xl font-black text-stone-900 font-mono mt-1">
              {selectedNode.closingStockTons.toLocaleString()} T
            </div>
            <span className="text-[11px] text-stone-400 mt-0.5 block">Calibrated Volume</span>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF7]">
            <span className="text-xs font-semibold text-stone-500 block">Net Discrepancy</span>
            <div className="text-xl font-black text-amber-700 font-mono mt-1">
              {selectedNode.discrepancyTons} T
            </div>
            <span className="text-[11px] text-stone-400 mt-0.5 block">
              {selectedNode.lossPercentage}% moisture/dust
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
          <span className="font-bold text-stone-900">Why this matters to the Managing Director:</span> In conventional 
          granite quarries, stockpile reconciliations happen once a month via survey contractors, leaving a 30-day blind spot 
          for theft, operator short-hauling, or crusher choke inefficiency. QuarryIQ’s Digital Twin computes mass balances continuously 
          every 15 minutes.
        </div>
      </div>
    </div>
  );
};
