import { Box, Typography } from "@mui/material";
import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#FF8042", "#00C49F"];
const MyChart = ({ dataTwo, male, female }) => {

    return (
        <Box>
            <Box>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                            Employee Structure
                        </Typography>
                        <PieChart width={250} height={250}>
                            <Pie
                                data={dataTwo}
                                cx={120}
                                cy={120}
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

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ backgroundColor: "#00C49F", color: "#00C49F", height: "25px", width: "25px" }}></Box>
                    <Typography variant="body1" sx={{ fs: "bold", color: "#FF8042", marginTop: '2px', ml: 1 }}>Male: {male}%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            backgroundColor: "#FF8042",
                            color: "#FF8042",
                            height: "25px",
                            width: "25px",
                        }}
                    ></Box>
                    <Typography variant="body1" sx={{ fs: "bold", color: "#FF8042", marginTop: '2px', ml: 1 }}>Female: {female}%</Typography>
                </Box>
            </Box>
        </Box >
    );
};

export default MyChart;
