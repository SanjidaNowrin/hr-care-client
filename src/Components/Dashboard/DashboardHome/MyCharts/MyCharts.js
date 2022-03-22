import React, { useEffect, useState } from "react";
import MyChart from "./MyChart";

const MyCharts = () => {
    const [chart, setChart] = useState([]);
    const [male, setMale] = useState("");
    const [female, setFemale] = useState("");

    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/employees")
            .then((res) => res.json())
            .then((data) => setChart(data.result));
    }, []);

    //filter employee male
    useEffect(() => {
        const filterMale = chart.filter((data) => data.gendar === "Male");
        setMale(filterMale);
    }, [chart]);

    //filter employee female
    useEffect(() => {
        const filterFeMale = chart.filter((data) => data.gendar === "Female");
        setFemale(filterFeMale);
    }, [chart]);

    //employee value
    const chartData = [];

    const femaleNumber = { name: "female", value: female.length };
    const maleNumber = { name: "male", value: male.length };

    chartData.push(femaleNumber);
    chartData.push(maleNumber);

    const totalEmployee = chart.length;

    //make employee persentage
    let femalePersentage = 0;
    let malePersentage = 0;

    if (female.length !== 0 && male.length !== 0) {
        femalePersentage = (female.length / totalEmployee) * 100;
        malePersentage = (male.length / totalEmployee) * 100;
    }

    return (
        <>
            <MyChart dataTwo={chartData} male={malePersentage.toFixed(2)} female={femalePersentage.toFixed(2)}></MyChart>
        </>
    );
};

export default MyCharts;
