// Mapbox service for location search and geocoding
// You'll need to add your Mapbox access token to your environment variables

const MAPBOX_ACCESS_TOKEN =
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ||
  "pk.eyJ1IjoicGF0a2FuIiwiYSI6ImNtZDdkaDlxbTBmMTgybHF1djQ0dWR4ZTEifQ.LI1-0uV8Bb7MZfa1webYaw";

export interface MapboxFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: {
    wikidata?: string;
    short_code?: string;
    foursquare?: string;
    landmark?: boolean;
    address?: string;
    category?: string;
    maki?: string;
  };
  text: string;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  context?: Array<{
    id: string;
    short_code?: string;
    wikidata?: string;
    text: string;
  }>;
}

export interface MapboxGeocodingResponse {
  type: string;
  query: string[];
  features: MapboxFeature[];
  attribution: string;
}

export interface MapboxReverseGeocodingResponse {
  type: string;
  query: number[];
  features: MapboxFeature[];
  attribution: string;
}

// Search for locations based on query
export async function searchLocations(query: string): Promise<MapboxFeature[]> {
  if (!MAPBOX_ACCESS_TOKEN) {
    console.warn(
      "Mapbox access token not found. Please add VITE_MAPBOX_ACCESS_TOKEN to your environment variables."
    );
    return [];
  }

  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place,address,poi&limit=5&language=en`
    );

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data: MapboxGeocodingResponse = await response.json();
    return data.features;
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
}

// Reverse geocoding - get location name from coordinates
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  if (!MAPBOX_ACCESS_TOKEN) {
    console.warn(
      "Mapbox access token not found. Please add VITE_MAPBOX_ACCESS_TOKEN to your environment variables."
    );
    return "";
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place,address&limit=1&language=en`
    );

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data: MapboxReverseGeocodingResponse = await response.json();

    if (data.features.length > 0) {
      return data.features[0].place_name;
    }

    return "";
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return "";
  }
}

// Get coordinates from location name
export async function getCoordinates(
  locationName: string
): Promise<{ lat: number; lng: number } | null> {
  if (!MAPBOX_ACCESS_TOKEN) {
    console.warn(
      "Mapbox access token not found. Please add VITE_MAPBOX_ACCESS_TOKEN to your environment variables."
    );
    return null;
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place,address&limit=1&language=en`
    );

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data: MapboxGeocodingResponse = await response.json();

    if (data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
    }

    return null;
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return null;
  }
}

// Calculate distance between two coordinates in kilometers
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Format distance for display
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  } else if (distance < 10) {
    return `${distance.toFixed(1)}km`;
  } else {
    return `${Math.round(distance)}km`;
  }
}

// Get a simplified location name from full place name
export function getSimplifiedLocationName(placeName: string): string {
  // Remove country and postal code, keep city and state/province
  const parts = placeName.split(", ");

  if (parts.length <= 2) {
    return placeName;
  }

  // Keep first two parts (usually city, state/province)
  return parts.slice(0, 2).join(", ");
}

// Validate if coordinates are within reasonable bounds
export function isValidCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// Get a default location (can be customized)
export function getDefaultLocation(): { lat: number; lng: number } {
  return { lat: 40.7128, lng: -74.006 }; // New York City
}
