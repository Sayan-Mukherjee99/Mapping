import React, { useState, useRef } from 'react';
import { 
  BarrierReport, 
  RouteOption, 
  LocationPreset 
} from '../types';
import { 
  AlertTriangle, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Volume2, 
  Bike, 
  Navigation, 
  Clock, 
  ThumbsUp, 
  X, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface InteractiveMapProps {
  locations: LocationPreset[];
  routes: RouteOption[];
  activeRouteId: string;
  onSelectRoute: (routeId: string) => void;
  barriers: BarrierReport[];
  selectedBarrierId: string | null;
  onSelectBarrier: (barrierId: string | null) => void;
  onConfirmBarrier: (barrierId: string) => void;
  onResolveBarrier: (barrierId: string) => void;
  startLocId?: string;
  destLocId?: string;
  startPlace?: { name: string; shortLabel: string; address: string; x: number; y: number };
  destPlace?: { name: string; shortLabel: string; address: string; x: number; y: number };
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  routes,
  activeRouteId,
  onSelectRoute,
  barriers,
  selectedBarrierId,
  onSelectBarrier,
  onConfirmBarrier,
  onResolveBarrier,
  startLocId,
  destLocId,
  startPlace,
  destPlace,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showBarriersLayer, setShowBarriersLayer] = useState<boolean>(true);
  const [showTransitLayer, setShowTransitLayer] = useState<boolean>(true);
  const [showCrosswalksLayer, setShowCrosswalksLayer] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const startLoc = startPlace || locations.find(l => l.id === startLocId) || locations[0];
  const destLoc = destPlace || locations.find(l => l.id === destLocId) || locations[2];
  const activeRoute = routes.find(r => r.id === activeRouteId) || routes[0];
  const selectedBarrier = barriers.find(b => b.id === selectedBarrierId) || null;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(2.0, Number((prev + 0.25).toFixed(2))));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0.75, Number((prev - 0.25).toFixed(2))));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const createSvgPath = (points: Array<{ x: number; y: number }>) => {
    if (!points || points.length === 0) return '';
    return points.reduce((acc, pt, idx) => {
      if (idx === 0) return `M ${pt.x} ${pt.y}`;
      return `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  };

  const audioCrosswalks = [
    { x: 180, y: 520, name: 'Grand Concourse & Broad St Audio Crosswalk' },
    { x: 360, y: 520, name: 'Civic Way & Broad St Tactile Crosswalk' },
    { x: 520, y: 380, name: 'Market St & 5th Ave Audio Chirp' },
    { x: 720, y: 380, name: 'Hospital Blvd & Market Audio Signal' },
  ];

  return (
    <div 
      ref={mapContainerRef}
      className="relative w-full h-[520px] lg:h-[660px] bg-white rounded-[24px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden select-none"
      role="region"
      aria-label="Stylized Civic Area Map with accessibility layers and barrier alerts"
    >
      {/* Floating Frosted Glass Map Controls - Top Right */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end space-y-2.5">
        {/* Zoom Controls */}
        <div className="flex flex-col apple-glass rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.08] p-1 divide-y divide-black/[0.06]">
          <button
            onClick={handleZoomIn}
            className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] apple-press rounded-full"
            title="Zoom In"
            aria-label="Zoom in on map"
          >
            <ZoomIn className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] apple-press rounded-full"
            title="Zoom Out"
            aria-label="Zoom out of map"
          >
            <ZoomOut className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] apple-press rounded-full"
            title="Reset Map View"
            aria-label="Reset map view"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Layer Toggles */}
        <div className="apple-glass p-1.5 rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.08] flex flex-col space-y-1 text-[12px]">
          <button
            onClick={() => setShowBarriersLayer(!showBarriersLayer)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 apple-press text-left ${
              showBarriersLayer 
                ? 'bg-[#FF9F0A]/[0.15] text-[#1D1D1F] font-semibold border border-[#FF9F0A]/30' 
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF9F0A] shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">Barriers ({barriers.filter(b => b.status !== 'resolved').length})</span>
          </button>

          <button
            onClick={() => setShowTransitLayer(!showTransitLayer)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 apple-press text-left ${
              showTransitLayer 
                ? 'bg-[#0071E3]/[0.12] text-[#0071E3] font-semibold border border-[#0071E3]/25' 
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <Bike className="w-3.5 h-3.5 text-[#0071E3] shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">Cycleways</span>
          </button>

          <button
            onClick={() => setShowCrosswalksLayer(!showCrosswalksLayer)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 apple-press text-left ${
              showCrosswalksLayer 
                ? 'bg-[#34C759]/[0.14] text-[#15803D] font-semibold border border-[#34C759]/30' 
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-[#34C759] shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">Audio Signals</span>
          </button>
        </div>
      </div>

      {/* SVG Vector Map Canvas */}
      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300 ease-apple-spring flex items-center justify-center"
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          transformOrigin: 'center center',
        }}
      >
        <svg 
          viewBox="0 0 1000 850" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Background Grid Pattern */}
            <pattern id="apple-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E5EA" strokeWidth="0.75" />
            </pattern>

            {/* Glowing filter for selected Apple System Blue route */}
            <filter id="routeGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#0071E3" floodOpacity="0.32" />
            </filter>
          </defs>

          {/* 1. Base Map Background (#F5F5F7) */}
          <rect width="1000" height="850" fill="#F5F5F7" />
          <rect width="1000" height="850" fill="url(#apple-grid)" />

          {/* 2. Waterfront Canal (Soft Apple Blue tint) */}
          <path 
            d="M 850 0 C 830 200, 890 400, 860 600 C 840 700, 880 850, 890 850 L 1000 850 L 1000 0 Z" 
            fill="#EBF5FF" 
          />
          {/* River Shoreline */}
          <path 
            d="M 850 0 C 830 200, 890 400, 860 600 C 840 700, 880 850, 890 850" 
            fill="none" 
            stroke="#D2D2D7" 
            strokeWidth="2.5" 
          />
          {/* Piers */}
          <rect x="880" y="320" width="60" height="18" rx="4" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1" />
          <text x="910" y="333" fill="#8E8E93" fontSize="9" fontWeight="600" textAnchor="middle">PIER 2</text>
          <rect x="870" y="630" width="70" height="18" rx="4" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1" />
          <text x="905" y="643" fill="#8E8E93" fontSize="9" fontWeight="600" textAnchor="middle">PIER 3</text>
          <text x="930" y="100" fill="#0071E3" fontSize="11" fontWeight="600" opacity="0.6" transform="rotate(75, 930, 100)">
            WATERFRONT HARBOR
          </text>

          {/* 3. Parks & Green Public Spaces (#EBF9EF / Emerald tint) */}
          <rect x="250" y="440" width="180" height="140" rx="16" fill="#EBF9EF" stroke="#D1F2D9" strokeWidth="1.5" />
          <circle cx="290" cy="480" r="14" fill="#34C759" opacity="0.25" />
          <circle cx="380" cy="540" r="18" fill="#34C759" opacity="0.25" />
          <text x="340" y="465" fill="#15803D" fontSize="11" fontWeight="600" textAnchor="middle">
            Civic Hall Gardens
          </text>
          <text x="340" y="480" fill="#166534" fontSize="9" textAnchor="middle">
            Smooth pathway & tactile guide
          </text>

          {/* Waterfront Promenade Park */}
          <path 
            d="M 640 560 L 830 570 L 820 800 L 640 780 Z" 
            fill="#EBF9EF" 
            stroke="#D1F2D9" 
            strokeWidth="1.5" 
            rx="16" 
          />
          <text x="730" y="605" fill="#15803D" fontSize="11" fontWeight="600" textAnchor="middle">
            Waterfront Park
          </text>
          <text x="730" y="620" fill="#166534" fontSize="9" textAnchor="middle">
            Wide 8ft flat paved promenade
          </text>

          {/* Hospital Courtyard */}
          <rect x="680" y="120" width="140" height="80" rx="12" fill="#EBF9EF" stroke="#D1F2D9" strokeWidth="1.5" />
          <text x="750" y="155" fill="#15803D" fontSize="10" fontWeight="600" textAnchor="middle">
            Hospital Courtyard
          </text>
          <text x="750" y="170" fill="#166534" fontSize="8.5" textAnchor="middle">
            Step-free healing garden
          </text>

          {/* 4. Road Network (Pure white elevated surfaces with hairline borders) */}
          {/* Grand Concourse (Avenue 1) */}
          <rect x="155" y="0" width="50" height="850" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
          <line x1="180" y1="0" x2="180" y2="850" stroke="#D2D2D7" strokeWidth="1.5" strokeDasharray="14 10" />
          <text x="172" y="70" fill="#6E6E73" fontSize="10" fontWeight="600" transform="rotate(-90, 172, 70)">
            GRAND CONCOURSE (AVE 1)
          </text>

          {/* Broad Street */}
          <rect x="0" y="495" width="840" height="50" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
          <line x1="0" y1="520" x2="840" y2="520" stroke="#D2D2D7" strokeWidth="1.5" strokeDasharray="14 10" />
          <text x="80" y="515" fill="#6E6E73" fontSize="10" fontWeight="600">
            BROAD STREET (STEP-FREE CORRIDOR)
          </text>

          {/* Market Street */}
          <rect x="0" y="355" width="860" height="50" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
          <line x1="0" y1="380" x2="860" y2="380" stroke="#D2D2D7" strokeWidth="1.5" strokeDasharray="14 10" />
          <text x="80" y="375" fill="#6E6E73" fontSize="10" fontWeight="600">
            MARKET STREET
          </text>

          {/* North Boulevard */}
          <rect x="0" y="195" width="860" height="50" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
          <line x1="0" y1="220" x2="860" y2="220" stroke="#D2D2D7" strokeWidth="1.5" strokeDasharray="14 10" />
          <text x="80" y="215" fill="#6E6E73" fontSize="10" fontWeight="600">
            NORTH BOULEVARD / HEALTH WAY
          </text>

          {/* 5th Avenue */}
          <rect x="495" y="0" width="45" height="850" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
          <line x1="517" y1="0" x2="517" y2="850" stroke="#D2D2D7" strokeWidth="1.5" strokeDasharray="14 10" />
          <text x="510" y="80" fill="#6E6E73" fontSize="10" fontWeight="600" transform="rotate(-90, 510, 80)">
            5TH AVENUE
          </text>

          {/* Waterfront Promenade Drive */}
          <rect x="700" y="200" width="45" height="650" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
          <line x1="722" y1="200" x2="722" y2="850" stroke="#D2D2D7" strokeWidth="1.5" strokeDasharray="14 10" />
          <text x="715" y="470" fill="#6E6E73" fontSize="10" fontWeight="600" transform="rotate(-90, 715, 470)">
            WATERFRONT PROMENADE
          </text>

          {/* Pedestrian Crosswalks (Crisp hairline bars) */}
          <g opacity="0.9">
            <rect x="155" y="515" width="50" height="10" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="0.5" />
            <rect x="175" y="495" width="10" height="50" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="0.5" />
            <rect x="495" y="375" width="45" height="10" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="0.5" />
            <rect x="512" y="355" width="10" height="50" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="0.5" />
            <rect x="700" y="215" width="45" height="10" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="0.5" />
          </g>

          {/* 5. Audio Signals Layer */}
          {showCrosswalksLayer && audioCrosswalks.map((cw, i) => (
            <g key={`cw-${i}`} className="cursor-help" aria-label={cw.name}>
              <title>{cw.name}</title>
              <circle cx={cw.x} cy={cw.y} r="9" fill="#EBF9EF" stroke="#34C759" strokeWidth="1.75" />
              <circle cx={cw.x} cy={cw.y} r="3.5" fill="#34C759" />
            </g>
          ))}

          {/* 6. Rapid Transit Line Overlay */}
          {showTransitLayer && (
            <g id="transit-layer">
              <path 
                d="M 180 820 L 180 540 Q 180 500 220 500 L 480 500 Q 520 500 520 460 L 520 360 Q 520 320 560 320 L 760 320 Q 800 320 800 260 L 800 180" 
                fill="none" 
                stroke="#0071E3" 
                strokeWidth="4" 
                strokeDasharray="8 6" 
                opacity="0.85" 
              />
              <circle cx="180" cy="780" r="7" fill="#0071E3" stroke="white" strokeWidth="2.5" />
              <circle cx="360" cy="500" r="6" fill="#0071E3" stroke="white" strokeWidth="2" />
              <circle cx="520" cy="380" r="6" fill="#0071E3" stroke="white" strokeWidth="2" />
              <circle cx="780" cy="220" r="7" fill="#0071E3" stroke="white" strokeWidth="2.5" />
              <text x="240" y="810" fill="#0071E3" fontSize="9" fontWeight="600">
                PROTECTED CYCLEWAY & BIKE TRACK
              </text>
            </g>
          )}

          {/* 7. Landmark Buildings (Bento Style Cards in SVG) */}
          {locations.map((loc) => {
            const isStart = loc.id === startLocId;
            const isDest = loc.id === destLocId;

            return (
              <g key={`building-${loc.id}`}>
                {/* Building Footprint */}
                <rect 
                  x={loc.x - 38} 
                  y={loc.y - 32} 
                  width="76" 
                  height="64" 
                  rx="16" 
                  fill="#FFFFFF" 
                  stroke={isStart ? '#34C759' : isDest ? '#0071E3' : 'rgba(0, 0, 0, 0.08)'} 
                  strokeWidth={isStart || isDest ? '2.5' : '1'} 
                  className="transition-all"
                  filter="drop-shadow(0 2px 6px rgba(0, 0, 0, 0.04))"
                />
                
                {/* Accessible entrance icon badge */}
                <circle cx={loc.x - 22} cy={loc.y - 18} r="5.5" fill={isStart ? '#34C759' : isDest ? '#0071E3' : '#6E6E73'} opacity="0.9" />
                <path d={`M ${loc.x - 24} ${loc.y - 18} L ${loc.x - 22} ${loc.y - 16} L ${loc.x - 19} ${loc.y - 20}`} fill="none" stroke="white" strokeWidth="1.2" />

                {/* Building Label */}
                <text 
                  x={loc.x} 
                  y={loc.y + 44} 
                  fill="#1D1D1F" 
                  fontSize="11" 
                  fontWeight="600" 
                  letterSpacing="-0.02em"
                  textAnchor="middle"
                >
                  {loc.shortLabel}
                </text>
                <text 
                  x={loc.x} 
                  y={loc.y + 56} 
                  fill="#86868B" 
                  fontSize="8.5" 
                  textAnchor="middle"
                >
                  {loc.features[0]}
                </text>
              </g>
            );
          })}

          {/* 8. Alternative Routes (Hairline dashed lines) */}
          {routes.filter(r => r.id !== activeRouteId).map((route) => {
            const isHovered = hoveredRouteId === route.id;
            return (
              <g 
                key={`alt-route-${route.id}`} 
                className="cursor-pointer group"
                onClick={() => onSelectRoute(route.id)}
                onMouseEnter={() => setHoveredRouteId(route.id)}
                onMouseLeave={() => setHoveredRouteId(null)}
              >
                <path 
                  d={createSvgPath(route.pathPoints)} 
                  fill="none" 
                  stroke="transparent" 
                  strokeWidth="24" 
                />
                <path 
                  d={createSvgPath(route.pathPoints)} 
                  fill="none" 
                  stroke={isHovered ? '#1D1D1F' : '#AEAEB2'} 
                  strokeWidth={isHovered ? 5 : 3.5} 
                  strokeDasharray="8 6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  opacity={isHovered ? 0.9 : 0.65} 
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* 9. Active Route Line (Apple System Blue #0071E3 with subtle glow) */}
          {activeRoute && (
            <g id="active-route">
              {/* Outer Glow */}
              <path 
                d={createSvgPath(activeRoute.pathPoints)} 
                fill="none" 
                stroke="#0071E3" 
                strokeWidth="11" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                opacity="0.22" 
              />
              {/* Main Line */}
              <path 
                d={createSvgPath(activeRoute.pathPoints)} 
                fill="none" 
                stroke="#0071E3" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#routeGlowBlue)" 
              />
              {/* White dashed pulse */}
              <path 
                d={createSvgPath(activeRoute.pathPoints)} 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="2" 
                strokeDasharray="12 16" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                opacity="0.85" 
              />
            </g>
          )}

          {/* 10. Origin (A) and Destination (B) Markers */}
          {/* Start Marker A (Emerald) */}
          <g transform={`translate(${startLoc.x}, ${startLoc.y - 12})`}>
            <circle cx="0" cy="0" r="18" fill="#34C759" opacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="0" cy="0" r="14" fill="#34C759" stroke="white" strokeWidth="2.5" />
            <text x="0" y="4.5" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>
            <rect x="-30" y="-32" width="60" height="17" rx="8.5" fill="#1D1D1F" />
            <text x="0" y="-20.5" fill="white" fontSize="8.5" fontWeight="600" textAnchor="middle">START</text>
          </g>

          {/* Destination Marker B (Apple System Blue) */}
          <g transform={`translate(${destLoc.x}, ${destLoc.y - 12})`}>
            <circle cx="0" cy="0" r="18" fill="#0071E3" opacity="0.2" className="animate-ping" style={{ animationDuration: '2.5s' }} />
            <circle cx="0" cy="0" r="14" fill="#0071E3" stroke="white" strokeWidth="2.5" />
            <text x="0" y="4.5" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>
            <rect x="-35" y="-32" width="70" height="17" rx="8.5" fill="#0071E3" />
            <text x="0" y="-20.5" fill="white" fontSize="8.5" fontWeight="600" textAnchor="middle">END</text>
          </g>

          {/* 11. Barrier Pins Layer */}
          {showBarriersLayer && barriers.map((barrier) => {
            const isSelected = barrier.id === selectedBarrierId;
            const isUrgent = barrier.severity === 'urgent';
            const isResolved = barrier.status === 'resolved';
            const isUnverified = barrier.status === 'unverified';

            // Pin styling per instructions:
            // Emerald (#34C759) for verified
            // Amber (#FF9F0A) for unverified
            // System Red (#FF3B30) strictly for urgent barriers
            let pinColor = '#FF9F0A'; // Amber
            let strokeColor = '#D97706';
            if (isUrgent && !isResolved) {
              pinColor = '#FF3B30'; // System Red
              strokeColor = '#DC2626';
            } else if (isResolved) {
              pinColor = '#8E8E93'; // Slate
              strokeColor = '#636366';
            } else if (barrier.status === 'verified') {
              pinColor = '#34C759'; // Emerald
              strokeColor = '#16A34A';
            }

            return (
              <g 
                key={`pin-${barrier.id}`}
                transform={`translate(${barrier.x}, ${barrier.y})`}
                className="cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBarrier(barrier.id);
                }}
                tabIndex={0}
                role="button"
                aria-label={`Barrier: ${barrier.title}, status ${barrier.status}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectBarrier(barrier.id);
                  }
                }}
              >
                {/* Urgent radar pulse */}
                {isUrgent && !isResolved && (
                  <circle cx="0" cy="0" r="22" fill="#FF3B30" opacity="0.25" className="animate-ping" style={{ animationDuration: '2s' }} />
                )}

                {/* Subtle pin shadow */}
                <ellipse cx="0" cy="13" rx="8" ry="3.5" fill="#000000" opacity="0.15" />

                {/* Pin Badge */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r={isSelected ? 16 : 13.5} 
                  fill={pinColor} 
                  stroke={isSelected ? '#1D1D1F' : '#FFFFFF'} 
                  strokeWidth={isSelected ? '2.5' : '2'} 
                  className="transition-all transform group-hover:scale-110"
                />

                {/* Inner Symbol */}
                {isResolved ? (
                  <path d="M -4 0 L -1 3 L 5 -3" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
                ) : isUrgent ? (
                  <g fill="white">
                    <rect x="-1" y="-6" width="2" height="6" rx="1" />
                    <circle cx="0" cy="3" r="1.2" />
                  </g>
                ) : isUnverified ? (
                  <text x="0" y="4" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">?</text>
                ) : (
                  <path d="M -3.5 0 L -1 2.5 L 4.5 -2.5" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Selected Barrier Details Bento Popover */}
      {selectedBarrier && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:w-[380px] z-30 bg-white/95 backdrop-blur-xl rounded-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/[0.08] p-4.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                selectedBarrier.status === 'verified'
                  ? 'bg-[#34C759]/[0.12] text-[#34C759]'
                  : selectedBarrier.status === 'unverified'
                  ? 'bg-[#FF9F0A]/[0.14] text-[#D97706]'
                  : 'bg-black/[0.06] text-[#6E6E73]'
              }`}>
                {selectedBarrier.status === 'verified' && <ShieldCheck className="w-3 h-3 mr-1" strokeWidth={1.75} />}
                {selectedBarrier.status === 'unverified' && <AlertTriangle className="w-3 h-3 mr-1" strokeWidth={1.75} />}
                {selectedBarrier.status.toUpperCase()}
              </span>

              {selectedBarrier.severity === 'urgent' && selectedBarrier.status !== 'resolved' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FF3B30]/[0.12] text-[#FF3B30]">
                  URGENT BARRIER
                </span>
              )}
            </div>

            <button
              onClick={() => onSelectBarrier(null)}
              className="p-1 rounded-full text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-black/[0.04] transition-colors"
              aria-label="Close barrier popup"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>

          <h4 className="font-semibold text-[#1D1D1F] text-[15px] mt-2 tracking-tight leading-snug">
            {selectedBarrier.title}
          </h4>
          <p className="text-[12px] text-[#6E6E73] flex items-center gap-1 mt-0.5">
            <Navigation className="w-3 h-3 text-[#8E8E93]" strokeWidth={1.75} />
            {selectedBarrier.locationName}
          </p>

          <p className="text-[13px] text-[#1D1D1F] mt-2 bg-[#F5F5F7] p-3 rounded-[14px] border border-black/[0.04] leading-relaxed">
            {selectedBarrier.description}
          </p>

          {/* Photo Preview if attached */}
          {selectedBarrier.photoUrl && (
            <div className="mt-2.5 rounded-[14px] overflow-hidden border border-black/[0.06] h-28 bg-[#F5F5F7]">
              <img 
                src={selectedBarrier.photoUrl} 
                alt={selectedBarrier.title} 
                className="w-full h-full object-cover" 
                loading="lazy" 
              />
            </div>
          )}

          {/* Metadata */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#86868B] pt-2 border-t border-black/[0.06]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#8E8E93]" strokeWidth={1.75} />
              {selectedBarrier.reportedAt}
            </span>
            <span>By: {selectedBarrier.reportedBy}</span>
          </div>

          {/* Pill Verification Actions */}
          <div className="mt-3 flex items-center gap-2">
            {selectedBarrier.status !== 'resolved' ? (
              <>
                <button
                  onClick={() => onConfirmBarrier(selectedBarrier.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-[12px] font-semibold rounded-full bg-[#0071E3] text-white hover:bg-[#0077ED] transition-all apple-press shadow-[0_2px_8px_rgba(0,113,227,0.20)]"
                >
                  <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Confirm Barrier ({selectedBarrier.upvotes})
                </button>
                <button
                  onClick={() => onResolveBarrier(selectedBarrier.id)}
                  className="inline-flex items-center justify-center gap-1 py-2 px-3 text-[12px] font-medium rounded-full bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] border border-black/[0.08] transition-all apple-press"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" strokeWidth={1.75} />
                  Clear
                </button>
              </>
            ) : (
              <div className="w-full text-center py-2 px-3 text-[12px] font-semibold text-[#34C759] bg-[#34C759]/[0.10] rounded-full border border-[#34C759]/20">
                ✓ Inspected & Cleared
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Apple Legend - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-10">
        {showLegend ? (
          <div className="apple-glass p-3.5 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.08] max-w-xs text-[12px]">
            <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.06] mb-2">
              <span className="font-semibold text-[#1D1D1F]">Map Legend</span>
              <button 
                onClick={() => setShowLegend(false)}
                className="text-[#8E8E93] hover:text-[#1D1D1F] text-[11px]"
              >
                Hide
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-[#6E6E73]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]"></span>
                <span>Active Route</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B30]"></span>
                <span>Urgent Barrier</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9F0A]"></span>
                <span>Unverified Alert</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]"></span>
                <span>Verified Item</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8E8E93]"></span>
                <span>Resolved Item</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]"></span>
                <span>Audio Crosswalk</span>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowLegend(true)}
            className="apple-glass px-3 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/[0.08] text-[12px] font-medium text-[#6E6E73] hover:text-[#1D1D1F] apple-press flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#6E6E73]" strokeWidth={1.75} />
            <span>Legend</span>
          </button>
        )}
      </div>

      {/* District Pill Badge - Top Left */}
      <div className="absolute top-4 left-4 z-10 apple-glass text-[#1D1D1F] text-[12px] font-medium px-3 py-1 rounded-full border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#0071E3]"></span>
        <span>Downtown Civic District — Interactive Map</span>
      </div>
    </div>
  );
};
