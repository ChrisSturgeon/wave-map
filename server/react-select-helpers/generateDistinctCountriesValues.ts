import { prisma } from '../db/client';

type CountryType = {
  country: string;
};

// Returns array of  valid 'react-select' values from given array
// of country names. Queries db to find count of locations
// for each and adds this to the label
export default async function generateDistinctCountriesValues(
  countries: CountryType[]
) {
  return await Promise.all(
    countries.map(async (countryObj) => {
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
}
