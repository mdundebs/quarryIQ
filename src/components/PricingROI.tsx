import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Percent,
  Clock,
  CheckCircle2,
  Download,
  Star,
  ShieldAlert,
  Zap,
  Sparkles,
  Layers,
  ArrowRight,
  Calculator,
  ChevronRight,
  Info,
  Check,
  Building2,
  FileText,
  Sun,
  Fuel,
  Leaf,
  Award,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import {
  RoiDisclaimerBanner,
  RoiTooltipBadge,
  ROI_TOOLTIP_TEXT
} from './RoiDisclaimerBanner';

export interface CostItem {
  category: string;
  amount: number;
  description: string;
  vendorNotes: string;
}

export interface PricingOption {
  id: 'option-a' | 'option-b' | 'option-c';
  name: string;
  badge?: string;
  setupFee: number;
  monthlyFee: number;
  highlight?: boolean;
  tagline: string;
  features: string[];
}

export const PricingROI: React.FC = () => {
  // 1. Cost Breakdown Data
  const costBreakdown: CostItem[] = [
    {
      category: 'MCC System (ABB + WEG)',
      amount: 87550,
      description: 'Main Control Center retrofit, WEG soft-starters, ABB breakers, surge suppression, temperature/humidity sensors',
      vendorNotes: 'Tier-1 industrial equipment with dual-redundant busbars'
    },
    {
      category: 'Intelligence Layer',
      amount: 73635,
      description: 'Siemens S7-1500 PLC, Edge AI industrial unit, 3x optical sizing cameras, 4x belt scale integrators, cloud telemetry',
      vendorNotes: 'QuarryIQ real-time rock-to-revenue automation compute stack'
    },
    {
      category: 'Integration & Commissioning',
      amount: 24000,
      description: 'On-site engineering team, cable pulling, sensor mounting, calibration, SCADA integration & operator handover training',
      vendorNotes: 'Turnkey deployment across 21 site days'
    },
    {
      category: 'Contingency',
      amount: 24860,
      description: 'Site variables, armored cable rerouting, custom gantry adjustments & rapid spares buffer pool',
      vendorNotes: '13.4% engineering buffer allocated to eliminate project cost overruns'
    }
  ];

  const totalProjectCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0); // $210,045

  // 2. Pricing Models
  const pricingOptions: PricingOption[] = [
    {
      id: 'option-a',
      name: 'Option A: Capex Weighted',
      setupFee: 215000,
      monthlyFee: 2200,
      tagline: 'Lowest ongoing operating fee with upfront capital commitment',
      features: [
        'Complete MCC + Intelligence hardware installation',
        'Standard 48-hour response SLA',
        'Monthly remote health audits',
        'QuarryIQ Core SCADA license'
      ]
    },
    {
      id: 'option-b',
      name: 'Option B: Balanced Partnership',
      badge: 'RECOMMENDED',
      setupFee: 235000,
      monthlyFee: 2500,
      highlight: true,
      tagline: 'Optimized risk transfer with dedicated 24/7 engineering coverage',
      features: [
        'Complete Turnkey Implementation + Spare parts cache on-site',
        'Priority 4-hour on-call engineering dispatch',
        'Full AI Rock-to-Revenue Intelligence & WhatsApp Executive Summaries',
        'Continuous predictive motor insulation & power factor monitoring',
        'Quarterly on-site recalibration & statutory compliance reports'
      ]
    },
    {
      id: 'option-c',
      name: 'Option C: Enterprise Managed',
      setupFee: 255000,
      monthlyFee: 2800,
      tagline: 'All-inclusive comprehensive lifecycle management & full parts warranty',
      features: [
        'Zero-Capex replacement on wear-and-tear sensors & cameras',
        '1-hour SLA emergency engineering hot-line',
        'Dedicated Fireflies Energy automation lead assigned to Davis Granite',
        'Full solar microgrid integration expansion readiness guarantee',
        'Custom executive board-level carbon & efficiency quarterly pack'
      ]
    }
  ];

  // Selected Pricing Model State (Default: Option B)
  const [selectedOptionId, setSelectedOptionId] = useState<'option-a' | 'option-b' | 'option-c'>('option-b');

  // 4. What-If Value Slider (Default: 100%, Range 40% to 120%)
  const [valueFactorPercent, setValueFactorPercent] = useState<number>(100);

  // Annual Value Delivered breakdown baseline (100%)
  // Risk Prevention: ~$114,840 (calculated from Risk Dashboard downtime & damage prevention)
  // Energy Savings: ~$58,400 (Power factor optimization, avoiding peak tariffs, soft-start peak shaving)
  // Green & Yield Premium: ~$42,600 (High-spec road aggregate yield uplift + customer premium)
  const baselineValues = {
    riskPrevention: 114840,
    energySavings: 58400,
    yieldPremium: 42600,
  };
  const baselineAnnualTotal = baselineValues.riskPrevention + baselineValues.energySavings + baselineValues.yieldPremium; // $215,840 / year

  // Dynamic Annual Value scaled by What-If slider
  const dynamicAnnualValue = useMemo(() => {
    const factor = valueFactorPercent / 100;
    return {
      riskPrevention: Math.round(baselineValues.riskPrevention * factor),
      energySavings: Math.round(baselineValues.energySavings * factor),
      yieldPremium: Math.round(baselineValues.yieldPremium * factor),
      total: Math.round(baselineAnnualTotal * factor)
    };
  }, [valueFactorPercent, baselineAnnualTotal]);

  // Selected Option Object
  const selectedOption = useMemo(() => {
    return pricingOptions.find(o => o.id === selectedOptionId) || pricingOptions[1];
  }, [selectedOptionId]);

  // Calculations helper for any option
  const calculateMetrics = (option: PricingOption, annualVal: number) => {
    const threeYearInvestment = option.setupFee + (option.monthlyFee * 36);
    const fiveYearOpex = option.monthlyFee * 60;
    const fiveYearTotalInvestment = option.setupFee + fiveYearOpex;
    
    // Net annual benefit after monthly fee
    const netAnnualBenefit = annualVal - (option.monthlyFee * 12);
    
    // Payback period in months = SetupFee / (Net Monthly Benefit)
    // Monthly benefit = (annualVal / 12) - option.monthlyFee
    const netMonthlyBenefit = (annualVal / 12) - option.monthlyFee;
    const paybackMonths = netMonthlyBenefit > 0 
      ? Number((option.setupFee / netMonthlyBenefit).toFixed(1))
      : 999;
    
    // 5-Year Net Benefit = (5 * annualVal) - fiveYearTotalInvestment
    const fiveYearGrossValue = 5 * annualVal;
    const fiveYearNetBenefit = fiveYearGrossValue - fiveYearTotalInvestment;
    
    // 5-Year ROI Multiple = 5-Year Gross Value / 5-Year Total Investment
    const fiveYearRoiMultiple = fiveYearTotalInvestment > 0 
      ? Number((fiveYearGrossValue / fiveYearTotalInvestment).toFixed(2))
      : 0;

    return {
      threeYearInvestment,
      fiveYearTotalInvestment,
      netAnnualBenefit,
      paybackMonths,
      fiveYearNetBenefit,
      fiveYearRoiMultiple,
      fiveYearGrossValue
    };
  };

  const currentMetrics = useMemo(() => {
    return calculateMetrics(selectedOption, dynamicAnnualValue.total);
  }, [selectedOption, dynamicAnnualValue.total]);

  // Chart Data comparing Option A, B, C under current slider setting
  const comparisonChartData = useMemo(() => {
    return pricingOptions.map(opt => {
      const metrics = calculateMetrics(opt, dynamicAnnualValue.total);
      return {
        name: opt.name.split(':')[0],
        fullName: opt.name,
        isRecommended: opt.id === 'option-b',
        'Total Investment (5-Yr)': metrics.fiveYearTotalInvestment,
        'Estimated 5-Year Value': Math.max(0, metrics.fiveYearNetBenefit),
        'Estimated Payback (Months)': metrics.paybackMonths,
        'Estimated ROI Multiple': metrics.fiveYearRoiMultiple
      };
    });
  }, [dynamicAnnualValue.total]);

  // Qualitative & Transformation Value Matrix
  const qualitativeValueItems = [
    {
      category: 'Energy savings (ZESA)',
      type: 'Quantitative' as const,
      description: 'Measurable on utility bill via peak shaving, automated soft-start ramp, and APFC power factor >= 0.98'
    },
    {
      category: 'Diesel displacement',
      type: 'Quantitative' as const,
      description: 'Measurable on fuel logs through solar PV synchronization during ZETDC outages'
    },
    {
      category: 'Downtime avoidance',
      type: 'Semi-quantitative' as const,
      description: 'Based on industry benchmarks ($18,500/event avoided across motor megger, trench water, and thermal trips)'
    },
    {
      category: 'Risk mitigation',
      type: 'Qualitative' as const,
      description: 'Prevents catastrophic losses that haven\'t happened yet (transformer Buchholz explosion, stator flashover)'
    },
    {
      category: 'Compliance value',
      type: 'Qualitative' as const,
      description: 'Avoids statutory utility penalties, protects EMA environmental compliance and license to operate'
    },
    {
      category: 'Data-driven decisions',
      type: 'Qualitative' as const,
      description: 'Better planning, stockpiling, customer confidence, and verifiable yield logs for road contractors'
    },
    {
      category: '24-hour operations',
      type: 'Semi-quantitative' as const,
      description: 'Higher output with same labour force enabled by automated crusher choke-feeding and surge buffering'
    },
    {
      category: 'Green traceable premium',
      type: 'Semi-quantitative' as const,
      description: 'Requires buyer willingness to pay for low-carbon, verified clean crushed aggregate certifications'
    }
  ];

  // Export PDF Handler (creates clean print dialog optimized for print/save-as-PDF)
  const handleExportOnePager = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:p-0 print:space-y-4">
      {/* 1. DISCLAIMER BANNER: Amber warning border clarifying estimated transformation value */}
      <RoiDisclaimerBanner />

      {/* Printable Executive Cover Header */}
      <div className="bg-gradient-to-r from-[#0B0B0F] via-stone-900 to-[#1A1A22] border border-stone-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl print:border-none print:shadow-none print:p-4 print:text-black print:bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC72C]/10 rounded-full blur-3xl pointer-events-none print:hidden" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#FFC72C]/20 border border-[#FFC72C]/40 text-[#FFC72C] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 print:border-black print:text-black">
                <Building2 className="w-3.5 h-3.5" />
                Davis Granite &bull; Executive Capital Proposal
              </span>
              <span className="text-xs text-stone-400 font-mono print:text-stone-600">Document Ref: DG-ROI-2026-V2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight print:text-stone-900">
              Pricing Model &amp; Capital ROI Justification
            </h1>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl print:text-stone-700">
              Rigorous economic analysis comparing project engineering Capex of <span className="text-white font-bold print:text-black">$210,045</span> against estimated business transformation value, power optimization, and operational efficiency gains.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportOnePager}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFC72C] hover:bg-[#e6b325] text-[#0B0B0F] font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 print:hidden"
            >
              <Download className="w-4 h-4" />
              Export ROI One-Pager (PDF)
            </button>
            <div className="text-xs font-mono text-stone-400 print:block hidden">
              Prepared by: Fireflies Energy (Pvt) Ltd &bull; Confidential
            </div>
          </div>
        </div>
      </div>

      {/* 1. Project Cost Breakdown Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0B0B0F]" />
              <h2 className="text-xl font-bold text-stone-900">1. Project Engineering Cost Breakdown</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Exact engineering cost structure verified for the Davis Granite plant overhaul.
            </p>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Total Project Capex:</span>
            <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
              ${totalProjectCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Table of Breakdown items */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70 text-xs font-semibold text-stone-600 uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Cost Component</th>
                <th className="py-3 px-4">Scope &amp; Equipment Details</th>
                <th className="py-3 px-4 text-center">Engineering Buffer</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Allocated Cost (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {costBreakdown.map((item, idx) => {
                const percentOfTotal = ((item.amount / totalProjectCost) * 100).toFixed(1);
                return (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-4 px-4 font-semibold text-stone-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFC72C]" />
                        {item.category}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono pl-4.5">{percentOfTotal}% of total capex</div>
                    </td>
                    <td className="py-4 px-4 text-stone-600 max-w-md">
                      <div className="font-medium text-stone-800 text-xs sm:text-sm">{item.description}</div>
                      <div className="text-xs text-stone-500 italic mt-0.5">{item.vendorNotes}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Fixed Quote
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-stone-900 whitespace-nowrap text-base">
                      ${item.amount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-stone-300 bg-stone-100/70 font-bold text-stone-900">
                <td className="py-3.5 px-4 font-extrabold text-stone-900" colSpan={3}>
                  TOTAL TURNKEY ENGINEERING CAPEX
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-black text-lg text-stone-900">
                  ${totalProjectCost.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 2 & 3. Pricing Model Selector & Key Financial Metrics */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#0B0B0F]" />
              <h2 className="text-xl font-bold text-stone-900">2. Pricing Model Selector</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Select an engagement structure. Option B is recommended for Davis Granite to guarantee continuous telemetry and on-call response.
            </p>
          </div>
          <div className="text-xs text-stone-500 font-medium">
            Active Selection: <span className="font-bold text-stone-900">{selectedOption.name}</span>
          </div>
        </div>

        {/* Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {pricingOptions.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const metrics = calculateMetrics(opt, dynamicAnnualValue.total);

            return (
              <div
                key={opt.id}
                onClick={() => setSelectedOptionId(opt.id)}
                className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0B0B0F] bg-stone-50 shadow-md ring-2 ring-[#FFC72C]/40'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/40'
                }`}
              >
                {opt.badge && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#FFC72C] text-[#0B0B0F] font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {opt.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base text-stone-900">{opt.name}</h3>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-[#0B0B0F] border-[#0B0B0F] text-white' : 'border-stone-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 min-h-[32px]">{opt.tagline}</p>

                  {/* Price Tag */}
                  <div className="mt-4 p-4 rounded-xl bg-white border border-stone-200 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-medium text-stone-500">Setup Fee</span>
                      <span className="text-xl font-black font-mono text-stone-900">
                        ${opt.setupFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1 border-t border-stone-100">
                      <span className="text-xs font-medium text-stone-500">Monthly Retainer</span>
                      <span className="text-sm font-bold font-mono text-emerald-600">
                        +${opt.monthlyFee.toLocaleString()}/mo
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-4 space-y-2">
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Included Coverage</div>
                    {opt.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Quick Metrics */}
                <div className="mt-6 pt-4 border-t border-stone-200 space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>3-Yr Total Invest:</span>
                    <span className="font-bold text-stone-900">${metrics.threeYearInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span title={ROI_TOOLTIP_TEXT} className="cursor-help">Estimated Payback:</span>
                    <span className="font-bold text-emerald-700" title={ROI_TOOLTIP_TEXT}>{metrics.paybackMonths} months</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span title={ROI_TOOLTIP_TEXT} className="cursor-help">Estimated Return on Investment:</span>
                    <span className="font-bold text-[#0B0B0F]" title={ROI_TOOLTIP_TEXT}>{metrics.fiveYearRoiMultiple}x multiple</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Detailed Financial Metrics for Selected Option */}
        <div className="mt-8 pt-8 border-t border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFC72C]" />
              Executive Metrics for Selected {selectedOption.name}
            </h3>
            <span className="text-xs text-stone-500">
              Assumes current What-If sensitivity at <strong className="text-stone-900">{valueFactorPercent}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: 3-Year Total Investment */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                <span>3-Year Total Investment</span>
                <Clock className="w-3.5 h-3.5 text-stone-400" />
              </div>
              <div className="text-2xl font-black font-mono text-stone-900">
                ${currentMetrics.threeYearInvestment.toLocaleString()}
              </div>
              <div className="text-[11px] text-stone-500 mt-1">
                Setup (${selectedOption.setupFee.toLocaleString()}) + 36mo retainer (${(selectedOption.monthlyFee * 36).toLocaleString()})
              </div>
            </div>

            {/* Metric 2: Estimated Annual Business Value */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-between text-emerald-800 text-xs mb-1">
                <span className="font-semibold">
                  <RoiTooltipBadge text={ROI_TOOLTIP_TEXT}>
                    Estimated Annual Business Value
                  </RoiTooltipBadge>
                </span>
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-2xl font-black font-mono text-emerald-700" title={ROI_TOOLTIP_TEXT}>
                ${dynamicAnnualValue.total.toLocaleString()}
                <span className="text-xs text-emerald-600 font-normal ml-1">/yr</span>
              </div>
              <div className="text-[11px] text-emerald-700 mt-1">
                Risk defense + power shaving + yield uplift
              </div>
            </div>

            {/* Metric 3: Estimated Payback */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-between text-amber-800 text-xs mb-1">
                <span className="font-semibold">
                  <RoiTooltipBadge text={ROI_TOOLTIP_TEXT}>
                    Estimated Payback
                  </RoiTooltipBadge>
                </span>
                <Clock className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="text-2xl font-black font-mono text-amber-900" title={ROI_TOOLTIP_TEXT}>
                {currentMetrics.paybackMonths}
                <span className="text-xs text-amber-700 font-normal ml-1">months</span>
              </div>
              <div className="text-[11px] text-amber-700 mt-1">
                {(currentMetrics.paybackMonths / 12).toFixed(1)} years to fully recover capex
              </div>
            </div>

            {/* Metric 4: Estimated Return on Investment */}
            <div className="p-4 rounded-xl bg-[#0B0B0F] text-white border border-stone-800">
              <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                <span className="text-[#FFC72C] font-semibold">
                  <RoiTooltipBadge text={ROI_TOOLTIP_TEXT}>
                    Estimated Return on Investment
                  </RoiTooltipBadge>
                </span>
                <TrendingUp className="w-3.5 h-3.5 text-[#FFC72C]" />
              </div>
              <div className="text-2xl font-black font-mono text-white" title={ROI_TOOLTIP_TEXT}>
                {currentMetrics.fiveYearRoiMultiple}x
              </div>
              <div className="text-[11px] text-stone-300 mt-1">
                ${currentMetrics.fiveYearNetBenefit.toLocaleString()} Estimated 5-Year Value
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Qualitative Value Matrix */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#0B0B0F]" />
              <h2 className="text-xl font-bold text-stone-900">Qualitative &amp; Strategic Value Dimensions</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Distinguishing direct utility-measurable cash offsets from systemic risk protection and enterprise license safeguards.
            </p>
          </div>
          <div className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-mono border border-stone-200">
            Transformation Matrix &bull; 8 Pillars
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 text-xs uppercase tracking-wider bg-stone-50/80">
                <th className="py-3 px-4 font-semibold">Value Category</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {qualitativeValueItems.map((row, idx) => {
                const typeBadgeClass =
                  row.type === 'Quantitative'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : row.type === 'Semi-quantitative'
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : 'bg-purple-50 text-purple-800 border-purple-200';

                return (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-stone-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          row.type === 'Quantitative' ? 'bg-emerald-500' :
                          row.type === 'Semi-quantitative' ? 'bg-blue-500' : 'bg-purple-500'
                        }`} />
                        {row.category}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeBadgeClass}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {row.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Solar + Automation Combined Value Section (Tender SPV/001/2026) */}
      <div className="bg-white rounded-2xl border-2 border-stone-800 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-stone-900">
                4. Solar + Automation Combined Value (Tender SPV/001/2026)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              How QuarryIQ automation amplifies the planned <strong>solar installation (~220 kWp Bulawayo PoC + Harare expansion)</strong>, accelerating payback from <strong>3.7 years down to 1.2 years</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
              +$160,720 / yr Added Value
            </span>
          </div>
        </div>

        {/* Synergy Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Solar Alone */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-800 text-sm">Solar Without Automation (Standalone PV)</span>
              <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">3.7 Yr Payback</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
              <li><strong>Self-Consumption:</strong> 65% (35% mid-day solar dumped to grid)</li>
              <li><strong>Excess Exported:</strong> Discounted at 0.85 tariff credit vs retail</li>
              <li><strong>Outage Operation:</strong> Inverters trip offline; diesel consumed 100% at high cost</li>
              <li><strong>ZESA Bill:</strong> Baseline (unmanaged motor starting surges trip demand charges)</li>
            </ul>
          </div>

          {/* Solar + Automation */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm">Solar With Automation (QuarryIQ Hybrid)</span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">1.2 Yr Payback</span>
            </div>
            <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4">
              <li><strong>Self-Consumption:</strong> 90% (+25% gain via kinetic rock storage)</li>
              <li><strong>Excess Exported:</strong> Only true excess exported after crushing circuits satisfied</li>
              <li><strong>Outage Operation:</strong> Hybrid solar + grid + diesel microgrid sync saves diesel</li>
              <li><strong>ZESA Bill:</strong> Reduced by 25–40% via peak shaving and PF &ge; 0.98</li>
            </ul>
          </div>
        </div>

        {/* 4 Line Item Value Breakdown */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Self-Consumption Uplift</span>
            <span className="font-mono font-black text-stone-900 text-base mt-0.5 block">+$21,197/yr</span>
            <span className="text-[10px] text-stone-400">Shifted from export discount</span>
          </div>
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Diesel Fuel Reduction</span>
            <span className="font-mono font-black text-stone-900 text-base mt-0.5 block">+$84,863/yr</span>
            <span className="text-[10px] text-stone-400">Outage solar-diesel sync</span>
          </div>
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Carbon Credits Enabled</span>
            <span className="font-mono font-black text-stone-900 text-base mt-0.5 block">+$4,260/yr</span>
            <span className="text-[10px] text-stone-400">Audited I-REC telemetry</span>
          </div>
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Green Traceable Premium</span>
            <span className="font-mono font-black text-stone-900 text-base mt-0.5 block">+$50,400/yr</span>
            <span className="text-[10px] text-stone-400">Low-carbon aggregate premium</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs">
            <span className="text-[#FFC72C] font-bold block uppercase text-[11px]">
              Tender SPV/001/2026 Strategic Alignment &bull; Multi-Site Rollout
            </span>
            <p className="text-stone-300 mt-0.5">
              Automation is <strong>COMPLEMENTARY</strong> to the solar tender, not competitive. Phase 1 proves ~220 kWp at Bulawayo (CAPEX ~$88k), unlocking streamlined scale across Harare (~250–350 kWp) and Marondera.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-stone-400 block">Total Added to Solar Capex:</span>
            <span className="text-xl font-black font-mono text-[#FFC72C]">+$160,720 / year</span>
          </div>
        </div>
      </div>

      {/* 5. "What-If" Sensitivity Slider Section */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-stone-900">5. What-If Value Stress-Test</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              "If the annual value drops by X%, what happens to payback?" Test conservatism down to 40% value realization.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setValueFactorPercent(100)}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
            >
              Reset to 100%
            </button>
            <button
              onClick={() => setValueFactorPercent(70)}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 transition-colors"
            >
              Stress 70%
            </button>
            <button
              onClick={() => setValueFactorPercent(50)}
              className="text-xs font-semibold text-rose-700 hover:text-rose-800 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 transition-colors"
            >
              Severe 50%
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Slider input */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="value-slider" className="text-sm font-bold text-stone-800 flex items-center gap-2">
                Annual Delivered Value Realization Factor:
              </label>
              <span className={`text-2xl font-black font-mono px-3 py-1 rounded-lg ${
                valueFactorPercent >= 100 ? 'bg-emerald-100 text-emerald-800' :
                valueFactorPercent >= 75 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {valueFactorPercent}%
              </span>
            </div>

            <div className="relative pt-1">
              <input
                id="value-slider"
                type="range"
                min="40"
                max="120"
                step="5"
                value={valueFactorPercent}
                onChange={(e) => setValueFactorPercent(Number(e.target.value))}
                className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0B0B0F]"
              />
              <div className="flex justify-between text-xs text-stone-400 font-mono mt-2">
                <span>40% (Ultra-Conservative)</span>
                <span className="font-bold text-stone-700">100% (Baseline Expectation)</span>
                <span>120% (Optimistic Uplift)</span>
              </div>
            </div>

            {/* Breakdown of this dynamic annual value */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 mt-4 space-y-2 text-xs">
              <div className="font-semibold text-stone-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <RoiTooltipBadge text={ROI_TOOLTIP_TEXT}>
                    Estimated Annual Business Value at {valueFactorPercent}%:
                  </RoiTooltipBadge>
                </span>
                <span className="text-base font-black font-mono text-stone-900" title={ROI_TOOLTIP_TEXT}>
                  ${dynamicAnnualValue.total.toLocaleString()}/yr
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-stone-600">
                <div>
                  <span className="text-stone-400 block text-[10px]">Risk Prevention</span>
                  <span className="font-mono font-bold text-stone-800">${dynamicAnnualValue.riskPrevention.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Energy &amp; Peak Tariff</span>
                  <span className="font-mono font-bold text-stone-800">${dynamicAnnualValue.energySavings.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Product Yield Uplift</span>
                  <span className="font-mono font-bold text-stone-800">${dynamicAnnualValue.yieldPremium.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Payback Response Callout */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-[#0B0B0F] text-white p-6 rounded-2xl shadow-lg border border-stone-800">
            <div className="text-xs uppercase tracking-wider text-[#FFC72C] font-bold mb-1">
              Real-Time Sensitivity Impact
            </div>
            <div className="text-xl font-bold flex items-center gap-2">
              <RoiTooltipBadge text={ROI_TOOLTIP_TEXT}>
                Estimated Payback at {valueFactorPercent}% Value:
              </RoiTooltipBadge>
            </div>
            
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold font-mono text-white" title={ROI_TOOLTIP_TEXT}>
                {currentMetrics.paybackMonths}
              </span>
              <span className="text-stone-400 font-medium">months</span>
              <span className="text-stone-400 text-sm">
                ({(currentMetrics.paybackMonths / 12).toFixed(1)} years)
              </span>
            </div>

            <div className="mt-4 text-xs text-stone-300 leading-relaxed border-t border-stone-800 pt-3">
              {valueFactorPercent < 80 ? (
                <p>
                  <strong className="text-amber-400">Robust Downside Defense:</strong> Even with a severe {100 - valueFactorPercent}% reduction in expected operational savings, the capital investment pays for itself in less than {Math.ceil(currentMetrics.paybackMonths)} months.
                </p>
              ) : (
                <p>
                  <strong className="text-emerald-400">Exceptional Capital Efficiency:</strong> The system repays its entire turnkey setup in just {currentMetrics.paybackMonths} months, delivering strong cash flow accretion for Davis Granite across years 2 through 5.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Pricing Models Comparison Chart */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-stone-900">6. Multi-Option Comparison Chart</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Side-by-side comparison of 5-Year Total Investment vs. 5-Year Net Economic Benefit delivered.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-[#FFC72C] text-[#FFC72C]" />
            Recommended: Option B (Optimal Risk-Adjusted ROI)
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#44403c', fontSize: 13, fontWeight: 600 }} />
              <YAxis
                tick={{ fill: '#78716c', fontSize: 11 }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                contentStyle={{
                  backgroundColor: '#0B0B0F',
                  borderColor: '#292524',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: '16px', fontSize: '12px' }}
              />
              <Bar dataKey="Total Investment (5-Yr)" fill="#78716c" radius={[6, 6, 0, 0]} name="5-Year Total Investment ($)" />
              <Bar dataKey="Estimated 5-Year Value" fill="#10b981" radius={[6, 6, 0, 0]} name="Estimated 5-Year Value ($)">
                {comparisonChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isRecommended ? '#059669' : '#10b981'}
                    stroke={entry.isRecommended ? '#FFC72C' : undefined}
                    strokeWidth={entry.isRecommended ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-stone-200">
          {pricingOptions.map(opt => {
            const metrics = calculateMetrics(opt, dynamicAnnualValue.total);
            const isRec = opt.id === 'option-b';
            return (
              <div
                key={opt.id}
                className={`p-4 rounded-xl border ${
                  isRec ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-300' : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-stone-900 text-sm">{opt.name.split(':')[0]}</span>
                  {isRec && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span title={ROI_TOOLTIP_TEXT} className="cursor-help">Estimated 5-Year Value:</span>
                    <span className="font-bold text-emerald-700" title={ROI_TOOLTIP_TEXT}>${metrics.fiveYearNetBenefit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span title={ROI_TOOLTIP_TEXT} className="cursor-help">Estimated Payback:</span>
                    <span className="font-bold text-stone-900" title={ROI_TOOLTIP_TEXT}>{metrics.paybackMonths} mo</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span title={ROI_TOOLTIP_TEXT} className="cursor-help">Estimated ROI:</span>
                    <span className="font-bold text-stone-900" title={ROI_TOOLTIP_TEXT}>{metrics.fiveYearRoiMultiple}x</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Document for Managing Director Justification (Printable One-Pager Preview) */}
      <div className="bg-stone-900 text-white rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:bg-white print:text-black">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 print:border-stone-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC72C] flex items-center justify-center font-black text-[#0B0B0F] text-lg">
              F
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-[#FFC72C] print:text-stone-800">
                Fireflies Energy &bull; Executive Memorandum
              </div>
              <h3 className="text-lg font-bold text-white print:text-stone-900">
                Price Justification Brief for Davis Granite Managing Director
              </h3>
            </div>
          </div>
          <button
            onClick={handleExportOnePager}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition-colors print:hidden"
          >
            <Download className="w-4 h-4 text-[#FFC72C]" />
            Print / Save PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-bold text-[#FFC72C] uppercase tracking-wider text-xs print:text-stone-900">
              Why the $210,045 Capex is Defensible
            </h4>
            <p className="text-stone-300 print:text-stone-700 leading-relaxed text-xs sm:text-sm">
              Davis Granite operates high-capacity crushing infrastructure where a single unplanned electrical or mechanical failure costs an average of <strong>$15,000–$25,000</strong> per incident. The project investment replaces obsolete, unmonitored switchgear with high-integrity ABB/WEG protection and installs an edge AI supervisory layer that eliminates unmonitored failure modes.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-300 print:text-stone-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FFC72C] shrink-0 print:text-black" />
                <span><strong>No Hidden Extra Costs:</strong> Fixed $24,860 contingency buffer absorbed inside turn-key cost.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FFC72C] shrink-0 print:text-black" />
                <span><strong>ZESA Penalty Elimination:</strong> Power factor brought to &ge;0.97 saves immediate monthly surcharge fees.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FFC72C] shrink-0 print:text-black" />
                <span><strong>Rapid Payback:</strong> Option B achieves full capital breakeven in <strong>{currentMetrics.paybackMonths} months</strong>.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-black/40 border border-stone-800 space-y-4 print:bg-stone-50 print:border-stone-200">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs print:text-stone-900">
              Recommendation for Davis Granite Board
            </h4>
            <p className="text-stone-300 print:text-stone-700 text-xs leading-relaxed">
              We recommend approving <strong>Option B ($235,000 Setup + $2,500/month)</strong>. This structure transfers performance risk to Fireflies Energy while providing the engineering team with 24/7 telemetry, continuous insulation diagnostics, and priority dispatch.
            </p>
            <div className="pt-2 border-t border-stone-800 print:border-stone-200 flex items-center justify-between font-mono text-xs">
              <span className="text-stone-400 print:text-stone-600">5-Year Cumulative Net Profit:</span>
              <span className="font-bold text-emerald-400 print:text-emerald-700 text-sm">
                +${currentMetrics.fiveYearNetBenefit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Section 4 in Export PDF / Executive Brief: Solar + Automation Combined Value */}
        <div className="pt-5 mt-5 border-t border-stone-800 print:border-stone-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#FFC72C] print:text-amber-600" />
              <h4 className="font-bold text-white print:text-stone-900 text-xs sm:text-sm uppercase tracking-wide">
                Section 4: Solar + Automation Combined Value (Bulawayo 220 kW Reference)
              </h4>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 print:text-emerald-700">
              ~$150,000 / yr Combined Value
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 print:bg-stone-100/70 print:border-stone-300 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-stone-400 print:text-stone-600 block text-[11px] font-mono">Bulawayo Phase 1 Solar Standalone</span>
              <span className="text-amber-400 print:text-amber-700 font-bold block mt-0.5">~3.0 Years Payback</span>
              <span className="text-stone-400 print:text-stone-600 text-[11px] block mt-1">
                $88,000 CAPEX &bull; ~$29,000 annual solar value &bull; 65% self-consumption
              </span>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-stone-800 print:border-stone-300 md:pl-4">
              <span className="text-[#FFC72C] print:text-amber-700 block text-[11px] font-mono">Combined Solar + Automation</span>
              <span className="text-emerald-400 print:text-emerald-700 font-black text-sm block mt-0.5">~2.2 Years Payback</span>
              <span className="text-stone-400 print:text-stone-600 text-[11px] block mt-1">
                $323,000 Total Investment ($88k + $235k) &bull; 90% direct solar use &bull; ~$150,000/yr value
              </span>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-stone-800 print:border-stone-300 md:pl-4 font-mono">
              <span className="text-stone-400 print:text-stone-600 block text-[11px] font-sans">Synergy Breakdown (220 kWp / 411 MWh)</span>
              <div className="mt-1 space-y-0.5 text-[11px] text-stone-300 print:text-stone-700">
                <div className="flex justify-between"><span>Extra Direct Solar Use:</span><span className="text-emerald-400 print:text-emerald-700 font-bold">+$14,640/yr</span></div>
                <div className="flex justify-between"><span>Diesel Displacement:</span><span className="text-emerald-400 print:text-emerald-700 font-bold">$25k&ndash;$40k/yr</span></div>
                <div className="flex justify-between"><span>Carbon Credits (329 tCO₂):</span><span className="text-emerald-400 print:text-emerald-700 font-bold">$4,935&ndash;$9,870/yr</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
