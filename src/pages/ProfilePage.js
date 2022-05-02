import React, { useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import { editUser } from "api/user";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "slices/user/userSlice";
import styles from "./scss/profile.module.scss";
import waterfallsPhoto from "assets/IMG_5251.jpg";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);
  const [error, setError] = useState("");

  const updateSettings = async (name) => {
    const userResponse = await editUser({
      data: {
        key: name,
        value: !user.settings[name],
      },
      userId: user._id,
    });

    if (userResponse.isError) {
      return setError(userResponse.message);
    }
    dispatch(setUser(userResponse.user));
  };

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
        <div className={styles.settingsContainer}>
          <div className={styles.toggleContainer}>
            <h3>Settings off/on</h3>
            {error && <p className={styles.errorText}>Error: {error}</p>}
            <div className={styles.toggle}>
              <input
                checked={user?.settings?.show_full_name}
                type="checkbox"
                id="show_full_name"
                onChange={() => updateSettings("show_full_name")}
              />
              <label for="show_full_name">Show full name</label>
            </div>
            <div className={styles.toggle}>
              <input
                checked={user?.settings?.allow_find_by_email}
                type="checkbox"
                id="allow_find_by_email"
                onChange={() => updateSettings("allow_find_by_email")}
              />
              <label for="allow_find_by_email">Allow besties to find you</label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
