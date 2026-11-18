export type TravelMode = 'car' | 'bike' | 'walk';

export type AccessibilityPreference = 
  | 'step-free'
  | 'avoid-stairs'
  | 'working-elevators'
  | 'fewer-obstacles'
  | 'low-incline'
  | 'audio-signals';

export type BarrierType = 
  | 'broken-elevator'
  | 'blocked-ramp'
  | 'stairs-only'
  | 'construction'
  | 'narrow-path'
  | 'heavy-door'
  | 'damaged-surface';

export type BarrierStatus = 'verified' | 'unverified' | 'resolved';

export type BarrierSeverity = 'urgent' | 'moderate' | 'minor';

export interface BarrierReport {
  id: string;
  type: BarrierType;
  title: string;
  locationName: string;
  x: number; // 0 to 1000 SVG coordinates
  y: number; // 0 to 1000 SVG coordinates
  description: string;
  reportedAt: string;
  createdAt: string;
  status: BarrierStatus;
  severity: BarrierSeverity;
  upvotes: number;
  reportedBy: string;
  photoUrl?: string;
  affectedRouteIds: string[];
  resolvedNote?: string;
}

export interface RouteStep {
  id: string;
  instruction: string;
  distance: string;
  duration: string;
  actionType: 'start' | 'straight' | 'turn-left' | 'turn-right' | 'ramp' | 'elevator' | 'crossing' | 'destination' | 'transit' | 'drive' | 'bike';
  accessibilityNote?: string;
  stepFree: boolean;
  surface: 'Smooth concrete' | 'Tactile paving' | 'Asphalt' | 'Cobblestone' | 'Interior tile';
  incline?: string;
  barrierWarning?: {
    barrierId: string;
    message: string;
    severity: BarrierSeverity;
    status: BarrierStatus;
  };
}

export interface RouteOption {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  isRecommended?: boolean;
  durationMinutes: number;
  distanceMiles: number;
  stepFreePercentage: number;
  maxSlopePercent: number;
  barrierCount: number;
  urgentBarrierCount: number;
  pathPoints: Array<{ x: number; y: number }>;
  steps: RouteStep[];
  barriers: BarrierReport[];
  highlights: string[];
  caveats: string[];
  travelMode: TravelMode;
  transitLine?: {
    name: string;
    color: string;
    accessibleVehicles: boolean;
  };
}

export interface LocationPreset {
  id: string;
  name: string;
  shortLabel: string;
  address: string;
  category: 'transit' | 'civic' | 'medical' | 'commercial' | 'park' | 'culture';
  x: number;
  y: number;
  features: string[];
  lat?: number;
  lng?: number;
  city?: string;
  country?: string;
  isRealLocation?: boolean;
}

export interface RealPlace {
  id: string;
  name: string;
  shortLabel: string;
  address: string;
  city?: string;
  country?: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  isRealLocation: boolean;
}
