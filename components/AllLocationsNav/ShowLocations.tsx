// React & Next imports
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

// Leaflet & React-leflet imports
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import styles from './ShowLocations.module.css';

// Type imports
import { LocationType } from './AllMap';
import useSupercluster from 'use-supercluster';

interface ShowLocationsProps {
  locations: LocationType[];
}

// TODO - fix bounds setstate from any type and icons any type
const icons: any = {};
const fetchIcon = (count: number, size: number) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="${styles.clusterMarker}" style="width: ${size}px; height: ${size}px;">
      ${count}
    </div>`,
    });
  }
  return icons[count];
};

export default function ShowLocations({ locations }: ShowLocationsProps) {
  const maxZoom = 22;
  const [bounds, setBounds] = useState<any>(undefined);
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  // get map bounds
  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  React.useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  const points = locations.map((location) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      locationId: location.id,
      name: location.name,
    },
    geometry: {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 100, maxZoom: 17 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        return (
          <Marker
            key={`location-${cluster.properties.locationId}`}
            position={[latitude, longitude]}
          >
            <Popup>
              <Link href={`/location/${cluster.properties.locationId}`}>
                {cluster.properties.name}
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
