import WaveSelect, { WaveType } from './WaveSelect/WaveSelect';
import SportsSelect from './SportsSelect/SportsSelect';
import { SportType } from './SportsSelect/SportsSelect';

type WaveAndSportsData = {
  waveType: WaveType | null;
  sports: readonly SportType[] | null;
};

type WaveAndSportsFormProps = WaveAndSportsData & {
  updateFields: (fields: Partial<WaveAndSportsData>) => void;
  logState: (e: React.FormEvent) => void;
};

export default function WaveAndSportsForm({
  waveType,
  sports,
  updateFields,
  logState,
}: WaveAndSportsFormProps) {
  return (
    <div style={{ minWidth: '500px' }}>
      <label htmlFor="wave-type">Wave Type</label>
      <WaveSelect waveType={waveType} updateFields={updateFields} />
      <label htmlFor="wave-type">Suitable For Type</label>
      <SportsSelect updateFields={updateFields} sports={sports} />
      <button onClick={(e) => logState(e)}>Log State</button>
    </div>
  );
}
