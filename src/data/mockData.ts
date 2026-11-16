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
    features: ['Accessible drop-off bay', 'Bike parking shelter', 'Level road access', 'Elevators to street'],
  },
  {
    id: 'city-hall',
    name: 'City Hall & Civic Center',
    shortLabel: 'City Hall Plaza',
    address: '250 Civic Way & Broad St',
    category: 'civic',
    x: 360,
    y: 520,
    features: ['Accessible parking stalls', 'Dedicated bike racks', 'Gradual ramps'],
  },
  {
    id: 'mercy-hospital',
    name: 'Mercy General Hospital & Clinic',
    shortLabel: 'Mercy Hospital',
    address: '820 North Boulevard & Health Way',
    category: 'medical',
    x: 780,
    y: 220,
    features: ['Emergency vehicle bay', 'Covered bike hub', 'Full ADA ramp access'],
  },
  {
    id: 'market-square',
    name: 'Union Market Square & Food Hall',
    shortLabel: 'Market Square',
    address: '520 Market St & 5th Ave',
    category: 'commercial',
    x: 520,
    y: 380,
    features: ['Curbside loading zone', 'Bicycle corral', 'Level entrances'],
  },
  {
    id: 'riverside-library',
    name: 'Riverside Public Library & Gardens',
    shortLabel: 'Riverside Library',
    address: '450 Waterfront Promenade',
    category: 'culture',
    x: 720,
    y: 700,
    features: ['EV charging & accessible parking', 'Waterfront bike trail link', 'Ground level access'],
  },
  {
    id: 'tech-hub',
    name: 'Innovation & Tech Campus',
    shortLabel: 'Tech Hub',
    address: '280 Tech Parkway & 2nd St',
    category: 'commercial',
    x: 220,
    y: 250,
    features: ['Underground garage & elevator', 'Secure bike lockers', 'Smooth pavement'],
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
    description: 'West street elevator motor fault. Maintenance sign posted. East concourse elevator remains operating (requires 140 ft detour via 4th Ave entrance).',
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
    title: 'Curb Ramp & Bike Lane Blocked by Delivery Van',
    locationName: '5th Ave & Market St (Southwest Corner)',
    x: 460,
    y: 440,
    description: 'Commercial delivery vehicle parked over the pedestrian curb cut and bike lane. Cyclists and pedestrians must merge into roadway or backtrack.',
    reportedAt: '38 mins ago',
    createdAt: new Date(Date.now() - 38 * 60 * 1000).toISOString(),
    status: 'unverified',
    severity: 'urgent',
    upvotes: 6,
    reportedBy: 'Elena R. (Cyclist & Commuter)',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    affectedRouteIds: ['route-direct'],
  },
  {
    id: 'barrier-3',
    type: 'stairs-only',
    title: 'Historic Civic Plaza Stairs (No Ramp/Bypass on West)',
    locationName: 'Civic Plaza Steps at Broad St',
    x: 350,
    y: 490,
    description: 'Flight of 18 granite steps without adjacent handrail or ramp. Accessible step-free ramp and bike wheel runnel is situated 200ft east via Mayor Walkway.',
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
    title: 'Road Utility Trench & Narrow Right-Lane Passage',
    locationName: 'Hospital Blvd & Health Way',
    x: 720,
    y: 260,
    description: 'Conduit excavation work. Right vehicle lane and sidewalk restricted to 24 inches width. Expect vehicular bottleneck and sidewalk detour.',
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
    title: 'Buckled Brick Pavers & Pothole Hazard',
    locationName: 'Waterfront Promenade Path (Near Pier 3)',
    x: 640,
    y: 650,
    description: 'Significant 2-inch heaving of decorative brick pavers caused by mature willow oak roots. Poses hazard for small wheels and road bikes.',
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

  const dx = destLoc.x - startLoc.x;
  const dy = destLoc.y - startLoc.y;
  const directDistanceUnits = Math.sqrt(dx * dx + dy * dy);
  const baseMiles = Number((directDistanceUnits * 0.0018 + 0.3).toFixed(1));

  // Waypoints for Route 1 (Safe, Step-Free & Protected Corridor)
  const waypoints1 = [
    { x: startLoc.x, y: startLoc.y },
    { x: startLoc.x + (dx * 0.2), y: startLoc.y },
    { x: startLoc.x + (dx * 0.2), y: startLoc.y + (dy * 0.4) },
    { x: startLoc.x + (dx * 0.8), y: startLoc.y + (dy * 0.4) },
    { x: startLoc.x + (dx * 0.8), y: destLoc.y },
    { x: destLoc.x, y: destLoc.y },
  ];

  // Waypoints for Route 2 (Fastest Direct Street Route)
  const waypoints2 = [
    { x: startLoc.x, y: startLoc.y },
    { x: startLoc.x + (dx * 0.5), y: startLoc.y + (dy * 0.2) },
    { x: startLoc.x + (dx * 0.5), y: startLoc.y + (dy * 0.7) },
    { x: destLoc.x, y: destLoc.y },
  ];

  // Waypoints for Route 3 (Scenic Boulevard & Waterfront Route)
  const waypoints3 = [
    { x: startLoc.x, y: startLoc.y },
    { x: 380, y: 520 },
    { x: 520, y: 380 },
    { x: destLoc.x, y: destLoc.y },
  ];

  // Speed and time estimates by mode: car (~24mph), bike (~11mph), walk (~3.1mph)
  let speedMph = 3.1;
  let modeName = 'Walking';
  if (mode === 'car') {
    speedMph = 24.0;
    modeName = 'Drive';
  } else if (mode === 'bike') {
    speedMph = 11.0;
    modeName = 'Bike';
  }

  const time1 = Math.max(mode === 'car' ? 3 : mode === 'bike' ? 5 : 8, Math.round((baseMiles * 1.15 / speedMph) * 60));
  const time2 = Math.max(mode === 'car' ? 2 : mode === 'bike' ? 4 : 6, Math.round((baseMiles * 0.95 / speedMph) * 60));
  const time3 = Math.max(mode === 'car' ? 4 : mode === 'bike' ? 6 : 10, Math.round((baseMiles * 1.35 / speedMph) * 60));

  // Route 1: The Safe / Step-Free / Protected Route
  const route1: RouteOption = {
    id: 'route-step-free',
    name: mode === 'car' 
      ? 'Broad St & Accessible Civic Corridor' 
      : mode === 'bike' 
      ? 'Broad St Protected Cycleway & Greenway' 
      : 'Broad St Pedestrian Corridor (100% Step-free)',
    subtitle: mode === 'car' 
      ? 'Direct road passage · Dedicated accessible drop-off bays · Zero restrictions' 
      : mode === 'bike' 
      ? 'Grade-separated cycle track · Low traffic stress · Smooth asphalt' 
      : '100% Step-free · Verified curb ramps · Gentle slopes',
    badge: mode === 'car' 
      ? 'Smoothest Drive' 
      : mode === 'bike' 
      ? 'Recommended Cycleway' 
      : 'Recommended Walk',
    isRecommended: true,
    durationMinutes: time1,
    distanceMiles: Number((baseMiles * 1.15).toFixed(1)),
    stepFreePercentage: 100,
    maxSlopePercent: 2.5,
    barrierCount: 0,
    urgentBarrierCount: 0,
    pathPoints: waypoints1,
    travelMode: mode,
    highlights: mode === 'car' ? [
      'Accessible curb drop-off bays at origin and destination',
      'Wide multi-lane arterial with synchronised traffic signals',
      'Avoids utility trench lane closure on Hospital Blvd'
    ] : mode === 'bike' ? [
      '100% grade-separated cycleway protected by concrete buffer',
      'Bicycle signal priority at all 4 major intersections',
      'Gentle slope under 2.5% throughout'
    ] : [
      'Zero stairs or curbs over 0.25 inches',
      'All crosswalks equipped with audible signals and tactile domes',
      'Continuous wide sidewalks (minimum 64 inches width)'
    ],
    caveats: [
      'Adds approximately 3–4 minutes detour to bypass construction on 5th Ave',
      'Gentle 2.5% slope approaching Civic Plaza'
    ],
    barriers: [],
    steps: [
      {
        id: 's1-1',
        instruction: mode === 'car' 
          ? `Depart ${startLoc.shortLabel} accessible pick-up loop onto Grand Concourse` 
          : mode === 'bike' 
          ? `Join protected cycleway from ${startLoc.shortLabel} bike shelter` 
          : `Exit ${startLoc.shortLabel} via automated East ramp entrance`,
        distance: '150 ft',
        duration: '1 min',
        actionType: mode === 'car' ? 'drive' : mode === 'bike' ? 'bike' : 'start',
        stepFree: true,
        surface: 'Smooth concrete',
        incline: '1.2% slope',
        accessibilityNote: mode === 'car' ? 'Wide loading stall with flush access.' : 'Flush curb transition onto bike lane.',
      },
      {
        id: 's1-2',
        instruction: mode === 'car'
          ? 'Head north along Grand Concourse in center lane'
          : mode === 'bike'
          ? 'Proceed north along Grand Concourse protected two-way bike track'
          : 'Head north along Grand Concourse on wide east sidewalk',
        distance: '0.3 mi',
        duration: `${Math.max(1, Math.round(time1 * 0.4))} mins`,
        actionType: 'straight',
        stepFree: true,
        surface: mode === 'car' ? 'Asphalt' : 'Smooth concrete',
        incline: 'Flat (< 1%)',
      },
      {
        id: 's1-3',
        instruction: mode === 'car'
          ? 'Turn right onto Broad St Accessible Corridor'
          : mode === 'bike'
          ? 'Turn right onto Broad St cycle track at bicycle traffic signal'
          : 'Cross 4th Ave at Broad St using audio-chirp pedestrian signal',
        distance: '60 ft',
        duration: '1 min',
        actionType: mode === 'car' ? 'turn-right' : mode === 'bike' ? 'turn-right' : 'crossing',
        stepFree: true,
        surface: 'Tactile paving',
        accessibilityNote: 'Flush curb cuts and sensor-activated green phase.',
      },
      {
        id: 's1-4',
        instruction: mode === 'car'
          ? 'Continue along Broad St to destination entrance'
          : mode === 'bike'
          ? 'Follow Broad St gentle switchback ramp, bypassing historic stairs'
          : 'Turn right onto Broad St Accessible Promenade, bypassing historic steps',
        distance: '0.4 mi',
        duration: `${Math.max(1, Math.round(time1 * 0.4))} mins`,
        actionType: mode === 'car' ? 'straight' : 'straight',
        stepFree: true,
        surface: 'Smooth concrete',
        incline: '2.5% gentle grade',
      },
      {
        id: 's1-5',
        instruction: `Arrive at ${destLoc.shortLabel} entrance`,
        distance: '100 ft',
        duration: '1 min',
        actionType: 'destination',
        stepFree: true,
        surface: 'Smooth concrete',
        accessibilityNote: mode === 'car' ? 'Designated accessible parking directly adjacent.' : 'Covered bike parking and level doorway.',
      },
    ],
  };

  // Route 2: Direct Street Route (Shortest distance, but has 2 reported barriers/cautions)
  const route2: RouteOption = {
    id: 'route-direct',
    name: '5th Ave & Market St Direct',
    subtitle: mode === 'car'
      ? 'Shortest drive · Active road work on Hospital Blvd · Caution'
      : mode === 'bike'
      ? 'Fastest route · Delivery van in bike lane at 5th & Market'
      : 'Shortest path · Active barrier reports · Caution advised',
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
      'Shortest total travel distance',
      'Direct arterial thoroughfare',
      'Well-lit streetscape'
    ],
    caveats: [
      '1 urgent barrier: delivery truck blocking curb cut and bike lane at 5th & Market',
      '1 moderate barrier: historic stairs (pedestrians) / steep 5.4% incline section',
      'Sections of rough brick pavers and cobblestones'
    ],
    barriers: [barriers[1], barriers[3]],
    steps: [
      {
        id: 's2-1',
        instruction: `Depart ${startLoc.shortLabel} towards 5th Ave`,
        distance: '200 ft',
        duration: '1 min',
        actionType: 'start',
        stepFree: true,
        surface: 'Smooth concrete',
      },
      {
        id: 's2-2',
        instruction: mode === 'car'
          ? 'Proceed northeast along 5th Ave commercial corridor'
          : mode === 'bike'
          ? 'Ride northeast along 5th Ave (Caution: delivery truck obstructing bike lane)'
          : 'Proceed northeast along 5th Ave commercial corridor',
        distance: '0.4 mi',
        duration: `${Math.max(1, Math.round(time2 * 0.5))} mins`,
        actionType: 'straight',
        stepFree: false,
        surface: 'Cobblestone',
        barrierWarning: {
          barrierId: 'barrier-2',
          message: 'Alert: Delivery van blocking curb ramp and bike lane (reported 38m ago). Merge with caution.',
          severity: 'urgent',
          status: 'unverified',
        },
      },
      {
        id: 's2-3',
        instruction: 'Turn left onto Civic Way near the steps',
        distance: '0.2 mi',
        duration: `${Math.max(1, Math.round(time2 * 0.3))} mins`,
        actionType: 'turn-left',
        stepFree: false,
        surface: 'Asphalt',
        incline: '5.4% moderate hill',
        accessibilityNote: 'Steep hill section requiring higher effort.',
      },
      {
        id: 's2-4',
        instruction: `Approach ${destLoc.shortLabel} north entrance`,
        distance: '300 ft',
        duration: '1 min',
        actionType: 'destination',
        stepFree: true,
        surface: 'Smooth concrete',
      },
    ],
  };

  // Route 3: Waterfront Boulevard Route
  const route3: RouteOption = {
    id: 'route-scenic-waterfront',
    name: 'Waterfront Promenade Boulevard',
    subtitle: mode === 'car'
      ? 'Scenic perimeter drive · Low congestion · Smooth highway link'
      : mode === 'bike'
      ? 'Dedicated waterfront bike path · Flat terrain · Scenic river view'
      : 'Scenic flat promenade · Low effort · Wide paths',
    badge: mode === 'car' ? 'Scenic Drive' : mode === 'bike' ? 'Scenic Cycle Track' : 'Scenic Walk',
    isRecommended: false,
    durationMinutes: time3,
    distanceMiles: Number((baseMiles * 1.35).toFixed(1)),
    stepFreePercentage: 96,
    maxSlopePercent: 1.8,
    barrierCount: 1,
    urgentBarrierCount: 0,
    pathPoints: waypoints3,
    travelMode: mode,
    highlights: [
      'Continuous wide pathway / multi-lane scenic roadway',
      'Flat terrain along water (under 1.8% grade)',
      'Scenic views of Riverside Harbor'
    ],
    caveats: [
      '1 unverified report of buckled root pavers near pier 3',
      'Adds extra distance compared to direct street route'
    ],
    barriers: [barriers[4]],
    steps: [
      {
        id: 's3-1',
        instruction: `Depart ${startLoc.shortLabel} east towards Waterfront Promenade`,
        distance: '0.3 mi',
        duration: '2 mins',
        actionType: 'start',
        stepFree: true,
        surface: 'Asphalt',
      },
      {
        id: 's3-2',
        instruction: mode === 'car'
          ? 'Cruise north along Waterfront Promenade scenic roadway'
          : mode === 'bike'
          ? 'Follow dedicated two-way cycle path along waterfront'
          : 'Follow wide paved boardwalk along Waterfront Promenade',
        distance: '0.6 mi',
        duration: `${Math.max(2, Math.round(time3 * 0.6))} mins`,
        actionType: 'straight',
        stepFree: true,
        surface: 'Asphalt',
        incline: 'Flat (< 1.5%)',
        barrierWarning: {
          barrierId: 'barrier-5',
          message: 'Note: Minor tree root buckling on pavers near Pier 3. Pass with caution.',
          severity: 'moderate',
          status: 'unverified',
        },
      },
      {
        id: 's3-3',
        instruction: `Turn west to arrive at ${destLoc.shortLabel}`,
        distance: '150 ft',
        duration: '1 min',
        actionType: 'destination',
        stepFree: true,
        surface: 'Smooth concrete',
      },
    ],
  };

  return [route1, route2, route3];
}
