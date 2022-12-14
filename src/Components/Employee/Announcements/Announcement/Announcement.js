import { Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Announcement = ({ data }) => {
    const [newData, setNewData] = useState([]);
    const { Id } = useParams();

    useEffect(() => {
        const filterData = data.filter((item) => item._id === Id);
        setNewData(filterData);
    }, [Id, data]);

    return (
        <>
            {newData.length
                ? newData.map((data) => (
                    <Box key={data.id}>
                        <Paper sx={{ p: 2, boxShadow: '1px 10px 30px #b6b7b7 !important', borderRadius: '13px !important', border: "2px solid #009EFA" }}>
                            <Typography variant="h5"
                                sx={{ fontWeight: '600', mb: 2 }}
                            >
                                {data.title}
                            </Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'var(--PT_font) !important', }}>{data.text}</Typography>
                        </Paper>
                    </Box>
                ))
                : data.slice(0, 1).map((data) => (
                    <Box key={data.id}>
                        <Paper sx={{ p: 2, boxShadow: '1px 10px 30px #b6b7b7 !important', borderRadius: '13px !important', border: "2px solid #009EFA" }}>
                            <Typography variant="h5"
                                sx={{ fontWeight: '600', mb: 2 }}
                            >
                                {data.title}
                            </Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'var(--PT_font) !important', }}>{data.text}</Typography>
                        </Paper>
                    </Box>
                ))}
        </>
    );
};

export default Announcement;
