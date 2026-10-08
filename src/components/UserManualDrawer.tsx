import React, { useState } from 'react';
import {
  X,
  BookOpen,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Sliders,
  Cpu,
  FileText,
  Users,
  AlertCircle,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Camera,
  Layers,
  Zap,
  Truck,
  ShieldAlert,
  DollarSign,
  Sun
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
  mockupType: 'dashboard' | 'control' | 'whatif' | 'reports' | 'roles' | 'troubleshoot' | 'support' | 'gettingStarted';
}

export const UserManualDrawer: React.FC<UserManualDrawerProps> = ({ isOpen, onClose }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    gettingStarted: true,
    mdDashboard: false,
    controlRoom: false,
    whatIf: false,
    reports: false,
    roles: false,
    troubleshooting: false,
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
      summary: 'How to log in, navigate the quarry interface, and understand the core indicators.',
      content: [
        'Welcome to QuarryIQ. This system links your crushers, scales, and power sources into one live screen.',
        'The top navigation bar lets you jump between the 8 main operational areas at any time.',
        'Use the "Live Data" switch in the top bar to see numbers update in real time every 3 seconds as rock moves through the plant.',
        'You can return to the initial overview at any time by clicking the QuarryIQ logo in the top left.',
      ],
      mockupType: 'gettingStarted',
    },
    {
      id: 'mdDashboard',
      title: '2. MD Dashboard',
      icon: BarChart3,
      summary: 'Key figures for the Managing Director: hourly production, stock levels, and revenue run-rate.',
      content: [
        'Instant Throughput (TPH): Shows tonnes crushed per hour. A green number means the plant is beating the 400 t/h target.',
        'Daily Production: Displays total tonnes produced today against your daily 5,300 tonne quota.',
        'Stockpile Inventory: Visual bars showing how full each product pile is (19mm aggregate, G1 sub-base, sand, etc.) with current market dollar values.',
        'Power Mix Chart: Shows in gold how much free solar power is being used compared to grid electricity.',
      ],
      mockupType: 'dashboard',
    },
    {
      id: 'riskDashboard',
      title: '3. Risk Dashboard (Davis Granite Site Assessment)',
      icon: ShieldAlert,
      summary: 'Real-time telemetry across 8 critical electrical, environmental, and grid risk parameters.',
      content: [
        'Plant Risk Score: Live 0–100 composite index weighting Transformer Load, Power Factor, Motor Megger, MCC Room Temp & Humidity, Water Leak, Lightning, and Grid Stability.',
        'Transformer Load %: 100% warning, 110% critical threshold to prevent Buchholz relay trips on 1.5 MVA and 2.0 MVA units.',
        'Power Factor: Kept between 0.95 and 1.00 LAG to eliminate punitive ZESA maximum demand kVAR surcharges.',
        'Motor Insulation (Megger): Continuous dielectric monitoring with alarms below 1.0 MΩ preventing catastrophic stator flashovers.',
        'Risk Mitigation Calculator: Calculate exact annual cost savings prevented by automated predictive alarms ($X downtime cost × Y frequency × % prevented).',
        'SitePlan AI Assistant: One-click interactive engineering guidance trained on Davis Granite operational conditions.',
      ],
      mockupType: 'dashboard',
    },
    {
      id: 'pricingRoi',
      title: '4. Pricing & ROI Model (MD Justification)',
      icon: DollarSign,
      summary: 'Complete engineering cost breakdown, 3 commercial options, What-If payback sensitivity, and one-pager PDF generation.',
      content: [
        'Turnkey Cost Breakdown: Full $210,045 schedule (MCC System $87,550, Intelligence Layer $73,635, Commissioning $24,000, Contingency $24,860).',
        'Option Selector: Option A ($215k + $2.2k/mo), Option B ($235k + $2.5k/mo Recommended), Option C ($255k + $2.8k/mo).',
        'C-Suite Metrics: 3-Year Total Investment, Annual Delivered Value ($215,840/yr baseline), Capital Payback in months, and 5-Year ROI multiple.',
        'What-If Sensitivity Slider: Adjust delivered value between 40% and 120% to observe how payback dynamically shifts in real time.',
        'Comparison Bar Chart: Side-by-side visualization of 5-Year Capex+Opex vs. 5-Year Net Economic Benefit.',
        'Export ROI One-Pager: Generates executive board-ready PDF document branded with Fireflies Energy.',
      ],
      mockupType: 'control',
    },
    {
      id: 'solarSynergy',
      title: '5. Solar + Automation Synergy (Tender SPV/001/2026)',
      icon: Sun,
      summary: 'Demonstrates how automation amplifies the planned 1 MW solar tender, cutting payback from 3.7 to 1.2 years and capturing +$160,720/year.',
      content: [
        'Solar Without Automation (65% self-consumption): Shows losses from 0.85 credit discount on exported power, and 100% idle solar array during diesel load-shedding.',
        'Solar With Automation (90% self-consumption): Explains kinetic rock buffer shifting, peak shaving (25-40% ZESA drop), and safe solar-diesel synchronization.',
        'Synergy Value Schedule ($160,720/yr): Self-consumption uplift ($21,197), diesel fuel reduction ($84,863), carbon credits ($4,260), and green rock premium ($50,400).',
        'Tender SPV/001/2026 Alignment: Explains why QuarryIQ automation is 100% complementary to the 1 MW solar EPC tender, not competitive.',
        'Combined Capital Return: Shows how combined solar + automation capex pays back in 1.2 years instead of 3.7 years for solar alone.',
      ],
      mockupType: 'dashboard',
    },
    {
      id: 'controlRoom',
      title: '6. Control Room',
      icon: Sliders,
      summary: 'Management testing ground to enter real numbers and immediately see the financial impact.',
      content: [
        'Left Panel (Inputs): Type in your current TPH, shift hours, rock selling price, electricity tariff, and customer orders.',
        'Card 1 (Production Forecast): Automatically calculates daily and monthly tonnage against your quota with a clear green/red indicator.',
        'Card 2 (Order Feasibility): Tells you in plain words: YES or NO, can we deliver this customer order before the deadline?',
        'Card 3 (Energy Cost): Calculates your total electricity bill and cost per tonne.',
        'Card 5 (Power Cut Simulator): Tap to see how your plant behaves if the grid goes down.',
      ],
      mockupType: 'control',
    },
    {
      id: 'whatIf',
      title: '5. What-If Simulator',
      icon: Cpu,
      summary: 'One-click scenarios testing what happens during power cuts, huge orders, or equipment troubles.',
      content: [
        'Select any business disruption button (such as a 4-hour power cut or a sudden 50,000t export contract).',
        'The simulation runs for 2 seconds and reveals exact dollars saved or gained.',
        'Read the Managing Director takeaway box at the bottom for the commercial lesson of each scenario.',
      ],
      mockupType: 'whatif',
    },
    {
      id: 'reports',
      title: '6. Reports & WhatsApp Briefings',
      icon: FileText,
      summary: 'The 06:00 AM daily executive WhatsApp brief and downloadable board audits.',
      content: [
        'Inspect the phone screen preview showing the exact 06:00 AM WhatsApp text sent to the Managing Director.',
        'It lists night-shift output, stock balances, low-stock warnings, and required approvals.',
        'Click "Download" on any board report to receive official PDF, Excel, or CSV audit spreadsheets.',
      ],
      mockupType: 'reports',
    },
    {
      id: 'roles',
      title: '7. User Roles & Access',
      icon: Users,
      summary: 'Permissions for Managing Director, Quarry Manager, Weighbridge Operator, and Shift Foreman.',
      content: [
        'Managing Director (C-Suite): Full access to revenue, cost per tonne, WhatsApp briefs, and commercial order sign-offs.',
        'Quarry Manager: Full control of plant setpoints, maintenance swap staging, and crusher closed-side settings (CSS).',
        'Safety Officer: Dedicated views for dust opacity meters, blast safety checklists, and government compliance logs.',
        'Weighbridge Operator: Fast vehicle ticketing, ANPR plate review, and axle weight verification.',
      ],
      mockupType: 'roles',
    },
    {
      id: 'troubleshooting',
      title: '8. Troubleshooting & FAQs',
      icon: AlertCircle,
      summary: 'Quick answers for common sensor alerts and offline telemetry questions.',
      content: [
        'Why is a stockpile marked "Low"? The inventory level has dropped below 3 days of customer sales. Increase screening deck priority.',
        'What does "Axle Drift" mean on the weighbridge? A truck has uneven weight distribution across its rear axles, triggering an audit to protect road laws.',
        'Is internet required at the quarry? No. QuarryIQ runs on a local edge server on site. It keeps working even during telecoms blackouts.',
      ],
      mockupType: 'troubleshoot',
    },
    {
      id: 'support',
      title: '9. Contact Support & Engineering',
      icon: PhoneCall,
      summary: 'Direct lines to Fireflies Energy engineering and technical field support.',
      content: [
        'Provider: Fireflies Energy (Pvt) Ltd',
        'System: QuarryIQ Rock-to-Revenue Intelligence Suite v1.0',
        'Direct MD Support Hotline: +263 77 000 0000',
        'Email Support: support@firefliesenergy.com',
        'Dedicated On-Site Engineering: Harare & Bulawayo Quarry Response Teams',
      ],
      mockupType: 'support',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-In Drawer from Right */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Drawer Header */}
          <div className="bg-[#0B0B0F] text-white p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC72C] text-[#0B0B0F] flex items-center justify-center font-black">
                <BookOpen className="w-5 h-5 text-[#0B0B0F]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>QuarryIQ User Manual</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                    PLAIN ENGLISH
                  </span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Clear, executive explanations for Davis Granite leadership
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="Close User Manual"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFFDF7]">
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#B38300] shrink-0 mt-0.5" />
              <span>
                <strong>Quick Guide:</strong> Click any section below to expand plain-English instructions and interface mockups. No technical jargon.
              </span>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-3">
              {sections.map((section) => {
                const Icon = section.icon;
                const isOpenSection = openSections[section.id];

                return (
                  <div
                    key={section.id}
                    className="bg-white rounded-xl border border-stone-200/90 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-stone-900 text-[#FFC72C] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">
                            {section.title}
                          </h4>
                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {section.summary}
                          </p>
                        </div>
                      </div>

                      {isOpenSection ? (
                        <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>

                    {isOpenSection && (
                      <div className="p-4 pt-0 border-t border-stone-100 bg-[#FAF8F2]/40 space-y-3 text-xs text-stone-700">
                        {/* Bulleted Content */}
                        <ul className="space-y-2 pt-3">
                          {section.content.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Screenshot / Mockup Illustration Placeholder */}
                        <div className="mt-3 p-3 rounded-lg bg-stone-100 border border-stone-200 flex flex-col items-center justify-center text-center">
                          <div className="w-full bg-[#0B0B0F] text-white p-2.5 rounded-md text-[11px] font-mono flex items-center justify-between">
                            <span className="text-stone-400 uppercase text-[10px]">
                              SCREEN MOCKUP: {section.title}
                            </span>
                            <span className="text-[#FFC72C] font-bold">QuarryIQ UI</span>
                          </div>
                          <div className="py-4 text-stone-500 text-[11px] flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 mb-1">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-stone-700">
                              [UI Mockup: Interactive {section.title} Panel]
                            </span>
                            <span className="text-[10px] text-stone-400">
                              Shows automated sensors, live telemetry cards, and color-coded status badges
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Fireflies Energy (Pvt) Ltd</span>
            <span>Manual v1.0 &bull; Davis Granite</span>
          </div>
        </div>
      </div>
    </div>
  );
};
