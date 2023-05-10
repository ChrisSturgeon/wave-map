import Link from 'next/link';

interface AllLocationsNavProps {
  currentPage: number;
  totalPages: number;
  country: string;
}

export default function AllLocationsNav({
  currentPage,
  totalPages,
  country,
}: AllLocationsNavProps) {
  const prevPageURL = country
    ? `all?page=${currentPage - 1}&country=${country}`
    : `all?page=${currentPage - 1}`;
  const nextPageURL = country
    ? `all?page=${currentPage + 1}&country=${country}`
    : `all?page=${currentPage + 1}`;

  return (
    <div>
      {currentPage > 1 && <Link href={prevPageURL}>Prev Page</Link>}
      <span>
        Page {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages && <Link href={nextPageURL}>Next Page</Link>}
    </div>
  );
}
