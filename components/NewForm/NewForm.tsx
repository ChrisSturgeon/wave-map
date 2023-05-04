import { generateCountryOptions } from '@/server/resources/countries';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Select from 'react-select';
import { ActionMeta } from 'react-select';

interface Props {
  countriesOptions: [];
}

interface CountryType {
  value: string;
  label: string;
}

export default function NewForm({ countriesOptions }: Props) {
  const countries: CountryType[] = generateCountryOptions();
  const [name, setName] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<CountryType>();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  const handleSelectionChange = (
    option: CountryType | null,
    actionMeta: ActionMeta<CountryType>
  ) => {
    if (option) {
      setSelectedCountry(option);
    }
    setSelectedCountry(undefined);
  };

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const response = await fetch('/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        country: selectedCountry?.value,
      }),
    });

    const returnData = await response.json();
    console.log(returnData);
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ minHeight: '100vh' }}>
        <label htmlFor="name">Location Name</label>
        <Select
          value={selectedCountry}
          options={countriesOptions}
          onChange={handleSelectionChange}
          isClearable={true}
          instanceId="country-select"
        />
        <input onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
