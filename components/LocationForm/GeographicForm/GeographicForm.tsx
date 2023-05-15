import dynamic from 'next/dynamic';
import Select from 'react-select';
import { getCountryNameSelectOptions } from '@/server/resources/countries';
import { useId } from 'react';
import { useCallback } from 'react';

export interface CountryType {
  label: string;
  value: string;
}

type GeographicData = {
  name: string;
  country: CountryType | null;
  latitude: number | null;
  longitude: number | null;
  mapZoom: number;
};

type GeographicFormProps = GeographicData & {
  updateFields: (fields: Partial<GeographicData>) => void;
};

const MapWithNoSSR = dynamic(
  () => import('@/components/LocationForm/GeographicForm/NewLocationMap'),
  {
    ssr: false,
  }
);

export default function GeographicForm({
  name,
  country,
  latitude,
  longitude,
  updateFields,
  mapZoom,
}: GeographicFormProps) {
  const countriesOptions = getCountryNameSelectOptions();
  // eslint-disable-next-line
  const memoizedUpdateFields = useCallback(updateFields, []);

  function handleCountryChange(option: CountryType | null) {
    if (option) {
      updateFields({ country: option });
      return;
    }
    updateFields({ country: null });
  }
  return (
    <>
      <label htmlFor="location-name">Name</label>
      <input
        required
        minLength={3}
        type="text"
        id="country-name"
        value={name}
        onChange={(e) => updateFields({ name: e.target.value })}
      />
      <label htmlFor="country">Country</label>
      <Select
        options={countriesOptions}
        value={country}
        onChange={handleCountryChange}
        isClearable={true}
        instanceId={useId()}
        required
      />
      <MapWithNoSSR
        latitude={latitude}
        longitude={longitude}
        updateFields={memoizedUpdateFields}
        mapZoom={mapZoom}
      />
    </>
  );
}
