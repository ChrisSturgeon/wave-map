import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import style from './FavouriteLocation.module.css';

export default function FavouriteLocation() {
  const router = useRouter();
  const locationId = router.query['locationId'];
  const [hasFavourited, setHasFavourited] = useState<null | boolean>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function checkIsFavourited() {
      const url = `/api/location/favourite/${locationId}`;
      const response = await fetch(url);

      if (response.ok) {
        setHasFavourited(true);
      } else {
        setHasFavourited(false);
      }
    }
    checkIsFavourited();
  }, [locationId]);

  async function toggleFavourite() {
    const url = `/api/location/favourite/${locationId}`;
    const method = hasFavourited ? 'DELETE' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log(response.status);
    const data = await response.json();
    console.log(data);

    if (response.status === 201) {
      setHasFavourited(true);
      return;
    }

    if (response.status === 200) {
      setHasFavourited(false);
      return;
    }
  }

  return (
    <div className={style.favourite}>
      <p>
        {hasFavourited ? 'You have' : 'You have not'} favourited this location!{' '}
        {locationId}
      </p>
      <button onClick={toggleFavourite}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className={hasFavourited ? style.filled : style.empty}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </button>
      <button onClick={() => console.log(hasFavourited)}>
        Check favourite status
      </button>
    </div>
  );
}
