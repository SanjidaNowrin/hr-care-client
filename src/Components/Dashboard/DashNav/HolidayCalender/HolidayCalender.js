import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Typography } from "@mui/material";
const HolidayCalendar = (props) => {
  const [newEvent, setNewEvent] = useState([]);
  const localizer = momentLocalizer(moment);
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/holidays")
      .then((res) => res.json())
      .then((data) => setNewEvent(data.data));
  }, []);
  return (
    <>
      <Typography
        sx={{ textAlign: "center", margin: "20px", color: "#01578A" }}
        variant="h4"
      >
        <img src="https://img.icons8.com/ios/28/000000/planner.png" /> Calendar
      </Typography>
      <Calendar
        localizer={localizer}
        events={newEvent}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 350, margin: "50px" }}
      />
    </>
  );
};

export default HolidayCalendar;
