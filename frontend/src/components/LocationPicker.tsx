// LocationPicker.tsx
import React, { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_ACCESS_TOKEN";

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationPickerProps {
  location: Location | null;
  onChange: (location: Location) => void;
}

// 📍 Default Bangalore
const defaultLocation: Location = { latitude: 12.9716, longitude: 77.5946 };

const LocationPicker: React.FC<LocationPickerProps> = ({ location, onChange }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapboxMap | null>(null);
  const marker = useRef<Marker | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize once

    // ✅ Always start at Bangalore
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [defaultLocation.longitude, defaultLocation.latitude],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Marker starts in Bangalore
    marker.current = new mapboxgl.Marker({ draggable: true, color: "#FF5733" })
      .setLngLat([defaultLocation.longitude, defaultLocation.latitude])
      .addTo(map.current);

    // Handle drag
    marker.current.on("dragend", () => {
      const lngLat = marker.current!.getLngLat();
      onChange({ latitude: lngLat.lat, longitude: lngLat.lng });
    });

    // Handle map click
    map.current.on("click", (e) => {
      marker.current!.setLngLat(e.lngLat);
      onChange({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
    });

    return () => {
      map.current?.remove();
    };
  }, [onChange]);

  // ✅ If location changes later, update marker + map center
  useEffect(() => {
    if (map.current && marker.current && location) {
      map.current.setCenter([location.longitude, location.latitude]);
      marker.current.setLngLat([location.longitude, location.latitude]);
    }
  }, [location]);

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
        }}
      />
      <p className="text-sm text-gray-600 text-center">
        📍 {location?.latitude.toFixed(4) || defaultLocation.latitude},{" "}
        {location?.longitude.toFixed(4) || defaultLocation.longitude}
      </p>
    </div>
  );
};

export default LocationPicker;
