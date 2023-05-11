interface CountryOption {
  label: string;
  value: string;
}

// Returns valid 'react-select' value for given country string
export function createCountryValue(country: string): CountryOption {
  return {
    label: country,
    value: country,
  };
}
