import Select, { ActionMeta } from 'react-select';

export type WaveType = {
  label: string;
  value: string;
};

export type WaveData = {
  waveType: WaveType | null;
};

type WaveSelectProps = WaveData & {
  updateFields: (fields: Partial<WaveData>) => void;
};

const waveOptions = [
  { label: 'Beach Break', value: 'beach break' },
  { label: 'Reef Break', value: 'reef break' },
  { label: 'Chop', value: 'chop' },
  { label: 'River Mouth', value: 'river mouth' },
];

export default function WaveSelect({
  waveType,
  updateFields,
}: WaveSelectProps) {
  function handleWaveSelectionChange(option: WaveType | null) {
    console.log(option);
    if (option) {
      updateFields({ waveType: option });
      return;
    }
    updateFields({ waveType: null });
  }
  return (
    <Select
      options={waveOptions}
      value={waveType}
      onChange={handleWaveSelectionChange}
      isClearable={true}
      instanceId="wave-select"
    />
  );
}
