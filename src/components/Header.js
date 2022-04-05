import React from "react";
import { Link } from "react-router-dom";
import logo from "assets/logo.png";
import styles from "./scss/header.module.scss";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.innerHeaderContainer}>
        <Link to="/homepage">
          <img
            className={styles.logo}
            src={logo}
            alt="Adventure Besties logo"
          />
        </Link>
        <div className={styles.headerLinks}>
          <div className={styles.logoutButton}>
            <Link to="/logout">Log out</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
