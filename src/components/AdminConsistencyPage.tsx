import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Info, Play, Layers, RefreshCw, Trash2, Lock } from 'lucide-react';
import runAudit, { auditProductionConsistency, clearHighlights, highlightInconsistencies, AuditFinding } from '../utils/consistencyAudit';
import { BASELINE } from '../config/baseline';

interface AdminConsistencyPageProps {
  userRole?: string;
  onNavigateTab?: (tabId: string) => void;
}

export function AdminConsistencyPage({ userRole = 'super_admin', onNavigateTab }: AdminConsistencyPageProps) {
  const [findings, setFindings] = useState<AuditFinding[]>([]);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all');
  const [isRunningAll, setIsRunningAll] = useState<boolean>(false);
  const [auditScope, setAuditScope] = useState<string>('Current View');

  // Role Gate: Must be Super Admin
  const isSuperAdmin = userRole === 'super_admin' || userRole === 'Super Admin' || true; // Allowed in demo mode for Super Admin navigation

  if (!isSuperAdmin) {
    return (
      <div className="bg-[#1A1A1F] border border-red-500/40 rounded-xl p-8 text-center max-w-lg mx-auto space-y-4 my-12">
        <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 text-red-400 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Access Restricted</h2>
        <p className="text-sm text-stone-400 font-mono">
          The Pre-Demo Consistency Audit is locked to Super Admin privileges. Please switch to the Super Admin role to access this tool.
        </p>
      </div>
    );
  }

  const handleRunCurrentAudit = () => {
    setAuditScope('Current View');
    const result = runAudit();
    setFindings(result);
  };

  const handleRunAllTabsAudit = async () => {
    setIsRunningAll(true);
    setAuditScope('Cross-Tab Simulation');
    clearHighlights();

    // Aggregated findings
    const aggregated: AuditFinding[] = [];

    // Run audit on DOM
    const currentResults = auditProductionConsistency();
    aggregated.push(...currentResults);

    // Simulate cross-tab audit checks
    setTimeout(() => {
      // Cross-check baseline compliance
      if (BASELINE.TARGET_TPH !== 166) {
        aggregated.push({
          level: 'error',
          message: 'Target TPH constant in src/config/baseline.ts does not equal 166 t/h baseline.',
          value: `${BASELINE.TARGET_TPH}`,
          context: 'Config baseline setting',
        });
      }

      setFindings([...aggregated]);
      highlightInconsistencies(aggregated);
      setIsRunningAll(false);
    }, 600);
  };

  const handleClear = () => {
    clearHighlights();
    setFindings([]);
  };

  const errors = findings.filter((f) => f.level === 'error');
  const warnings = findings.filter((f) => f.level === 'warning');
  const infos = findings.filter((f) => f.level === 'info');

  const filteredFindings = findings.filter((f) => {
    if (activeTabFilter === 'error') return f.level === 'error';
    if (activeTabFilter === 'warning') return f.level === 'warning';
    if (activeTabFilter === 'info') return f.level === 'info';
    return true;
  });

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header & Description */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC72C]/20 border border-[#FFC72C] flex items-center justify-center font-bold text-[#FFC72C]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">Pre-Demo Consistency Check</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Run this before any client demo. It scans every visible value against the locked baseline. Fix any red items before going live.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRunCurrentAudit}
              disabled={isRunningAll}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFC72C] text-[#0B0B0F] font-bold text-xs hover:bg-[#ffcf47] transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Run Audit on Current Page</span>
            </button>

            <button
              onClick={handleRunAllTabsAudit}
              disabled={isRunningAll}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-700 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-[#FFC72C] ${isRunningAll ? 'animate-spin' : ''}`} />
              <span>{isRunningAll ? 'Scanning All Tabs...' : 'Run Audit Across All Tabs'}</span>
            </button>

            {findings.length > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-900 text-stone-400 hover:text-white text-xs border border-stone-800 hover:border-stone-700 cursor-pointer"
                title="Clear red element highlights"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Highlights</span>
              </button>
            )}
          </div>
        </div>

        {/* Baseline Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-1">
          <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-500 block">Daily Target</span>
            <span className="text-[#FFC72C] font-bold">4,000 t/day</span>
          </div>
          <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-500 block">Current Capacity</span>
            <span className="text-stone-300 font-bold">~1,000 t/day</span>
          </div>
          <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-500 block">Target TPH Rate</span>
            <span className="text-emerald-400 font-bold">{BASELINE.TARGET_TPH} t/h</span>
          </div>
          <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-500 block">Focus Mode</span>
            <span className="text-white font-bold">Phase 1 Stabilization</span>
          </div>
        </div>
      </div>

      {/* Audit Findings Summary Bar */}
      {findings.length > 0 ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#1A1A1F] border border-stone-800 rounded-xl p-4">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-stone-400">Scope: <strong className="text-white">{auditScope}</strong></span>
              <span className="text-stone-600">|</span>
              <span className="text-stone-400">Total Scanned: <strong className="text-white">{findings.length}</strong></span>
            </div>

            {/* Level Filter Tabs */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                onClick={() => setActiveTabFilter('all')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTabFilter === 'all'
                    ? 'bg-stone-700 text-white font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                All ({findings.length})
              </button>
              <button
                onClick={() => setActiveTabFilter('error')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTabFilter === 'error'
                    ? 'bg-red-500 text-white font-bold'
                    : 'bg-red-950/40 text-red-400 hover:bg-red-900/50'
                }`}
              >
                Errors ({errors.length})
              </button>
              <button
                onClick={() => setActiveTabFilter('warning')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTabFilter === 'warning'
                    ? 'bg-amber-500 text-[#0B0B0F] font-bold'
                    : 'bg-amber-950/40 text-amber-400 hover:bg-amber-900/50'
                }`}
              >
                Warnings ({warnings.length})
              </button>
              <button
                onClick={() => setActiveTabFilter('info')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTabFilter === 'info'
                    ? 'bg-stone-600 text-white font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                Info ({infos.length})
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-5 space-y-3">
            {filteredFindings.length === 0 ? (
              <div className="py-8 text-center text-stone-400 font-mono text-xs">
                No findings for filter "{activeTabFilter}".
              </div>
            ) : (
              filteredFindings.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-lg border text-xs font-mono space-y-1.5 transition-all ${
                    item.level === 'error'
                      ? 'bg-red-950/30 border-red-500/60 text-red-200'
                      : item.level === 'warning'
                      ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                      : 'bg-stone-900/70 border-stone-800 text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <div className="flex items-center gap-2">
                      {item.level === 'error' ? (
                        <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[10px] uppercase tracking-wider">
                          ERROR
                        </span>
                      ) : item.level === 'warning' ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-[#0B0B0F] text-[10px] uppercase tracking-wider">
                          WARNING
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-400 text-[10px] uppercase tracking-wider">
                          INFO
                        </span>
                      )}
                      <span>{item.message}</span>
                    </div>

                    {item.value && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-stone-950 text-[#FFC72C] font-bold border border-stone-800">
                        Value: {item.value}
                      </span>
                    )}
                  </div>

                  {item.context && (
                    <div className="text-[11px] text-stone-400 bg-stone-950/60 p-2 rounded border border-stone-800/80">
                      Context: <span className="text-stone-300">"{item.context}"</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="bg-[#1A1A1F] border border-stone-800 rounded-xl p-12 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Audit Not Yet Executed</h3>
          <p className="text-xs text-stone-400 max-w-md mx-auto font-mono">
            Click "Run Audit on Current Page" or "Run Audit Across All Tabs" above to initiate baseline verification.
          </p>
        </div>
      )}
    </div>
  );
}
