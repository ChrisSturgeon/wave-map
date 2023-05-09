import Link from 'next/link';
import styles from './NavBar.module.css';
import Login from '../Login.tsx/Login';

export default function NavBar() {
  return (
    <>
      <nav className={styles.navbar}>
        <span>Wave Map</span>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/location/all">All Locations</Link>
          </li>
          <li>
            <Link href="/location/new">New Location</Link>
          </li>
        </ul>
        <Login />
      </nav>
    </>
  );
}
