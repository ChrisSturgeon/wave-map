import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { SportType } from './WaveAndSportsForm/SportsSelect/SportsSelect';

// Component Imports
import GeographicForm from './GeographicForm/GeographicForm';
import WaveAndSportsForm from './WaveAndSportsForm/WaveAndSportsForm';
import FacilitiesForm from './FacilitiesForm/FacilitiesForm';

type LocationFormData = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  waveType: {
    label: string;
    value: string;
  } | null;
  sports: readonly SportType[] | null;
  parking: string;
  toilets: string;
  cafe: string;
};

const INITIAL_DATA: LocationFormData = {
  name: '',
  latitude: 51.4934,
  longitude: 0.0,
  country: '',
  waveType: null,
  sports: null,
  parking: '',
  toilets: '',
  cafe: '',
};

export function LocationForm({ location }: { location: any }) {
  const router = useRouter();
  const [data, setData] = useState(location ? location : INITIAL_DATA);

  function updateFields(fields: Partial<LocationFormData>) {
    setData((prev: any) => {
      return { ...prev, ...fields };
    });
  }

  const logState = (e: FormEvent): void => {
    e.preventDefault();
    console.log(data);
    return;
  };

  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <GeographicForm
        {...data}
        updateFields={updateFields}
        key="geographic-form"
      />,

      <WaveAndSportsForm
        logState={logState}
        {...data}
        updateFields={updateFields}
        key="waveAndSportsForm"
      />,
      <FacilitiesForm
        {...data}
        updateFields={updateFields}
        key="facilitiesForm"
      />,
    ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLastStep) {
      next();
      return;
    }

    const bodyData = {
      name: data.name,
      country: data.country,
      latitude: data.latitude,
      longitude: data.longitude,
      waveType: data.waveType!.value,
      surfing: data.sports!.find(
        (sport: SportType) => sport.value === 'surfing'
      )
        ? true
        : false,
      windsurfing: data.sports!.find(
        (sport: SportType) => sport.value === 'windsurfing'
      )
        ? true
        : false,
      kitesurfing: data.sports!.find(
        (sport: SportType) => sport.value === 'kitesurfing'
      )
        ? true
        : false,
      wingsurfing: data.sports!.find(
        (sport: SportType) => sport.value === 'wingsurfing'
      )
        ? true
        : false,
      paddleboarding: data.sports!.find(
        (sport: SportType) => sport.value === 'paddleboarding'
      )
        ? true
        : false,
      parking: data.parking,
      toilets: data.toilets,
      cafe: data.cafe,
    };

    const fetchMethod = location ? 'PUT' : 'POST';
    const fetchURL = location
      ? `/api/location/${router.query.locationId}`
      : '/api/location';

    const response = await fetch(fetchURL, {
      method: fetchMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    const returnData = await response.json();
    console.log(returnData);

    alert('Successful account creation');
  }

  return (
    <div
      style={{
        position: 'relative',
        background: 'white',
        border: '1px solid black',
        padding: '2rem',
        margin: '1rem',
        borderRadius: '.5rem',
        maxWidth: 'max-content',
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? 'Finish' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
}
