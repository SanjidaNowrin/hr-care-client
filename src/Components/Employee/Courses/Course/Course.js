import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import axios from "axios";

const Course = ({ item }) => {
    const { _id, name, des, author, authorImg, courseImg, topic, date } = item;

    const useStyle = makeStyles({
        courseCard: {
            position: 'relative',
            "&:hover": {
                "& $deleteBox": {
                    transform: 'scale(1)'
                }
            },
        },
        deleteBox: {
            position: 'absolute',
            background: '#fff',
            top: '48%',
            right: '8px',
            height: '40px',
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            boxShadow: '1px 10px 30px #b6b7b7 !important',
            transition: 'all .3s ease-in-out',
            transform: 'scale(0)',
            cursor: 'pointer'
        }
    })
    const { courseCard, deleteBox } = useStyle();

    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`https://ancient-thicket-61342.herokuapp.com/courses/${id}`);
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Course added successfully",
            showConfirmButton: false,
            timer: 2000,
        });
    }
    return (
        <>
            <Grid item xs={12} md={4}>
                <Card className={courseCard} elevation={10}>
                    <Box onClick={() => handleDelete(_id)} className={deleteBox}>
                        <DeleteOutlineIcon sx={{ color: '#fb3e6a' }} />
                    </Box>
                    <CardMedia component="img" image={courseImg} alt={name} />
                    <Box
                        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, mt: 1, marginBottom: "-10px" }}
                    >
                        <Typography sx={{ textTransform: "uppercase" }} variant="body1" color="text.secondary">
                            {topic}
                        </Typography>

                    </Box>

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {des.slice(0, 130)}
                        </Typography>
                    </CardContent>

                    <CardHeader
                        avatar={<Avatar alt="Remy Sharp" src={authorImg} />}
                        action={
                            <Button className="btn_regular" aria-label="settings">
                                Enroll
                            </Button>
                        }
                        title={author}
                        subheader={date}
                    />
                </Card>
            </Grid>
        </>
    );
};

export default Course;
