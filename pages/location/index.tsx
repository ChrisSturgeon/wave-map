import useSWR from 'swr';

async function fetcher(url: string) {
  // const url = `/api/location/${locationId}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
}

export default function LocationPage() {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/location/favourite/8`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.favourite) {
    return <div>Boom!</div>;
  }

  return <div>I am the location index page</div>;
}
