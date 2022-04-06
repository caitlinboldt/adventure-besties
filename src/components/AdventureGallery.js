import React, { useEffect, useState } from "react";
import { getTripGallery } from "api/trip";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./scss/adventure-gallery.module.scss";

export default function AddAnAdventure() {
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
    !!adventures.length && (
      <div className={styles.galleryContainer}>
        <div className={styles.adventures}>
          <h3>Gallery of all your adventures</h3>
          <div className={styles.adventureContainer}>
            {adventures.map((adventure) => (
              <div key={adventure._id} className={styles.adventureCard}>
                <div className={styles.cardImageSection}></div>
                <div className={styles.cardSection}>
                  <h6>{adventure.title}</h6>
                  <p>{adventure.description}</p>
                  <div className={styles.editButton}>
                    <Link to="/homepage">View adventure</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
