import { LocationPreset, BarrierReport, RouteOption, TravelMode, AccessibilityPreference } from '../types';

export const LOCATION_PRESETS: LocationPreset[] = [
  {
    id: 'central-station',
    name: 'Metro Central Station',
    shortLabel: 'Central Station',
    address: '100 Grand Concourse & 4th Ave',
    category: 'transit',
    x: 180,
    y: 780,
    features: ['Elevators to platforms', 'Tactile paving', 'Step-free entrance', 'Accessible restrooms'],
  },
  {
    id: 'city-hall',
    name: 'City Hall & Civic Center',
    shortLabel: 'City Hall Plaza',
    address: '250 Civic Way & Broad St',
    category: 'civic',
    x: 360,
    y: 520,
    features: ['Gradual ramps', 'Automatic power doors', 'Braille directories'],
  },
  {
    id: 'mercy-hospital',
    name: 'Mercy General Hospital & Clinic',
    shortLabel: 'Mercy Hospital',
    address: '820 North Boulevard & Health Way',
    category: 'medical',
    x: 780,
    y: 220,
    features: ['Full ADA compliance', 'Audio announcements', 'Drop-off bay', 'Wheelchair charging'],
  },
  {
    id: 'market-square',
    name: 'Union Market Square & Food Hall',
    shortLabel: 'Market Square',
    address: '520 Market St & 5th Ave',
    category: 'commercial',
    x: 520,
    y: 380,
    features: ['Level thresholds', 'Wide pedestrian passages', 'Accessible seating'],
  },
  {
    id: 'riverside-library',
    name: 'Riverside Public Library & Gardens',
    shortLabel: 'Riverside Library',
    address: '450 Waterfront Promenade',
    category: 'culture',
    x: 720,
    y: 700,
    features: ['Step-free boardwalk', 'Audible door chimes', 'Elevator to all 3 floors'],
  },
  {
    id: 'tech-hub',
    name: 'Innovation & Tech Campus',
    shortLabel: 'Tech Hub',
    address: '280 Tech Parkway & 2nd St',
    category: 'commercial',
    x: 220,
    y: 250,
    features: ['Automatic swing doors', 'Touchless elevators', 'Smooth epoxy flooring'],
  },
];

export const INITIAL_BARRIERS: BarrierReport[] = [
  {
    id: 'barrier-1',
    type: 'broken-elevator',
    title: 'Street-to-Platform Elevator Out of Service',
    locationName: 'Metro Central Station (West Concourse)',
    x: 200,
    y: 750,
    description: 'West street elevator motor fault. Sign posted by transit authority. East concourse elevator remains operating (requires 140 ft detour via 4th Ave entrance).',
    reportedAt: '2 hours ago',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: 'verified',
    severity: 'urgent',
    upvotes: 14,
    reportedBy: 'Transit Staff & Commuter Community',
    photoUrl: 'https://images.unsplash.com/photo-1579618218290-24a26f63a728?auto=format&fit=crop&w=600&q=80',
    affectedRouteIds: ['route-direct'],
  },
  {
    id: 'barrier-2',
    type: 'blocked-ramp',
    title: 'Curb Ramp Blocked by Delivery Van',
    locationName: '5th Ave & Market St (Southwest Corner)',
    x: 460,
    y: 440,
    description: 'Commercial delivery vehicle parked over the pedestrian curb cut, unloading freight. Wheelchairs must backtrack half a block to cross at 4th Ave.',
    reportedAt: '38 mins ago',
    createdAt: new Date(Date.now() - 38 * 60 * 1000).toISOString(),
    status: 'unverified',
    severity: 'urgent',
    upvotes: 6,
    reportedBy: 'Elena R. (Wheelchair Commuter)',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    affectedRouteIds: ['route-direct'],
  },
  {
    id: 'barrier-3',
    type: 'stairs-only',
    title: 'Historic Civic Plaza Stairs (No Ramp on West)',
    locationName: 'Civic Plaza Steps at Broad St',
    x: 350,
    y: 490,
    description: 'Flight of 18 granite steps without adjacent handrail or ramp. Accessible step-free ramp is situated 200ft east via Mayor Walkway.',
    reportedAt: 'Yesterday (Permanent feature confirmed)',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'verified',
    severity: 'moderate',
    upvotes: 22,
    reportedBy: 'AccessNow Civic Audit Team',
    affectedRouteIds: ['route-direct', 'route-scenic'],
  },
  {
    id: 'barrier-4',
    type: 'construction',
    title: 'Utility Sidewalk Trench (Narrow 24" Passage)',
    locationName: 'Hospital Blvd & Health Way',
    x: 720,
    y: 260,
    description: 'Conduit excavation work. Temporary plywood walkway is restricted to 24 inches width with 2-inch lip. Wheelchairs cannot navigate without road detour.',
    reportedAt: '3 hours ago',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    status: 'verified',
    severity: 'urgent',
    upvotes: 11,
    reportedBy: 'Municipal DPW Feed',
    photoUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
    affectedRouteIds: ['route-direct'],
  },
  {
    id: 'barrier-5',
    type: 'damaged-surface',
    title: 'Buckled Brick Pavers from Tree Roots',
    locationName: 'Waterfront Promenade Path (Near Pier 3)',
    x: 640,
    y: 650,
    description: 'Significant 2-inch heaving of decorative brick pavers caused by mature willow oak roots. May catch small caster wheels or cause balance instability.',
    reportedAt: '1 day ago (Community report)',
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    status: 'unverified',
    severity: 'moderate',
    upvotes: 4,
    reportedBy: 'Marcus T. (Resident)',
    affectedRouteIds: ['route-scenic'],
  },
  {
    id: 'barrier-6',
    type: 'broken-elevator',
    title: 'Library South Entrance Atrium Lift (Repaired)',
    locationName: 'Riverside Library South Pavilion',
    x: 740,
    y: 680,
    description: 'Door sensor alignment was repaired this morning. Tested operational by facility staff with full weight capacity.',
    reportedAt: '5 hours ago',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    status: 'resolved',
    severity: 'minor',
    upvotes: 18,
    reportedBy: 'Library Facilities Team',
    resolvedNote: 'Inspected and cleared by municipal elevator contractor at 10:45 AM.',
    affectedRouteIds: [],
  },
];

// Helper to generate route alternatives dynamically based on start/destination and preferences
export function calculateMockRoutes(
  startId: string,
  destId: string,
  mode: TravelMode,
  preferences: AccessibilityPreference[],
  barriers: BarrierReport[]
): RouteOption[] {
  const startLoc = LOCATION_PRESETS.find(l => l.id === startId) || LOCATION_PRESETS[0];
  const destLoc = LOCATION_PRESETS.find(l => l.id === destId) || LOCATION_PRESETS[2];

  // Base distance calculation in SVG unit space
  const dx = destLoc.x - startLoc.x;
  const dy = destLoc.y - startLoc.y;
  const directDistanceUnits = Math.sqrt(dx * dx + dy * dy);
  const baseMiles = Number((directDistanceUnits * 0.0018 + 0.3).toFixed(1));

  // Determine active barrier alerts that might affect paths
  const activeUrgentBarriers = barriers.filter(b => b.status !== 'resolved' && b.severity === 'urgent');
  const activeModerateBarriers = barriers.filter(b => b.status !== 'resolved' && b.severity === 'moderate');

  // Option 1: Accessibility-Prioritized Route (Step-Free & Verified)
  // This route purposefully takes detours to avoid known stairs, steep inclines, and blocked ramps
  const waypoints1 = [
    { x: startLoc.x, y: startLoc.y },
    { x: startLoc.x + (dx * 0.2), y: startLoc.y },
    { x: startLoc.x + (dx * 0.2), y: startLoc.y + (dy * 0.4) },
    { x: startLoc.x + (dx * 0.8), y: startLoc.y + (dy * 0.4) },
    { x: startLoc.x + (dx * 0.8), y: destLoc.y },
    { x: destLoc.x, y: destLoc.y },
  ];

  // Option 2: Fastest Direct Path (May encounter obstacles or incline)
  const waypoints2 = [
    { x: startLoc.x, y: startLoc.y },
    { x: startLoc.x + (dx * 0.5), y: startLoc.y + (dy * 0.2) },
    { x: startLoc.x + (dx * 0.5), y: startLoc.y + (dy * 0.7) },
    { x: destLoc.x, y: destLoc.y },
  ];

  // Option 3: Civic Transit / Boulevard Route (Smooth transit connection with audio crosswalks)
  const waypoints3 = [
    { x: startLoc.x, y: startLoc.y },
    { x: 380, y: 520 }, // via Civic Hub
    { x: 520, y: 380 }, // via Market Square
    { x: destLoc.x, y: destLoc.y },
  ];

  const speedFactor = mode === 'wheelchair' ? 3.0 : mode === 'transit' ? 8.5 : 3.2; // mph roughly
  const time1 = Math.max(8, Math.round((baseMiles * 1.25 / speedFactor) * 60));
  const time2 = Math.max(6, Math.round((baseMiles * 0.95 / speedFactor) * 60));
  const time3 = Math.max(10, Math.round((baseMiles * 1.4 / speedFactor) * 60));

  const hasStepFreePref = preferences.includes('step-free');
  const hasElevatorPref = preferences.includes('working-elevators');
  const hasAvoidStairsPref = preferences.includes('avoid-stairs');

  // Route 1: The Verified Step-Free Route
  const route1: RouteOption = {
    id: 'route-step-free',
    name: 'Broad St & Accessible Civic Corridor',
    subtitle: '100% Step-free · Verified curb ramps · Gentle slopes',
    badge: 'Recommended for Wheelchairs',
    isRecommended: true,
    durationMinutes: mode === 'transit' ? Math.round(time1 * 0.75) : time1,
    distanceMiles: Number((baseMiles * 1.15).toFixed(1)),
    stepFreePercentage: 100,
    maxSlopePercent: 2.5,
    barrierCount: 0,
    urgentBarrierCount: 0,
    pathPoints: waypoints1,
    travelMode: mode,
    highlights: [
      'Zero stairs or curbs over 0.25 inches',
      'All 6 crosswalks equipped with audible signals and truncated domes',
      'Continuous wide sidewalks (minimum 64 inches width)',
      'Smooth brushed concrete pavement throughout'
    ],
    caveats: [
      'Adds approximately 4 minutes detour to bypass construction on 5th Ave',
      'Mild 2.5% slope approaching Civic plaza'
    ],
    barriers: [],
    steps: [
      {
        id: 's1-1',
        instruction: `Exit ${startLoc.shortLabel} via the automated East ramp entrance (push-pad activated)`,
        distance: '150 ft',
        duration: '1 min',
        actionType: 'start',
        stepFree: true,
        surface: 'Smooth concrete',
        incline: '1.2% slope',
        accessibilityNote: 'Push-button power door with 38-inch clearance.',
      },
      {
        id: 's1-2',
        instruction: 'Head north along Grand Concourse on the wide east sidewalk',
        distance: '0.3 mi',
        duration: '6 mins',
        actionType: 'straight',
        stepFree: true,
        surface: 'Smooth concrete',
        incline: 'Flat (< 1%)',
        accessibilityNote: 'Pavement inspected Nov 2026. Wide clear path without outdoor dining blockages.',
      },
      {
        id: 's1-3',
        instruction: 'Cross 4th Ave at Broad St using the audio-chirp pedestrian signal',
        distance: '60 ft',
        duration: '1 min',
        actionType: 'crossing',
        stepFree: true,
        surface: 'Tactile paving',
        accessibilityNote: 'Flush curb cuts on both sides with high-contrast tactile warning pavers.',
      },
      {
        id: 's1-4',
        instruction: 'Turn right onto Broad St Accessible Promenade, bypassing the historic steps',
        distance: '0.4 mi',
        duration: '7 mins',
        actionType: 'turn-right',
        stepFree: true,
        surface: 'Smooth concrete',
        incline: '2.5% gentle grade',
        accessibilityNote: 'Bypasses the 18 steps at Civic Plaza via gentle 1:16 switchback ramp.',
      },
      {
        id: 's1-5',
        instruction: `Arrive at ${destLoc.shortLabel} main entrance`,
        distance: '100 ft',
        duration: '1 min',
        actionType: 'destination',
        stepFree: true,
        surface: 'Smooth concrete',
        accessibilityNote: 'Automatic dual sliding glass doors with tactile threshold guidance.',
      },
    ],
  };

  // Route 2: Direct Street Route (Shortest distance, but has 2 reported barriers/cautions)
  const route2: RouteOption = {
    id: 'route-direct',
    name: '5th Ave & Market St Direct',
    subtitle: 'Shortest path · Active barrier reports · Caution advised',
    badge: 'Fastest (Has Barriers)',
    isRecommended: false,
    durationMinutes: time2,
    distanceMiles: Number(baseMiles.toFixed(1)),
    stepFreePercentage: 82,
    maxSlopePercent: 5.4,
    barrierCount: 2,
    urgentBarrierCount: 1,
    pathPoints: waypoints2,
    travelMode: mode,
    highlights: [
      'Shortest total distance',
      'Well-lit primary commercial boulevard',
      'High density of transit stops'
    ],
    caveats: [
      '1 urgent barrier: curb ramp blocked by delivery truck at 5th & Market',
      '1 moderate barrier: historic stairs with steep alternative path',
      'Pavement contains sections of rough brick pavers'
    ],
    barriers: [barriers[1], barriers[3]], // blocked ramp & utility trench
    steps: [
      {
        id: 's2-1',
        instruction: `Depart ${startLoc.shortLabel} towards 5th Ave`,
        distance: '200 ft',
        duration: '2 mins',
        actionType: 'start',
        stepFree: true,
        surface: 'Smooth concrete',
      },
      {
        id: 's2-2',
        instruction: 'Proceed northeast along 5th Ave commercial corridor',
        distance: '0.4 mi',
        duration: '7 mins',
        actionType: 'straight',
        stepFree: false,
        surface: 'Cobblestone',
        barrierWarning: {
          barrierId: 'barrier-2',
          message: 'Alert: Curb ramp blocked by delivery van (reported 38m ago). Wheelchairs may need street detour.',
          severity: 'urgent',
          status: 'unverified',
        },
      },
      {
        id: 's2-3',
        instruction: 'Turn left onto Civic Way near the steps',
        distance: '0.2 mi',
        duration: '4 mins',
        actionType: 'turn-left',
        stepFree: false,
        surface: 'Asphalt',
        incline: '5.4% moderate hill',
        accessibilityNote: 'Steep hill section. Handrails present only on northern half of sidewalk.',
      },
      {
        id: 's2-4',
        instruction: `Approach ${destLoc.shortLabel} north medical wing`,
        distance: '300 ft',
        duration: '2 mins',
        actionType: 'destination',
        stepFree: true,
        surface: 'Smooth concrete',
      },
    ],
  };

  // Route 3: Waterfront or Transit Boulevard Route
  const route3: RouteOption = {
    id: 'route-transit-waterfront',
    name: 'Rapid Transit Line 1 & Waterfront Promenade',
    subtitle: 'Low effort · Level-boarding transit · Scenic wide paths',
    badge: mode === 'transit' ? 'Top Transit Pick' : 'Scenic & Low Effort',
    isRecommended: false,
    durationMinutes: mode === 'transit' ? Math.max(9, Math.round(time3 * 0.6)) : time3,
    distanceMiles: Number((baseMiles * 1.3).toFixed(1)),
    stepFreePercentage: 96,
    maxSlopePercent: 1.8,
    barrierCount: 1,
    urgentBarrierCount: 0,
    pathPoints: waypoints3,
    travelMode: mode,
    transitLine: {
      name: 'Blue Rapid Line 1 (Low-Floor Tram)',
      color: '#0284c7',
      accessibleVehicles: true,
    },
    highlights: [
      'Level platform boarding with zero vertical gap',
      'Audio and high-contrast digital station displays',
      'Wide waterfront promenade path (over 8ft wide)',
      'Shaded rest benches with armrests every 200 feet'
    ],
    caveats: [
      '1 unverified report of buckled root pavers near pier 3',
      'Requires crossing 1 minor unsignalized side street'
    ],
    barriers: [barriers[4]], // buckled tree roots
    steps: [
      {
        id: 's3-1',
        instruction: `Board Blue Rapid Line 1 at ${startLoc.shortLabel} platform A (level boarding)`,
        distance: '0.7 mi',
        duration: '5 mins',
        actionType: 'transit',
        stepFree: true,
        surface: 'Interior tile',
        accessibilityNote: '100% accessible low-floor tram cars with priority wheelchair bays.',
      },
      {
        id: 's3-2',
        instruction: 'Disembark at Civic Center Transit stop',
        distance: '80 ft',
        duration: '1 min',
        actionType: 'transit',
        stepFree: true,
        surface: 'Tactile paving',
        accessibilityNote: 'Flush platform exit directly to sidewalk ramp.',
      },
      {
        id: 's3-3',
        instruction: 'Follow the Waterfront Promenade pathway heading north',
        distance: '0.3 mi',
        duration: '6 mins',
        actionType: 'straight',
        stepFree: true,
        surface: 'Asphalt',
        incline: 'Flat (< 1.5%)',
        barrierWarning: {
          barrierId: 'barrier-5',
          message: 'Note: Minor tree root buckling on pavers near Pier 3. Path remains passible.',
          severity: 'moderate',
          status: 'unverified',
        },
      },
      {
        id: 's3-4',
        instruction: `Arrive at ${destLoc.shortLabel}`,
        distance: '150 ft',
        duration: '1 min',
        actionType: 'destination',
        stepFree: true,
        surface: 'Smooth concrete',
      },
    ],
  };

  // If user selected strict step-free or avoid-stairs, ensure route 1 is top
  return [route1, route2, route3];
}
