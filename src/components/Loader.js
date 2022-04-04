import React from "react";
import LottieAnimation from "components/LottieAnimation";
import styles from "./scss/loader.module.scss";
import loadingLottie from "animations/loading.json";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <LottieAnimation
        style={styles.loadingLottie}
        animationData={loadingLottie}
      />
    </div>
  );
}
