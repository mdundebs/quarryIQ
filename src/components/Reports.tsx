import React, { useState } from 'react';
import {
  FileText,
  Download,
  Share2,
  Smartphone,
  CheckCircle2,
  Calendar,
  Send,
  Sparkles,
  FileSpreadsheet,
  FileCheck,
  Clock,
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
  CheckCheck
} from 'lucide-react';
import { EXECUTIVE_REPORTS, ReportItem } from '../mockData';

export const Reports: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [approvedAction, setApprovedAction] = useState<boolean>(false);

  const handleDownload = (report: ReportItem) => {
    setDownloadingId(report.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(`Generated ${report.title} (${report.fileType})`);
      setTimeout(() => setDownloadSuccess(null), 3500);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-stone-900 flex items-center justify-center text-[#FFC72C]">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Automated C-Suite Delivery
              </span>
            </div>
            <h2 className="text-xl font-black text-stone-900 mt-1">
              Executive Briefings &amp; Statutory Reports
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Instant mobile WhatsApp summary delivered at 06:00 AM daily, paired with board-ready audit exports
            </p>
          </div>
        </div>

        <div className="text-right self-start md:self-auto">
          <span className="text-xs text-stone-500 block">Next Scheduled WhatsApp Dispatch</span>
          <span className="text-sm font-bold text-stone-900 font-mono mt-0.5 block">
            Tomorrow at 06:00 AM sharp
          </span>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-xs transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{downloadSuccess} — downloaded successfully for MD executive review.</span>
        </div>
      )}

      {/* Main Grid: WhatsApp Phone Mockup + Reports Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: High-Fidelity Phone Mockup */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-6">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-stone-900">
                WhatsApp Morning Report (Phone Mockup)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Live Mockup
            </span>
          </div>

          {/* Authentic Smartphone Hardware Frame */}
          <div className="max-w-[400px] mx-auto bg-stone-950 p-3.5 rounded-[44px] shadow-2xl border-4 border-stone-800 relative ring-1 ring-stone-900/50">
            {/* Dynamic Island / Speaker Pill */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800 ml-auto mr-2"></div>
            </div>

            {/* Phone Screen Container */}
            <div className="bg-[#EFEAE2] rounded-[34px] overflow-hidden flex flex-col min-h-[580px] border border-stone-800/80">
              {/* WhatsApp App Header */}
              <div className="bg-[#075E54] text-white pt-7 pb-3 px-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#FFC72C] text-[#0B0B0F] flex items-center justify-center font-black text-sm shadow-xs border border-white/20">
                      Q
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#075E54] rounded-full"></span>
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
                      <span>QuarryIQ System</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC72C] fill-[#FFC72C]" />
                    </div>
                    <div className="text-[10px] text-emerald-200">Verified Bot &bull; online</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/80">
                  <Video className="w-4 h-4 cursor-pointer hover:text-white" />
                  <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
                  <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
              </div>

              {/* Chat Date Divider */}
              <div className="py-2.5 text-center">
                <span className="bg-white/80 backdrop-blur-xs text-stone-600 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs border border-stone-200/60 font-mono">
                  Sunday, 4 October 2026
                </span>
              </div>

              {/* Chat Body with Monospace WhatsApp Message */}
              <div className="flex-1 px-3 pb-3 space-y-3 overflow-y-auto">
                {/* Incoming WhatsApp Speech Bubble */}
                <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-sm border border-stone-300/80 max-w-[95%]">
                  {/* Sender title inside bubble */}
                  <div className="text-[11px] font-bold text-[#075E54] flex items-center justify-between pb-1.5 mb-2 border-b border-stone-100">
                    <span>⚡ QUARRYIQ MORNING REPORT (06:00 AM)</span>
                    <span className="text-[10px] text-stone-400 font-mono">06:00</span>
                  </div>

                  {/* Monospace Executive Report Body */}
                  <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-stone-900 whitespace-pre-wrap select-all font-semibold p-1">
{`☀️ GOOD MORNING, MD
📊 NIGHT SHIFT: 180t crushed, 0 downtime
📦 STOCK: 19mm 4200t | 10mm 2800t | Sand 1100t ⚠️ LOW
⚠️ ALERTS: None
📋 FORECAST: 420t today, promise 1,800m²`}
                  </pre>

                  {/* WhatsApp Read Receipt Tick */}
                  <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 mt-2 font-mono">
                    <span>06:00 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>

                {/* Interactive MD Fast Response Action */}
                <div className="pt-1">
                  <button
                    onClick={() => setApprovedAction(true)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                      approvedAction
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {approvedAction ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span className="font-mono">Approved &bull; Rail Manifest Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-mono">Quick Reply: Approve 50k Port Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Phone Bar */}
              <div className="bg-[#F0F2F5] py-2 px-3 flex items-center justify-center border-t border-stone-200">
                <div className="w-28 h-1 bg-stone-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Downloadable Executive Reports Table */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Official Board &amp; Audit Downloads
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Financial, geological, and statutory documents compiled in real time
              </p>
            </div>
            <span className="text-xs text-stone-400 font-mono">5 Reports Ready</span>
          </div>

          <div className="space-y-3">
            {EXECUTIVE_REPORTS.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl border border-stone-200/90 bg-[#FFFDF7] hover:bg-white hover:border-[#FFC72C] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        report.fileType === 'PDF'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : report.fileType === 'XLSX'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {report.fileType}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                      {report.title}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-1">{report.description}</p>
                  <div className="flex items-center gap-4 text-[11px] text-stone-400 font-mono pt-1">
                    <span>Freq: {report.frequency}</span>
                    <span>Date: {report.generatedDate}</span>
                    <span>Size: {report.fileSize}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(report)}
                  disabled={downloadingId === report.id}
                  className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0 disabled:opacity-50"
                >
                  {downloadingId === report.id ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Compiling...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#FFC72C]" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-stone-800">
            <span className="font-bold text-amber-900">Executive Privacy &amp; Data Security:</span> All 
            reports are cryptographically signed with SHA-256 hashes and delivered directly via TLS 
            encrypted channels.
          </div>
        </div>
      </div>
    </div>
  );
};
