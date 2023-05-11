import { prisma } from '../db/client';

async function generateDistinctCountries() {
  const distinctCountries = await prisma.location.findMany({
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
export default async function generateDistinctCountriesValues() {
  const distinctCountries = await generateDistinctCountries();

  const countriesValues = await Promise.all(
    distinctCountries.map(async (countryObj) => {
      const locationsCount = await prisma.location.count({
        where: {
          country: countryObj.country,
        },
      });

      const labelText =
        locationsCount > 1
          ? `${countryObj.country} - ${locationsCount} locations`
          : `${countryObj.country} - ${locationsCount} location`;

      return {
        label: labelText,
        value: countryObj.country,
      };
    })
  );

  return countriesValues;
}
