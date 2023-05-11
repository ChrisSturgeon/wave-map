interface WaveType {
  label: string;
  value: string;
}

// Returns 'react-select' valid value for given string
export function createWaveTypeValue(waveType: string): WaveType {
  const label = waveType
    .split(' ')
    .map((word) => {
      const letters = word.split('');
      return letters[0].toUpperCase() + letters.slice(1).join('');
    })
    .join(' ');

  return {
    label: label,
    value: waveType,
  };
}
