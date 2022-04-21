import React from "react";
import { Link } from "react-router-dom";
import styles from "./scss/adventure-gallery.module.scss";

export default function AddAnAdventure({ adventures }) {
  return (
    !!adventures.length && (
      <div className={styles.galleryContainer}>
        <div className={styles.adventures}>
          <h3>Gallery of all your adventures</h3>
          <div className={styles.adventureContainer}>
            {adventures.map((adventure) => (
              <div key={adventure._id} className={styles.adventureCard}>
                <div
                  className={`${styles.cardImageSection} ${
                    adventure.image_url ? styles.withPhoto : ""
                  }`}
                >
                  {adventure.image_url && (
                    <img src={adventure.image_url} alt={adventure.title} />
                  )}
                </div>
                <div className={styles.cardSection}>
                  <h6>{adventure.title}</h6>
                  <p>{adventure.description}</p>
                  <div className={styles.editButton}>
                    <Link to={`/adventure/${adventure._id}`}>
                      View adventure
                    </Link>
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
