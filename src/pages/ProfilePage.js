import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import { useSelector } from "react-redux";
import styles from "./scss/profile.module.scss";
import waterfallsPhoto from "assets/IMG_5251.jpg";

const ProfilePage = () => {
  const user = useSelector((state) => state.userInfo.user);

  return (
    <>
      <Header />
      <div className={styles.profileContainer}>
        <div className={styles.introContainer}>
          <div className={styles.innerIntroContent}>
            <div>
              <img
                className={styles.introPhoto}
                src={waterfallsPhoto}
                alt="Waterfalls"
              />
            </div>
            <div className={styles.userInfo}>
              <h3>{user.name}</h3>
              <h6>{user.email}</h6>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
