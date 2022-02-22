import { Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Announcement = ({ data }) => {
    const [newData, setNewData] = useState([]);
    const { Id } = useParams();

    useEffect(() => {
        const filterData = data.filter((item) => item.id === Id);
        setNewData(filterData);
    }, [Id]);

    return (
        <div>
            {newData.length
                ? newData.map((data) => (
                      <Box key={data.id}>
                          <Paper elevation={6} sx={{ padding: "15px" }}>
                              <Typography variant="h5" sx={{ margin: "8px 0px" }}>
                                  #{data.title}
                              </Typography>
                              <Typography sx={{ color: "gray" }}>{data.description}</Typography>
                          </Paper>
                      </Box>
                  ))
                : data.slice(0, 1).map((data) => (
                      <Box key={data.id}>
                          <Paper elevation={6} sx={{ padding: "15px" }}>
                              <Typography variant="h5" sx={{ margin: "8px 0px" }}>
                                  #{data.title}
                              </Typography>
                              <Typography sx={{ color: "gray" }}>{data.description}</Typography>
                          </Paper>
                      </Box>
                  ))}
        </div>
    );
};

export default Announcement;
