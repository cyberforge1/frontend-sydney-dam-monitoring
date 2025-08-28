// src/components/GoogleMapComponent/GoogleMapComponent.tsx

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapComponentProps {
  lat: number | string | Record<string, unknown>;
  lng: number | string | Record<string, unknown>;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Accept number | string | {$numberDecimal: string} and return a number or NaN
function toNumber(v: unknown): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return parseFloat(v);
  if (v && typeof v === 'object') {
    const maybe = (v as any).$numberDecimal ?? (v as any).value ?? (v as any).val;
    if (typeof maybe === 'string') return parseFloat(maybe);
    if (typeof maybe === 'number') return maybe;
  }
  return NaN;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const numLat = toNumber(lat);
    const numLng = toNumber(lng);

    if (Number.isNaN(numLat) || Number.isNaN(numLng)) {
      // Quietly skip rendering the map rather than spamming console
      if (import.meta.env.DEV) {
        console.warn('GoogleMapComponent: invalid coordinates', { lat, lng });
      }
      return;
    }

    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '', // must be set in .env
      version: 'weekly',
    });

    loader
      .load()
      .then(() => {
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: numLat, lng: numLng },
          zoom: 10,
          // Optional: mapId for vector basemap if your project has one
          // mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
        });

        // Prefer AdvancedMarkerElement when available (deprecation-safe)
        const AdvancedMarker = (google.maps as any)?.marker?.AdvancedMarkerElement;
        if (AdvancedMarker) {
          new AdvancedMarker({
            map,
            position: { lat: numLat, lng: numLng },
          });
        } else {
          // Fallback to classic Marker (may log deprecation warning)
          new google.maps.Marker({
            position: { lat: numLat, lng: numLng },
            map,
          });
        }
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.error('Error loading Google Maps API:', err);
        }
      });
  }, [lat, lng]);

  return <div ref={mapRef} style={containerStyle} />;
};

export default GoogleMapComponent;
