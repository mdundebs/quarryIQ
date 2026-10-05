import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  CheckCircle2,
  HelpCircle,
  Eye,
  Sliders,
  Layers,
  Cpu,
  ShieldCheck,
  Truck,
  BarChart3
} from 'lucide-react';

export interface TourStep {
  stepNumber: number;
  title: string;
  description: string;
  targetTab: string;
  highlightArea: string;
  badge: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    title: '1. MD Executive Dashboard Overview',
    description: 'Welcome to your quarry control center. This screen consolidates Metso/Sandvik crushing PLC feeds, electrical grid draw, and daily quota tracking into one high-level cockpit.',
    targetTab: 'dashboard',
    highlightArea: 'Top shift status banner and executive daily production progress bar (91.5% of 5,300t quota).',
    badge: 'Executive Cockpit',
  },
  {
    stepNumber: 2,
    title: '2. Live Production & Energy KPIs',
    description: 'Instant rock throughput (435 t/h vs 400 t/h target), daily revenue run-rate ($86,450), and blended cost per ton ($3.94/t). Notice how numbers tick smoothly in real time.',
    targetTab: 'dashboard',
    highlightArea: 'Top 4 KPI cards and 24-hour continuous weightometer tonnage charts.',
    badge: 'Real-Time Telemetry',
  },
  {
    stepNumber: 3,
    title: '3. Continuous Stockyard Levels & Valuation',
    description: 'LiDAR-calibrated stock volumes for 19mm Aggregate, G1 Sub-Base, and Quarry Sand. Immediately flags over-accumulation and low-stock commercial bottlenecks.',
    targetTab: 'dashboard',
    highlightArea: 'Stockpile inventory grid showing live tonnage and $340,000+ total stockyard valuation.',
    badge: 'Inventory Health',
  },
  {
    stepNumber: 4,
    title: '4. What-If Business Scenario Simulator',
    description: 'Stress-test quarry profitability against 4-hour grid blackouts, sudden 50,000-tonne export orders, or jaw crusher bearing thermal anomalies in 2 seconds flat.',
    targetTab: 'what-if',
    highlightArea: 'Interactive scenario triggers with before/after metric deltas and net dollar impact.',
    badge: 'Executive Strategy',
  },
  {
    stepNumber: 5,
    title: '5. Control Room Dynamic Parametric Inputs',
    description: 'Management can enter actual plant numbers (Current TPH, operating hours, selling price, ZESA tariff) on the left to immediately inspect the financial and operational impact on the right.',
    targetTab: 'control-room',
    highlightArea: 'Left input panel with collapsible sections and real-time recalculation pulse.',
    badge: 'Management Modeler',
  },
  {
    stepNumber: 6,
    title: '6. AI Vision & Order Feasibility Forecasting',
    description: 'Automatic camera cross-check against belt scales (-0.3% delta) and instantaneous Order Feasibility checks giving you a clear YES/NO delivery verdict before signing contracts.',
    targetTab: 'control-room',
    highlightArea: 'Cards 2 and 4 showing delivery days needed and AI camera verification confidence (98.4%).',
    badge: 'AI Vision & Feasibility',
  },
  {
    stepNumber: 7,
    title: '7. Safety Officer & Optical Dust Opacity',
    description: 'Defend against Mines Act regulatory shutdowns with continuous PM10/PM2.5 optical dust meters, automated misting cannon triggers, and statutory environmental ledgers.',
    targetTab: 'safety',
    highlightArea: 'Radial dust opacity gauge (22.4 mg/m³ safe envelope) and 412 Days Incident-Free record.',
    badge: '100% Mines Act Defense',
  },
  {
    stepNumber: 8,
    title: '8. Unattended Automated Weighbridge (Phase 2)',
    description: 'Slash truck turnaround from 7 minutes down to 45 seconds. Driver-free ANPR plate reading, automated RFID scans, and axle-drift anti-theft tare auditing.',
    targetTab: 'weighbridge',
    highlightArea: 'Lane 1 ANPR camera capture, electronic ticket generation, and automated barrier release.',
    badge: 'Phase 2 Automation',
  },
];

interface DemoTourProps {
  isActive: boolean;
  onClose: () => void;
  onSwitchTab: (tabId: string) => void;
}

export const DemoTour: React.FC<DemoTourProps> = ({ isActive, onClose, onSwitchTab }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timerSecondsRemaining, setTimerSecondsRemaining] = useState<number>(8);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Auto-advance every 8 seconds
  useEffect(() => {
    if (!isActive || isPaused) return;

    // Switch tab on step change
    onSwitchTab(currentStep.targetTab);

    setTimerSecondsRemaining(8);
    const countdown = setInterval(() => {
      setTimerSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleNext();
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isActive, isPaused, currentStepIndex]);

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onClose(); // Tour complete
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end p-4 sm:p-6 lg:p-8">
      {/* Subtle top spotlight banner */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#0B0B0F]/90 backdrop-blur-md text-white px-4 py-2 rounded-full border border-[#FFC72C]/40 shadow-xl pointer-events-auto flex items-center gap-3 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-[#FFC72C]">
          <span className="w-2 h-2 rounded-full bg-[#FFC72C] animate-ping"></span>
          Guided Demo Mode Active
        </span>
        <span className="text-stone-400">|</span>
        <span className="text-stone-300 font-mono">
          Step {currentStep.stepNumber} of {TOUR_STEPS.length}
        </span>
        <span className="text-stone-400">|</span>
        <span className="text-stone-300 text-[11px] hidden sm:inline">
          Highlighting: <strong className="text-white">{currentStep.badge}</strong>
        </span>
      </div>

      {/* Floating Guided Tour Card at Bottom Right */}
      <div className="max-w-xl w-full mx-auto sm:ml-auto sm:mr-0 pointer-events-auto bg-[#0B0B0F] text-white rounded-2xl p-6 border-2 border-[#FFC72C] shadow-2xl relative overflow-hidden animate-fadeIn">
        {/* Progress Bar (8s countdown) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-[#FFC72C] transition-all duration-1000 ease-linear"
            style={{
              width: `${(timerSecondsRemaining / 8) * 100}%`,
            }}
          />
        </div>

        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F] uppercase tracking-wider">
              {currentStep.badge}
            </span>
            <span className="text-xs text-stone-400 font-mono">
              Auto-advancing in {timerSecondsRemaining}s
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title={isPaused ? 'Resume tour' : 'Pause tour'}
            >
              {isPaused ? <Play className="w-4 h-4 text-[#FFC72C]" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="Skip & Exit Demo Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <h4 className="text-base sm:text-lg font-black text-white">
          {currentStep.title}
        </h4>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
          {currentStep.description}
        </p>

        {/* Highlight Callout */}
        <div className="mt-3 p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-amber-200/90 flex items-center gap-2 font-mono">
          <Eye className="w-3.5 h-3.5 text-[#FFC72C] shrink-0" />
          <span className="line-clamp-1">{currentStep.highlightArea}</span>
        </div>

        {/* Navigation Actions */}
        <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  idx === currentStepIndex
                    ? 'w-5 bg-[#FFC72C]'
                    : idx < currentStepIndex
                    ? 'bg-emerald-400'
                    : 'bg-stone-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              Skip
            </button>

            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#FFC72C] text-[#0B0B0F] hover:bg-[#ffcf47] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
