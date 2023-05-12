import { useId } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { capitaliseWord } from '@/server/resources/helpers';

type SportType = {
  label: string;
  value: string;
};

interface CountryFilterProps {
  countryValues: {
    label: string;
    value: string;
  }[];
}

const options = [
  { label: 'Surfing', value: 'surfing' },
  { label: 'Windsurfing', value: 'windsurfing' },
  { label: 'Kitesurfing', value: 'kitesurfing' },
  { label: 'Wingsurfing', value: 'wingsurfing' },
  { label: 'Paddleboarding', value: 'paddleboarding' },
];

export default function SportFilter() {
  const router = useRouter();
  const sport = router.query['sport'] as string;

  function handleChange(option: SportType | null) {
    if (option) {
      const prevPath = router.asPath;
      const pathWithoutSport = prevPath.replace(`&sport=${sport}`, '');
      const newPath = pathWithoutSport + `&sport=${option.value}`;
      router.push(newPath);
    } else {
      const prevPath = router.asPath;
      const newPath = prevPath.replace(`&sport=${sport}`, '');
      router.push(newPath);
    }
  }
  return (
    <div>
      <Select
        value={
          sport
            ? {
                label: capitaliseWord(sport),
                value: sport,
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
