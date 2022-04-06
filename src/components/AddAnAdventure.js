import React, { useState } from "react";
import { addATrip } from "api/trip";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "slices/user/userSlice";
import DatePicker from "react-datepicker";
import styles from "./scss/add-an-adventure.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "assets/calendar-icon.png";

const initialFormState = {
  title: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
};

export default function AddAnAdventure() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);
  const [formValues, setFormValues] = useState(initialFormState);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [error, setError] = useState("");

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
    const tripResponse = await addATrip({
      ...formValues,
      userId: user._id,
    });

    if (tripResponse.isError) {
      return setError(tripResponse.message);
    }
    dispatch(setUser({ ...user, trips: [...user.trips, tripResponse._id] }));
    toggle();
  };

  return (
    <div>
      {isOpenForm ? (
        <div className={styles.addAnAdventureContainer}>
          <h6>Add an adventure</h6>
          {error && <p className={styles.errorText}>{error}</p>}
          <form>
            <input
              name="title"
              id="adventure-title"
              type="text"
              value={formValues.title}
              onChange={handleInput}
              placeholder="Title"
            />
            <input
              name="description"
              id="adventure-description"
              type="text"
              value={formValues.description}
              onChange={handleInput}
              placeholder="Description"
            />
            <div className={styles.datePickerLabels}>
              <label>
                <img src={calendarIcon} alt="Calendar icon" /> Start date
              </label>
              <label>
                <img src={calendarIcon} alt="Calendar icon" /> End date
              </label>
            </div>
            <div className={styles.datePicker}>
              <DatePicker
                selected={formValues.startDate}
                onChange={(date) =>
                  setFormValues({ ...formValues, startDate: date })
                }
              />
              <DatePicker
                selected={formValues.endDate}
                onChange={(date) =>
                  setFormValues({ ...formValues, endDate: date })
                }
              />
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={toggle} className={styles.brandWhiteButton}>
                Cancel
              </button>
              <button onClick={submit} className={styles.brandBlueButton}>
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.addAnAdventureContainer}>
          <h6>Ready to adventure with a bestie?</h6>
          <button onClick={toggle} className={styles.brandBlueButton}>
            Add an adventure
          </button>
        </div>
      )}
    </div>
  );
}
