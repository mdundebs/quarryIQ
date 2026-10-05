import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  X,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Zap,
  ShieldCheck,
  Truck,
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
    title: 'Scene 1: Real-Time Executive SCADA Cockpit',
    narration: 'Welcome to QuarryIQ. Here, Davis Granite executive leadership monitors instant primary jaw throughput (435 t/h), shift quota progression (91.5%), and live stockyard valuations without waiting for end-of-month manual surveys.',
    keyHighlight: 'Instant 435 t/h throughput & live $340k+ stockyard inventory valuation.',
  },
  {
    id: 'control-room',
    tab: 'control-room',
    durationSeconds: 10,
    title: 'Scene 2: Management Control Room & Order Feasibility',
    narration: 'In the Control Room, management can adjust real operating hours, selling prices, and ZESA tariffs. The engine instantly computes whether a rush 2,000 m² customer order can be delivered before the deadline.',
    keyHighlight: 'Instant feasibility verdict: YES/NO with delivery date calculations.',
  },
  {
    id: 'what-if',
    tab: 'what-if',
    durationSeconds: 10,
    title: 'Scene 3: Stress-Testing Operational Disruptions',
    narration: 'What happens when a 4-hour grid blackout hits at 11:30 AM? The simulator proves how automated microgrid islanding redirects solar power to secondary screens, preserving $38,700 in lost production.',
    keyHighlight: 'Catastrophic downtime averted with automated load shedding.',
  },
  {
    id: 'solar',
    tab: 'solar',
    durationSeconds: 10,
    title: 'Scene 4: The Virtual Battery & ZETDC Grid Arbitrage',
    narration: 'Why purchase a multi-million-dollar chemical battery? QuarryIQ surges primary crushing during free daylight hours to store energy as broken rock in a surge stockpile, offsetting night-time utility tariffs.',
    keyHighlight: '+25% Solar self-consumption value using the ZETDC grid as a free battery.',
  },
  {
    id: 'weighbridge',
    tab: 'weighbridge',
    durationSeconds: 10,
    title: 'Scene 5: Phase 2 Unattended Automated Weighbridge',
    narration: 'Driver-free ANPR license plate recognition, automated RFID driver scanning, and optical cameras drop truck turnaround from 7 minutes to 45 seconds while eliminating weight tampering collusion.',
    keyHighlight: '45-second hauler turnaround with automated digital weigh tickets.',
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

  // Auto-advancing loop
  useEffect(() => {
    if (!isActive || isPaused || isFinished) return;

    onSwitchTab(currentScene.tab);
    setSecondsRemaining(currentScene.durationSeconds);

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleNextScene();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isPaused, currentSceneIndex, isFinished]);

  const handleNextScene = () => {
    if (currentSceneIndex < totalScenes - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      setIsFinished(true); // Show final summary
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
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#0B0B0F] text-white rounded-3xl max-w-2xl w-full p-8 border-2 border-[#FFC72C] shadow-2xl relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC72C]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFC72C] text-[#0B0B0F] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#0B0B0F]" />
              Executive Demo Complete
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Total Annual Value: <span className="text-[#FFC72C]">$388K+</span>
            </h3>

            <div className="inline-block font-mono text-lg font-bold text-emerald-400 bg-emerald-950/60 px-4 py-1.5 rounded-xl border border-emerald-800">
              Payback: &lt; 6 months
            </div>

            <p className="text-stone-300 text-sm max-w-lg mx-auto leading-relaxed pt-2">
              Based on Davis Granite production benchmarks: combining continuous SCADA choke-feeding, 
              ZETDC solar peak arbitrage, predictive bearing protection, and automated dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-center">
              <Zap className="w-6 h-6 text-[#FFC72C] mx-auto mb-2" />
              <div className="text-xs text-stone-400">Virtual Battery</div>
              <div className="text-lg font-black text-white font-mono mt-0.5">$142,000 / yr</div>
              <div className="text-[10px] text-stone-500 mt-1">Tariff peak savings</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-xs text-stone-400">Crusher Uptime</div>
              <div className="text-lg font-black text-white font-mono mt-0.5">$182,600 / yr</div>
              <div className="text-[10px] text-stone-500 mt-1">Bearing seizure averted</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-center">
              <Truck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xs text-stone-400">Weighbridge Speed</div>
              <div className="text-lg font-black text-white font-mono mt-0.5">$64,000 / yr</div>
              <div className="text-[10px] text-stone-500 mt-1">Collusion &amp; queues cut</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Demo</span>
            </button>

            <button
              onClick={onEnterFullApp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FFC72C] hover:bg-[#ffcf47] text-[#0B0B0F] font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FFC72C]/25 transition-all"
            >
              <span>Enter Full App</span>
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
      {/* Top Fixed Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-stone-900">
        <div
          className="h-full bg-gradient-to-r from-[#FFC72C] via-amber-400 to-[#FFC72C] transition-all duration-1000 ease-linear"
          style={{ width: `${overallProgressPercent}%` }}
        />
      </div>

      {/* Top Floating Control Bar */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#0B0B0F]/95 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-stone-800 shadow-2xl flex items-center gap-4 text-xs font-semibold">
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
            title={isPaused ? 'Resume Presentation' : 'Pause Presentation'}
          >
            {isPaused ? <Play className="w-4 h-4 text-[#FFC72C]" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={handleNextScene}
            className="p-1 rounded-md text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title="Skip to Next Scene"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={onExit}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title="Exit Demo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Floating Executive Narration Subtitle Overlay */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-[92%] bg-[#0B0B0F]/95 backdrop-blur-md text-white rounded-2xl p-5 border border-stone-700 shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-stone-800 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FFC72C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>🎙️ Executive Narration &bull; {currentScene.title}</span>
          </div>
          <span className="text-[11px] font-mono text-stone-400">
            Next scene in {secondsRemaining}s
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
          "{currentScene.narration}"
        </p>

        <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400 font-mono">
          <span className="text-amber-300 truncate mr-2">
            Key Insight: {currentScene.keyHighlight}
          </span>
          <button
            onClick={onEnterFullApp}
            className="text-[#FFC72C] hover:underline whitespace-nowrap cursor-pointer font-bold"
          >
            Skip to Full App &rarr;
          </button>
        </div>
      </div>
    </>
  );
};
