// src/components/Header.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Add this import
import { useAuth } from "../context/AuthContext.js";
import { getUserProfile } from "../services";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { authState, logout } = useAuth();
  const { token } = authState;
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (token) {
      const fetchUserProfileData = async () => {
        try {
          const result = await getUserProfile();
          if (result.success && result.data) {
            setUserName(result.data.name);
          } else {
            console.error("Failed to fetch user profile:", result.message);
            logout();
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          logout();
        }
      };
      fetchUserProfileData();
    } else {
      setUserName("");
    }
  }, [token, logout]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        Metanym
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {token ? (
            <>
              <li>
                <Link href="/dashboard" className={styles.navLink}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/assets" className={styles.navLink}>
                  My Assets
                </Link>
              </li>
              <li>
                <Link href="/market" className={styles.navLink}>
                  Market Data
                </Link>
              </li>
              <li>
                <Link href="/news" className={styles.navLink}>
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={styles.navLink}>
                  Pricing
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/#about" className={styles.navLink}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className={styles.navLink}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={styles.navLink}>
                  Pricing
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className={styles.rightSection}>
        {token ? (
          <div
            className={styles.profileContainer}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className={styles.welcomeText}>Hi, {userName || "User"}</span>
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <Link href="/dashboard" className={styles.dropdownItem}>
                  Dashboard
                </Link>
                <Link href="/profile" className={styles.dropdownItem}>
                  Profile Settings
                </Link>
                <div className={styles.divider}></div>
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/auth/login" className={styles.loginButton}>
              Login
            </Link>
            <Link href="/auth/signup" className={styles.signupButton}>
              Join now
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
