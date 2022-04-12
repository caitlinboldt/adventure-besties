import React, { useEffect, useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./scss/adventure-page.module.scss";
import { useParams } from "react-router";
import { getTrip } from "api/trip";

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

  return (
    adventure && (
      <>
        <Header />
        <div className={styles.adventurePage}>
          <div className={styles.introContainer}>
            <div className={styles.innerIntroContent}>
              <div>
                <h6>{adventure.title}</h6>
                <p>{adventure.description}</p>
              </div>
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
    )
  );
}
