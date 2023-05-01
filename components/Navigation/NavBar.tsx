import Link from 'next/link';
import styles from './NavBar.module.css';

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
            <Link href="/all">All Locations</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
