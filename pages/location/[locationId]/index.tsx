import { prisma } from '@/server/db/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

interface Location {
  id: number;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  latitude: number;
  longitude: number;
  wavetype: string;
  surfing: boolean;
  windsurfing: boolean;
  kitesurfing: boolean;
  wingsurfing: boolean;
  paddleboarding: boolean;
  parking: string;
  toilets: string;
  cafe: string;
}

interface LocationPageProps {
  location: Location;
}

export default function LocationPage({ location }: LocationPageProps) {
  console.log(location);
  return (
    <div>
      <p>I am the page for {location.name}</p>
      <Link href={`${location.id}/edit`}>Edit</Link>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = Number(params!.locationId);

  if (Number.isNaN(Number(id))) {
    return {
      notFound: true,
    };
  }

  const location = (await prisma.location.findUnique({
    where: {
      id: id,
    },
  })) as Location | null;

  if (!location) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      location: JSON.parse(JSON.stringify(location)),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: locations.map((location) => ({
      params: {
        locationId: location.id.toString(),
      },
    })),
    fallback: 'blocking',
  };
};
