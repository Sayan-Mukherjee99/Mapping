import React, { useState, useEffect, useRef } from 'react';
import { RealPlace } from '../types';
import { searchFreeRealPlaces } from '../services/geocoding';
import { 
  MapPin, 
  Search, 
  Globe2, 
  X, 
  Loader2, 
  Check, 
  Building2 
} from 'lucide-react';

interface RealPlaceAutocompleteProps {
  label: string;
  dotColor: string;
  selectedPlace: RealPlace;
  onSelectPlace: (place: RealPlace) => void;
  placeholder?: string;
}

export const RealPlaceAutocomplete: React.FC<RealPlaceAutocompleteProps> = ({
  label,
  dotColor,
  selectedPlace,
  onSelectPlace,
  placeholder = 'Search real places, landmarks, or streets...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(selectedPlace.name);
  const [suggestions, setSuggestions] = useState<RealPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync input when selectedPlace changes externally (e.g. from Swap button)
  useEffect(() => {
    setInputValue(selectedPlace.name);
  }, [selectedPlace]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced live search
  useEffect(() => {
    if (!isOpen || inputValue.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    // If input equals current selection, don't trigger search
    if (inputValue === selectedPlace.name) {
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchFreeRealPlaces(inputValue);
        setSuggestions(results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [inputValue, isOpen, selectedPlace.name]);

  const handleSelect = (place: RealPlace) => {
    setInputValue(place.name);
    onSelectPlace(place);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="space-y-1.5 bg-[#F5F5F7] p-4 rounded-[18px] border border-black/[0.06] transition-all focus-within:ring-2 focus-within:ring-[#0071E3] focus-within:border-transparent">
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
            {label}
          </span>
          {selectedPlace.isRealLocation ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-[#0071E3] font-medium bg-[#0071E3]/[0.08] px-2 py-0.5 rounded-full">
              <Globe2 className="w-2.5 h-2.5" />
              Real Place (OSM Free)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] text-[#6E6E73] font-medium bg-black/[0.04] px-2 py-0.5 rounded-full">
              <Building2 className="w-2.5 h-2.5" />
              Civic Preset
            </span>
          )}
        </label>

        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            placeholder={placeholder}
            className="w-full bg-transparent py-1 text-[#1D1D1F] font-semibold text-[15px] focus:outline-none placeholder:text-[#8E8E93] pr-7 tracking-tight"
          />

          <div className="absolute right-0 flex items-center">
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-[#0071E3] animate-spin" />
            ) : inputValue ? (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-[#8E8E93] hover:text-[#1D1D1F] rounded-full transition-colors"
                title="Clear input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-[#8E8E93]" />
            )}
          </div>
        </div>

        <p className="text-[12px] text-[#86868B] truncate pt-0.5">
          {selectedPlace.address || selectedPlace.name}
        </p>
      </div>

      {/* Live Suggestions Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white/95 backdrop-blur-xl rounded-[22px] border border-black/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2 border-b border-black/[0.04] bg-[#F5F5F7]/80 flex items-center justify-between text-[11px] text-[#6E6E73] px-3.5">
            <span>Real-World Free Search (OpenStreetMap)</span>
            {isLoading && <span className="text-[#0071E3] font-medium">Searching live...</span>}
          </div>

          <ul className="max-h-64 overflow-y-auto divide-y divide-black/[0.04]">
            {suggestions.length > 0 ? (
              suggestions.map((place) => {
                const isSelected = place.id === selectedPlace.id;
                return (
                  <li
                    key={place.id}
                    onClick={() => handleSelect(place)}
                    className={`px-4 py-3 hover:bg-[#F5F5F7] cursor-pointer flex items-start justify-between gap-3 transition-colors ${
                      isSelected ? 'bg-[#0071E3]/[0.06]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-full bg-[#F5F5F7] border border-black/[0.06] text-[#0071E3] mt-0.5 shrink-0">
                        {place.isRealLocation ? (
                          <Globe2 className="w-3.5 h-3.5 text-[#0071E3]" strokeWidth={1.75} />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-[#34C759]" strokeWidth={1.75} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[14px] font-semibold text-[#1D1D1F] tracking-tight truncate">
                          {place.name}
                        </div>
                        <div className="text-[12px] text-[#6E6E73] truncate">
                          {place.address}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 pt-1">
                      {place.isRealLocation && (
                        <span className="text-[10px] font-medium text-[#0071E3] bg-[#0071E3]/[0.08] px-2 py-0.5 rounded-full">
                          Real
                        </span>
                      )}
                      {isSelected && <Check className="w-4 h-4 text-[#0071E3]" strokeWidth={2.5} />}
                    </div>
                  </li>
                );
              })
            ) : inputValue.length >= 2 ? (
              <li className="px-4 py-6 text-center text-[#8E8E93] text-[13px]">
                {isLoading ? (
                  <span>Querying real-world places...</span>
                ) : (
                  <div>
                    <p className="font-semibold text-[#1D1D1F]">No exact matches found</p>
                    <p className="text-[12px] text-[#6E6E73] mt-0.5">Try searching city, street name, or famous landmark (e.g. Times Square, Main St, Central Park).</p>
                  </div>
                )}
              </li>
            ) : (
              <li className="px-4 py-4 text-center text-[#8E8E93] text-[12px]">
                Type at least 2 characters to search worldwide places...
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
