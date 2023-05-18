import styles from '@/styles/all.module.css';

// Next & React imports
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Auth imports
import { prisma } from '@/server/db/client';

// Type imports
import { GetServerSideProps } from 'next';

// Component imports
import AllLocationsNav from '@/components/AllLocationsNav/AllLocationsNav';
import CountryFilter from '@/components/AllLocationsNav/CountryFilter';
import SportFilter from '@/components/AllLocationsNav/SportFilter';

// Helper imports
import generateDistinctCountriesValues from '@/server/react-select-helpers/generateDistinctCountriesValues';
import { generateMapCenter } from '@/server/resources/countries';

interface CountryValue {
  label: string;
  value: string;
}

interface LocationType {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface Props {
  locations: LocationType[];
  locationsCount: number;
  totalPages: number;
  countryValues: CountryValue[];
}

export default function AllLocations({
  locations,
  locationsCount,
  totalPages,
  countryValues,
}: Props) {
  const router = useRouter();
  const currentPage = Number(router.query['page']);
  const country = router.query['country'] as string;
  const sport = router.query['sport'] as string;
  const countryCoords = generateMapCenter(country);
  const [view, setView] = useState('map');

  const MapWithNoSSR = dynamic(
    () => import('@/components/AllLocationsNav/AllMap'),
    {
      ssr: false,
    }
  );

  function toggleView() {
    if (view === 'map') {
      setView('list');
      return;
    }
    setView('map');
  }

  return (
    <div className={styles.wrapper}>
      <h1>All Locations</h1>
      <div>Found {locationsCount} locations</div>
      <AllLocationsNav
        currentPage={currentPage}
        totalPages={totalPages}
        country={country}
      />
      <div>
        <CountryFilter countryValues={countryValues} />
        <SportFilter />
      </div>
      <button onClick={toggleView}>Toggle View</button>
      {view === 'map' && (
        <MapWithNoSSR
          locations={locations}
          coords={countryCoords?.coodinates}
          zoom={countryCoords?.zoom}
        />
      )}
      {view === 'list' && <div>list view</div>}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageSize = 10;
  const currentPage = Number(context.query.page);
  const country = context.query.country as string;
  const sport = context.query.sport as string;
  const countryValues = await generateDistinctCountriesValues(sport);

  try {
    const locations = await prisma.location.findMany({
      where: {
        country: country ? country : undefined,
        surfing: sport === 'surfing' ? true : undefined,
        windsurfing: sport === 'windsurfing' ? true : undefined,
        kitesurfing: sport === 'kitesurfing' ? true : undefined,
        wingsurfing: sport === 'wingsurfing' ? true : undefined,
        paddleboarding: sport === 'paddleboarding' ? true : undefined,
      },
      // skip: (currentPage - 1) * 2,
      // take: pageSize,
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
      },
    });

    if (!locations) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const locationsCount = await prisma.location.count({
      where: {
        country: country ? country : undefined,
        surfing: sport === 'surfing' ? true : undefined,
        windsurfing: sport === 'windsurfing' ? true : undefined,
        kitesurfing: sport === 'kitesurfing' ? true : undefined,
        wingsurfing: sport === 'wingsurfing' ? true : undefined,
        paddleboarding: sport === 'paddleboarding' ? true : undefined,
      },
    });
    const totalPagesCount = Math.ceil(locationsCount / pageSize);

    return {
      props: {
        locations: JSON.parse(JSON.stringify(locations)),
        locationsCount: locationsCount,
        totalPages: totalPagesCount,
        countryValues: countryValues,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};
