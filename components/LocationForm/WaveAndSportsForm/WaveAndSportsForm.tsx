import Select, { ActionMeta } from 'react-select';
import WaveSelect, { WaveType } from './WaveSelect/WaveSelect';
import SportsSelect from './SportsSelect/SportsSelect';
import { FormEvent } from 'react';
import { SportType } from './SportsSelect/SportsSelect';

type WaveAndSportsData = {
  waveType: WaveType | null;
  sports: readonly SportType[] | null;
  surfing: boolean;
  windsurfing: boolean;
  kitesurfing: boolean;
  wingsurfing: boolean;
  paddleboarding: boolean;
};

type WaveAndSportsFormProps = WaveAndSportsData & {
  updateFields: (fields: Partial<WaveAndSportsData>) => void;
  logState: (e: FormEvent) => void;
};

export default function WaveAndSportsForm({
  waveType,
  sports,
  surfing,
  windsurfing,
  kitesurfing,
  wingsurfing,
  paddleboarding,
  updateFields,
  logState,
}: WaveAndSportsFormProps) {
  return (
    <div style={{ minWidth: '500px' }}>
      <label htmlFor="wave-type">Wave Type</label>
      <WaveSelect waveType={waveType} updateFields={updateFields} />
      <label htmlFor="wave-type">Suitable For Type</label>
      <SportsSelect updateFields={updateFields} sports={sports} />
      {/* <input type="checkbox" id="surfing" name="surfing" />
      <label htmlFor="surfing">Surfing</label>
      <input type="checkbox" id="paddleboarding" name="paddleboarding" />
      <label htmlFor="paddleboarding">paddleboarding</label> */}
      <button onClick={(e) => logState(e)}>Log State</button>
    </div>
  );
}
