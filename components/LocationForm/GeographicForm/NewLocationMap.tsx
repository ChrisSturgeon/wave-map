import style from './NewLocationMap.module.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

interface MapData {
  latitude: number | null;
  longitude: number | null;
  mapZoom: number;
}

type NewLocationMapProps = MapData & {
  updateFields: (fields: Partial<MapData>) => void;
};

const NewLocationMap = ({
  latitude,
  longitude,
  mapZoom,
  updateFields,
}: NewLocationMapProps) => {
  // Event listeners for map
  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        updateFields({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          mapZoom: map.getZoom(),
        });
        map.flyTo(e.latlng);
      },
    });
    return null;
  };

  return (
    <div className={style.mapWrapper}>
      <MapContainer
        className={style.mapContainer}
        center={
          latitude && longitude ? [latitude, longitude] : [52.4255, 7.71955]
        }
        zoom={mapZoom ? mapZoom : 4}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker
          position={latitude && longitude ? [latitude, longitude] : [0, 0]}
        />
        <LocationFinderDummy />
      </MapContainer>
    </div>
  );
};

const MemoizedMap = React.memo(NewLocationMap);

export default MemoizedMap;
