import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface AllIndexProps {
  isLoggedIn: boolean;
}

export default function AllIndex({ isLoggedIn }: AllIndexProps) {
  return (
    <nav>
      <Link href="all/map">View as Map</Link>
      <Link href="all/list">View as List</Link>
      {isLoggedIn && <Link href="all/favourites">View my Favourites</Link>}
    </nav>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      props: {
        isLoggedIn: false,
      },
    };
  }

  return {
    props: {
      isLoggedIn: true,
    },
  };
};
