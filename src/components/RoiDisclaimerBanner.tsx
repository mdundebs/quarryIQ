import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface RoiDisclaimerBannerProps {
  className?: string;
  variant?: 'banner' | 'compact';
}

export const RoiDisclaimerBanner: React.FC<RoiDisclaimerBannerProps> = ({
  className = '',
  variant = 'banner'
}) => {
  return (
    <div
      className={`rounded-xl border-2 border-amber-400/90 bg-amber-50/90 p-4 sm:p-5 shadow-sm text-amber-950 transition-all ${className}`}
      role="note"
      aria-label="Important Note on ROI"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-400/30 border border-amber-500/40 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-800 stroke-[2.5]" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wide text-xs text-amber-900 font-mono">
              Important Note on ROI
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-semibold border border-amber-300">
              Estimated Transformation Model
            </span>
          </div>
          <p className="text-amber-900/90 leading-relaxed text-xs sm:text-sm font-medium">
            The financial projections shown are approximations based on industry benchmarks, current tariff rates, and estimated business efficiencies. They represent the potential value of automation and solar integration through operational improvements &mdash; reduced downtime, energy savings, higher yield, and business efficiency gains. Actual results will vary based on site conditions, market rates, and operational performance. These are not guaranteed cash returns but rather the estimated value of business transformation that automation unlocks.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ROI_TOOLTIP_TEXT =
  'Estimate based on industry benchmarks. Actual results may vary.';

export interface RoiTooltipProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

export const RoiTooltipBadge: React.FC<RoiTooltipProps> = ({
  children,
  text = ROI_TOOLTIP_TEXT,
  className = ''
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 group relative cursor-help ${className}`}
      title={text}
    >
      {children}
      <span className="inline-flex items-center justify-center text-stone-400 hover:text-amber-600 transition-colors">
        <Info className="w-3.5 h-3.5 inline" />
      </span>
      {/* Hover tooltip for desktop */}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-50 w-56 rounded-lg bg-stone-900 text-stone-100 text-[11px] font-normal font-sans p-2 shadow-xl border border-stone-700 text-center leading-snug">
        {text}
      </span>
    </span>
  );
};
