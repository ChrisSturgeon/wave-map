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
  const sport = router.query['sport'] as string;
  const currentPage = router.query['page'] as string;

  function handleChange(option: CountryType | null) {
    if (option) {
      if (sport) {
        router.push(
          `all?page=${currentPage}&country=${option.value}&sport=${sport}`
        );
        return;
      }
      router.push(`all?page=${currentPage}&country=${option.value}`);
    } else {
      if (sport) {
        router.push(`all?page=${currentPage}&sport=${sport}`);
        return;
      }
      router.push(`all?page=${currentPage}`);
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
