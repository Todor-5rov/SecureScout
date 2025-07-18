import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getDefaultLocation } from "../services/mapboxService";

// Set Mapbox access token
const MAPBOX_ACCESS_TOKEN =
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ||
  "pk.eyJ1IjoicGF0a2FuIiwiYSI6ImNtZDdkaDlxbTBmMTgybHF1djQ0dWR4ZTEifQ.LI1-0uV8Bb7MZfa1webYaw";
if (MAPBOX_ACCESS_TOKEN) {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
}

interface MapboxMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    title?: string;
    description?: string;
    color?: string;
  }>;
  onMarkerClick?: (markerId: string) => void;
  className?: string;
  height?: string;
  interactive?: boolean;
}

export function MapboxMap({
  center = getDefaultLocation(),
  zoom = 10,
  markers = [],
  onMarkerClick,
  className = "",
  height = "400px",
  interactive = true,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_ACCESS_TOKEN) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [center[1], center[0]], // Mapbox expects [lng, lat]
      zoom: zoom,
      interactive: interactive,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Handle map load
    map.current.on("load", () => {
      setMapLoaded(true);
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom, interactive]);

  // Update markers when they change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll(".mapboxgl-marker");
    existingMarkers.forEach((marker) => marker.remove());

    // Add new markers
    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = marker.color || "#3B82F6";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";

      // Add tooltip
      if (marker.title) {
        el.title = marker.title;
      }

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold text-sm">${marker.title || "Location"}</h3>
          ${marker.description ? `<p class="text-xs text-gray-600 mt-1">${marker.description}</p>` : ""}
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([marker.position[1], marker.position[0]]) // Mapbox expects [lng, lat]
        .setPopup(popup)
        .addTo(map.current!);

      // Handle marker click
      if (onMarkerClick) {
        el.addEventListener("click", () => {
          onMarkerClick(marker.id);
        });
      }
    });
  }, [markers, mapLoaded, onMarkerClick]);

  // Update center when it changes
  useEffect(() => {
    if (map.current && mapLoaded) {
      map.current.setCenter([center[1], center[0]]);
    }
  }, [center, mapLoaded]);

  // Update zoom when it changes
  useEffect(() => {
    if (map.current && mapLoaded) {
      map.current.setZoom(zoom);
    }
  }, [zoom, mapLoaded]);

  if (!MAPBOX_ACCESS_TOKEN) {
    return (
      <div
        className={`bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center p-4">
          <p className="text-gray-500 text-sm">
            Mapbox access token not found.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Add VITE_MAPBOX_ACCESS_TOKEN to your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className={`rounded-md overflow-hidden ${className}`}
      style={{ height }}
    />
  );
}

// Simple map component for displaying a single location
interface SimpleMapProps {
  location: [number, number];
  title?: string;
  description?: string;
  className?: string;
  height?: string;
}

export function SimpleMap({
  location,
  title,
  description,
  className = "",
  height = "300px",
}: SimpleMapProps) {
  const markers = title
    ? [
        {
          id: "location",
          position: location,
          title,
          description,
          color: "#3B82F6",
        },
      ]
    : [];

  return (
    <MapboxMap
      center={location}
      zoom={12}
      markers={markers}
      className={className}
      height={height}
    />
  );
}
