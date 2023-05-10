import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { prisma } from '@/server/db/client';
import { LocationForm } from '@/components/LocationForm/LocationForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { WaveType } from '@/components/LocationForm/WaveAndSportsForm/WaveSelect/WaveSelect';
import { SportType } from '@/components/LocationForm/WaveAndSportsForm/SportsSelect/SportsSelect';

interface Location {
  id: number;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  latitude: number;
  longitude: number;
  wavetype: string;
  waveType: WaveType;
  sports: SportType[];
  surfing: boolean;
  windsurfing: boolean;
  kitesurfing: boolean;
  wingsurfing: boolean;
  paddleboarding: boolean;
  parking: string;
  toilets: string;
  cafe: string;
}

interface LocationEditProps {
  location: Location;
}

export default function LocationEdit({ location }: LocationEditProps) {
  const router = useRouter();

  return (
    <>
      <div>I am the edit page for {router.query.locationId}</div>
      <LocationForm location={location} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Verify valid session
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const locationId = context.query.locationId;

  const location = await prisma.location.findUnique({
    where: {
      id: Number(locationId),
    },
  });

  if (location) {
    const locationClone = JSON.parse(JSON.stringify(location));

    if (location.surfing) {
      locationClone.sports = [];
      locationClone.sports.push({
        label: 'Surfing',
        value: 'surfing',
      });
    }

    if (location.windsurfing) {
      locationClone.sports = [];
      locationClone.sports.push({
        label: 'Windsurfing',
        value: 'windsurfing',
      });
    }

    // Set WaveType
    const waveType = location.wavetype;
    locationClone.waveType = {
      label: waveType
        .split(' ')
        .map((word) => {
          const letters = word.split('');
          return letters[0].toUpperCase() + letters.slice(1).join('');
        })
        .join(' '),
      value: waveType,
    };

    return {
      props: {
        location: JSON.parse(JSON.stringify(locationClone)),
      },
    };
  }

  return {
    props: {},
  };
};
