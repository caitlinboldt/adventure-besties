import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { editTripAdd, editTripRemove } from "api/trip";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "assets/calendar-icon.png";
import styles from "./scss/itinerary.module.scss";
import { format } from "date-fns";

const initialFormState = {
  day_date: new Date(),
  details: "",
};

const Itinerary = ({ adventure, setAdventure }) => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [error, setError] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);

  const clearForm = () => {
    setFormValues(initialFormState);
    setError("");
  };

  const toggle = () => {
    setIsOpenForm(!isOpenForm);
    clearForm();
  };

  const handleInput = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!formValues.details) {
      return setError("Details are required");
    }
    const tripResponse = await editTripAdd({
      data: formValues,
      tripId: adventure._id,
      property: "itinerary",
    });

    if (tripResponse.isError) {
      return setError(tripResponse.message);
    }
    setAdventure(tripResponse.updatedTrip);
    toggle();
  };

  const removeDay = async (itemId) => {
    const tripResponse = await editTripRemove({
      itemId,
      tripId: adventure._id,
      property: "itinerary",
    });

    if (tripResponse.isError) {
      return setError(tripResponse.message);
    }
    setAdventure(tripResponse.updatedTrip);
  };

  return (
    <div className={styles.itenitaryContainer}>
      <div>
        <div className={styles.titleContainer}>
          <h6>Day to Day Itinerary</h6>
          {isOpenForm ? (
            <div className={styles.buttonContainer}>
              {error && <p className={styles.errorText}>Error: {error}</p>}
              <button onClick={toggle} className={styles.brandWhiteButton}>
                Cancel
              </button>
              <button onClick={submit} className={styles.brandBlueButton}>
                Save
              </button>
            </div>
          ) : (
            <button onClick={toggle} className={styles.brandBlueButton}>
              Add a day
            </button>
          )}
          {isOpenForm && (
            <form>
              <div>
                <div className={styles.datePickerLabels}>
                  <label>
                    <img src={calendarIcon} alt="Calendar icon" /> Day
                  </label>
                </div>
                <div className={styles.datePicker}>
                  <DatePicker
                    selected={formValues.day_date}
                    onChange={(date) =>
                      setFormValues({ ...formValues, day_date: date })
                    }
                  />
                </div>
              </div>
              <div className={styles.textareaContainer}>
                <label>Details</label>
                <textarea
                  name="details"
                  id="details"
                  value={formValues.details}
                  onChange={handleInput}
                />
              </div>
            </form>
          )}
        </div>
        <div className={styles.dayContainer}>
          {adventure.itinerary?.map((day) => (
            <div key={day._id} className={styles.dayCard}>
              <span>{format(new Date(day.day_date), "MMMM dd")}</span>
              <p>{day.details}</p>
              <button
                onClick={() => removeDay(day._id)}
                className={styles.cancelButton}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
