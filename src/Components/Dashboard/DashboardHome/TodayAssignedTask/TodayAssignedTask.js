import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const TodayAssignedTask = ({todayTaskPercentage}) => {
//   const value = {todayTaskPercentage };
  return (
    <div sx={{ width: 200, height: 200 }}>
      <CircularProgressbar value={todayTaskPercentage} text={`${todayTaskPercentage.toFixed(2)}%`}/>
    </div>
  );
};

export default TodayAssignedTask;
