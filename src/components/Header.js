import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            Metanym
          </Link>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/atest" className={styles.navLink}>
              APITest
            </Link>
          </li>
          <li>
            <Link href="/watchlist" className={styles.navLink}>
              Watchlist
            </Link>
          </li>
          <li>
            <Link href="/company-list" className={styles.navLink}>
              Company List
            </Link>
          </li>
          <li>
            <Link href="/settings" className={styles.navLink}>
              Settings
            </Link>
          </li>
          <li>
            <Link href="/about-us" className={styles.navLink}>
              About Us
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.rightSection}>
        <Link href="/login" className={styles.loginButton}>
          Log In
        </Link>
        <Link href="/auth/signup" className={styles.signupButton}>
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
