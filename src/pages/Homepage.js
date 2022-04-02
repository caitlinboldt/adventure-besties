import { Link } from "react-router-dom";
import largeLogo from "Adventure-Besties-large-logo.png";
import styles from "./scss/landing.module.scss";

export default function Homepage() {
  return (
    <div className={styles.landing}>
      <header className={styles.landingHeader}>
        <img src={largeLogo} className={styles.logo} alt="Butterfly hand" />
      </header>
      <h1 className={styles.landingTitle}>Adventure Besties</h1>
      <Link className={styles.brandBlueLink} to="/logout">
        Logout
      </Link>
    </div>
  );
}
