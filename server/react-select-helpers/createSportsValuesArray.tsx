interface SportOptionType {
  label: string;
  value: string;
}

// Returns array of valid 'react-select' options for sports
export function createSportsValuesArray(
  surfing: boolean,
  windsurfing: boolean,
  kitesurfing: boolean,
  wingsurfing: boolean,
  paddleboarding: boolean
): SportOptionType[] {
  const options = [];

  if (surfing) {
    options.push({
      label: 'Surfing',
      value: 'surfing',
    });
  }
  if (windsurfing) {
    options.push({
      label: 'Wind Surfing',
      value: 'windsurfing',
    });
  }
  if (kitesurfing) {
    options.push({
      label: 'Kite Surfing',
      value: 'kitesurfing',
    });
  }
  if (wingsurfing) {
    options.push({
      label: 'Wing Surfing',
      value: 'wingsurfing',
    });
  }
  if (paddleboarding) {
    options.push({
      label: 'Paddleboarding',
      value: 'paddleboarding',
    });
  }

  return options;
}
