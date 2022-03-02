import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../HolidayCalender/HolidayCalendar.css";
import { Typography } from '@mui/material';
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
function HolidayCalendar() {
  const [newEvent, setNewEvent] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/holidays")
      .then((res) => res.json())
      .then((data) => setNewEvent(data.data));
  }, []);
  return (
    <>
    <Typography
        sx={{ textAlign: "center", margin: "25px", color: "#01578A" }}
        variant="h3"
      >
        Calendar
      </Typography>
      <Calendar
        localizer={localizer}
        events={newEvent}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 500, margin: "50px" }}
      />
    </>
  );
}

export default HolidayCalendar;
