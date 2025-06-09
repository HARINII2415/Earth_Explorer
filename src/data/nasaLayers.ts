import type { NASALayer } from '../types/leaflet';

export const NASA_LAYERS: NASALayer[] = [
  {
    id: 'modis_terra_truecolor',
    name: 'MODIS Terra True Color',
    description: 'Daily true color composite from MODIS Terra satellite',
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-geo/1.0.0/MODIS_Terra_CorrectedReflectance_TrueColor/default/{time}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
    enabled: false,
    opacity: 0.8
  },
  {
    id: 'modis_aqua_truecolor',
    name: 'MODIS Aqua True Color',
    description: 'Daily true color composite from MODIS Aqua satellite',
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-geo/1.0.0/MODIS_Aqua_CorrectedReflectance_TrueColor/default/{time}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
    enabled: false,
    opacity: 0.8
  },
  {
    id: 'viirs_snpp_daynight',
    name: 'VIIRS Day/Night Band',
    description: 'Day/Night band composite from VIIRS sensor',
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-geo/1.0.0/VIIRS_SNPP_DayNightBand_ENCC/default/{time}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
    enabled: false,
    opacity: 0.7
  },
  {
    id: 'modis_fires',
    name: 'MODIS Active Fires',
    description: 'Active fire detections from MODIS',
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-geo/1.0.0/MODIS_Fires_All/default/{time}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png',
    enabled: false,
    opacity: 0.9
  }
];

export const getLayerUrl = (layer: NASALayer, date?: string): string => {
  const today = date || new Date().toISOString().split('T')[0];
  return layer.url.replace('{time}', today);
};