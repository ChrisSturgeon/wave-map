import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { FormEvent, useState } from 'react';

// Component Imports
import GeographicForm from './GeographicForm/GeographicForm';
import WaveAndSportsForm from './WaveAndSportsForm/WaveAndSportsForm';
import FacilitiesForm from './FacilitiesForm/FacilitiesForm';

type LocationFormData = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  surfing: boolean;
  windsurfing: boolean;
  kitesurfing: boolean;
  wingsurfing: boolean;
  paddleboarding: boolean;
  parking: string;
  toilets: string;
  cafe: string;
};

const INITIAL_DATA: LocationFormData = {
  name: '',
  latitude: 51.4934,
  longitude: 0.0,
  country: '',
  surfing: false,
  windsurfing: false,
  kitesurfing: false,
  wingsurfing: false,
  paddleboarding: false,
  parking: '',
  toilets: '',
  cafe: '',
};

export function LocationForm() {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<LocationFormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <GeographicForm
        {...data}
        updateFields={updateFields}
        key="gegraphicForm"
      />,
      <WaveAndSportsForm {...data} key="waveAndSportsForm" />,
      <FacilitiesForm {...data} key="facilitiesForm" />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLastStep) {
      next();
      return;
    }
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
