import { useId } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';

type CountryType = {
  label: string;
  value: string;
};

interface CountryFilterProps {
  countryValues: {
    label: string;
    value: string;
  }[];
}

export default function CountryFilter({ countryValues }: CountryFilterProps) {
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
        options={countryValues}
        onChange={handleChange}
        isClearable
        instanceId={useId()}
      />
    </div>
  );
}
