import { GetServerSideProps } from 'next';
import { prisma } from '@/server/db/client';

interface LocationType {
  id: Number;
  name: String;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
    emailVerified: boolean;
    id: string;
    image: string;
    name: string;
  };
}

interface Props {
  locations: LocationType[];
}

export default function AllLocations({ locations }: Props) {
  return (
    <>
      <h1>All Locations</h1>
      <ul>
        {locations.map((location: LocationType) => {
          return (
            <li key={location.name as React.Key}>
              {location.name} posted by {location.user.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export const getServerSideProps = async () => {
  const locations = await prisma.location.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });

  if (locations) {
    return {
      props: {
        locations: JSON.parse(JSON.stringify(locations)),
      },
    };
  }
};
