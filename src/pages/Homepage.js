import Header from "components/Header";
import Footer from "components/Footer";
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
            <div className={styles.addATrip}>
              <h6>Ready to adventure with a bestie?</h6>
              <button className={styles.brandBlueButton}>Add a trip</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
