// Next, React & CSS imports
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// Auth imports
import { prisma } from '@/server/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// Component imports
import { LocationForm } from '@/components/LocationForm/LocationForm';

// Helpers
import { createCountryValue } from '@/server/react-select-helpers/createCountryValue';
import { createSportsValuesArray } from '@/server/react-select-helpers/createSportsValuesArray';
import { createWaveTypeValue } from '@/server/react-select-helpers/createWaveTypeValue';

// Type imports
import { WaveType } from '@/components/LocationForm/WaveAndSportsForm/WaveSelect/WaveSelect';
import { SportType } from '@/components/LocationForm/WaveAndSportsForm/SportsSelect/SportsSelect';
import { CountryType } from '@/components/LocationForm/GeographicForm/GeographicForm';

export interface LocationType {
  id: number;
  name: string;
  country: CountryType;
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
  location: LocationType;
}

export default function LocationEdit({ location }: LocationEditProps) {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh' }}>
      <div>I am the edit page for {router.query.locationId}</div>
      <LocationForm location={location} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Verify user session is valid
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Verify query params can be converted to valid number
  const locationId = context.query.locationId;
  if (Number.isNaN(Number(locationId))) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Verify location is valid
  const location = await prisma.location.findUnique({
    where: {
      id: Number(locationId),
    },
  });

  // Clone location to add country, sports, wavetype values to object
  // for use with 'react-select'
  if (location) {
    const locationClone = JSON.parse(JSON.stringify(location));

    locationClone.country = createCountryValue(location.country);
    locationClone.waveType = createWaveTypeValue(location.wavetype);
    locationClone.sports = createSportsValuesArray(
      location.surfing,
      location.windsurfing,
      location.kitesurfing,
      location.wingsurfing,
      location.paddleboarding
    );

    return {
      props: {
        location: JSON.parse(JSON.stringify(locationClone)),
      },
    };
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
