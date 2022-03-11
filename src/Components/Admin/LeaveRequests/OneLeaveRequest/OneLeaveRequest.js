import { Typography, Paper, useTheme, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dateFormat from "../../../Share/DateFormat/dateFormat";

const OneLeaveRequest = ({ data }) => {

    const theme = useTheme();
    const useStyle = makeStyles({
        announceBox: {
            width: '100%',
            padding: '5px 10px',
            border: "2px solid #fff",
            borderRadius: '13px !important',
            marginBottom: '20px',
            transition: 'all .3s ease',
            "&:hover": {
                border: "2px solid #009EFA",
                boxShadow: '1px 10px 30px #b6b7b7 !important'
            },
        },
        activeAnnounceBox: {
            width: '100%',
            padding: '5px 10px',
            border: "2px solid #fff",
            borderRadius: '13px !important',
            marginBottom: '20px',
            boxShadow: '1px 10px 30px #b6b7b7 !important'
        },
        announceTop: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        announceTitle: {
            color: '#845EC2',
            fontWeight: '400 !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        dateStyle: {
            position: "relative",
            color: "#fff",
            background: '#FFC75F',
            padding: '2px 10px 1px 20px',
            borderRadius: '20px',
            fontStyle: 'italic',
            "&::after": {
                content: '""',
                position: 'absolute',
                height: '5px',
                width: '5px',
                background: '#fff',
                borderRadius: '50%',
                top: '50%',
                left: '11%',
                transform: 'translate(-50%, -50%)'
            },
        },
        announceP: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--PT_font) !important',
            textTransform: 'capitalize',
            [theme.breakpoints.down("sm")]: {
                display: "none !important",
            },
        }
    });
    const { announceTop, announceP, dateStyle } = useStyle();
    const [newData, setNewData] = useState({});
    const { Id } = useParams();

    useEffect(() => {
        const filterData = data.filter((item) => item._id === Id);
        setNewData(filterData);
    }, [Id, data]);


    const onSubmit = (data) => {
        data.status = "Approved"
        fetch(`https://ancient-thicket-61342.herokuapp.com/leave/${data?._id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));

        console.log(data)

        const startDate = new Date(data?.tripStart);
        const endDate = new Date(data?.tripEnd);

        for (let date = startDate; date <= endDate; new Date(date.setDate(date.getDate() + 1))) {

            const currentDate = dateFormat(date.toLocaleString().split(",")[0], 'yyyy-MM-dd');
            console.log(currentDate)

            fetch("https://ancient-thicket-61342.herokuapp.com/attendance", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ID: data?.ID, email: data?.email, date: currentDate, entry: "", vacation: data?.leaveType }),
            })

        }
        Swal.fire(`${data?.name}'s Application Approved Successfully`);

    };
    const handleDelete = (data) => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/leave/${data._id}`, {
            method: "DELETE",
        })
        console.log(data)
        Swal.fire(`${data?.name}'s Application Cancel Successfully`);
    }
    return (
        <>

            {newData.length
                ? newData.map((data) => (
                    <Box key={data.id}>
                        <Paper sx={{ p: 2, boxShadow: '1px 10px 30px #b6b7b7 !important', borderRadius: '13px !important', border: "2px solid #009EFA" }}>

                            <Box className={announceTop}>
                                <Typography variant="h5" sx={{ fontWeight: '600', mb: 2 }}>
                                    {data?.name}
                                </Typography>

                                <Typography variant="body2" className={dateStyle}>{data?.leaveType}</Typography>
                            </Box>
                            <Box className={announceTop}>
                                <Typography className={announceP} variant="body1">{data?.designation}</Typography>
                                <Typography className={announceP} variant="body1">{data?.department}</Typography>
                                <Typography className={announceP} variant="body1">{data?.status}</Typography>
                            </Box>
                            <br />
                            <Box className={announceTop}>
                                <Typography className={announceP} variant="body1"><b>From: </b>{data?.tripStart}</Typography>
                                <Typography className={announceP} variant="body1"><b>To: </b>{data?.tripEnd}</Typography>
                                <Typography className={announceP} variant="body1"><b>Days: </b>{data?.leaveDays}</Typography>
                            </Box>
                            <br />
                            <Typography className={announceP} variant="body1">{data?.message}</Typography>
                            <br />
                            {
                                (data.status === "Approved") ?
                                    <Typography variant="body1" sx={{ color: "green" }}>This Application is Already Approved</Typography>
                                    :
                                    <Box className={announceTop}>
                                        <Button variant="contained" color="success" onClick={() => onSubmit(data)} type="submit">
                                            Approved
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(data)} type="submit">
                                            Cancel
                                        </Button>
                                    </Box>

                            }

                        </Paper>
                    </Box>
                ))
                : data.slice(0, 1).map((data) => (
                    <Box key={data.id}>
                        <Paper sx={{ p: 2, boxShadow: '1px 10px 30px #b6b7b7 !important', borderRadius: '13px !important', border: "2px solid #009EFA" }}>
                            <Typography variant="h5"
                                sx={{ fontWeight: '600', mb: 2 }}
                            >
                                {data.name}
                            </Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'var(--PT_font) !important', }}>{data.department}</Typography>
                        </Paper>
                    </Box>
                ))}
        </>
    );
};

export default OneLeaveRequest;
