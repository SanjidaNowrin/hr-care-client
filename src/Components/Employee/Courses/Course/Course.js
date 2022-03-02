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
import { Box } from "@mui/system";

const Course = ({ item }) => {
    const { name, des, author, authorImg, courseImg, topic, date } = item;
    return (
        <>
            <Grid item xs={12} md={4}>
                <Card elevation={10}>
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
