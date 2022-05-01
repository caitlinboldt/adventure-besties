import React, { useState } from "react";
import { editTripAdd } from "api/trip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./scss/add-flights-cars-lodging.module.scss";
import calendarIcon from "assets/calendar-icon.png";

const FlightsCarsLodgingForm = ({
  adventure,
  setAdventure,
  type,
  toggleForm,
}) => {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState("");
  const requiredFields = {
    flights: [
      "airline",
      "airport_from",
      "airport_to",
      "cost",
      "departure_time",
      "arrival_time",
    ],
    car_rental: [
      "car_rental_name",
      "car_type",
      "days",
      "cost",
      "start_date",
      "end_date",
    ],
    lodging: [
      "lodging_type",
      "location",
      "cost_per_night",
      "nights",
      "start_date",
      "end_date",
    ],
  };

  const clearForm = () => {
    setFormValues({});
    setError("");
    toggleForm();
  };

  const submit = async (e) => {
    e.preventDefault();
    const allRequiredFields = requiredFields[type].every(
      (name) => formValues[name]
    );
    if (!allRequiredFields) {
      return setError("All fields are required");
    }
    const tripResponse = await editTripAdd({
      data: formValues,
      tripId: adventure._id,
      property: type,
    });

    if (tripResponse.isError) {
      return setError(tripResponse.message);
    }
    setAdventure(tripResponse.updatedTrip);
    clearForm();
  };

  const handleInput = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.formContainer}>
      {type === "flights" && (
        <form>
          <h6>Add a flight</h6>
          <input
            name="airline"
            id="airline"
            type="text"
            value={formValues.airline}
            onChange={handleInput}
            placeholder="Airline name"
          />
          <input
            name="airport_from"
            id="airport-from"
            type="text"
            value={formValues.airport_from}
            onChange={handleInput}
            placeholder="Airport from"
          />
          <input
            name="airport_to"
            id="airport-to"
            type="text"
            value={formValues.airport_to}
            onChange={handleInput}
            placeholder="Airport to"
          />
          <input
            name="flight_number"
            id="flight-number"
            type="text"
            value={formValues.flight_number}
            onChange={handleInput}
            placeholder="Flight number"
          />
          <input
            name="cost"
            id="cost"
            type="number"
            value={formValues.cost}
            onChange={handleInput}
            placeholder="Cost"
          />
          <div className={styles.datePickerLabels}>
            <label>
              <img src={calendarIcon} alt="Calendar icon" /> Departure time
            </label>
            <label>
              <img src={calendarIcon} alt="Calendar icon" /> Arrival time
            </label>
          </div>
          <div className={styles.datePicker}>
            <DatePicker
              selected={formValues.departure_time}
              showTimeSelect
              onChange={(date) =>
                setFormValues({ ...formValues, departure_time: date })
              }
            />
            <DatePicker
              selected={formValues.arrival_time}
              showTimeSelect
              onChange={(date) =>
                setFormValues({ ...formValues, arrival_time: date })
              }
            />
          </div>
        </form>
      )}
      {type === "car_rental" && (
        <form>
          <h6>Add a car rental</h6>
          <input
            name="car_rental_name"
            id="car-rental-name"
            type="text"
            value={formValues.car_rental_name}
            onChange={handleInput}
            placeholder="Car rental name"
          />
          <input
            name="car_type"
            id="car-type"
            type="text"
            value={formValues.car_type}
            onChange={handleInput}
            placeholder="Car type"
          />
          <input
            name="days"
            id="days"
            type="number"
            value={formValues.days}
            onChange={handleInput}
            placeholder="Number of days"
          />
          <input
            name="cost"
            id="cost"
            type="number"
            value={formValues.cost}
            onChange={handleInput}
            placeholder="Cost"
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
              selected={formValues.start_date}
              showTimeSelect
              onChange={(date) =>
                setFormValues({ ...formValues, start_date: date })
              }
            />
            <DatePicker
              selected={formValues.end_date}
              showTimeSelect
              onChange={(date) =>
                setFormValues({ ...formValues, end_date: date })
              }
            />
          </div>
        </form>
      )}
      {type === "lodging" && (
        <form>
          <h6>Add lodging</h6>
          <input
            name="lodging_type"
            id="lodging-name"
            type="text"
            value={formValues.lodging_type}
            onChange={handleInput}
            placeholder="Lodging name"
          />
          <input
            name="location"
            id="location"
            type="text"
            value={formValues.location}
            onChange={handleInput}
            placeholder="Location"
          />
          <input
            name="cost_per_night"
            id="cost-per-night"
            type="number"
            value={formValues.cost_per_night}
            onChange={handleInput}
            placeholder="Cost per night"
          />
          <input
            name="nights"
            id="nights"
            type="number"
            value={formValues.nights}
            onChange={handleInput}
            placeholder="Number of nights"
          />
          <input
            name="website_url"
            id="website-url"
            type="text"
            value={formValues.website_url}
            onChange={handleInput}
            placeholder="Website URL"
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
        </form>
      )}
      {error && <p className={styles.errorText}>Error: {error}</p>}
      <div>
        <button onClick={clearForm} className={styles.brandWhiteButton}>
          Cancel
        </button>
        <button onClick={submit} className={styles.brandBlueButton}>
          Save
        </button>
      </div>
    </div>
  );
};

export default FlightsCarsLodgingForm;
