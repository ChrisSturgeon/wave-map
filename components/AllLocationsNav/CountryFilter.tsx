import { useId } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';

type CountryType = {
  label: string;
  value: string;
};

// TODO - make this the full list of countries
const options = [
  { label: 'England', value: 'england' },
  { label: 'Hawaii', value: 'hawaii' },
];

export default function CountryFilter() {
  const router = useRouter();
  const country = router.query['country'] as string;

  function handleChange(option: CountryType | null) {
    if (option) {
      router.push(`/location/all?page=1&country=${option.value}`);
    } else {
      router.push(`/location/all?page=1`);
    }
  }
  return (
    <div>
      <Select
        value={
          country
            ? {
                label: country.charAt(0).toUpperCase() + country.slice(1),
                value: country,
              }
            : null
        }
        options={options}
        onChange={handleChange}
        isClearable
        instanceId={useId()}
      />
    </div>
  );
}
