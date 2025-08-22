// src/components/Header.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
      <a href="/" className={styles.logoLink}>
        Metanym
      </a>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {token ? (
            <>
              <li>
                <a href="/dashboard" className={styles.navLink}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/assets" className={styles.navLink}>
                  My Assets
                </a>
              </li>
              <li>
                <a href="/market" className={styles.navLink}>
                  Market Data
                </a>
              </li>
              <li>
                <a href="/news" className={styles.navLink}>
                  News & Blog
                </a>
              </li>
              <li>
                <a href="/atest" className={styles.navLink}>
                  APITest
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/#about" className={styles.navLink}>
                  About
                </a>
              </li>
              <li>
                <a href="/#contact" className={styles.navLink}>
                  Contact
                </a>
              </li>
              <li>
                <a href="/watchlist" className={styles.navLink}>
                  watchlist
                </a>
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
                <a href="/dashboard" className={styles.dropdownItem}>
                  Dashboard
                </a>
                <a href="/profile" className={styles.dropdownItem}>
                  Profile Settings
                </a>
                <div className={styles.divider}></div>
                <a onClick={handleLogout} className={styles.dropdownItem}>
                  Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <>
            <a href="/auth/login" className={styles.loginButton}>
              Login
            </a>
            <a href="/auth/signup" className={styles.signupButton}>
              Join now
            </a>
            ;
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
