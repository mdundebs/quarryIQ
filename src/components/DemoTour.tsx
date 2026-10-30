import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  Eye,
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
    title: '1. CEO View Console',
    description: 'Executive overview tracking daily targets (4,000 t/day), live production rate (166 t/h goal), and plain-English operational alerts.',
    targetTab: 'dashboard',
    highlightArea: 'Top target cards, Risk vs Automation matrix, and Plant Master Control emergency stops.',
    badge: 'Executive Console',
  },
  {
    stepNumber: 2,
    title: '2. Risk vs. Automation Matrix',
    description: 'Directly addresses Transformer Overload (WEG Soft Starters), Belt Snapping (VSDs), Night Shift Spillage (ABB VSDs), and Revenue Leakage (AI Camera).',
    targetTab: 'dashboard',
    highlightArea: '4-row Risk vs Automation Table.',
    badge: 'Risk Mitigation',
  },
  {
    stepNumber: 3,
    title: '3. Phase 1 Investment Proposal',
    description: 'Itemized $102,200 commercial pricing table (VSDs, Soft Starters, Relays & Cabling, Installation, Edge PC & Camera) and $1,999/mo support retainer.',
    targetTab: 'pricing-roi',
    highlightArea: 'Commercial pricing table and 06:00 AM Shift Start sequence.',
    badge: 'Commercial Pitch',
  },
  {
    stepNumber: 4,
    title: '4. Throughput Test (1x Camera)',
    description: '1080p optical test feed at 19mm ST discharge cross-referencing BST100 belt scale drift to detect unbilled tonnage leaks (+4%).',
    targetTab: 'control-room',
    highlightArea: 'Zone 1 Camera Feed and Scale vs. AI Comparison Widget.',
    badge: 'Optical Scale Test',
  },
  {
    stepNumber: 5,
    title: '5. Electrical Health',
    description: 'Real-time telemetry for ABB VSD 1 (40Hz - 45°C), WEG Soft Starter (110A), Siemens PLC, BST100 Scale, MCC Incomer, and Energy Meters.',
    targetTab: 'maintenance',
    highlightArea: 'Phase 1 Electrical Assets Grid.',
    badge: 'Equipment Health',
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

  // 1. Switch parent tab safely when step changes
  useEffect(() => {
    if (!isActive || isPaused) return;

    const timeout = setTimeout(() => {
      onSwitchTab(currentStep.targetTab);
    }, 0);

    return () => clearTimeout(timeout);
  }, [isActive, isPaused, currentStepIndex, currentStep.targetTab, onSwitchTab]);

  // 2. Countdown timer loop
  useEffect(() => {
    if (!isActive || isPaused) return;

    setTimerSecondsRemaining(8);
    const interval = setInterval(() => {
      setTimerSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, currentStepIndex]);

  // 3. Advance step when countdown reaches 0
  useEffect(() => {
    if (!isActive || isPaused) return;

    if (timerSecondsRemaining <= 0) {
      if (currentStepIndex < TOUR_STEPS.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        onClose();
      }
    }
  }, [timerSecondsRemaining, isActive, isPaused, currentStepIndex, onClose]);

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end p-4 sm:p-6 lg:p-8 font-mono">
      <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#0B0B0F]/95 text-white px-4 py-2 rounded-full border border-[#FFC72C]/50 shadow-2xl pointer-events-auto flex items-center gap-3 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-[#FFC72C]">
          <span className="w-2 h-2 rounded-full bg-[#FFC72C] animate-ping"></span>
          Phase 1 Guided Demo Active
        </span>
        <span className="text-stone-600">|</span>
        <span className="text-stone-300 font-mono">
          Step {currentStep.stepNumber} of {TOUR_STEPS.length}
        </span>
      </div>

      <div className="max-w-xl w-full mx-auto sm:ml-auto sm:mr-0 pointer-events-auto bg-[#0B0B0F] text-white rounded-2xl p-6 border-2 border-[#FFC72C] shadow-2xl relative overflow-hidden animate-fadeIn">
        <div className="absolute top-0 left-0 right-0 h-1 bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-[#FFC72C] transition-all duration-1000 ease-linear"
            style={{ width: `${(timerSecondsRemaining / 8) * 100}%` }}
          />
        </div>

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
            >
              {isPaused ? <Play className="w-4 h-4 text-[#FFC72C]" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h4 className="text-base sm:text-lg font-black text-white">{currentStep.title}</h4>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed font-sans">{currentStep.description}</p>

        <div className="mt-3 p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-[#FFC72C] flex items-center gap-2 font-mono">
          <Eye className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{currentStep.highlightArea}</span>
        </div>

        <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  idx === currentStepIndex ? 'w-5 bg-[#FFC72C]' : 'bg-stone-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 py-1.5 text-xs text-stone-400 hover:text-white">
              Skip
            </button>
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 text-stone-200 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#FFC72C] text-[#0B0B0F] flex items-center gap-1.5"
            >
              <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
