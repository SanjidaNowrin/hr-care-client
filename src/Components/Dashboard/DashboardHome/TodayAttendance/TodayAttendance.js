import React, { useEffect, useState } from "react";
import { Avatar, CardHeader, TableCell, TableRow } from "@mui/material";

const TodayAttendance = ({ item }) => {
  const [employees, setEmployees] = useState([]);
  const [present, setPresent] = useState([]);

  useEffect(() => {
    fetch("https://hr-care.onrender.com/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.result));
  }, []);

  useEffect(() => {
    const filterData = employees.filter((data) => data.email === item.email);
    setPresent(filterData);
  }, [item.email, employees]);

  return (
    <>
      {present.map((data) => (
        <TableRow
          key={data._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            <CardHeader
              sx={{ padding: "0 !important" }}
              avatar={
                <Avatar
                  sx={{ background: "var(--p_color) !important" }}
                  aria-label="recipe"
                >
                  {data.name.slice(0, 1)}
                </Avatar>
              }
              title={data.name}
              subheader={data.designation}
            />
          </TableCell>
          <TableCell align="center">{data.department}</TableCell>
          <TableCell align="center">{item.entry}</TableCell>
          <TableCell align="right">{item.leave}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TodayAttendance;
