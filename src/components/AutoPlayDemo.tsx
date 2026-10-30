import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  X,
  Sparkles,
  Award,
  ArrowRight,
  Zap,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface AutoPlayDemoProps {
  isActive: boolean;
  onExit: () => void;
  onEnterFullApp: () => void;
  onSwitchTab: (tabId: string) => void;
}

interface DemoScene {
  id: string;
  tab: string;
  durationSeconds: number;
  title: string;
  narration: string;
  keyHighlight: string;
}

const DEMO_SCENES: DemoScene[] = [
  {
    id: 'dashboard',
    tab: 'dashboard',
    durationSeconds: 10,
    title: 'Scene 1: CEO View Console',
    narration: 'Welcome to QuarryIQ Phase 1. Executive leadership tracks daily output (4,000 t/day target), live crushing rate (166 t/h goal), and plain-English operational alerts.',
    keyHighlight: 'Live 166 t/h throughput & Risk vs. Automation matrix.',
  },
  {
    id: 'pricing-roi',
    tab: 'pricing-roi',
    durationSeconds: 10,
    title: 'Scene 2: Phase 1 Investment Proposal',
    narration: 'Itemized $102,200 commercial setup including ABB VSDs, WEG Soft Starters, cabling, installation, and Edge PC + 1x Test Camera, plus $1,999/mo 12-month support.',
    keyHighlight: '$102,200 Turnkey Setup & $1,999/mo 12-Month Support.',
  },
  {
    id: 'control-room',
    tab: 'control-room',
    durationSeconds: 10,
    title: 'Scene 3: Throughput Test (1x Camera)',
    narration: 'Zone 1 1080p optical test camera at 19mm ST discharge cross-references BST100 belt scale drift to catch unbilled tonnage revenue leaks.',
    keyHighlight: 'Scale vs AI: BST100 (1,000 t/day) vs AI Calc (1,040 t/day) (+4% variance).',
  },
  {
    id: 'maintenance',
    tab: 'maintenance',
    durationSeconds: 10,
    title: 'Scene 4: Electrical Health Telemetry',
    narration: 'Continuous monitoring for newly installed ABB VSD 1 (40Hz - 45°C), WEG Soft Starter (110A), Siemens PLC, BST100 Scale, MCC Incomer, and Energy Meters.',
    keyHighlight: '6/6 Electrical Systems Operational & Protected.',
  },
];

export const AutoPlayDemo: React.FC<AutoPlayDemoProps> = ({
  isActive,
  onExit,
  onEnterFullApp,
  onSwitchTab,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(10);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const totalScenes = DEMO_SCENES.length;
  const currentScene = DEMO_SCENES[currentSceneIndex];

  // 1. Switch parent tab safely when scene changes
  useEffect(() => {
    if (!isActive || isPaused || isFinished) return;

    const timeout = setTimeout(() => {
      onSwitchTab(currentScene.tab);
    }, 0);

    return () => clearTimeout(timeout);
  }, [isActive, isPaused, isFinished, currentSceneIndex, currentScene.tab, onSwitchTab]);

  // 2. Scene countdown timer
  useEffect(() => {
    if (!isActive || isPaused || isFinished) return;

    setSecondsRemaining(currentScene.durationSeconds);
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, isFinished, currentSceneIndex, currentScene.durationSeconds]);

  // 3. Advance scene when countdown reaches 0
  useEffect(() => {
    if (!isActive || isPaused || isFinished) return;

    if (secondsRemaining <= 0) {
      if (currentSceneIndex < totalScenes - 1) {
        setCurrentSceneIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }
  }, [secondsRemaining, isActive, isPaused, isFinished, currentSceneIndex, totalScenes]);

  const handleNextScene = () => {
    if (currentSceneIndex < totalScenes - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setIsFinished(false);
    setCurrentSceneIndex(0);
    setIsPaused(false);
  };

  if (!isActive) return null;

  // Final Summary Modal
  if (isFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
        <div className="bg-[#0B0B0F] text-white rounded-3xl max-w-2xl w-full p-8 border-2 border-[#FFC72C] shadow-2xl relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC72C]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFC72C] text-[#0B0B0F] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#0B0B0F]" />
              Phase 1 Executive Presentation Complete
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Turnkey Phase 1 Setup: <span className="text-[#FFC72C]">$102,200</span>
            </h3>

            <div className="inline-block font-mono text-sm font-bold text-emerald-400 bg-emerald-950/60 px-4 py-1.5 rounded-xl border border-emerald-800">
              12-Month Support &amp; Training: $1,999 / month
            </div>

            <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed pt-2 font-sans">
              Phase 1 replaces obsolete switchgear with ABB VSDs, WEG Soft Starters, Siemens PLC, and 1x 1080p optical test camera to stabilize crushing throughput and eliminate spillage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-center">
              <Zap className="w-6 h-6 text-[#FFC72C] mx-auto mb-2" />
              <div className="text-xs text-stone-400">Electrical Stabilization</div>
              <div className="text-base font-black text-white font-mono mt-0.5">$98,400 Equipment &amp; Labor</div>
              <div className="text-[10px] text-stone-500 mt-1">Zero transformer trips</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-xs text-stone-400">Scale Verification</div>
              <div className="text-base font-black text-white font-mono mt-0.5">$3,800 Edge PC + Camera</div>
              <div className="text-[10px] text-stone-500 mt-1">Catches scale drift leaks</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Presentation</span>
            </button>

            <button
              onClick={onEnterFullApp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FFC72C] hover:bg-[#ffcf47] text-[#0B0B0F] font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FFC72C]/25 transition-all"
            >
              <span>Launch CEO View Console</span>
              <ArrowRight className="w-4 h-4 text-[#0B0B0F]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Presentation Mode Overlays
  const overallProgressPercent = Math.round(
    ((currentSceneIndex * 10 + (10 - secondsRemaining)) / (totalScenes * 10)) * 100
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-stone-900">
        <div
          className="h-full bg-[#FFC72C] transition-all duration-1000 ease-linear"
          style={{ width: `${overallProgressPercent}%` }}
        />
      </div>

      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#0B0B0F]/95 font-mono text-white px-5 py-2.5 rounded-full border border-stone-800 shadow-2xl flex items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[#FFC72C] font-bold">Auto-Play Demo</span>
          <span className="text-stone-500 font-mono">
            ({currentSceneIndex + 1}/{totalScenes})
          </span>
        </div>

        <div className="h-4 w-px bg-stone-800"></div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded-md text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-4 h-4 text-[#FFC72C]" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={handleNextScene}
            className="p-1 rounded-md text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={onExit}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-[92%] bg-[#0B0B0F]/95 font-mono text-white rounded-2xl p-5 border border-stone-800 shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-stone-800 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FFC72C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>🎙️ Executive Briefing &bull; {currentScene.title}</span>
          </div>
          <span className="text-[11px] font-mono text-stone-400">
            Next scene in {secondsRemaining}s
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
          "{currentScene.narration}"
        </p>

        <div className="mt-2.5 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400 font-mono">
          <span className="text-amber-300 truncate mr-2">
            Key Insight: {currentScene.keyHighlight}
          </span>
          <button
            onClick={onEnterFullApp}
            className="text-[#FFC72C] hover:underline whitespace-nowrap cursor-pointer font-bold"
          >
            Enter App &rarr;
          </button>
        </div>
      </div>
    </>
  );
};
