import React from 'react';
import { 
  Accessibility, 
  Plus, 
  Sparkles, 
  Info,
} from 'lucide-react';

interface HeaderProps {
  onOpenReportModal: () => void;
  onOpenAboutModal: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  activeView: 'planner' | 'results';
  onNavigateHome: () => void;
  reportsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReportModal,
  onOpenAboutModal,
  highContrast,
  onToggleHighContrast,
  onNavigateHome,
  reportsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 apple-glass border-b border-black/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={onNavigateHome}
              className="flex items-center space-x-2.5 text-left group rounded-full py-1 px-1.5 focus-visible:ring-2 focus-visible:ring-[#0071E3] apple-press"
              aria-label="AccessNow Home - Accessibility-Aware Trip Planner"
            >
              <div className="w-8 h-8 rounded-full bg-[#0071E3] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(0,113,227,0.28)] group-hover:bg-[#0077ED] transition-colors">
                <Accessibility className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-[17px] tracking-tight text-[#1D1D1F]">
                  Access<span className="text-[#0071E3]">Now</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/[0.04] text-[#6E6E73] border border-black/[0.06]">
                  Civic Pilot
                </span>
              </div>
            </button>
          </div>

          {/* Quick Action Center */}
          <div className="flex items-center space-x-2.5">
            {/* Contrast Mode Toggle */}
            <button
              onClick={onToggleHighContrast}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium border apple-press flex items-center gap-1.5 transition-all duration-200 ${
                highContrast 
                  ? 'bg-[#1D1D1F] text-white border-black ring-2 ring-[#0071E3]' 
                  : 'bg-white/80 hover:bg-white text-[#6E6E73] hover:text-[#1D1D1F] border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
              }`}
              title="Toggle Enhanced Contrast Mode"
              aria-pressed={highContrast}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF9F0A]" strokeWidth={1.75} />
              <span className="hidden md:inline">
                {highContrast ? 'Contrast: High' : 'Contrast'}
              </span>
            </button>

            {/* How it Works / Civic Verification Guide */}
            <button
              onClick={onOpenAboutModal}
              className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#6E6E73] hover:text-[#1D1D1F] bg-white/80 hover:bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.02)] apple-press flex items-center gap-1.5 transition-all duration-200"
              title="About Accessibility Verification & Community Audits"
            >
              <Info className="w-3.5 h-3.5 text-[#6E6E73]" strokeWidth={1.75} />
              <span className="hidden sm:inline">Verification Guide</span>
            </button>

            {/* Pill-Shaped Primary Action: Report an Issue */}
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[14px] font-medium bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] text-white shadow-[0_2px_8px_rgba(0,113,227,0.22)] apple-press transition-all duration-200"
              aria-label="Report an accessibility issue or barrier"
            >
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              <span className="hidden sm:inline">Report an Issue</span>
              <span className="sm:hidden">Report</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
