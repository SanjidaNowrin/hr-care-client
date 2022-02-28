import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState ,useEffect} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

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
function HolidayCalender() {
    const [newEvent, setNewEvent] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/holidays")
        .then((res) => res.json())
        .then((data) => setNewEvent(data.data));
    }, []);
    return (
        <div className="App">
            <Calendar localizer={localizer} events={newEvent} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default HolidayCalender;