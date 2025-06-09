import React from 'react';
import { Layers, Eye, EyeOff } from 'lucide-react';
import type { NASALayer } from '../types/leaflet';

interface LayerControlProps {
  layers: NASALayer[];
  onLayerToggle: (layerId: string) => void;
  onOpacityChange: (layerId: string, opacity: number) => void;
}

export const LayerControl: React.FC<LayerControlProps> = ({
  layers,
  onLayerToggle,
  onOpacityChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
      >
        <Layers className="w-5 h-5" />
        <span className="font-medium">Layers</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3">NASA Earth Observation Layers</h3>
            <div className="space-y-3">
              {layers.map((layer) => (
                <div key={layer.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onLayerToggle(layer.id)}
                        className="flex-shrink-0"
                      >
                        {layer.enabled ? (
                          <Eye className="w-4 h-4 text-blue-400" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      <span className="text-white font-medium text-sm">
                        {layer.name}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs mb-2">
                    {layer.description}
                  </p>
                  {layer.enabled && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300 text-xs">Opacity:</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={layer.opacity}
                        onChange={(e) => onOpacityChange(layer.id, parseFloat(e.target.value))}
                        className="flex-1 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-slate-300 text-xs w-8">
                        {Math.round(layer.opacity * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};