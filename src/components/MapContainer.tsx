import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useGeocoding } from '../hooks/useGeocoding';
import { NASA_LAYERS, getLayerUrl } from '../data/nasaLayers';
import type { NASALayer, ClickInfo } from '../types/leaflet';

interface MapContainerProps {
  searchLocation?: { lat: number; lng: number; name: string };
  activeLayers: NASALayer[];
  onMapClick: (info: ClickInfo) => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  searchLocation,
  activeLayers,
  onMapClick,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<{ [key: string]: L.Layer }>({});
  const { reverseGeocode } = useGeocoding();

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: false,
    });

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Base layers
    const esriSatellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '© Esri © NASA',
        maxZoom: 18,
      }
    );

    const openStreetMap = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }
    );

    // Add default satellite layer
    esriSatellite.addTo(map);

    // Layer control
    const baseLayers = {
      'Satellite': esriSatellite,
      'Street Map': openStreetMap,
    };

    L.control.layers(baseLayers, {}, { position: 'bottomleft' }).addTo(map);

    // Click handler
    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      const location = await reverseGeocode(lat, lng);
      onMapClick({ lat, lng, location });
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [reverseGeocode, onMapClick]);

  // Handle search location
  useEffect(() => {
    if (!mapRef.current || !searchLocation) return;

    mapRef.current.flyTo([searchLocation.lat, searchLocation.lng], 12, {
      duration: 1.5,
    });

    // Add marker for searched location
    const marker = L.marker([searchLocation.lat, searchLocation.lng])
      .addTo(mapRef.current)
      .bindPopup(searchLocation.name)
      .openPopup();

    return () => {
      marker.remove();
    };
  }, [searchLocation]);

  // Handle NASA layers
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Remove all NASA layers
    Object.values(layersRef.current).forEach(layer => {
      map.removeLayer(layer);
    });
    layersRef.current = {};

    // Add active layers
    activeLayers.forEach(layerConfig => {
      if (layerConfig.enabled) {
        const layerUrl = getLayerUrl(layerConfig);
        
        const layer = L.tileLayer(layerUrl, {
          opacity: layerConfig.opacity,
          attribution: '© NASA EOSDIS',
          maxZoom: 9,
        });

        layer.addTo(map);
        layersRef.current[layerConfig.id] = layer;
      }
    });
  }, [activeLayers]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full relative"
      style={{ background: '#0f172a' }}
    />
  );
};