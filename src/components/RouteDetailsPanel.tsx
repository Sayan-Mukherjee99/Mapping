import React, { useState } from 'react';
import { RouteOption } from '../types';
import { 
  Navigation, 
  Clock, 
  Accessibility, 
  AlertTriangle, 
  CheckCircle2, 
  CornerDownRight, 
  CornerDownLeft, 
  ArrowUp, 
  Volume2, 
  Car,
  Bike,
  Footprints,
  Share2, 
  Printer, 
  ShieldAlert, 
  Check,
} from 'lucide-react';

interface RouteDetailsPanelProps {
  route: RouteOption;
  onOpenReportModal: () => void;
  onSelectBarrier: (barrierId: string) => void;
}

export const RouteDetailsPanel: React.FC<RouteDetailsPanelProps> = ({
  route,
  onOpenReportModal,
  onSelectBarrier,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const getStepIcon = (actionType: string) => {
    switch (actionType) {
      case 'start':
        return <div className="w-6 h-6 rounded-full bg-[#34C759] text-white flex items-center justify-center text-[11px] font-bold">A</div>;
      case 'destination':
        return <div className="w-6 h-6 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-[11px] font-bold">B</div>;
      case 'turn-left':
        return <CornerDownLeft className="w-4 h-4 text-[#6E6E73]" strokeWidth={1.75} />;
      case 'turn-right':
        return <CornerDownRight className="w-4 h-4 text-[#6E6E73]" strokeWidth={1.75} />;
      case 'crossing':
        return <Volume2 className="w-4 h-4 text-[#34C759]" strokeWidth={1.75} />;
      case 'drive':
        return <Car className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />;
      case 'bike':
        return <Bike className="w-4 h-4 text-[#34C759]" strokeWidth={1.75} />;
      case 'walk':
        return <Footprints className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />;
      default:
        return <ArrowUp className="w-4 h-4 text-[#6E6E73]" strokeWidth={1.75} />;
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Route Summary Bento Card */}
      <div className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06]">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0071E3]/[0.10] text-[#0071E3]">
              {route.badge}
            </span>
            <h2 className="text-[19px] font-bold text-[#1D1D1F] tracking-tight mt-1.5">
              {route.name}
            </h2>
            <p className="text-[13px] text-[#6E6E73] mt-0.5">
              {route.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[13px] font-medium text-[#1D1D1F] apple-press transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#34C759]" strokeWidth={2} /> : <Share2 className="w-3.5 h-3.5 text-[#6E6E73]" strokeWidth={1.75} />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[13px] font-medium text-[#1D1D1F] apple-press transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-[#6E6E73]" strokeWidth={1.75} />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Accessibility Metrics Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          <div className="bg-[#F5F5F7] p-3 rounded-[18px] border border-black/[0.04]">
            <span className="text-[11px] uppercase font-semibold text-[#86868B] tracking-wider">Step-Free</span>
            <div className="text-[18px] font-bold text-[#34C759] flex items-center gap-1 mt-0.5 tracking-tight">
              <Accessibility className="w-4 h-4 text-[#34C759]" strokeWidth={1.75} />
              {route.stepFreePercentage}%
            </div>
            <span className="text-[11px] text-[#86868B]">Continuous ramps</span>
          </div>

          <div className="bg-[#F5F5F7] p-3 rounded-[18px] border border-black/[0.04]">
            <span className="text-[11px] uppercase font-semibold text-[#86868B] tracking-wider">Est. Duration</span>
            <div className="text-[18px] font-bold text-[#1D1D1F] flex items-center gap-1 mt-0.5 tracking-tight">
              <Clock className="w-4 h-4 text-[#6E6E73]" strokeWidth={1.75} />
              {route.durationMinutes} min
            </div>
            <span className="text-[11px] text-[#86868B]">{route.distanceMiles} miles</span>
          </div>

          <div className="bg-[#F5F5F7] p-3 rounded-[18px] border border-black/[0.04]">
            <span className="text-[11px] uppercase font-semibold text-[#86868B] tracking-wider">Max Slope</span>
            <div className="text-[18px] font-bold text-[#1D1D1F] mt-0.5 tracking-tight">
              {route.maxSlopePercent}%
            </div>
            <span className="text-[11px] text-[#86868B]">
              {route.maxSlopePercent <= 3 ? 'Gentle grade' : 'Moderate incline'}
            </span>
          </div>

          <div className="bg-[#F5F5F7] p-3 rounded-[18px] border border-black/[0.04]">
            <span className="text-[11px] uppercase font-semibold text-[#86868B] tracking-wider">Active Alerts</span>
            <div className={`text-[18px] font-bold flex items-center gap-1 mt-0.5 tracking-tight ${
              route.barrierCount > 0 ? 'text-[#FF9F0A]' : 'text-[#34C759]'
            }`}>
              {route.barrierCount > 0 ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-[#FF9F0A]" strokeWidth={1.75} />
                  {route.barrierCount}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#34C759]" strokeWidth={1.75} />
                  Clear
                </>
              )}
            </div>
            <span className="text-[11px] text-[#86868B]">
              {route.urgentBarrierCount > 0 ? `${route.urgentBarrierCount} urgent barrier` : 'Audited'}
            </span>
          </div>
        </div>

        {/* Highlights & Caveats */}
        <div className="mt-4 pt-3.5 border-t border-black/[0.06] space-y-3">
          <div className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider">Route Highlights</span>
            <ul className="text-[13px] text-[#1D1D1F] space-y-1">
              {route.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#34C759] shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {route.caveats.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[12px] font-semibold text-[#FF9F0A] uppercase tracking-wider">Cautions & Detours</span>
              <ul className="text-[13px] text-[#1D1D1F] space-y-1.5 bg-[#FF9F0A]/[0.10] p-3 rounded-[16px] border border-[#FF9F0A]/20">
                {route.caveats.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#FF9F0A] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Civic Disclaimer - Apple Style Caution Bento */}
      <div className="bg-[#FF9F0A]/[0.08] border border-[#FF9F0A]/25 rounded-[22px] p-4 sm:p-5 text-[13px] text-[#1D1D1F] flex items-start gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="w-7 h-7 rounded-full bg-[#FF9F0A] text-white flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" strokeWidth={1.75} />
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-[#1D1D1F] flex items-center gap-2">
            <span>Community Accessibility Notice</span>
            <span className="text-[10px] bg-[#FF9F0A]/20 text-[#D97706] px-2 py-0.5 rounded-full font-bold">
              UNVERIFIED RISK NOTICE
            </span>
          </div>
          <p className="leading-relaxed text-[#6E6E73]">
            Accessibility information is compiled from public transit agencies and civic reports. Because construction, broken elevator lifts, or blocked curb cuts can emerge without notice, survey conditions before traveling.
          </p>
        </div>
      </div>

      {/* Step-by-Step Directions Bento Card */}
      <div className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5 sm:p-6">
        <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
          <div>
            <h3 className="font-bold text-[#1D1D1F] text-[16px] tracking-tight flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
              Turn-by-Turn Directions ({route.steps.length} Steps)
            </h3>
            <p className="text-[12px] text-[#6E6E73]">
              Includes tactile guidance and doorway clearance
            </p>
          </div>

          <button
            onClick={() => setIsNavigating(!isNavigating)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all apple-press flex items-center gap-1.5 ${
              isNavigating 
                ? 'bg-[#0071E3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.25)]' 
                : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] border border-black/[0.06]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>{isNavigating ? 'Exit Demo Nav' : 'Simulate Turns'}</span>
          </button>
        </div>

        {/* Turn-by-Turn Simulator Strip */}
        {isNavigating && (
          <div className="mt-3.5 p-3.5 bg-[#0071E3]/[0.08] border border-[#0071E3]/20 rounded-[18px]">
            <div className="flex items-center justify-between text-[12px] font-semibold text-[#0071E3] mb-2">
              <span>SIMULATION: Step {activeStepIndex + 1} of {route.steps.length}</span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  className="px-2.5 py-0.5 rounded-full bg-white border border-[#0071E3]/30 text-[#0071E3] disabled:opacity-40 text-[11px] font-semibold apple-press"
                >
                  Previous
                </button>
                <button
                  disabled={activeStepIndex === route.steps.length - 1}
                  onClick={() => setActiveStepIndex(prev => Math.min(route.steps.length - 1, prev + 1))}
                  className="px-2.5 py-0.5 rounded-full bg-[#0071E3] text-white disabled:opacity-40 text-[11px] font-semibold apple-press"
                >
                  Next Step
                </button>
              </div>
            </div>
            <p className="text-[13px] text-[#1D1D1F] font-medium">
              {route.steps[activeStepIndex]?.instruction}
            </p>
          </div>
        )}

        {/* Steps List */}
        <div className="mt-4 divide-y divide-black/[0.06]">
          {route.steps.map((step, idx) => {
            const isCurrentSimulated = isNavigating && activeStepIndex === idx;

            return (
              <div 
                key={step.id} 
                className={`py-3.5 first:pt-1 last:pb-1 transition-colors ${
                  isCurrentSimulated ? 'bg-[#0071E3]/[0.06] -mx-3 px-3 rounded-[16px]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-[#F5F5F7] border border-black/[0.06] shrink-0">
                    {getStepIcon(step.actionType)}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[14px] font-semibold text-[#1D1D1F] tracking-tight">
                        {step.instruction}
                      </p>
                      <span className="text-[12px] font-medium text-[#86868B] whitespace-nowrap">
                        {step.distance}
                      </span>
                    </div>

                    {step.accessibilityNote && (
                      <p className="text-[12px] text-[#0071E3] bg-[#0071E3]/[0.08] px-3 py-1 rounded-full border border-[#0071E3]/15 font-medium inline-block">
                        ♿ {step.accessibilityNote}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-[12px] text-[#86868B] pt-0.5">
                      <span>Surface: {step.surface}</span>
                      {step.incline && (
                        <>
                          <span>·</span>
                          <span>Incline: {step.incline}</span>
                        </>
                      )}
                      <span>·</span>
                      <span>~{step.duration}</span>
                    </div>

                    {/* Barrier Warning Callout */}
                    {step.barrierWarning && (
                      <div className={`mt-2 p-3 rounded-[16px] border text-[12px] flex items-start gap-2.5 ${
                        step.barrierWarning.severity === 'urgent'
                          ? 'bg-[#FF3B30]/[0.08] border-[#FF3B30]/25 text-[#FF3B30]'
                          : 'bg-[#FF9F0A]/[0.08] border-[#FF9F0A]/25 text-[#D97706]'
                      }`}>
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.75} />
                        <div className="flex-1">
                          <p className="font-semibold text-[#1D1D1F]">
                            {step.barrierWarning.message}
                          </p>
                          <button
                            onClick={() => onSelectBarrier(step.barrierWarning!.barrierId)}
                            className="mt-1 text-[11px] font-semibold text-[#0071E3] hover:underline"
                          >
                            View barrier on map →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Report New Barrier along this path */}
        <div className="mt-5 pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
          <span className="text-[12px] text-[#86868B]">
            Spotted an unexpected barrier or broken elevator?
          </span>
          <button
            onClick={onOpenReportModal}
            className="text-[12px] font-semibold text-[#0071E3] hover:text-[#0077ED] apple-press"
          >
            + Report an issue along this route
          </button>
        </div>
      </div>
    </div>
  );
};
