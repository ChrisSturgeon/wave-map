import styles from './Layout.module.css';
import NavBar from '../Navigation/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <footer style={{ backgroundColor: 'lightgrey' }}>The footer</footer>
    </div>
  );
}
