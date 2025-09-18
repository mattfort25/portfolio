import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h6>Financial Profile</h6>
            <p>Enterprise Risk Management made intelligent.</p>
          </div>

          <div className={styles.section}>
            <h6>Company</h6>
            <ul>
              <li>
                <Link href="#">Solutions</Link>
              </li>
              <li>
                <Link href="#">Products</Link>
              </li>
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h6>Contact</h6>
            <p>
              Email: contact@financialprofile.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Address: 123 Business St, Suite 100, City, State
            </p>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.copyright}>
          &copy; 2025 Financial Profile. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
