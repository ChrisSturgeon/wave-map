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
  const currentPage = Number(context.query.page);
  const country = context.query.country as string;
  const pageSize = 5;
  const countryValues = await generateDistinctCountriesValues();

  // Query db for all locations with country parameter
  if (country) {
    const countryFormatted = capitaliseWord(country);
    const locationsCount = await prisma.location.count({
      where: {
        country: countryFormatted,
      },
    });
    const totalPagesCount = Math.ceil(locationsCount / pageSize);
    const locations = await prisma.location.findMany({
      where: {
        country: countryFormatted,
      },
      select: {
        id: true,
        name: true,
      },
      skip: (currentPage - 1) * 2,
      take: pageSize,
      orderBy: {
        name: 'asc',
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

    return {
      props: {
        locations: JSON.parse(JSON.stringify(locations)),
        locationsCount: locationsCount,
        totalPages: totalPagesCount,
        countryValues: countryValues,
      },
    };
  }

  // Query db with page only
  const locations = await prisma.location.findMany({
    skip: (currentPage - 1) * 2,
    take: pageSize,
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
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

  const locationsCount = await prisma.location.count();
  const totalPagesCount = Math.ceil(locationsCount / pageSize);

  return {
    props: {
      locations: JSON.parse(JSON.stringify(locations)),
      locationsCount: locationsCount,
      totalPages: totalPagesCount,
      countryValues: countryValues,
    },
  };
};
