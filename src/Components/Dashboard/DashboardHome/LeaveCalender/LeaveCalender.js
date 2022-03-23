import React, { useState } from 'react';
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import './LeaveCalender.css';
const LeaveCalender = ({ leave }) => {
    const leaveDates = []
    leave.map(l => {
        leaveDates.push(l.date)
    })
    const props = { shadow: false, border: 0 }

    // const [values, setValues] = useState([])
    // setValues(leaveDates)
    return (

        <Calendar
            {...props}
            multiple
            value={leaveDates}


        />

    );
};

export default LeaveCalender;