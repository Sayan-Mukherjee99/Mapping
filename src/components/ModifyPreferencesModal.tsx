import React from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Accessibility, 
  Check, 
  Footprints,
  Bus,
  ChevronDown
} from 'lucide-react';
import { 
  TravelMode, 
  AccessibilityPreference, 
  LocationPreset 
} from '../types';

interface ModifyPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelMode: TravelMode;
  setTravelMode: (mode: TravelMode) => void;
  preferences: AccessibilityPreference[];
  onTogglePreference: (pref: AccessibilityPreference) => void;
  startLocId: string;
  setStartLocId: (id: string) => void;
  destLocId: string;
  setDestLocId: (id: string) => void;
  locations: LocationPreset[];
  onRecalculate: () => void;
}

export const ModifyPreferencesModal: React.FC<ModifyPreferencesModalProps> = ({
  isOpen,
  onClose,
  travelMode,
  setTravelMode,
  preferences,
  onTogglePreference,
  startLocId,
  setStartLocId,
  destLocId,
  setDestLocId,
  locations,
  onRecalculate,
}) => {
  if (!isOpen) return null;

  const isPreferenceActive = (pref: AccessibilityPreference) => preferences.includes(pref);

  const handleApply = () => {
    onRecalculate();
    onClose();
  };

  const preferenceItems: Array<{ id: AccessibilityPreference; label: string }> = [
    { id: 'step-free', label: 'Step-free route' },
    { id: 'avoid-stairs', label: 'Avoid stairs' },
    { id: 'working-elevators', label: 'Working elevators' },
    { id: 'fewer-obstacles', label: 'Fewer obstacles' },
    { id: 'low-incline', label: 'Gentle slopes (< 3%)' },
    { id: 'audio-signals', label: 'Audio crosswalks' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modify-preferences-title"
    >
      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-black/[0.08] w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4.5 border-b border-black/[0.06] flex items-center justify-between bg-[#F5F5F7]/80">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
            <h2 id="modify-preferences-title" className="font-bold text-[#1D1D1F] text-[17px] tracking-tight">
              Edit Priorities & Locations
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.10] text-[#6E6E73] hover:text-[#1D1D1F] flex items-center justify-center apple-press transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="p-6 space-y-5 text-[14px]">
          {/* Change Locations */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Starting Location
              </label>
              <div className="relative">
                <select
                  value={startLocId}
                  onChange={(e) => setStartLocId(e.target.value)}
                  className="w-full appearance-none bg-[#F5F5F7] border border-black/[0.08] rounded-[16px] px-3.5 py-2.5 text-[13px] font-semibold text-[#1D1D1F] pr-8 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                >
                  {locations.map(loc => (
                    <option key={`s-${loc.id}`} value={loc.id} disabled={loc.id === destLocId}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#8E8E93]">
                  <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Destination
              </label>
              <div className="relative">
                <select
                  value={destLocId}
                  onChange={(e) => setDestLocId(e.target.value)}
                  className="w-full appearance-none bg-[#F5F5F7] border border-black/[0.08] rounded-[16px] px-3.5 py-2.5 text-[13px] font-semibold text-[#1D1D1F] pr-8 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                >
                  {locations.map(loc => (
                    <option key={`d-${loc.id}`} value={loc.id} disabled={loc.id === startLocId}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#8E8E93]">
                  <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>

          {/* Travel Mode Segmented Control */}
          <div className="space-y-1.5 pt-2 border-t border-black/[0.06]">
            <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              Travel Mode
            </label>
            <div className="p-1 bg-[#E8E8ED] rounded-full flex items-center border border-black/[0.04]">
              <button
                type="button"
                onClick={() => setTravelMode('wheelchair')}
                className={`flex-1 py-1.5 px-3 rounded-full text-[13px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                  travelMode === 'wheelchair'
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.10)] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                <Accessibility className="w-3.5 h-3.5 text-[#0071E3]" strokeWidth={1.75} />
                <span>Wheelchair</span>
              </button>
              <button
                type="button"
                onClick={() => setTravelMode('walk')}
                className={`flex-1 py-1.5 px-3 rounded-full text-[13px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                  travelMode === 'walk'
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.10)] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                <Footprints className="w-3.5 h-3.5 text-[#6E6E73]" strokeWidth={1.75} />
                <span>Walking</span>
              </button>
              <button
                type="button"
                onClick={() => setTravelMode('transit')}
                className={`flex-1 py-1.5 px-3 rounded-full text-[13px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                  travelMode === 'transit'
                    ? 'bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(0,0,0,0.10)] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                <Bus className="w-3.5 h-3.5 text-[#0071E3]" strokeWidth={1.75} />
                <span>Transit</span>
              </button>
            </div>
          </div>

          {/* Accessibility Chips */}
          <div className="space-y-2 pt-2 border-t border-black/[0.06]">
            <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              Priorities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {preferenceItems.map((pref) => {
                const active = isPreferenceActive(pref.id);
                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => onTogglePreference(pref.id)}
                    className={`py-2 px-3 rounded-full text-[12px] font-medium border text-left transition-all apple-press flex items-center gap-2 ${
                      active
                        ? 'bg-[#0071E3]/[0.08] border-[#0071E3]/40 text-[#1D1D1F] ring-1 ring-[#0071E3]/30 font-semibold'
                        : 'bg-[#F5F5F7] border-black/[0.06] text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border ${
                      active ? 'bg-[#0071E3] border-[#0071E3] text-white' : 'border-[#AEAEB2] bg-white'
                    }`}>
                      {active && <Check className="w-2.5 h-2.5" strokeWidth={2.5} />}
                    </div>
                    <span className="truncate">{pref.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#F5F5F7]/80 border-t border-black/[0.06] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-black/[0.08] text-[13px] font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white apple-press transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] text-white text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,113,227,0.22)] apple-press transition-all"
          >
            Recalculate Routes
          </button>
        </div>
      </div>
    </div>
  );
};
