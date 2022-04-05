import React from "react";
import LottieAnimation from "components/LottieAnimation";
import lottie404 from "animations/404.json";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import styles from "./scss/not-found.module.scss";

export default function NotFound() {
  const user = useSelector((state) => state.userInfo.user);
  const isUser = !isEmpty(user);

  return (
    <div className={styles.mainContainer}>
      <div>
        <LottieAnimation animationData={lottie404} />
        <div className={styles.notFoundLinkContainer}>
          <Link
            className={styles.brandBlueLink}
            to={isUser ? "/homepage" : "/"}
          >
            Lost? Go back to the {isUser ? "Homepage" : "Landing page"}
          </Link>
        </div>
      </div>
    </div>
  );
}
