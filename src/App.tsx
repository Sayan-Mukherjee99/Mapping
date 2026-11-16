import React, { useState, useEffect, useMemo } from 'react';
import { 
  LOCATION_PRESETS, 
  INITIAL_BARRIERS, 
  calculateMockRoutes 
} from './data/mockData';
import { 
  TravelMode, 
  AccessibilityPreference, 
  BarrierReport, 
} from './types';
import { Header } from './components/Header';
import { PlannerLanding } from './components/PlannerLanding';
import { InteractiveMap } from './components/InteractiveMap';
import { RouteOptionsList } from './components/RouteOptionsList';
import { RouteDetailsPanel } from './components/RouteDetailsPanel';
import { CommunityFeed } from './components/CommunityFeed';
import { ReportIssueModal } from './components/ReportIssueModal';
import { AboutModal } from './components/AboutModal';
import { ModifyPreferencesModal } from './components/ModifyPreferencesModal';
import { 
  ArrowLeft, 
  SlidersHorizontal, 
  Compass, 
  Accessibility, 
} from 'lucide-react';

export function App() {
  const [activeView, setActiveView] = useState<'planner' | 'results'>('planner');
  const [mobileTab, setMobileTab] = useState<'map' | 'routes' | 'feed'>('routes');

  const [startLocId, setStartLocId] = useState<string>('central-station');
  const [destLocId, setDestLocId] = useState<string>('mercy-hospital');
  const [travelMode, setTravelMode] = useState<TravelMode>('walk');
  const [preferences, setPreferences] = useState<AccessibilityPreference[]>([
    'step-free',
    'avoid-stairs',
    'working-elevators',
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isModifyPreferencesOpen, setIsModifyPreferencesOpen] = useState<boolean>(false);

  const [barriers, setBarriers] = useState<BarrierReport[]>(() => {
    try {
      const saved = localStorage.getItem('accessnow_civic_barriers');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_BARRIERS;
  });

  const [selectedBarrierId, setSelectedBarrierId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('accessnow_civic_barriers', JSON.stringify(barriers));
    } catch {
      // ignore
    }
  }, [barriers]);

  const calculatedRoutes = useMemo(() => {
    return calculateMockRoutes(startLocId, destLocId, travelMode, preferences, barriers);
  }, [startLocId, destLocId, travelMode, preferences, barriers]);

  const [activeRouteId, setActiveRouteId] = useState<string>('route-step-free');

  useEffect(() => {
    if (!calculatedRoutes.some(r => r.id === activeRouteId)) {
      setActiveRouteId(calculatedRoutes[0]?.id || 'route-step-free');
    }
  }, [calculatedRoutes, activeRouteId]);

  const handleTogglePreference = (pref: AccessibilityPreference) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleFindRoute = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveView('results');
      setMobileTab('routes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleSelectSampleJourney = (start: string, dest: string, mode?: TravelMode) => {
    setStartLocId(start);
    setDestLocId(dest);
    if (mode) setTravelMode(mode);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveView('results');
      setMobileTab('routes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleAddReport = (
    newReportData: Omit<BarrierReport, 'id' | 'createdAt' | 'reportedAt' | 'upvotes' | 'affectedRouteIds'>
  ) => {
    const newReport: BarrierReport = {
      ...newReportData,
      id: `barrier-${Date.now()}`,
      reportedAt: 'Just now',
      createdAt: new Date().toISOString(),
      upvotes: 1,
      affectedRouteIds: [activeRouteId],
    };

    setBarriers(prev => [newReport, ...prev]);
    setSelectedBarrierId(newReport.id);
  };

  const handleConfirmBarrier = (barrierId: string) => {
    setBarriers(prev =>
      prev.map(b => (b.id === barrierId ? { ...b, upvotes: b.upvotes + 1 } : b))
    );
  };

  const handleResolveBarrier = (barrierId: string) => {
    setBarriers(prev =>
      prev.map(b =>
        b.id === barrierId
          ? {
              ...b,
              status: 'resolved',
              resolvedNote: 'Marked resolved by community contributor',
            }
          : b
      )
    );
  };

  const startLoc = LOCATION_PRESETS.find(l => l.id === startLocId) || LOCATION_PRESETS[0];
  const destLoc = LOCATION_PRESETS.find(l => l.id === destLocId) || LOCATION_PRESETS[2];
  const activeRoute = calculatedRoutes.find(r => r.id === activeRouteId) || calculatedRoutes[0];
  const activeBarrierCount = barriers.filter(b => b.status !== 'resolved').length;

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      highContrast 
        ? 'bg-[#1D1D1F] text-white selection:bg-[#0071E3] selection:text-white' 
        : 'bg-[#F5F5F7] text-[#1D1D1F]'
    }`}>
      {/* Top Translucent Navigation Bar */}
      <Header
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        activeView={activeView}
        onNavigateHome={() => setActiveView('planner')}
        reportsCount={activeBarrierCount}
      />

      {/* Main App Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 rounded-[22px] bg-white border border-black/[0.08] flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <Compass className="w-8 h-8 text-[#0071E3] animate-spin" strokeWidth={1.75} />
            </div>
            <h3 className="font-bold text-white text-[18px] mt-4 tracking-tight drop-shadow-sm">
              Calculating Accessible Routes...
            </h3>
            <p className="text-[13px] text-white/80 mt-1 max-w-xs text-center">
              Auditing slope angles, elevator operational statuses, and community barrier reports.
            </p>
          </div>
        )}

        {/* 1. Landing Planner Screen */}
        {activeView === 'planner' && (
          <PlannerLanding
            locations={LOCATION_PRESETS}
            startLocId={startLocId}
            setStartLocId={setStartLocId}
            destLocId={destLocId}
            setDestLocId={setDestLocId}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            preferences={preferences}
            onTogglePreference={handleTogglePreference}
            onSubmit={handleFindRoute}
            onSelectSampleJourney={handleSelectSampleJourney}
            activeBarrierCount={activeBarrierCount}
          />
        )}

        {/* 2. Results / Route Planner Screen */}
        {activeView === 'results' && (
          <div className="space-y-4">
            {/* Top Itinerary Bento Strip */}
            <div className="bg-white rounded-[22px] p-3.5 sm:p-4.5 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <button
                  onClick={() => setActiveView('planner')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[13px] font-semibold text-[#1D1D1F] apple-press transition-colors"
                  aria-label="Back to planner screen"
                >
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Edit Search</span>
                </button>

                <div className="flex items-center gap-2 text-[14px] sm:text-[15px] font-bold text-[#1D1D1F] tracking-tight">
                  <span className="text-[#34C759]">{startLoc.shortLabel}</span>
                  <span className="text-[#8E8E93]">→</span>
                  <span className="text-[#0071E3]">{destLoc.shortLabel}</span>
                </div>

                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[12px] font-medium bg-[#F5F5F7] text-[#6E6E73] border border-black/[0.06]">
                  {travelMode === 'car' ? '🚗 Car Mode' : travelMode === 'bike' ? '🚲 Bike Mode' : '🚶 Walk Mode'}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setIsModifyPreferencesOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] border border-black/[0.08] text-[13px] font-medium text-[#1D1D1F] apple-press transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#6E6E73]" strokeWidth={1.75} />
                  <span>Priorities ({preferences.length})</span>
                </button>

                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,113,227,0.22)] apple-press transition-colors"
                >
                  <span>+ Report Barrier</span>
                </button>
              </div>
            </div>

            {/* Mobile Segmented Switcher (Routes / Map / Barriers) */}
            <div className="flex lg:hidden bg-[#E8E8ED] p-1 rounded-full border border-black/[0.04] text-[13px]">
              <button
                onClick={() => setMobileTab('routes')}
                className={`flex-1 py-1.5 text-center rounded-full transition-all ${
                  mobileTab === 'routes' 
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.10)] font-semibold' 
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                Routes ({calculatedRoutes.length})
              </button>
              <button
                onClick={() => setMobileTab('map')}
                className={`flex-1 py-1.5 text-center rounded-full transition-all ${
                  mobileTab === 'map' 
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.10)] font-semibold' 
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                District Map
              </button>
              <button
                onClick={() => setMobileTab('feed')}
                className={`flex-1 py-1.5 text-center rounded-full transition-all ${
                  mobileTab === 'feed' 
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.10)] font-semibold' 
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                Barriers ({barriers.length})
              </button>
            </div>

            {/* Responsive Bento Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Routes, Turn-by-Turn, Feed */}
              <div className={`lg:col-span-5 space-y-4 ${
                mobileTab === 'map' ? 'hidden lg:block' : 'block'
              }`}>
                {mobileTab === 'feed' && (
                  <div className="lg:hidden">
                    <CommunityFeed
                      barriers={barriers}
                      selectedBarrierId={selectedBarrierId}
                      onSelectBarrier={(id) => {
                        setSelectedBarrierId(id);
                        setMobileTab('map');
                      }}
                      onConfirmBarrier={handleConfirmBarrier}
                      onResolveBarrier={handleResolveBarrier}
                      onOpenReportModal={() => setIsReportModalOpen(true)}
                    />
                  </div>
                )}

                {(mobileTab === 'routes' || window.innerWidth >= 1024) && (
                  <>
                    <RouteOptionsList
                      routes={calculatedRoutes}
                      activeRouteId={activeRouteId}
                      onSelectRoute={(id) => setActiveRouteId(id)}
                      onOpenModifyPreferences={() => setIsModifyPreferencesOpen(true)}
                    />

                    {activeRoute && (
                      <RouteDetailsPanel
                        route={activeRoute}
                        onOpenReportModal={() => setIsReportModalOpen(true)}
                        onSelectBarrier={(id) => {
                          setSelectedBarrierId(id);
                          setMobileTab('map');
                        }}
                      />
                    )}

                    <div className="hidden lg:block">
                      <CommunityFeed
                        barriers={barriers}
                        selectedBarrierId={selectedBarrierId}
                        onSelectBarrier={(id) => setSelectedBarrierId(id)}
                        onConfirmBarrier={handleConfirmBarrier}
                        onResolveBarrier={handleResolveBarrier}
                        onOpenReportModal={() => setIsReportModalOpen(true)}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Interactive Map */}
              <div className={`lg:col-span-7 sticky top-[76px] ${
                mobileTab !== 'map' ? 'hidden lg:block' : 'block'
              }`}>
                <InteractiveMap
                  locations={LOCATION_PRESETS}
                  routes={calculatedRoutes}
                  activeRouteId={activeRouteId}
                  onSelectRoute={(id) => setActiveRouteId(id)}
                  barriers={barriers}
                  selectedBarrierId={selectedBarrierId}
                  onSelectBarrier={(id) => setSelectedBarrierId(id)}
                  onConfirmBarrier={handleConfirmBarrier}
                  onResolveBarrier={handleResolveBarrier}
                  startLocId={startLocId}
                  destLocId={destLocId}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-black/[0.08] bg-white py-6 text-[13px] text-[#6E6E73]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-[#0071E3] flex items-center justify-center text-white">
              <Accessibility className="w-3 h-3" strokeWidth={1.75} />
            </div>
            <span className="font-semibold text-[#1D1D1F]">AccessNow Civic Routing</span>
            <span className="text-[#AEAEB2]">·</span>
            <span>Human Interface Design</span>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <button 
              onClick={() => setIsAboutModalOpen(true)}
              className="hover:text-[#1D1D1F] transition-colors"
            >
              Accessibility Standards
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('accessnow_civic_barriers');
                setBarriers(INITIAL_BARRIERS);
                setSelectedBarrierId(null);
              }}
              className="hover:text-[#1D1D1F] transition-colors"
              title="Reset community reports to demo default"
            >
              Reset Demo Data
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleAddReport}
        locations={LOCATION_PRESETS}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      <ModifyPreferencesModal
        isOpen={isModifyPreferencesOpen}
        onClose={() => setIsModifyPreferencesOpen(false)}
        travelMode={travelMode}
        setTravelMode={setTravelMode}
        preferences={preferences}
        onTogglePreference={handleTogglePreference}
        startLocId={startLocId}
        setStartLocId={setStartLocId}
        destLocId={destLocId}
        setDestLocId={setDestLocId}
        locations={LOCATION_PRESETS}
        onRecalculate={() => {}}
      />
    </div>
  );
}

export default App;
