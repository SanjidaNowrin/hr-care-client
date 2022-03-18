import { Box, Typography } from "@mui/material";
import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#FF8042", "#00C49F"];
const MyChart = ({ dataTwo, male, female }) => {
    console.log(dataTwo);

    return (
        <Box>
            <Box>
                <Box sx={{ alignItems: "top", justifyContent: "center", display: "flex" }}>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fs: "bold",
                                color: "#01578a",
                                marginBottom: "-75px",
                                marginTop: "50px",
                                textAlign: "center",
                                marginRight: "50px",
                            }}
                        >
                            Employee Structure
                        </Typography>
                        <PieChart width={300} height={400}>
                            <Pie
                                data={dataTwo}
                                cx={120}
                                cy={200}
                                innerRadius={85}
                                outerRadius={120}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {dataTwo?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ alignItems: "center", justifyContent: "center", display: "flex", marginTop: "-60px", marginLeft: "-10px" }}>
                <Box>
                    <Box sx={{ backgroundColor: "#00C49F", color: "#00C49F", height: "10px", width: "60px" }}></Box>
                    <Typography sx={{ fw: "bold", color: " #00C49F" }}>Male: {male}%</Typography>
                </Box>
                <Box>
                    <Box
                        sx={{
                            backgroundColor: "#FF8042",
                            color: "#FF8042",
                            height: "10px",
                            width: "60px",
                            marginLeft: "10px",
                        }}
                    ></Box>
                    <Typography sx={{ fs: "bold", color: "#FF8042", marginLeft: "10px" }}>Female: {female}%</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default MyChart;
