import Select, { ActionMeta } from 'react-select';

const sportsOptions = [
  { label: 'Surfing', value: 'surfing' },
  { label: 'Windsurfing', value: 'windsurfing' },
  { label: 'Kitesurfing', value: 'kitesurfing' },
  { label: 'Wingsurfing', value: 'wingsurfing' },
  { label: 'Paddleboarding', value: 'paddleboarding' },
];

export default function SportsSelect() {
  return <Select isMulti options={sportsOptions} />;
}
