import { MapContainer, TileLayer } from 'react-leaflet';
import ShowLocations from './ShowLocations';

export interface LocationType {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

interface AllMapProps {
  locations: LocationType[];
  coords: number[] | undefined;
  zoom: number | undefined;
}

export default function AllMap({ locations, coords, zoom }: AllMapProps) {
  return (
    <div>
      <MapContainer
        center={coords ? [coords![0], coords![1]] : [52.4255, 7.71955]}
        zoom={zoom ? zoom : 2.5}
        scrollWheelZoom={false}
        style={{ height: '600px', width: '100%', borderRadius: '10px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ShowLocations locations={locations} />
      </MapContainer>
    </div>
  );
}
