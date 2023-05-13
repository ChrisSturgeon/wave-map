import NavBar from '../Navigation/NavBar';
import styles from './Layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <footer style={{ backgroundColor: 'blue' }}>The footer</footer>
    </div>
  );
}
