import { useId } from 'react';

import Select, { ActionMeta } from 'react-select';

export type SportType = {
  label: string;
  value: string;
};

type SportData = {
  sports: readonly SportType[] | null;
};

type SportsSelectProps = SportData & {
  updateFields: (fields: Partial<SportData>) => void;
};

const sportsOptions = [
  { label: 'Surfing', value: 'surfing' },
  { label: 'Windsurfing', value: 'windsurfing' },
  { label: 'Kitesurfing', value: 'kitesurfing' },
  { label: 'Wingsurfing', value: 'wingsurfing' },
  { label: 'Paddleboarding', value: 'paddleboarding' },
];

export default function SportsSelect({
  sports,
  updateFields,
}: SportsSelectProps) {
  const handleChange = (option: readonly SportType[]) => {
    console.log(option);
    if (option!.length) {
      updateFields({ sports: option });
      return;
    }
    updateFields({ sports: null });
  };
  return (
    <Select
      isMulti
      value={sports}
      options={sportsOptions}
      onChange={handleChange}
      instanceId={useId()}
      required
      name="sports-select"
    />
  );
}
