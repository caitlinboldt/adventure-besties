import LottieAnimation from "components/LottieAnimation";
import lottieWorld from "animations/world.json";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import styles from "./scss/landing.module.scss";

export default function Landing() {
  const user = useSelector((state) => state.userInfo.user);
  const isUser = !isEmpty(user);

  return (
    <div className={styles.landing}>
      <header className={styles.landingHeader}>
        <h1>Adventure Besties</h1>
      </header>
      <div className={styles.landingMainContainer}>
        <div className={styles.landingMainImage}></div>
        <div className={styles.landingLoginContainer}>
          <div className={styles.landingLoginContent}>
            <LottieAnimation style={styles.globe} animationData={lottieWorld} />
            <h3>Get ready to adventure</h3>
            <div className={styles.loginButton}>
              <Link to={isUser ? "/homepage" : "/login"}>
                {isUser ? "Home" : "Log in"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
