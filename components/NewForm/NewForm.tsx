import { GetStaticProps } from 'next';
import { useState } from 'react';
import Select from 'react-select';

interface Props {
  countriesOptions: [];
}

export default function NewForm({ countriesOptions }: Props) {
  console.log(countriesOptions);
  const [name, setName] = useState('');
  const [country, setCountry] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const response = await fetch('/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
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
          value={country}
          options={countriesOptions}
          onChange={(selectedOption: string | null) => {
            setCountry(selectedOption);
          }}
          instanceId="country-select"
        />
        <input onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      <button onClick={() => console.log(country)}>Log Country</button>
      <p>Hi</p>
    </>
  );
}
