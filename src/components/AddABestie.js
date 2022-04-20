import React, { useState } from "react";
import { addABestie } from "api/trip";
import styles from "./scss/add-a-bestie.module.scss";

const AddABestie = ({ adventure, setAdventure }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);

  const clearForm = () => {
    setEmail("");
    setError("");
  };

  const toggle = () => {
    setIsOpenForm(!isOpenForm);
    clearForm();
  };

  const send = async (e) => {
    e.preventDefault();
    const tripResponse = await addABestie({
      data: { email, tripId: adventure._id },
    });

    if (tripResponse.isError) {
      return setError(tripResponse.message);
    }
    setAdventure(tripResponse.updatedTrip);
    toggle();
  };

  return (
    <div className={styles.addABestieContainer}>
      <div className={styles.addABestieInnerContainer}>
        {isOpenForm ? (
          <div>
            {error && <p className={styles.errorText}>Error: {error}</p>}
            <form>
              <input
                name="email"
                id="sign-in-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
              <button
                className={styles.brandBlueButton}
                type="submit"
                onClick={send}
              >
                Send
              </button>
              <button onClick={toggle} className={styles.brandWhiteButton}>
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h6>Add a bestie to plan the adventure with you?</h6>
            <button onClick={toggle} className={styles.brandBlueButton}>
              Add a bestie
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddABestie;
