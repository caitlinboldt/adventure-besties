import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "assets/logo.png";
import styles from "./scss/header.module.scss";
import LottieAnimation from "./LottieAnimation";
import mobileIcon from "animations/mobile_header.json";

export default function Header() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const toggle = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  return (
    <nav className={styles.headerContainer}>
      <div className={styles.innerHeaderContainer}>
        <Link to="/homepage">
          <img
            className={styles.logo}
            src={logo}
            alt="Adventure Besties logo"
          />
        </Link>
        <div
          className={
            isOpenDropdown
              ? `${styles.headerLinks} ${styles.openDropdown}`
              : styles.headerLinks
          }
        >
          <Link className={styles.brandBlueLink} to="/homepage">
            Home
          </Link>
          <div className={styles.logoutButton}>
            <Link to="/logout">Log out</Link>
          </div>
        </div>
      </div>
      <button onClick={toggle} className={styles.mobile}>
        <LottieAnimation
          style={styles.mobileLottie}
          animationData={mobileIcon}
        />
      </button>
    </nav>
  );
}
