import React, { useState } from "react";
import FlightsCarsLodgingForm from "./FlightsCarsLodgingForm";
import styles from "./scss/add-flights-cars-lodging.module.scss";

const AddFlightsCarsLodging = ({ adventure, setAdventure }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [formType, setFormType] = useState("");

  const toggleForm = (type) => {
    setIsOpenForm(!isOpenForm);
    if (type) {
      setFormType(type);
    }
  };

  return isOpenForm ? (
    <div className={styles.mainContainer}>
      <FlightsCarsLodgingForm
        adventure={adventure}
        setAdventure={setAdventure}
        type={formType}
        toggleForm={toggleForm}
      />
    </div>
  ) : (
    <div className={styles.mainContainer}>
      <h6>Add a flight, car rental or lodging</h6>
      <div className={styles.addButtonsContainer}>
        <button
          onClick={() => toggleForm("flights")}
          className={styles.brandBlueButton}
        >
          Add flight
        </button>
        <button
          onClick={() => toggleForm("car_rental")}
          className={styles.brandBlueButton}
        >
          Add car rental
        </button>
        <button
          onClick={() => toggleForm("lodging")}
          className={styles.brandBlueButton}
        >
          Add lodging
        </button>
      </div>
    </div>
  );
};

export default AddFlightsCarsLodging;
