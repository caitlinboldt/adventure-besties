import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./scss/calendar.module.scss";
import "./scss/calendar.css";

export default function Calendar({ adventures }) {
  const events = adventures?.map((adventure) => {
    return {
      title: adventure.title,
      start: adventure.start_date,
      end: adventure.end_date,
    };
  });

  return (
    <div className={styles.calendar}>
      <FullCalendar
        events={events}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    </div>
  );
}
