import { Box, Typography } from "@mui/material";
import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const data = [
    { name: "Group A", value: 73 },
    { name: "Group B", value: 27 },
];
const COLORS = ["#ff82b0", "#00C49F"];
const MyChart = () => {
    // const { _id, ID } = data;
    // console.log(data);
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box>
                {/* <h1>{ID}</h1> */}
                <PieChart width={300} height={400}>
                    <Pie data={data} cx={120} cy={200} innerRadius={85} outerRadius={120} fill="#8884d8" paddingAngle={5} dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </Box>
            <Box sx={{ textAlign: "start" }}>
                <Box sx={{ backgroundColor: "#ff82b0", color: "#ff82b0", height: "10px", width: "60px" }}></Box>
                <Typography sx={{ fw: "bold" }}>Male: 73%</Typography>
                <Box
                    sx={{
                        backgroundColor: "#00C49F",
                        color: "#00C49F",
                        height: "10px",
                        width: "60px",
                        mt: 1,
                    }}
                ></Box>
                <Typography sx={{ fs: "bold" }}>Female: 27%</Typography>
            </Box>
        </Box>
    );
};

export default MyChart;
