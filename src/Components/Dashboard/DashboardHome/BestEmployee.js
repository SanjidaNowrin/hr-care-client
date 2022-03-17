import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import MyCharts from "./MyCharts/MyCharts";
import dateFormat from "../../Share/DateFormat/dateFormat";
const BestEmployee = () => {
  const [bestEmp, setBestEmp] = useState([]);
  console.log(bestEmp);
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/taskAssign")
      .then((res) => res.json())
      .then((data) => setBestEmp(data.data));
  }, []);

  const useStyle = makeStyles({
    cardContainer: {
      padding: "60px 85px 0px 0px",
      borderRadius: "5px",
    },
    cardImg: {
      height: "140px",
      width: "140px",
      borderRadius: "50%",
      margin: "50px auto 15px",
    },
    cardBox: {
      background: "#c3e4f7 !important",
    },
    cardContent: {
      textAlign: "center",
    },
    cardTitle: {
      fontWeight: "700",
      color: "var(--p_color)",
    },
  });

  const { cardContainer, cardImg, cardBox, cardContent, cardTitle } =
    useStyle();
  //   admin assign task
  const [employees, setEmployees] = useState([]);
  let time = new Date().toLocaleString();
  const todaydate = dateFormat(time.split(",")[0], "yyyy-MM-dd");
  const currentDate = dateFormat(
    new Date().toLocaleString().split(",")[0],
    "yyyy-MM-dd"
  );
  const dateString = currentDate.split("-")[1];
  const [taskAssign, setAssignTask] = useState([]);
  const [todayTask, setTodayTask] = useState([]);
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.data));
  }, []);

  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/taskAssign")
      .then((res) => res.json())
      .then((data) => {
        const filterThisMonthTask = data?.data?.filter(
          (task) => task.date.split("-")[1] === dateString
        );
        const filterTodayTask = data?.data?.filter(
          (task) => task.date === currentDate
        );
        setAssignTask(filterThisMonthTask);
        setTodayTask(filterTodayTask);
      });
  }, []);
  const array = [];
  console.log(employees);
  employees?.map((bestEmp) => {
    let bestEmployee = {};
    let totalTask = 0;
    let totalAssignTask = 0;
    let taskPercentage = 0;
    let findEmail = taskAssign?.filter((x) => x.email === bestEmp.email);
    findEmail.map((calc) => {
      totalAssignTask += calc.tags.length;
      totalTask += calc.taskDone.length;
      if ((totalTask && totalAssignTask) !== 0) {
        taskPercentage = (totalTask / totalAssignTask) * 100;
      }
    });
    bestEmployee.name = bestEmp.name;
    bestEmployee.email = bestEmp.email;
    bestEmployee.photo = bestEmp.photo;
    bestEmployee.taskPoint = totalTask;
    bestEmployee.totalAssignTask = totalAssignTask;
    bestEmployee.taskPercentage = taskPercentage;
    array.push(bestEmployee);
  });
  console.log(array);
  const finalPoint = array.sort(function (a, b) {
    return b.taskPercentage - a.taskPercentage;
  });
  console.log(finalPoint);
  const check = finalPoint[0]?.taskPercentage?.toFixed(2);
  console.log(check);
  // best employee end
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={1}></Grid>
      <Grid item xs={12} sm={12} md={4}>
        {bestEmp?.slice(2, 3).map((data) => (
          <Box className={cardContainer}>
            <Card className={cardBox}>
              <CardMedia
                className={cardImg}
                image="https://media.istockphoto.com/vectors/gold-trophy-with-the-name-plate-of-the-winner-of-the-competition-vector-id1168757141?k=20&m=1168757141&s=612x612&w=0&h=_jia0PPMGux63K2gqp-o0OzRcHbd6bvjVQJ70rz3nF8="
              />

              <CardContent className={cardContent}>
                <Typography variant="h5" className={cardTitle}>
                  Best Employee
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ fontWeight: "600" }}
                  color="text.secondary"
                >
                  {finalPoint[0]?.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "600", paddingBottom: "25px" }}
                  color="text.secondary"
                >
                  {check}
                  {finalPoint[0] ? "%" : ""}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <MyCharts></MyCharts>
      </Grid>
      <Grid item xs={12} sm={12} md={1}></Grid>
    </Grid>
  );
};

export default BestEmployee;
