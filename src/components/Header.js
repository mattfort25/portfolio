// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { useAuth } from "../context/AuthContext.js";
// import { getUserProfile } from "../services";
// import styles from "../styles/Header.module.css";

// const Header = () => {
//   const { authState, logout } = useAuth();
//   const { token } = authState;
//   const router = useRouter();

//   const [userName, setUserName] = useState("");
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [dropdownTimeout, setDropdownTimeout] = useState(null);

//   // Detect if device is mobile
//   const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

//   // Handle scroll and outside click
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     const handleClickOutside = (event) => {
//       if (!event.target.closest(`.${styles.profileContainer}`)) {
//         setShowProfileDropdown(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("click", handleClickOutside);

//     if (token) {
//       const fetchUserProfileData = async () => {
//         try {
//           const result = await getUserProfile();
//           if (result.success && result.data) {
//             setUserName(result.data.name);
//           } else {
//             logout();
//           }
//         } catch (error) {
//           logout();
//         }
//       };
//       fetchUserProfileData();
//     } else {
//       setUserName("");
//     }

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("click", handleClickOutside);
//       if (dropdownTimeout) {
//         clearTimeout(dropdownTimeout);
//       }
//     };
//   }, [token, logout]);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//   }, [mobileMenuOpen]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleNavLinkClick = () => {
//     setMobileMenuOpen(false);
//     setActiveDropdown(null);
//   };

//   const handleMouseEnter = (dropdown) => {
//     if (isMobile) return;
//     if (dropdownTimeout) {
//       clearTimeout(dropdownTimeout);
//       setDropdownTimeout(null);
//     }
//     setActiveDropdown(dropdown);
//   };

//   const handleMouseLeave = () => {
//     if (isMobile) return;
//     const timeout = setTimeout(() => {
//       setActiveDropdown(null);
//     }, 150);
//     setDropdownTimeout(timeout);
//   };

//   const handleDropdownToggle = (dropdown) => {
//     if (isMobile) {
//       setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//     }
//   };

//   return (
//     <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
//       <div className={styles.container}>
//         <Link href="/" className={styles.brand} onClick={handleNavLinkClick}>
//           Metanym
//         </Link>

//         <button
//           className={styles.mobileToggle}
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>

//         <div
//           className={`${styles.navMenu} ${mobileMenuOpen ? styles.active : ""}`}
//         >
//           {token ? (
//             <>
//               <Link
//                 href="/dashboard"
//                 onClick={handleNavLinkClick}
//                 className={`${styles.navLink} ${
//                   router.pathname === "/dashboard" ? styles.activeLink : ""
//                 }`}
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 href="/dashboard"
//                 onClick={handleNavLinkClick}
//                 className={`${styles.navLink} ${
//                   router.pathname === "/dashboard" ? styles.activeLink : ""
//                 }`}
//               >
//                 My Assets
//               </Link>

//               <Link
//                 href="/news"
//                 onClick={handleNavLinkClick}
//                 className={`${styles.navLink} ${
//                   router.pathname === "/news" ? styles.activeLink : ""
//                 }`}
//               >
//                 News & Blog
//               </Link>
//               <Link
//                 href="/pricing"
//                 onClick={handleNavLinkClick}
//                 className={`${styles.navLink} ${
//                   router.pathname === "/pricing" ? styles.activeLink : ""
//                 }`}
//               >
//                 Pricing
//               </Link>
//             </>
//           ) : (
//             <>
//               {/* Solutions Dropdown */}
//               <div
//                 className={styles.dropdown}
//                 onMouseEnter={() => handleMouseEnter("solutions")}
//                 onMouseLeave={handleMouseLeave}
//                 onClick={() => handleDropdownToggle("solutions")}
//               >
//                 <a href="#" className={styles.navLink}>
//                   Solutions
//                 </a>
//                 <div
//                   className={`${styles.dropdownContent} ${
//                     activeDropdown === "solutions" ? styles.show : ""
//                   }`}
//                 >
//                   <div className={styles.dropdownSection}>
//                     <h6>By Use Case</h6>
//                     <a href="#">
//                       Risk Scoring
//                       <small>Quantify exposures across portfolios</small>
//                     </a>
//                     <a href="#">
//                       Portfolio Analysis
//                       <small>Optimize allocation, reduce drawdowns</small>
//                     </a>
//                     <a href="#">
//                       Regulatory Compliance
//                       <small>Audit-ready reports, faster filings</small>
//                     </a>
//                   </div>
//                   <div className={styles.dropdownSection}>
//                     <h6>By Industry</h6>
//                     <a href="#">
//                       Asset Management
//                       <small>Hedge funds, mutual funds, pensions</small>
//                     </a>
//                     <a href="#">
//                       Banking<small>Stress testing & regulatory risk</small>
//                     </a>
//                     <a href="#">
//                       Corporate Treasury
//                       <small>Liquidity, FX, and credit risk</small>
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Products Dropdown */}
//               <div
//                 className={styles.dropdown}
//                 onMouseEnter={() => handleMouseEnter("products")}
//                 onMouseLeave={handleMouseLeave}
//                 onClick={() => handleDropdownToggle("products")}
//               >
//                 <a href="#" className={styles.navLink}>
//                   Products
//                 </a>
//                 <div
//                   className={`${styles.dropdownContent} ${
//                     activeDropdown === "products" ? styles.show : ""
//                   }`}
//                 >
//                   <div className={styles.dropdownSection}>
//                     <h6>Core Platform</h6>
//                     <a href="#">
//                       Core Fusion Engine
//                       <small>Explainable composite risk models</small>
//                     </a>
//                     <a href="#">
//                       Risk Scores API
//                       <small>Low-latency scoring for live decisioning</small>
//                     </a>
//                     <a href="#">
//                       Interactive Dashboards
//                       <small>Analyst & executive views, scenario sims</small>
//                     </a>
//                   </div>
//                   <div className={styles.dropdownSection}>
//                     <h6>Integrations</h6>
//                     <a href="#">
//                       Data Ingestion Daemons
//                       <small>Market, news, ESG, custodian connectors</small>
//                     </a>
//                     <a href="#">
//                       Cloud & On-Prem Options
//                       <small>Private deployments for regulated firms</small>
//                     </a>
//                     <a href="#">
//                       SDKs & Webhooks
//                       <small>Python SDK, REST, event-driven triggers</small>
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Resources Dropdown */}
//               <div
//                 className={styles.dropdown}
//                 onMouseEnter={() => handleMouseEnter("resources")}
//                 onMouseLeave={handleMouseLeave}
//                 onClick={() => handleDropdownToggle("resources")}
//               >
//                 <a href="#" className={styles.navLink}>
//                   Resources
//                 </a>
//                 <div
//                   className={`${styles.dropdownContent} ${
//                     styles.singleColumn
//                   } ${activeDropdown === "resources" ? styles.show : ""}`}
//                 >
//                   <a href="#">Documentation</a>
//                   <a href="#">API Reference</a>
//                   <a href="#">Case Studies</a>
//                   <a href="#">Whitepapers</a>
//                   <a href="#">Blog</a>
//                 </div>
//               </div>

//               <Link
//                 href="#"
//                 onClick={handleNavLinkClick}
//                 className={`${styles.navLink} ${
//                   router.pathname === "/clients" ? styles.activeLink : ""
//                 }`}
//               >
//                 Our Clients
//               </Link>
//               <Link
//                 href="/about"
//                 onClick={handleNavLinkClick}
//                 className={`${styles.navLink} ${
//                   router.pathname === "/about" ? styles.activeLink : ""
//                 }`}
//               >
//                 About Us
//               </Link>
//             </>
//           )}

//           <div className={styles.authButtons}>
//             {token ? (
//               <div
//                 className={styles.profileContainer}
//                 onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//               >
//                 <span className={styles.welcomeText}>
//                   Hi, {userName || "User"}
//                 </span>
//                 {showProfileDropdown && (
//                   <div className={styles.dropdownMenu}>
//                     <Link
//                       href="/dashboard"
//                       className={styles.dropdownItem}
//                       onClick={handleNavLinkClick}
//                     >
//                       Dashboard
//                     </Link>
//                     <Link
//                       href="/profile"
//                       className={styles.dropdownItem}
//                       onClick={handleNavLinkClick}
//                     >
//                       Profile Settings
//                     </Link>
//                     <div className={styles.divider}></div>
//                     <button
//                       onClick={handleLogout}
//                       className={styles.dropdownItem}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/login"
//                   className={styles.loginBtn}
//                   onClick={handleNavLinkClick}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/demo"
//                   className={styles.registerBtn}
//                   onClick={handleNavLinkClick}
//                 >
//                   Request a Demo
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext.js";
import { getUserProfile } from "../services";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { authState, logout } = useAuth();
  const { token } = authState;
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.profileContainer}`)) {
        setShowProfileDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    if (token) {
      const fetchUserProfileData = async () => {
        try {
          const result = await getUserProfile();
          if (result.success && result.data) {
            setUserName(result.data.name);
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      };
      fetchUserProfileData();
    } else {
      setUserName("");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [token, logout]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          Metanym <span>Risk</span>
        </Link>

        <div className={styles.navMenu}>
          {token ? (
            <>
              <Link
                href="/dashboard"
                className={`${styles.navLink} ${
                  router.pathname === "/dashboard" ? styles.activeLink : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/news"
                className={`${styles.navLink} ${
                  router.pathname === "/news" ? styles.activeLink : ""
                }`}
              >
                Insights
              </Link>

              <div
                className={styles.profileContainer}
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <span className={styles.welcomeText}>{userName || "User"}</span>
                {showProfileDropdown && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/dashboard" className={styles.dropdownItem}>
                      Profile
                    </Link>
                    <div className={styles.divider}></div>
                    <button
                      onClick={handleLogout}
                      className={styles.dropdownItem}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/about"
                className={`${styles.navLink} ${
                  router.pathname === "/about" ? styles.activeLink : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/news"
                className={`${styles.navLink} ${
                  router.pathname === "/news" ? styles.activeLink : ""
                }`}
              >
                Insights
              </Link>
              {/* <Link href="/auth/login" className={styles.navLink}>
                Login
              </Link> */}
              <Link href="/demo" className={styles.ctaButton}>
                Request Access
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
