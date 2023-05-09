import { useRouter } from 'next/router';
import { prisma } from '@/server/db/client';
import { LocationForm } from '@/components/LocationForm/LocationForm';

export default function LocationEdit({ location }) {
  const router = useRouter();
  console.log(location);

  return (
    <>
      <div>I am the edit page for {router.query.locationId}</div>
      <LocationForm location={location} />
    </>
  );
}

export const getServerSideProps = async (context) => {
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
