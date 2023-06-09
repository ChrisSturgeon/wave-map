import style from './FavouriteLocation.module.css';
import { useRouter } from 'next/router';
import useSWR from 'swr';

async function fetcher(url: string) {
  const response = await fetch(url);
  const data = response.json();
  return data;
}

export default function FavouriteLocation() {
  const router = useRouter();
  const locationId = router.query['locationId'];

  const { data, error, isLoading, mutate } = useSWR(
    `/api/location/favourite/${locationId}`,
    fetcher
  );

  async function toggleFavouriteInDb() {
    const url = `/api/location/favourite/${locationId}`;
    const method = data.favourite ? 'DELETE' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }

  async function handleClick() {
    const options = {
      optimisticData: { favourite: data.favourite ? false : true },
      rollBackOnError(error: Error) {
        return error.name! == 'AbortError';
      },
    };
    await mutate(toggleFavouriteInDb(), options);
  }

  if (isLoading || error) {
    return (
      <div className={style.favourite}>
        <button disabled></button>
      </div>
    );
  }

  return (
    <div className={style.favourite}>
      <button onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className={data.favourite ? style.filled : style.empty}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 
            0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 
            3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 
            01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 
            0 01-.84-.61l1.285-5.386a.562.562 
            0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 
            0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </button>
    </div>
  );
}
