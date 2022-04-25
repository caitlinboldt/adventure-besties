import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import styles from "./scss/total-estimated-cost.module.scss";

const TotalEstimatedCost = ({ adventure }) => {
  const [totalEstimatedCost, setTotalEstimatedCost] = useState("");

  useEffect(() => {
    if (isEmpty(adventure)) {
      return;
    }
    let totalCost = 0;
    if (adventure.lodging.length) {
      const lodgingCost = adventure.lodging.reduce((acc, lodge) => {
        return acc + lodge.cost_per_night * lodge.nights;
      }, 0);
      totalCost = totalCost + lodgingCost;
    }
    if (adventure.flights.length) {
      const flightCost = adventure.flights.reduce((acc, flight) => {
        return acc + flight.cost;
      }, 0);
      totalCost = totalCost + flightCost;
    }
    if (adventure.car_rental.length) {
      const carCost = adventure?.car_rental.reduce((acc, car) => {
        return acc + car.cost;
      }, 0);
      totalCost = totalCost + carCost;
    }
    setTotalEstimatedCost(totalCost.toFixed(2));
  }, [adventure]);

  return (
    <div className={styles.estimatedCostContainer}>
      <div className={styles.estimatedCostInnerContainer}>
        <h6>{`The total estimated cost for this trip is $${totalEstimatedCost}`}</h6>
      </div>
    </div>
  );
};

export default TotalEstimatedCost;
