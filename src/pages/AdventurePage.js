import React, { useEffect, useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./scss/adventure-page.module.scss";
import { useParams } from "react-router";
import { getTrip } from "api/trip";
import Loader from "components/Loader";
import EditAdventure from "components/EditAdventure";

export default function AdventurePage() {
  const [adventure, setAdventure] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const tripResponse = await getTrip({ tripId: id });

      if (tripResponse.isError) {
        console.error(tripResponse.message);
      } else {
        setAdventure(tripResponse);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return adventure ? (
    <>
      <Header />
      <div className={styles.adventurePage}>
        <div className={styles.introContainer}>
          <div className={styles.innerIntroContent}>
            <EditAdventure adventure={adventure} setAdventure={setAdventure} />
            <div>
              <img
                className={styles.introPhoto}
                src={adventure.image_url}
                alt={adventure.title}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loader />
  );
}
