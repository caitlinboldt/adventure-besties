import React, { useEffect, useState } from "react";
import { getTripGallery } from "api/trip";
import { useSelector } from "react-redux";
import Header from "components/Header";
import Footer from "components/Footer";
import AddAnAdventure from "components/AddAnAdventure";
import AdventureGallery from "components/AdventureGallery";
import Calendar from "components/Calendar";
import brookingsPhoto from "assets/IMG_5769.jpg";
import styles from "./scss/homepage.module.scss";

export default function Homepage() {
  const user = useSelector((state) => state.userInfo.user);
  const [adventures, setAdventures] = useState([]);

  useEffect(() => {
    (async () => {
      const tripResponse = await getTripGallery({ userId: user._id });

      if (tripResponse.isError) {
        console.error(tripResponse.message);
      } else {
        setAdventures(tripResponse);
      }
    })();
  }, [user]);

  return (
    <>
      <Header />
      <div className={styles.homepage}>
        <div className={styles.introContainer}>
          <div className={styles.innerIntroContent}>
            <div>
              <img
                className={styles.introPhoto}
                src={brookingsPhoto}
                alt="Brookings, Oregon at sunset"
              />
            </div>
            <AddAnAdventure />
          </div>
        </div>
        <AdventureGallery adventures={adventures} />
        <div className={styles.calendarContainer}>
          <Calendar adventures={adventures} />
        </div>
      </div>
      <Footer />
    </>
  );
}
