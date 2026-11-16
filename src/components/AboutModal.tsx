import React from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  Accessibility, 
  HeartHandshake
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-black/[0.08] w-full max-w-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-black/[0.06] flex items-center justify-between bg-[#F5F5F7]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0071E3]/[0.10] text-[#0071E3] flex items-center justify-center font-bold">
              <Accessibility className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h2 id="about-modal-title" className="font-bold text-[#1D1D1F] text-[17px] tracking-tight">
                How AccessNow Works
              </h2>
              <p className="text-[12px] text-[#6E6E73]">
                Civic routing, accessibility ratings & verification standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.10] text-[#6E6E73] hover:text-[#1D1D1F] flex items-center justify-center apple-press transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-[14px] text-[#6E6E73] leading-relaxed max-h-[75vh] overflow-y-auto">
          {/* Mission */}
          <section className="space-y-1.5">
            <h3 className="font-semibold text-[15px] text-[#1D1D1F] flex items-center gap-2 tracking-tight">
              <HeartHandshake className="w-4 h-4 text-[#0071E3]" strokeWidth={1.75} />
              Our Civic Mission
            </h3>
            <p>
              Standard navigation applications optimize strictly for speed, frequently routing wheelchairs and strollers into unexpected flights of stairs, steep inclines, or broken elevators. AccessNow integrates open civic data with crowd-audited reports to highlight step-free, low-effort routes.
            </p>
          </section>

          {/* Verification Statuses */}
          <section className="space-y-2">
            <h3 className="font-semibold text-[15px] text-[#1D1D1F] flex items-center gap-2 tracking-tight">
              <ShieldCheck className="w-4 h-4 text-[#34C759]" strokeWidth={1.75} />
              Report Status Categories
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-[16px] bg-[#34C759]/[0.08] border border-[#34C759]/20 flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded-full bg-[#34C759] text-white font-bold text-[10px] shrink-0 mt-0.5">
                  VERIFIED
                </span>
                <div className="text-[13px] text-[#1D1D1F]">
                  <strong className="text-[#1D1D1F]">Verified Report:</strong> Confirmed by official transit agency work orders, municipal DPW data feeds, or multiple community audits within the last 24 hours.
                </div>
              </div>

              <div className="p-3 rounded-[16px] bg-[#FF9F0A]/[0.08] border border-[#FF9F0A]/20 flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded-full bg-[#FF9F0A] text-white font-bold text-[10px] shrink-0 mt-0.5">
                  UNVERIFIED
                </span>
                <div className="text-[13px] text-[#1D1D1F]">
                  <strong className="text-[#1D1D1F]">Unverified Alert:</strong> Submitted recently by a single civic contributor. Awaiting peer cross-verification. Exercise extra caution.
                </div>
              </div>

              <div className="p-3 rounded-[16px] bg-black/[0.04] border border-black/[0.06] flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded-full bg-[#8E8E93] text-white font-bold text-[10px] shrink-0 mt-0.5">
                  RESOLVED
                </span>
                <div className="text-[13px] text-[#1D1D1F]">
                  <strong className="text-[#1D1D1F]">Resolved Item:</strong> Obstacle has been inspected and cleared (e.g. repaired lift or cleared walkway). Kept for community transparency.
                </div>
              </div>
            </div>
          </section>

          {/* Uncertainty */}
          <section className="space-y-1.5 bg-[#F5F5F7] p-4 rounded-[18px] border border-black/[0.06]">
            <h3 className="font-semibold text-[#1D1D1F] text-[14px] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FF9F0A]" strokeWidth={1.75} />
              Uncertainty Transparency
            </h3>
            <p className="text-[13px] text-[#6E6E73] leading-relaxed">
              Street environments change unpredictably: delivery trucks may temporarily block a ramp, or a mechanical elevator may glitch midday. AccessNow surfaces uncertainty upfront so travelers can plan reliable detours.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F5F5F7]/80 border-t border-black/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#1D1D1F] hover:bg-black text-white font-semibold text-[13px] apple-press transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
