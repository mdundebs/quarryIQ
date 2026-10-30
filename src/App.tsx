/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Wrench,
  Camera,
  DollarSign,
  Clock,
  Menu,
  X,
  Home,
  ChevronRight,
  Share2,
  Check,
  HelpCircle,
  Zap,
  Terminal,
  Layers
} from 'lucide-react';

import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ControlRoom } from './components/ControlRoom';
import { Maintenance } from './components/Maintenance';
import { PricingROI } from './components/PricingROI';
import { SystemCommand } from './components/SystemCommand';
import { TeamExperience } from './components/TeamExperience';
import { SystemDesign } from './components/SystemDesign';
import { DemoTour } from './components/DemoTour';
import { UserManualDrawer } from './components/UserManualDrawer';
import { AutoPlayDemo } from './components/AutoPlayDemo';

type TabId =
  | 'landing'
  | 'dashboard'
  | 'pricing-roi'
  | 'control-room'
  | 'maintenance'
  | 'system-command'
  | 'team-experience'
  | 'system-design';

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

// 7 Main Tabs in exact order
const TABS: TabItem[] = [
  { id: 'dashboard', label: 'CEO View', icon: BarChart3, badge: 'Overview' },
  { id: 'pricing-roi', label: 'Phase 1 Investment', icon: DollarSign, badge: 'Proposal' },
  { id: 'control-room', label: 'Throughput Test', icon: Camera, badge: '1 Camera Feed' },
  { id: 'maintenance', label: 'Electrical Health', icon: Wrench, badge: 'Equipment' },
  { id: 'system-command', label: 'System & Command', icon: Terminal, badge: 'Interactive' },
  { id: 'system-design', label: 'System Design', icon: Layers, badge: 'SCADA Visual' },
  { id: 'team-experience', label: 'Team & Experience', icon: Zap, badge: 'Partners' },
];

export default function App() {
  const [currentView, setCurrentView] = useState<TabId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [liveDataEnabled, setLiveDataEnabled] = useState<boolean>(true);
  const [demoModeActive, setDemoModeActive] = useState<boolean>(true);
  const [userManualOpen, setUserManualOpen] = useState<boolean>(false);
  const [autoPlayDemoActive, setAutoPlayDemoActive] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      }).catch(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      });
    } else {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    }
  };

  // Live clock updating every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEnterDashboard = (targetTab: string = 'dashboard') => {
    setCurrentView(targetTab as TabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === 'stabilization' || tabId === 'risk-dashboard') {
      setCurrentView('dashboard');
    } else if (
      tabId === 'pricing-roi' ||
      tabId === 'control-room' ||
      tabId === 'maintenance' ||
      tabId === 'system-command' ||
      tabId === 'team-experience' ||
      tabId === 'system-design'
    ) {
      setCurrentView(tabId as TabId);
    } else {
      setCurrentView('dashboard');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#FFC72C] selection:text-[#0B0B0F] bg-[#0B0B0F] text-[#E2E8F0]">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0B0B0F] border-b border-stone-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCurrentView('landing')}
                className="flex items-center gap-3 group text-left cursor-pointer focus:outline-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFC72C] to-[#b38300] flex items-center justify-center font-black text-[#0B0B0F] text-lg shadow-md group-hover:scale-105 transition-transform">
                  Q
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-lg tracking-tight text-white group-hover:text-[#FFC72C] transition-colors">
                      Quarry<span className="text-[#FFC72C]">IQ</span>
                      <span className="text-xs font-normal text-stone-400 ml-1.5 hidden sm:inline">| SitePilot AI</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                      PHASE 1
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-medium">
                    Electrical Stabilization &amp; Optical Sizing Pilot
                  </div>
                </div>
              </button>

              {/* Pitch View switcher */}
              {currentView !== 'landing' && (
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hidden xl:inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white px-2.5 py-1 rounded-md border border-stone-800 hover:border-stone-700 transition-all cursor-pointer font-mono"
                >
                  <Home className="w-3.5 h-3.5 text-[#FFC72C]" />
                  <span>Executive Brief</span>
                </button>
              )}
            </div>

            {/* Desktop Navigation Tabs */}
            {currentView !== 'landing' && (
              <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-stone-800 text-[#FFC72C] font-bold shadow-inner'
                          : 'text-stone-300 hover:text-white hover:bg-stone-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFC72C]' : 'text-stone-400'}`} />
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded leading-none ${
                            isActive
                              ? 'bg-[#FFC72C] text-[#0B0B0F]'
                              : 'bg-stone-800 text-stone-400 border border-stone-700'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FFC72C] rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Right Side: Quick Controls & Clock */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User Manual Button */}
              <button
                onClick={() => setUserManualOpen(true)}
                className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-stone-600 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
                title="Open Plain-English User Manual"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span className="hidden sm:inline">Manual</span>
              </button>

              {/* Share Demo Link Button */}
              <button
                onClick={handleShare}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs border ${
                  shareCopied
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-200 hover:text-white'
                }`}
                title="Copy shareable link"
              >
                {shareCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span className="hidden sm:inline font-mono">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#FFC72C]" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>

              {/* Live Clock */}
              <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-2.5 py-1.5 rounded-lg font-mono text-xs text-stone-200">
                <Clock className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span className="font-bold">{currentTime || '00:00:00'}</span>
              </div>

              {/* Enter Demo Button if on Landing */}
              {currentView === 'landing' ? (
                <button
                  onClick={() => handleEnterDashboard('dashboard')}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFC72C] text-[#0B0B0F] font-bold text-xs hover:bg-[#ffcf47] transition-all cursor-pointer shadow-xs"
                >
                  <span>Launch CEO View</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0B0B0F]" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#FFC72C]" />
                  <span>Executive Brief</span>
                </button>
              )}

              {/* Mobile Hamburger Menu Toggle */}
              {currentView !== 'landing' && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-hidden cursor-pointer"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && currentView !== 'landing' && (
          <div className="lg:hidden bg-[#0B0B0F] border-b border-stone-800 px-4 pt-2 pb-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFC72C] px-3 py-1 font-mono">
              Main Operations Navigation
            </div>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-stone-800 text-[#FFC72C] font-bold'
                      : 'text-stone-300 hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFC72C]' : 'text-stone-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#0B0B0F]">
        {currentView === 'landing' ? (
          <LandingPage
            onEnterDashboard={handleEnterDashboard}
            onStartAutoPlayDemo={() => setAutoPlayDemoActive(true)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Sub-header breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-stone-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-1">
                  <button
                    onClick={() => setCurrentView('landing')}
                    className="hover:text-white transition-colors cursor-pointer text-[#FFC72C]"
                  >
                    QuarryIQ
                  </button>
                  <span>/</span>
                  <span className="font-semibold text-stone-200">
                    {TABS.find((t) => t.id === currentView)?.label || 'CEO View'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {TABS.find((t) => t.id === currentView)?.label}
                </h1>
              </div>

              {/* Quick Tab Switcher Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {TABS.map((tab) => {
                  const isActive = currentView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-md'
                          : 'bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Render Selected View */}
            <div key={currentView} className="animate-fadeIn space-y-8">
              {currentView === 'dashboard' && <Dashboard liveDataEnabled={liveDataEnabled} />}
              {currentView === 'pricing-roi' && <PricingROI />}
              {currentView === 'control-room' && <ControlRoom />}
              {currentView === 'maintenance' && <Maintenance />}
              {currentView === 'system-command' && <SystemCommand />}
              {currentView === 'system-design' && <SystemDesign />}
              {currentView === 'team-experience' && <TeamExperience />}

              {/* Tab Footer */}
              <div className="pt-8 mt-12 border-t border-stone-800 text-center text-xs text-stone-500 font-mono">
                Presented by Fireflies Energy (Pvt) Ltd | Delivery Partners: Ivevane Automation &amp; Ndebele Visionary Nexus
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Dark Footer */}
      <footer className="bg-[#0B0B0F] border-t border-stone-800 text-stone-400 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-[#FFC72C] flex items-center justify-center font-black text-[#0B0B0F] text-xs">
              Q
            </div>
            <div>
              <span className="font-bold text-white">QuarryIQ</span> &bull; Phase 1 Electrical Stabilization
            </div>
          </div>

          <div className="text-center font-mono text-[11px] text-stone-400">
            Fireflies Energy (Pvt) Ltd | Ivevane Automation | Ndebele Visionary Nexus
          </div>

          <button
            onClick={() => setCurrentView('landing')}
            className="text-[#FFC72C] hover:underline cursor-pointer font-mono"
          >
            Executive Briefing
          </button>
        </div>
      </footer>

      {/* Guided Tour Modal */}
      <DemoTour
        isActive={demoModeActive && !autoPlayDemoActive}
        onClose={() => setDemoModeActive(false)}
        onSwitchTab={handleTabClick}
      />

      {/* User Manual Drawer */}
      <UserManualDrawer
        isOpen={userManualOpen}
        onClose={() => setUserManualOpen(false)}
      />

      {/* Auto-Play Presentation Mode */}
      <AutoPlayDemo
        isActive={autoPlayDemoActive}
        onExit={() => setAutoPlayDemoActive(false)}
        onEnterFullApp={() => {
          setAutoPlayDemoActive(false);
          setCurrentView('dashboard');
        }}
        onSwitchTab={handleTabClick}
      />
    </div>
  );
}
