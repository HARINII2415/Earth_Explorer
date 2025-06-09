import React from 'react';
import { MapPin, Copy, ExternalLink } from 'lucide-react';
import type { ClickInfo } from '../types/leaflet';

interface InfoPopupProps {
  info: ClickInfo;
  onClose: () => void;
}

export const InfoPopup: React.FC<InfoPopupProps> = ({ info, onClose }) => {
  const copyCoordinates = () => {
    const coords = `${info.lat.toFixed(6)}, ${info.lng.toFixed(6)}`;
    navigator.clipboard.writeText(coords);
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/@${info.lat},${info.lng},15z`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-72 text-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">Location Information</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-slate-300 text-sm">Coordinates</label>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-sm bg-white/10 px-2 py-1 rounded">
              {info.lat.toFixed(6)}, {info.lng.toFixed(6)}
            </span>
            <button
              onClick={copyCoordinates}
              className="p-1 hover:bg-white/10 rounded transition-colors"
              title="Copy coordinates"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {info.location && (
          <div>
            <label className="text-slate-300 text-sm">Address</label>
            <p className="text-sm mt-1">{info.location}</p>
          </div>
        )}

        <div className="pt-2 flex gap-2">
          <button
            onClick={openInGoogleMaps}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};