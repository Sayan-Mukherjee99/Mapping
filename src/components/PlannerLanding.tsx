import React from 'react';
import { 
  Accessibility, 
  ArrowLeftRight, 
  Footprints, 
  Bus, 
  Sparkles, 
  Check, 
  ShieldAlert, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { 
  TravelMode, 
  AccessibilityPreference, 
  LocationPreset 
} from '../types';

interface PlannerLandingProps {
  locations: LocationPreset[];
  startLocId: string;
  setStartLocId: (id: string) => void;
  destLocId: string;
  setDestLocId: (id: string) => void;
  travelMode: TravelMode;
  setTravelMode: (mode: TravelMode) => void;
  preferences: AccessibilityPreference[];
  onTogglePreference: (pref: AccessibilityPreference) => void;
  onSubmit: () => void;
  onSelectSampleJourney: (start: string, dest: string, mode?: TravelMode) => void;
  activeBarrierCount: number;
}

export const PlannerLanding: React.FC<PlannerLandingProps> = ({
  locations,
  startLocId,
  setStartLocId,
  destLocId,
  setDestLocId,
  travelMode,
  setTravelMode,
  preferences,
  onTogglePreference,
  onSubmit,
  onSelectSampleJourney,
  activeBarrierCount,
}) => {
  const handleSwap = () => {
    const temp = startLocId;
    setStartLocId(destLocId);
    setDestLocId(temp);
  };

  const isPreferenceActive = (pref: AccessibilityPreference) => preferences.includes(pref);

  const startLoc = locations.find(l => l.id === startLocId);
  const destLoc = locations.find(l => l.id === destLocId);

  const isFormValid = startLocId !== destLocId;

  const preferenceItems: Array<{ id: AccessibilityPreference; label: string; detail: string }> = [
    { id: 'step-free', label: 'Step-free route', detail: 'Zero stairs or high curbs' },
    { id: 'avoid-stairs', label: 'Avoid stairs', detail: 'Ramps and grade routes only' },
    { id: 'working-elevators', label: 'Working elevators', detail: 'Real-time verified lifts' },
    { id: 'fewer-obstacles', label: 'Fewer obstacles', detail: 'Wide unobstructed sidewalks' },
    { id: 'low-incline', label: 'Gentle slopes (< 3%)', detail: 'Comfortable gradient' },
    { id: 'audio-signals', label: 'Audio crosswalks', detail: 'Audible chirp crossings' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Apple Headline with Tight Tracking and Breathing Room */}
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-[13px] font-medium text-[#6E6E73]">
          <span className="w-2 h-2 rounded-full bg-[#34C759]"></span>
          <span>Community Audited Pilot</span>
          <span className="text-[#AEAEB2]">·</span>
          <span className="text-[#1D1D1F] font-semibold">{activeBarrierCount} Active Area Reports</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-[1.08]">
          Plan a route that <br className="hidden sm:inline" />
          <span className="text-[#0071E3]">works for you.</span>
        </h1>

        <p className="text-[17px] sm:text-[19px] text-[#6E6E73] max-w-xl mx-auto leading-relaxed font-normal">
          Find verified step-free corridors, live elevator statuses, and community barrier alerts before you leave.
        </p>
      </div>

      {/* Main Elevated Bento Card */}
      <div className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-9 relative">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid) onSubmit();
          }}
          className="space-y-7"
        >
          {/* iOS / macOS Style Segmented Control for Travel Modes */}
          <div className="space-y-2">
            <span className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              Travel Mode
            </span>
            <div className="p-1 bg-[#E8E8ED] rounded-full flex items-center border border-black/[0.04] relative">
              {/* Wheelchair Mode */}
              <button
                type="button"
                onClick={() => setTravelMode('wheelchair')}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-full text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  travelMode === 'wheelchair'
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.12)] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
                aria-pressed={travelMode === 'wheelchair'}
              >
                <Accessibility className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
                <span>Wheelchair</span>
              </button>

              {/* Walking Mode */}
              <button
                type="button"
                onClick={() => setTravelMode('walk')}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-full text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  travelMode === 'walk'
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.12)] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
                aria-pressed={travelMode === 'walk'}
              >
                <Footprints className="w-4 h-4 text-[#6E6E73]" strokeWidth={1.75} />
                <span>Walking</span>
              </button>

              {/* Transit Mode */}
              <button
                type="button"
                onClick={() => setTravelMode('transit')}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-full text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  travelMode === 'transit'
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.12)] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
                aria-pressed={travelMode === 'transit'}
              >
                <Bus className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
                <span>Transit</span>
              </button>
            </div>
          </div>

          {/* Locations Bento Row */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Origin Select */}
            <div className="space-y-1.5 bg-[#F5F5F7] p-4 rounded-[18px] border border-black/[0.06]">
              <label 
                htmlFor="start-location-select" 
                className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider flex items-center gap-1.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]"></span>
                Starting Point
              </label>
              <div className="relative">
                <select
                  id="start-location-select"
                  value={startLocId}
                  onChange={(e) => setStartLocId(e.target.value)}
                  className="w-full appearance-none bg-transparent py-1 text-[#1D1D1F] font-semibold text-[15px] focus:outline-none cursor-pointer pr-8 tracking-tight"
                >
                  {locations.map((loc) => (
                    <option key={`start-${loc.id}`} value={loc.id} disabled={loc.id === destLocId}>
                      {loc.name} {loc.id === destLocId ? '(Destination)' : ''}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-[#8E8E93]">
                  <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
                </div>
              </div>
              {startLoc && (
                <p className="text-[12px] text-[#86868B] truncate pt-0.5">
                  {startLoc.address}
                </p>
              )}
            </div>

            {/* Floating Swap Button */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                type="button"
                onClick={handleSwap}
                className="w-10 h-10 rounded-full bg-white border border-black/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-[#6E6E73] hover:text-[#0071E3] apple-press flex items-center justify-center transition-all duration-200"
                title="Swap origin and destination"
                aria-label="Swap starting point and destination"
              >
                <ArrowLeftRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Destination Select */}
            <div className="space-y-1.5 bg-[#F5F5F7] p-4 rounded-[18px] border border-black/[0.06]">
              <label 
                htmlFor="dest-location-select" 
                className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider flex items-center gap-1.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]"></span>
                Destination
              </label>
              <div className="relative">
                <select
                  id="dest-location-select"
                  value={destLocId}
                  onChange={(e) => setDestLocId(e.target.value)}
                  className="w-full appearance-none bg-transparent py-1 text-[#1D1D1F] font-semibold text-[15px] focus:outline-none cursor-pointer pr-8 tracking-tight"
                >
                  {locations.map((loc) => (
                    <option key={`dest-${loc.id}`} value={loc.id} disabled={loc.id === startLocId}>
                      {loc.name} {loc.id === startLocId ? '(Starting point)' : ''}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-[#8E8E93]">
                  <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
                </div>
              </div>
              {destLoc && (
                <p className="text-[12px] text-[#86868B] truncate pt-0.5">
                  {destLoc.address}
                </p>
              )}
            </div>
          </div>

          {/* Mobile Swap Trigger */}
          <div className="flex md:hidden justify-center -my-2">
            <button
              type="button"
              onClick={handleSwap}
              className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F5F7] border border-black/[0.08] text-[#0071E3] flex items-center gap-1.5 apple-press"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              Swap Locations
            </button>
          </div>

          {/* Interactive Accessibility Preference Chips */}
          <div className="space-y-3 pt-2 border-t border-black/[0.06]">
            <div className="flex items-center justify-between">
              <span className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Accessibility Priorities
              </span>
              <span className="text-[12px] text-[#86868B]">
                {preferences.length} selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {preferenceItems.map((pref) => {
                const active = isPreferenceActive(pref.id);
                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => onTogglePreference(pref.id)}
                    className={`py-2.5 px-3.5 rounded-[16px] text-left transition-all duration-200 apple-press flex items-start gap-2.5 border ${
                      active
                        ? 'bg-[#0071E3]/[0.08] border-[#0071E3]/40 text-[#1D1D1F] ring-1 ring-[#0071E3]/30'
                        : 'bg-[#F5F5F7] border-black/[0.06] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E8E8ED]/70'
                    }`}
                    aria-pressed={active}
                  >
                    <div className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                      active 
                        ? 'bg-[#0071E3] border-[#0071E3] text-white' 
                        : 'border-[#AEAEB2] bg-white'
                    }`}>
                      {active && <Check className="w-2.5 h-2.5" strokeWidth={2.5} />}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-[13px] font-medium tracking-tight ${active ? 'text-[#1D1D1F] font-semibold' : 'text-[#1D1D1F]'}`}>
                        {pref.label}
                      </div>
                      <div className="text-[11px] text-[#86868B] truncate">
                        {pref.detail}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation Notice */}
          {!isFormValid && (
            <div className="p-3.5 bg-[#FF3B30]/[0.08] border border-[#FF3B30]/20 rounded-[16px] text-[#FF3B30] text-[13px] font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span>Please select distinct starting and destination locations to calculate an accessible route.</span>
            </div>
          )}

          {/* Pill-Shaped Primary Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-full font-semibold text-[16px] flex items-center justify-center gap-2 transition-all duration-200 apple-press ${
                isFormValid
                  ? 'bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] text-white shadow-[0_4px_16px_rgba(0,113,227,0.30)] cursor-pointer'
                  : 'bg-[#E8E8ED] text-[#8E8E93] cursor-not-allowed shadow-none'
              }`}
              aria-label="Find my accessible route"
            >
              <Compass className="w-4 h-4 stroke-[2]" />
              <span>Find My Route</span>
              <ArrowRight className="w-4 h-4 ml-0.5" strokeWidth={1.75} />
            </button>
          </div>
        </form>
      </div>

      {/* Quick Launch Demo Journeys - Bento Style */}
      <div className="mt-10 space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[14px] font-semibold text-[#1D1D1F] flex items-center gap-1.5 tracking-tight">
            <Sparkles className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
            Suggested Demo Journeys
          </h2>
          <span className="text-[12px] text-[#86868B]">1-click simulation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Demo 1 */}
          <button
            type="button"
            onClick={() => onSelectSampleJourney('central-station', 'mercy-hospital', 'wheelchair')}
            className="p-4 rounded-[20px] bg-white border border-black/[0.08] hover:border-black/[0.16] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 text-left apple-press group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#34C759]/[0.12] text-[#34C759]">
                Step-Free
              </span>
              <Accessibility className="w-4 h-4 text-[#0071E3] group-hover:scale-105 transition-transform" strokeWidth={1.75} />
            </div>
            <div className="font-semibold text-[#1D1D1F] text-[14px] tracking-tight group-hover:text-[#0071E3] transition-colors">
              Central Station → Mercy Hospital
            </div>
            <p className="text-[12px] text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
              Bypasses blocked curb ramp at 5th Ave via verified Broad St level corridor.
            </p>
          </button>

          {/* Demo 2 */}
          <button
            type="button"
            onClick={() => onSelectSampleJourney('city-hall', 'riverside-library', 'walk')}
            className="p-4 rounded-[20px] bg-white border border-black/[0.08] hover:border-black/[0.16] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 text-left apple-press group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FF9F0A]/[0.14] text-[#D97706]">
                Ramp Detour
              </span>
              <Footprints className="w-4 h-4 text-[#6E6E73] group-hover:scale-105 transition-transform" strokeWidth={1.75} />
            </div>
            <div className="font-semibold text-[#1D1D1F] text-[14px] tracking-tight group-hover:text-[#0071E3] transition-colors">
              City Hall Plaza → Riverside Library
            </div>
            <p className="text-[12px] text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
              Circumnavigates 18 plaza stone steps; includes resolved library atrium lift.
            </p>
          </button>

          {/* Demo 3 */}
          <button
            type="button"
            onClick={() => onSelectSampleJourney('tech-hub', 'market-square', 'transit')}
            className="p-4 rounded-[20px] bg-white border border-black/[0.08] hover:border-black/[0.16] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 text-left apple-press group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#0071E3]/[0.10] text-[#0071E3]">
                Low-Floor Tram
              </span>
              <Bus className="w-4 h-4 text-[#0071E3] group-hover:scale-105 transition-transform" strokeWidth={1.75} />
            </div>
            <div className="font-semibold text-[#1D1D1F] text-[14px] tracking-tight group-hover:text-[#0071E3] transition-colors">
              Tech Campus → Union Market
            </div>
            <p className="text-[12px] text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
              Zero-gap level platform boarding with audio tactile crosswalk guidance.
            </p>
          </button>
        </div>
      </div>

      {/* Trust & Transparency Civic Notice - Bento Container */}
      <div className="mt-8 bg-white/70 rounded-[22px] p-5 border border-black/[0.08] flex items-start gap-4 text-[13px] text-[#6E6E73] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="w-8 h-8 rounded-full bg-[#FF9F0A]/[0.12] flex items-center justify-center shrink-0 text-[#FF9F0A]">
          <ShieldAlert className="w-4 h-4" strokeWidth={1.75} />
        </div>
        <div className="space-y-0.5">
          <p className="font-semibold text-[#1D1D1F]">
            Audited Civic Data with Uncertainty Awareness
          </p>
          <p className="leading-relaxed">
            Accessibility reports are compiled from public transit authorities and community contributions. Because conditions change with weather and street maintenance, please verify conditions before traveling.
          </p>
        </div>
      </div>
    </div>
  );
};
