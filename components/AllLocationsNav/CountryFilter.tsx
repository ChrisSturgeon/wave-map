import { useId } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { capitaliseWord } from '@/server/resources/helpers';

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
      const prevPath = router.asPath;
      const pathWithoutCountry = prevPath.replace(`&country=${country}`, '');
      const newPath = pathWithoutCountry + `&country=${option.value}`;
      router.push(newPath);
    } else {
      const prevPath = router.asPath;
      const newPath = prevPath.replace(`&country=${country}`, '');
      router.push(newPath);
    }
  }
  return (
    <div>
      <Select
        value={
          country
            ? {
                label: capitaliseWord(country),
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
