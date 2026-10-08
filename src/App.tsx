/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Cpu,
  ShieldCheck,
  Wrench,
  Layers,
  Sun,
  FileText,
  Truck,
  Clock,
  Menu,
  X,
  Sparkles,
  Home,
  ChevronRight,
  Activity,
  LogOut,
  ExternalLink,
  Sliders,
  HelpCircle,
  Play,
  CircuitBoard,
  Share2,
  Check,
  ShieldAlert,
  DollarSign,
  SunMedium
} from 'lucide-react';

import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { RiskDashboard } from './components/RiskDashboard';
import { ControlRoom } from './components/ControlRoom';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { SafetyOfficer } from './components/SafetyOfficer';
import { Maintenance } from './components/Maintenance';
import { DigitalTwin } from './components/DigitalTwin';
import { SolarEnergy } from './components/SolarEnergy';
import { SolarSynergy } from './components/SolarSynergy';
import { Reports } from './components/Reports';
import { Weighbridge } from './components/Weighbridge';
import { SystemComponents } from './components/SystemComponents';
import { PricingROI } from './components/PricingROI';
import { DemoTour } from './components/DemoTour';
import { UserManualDrawer } from './components/UserManualDrawer';
import { AutoPlayDemo } from './components/AutoPlayDemo';

type TabId =
  | 'landing'
  | 'dashboard'
  | 'risk-dashboard'
  | 'pricing-roi'
  | 'solar-synergy'
  | 'control-room'
  | 'what-if'
  | 'safety'
  | 'maintenance'
  | 'digital-twin'
  | 'solar'
  | 'reports'
  | 'weighbridge'
  | 'system-components';

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const TABS: TabItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'risk-dashboard', label: 'Risk Dashboard', icon: ShieldAlert, badge: 'Site Assessment' },
  { id: 'pricing-roi', label: 'Pricing & ROI', icon: DollarSign, badge: 'MD Justification' },
  { id: 'solar-synergy', label: 'Solar + Synergy', icon: SunMedium, badge: '1 MW Tender' },
  { id: 'control-room', label: 'Control Room', icon: Sliders, badge: 'Dynamic' },
  { id: 'what-if', label: 'What-If Simulator', icon: Cpu, badge: '5 Scenarios' },
  { id: 'safety', label: 'Safety Officer', icon: ShieldCheck },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, badge: 'Alert' },
  { id: 'digital-twin', label: 'Digital Twin', icon: Layers },
  { id: 'solar', label: 'Solar + Energy', icon: Sun },
  { id: 'reports', label: 'Reports', icon: FileText, badge: 'WhatsApp' },
  { id: 'weighbridge', label: 'Weighbridge', icon: Truck, badge: 'Phase 2' },
  { id: 'system-components', label: 'System Components', icon: CircuitBoard, badge: 'Hardware' },
];

export default function App() {
  const [currentView, setCurrentView] = useState<TabId>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [liveDataEnabled, setLiveDataEnabled] = useState<boolean>(true);
  const [demoModeActive, setDemoModeActive] = useState<boolean>(true); // default ON for first-time users
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
    setCurrentView(tabId as TabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#FFC72C] selection:text-[#0B0B0F]">
      {/* Sticky Top Navigation Bar: #0B0B0F near-black */}
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
                      <span className="text-xs font-normal text-stone-400 ml-1.5 hidden sm:inline">| SitePlan AI</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                      LIVE
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-medium">
                    SitePlan AI &bull; Davis Granite Engineering &amp; Risk Intelligence
                  </div>
                </div>
              </button>

              {/* View Landing Switcher Button */}
              {currentView !== 'landing' && (
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hidden xl:inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white px-2.5 py-1 rounded-md border border-stone-800 hover:border-stone-700 transition-all cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Overview &amp; ROI</span>
                </button>
              )}
            </div>

            {/* Desktop Navigation Tabs (when in dashboard mode) */}
            {currentView !== 'landing' && (
              <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`relative px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-stone-800/90 text-[#FFC72C] shadow-inner font-bold'
                          : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFC72C]' : 'text-stone-400'}`} />
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`text-[9px] font-bold px-1 py-0.2 rounded leading-none ${
                            isActive
                              ? 'bg-[#FFC72C] text-[#0B0B0F]'
                              : tab.badge === 'Alert'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                              : 'bg-stone-800 text-stone-400'
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

            {/* Right Side: Demo Mode, Live Data Toggle, Live Clock & Mode Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Demo Mode Toggle (Default ON for first-time users) */}
              <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-800 px-2.5 py-1.5 rounded-lg text-xs">
                <span className="text-stone-300 font-semibold text-[11px] whitespace-nowrap hidden xl:inline">
                  Demo Mode
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={demoModeActive}
                  onClick={() => setDemoModeActive(!demoModeActive)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    demoModeActive ? 'bg-[#FFC72C]' : 'bg-stone-700'
                  }`}
                  title={demoModeActive ? 'Demo Mode is ON (Click to turn off)' : 'Demo Mode is OFF (Click to turn on)'}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#0B0B0F] shadow-md ring-0 transition duration-200 ease-in-out ${
                      demoModeActive ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span
                  className={`w-2 h-2 rounded-full ${
                    demoModeActive ? 'bg-[#FFC72C] animate-ping' : 'bg-stone-500'
                  }`}
                  title={demoModeActive ? 'Guided Demo Mode Active' : 'Demo Mode Inactive'}
                ></span>
              </div>

              {/* User Manual Button */}
              <button
                onClick={() => setUserManualOpen(true)}
                className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-stone-600 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
                title="Open Plain-English User Manual"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span className="hidden sm:inline">Manual</span>
              </button>

              {/* Share Demo Button */}
              <button
                onClick={handleShare}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs border ${
                  shareCopied
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-200 hover:text-white'
                }`}
                title="Copy shareable link to clipboard"
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

              {/* Live Data Toggle Switch */}
              <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-800 px-2.5 py-1.5 rounded-lg text-xs">
                <span className="text-stone-300 font-semibold text-[11px] whitespace-nowrap hidden sm:inline">
                  Live Data
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={liveDataEnabled}
                  onClick={() => setLiveDataEnabled(!liveDataEnabled)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    liveDataEnabled ? 'bg-[#FFC72C]' : 'bg-stone-700'
                  }`}
                  title={liveDataEnabled ? 'Click to pause live telemetry' : 'Click to resume live telemetry'}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#0B0B0F] shadow-md ring-0 transition duration-200 ease-in-out ${
                      liveDataEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span
                  className={`w-2 h-2 rounded-full ${
                    liveDataEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'
                  }`}
                  title={liveDataEnabled ? 'Streaming active' : 'Streaming paused'}
                ></span>
              </div>

              {/* Live Digital Clock */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-900/90 border border-stone-800 px-2.5 py-1.5 rounded-lg font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span className="font-bold text-stone-200">{currentTime || '00:00:00'}</span>
                <span className="text-[10px] text-stone-400 hidden md:inline">SAST</span>
              </div>

              {/* Enter Demo Button if on Landing */}
              {currentView === 'landing' ? (
                <button
                  onClick={() => handleEnterDashboard('dashboard')}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFC72C] text-[#0B0B0F] font-bold text-xs hover:bg-[#ffcf47] transition-all cursor-pointer shadow-xs"
                >
                  <span>Enter Demo Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0B0B0F]" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#FFC72C]" />
                  <span>Pitch View</span>
                </button>
              )}

              {/* Mobile Hamburger Menu Toggle */}
              {currentView !== 'landing' && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-hidden cursor-pointer"
                  aria-label="Toggle navigation menu"
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
            {/* Mobile Navigation Drawer Controls */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs">
                <span className="font-semibold text-stone-200">Demo Mode</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={demoModeActive}
                  onClick={() => setDemoModeActive(!demoModeActive)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    demoModeActive ? 'bg-[#FFC72C]' : 'bg-stone-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#0B0B0F] shadow-md ring-0 transition duration-200 ease-in-out ${
                      demoModeActive ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={() => {
                  setUserManualOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-xs font-bold text-white hover:bg-stone-700 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span>User Manual</span>
              </button>
            </div>

            {/* Mobile Share App Link Button */}
            <button
              onClick={handleShare}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                shareCopied
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-stone-900 border-stone-800 text-stone-200 hover:text-white'
              }`}
            >
              {shareCopied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>App Link Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#FFC72C]" />
                  <span>Share QuarryIQ Demo Link</span>
                </>
              )}
            </button>

            {/* Mobile Live Data Toggle */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    liveDataEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'
                  }`}
                ></span>
                <span className="font-semibold text-stone-200">Live Data Simulation (3s)</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={liveDataEnabled}
                onClick={() => setLiveDataEnabled(!liveDataEnabled)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  liveDataEnabled ? 'bg-[#FFC72C]' : 'bg-stone-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#0B0B0F] shadow-md ring-0 transition duration-200 ease-in-out ${
                    liveDataEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 px-3 py-1">
              Select Operations Tab
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
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#FFC72C] text-[#0B0B0F]'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-stone-800">
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-400 hover:text-white"
              >
                <Home className="w-4 h-4 text-[#FFC72C]" />
                <span>Return to Executive Pitch &amp; ROI</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area: Warm off-white #FFFDF7 */}
      <main className="flex-1 bg-[#FFFDF7] text-stone-900">
        {currentView === 'landing' ? (
          <LandingPage
            onEnterDashboard={handleEnterDashboard}
            onStartAutoPlayDemo={() => setAutoPlayDemoActive(true)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Sub-header breadcrumb & tab header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-stone-200/80">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <button
                    onClick={() => setCurrentView('landing')}
                    className="hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    QuarryIQ
                  </button>
                  <span>/</span>
                  <span className="font-semibold text-stone-800 capitalize">
                    {TABS.find((t) => t.id === currentView)?.label || 'Console'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  {TABS.find((t) => t.id === currentView)?.label}
                </h1>
              </div>

              {/* Quick Tab Switcher Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {TABS.map((tab) => {
                  const isActive = currentView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0B0B0F] text-[#FFC72C] shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Views with subtle fade-in animation and tab-level footer */}
            <div key={currentView} className="animate-fadeIn space-y-8">
              {currentView === 'dashboard' && <Dashboard liveDataEnabled={liveDataEnabled} />}
              {currentView === 'risk-dashboard' && <RiskDashboard />}
              {currentView === 'pricing-roi' && <PricingROI />}
              {currentView === 'solar-synergy' && <SolarSynergy />}
              {currentView === 'control-room' && <ControlRoom />}
              {currentView === 'what-if' && <WhatIfSimulator />}
              {currentView === 'safety' && <SafetyOfficer />}
              {currentView === 'maintenance' && <Maintenance />}
              {currentView === 'digital-twin' && <DigitalTwin />}
              {currentView === 'solar' && <SolarEnergy />}
              {currentView === 'reports' && <Reports />}
              {currentView === 'weighbridge' && <Weighbridge />}
              {currentView === 'system-components' && <SystemComponents />}

              {/* Tab Footer */}
              <div className="pt-8 mt-12 border-t border-stone-200 text-center text-xs text-stone-500 font-mono">
                Fireflies Energy (Pvt) Ltd | QuarryIQ Demo v1.0 | For Davis Granite Discussion Purposes Only
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
              <span className="font-bold text-white">QuarryIQ</span> &bull; Rock-to-Revenue Intelligence System
            </div>
          </div>

          <div className="text-center font-mono text-[11px] text-stone-400">
            Fireflies Energy (Pvt) Ltd | QuarryIQ Demo v1.0 | For Davis Granite Discussion Purposes Only
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <button
              onClick={() => setCurrentView('landing')}
              className="text-[#FFC72C] hover:underline cursor-pointer"
            >
              Executive Pitch
            </button>
          </div>
        </div>
      </footer>

      {/* 8-Step Guided Demo Tour (Default ON for first-time users) */}
      <DemoTour
        isActive={demoModeActive && !autoPlayDemoActive}
        onClose={() => setDemoModeActive(false)}
        onSwitchTab={handleTabClick}
      />

      {/* Slide-in User Manual Drawer */}
      <UserManualDrawer
        isOpen={userManualOpen}
        onClose={() => setUserManualOpen(false)}
      />

      {/* Auto-Play Demo Presentation Mode for MDs */}
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
