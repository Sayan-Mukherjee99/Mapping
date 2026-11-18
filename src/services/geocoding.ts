import { LocationPreset, RealPlace } from '../types';
import { LOCATION_PRESETS } from '../data/mockData';

// Free Geocoding API powered by OpenStreetMap & Photon (Komoot)
// 100% Free, Zero API Key required, No credit card, No rate limit roadblocks for prototypes
const PHOTON_API_URL = 'https://photon.komoot.io/api/';

export async function searchFreeRealPlaces(query: string): Promise<RealPlace[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  // 1. Check local preset landmarks first for instantaneous matching
  const localMatches = LOCATION_PRESETS.filter(loc => 
    loc.name.toLowerCase().includes(trimmed.toLowerCase()) ||
    loc.address.toLowerCase().includes(trimmed.toLowerCase()) ||
    loc.shortLabel.toLowerCase().includes(trimmed.toLowerCase())
  ).map(loc => ({
    id: loc.id,
    name: loc.name,
    shortLabel: loc.shortLabel,
    address: loc.address,
    city: 'Civic District',
    country: 'United States',
    lat: 37.7749 + (loc.y - 500) * 0.0001,
    lng: -122.4194 + (loc.x - 500) * 0.0001,
    x: loc.x,
    y: loc.y,
    isRealLocation: false,
  }));

  try {
    // 2. Fetch live worldwide real places from OpenStreetMap Photon API
    const response = await fetch(
      `${PHOTON_API_URL}?q=${encodeURIComponent(trimmed)}&limit=6`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return localMatches;
    }

    const data = await response.json();
    if (!data || !data.features || !Array.isArray(data.features)) {
      return localMatches;
    }

    const realPlaces: RealPlace[] = data.features.map((feature: any, idx: number) => {
      const props = feature.properties || {};
      const coords = feature.geometry?.coordinates || [0, 0];
      const lng = coords[0] || 0;
      const lat = coords[1] || 0;

      // Extract meaningful name and address components
      const placeName = props.name || props.street || props.city || trimmed;
      const addressParts = [
        props.housenumber,
        props.street,
        props.district,
        props.city,
        props.state,
        props.country
      ].filter(Boolean);

      const formattedAddress = addressParts.join(', ') || props.name || trimmed;

      // Deterministically map real lat/lng to SVG map coordinate boundaries (100 to 900)
      // so any place in the world can be visually routed on the map canvas!
      const pseudoX = 180 + Math.abs((lng * 1000) % 640);
      const pseudoY = 180 + Math.abs((lat * 1000) % 540);

      return {
        id: `real-${props.osm_id || Date.now()}-${idx}`,
        name: placeName,
        shortLabel: props.name || props.street || placeName.split(',')[0],
        address: formattedAddress,
        city: props.city || props.district || props.state || '',
        country: props.country || '',
        lat,
        lng,
        x: Math.round(pseudoX),
        y: Math.round(pseudoY),
        isRealLocation: true,
      };
    });

    // Merge real worldwide places with local matches
    return [...realPlaces, ...localMatches.filter(l => !realPlaces.some(r => r.name.toLowerCase() === l.name.toLowerCase()))];
  } catch (error) {
    console.warn('Free geocoding network call failed, falling back to local dataset:', error);
    return localMatches;
  }
}
