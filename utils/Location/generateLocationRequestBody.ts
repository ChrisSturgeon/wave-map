import { LocationFormData } from '@/components/LocationForm/LocationForm';

// Generates request body for POST/PUT request for new/edit location form
export function generateLocationRequestBody(data: LocationFormData) {
  const {
    name,
    country,
    latitude,
    longitude,
    waveType,
    sports,
    parking,
    toilets,
    cafe,
  } = data;

  const isSurfingLocation = sports!.find((sport) => sport.value === 'surfing')
    ? true
    : false;

  const isWindsurfingLocation = sports!.find(
    (sport) => sport.value === 'windsurfing'
  )
    ? true
    : false;

  const isKitesurfingLocation = sports!.find(
    (sport) => sport.value === 'kitesurfing'
  )
    ? true
    : false;

  const isWingsurfingLocation = sports!.find(
    (sport) => sport.value === 'wingsurfing'
  )
    ? true
    : false;

  const isPaddleboardingLocation = sports!.find(
    (sport) => sport.value === 'paddleboarding'
  )
    ? true
    : false;

  const requestBody = {
    name,
    country: country!.value,
    latitude,
    longitude,
    waveType: waveType!.value,
    surfing: isSurfingLocation,
    windsurfing: isWindsurfingLocation,
    kitesurfing: isKitesurfingLocation,
    wingsurfing: isWingsurfingLocation,
    paddleboarding: isPaddleboardingLocation,
    parking,
    toilets,
    cafe,
  };

  return requestBody;
}
