import React, { useState } from 'react';
import {
  X,
  BookOpen,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Camera,
  Wrench,
  ShieldAlert,
  DollarSign,
  PhoneCall
} from 'lucide-react';

interface UserManualDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ManualSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
  content: string[];
}

export const UserManualDrawer: React.FC<UserManualDrawerProps> = ({ isOpen, onClose }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    gettingStarted: true,
    ceoView: false,
    investment: false,
    throughputTest: false,
    electricalHealth: false,
    support: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections: ManualSection[] = [
    {
      id: 'gettingStarted',
      title: '1. Getting Started',
      icon: BookOpen,
      summary: 'How to navigate the QuarryIQ Phase 1 interface and understand key telemetry.',
      content: [
        'Welcome to QuarryIQ Phase 1. This system monitors electrical stabilization and optical throughput at Davis Granite.',
        'Use the top navigation bar to switch between the 4 main tabs: CEO View, Phase 1 Investment, Throughput Test, and Electrical Health.',
        'Click the QuarryIQ logo in the top left at any time to return to the Executive Briefing overview.',
      ],
    },
    {
      id: 'ceoView',
      title: '2. CEO View Console',
      icon: BarChart3,
      summary: 'High-level business health metrics, targets, and risk mitigations.',
      content: [
        'Live TPH: Displays live crushed aggregate rate against the 166 t/h benchmark for meeting 4,000 t/day output.',
        'Daily Production Progress: Tracks actual daily output (1,000 t/day baseline) toward the 4,000 t/day target.',
        'Risk vs. Automation Matrix: Shows how WEG Soft Starters, ABB VSDs, and AI Camera checks solve transformer overloads, belt snapping, spillage, and revenue leaks.',
        'Plant Master Control: Enables executive interlock emergency stops across crusher and conveyor sections.',
      ],
    },
    {
      id: 'investment',
      title: '3. Phase 1 Investment Proposal ($102,200)',
      icon: DollarSign,
      summary: 'Turnkey commercial setup table, 12-month support retainer, and 06:00 AM operational story.',
      content: [
        'Itemized Turnkey Cost: ABB VSDs ($25,000), WEG Soft Starters ($34,000), Relays & Cabling ($3,400), Ivevane Installation ($36,000), and Edge PC & 1x Test Camera ($3,800) = $102,200 Total.',
        '12-Month Support: $1,999 / month retainer covering remote SCADA monitoring, AI updates, cybersecurity, and on-site staff training.',
        '06:00 AM Operational Story: Step-by-step sequence showing how HMI start triggers soft starters, VSD ramps, optical camera sizing, PLC translation, and Edge PC telemetry.',
      ],
    },
    {
      id: 'throughputTest',
      title: '4. Throughput Test (1x Camera)',
      icon: Camera,
      summary: '1080p optical aggregate counter at 19mm ST discharge cross-checking belt scale accuracy.',
      content: [
        'Optical Volumetric Sizing: Edge AI measures falling aggregate volume and grain size distribution in real time.',
        'Reference Case Study Note: Explains why belt scale drift (2-4%) creates revenue leaks in high-capacity mines.',
        'Scale vs. AI Comparison Widget: Displays BST100 Scale (1,000 t/day) vs AI Camera Calc (1,040 t/day) to detect +4% scale variance immediately.',
      ],
    },
    {
      id: 'electricalHealth',
      title: '5. Electrical Health',
      icon: Wrench,
      summary: 'Live condition monitoring for new Phase 1 electrical infrastructure.',
      content: [
        'ABB VSD 1 (Primary Conveyor): HEALTHY - 40Hz - 45°C.',
        'WEG Soft Starter (C140 Jaw): HEALTHY - 110A.',
        'Siemens PLC: ONLINE - CPU Load 18%.',
        'BST100 Scale: CONNECTED - Modbus RTU telemetry active.',
      ],
    },
    {
      id: 'support',
      title: '6. Support & Engineering Contacts',
      icon: PhoneCall,
      summary: 'Direct engineering lines for Fireflies Energy, Ivevane Automation, and Ndebele Visionary Nexus.',
      content: [
        'Presented by: Fireflies Energy (Pvt) Ltd',
        'Electrical & Drives: Ivevane Automation',
        'Fabrication, Cybersecurity & Training: Ndebele Visionary Nexus',
        'Hotline: +263 77 000 0000 | Email: support@firefliesenergy.com',
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-stone-900 text-white shadow-2xl flex flex-col border-l border-stone-800">
          <div className="bg-[#0B0B0F] text-white p-6 border-b border-stone-800 flex items-center justify-between font-mono">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC72C] text-[#0B0B0F] flex items-center justify-center font-black">
                <BookOpen className="w-5 h-5 text-[#0B0B0F]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>QuarryIQ User Manual</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                    PHASE 1
                  </span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Executive guide for Davis Granite leadership
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0B0B0F] font-mono">
            <div className="p-4 rounded-xl bg-stone-900 border border-[#FFC72C]/40 text-xs text-stone-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#FFC72C] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#FFC72C]">Quick Guide:</strong> Click any section below to expand plain-English explanations for Phase 1 operations.
              </span>
            </div>

            <div className="space-y-3">
              {sections.map((section) => {
                const Icon = section.icon;
                const isOpenSection = openSections[section.id];

                return (
                  <div
                    key={section.id}
                    className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-800/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-stone-950 text-[#FFC72C] flex items-center justify-center shrink-0 border border-stone-800">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{section.title}</h4>
                          <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{section.summary}</p>
                        </div>
                      </div>

                      {isOpenSection ? (
                        <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>

                    {isOpenSection && (
                      <div className="p-4 pt-0 border-t border-stone-800 bg-stone-950 space-y-3 text-xs text-stone-300">
                        <ul className="space-y-2 pt-3 font-sans">
                          {section.content.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-[#0B0B0F] border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>Fireflies Energy (Pvt) Ltd</span>
            <span>Manual v1.0 &bull; Phase 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
