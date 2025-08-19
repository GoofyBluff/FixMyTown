import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOXGL_ACCESS_TOKEN;

interface MapComponentProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // ✅ Always start at Bangalore
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.5946, 12.9716], // Bangalore (lng, lat)
      zoom: 12,
    });

    // Zoom + rotation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Cursor effects
    mapRef.current.on("mouseenter", () => {
      mapRef.current!.getCanvas().style.cursor = "crosshair";
    });
    mapRef.current.on("mouseleave", () => {
      mapRef.current!.getCanvas().style.cursor = "";
    });

    // Handle clicks
    mapRef.current.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      // Add/update marker
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker({ draggable: true, color: "#FF5733" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current!);

        // Dragging style + callback
        markerRef.current.on("dragstart", () => {
          mapRef.current!.getCanvas().style.cursor = "grabbing";
        });

        markerRef.current.on("dragend", async () => {
          mapRef.current!.getCanvas().style.cursor = "crosshair";
          const lngLat = markerRef.current!.getLngLat();
          const address = await reverseGeocode(lngLat.lng, lngLat.lat);
          onLocationSelect(lngLat.lat, lngLat.lng, address);
        });
      }

      // Reverse geocode clicked location
      const address = await reverseGeocode(lng, lat);
      onLocationSelect(lat, lng, address);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [onLocationSelect]);

  // ✅ Reverse geocoding helper
  async function reverseGeocode(lng: number, lat: number) {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await res.json();
      return data.features && data.features[0]
        ? data.features[0].place_name
        : `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch {
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  }

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
      }}
    />
  );
};

export default MapComponent;
