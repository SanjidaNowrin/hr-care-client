import React, { useEffect, useState } from "react";

const MyCharts = () => {
    const [chart, setChart] = useState([]);

    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/employees")
            .then((res) => res.json())
            .then((data) => setChart(data.data));
    }, []);
    return (
        <div>
            {chart.map((data) => (
                // <MyChart key={data._id} data={data}></MyChart>
                <h1></h1>
            ))}
        </div>
    );
};

export default MyCharts;
