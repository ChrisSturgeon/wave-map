import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>
          Signed in as {session.user!.name}
          <button onClick={() => signOut()}>Sign Out</button>
        </p>
      </>
    );
  }
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
}
