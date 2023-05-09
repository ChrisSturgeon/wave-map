import { useRouter } from 'next/router';

export default function LocationPage() {
  const router = useRouter();

  return <div>I am the page for {router.query.locationId}</div>;
}
