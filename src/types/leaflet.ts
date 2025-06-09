export interface GeocodingResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export interface NASALayer {
  id: string;
  name: string;
  description: string;
  url: string;
  enabled: boolean;
  opacity: number;
}

export interface ClickInfo {
  lat: number;
  lng: number;
  location?: string;
}