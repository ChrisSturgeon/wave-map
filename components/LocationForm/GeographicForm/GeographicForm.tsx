import Select from 'react-select';
import { generateCountryOptions } from '@/server/resources/countries';
import { useId } from 'react';

export interface CountryType {
  label: string;
  value: string;
}

type GeographicData = {
  name: string;
  country: CountryType | null;
  latitude: number;
  longitude: number;
};

type GeographicFormProps = GeographicData & {
  updateFields: (fields: Partial<GeographicData>) => void;
};

export default function GeographicForm({
  name,
  country,
  latitude,
  longitude,
  updateFields,
}: GeographicFormProps) {
  const countriesOptions = generateCountryOptions();

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
      <label htmlFor="latitude">Latitude</label>
      <input
        required
        type="number"
        id="latitude"
        value={latitude}
        onChange={(e) => updateFields({ latitude: Number(e.target.value) })}
      />
      <label htmlFor="latitude">Longitude</label>
      <input
        required
        type="number"
        id="longitude"
        value={longitude}
        onChange={(e) => updateFields({ longitude: Number(e.target.value) })}
      />
    </>
  );
}
