import Link from 'next/link';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import ShowLocations from './ShowLocations';

export interface LocationType {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

interface AllMapProps {
  locations: LocationType[];
}

export default function AllMap({ locations }: AllMapProps) {
  console.log(locations);
  return (
    <div>
      <MapContainer
        center={[52.4255, 7.71955]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: '600px', width: '100%', borderRadius: '10px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {locations.map((location) => {
          return (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                <Link href={`/location/${location.id}`}>{location.name}</Link>
              </Popup>
            </Marker>
          );
        })} */}
        <ShowLocations locations={locations} />
      </MapContainer>
    </div>
  );
}
