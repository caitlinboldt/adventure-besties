import React, { useEffect, useState } from "react";
import { editTripRemove } from "api/trip";
import LottieAnimation from "./LottieAnimation";
import { format } from "date-fns";
import deleteIcon from "animations/delete_icon.json";
import styles from "./scss/flights-cars-lodging-gallery.module.scss";

const FlightsCarsLodgingGallery = ({ adventure, setAdventure }) => {
  const [flightsCarsLodging, setFlightsCarsLodging] = useState([]);
  const [error, setError] = useState("");

  const remove = async (itemId, type) => {
    const tripResponse = await editTripRemove({
      itemId,
      tripId: adventure._id,
      property: type,
    });

    if (tripResponse.isError) {
      return setError(tripResponse.message);
    }
    setAdventure(tripResponse.updatedTrip);
  };

  const formatURL = (url) => {
    if (url.includes("http")) {
      return url;
    } else {
      return `https://${url}`;
    }
  };

  const cropURL = (url) => {
    if (url.length > 38) {
      return `${url.slice(0, 38)}...`;
    }
    return url;
  };

  useEffect(() => {
    const combineFlightsCarsLodging = [
      ...(adventure.lodging || []),
      ...(adventure.flights || []),
      ...(adventure.car_rental || []),
    ];
    setFlightsCarsLodging(combineFlightsCarsLodging);
  }, [adventure]);

  return (
    <div className={styles.galleryContainer}>
      {error && <p className={styles.errorText}>Error: {error}</p>}
      <div className={styles.cardContainer}>
        {flightsCarsLodging.map((type, index) => {
          if (type?.airline) {
            return (
              <div key={`${type.airline}-${index}`} className={styles.card}>
                <div className={styles.removeContainer}>
                  <button
                    onClick={() => remove(type._id, "flights")}
                    className={styles.delete}
                  >
                    <LottieAnimation
                      style={styles.deleteLottie}
                      animationData={deleteIcon}
                    />
                  </button>
                </div>
                <div>
                  <h6>Flight</h6>
                </div>
                <div className={styles.typeInformation}>
                  <h3>{type.airline}</h3>
                  <p>{type.airport_from}</p>
                  <p>{`Departure: ${format(
                    new Date(type.departure_time),
                    "PPpp"
                  )}`}</p>
                  <p>{type.airport_to}</p>
                  <p>{`Arrival: ${format(
                    new Date(type.arrival_time),
                    "PPpp"
                  )}`}</p>
                  <p>{`$${type.cost.toFixed(2)}`}</p>
                </div>
              </div>
            );
          }
          if (type?.lodging_type) {
            return (
              <div
                key={`${type.lodging_type}-${index}`}
                className={styles.card}
              >
                <div className={styles.removeContainer}>
                  <button
                    onClick={() => remove(type._id, "lodging")}
                    className={styles.delete}
                  >
                    <LottieAnimation
                      style={styles.deleteLottie}
                      animationData={deleteIcon}
                    />
                  </button>
                </div>
                <div>
                  <h6>Lodging</h6>
                </div>
                <div className={styles.typeInformation}>
                  <h3>{type.lodging_type}</h3>
                  <p>{type.location}</p>
                  <a
                    target="_blank"
                    rel="opener noreferrer"
                    href={formatURL(type.website_url)}
                    className={styles.brandBlueLink}
                  >
                    {cropURL(type.website_url)}
                  </a>
                  <p className={styles.time}>
                    {`Arrive: ${format(new Date(type.start_date), "PP")}`}
                    <br />
                    {`Leave: ${format(new Date(type.end_date), "PP")}`}
                  </p>
                  <p>{`${type.nights} nights`}</p>
                  <p>{`$${type.cost_per_night.toFixed(2)}`}</p>
                </div>
              </div>
            );
          }
          if (type?.car_rental_name) {
            return (
              <div
                key={`${type.car_rental_name}-${index}`}
                className={styles.card}
              >
                <div className={styles.removeContainer}>
                  <button
                    onClick={() => remove(type._id, "car_rental")}
                    className={styles.delete}
                  >
                    <LottieAnimation
                      style={styles.deleteLottie}
                      animationData={deleteIcon}
                    />
                  </button>
                </div>
                <div>
                  <h6>Car</h6>
                </div>
                <div className={styles.typeInformation}>
                  <h3>{type.car_rental_name}</h3>
                  <p>{`${type.car_type}`}</p>
                  <p className={styles.time}>
                    {`Pick up: ${format(new Date(type.start_date), "PPpp")}`}
                    <br />
                    {`Drop off: ${format(new Date(type.end_date), "PPpp")}`}
                  </p>
                  <p>{`${type.days} days`}</p>
                  <p>{`$${type.cost.toFixed(2)}`}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FlightsCarsLodgingGallery;
