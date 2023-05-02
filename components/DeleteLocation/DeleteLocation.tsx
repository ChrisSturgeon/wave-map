import { useRouter } from 'next/router';

export default function DeleteLocation({ location }: { location: Number }) {
  const router = useRouter();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const url = `/api/location/${location}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      router.replace(router.asPath);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Delete</button>
    </form>
  );
}
