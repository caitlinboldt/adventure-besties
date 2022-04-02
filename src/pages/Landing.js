import largeLogo from "Adventure-Besties-large-logo.png";
import { Link } from "react-router-dom";
import styles from "./scss/landing.module.scss";

export default function Landing() {
  return (
    <div className={styles.landing}>
      <header className={styles.landingHeader}>
        <img src={largeLogo} className={styles.logo} alt="Butterfly hand" />
      </header>
      <h1 className={styles.landingTitle}>
        Adventure Besties <br />
        Landing Page (WIP)
      </h1>
      <div className={styles.loginButton}>
        <Link to="/login">Click here to log in</Link>
      </div>
    </div>
  );
}
