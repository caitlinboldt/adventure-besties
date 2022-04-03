import React from "react";
import Lottie from "lottie-react";

const LottieAnimation = ({ style, animationData }) => {
  return (
    <div className={style}>
      <Lottie animationData={animationData} />
    </div>
  );
};

export default LottieAnimation;
