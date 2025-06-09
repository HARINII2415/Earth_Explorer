import React, { useState } from 'react';
import { Globe, Satellite } from 'lucide-react';
import { MapContainer } from './components/MapContainer';
import { SearchBar } from './components/SearchBar';
import { LayerControl } from './components/LayerControl';
import { InfoPopup } from './components/InfoPopup';
import { NASA_LAYERS } from './data/nasaLayers';
import type { NASALayer, ClickInfo } from './types/leaflet';

function App() {
  const [searchLocation, setSearchLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);
  const [layers, setLayers] = useState<NASALayer[]>(NASA_LAYERS);
  const [clickInfo, setClickInfo] = useState<ClickInfo | null>(null);

  const handleLocationSelect = (lat: number, lng: number, name: string) => {
    setSearchLocation({ lat, lng, name });
  };

  const handleLayerToggle = (layerId: string) => {
    setLayers(prev =>
      prev.map(layer =>
        layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  };

  const handleOpacityChange = (layerId: string, opacity: number) => {
    setLayers(prev =>
      prev.map(layer =>
        layer.id === layerId ? { ...layer, opacity } : layer
      )
    );
  };

  const handleMapClick = (info: ClickInfo) => {
    setClickInfo(info);
  };

  const activeLayers = layers.filter(layer => layer.enabled);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-slate-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
              <Globe className="w-6 h-6 text-blue-400" />
              <h1 className="text-white font-bold text-lg">Earth Explorer</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <SearchBar onLocationSelect={handleLocationSelect} />
            <LayerControl
              layers={layers}
              onLayerToggle={handleLayerToggle}
              onOpacityChange={handleOpacityChange}
            />
          </div>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        searchLocation={searchLocation}
        activeLayers={activeLayers}
        onMapClick={handleMapClick}
      />

      {/* Click Info Popup */}
      {clickInfo && (
        <div className="absolute bottom-4 left-4 z-20">
          <InfoPopup
            info={clickInfo}
            onClose={() => setClickInfo(null)}
          />
        </div>
      )}

      {/* Status Bar */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-sm">
          <Satellite className="w-4 h-4 text-green-400" />
          <span>
            {activeLayers.length} NASA layer{activeLayers.length !== 1 ? 's' : ''} active
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

