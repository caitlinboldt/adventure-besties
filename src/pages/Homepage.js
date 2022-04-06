import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import AddAnAdventure from "components/AddAnAdventure";
import AdventureGallery from "components/AdventureGallery";
import brookingsPhoto from "assets/IMG_5769.jpg";
import styles from "./scss/homepage.module.scss";

export default function Homepage() {
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
        <AdventureGallery />
      </div>
      <Footer />
    </>
  );
}
