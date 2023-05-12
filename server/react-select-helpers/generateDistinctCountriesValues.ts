import { prisma } from '../db/client';

async function generateDistinctCountries(sport?: string) {
  const distinctCountries = await prisma.location.findMany({
    where: {
      surfing: sport === 'surfing' ? true : undefined,
      windsurfing: sport === 'windsurfing' ? true : undefined,
      kitesurfing: sport === 'kitesurfing' ? true : undefined,
      wingsurfing: sport === 'wingsurfing' ? true : undefined,
      paddleboarding: sport === 'paddleboarding' ? true : undefined,
    },
    distinct: ['country'],
    select: {
      country: true,
    },
    orderBy: {
      country: 'asc',
    },
  });

  return distinctCountries;
}

// Returns array of valid country values/options with
// number of locations for each included in label to use with
// 'react-select' component to filter locations by country
export default async function generateDistinctCountriesValues(sport?: string) {
  const distinctCountries = await generateDistinctCountries(sport);

  const countriesValues = await Promise.all(
    distinctCountries.map(async (countryObj) => {
      const locationsCount = await prisma.location.count({
        where: {
          country: countryObj.country,
          surfing: sport === 'surfing' ? true : undefined,
          windsurfing: sport === 'windsurfing' ? true : undefined,
          kitesurfing: sport === 'kitesurfing' ? true : undefined,
          wingsurfing: sport === 'wingsurfing' ? true : undefined,
          paddleboarding: sport === 'paddleboarding' ? true : undefined,
        },
      });

      let labelText;
      if (sport) {
        labelText =
          locationsCount > 1
            ? `${countryObj.country} - ${locationsCount} ${sport} locations`
            : `${countryObj.country} - ${locationsCount} ${sport} location`;
      } else {
        labelText =
          locationsCount > 1
            ? `${countryObj.country} - ${locationsCount} locations`
            : `${countryObj.country} - ${locationsCount} location`;
      }

      return {
        label: labelText,
        value: countryObj.country,
      };
    })
  );

  return countriesValues;
}
