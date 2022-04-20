import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "assets/calendar-icon.png";
import styles from "./scss/edit-adventure.module.scss";
import adventureStyles from "./scss/add-an-adventure.module.scss";
import { editTrip, deleteTrip } from "api/trip";

const initialFormState = {
  title: "",
  description: "",
  start_date: new Date(),
  end_date: new Date(),
};

const EditAdventure = ({ adventure, setAdventure }) => {
  const navigate = useNavigate();
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

  const deleteAdventure = async (e) => {
    e.preventDefault();
    const deleteTripResponse = await deleteTrip({
      tripId: adventure._id,
    });

    if (deleteTripResponse.isError) {
      return setError(deleteTripResponse.message);
    }

    navigate("/homepage");
  };

  const submit = async (e) => {
    e.preventDefault();
    const tripResponse = await editTrip({
      data: formValues,
      tripId: adventure._id,
    });

    if (tripResponse.isError) {
      return setError(tripResponse.message);
    }
    setAdventure(tripResponse.updatedTrip);
    toggle();
  };

  return isOpenForm ? (
    <div className={adventureStyles.adventureContainer}>
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
        <div className={adventureStyles.datePickerLabels}>
          <label>
            <img src={calendarIcon} alt="Calendar icon" /> Start date
          </label>
          <label>
            <img src={calendarIcon} alt="Calendar icon" /> End date
          </label>
        </div>
        <div className={adventureStyles.datePicker}>
          <DatePicker
            selected={formValues.start_date}
            onChange={(date) =>
              setFormValues({ ...formValues, start_date: date })
            }
          />
          <DatePicker
            selected={formValues.end_date}
            onChange={(date) =>
              setFormValues({ ...formValues, end_date: date })
            }
          />
        </div>
        <div className={adventureStyles.buttonContainer}>
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
    <div className={styles.editAdventureContainer}>
      <div>
        <h6>{adventure.title}</h6>
        <p>{adventure.description}</p>
        <div>
          <button onClick={deleteAdventure} className={styles.brandWhiteButton}>
            Delete adventure?
          </button>
          <button onClick={toggle} className={styles.brandBlueButton}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdventure;
