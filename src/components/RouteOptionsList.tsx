import React from 'react';
import { RouteOption } from '../types';
import { 
  Accessibility, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface RouteOptionsListProps {
  routes: RouteOption[];
  activeRouteId: string;
  onSelectRoute: (id: string) => void;
  onOpenModifyPreferences: () => void;
}

export const RouteOptionsList: React.FC<RouteOptionsListProps> = ({
  routes,
  activeRouteId,
  onSelectRoute,
  onOpenModifyPreferences,
}) => {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-[17px] font-bold text-[#1D1D1F] tracking-tight">
            Available Routes ({routes.length})
          </h2>
          <p className="text-[13px] text-[#6E6E73]">
            Ranked by step-free accessibility & barrier audits
          </p>
        </div>
        <button
          onClick={onOpenModifyPreferences}
          className="text-[13px] font-medium text-[#0071E3] hover:text-[#0077ED] px-2.5 py-1 rounded-full hover:bg-black/[0.04] transition-colors apple-press"
        >
          Edit Priorities
        </button>
      </div>

      <div className="space-y-3">
        {routes.map((route) => {
          const isSelected = route.id === activeRouteId;
          const hasUrgent = route.urgentBarrierCount > 0;

          return (
            <div
              key={route.id}
              onClick={() => onSelectRoute(route.id)}
              className={`p-4 sm:p-5 rounded-[22px] border transition-all duration-200 cursor-pointer text-left apple-press relative ${
                isSelected
                  ? 'bg-white border-[#0071E3] ring-2 ring-[#0071E3]/20 shadow-[0_8px_28px_rgba(0,113,227,0.10)]'
                  : 'bg-white hover:bg-white/90 border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
              }`}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectRoute(route.id);
                }
              }}
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  route.isRecommended
                    ? 'bg-[#34C759]/[0.12] text-[#34C759]'
                    : hasUrgent
                    ? 'bg-[#FF3B30]/[0.12] text-[#FF3B30]'
                    : 'bg-black/[0.05] text-[#6E6E73]'
                }`}>
                  {route.isRecommended && <Sparkles className="w-3 h-3 mr-1 text-[#34C759]" strokeWidth={1.75} />}
                  {hasUrgent && <AlertTriangle className="w-3 h-3 mr-1 text-[#FF3B30]" strokeWidth={1.75} />}
                  {route.badge}
                </span>

                <div className="flex items-center gap-1.5 text-[13px] text-[#6E6E73]">
                  <span className="font-medium text-[#1D1D1F]">{route.distanceMiles} mi</span>
                  <span>·</span>
                  <span className="font-bold text-[#1D1D1F] text-[15px]">{route.durationMinutes} min</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-semibold text-[#1D1D1F] text-[15px] tracking-tight leading-snug">
                {route.name}
              </h3>
              <p className="text-[13px] text-[#6E6E73] mt-0.5 leading-relaxed">
                {route.subtitle}
              </p>

              {/* Pill Score Badges */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[12px]">
                {/* Step-Free Score */}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium ${
                  route.stepFreePercentage === 100
                    ? 'bg-[#34C759]/[0.12] text-[#34C759]'
                    : route.stepFreePercentage >= 80
                    ? 'bg-[#FF9F0A]/[0.14] text-[#D97706]'
                    : 'bg-[#FF3B30]/[0.12] text-[#FF3B30]'
                }`}>
                  <Accessibility className="w-3.5 h-3.5" strokeWidth={1.75} />
                  {route.stepFreePercentage}% Step-Free
                </span>

                {/* Incline */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium bg-[#F5F5F7] text-[#6E6E73] border border-black/[0.04]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#8E8E93]" strokeWidth={1.75} />
                  Max grade: {route.maxSlopePercent}%
                </span>

                {/* Barrier Count */}
                {route.barrierCount > 0 ? (
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium ${
                    hasUrgent 
                      ? 'bg-[#FF3B30]/[0.12] text-[#FF3B30] font-semibold' 
                      : 'bg-[#FF9F0A]/[0.14] text-[#D97706]'
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {route.barrierCount} {route.barrierCount === 1 ? 'alert' : 'alerts'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium bg-[#34C759]/[0.12] text-[#34C759]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" strokeWidth={1.75} />
                    0 Barriers
                  </span>
                )}
              </div>

              {/* Card Footer Indicator */}
              <div className="mt-3.5 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[13px]">
                <span className={`font-medium ${isSelected ? 'text-[#0071E3]' : 'text-[#8E8E93]'}`}>
                  {isSelected ? '✓ Selected Route' : 'Tap to inspect'}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#0071E3] translate-x-0.5' : 'text-[#AEAEB2]'}`} strokeWidth={1.75} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
