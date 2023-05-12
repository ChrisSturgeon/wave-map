// Next & React imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// Auth imports
import { prisma } from '@/server/db/client';

// Type imports
import { GetServerSideProps } from 'next';
import { DefaultUser } from 'next-auth';

// Component imports
import DeleteLocation from '@/components/DeleteLocation/DeleteLocation';
import AllLocationsNav from '@/components/AllLocationsNav/AllLocationsNav';
import CountryFilter from '@/components/AllLocationsNav/CountryFilter';
import SportFilter from '@/components/AllLocationsNav/SportFilter';

// Helper imports
import { capitaliseWord } from '@/server/resources/helpers';
import generateDistinctCountriesValues from '@/server/react-select-helpers/generateDistinctCountriesValues';

interface CountryValue {
  label: string;
  value: string;
}

interface LocationType {
  id: Number;
  name: String;
  createdAt: Date;
  updatedAt: Date;
  user: DefaultUser;
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
  console.log(locations);

  return (
    <div style={{ minHeight: '100vh' }}>
      <h1>All Locations</h1>
      <div>Found {locationsCount} locations</div>
      <AllLocationsNav
        currentPage={currentPage}
        totalPages={totalPages}
        country={country}
      />
      <CountryFilter countryValues={countryValues} />
      <SportFilter />
      <ul>
        {locations.map((location: LocationType) => {
          return (
            <li key={location.name as React.Key}>
              <Link href={`${location.id}`}>{location.name}</Link>
              <DeleteLocation location={location.id} />
            </li>
          );
        })}
      </ul>
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
      skip: (currentPage - 1) * 2,
      take: pageSize,
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
