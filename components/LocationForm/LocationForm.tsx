// Next & React imports
import { useState } from 'react';
import { useRouter } from 'next/router';

// Component, Hook and Helper imports
import GeographicForm from './GeographicForm/GeographicForm';
import WaveAndSportsForm from './WaveAndSportsForm/WaveAndSportsForm';
import FacilitiesForm from './FacilitiesForm/FacilitiesForm';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { generateLocationRequestBody } from '@/utils/Location/generateLocationRequestBody';

// Type imports
import { CountryType } from './GeographicForm/GeographicForm';
import { SportType } from './WaveAndSportsForm/SportsSelect/SportsSelect';
import { FormEvent } from 'react';

export interface LocationFormData {
  name: string;
  latitude: number | null;
  longitude: number | null;
  country: CountryType | null;
  waveType: {
    label: string;
    value: string;
  } | null;
  sports: readonly SportType[] | null;
  parking: string;
  toilets: string;
  cafe: string;
  mapZoom: number;
}

interface LocationFormProps {
  location?: LocationFormData & {
    wavetype: string;
    surfing: boolean;
    windsurfing: boolean;
    kitesurfing: boolean;
    wingsurfing: boolean;
    paddleboarding: boolean;
  };
}

const INITIAL_DATA: LocationFormData = {
  name: '',
  latitude: null,
  longitude: null,
  country: null,
  waveType: null,
  sports: null,
  parking: '',
  toilets: '',
  cafe: '',
  mapZoom: 4,
};

export function LocationForm({ location }: LocationFormProps) {
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

  const {
    step,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    back,
    next,
    isSubmitting,
    setIsSubmiting,
  } = useMultiStepForm([
    <GeographicForm
      {...data}
      updateFields={updateFields}
      key="geographic-form"
    />,
    <WaveAndSportsForm
      {...data}
      updateFields={updateFields}
      key="waveAndSportsForm"
      logState={logState}
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
      console.log(currentStepIndex);
      if (
        currentStepIndex === 0 &&
        data.latitude === null &&
        data.longitude === null
      ) {
        // TODO - Put map validation here

        console.log('This one');
        return;
      }

      next();
      return;
    }

    setIsSubmiting(true);
    const bodyData = generateLocationRequestBody(data);
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

    if (response.ok) {
      const createdLocationData = await response.json();
      console.log(createdLocationData);
      router.push(`/location/${createdLocationData.id}`);
      return;
    }

    const errorData = await response.json();
    console.log(errorData);
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
        minHeight: ' 300px',
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
          <button type="submit" disabled={isSubmitting}>
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}
