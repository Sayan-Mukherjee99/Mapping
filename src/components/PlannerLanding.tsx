import React from 'react';
import { 
  Car, 
  Bike, 
  Footprints, 
  ArrowLeftRight, 
  Sparkles, 
  Check, 
  ShieldAlert, 
  Compass, 
  ArrowRight,
} from 'lucide-react';
import { 
  TravelMode, 
  AccessibilityPreference, 
  LocationPreset,
  RealPlace
} from '../types';
import { RealPlaceAutocomplete } from './RealPlaceAutocomplete';

interface PlannerLandingProps {
  locations: LocationPreset[];
  startPlace: RealPlace;
  setStartPlace: (place: RealPlace) => void;
  destPlace: RealPlace;
  setDestPlace: (place: RealPlace) => void;
  travelMode: TravelMode;
  setTravelMode: (mode: TravelMode) => void;
  preferences: AccessibilityPreference[];
  onTogglePreference: (pref: AccessibilityPreference) => void;
  onSubmit: () => void;
  onSelectSampleJourney: (startId: string, destId: string, mode?: TravelMode) => void;
  activeBarrierCount: number;
}

export const PlannerLanding: React.FC<PlannerLandingProps> = ({
  locations,
  startPlace,
  setStartPlace,
  destPlace,
  setDestPlace,
  travelMode,
  setTravelMode,
  preferences,
  onTogglePreference,
  onSubmit,
  onSelectSampleJourney,
  activeBarrierCount,
}) => {
  const handleSwap = () => {
    const temp = startPlace;
    setStartPlace(destPlace);
    setDestPlace(temp);
  };

  const isPreferenceActive = (pref: AccessibilityPreference) => preferences.includes(pref);

  const isFormValid = startPlace.name.trim() !== '' && 
                      destPlace.name.trim() !== '' && 
                      (startPlace.id !== destPlace.id || startPlace.name.toLowerCase() !== destPlace.name.toLowerCase());

  const preferenceItems: Array<{ id: AccessibilityPreference; label: string; detail: string }> = [
    { id: 'step-free', label: 'Step-free route', detail: 'Zero stairs or high curbs' },
    { id: 'avoid-stairs', label: 'Avoid stairs', detail: 'Ramps and grade routes only' },
    { id: 'working-elevators', label: 'Working elevators', detail: 'Real-time verified lifts' },
    { id: 'fewer-obstacles', label: 'Fewer obstacles', detail: 'Wide unobstructed paths' },
    { id: 'low-incline', label: 'Gentle slopes (< 3%)', detail: 'Comfortable gradient' },
    { id: 'audio-signals', label: 'Audio crosswalks', detail: 'Audible chirp crossings' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Apple Headline with Tight Tracking and Breathing Room */}
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-[13px] font-medium text-[#6E6E73]">
          <span className="w-2 h-2 rounded-full bg-[#34C759]"></span>
          <span>Free Real Places & OpenStreetMap Geocoding</span>
          <span className="text-[#AEAEB2]">·</span>
          <span className="text-[#1D1D1F] font-semibold">{activeBarrierCount} Active Area Reports</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-[1.08]">
          Plan a route that <br className="hidden sm:inline" />
          <span className="text-[#0071E3]">works for you.</span>
        </h1>

        <p className="text-[17px] sm:text-[19px] text-[#6E6E73] max-w-xl mx-auto leading-relaxed font-normal">
          Type any real place, street, or landmark worldwide, or pick from local civic presets. 100% free with no paid API keys.
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
          {/* iOS / macOS Segmented Control: Car, Bike, Walk ONLY */}
          <div className="space-y-2">
            <span className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              Travel Mode
            </span>
            <div className="p-1 bg-[#E8E8ED] rounded-full flex items-center border border-black/[0.04] relative">
              {/* Car Mode */}
              <button
                type="button"
                onClick={() => setTravelMode('car')}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-full text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  travelMode === 'car'
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.12)] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
                aria-pressed={travelMode === 'car'}
              >
                <Car className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
                <span>Car</span>
              </button>

              {/* Bike Mode */}
              <button
                type="button"
                onClick={() => setTravelMode('bike')}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-full text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  travelMode === 'bike'
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.12)] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
                aria-pressed={travelMode === 'bike'}
              >
                <Bike className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
                <span>Bike</span>
              </button>

              {/* Walk Mode */}
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
                <Footprints className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
                <span>Walk</span>
              </button>
            </div>
          </div>

          {/* Locations Bento Row with Real Places Autocomplete */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Origin Real Place Autocomplete */}
            <RealPlaceAutocomplete
              label="Starting Point"
              dotColor="bg-[#34C759]"
              selectedPlace={startPlace}
              onSelectPlace={setStartPlace}
              placeholder="Search real origin (e.g. Central Station, Times Sq)..."
            />

            {/* Floating Center Swap Button */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
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

            {/* Destination Real Place Autocomplete */}
            <RealPlaceAutocomplete
              label="Destination"
              dotColor="bg-[#0071E3]"
              selectedPlace={destPlace}
              onSelectPlace={setDestPlace}
              placeholder="Search real destination (e.g. Hospital, Museum, City Hall)..."
            />
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

          {/* Quick Preset Chips Row */}
          <div className="pt-1 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-[#86868B]">Quick locations:</span>
            {locations.slice(0, 4).map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setDestPlace({
                  id: loc.id,
                  name: loc.name,
                  shortLabel: loc.shortLabel,
                  address: loc.address,
                  lat: 37.7749,
                  lng: -122.4194,
                  x: loc.x,
                  y: loc.y,
                  isRealLocation: false,
                })}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#6E6E73] hover:text-[#1D1D1F] border border-black/[0.06] transition-colors"
              >
                {loc.shortLabel}
              </button>
            ))}
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
          {/* Demo 1: Car */}
          <button
            type="button"
            onClick={() => onSelectSampleJourney('central-station', 'mercy-hospital', 'car')}
            className="p-4 rounded-[20px] bg-white border border-black/[0.08] hover:border-black/[0.16] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 text-left apple-press group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#0071E3]/[0.10] text-[#0071E3]">
                Car Route
              </span>
              <Car className="w-4 h-4 text-[#0071E3] group-hover:scale-105 transition-transform" strokeWidth={1.75} />
            </div>
            <div className="font-semibold text-[#1D1D1F] text-[14px] tracking-tight group-hover:text-[#0071E3] transition-colors">
              Central Station → Mercy Hospital
            </div>
            <p className="text-[12px] text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
              Fastest vehicle route via Broad St avoiding lane restrictions on Hospital Blvd.
            </p>
          </button>

          {/* Demo 2: Bike */}
          <button
            type="button"
            onClick={() => onSelectSampleJourney('city-hall', 'riverside-library', 'bike')}
            className="p-4 rounded-[20px] bg-white border border-black/[0.08] hover:border-black/[0.16] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 text-left apple-press group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#34C759]/[0.12] text-[#34C759]">
                Protected Bike Track
              </span>
              <Bike className="w-4 h-4 text-[#34C759] group-hover:scale-105 transition-transform" strokeWidth={1.75} />
            </div>
            <div className="font-semibold text-[#1D1D1F] text-[14px] tracking-tight group-hover:text-[#0071E3] transition-colors">
              City Hall Plaza → Riverside Library
            </div>
            <p className="text-[12px] text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
              Dedicated two-way cycleway bypassing stairs and connecting to Waterfront trail.
            </p>
          </button>

          {/* Demo 3: Walk */}
          <button
            type="button"
            onClick={() => onSelectSampleJourney('tech-hub', 'market-square', 'walk')}
            className="p-4 rounded-[20px] bg-white border border-black/[0.08] hover:border-black/[0.16] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 text-left apple-press group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FF9F0A]/[0.14] text-[#D97706]">
                Step-Free Walk
              </span>
              <Footprints className="w-4 h-4 text-[#D97706] group-hover:scale-105 transition-transform" strokeWidth={1.75} />
            </div>
            <div className="font-semibold text-[#1D1D1F] text-[14px] tracking-tight group-hover:text-[#0071E3] transition-colors">
              Tech Campus → Union Market
            </div>
            <p className="text-[12px] text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
              Wide sidewalks, tactile audio crosswalk signals, and zero staircase obstructions.
            </p>
          </button>
        </div>
      </div>

      {/* Trust & Transparency Civic Notice */}
      <div className="mt-8 bg-white/70 rounded-[22px] p-5 border border-black/[0.08] flex items-start gap-4 text-[13px] text-[#6E6E73] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="w-8 h-8 rounded-full bg-[#FF9F0A]/[0.12] flex items-center justify-center shrink-0 text-[#FF9F0A]">
          <ShieldAlert className="w-4 h-4" strokeWidth={1.75} />
        </div>
        <div className="space-y-0.5">
          <p className="font-semibold text-[#1D1D1F]">
            100% Free Open Geospatial Data (No Paid APIs)
          </p>
          <p className="leading-relaxed">
            Real place autocomplete and address searches are powered by open-source OpenStreetMap and Photon. Zero billing, zero tracking, and zero API keys required.
          </p>
        </div>
      </div>
    </div>
  );
};
