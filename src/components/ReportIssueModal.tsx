import React, { useState } from 'react';
import { 
  BarrierType, 
  BarrierSeverity, 
  BarrierReport, 
  LocationPreset 
} from '../types';
import { 
  X, 
  AlertTriangle, 
  Camera, 
  CheckCircle2, 
} from 'lucide-react';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (report: Omit<BarrierReport, 'id' | 'createdAt' | 'reportedAt' | 'upvotes' | 'affectedRouteIds'>) => void;
  locations: LocationPreset[];
  initialLocation?: string;
}

const SAMPLE_PHOTOS = [
  {
    name: 'Broken Elevator Sign',
    url: 'https://images.unsplash.com/photo-1579618218290-24a26f63a728?auto=format&fit=crop&w=600&q=80',
    type: 'broken-elevator' as BarrierType,
  },
  {
    name: 'Blocked Curb Ramp',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    type: 'blocked-ramp' as BarrierType,
  },
  {
    name: 'Sidewalk Trench',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
    type: 'construction' as BarrierType,
  },
];

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
  locations,
  initialLocation = '',
}) => {
  const [barrierType, setBarrierType] = useState<BarrierType>('blocked-ramp');
  const [title, setTitle] = useState<string>('');
  const [locationName, setLocationName] = useState<string>(initialLocation || '5th Ave & Market St');
  const [severity, setSeverity] = useState<BarrierSeverity>('urgent');
  const [description, setDescription] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [reportedBy, setReportedBy] = useState<string>('Civic Contributor');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) {
      errs.title = 'Please enter a summary title for this barrier';
    }
    if (!locationName.trim()) {
      errs.locationName = 'Please enter or select a location';
    }
    if (!description.trim() || description.length < 10) {
      errs.description = 'Please provide details on the barrier (min 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const matchedLoc = locations.find(l => l.name.toLowerCase().includes(locationName.toLowerCase()));
    const xCoord = matchedLoc ? matchedLoc.x + (Math.random() * 40 - 20) : 480 + (Math.random() * 60 - 30);
    const yCoord = matchedLoc ? matchedLoc.y + (Math.random() * 40 - 20) : 420 + (Math.random() * 60 - 30);

    onSubmitReport({
      type: barrierType,
      title: title.trim(),
      locationName: locationName.trim(),
      x: Math.round(xCoord),
      y: Math.round(yCoord),
      description: description.trim(),
      status: 'unverified',
      severity,
      reportedBy: isAnonymous ? 'Anonymous Contributor' : (reportedBy.trim() || 'Civic Contributor'),
      photoUrl: photoUrl || undefined,
    });

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setTitle('');
    setDescription('');
    setPhotoUrl('');
    setErrors({});
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-black/[0.08] w-full max-w-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Apple Style Modal Header */}
        <div className="px-6 py-4.5 border-b border-black/[0.06] flex items-center justify-between bg-[#F5F5F7]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF9F0A]/[0.15] text-[#FF9F0A] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h2 id="report-modal-title" className="font-bold text-[#1D1D1F] text-[17px] tracking-tight">
                Report an Accessibility Barrier
              </h2>
              <p className="text-[12px] text-[#6E6E73]">
                Contribute real-time audits to fellow travelers
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.10] text-[#6E6E73] hover:text-[#1D1D1F] flex items-center justify-center apple-press transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Modal Body */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#34C759]/[0.14] text-[#34C759] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" strokeWidth={1.75} />
            </div>
            <h3 className="text-[22px] font-bold text-[#1D1D1F] tracking-tight">
              Report Submitted Successfully
            </h3>
            <p className="text-[14px] text-[#6E6E73] max-w-md mx-auto leading-relaxed">
              Your report <strong className="text-[#1D1D1F]">“{title}”</strong> is now live on the AccessNow district map tagged as an <span className="text-[#D97706] font-semibold bg-[#FF9F0A]/[0.14] px-2 py-0.5 rounded-full text-[12px]">Unverified Alert</span>.
            </p>
            <div className="bg-[#F5F5F7] p-4 rounded-[18px] border border-black/[0.06] text-[13px] text-[#1D1D1F] text-left space-y-1.5">
              <p>📍 <strong>Location:</strong> {locationName}</p>
              <p>⚠️ <strong>Severity:</strong> {severity.toUpperCase()}</p>
              <p>🤝 <strong>Next Step:</strong> Nearby commuters and transit riders will be prompted to verify or clear the report.</p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3.5 px-5 rounded-full font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] shadow-[0_2px_12px_rgba(0,113,227,0.25)] apple-press transition-all"
              >
                View on Map & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
            {/* Barrier Type */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Barrier Type <span className="text-[#FF3B30]">*</span>
              </label>
              <select
                value={barrierType}
                onChange={(e) => setBarrierType(e.target.value as BarrierType)}
                className="w-full bg-[#F5F5F7] border border-black/[0.08] rounded-[16px] px-3.5 py-2.5 text-[14px] font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              >
                <option value="broken-elevator">Broken Elevator / Lift Out of Service</option>
                <option value="blocked-ramp">Blocked Ramp / Vehicle Obstructing Curb Cut</option>
                <option value="stairs-only">Stairs Only / Missing Ramp or Handrail</option>
                <option value="construction">Construction Scaffolding / Sidewalk Trench</option>
                <option value="narrow-path">Narrow Walkway (&lt; 36" clearance) / Debris</option>
                <option value="damaged-surface">Buckled Pavers / Tree Roots / Rough Surface</option>
                <option value="heavy-door">Heavy Non-Automated Door / High Threshold</option>
              </select>
            </div>

            {/* Title / Summary */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Issue Summary <span className="text-[#FF3B30]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Elevator doors stuck open at North entrance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full bg-[#F5F5F7] border rounded-[16px] px-3.5 py-2.5 text-[14px] font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3] ${
                  errors.title ? 'border-[#FF3B30] bg-[#FF3B30]/[0.05]' : 'border-black/[0.08]'
                }`}
              />
              {errors.title && <p className="text-[12px] text-[#FF3B30]">{errors.title}</p>}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Location & Cross Street <span className="text-[#FF3B30]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 5th Ave & Market St, Metro West Concourse"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className={`w-full bg-[#F5F5F7] border rounded-[16px] px-3.5 py-2.5 text-[14px] font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3] ${
                  errors.locationName ? 'border-[#FF3B30] bg-[#FF3B30]/[0.05]' : 'border-black/[0.08]'
                }`}
              />
              {errors.locationName && <p className="text-[12px] text-[#FF3B30]">{errors.locationName}</p>}

              {/* Quick Pick Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-[#86868B] py-0.5">Quick pick:</span>
                {locations.slice(0, 4).map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setLocationName(loc.name)}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#6E6E73] hover:text-[#1D1D1F] border border-black/[0.06] transition-colors"
                  >
                    {loc.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Apple Segmented Severity Picker */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Severity Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSeverity('urgent')}
                  className={`p-2.5 rounded-[16px] border text-center transition-all apple-press ${
                    severity === 'urgent'
                      ? 'bg-[#FF3B30]/[0.12] border-[#FF3B30]/40 text-[#FF3B30] ring-1 ring-[#FF3B30]/30 font-semibold'
                      : 'bg-[#F5F5F7] border-black/[0.06] text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  <div className="text-[13px] font-semibold">Urgent</div>
                  <div className="text-[10px] text-[#86868B]">Impassable</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeverity('moderate')}
                  className={`p-2.5 rounded-[16px] border text-center transition-all apple-press ${
                    severity === 'moderate'
                      ? 'bg-[#FF9F0A]/[0.14] border-[#FF9F0A]/40 text-[#D97706] ring-1 ring-[#FF9F0A]/30 font-semibold'
                      : 'bg-[#F5F5F7] border-black/[0.06] text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  <div className="text-[13px] font-semibold">Moderate</div>
                  <div className="text-[10px] text-[#86868B]">Detour needed</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeverity('minor')}
                  className={`p-2.5 rounded-[16px] border text-center transition-all apple-press ${
                    severity === 'minor'
                      ? 'bg-[#34C759]/[0.12] border-[#34C759]/40 text-[#34C759] ring-1 ring-[#34C759]/30 font-semibold'
                      : 'bg-[#F5F5F7] border-black/[0.06] text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  <div className="text-[13px] font-semibold">Minor</div>
                  <div className="text-[10px] text-[#86868B]">Informational</div>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Description & Notes <span className="text-[#FF3B30]">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe the exact obstacle, direction, and step-free detour options..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full bg-[#F5F5F7] border rounded-[16px] px-3.5 py-2.5 text-[14px] font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3] ${
                  errors.description ? 'border-[#FF3B30] bg-[#FF3B30]/[0.05]' : 'border-black/[0.08]'
                }`}
              ></textarea>
              {errors.description && <p className="text-[12px] text-[#FF3B30]">{errors.description}</p>}
            </div>

            {/* Photo Attachment UI */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                Photo Attachment (Optional)
              </label>

              {photoUrl ? (
                <div className="relative rounded-[16px] overflow-hidden border border-black/[0.08] h-32 bg-[#F5F5F7]">
                  <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                    title="Remove photo"
                  >
                    <X className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </div>
              ) : (
                <div className="border border-dashed border-black/[0.12] hover:border-[#0071E3] rounded-[18px] p-4 text-center transition-colors bg-[#F5F5F7]/50">
                  <Camera className="w-6 h-6 text-[#8E8E93] mx-auto mb-1.5" strokeWidth={1.75} />
                  <p className="text-[13px] text-[#6E6E73] font-medium">
                    Upload photo evidence
                  </p>
                  <label className="mt-2 inline-block px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F5F5F7] border border-black/[0.08] text-[12px] font-semibold text-[#1D1D1F] cursor-pointer apple-press transition-colors shadow-xs">
                    Browse File
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>

                  {/* Preset 1-Click Demo Photos */}
                  <div className="mt-3 pt-2.5 border-t border-black/[0.06]">
                    <span className="text-[11px] text-[#86868B] block mb-1.5">Or choose a demo sample:</span>
                    <div className="flex justify-center gap-1.5">
                      {SAMPLE_PHOTOS.map((sample, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setPhotoUrl(sample.url);
                            setBarrierType(sample.type);
                            setTitle(sample.name);
                          }}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white hover:bg-[#F5F5F7] text-[#0071E3] border border-black/[0.08] transition-colors apple-press"
                        >
                          + {sample.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Anonymous Toggle */}
            <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous-check"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-[#0071E3] focus:ring-[#0071E3] w-4 h-4"
                />
                <label htmlFor="anonymous-check" className="text-[#1D1D1F] font-medium cursor-pointer">
                  Submit anonymously
                </label>
              </div>

              {!isAnonymous && (
                <div className="w-44">
                  <input
                    type="text"
                    value={reportedBy}
                    onChange={(e) => setReportedBy(e.target.value)}
                    placeholder="Your Name"
                    className="w-full text-[12px] bg-[#F5F5F7] border border-black/[0.08] rounded-full px-3 py-1 text-[#1D1D1F]"
                  />
                </div>
              )}
            </div>

            {/* Pill-Shaped Action Buttons */}
            <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-black/[0.06]">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-full border border-black/[0.08] text-[13px] font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] apple-press transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] text-white font-semibold text-[13px] shadow-[0_2px_8px_rgba(0,113,227,0.22)] apple-press transition-all"
              >
                Publish Barrier Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
