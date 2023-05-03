import { prisma } from '@/server/db/client';
import { DefaultUser } from 'next-auth';
import DeleteLocation from '@/components/DeleteLocation/DeleteLocation';

interface LocationType {
  id: Number;
  name: String;
  createdAt: Date;
  updatedAt: Date;
  user: DefaultUser;
}

interface Props {
  locations: LocationType[];
}

export default function AllLocations({ locations }: Props) {
  console.log(locations);
  return (
    <>
      <h1>All Locations</h1>
      <ul>
        {locations.map((location: LocationType) => {
          return (
            <li key={location.name as React.Key}>
              {location.name} posted by {location.user.name}
              <DeleteLocation location={location.id} />
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
