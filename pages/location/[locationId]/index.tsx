import { useRouter } from 'next/router';
import { prisma } from '@/server/db/client';
import { GetStaticPaths, GetStaticProps } from 'next';

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
  const router = useRouter();

  return <div>I am the page for {location.name} </div>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = Number(params!.locationId);

  const location = (await prisma.location.findUnique({
    where: {
      id: id,
    },
  })) as Location | null;

  if (!location) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
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
