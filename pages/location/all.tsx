import { prisma } from '@/server/db/client';
import { DefaultUser } from 'next-auth';
import DeleteLocation from '@/components/DeleteLocation/DeleteLocation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import AllLocationsNav from '@/components/AllLocationsNav/AllLocationsNav';
import CountryFilter from '@/components/AllLocationsNav/CountryFilter';

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
}

export default function AllLocations({
  locations,
  locationsCount,
  totalPages,
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
      <CountryFilter />
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
  const page = Number(context.query.page);
  const country = context.query.country as string;
  const pageSize = 2;

  // Query db with country params
  if (country) {
    const countryFormatted = country.charAt(0).toUpperCase() + country.slice(1);
    const locationsCount = await prisma.location.count({
      where: {
        country: countryFormatted,
      },
    });
    const totalPages = Math.ceil(locationsCount / pageSize);

    const locations = await prisma.location.findMany({
      where: {
        country: countryFormatted,
      },
      skip: (page - 1) * 2,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
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
        totalPages: totalPages,
      },
    };
  }

  // Query db with page only
  const locations = await prisma.location.findMany({
    skip: (page - 1) * 2,
    take: pageSize,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
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
  const totalPages = Math.ceil(locationsCount / pageSize);

  return {
    props: {
      locations: JSON.parse(JSON.stringify(locations)),
      locationsCount: locationsCount,
      totalPages: totalPages,
    },
  };
};
