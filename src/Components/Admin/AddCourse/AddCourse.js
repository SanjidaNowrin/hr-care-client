import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddCourse = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post("http://localhost:5000/courses", data);
        alert("Course added successfully");
        reset();
    };
    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5, mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: '700', color: '#01578A' }}>Add New Course </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 2 }}>
                    <label style={{ display: 'block' }} htmlFor="title">Course Title <span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        sx={{ width: '100%' }}
                        placeholder="Enter your course title"
                        variant="outlined"
                        id="title"
                        type="text"
                        {...register("name", { required: true })}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <label style={{ display: 'block' }} htmlFor="des">Description <span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        sx={{ width: '100%' }}
                        placeholder="Write Description"
                        variant="outlined"
                        rows={4}
                        multiline
                        id="des"
                        type="text"
                        {...register("des", { required: true })}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <label style={{ display: 'block' }} htmlFor="cImg">Course Image Link <span style={{ color: 'red' }} >*</span></label>
                    <TextField
                        sx={{ width: '100%' }}
                        placeholder="Course Related Image Link"
                        variant="outlined"
                        id="cImg"
                        type="text"
                        {...register("courseImg", { required: true })}
                    />
                </Box>

                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <label style={{ display: 'block' }} htmlFor="topic">Topic <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            sx={{ width: '100%' }}
                            placeholder="Course Topic"
                            variant="outlined"
                            id="topic"
                            type="text"
                            {...register("topic", { required: true })}
                        />
                    </Box>
                    <Box sx={{ width: '100%', ml: 1 }}>
                        <label style={{ display: 'block' }} htmlFor="rating">Rating <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            sx={{ width: '100%' }}
                            placeholder="Rate Your Course"
                            variant="outlined"
                            id="rating"
                            type="number"
                            {...register("rating", { required: true })}
                        />
                    </Box>
                </Box>

                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <label style={{ display: 'block' }} htmlFor="aName">Author Name <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            sx={{ width: '100%' }}
                            placeholder="Enter Author Name"
                            variant="outlined"
                            id="aName"
                            type="text"
                            {...register("author", { required: true })}
                        />
                    </Box>
                    <Box sx={{ width: '100%', mx: 1 }}>
                        <label style={{ display: 'block' }} htmlFor="price">Price <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            sx={{ width: '100%' }}
                            placeholder="Enter Price"
                            variant="outlined"
                            id="price"
                            type="number"
                            {...register("price", { required: true })}
                        />
                    </Box>
                    <Box sx={{ width: '100%', ml: 1 }}>
                        <label style={{ display: 'block' }} htmlFor="date">Pubish Date <span style={{ color: 'red' }} >*</span></label>
                        <TextField
                            sx={{ width: '100%' }}
                            variant="outlined"
                            id="date"
                            type="date"
                            {...register("date", { required: true })}
                        />
                    </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <label style={{ display: 'block' }} htmlFor="aImg">Author Image Link <span style={{ color: 'red' }} >*</span></label>
                    <TextField
                        sx={{ width: '100%' }}
                        placeholder="Enter Author Image Link"
                        variant="outlined"
                        id="aImg"
                        type="text"
                        {...register("authorImg", { required: true })}
                    />
                </Box>

                <Box sx={{ textAlign: 'center', mt: 3, mb: 6 }}>
                    <Button sx={{ background: '#00D2FC !important', color: '#fff !important', width: '100%' }} className="btn_regular" type="submit">
                        Add New Course
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default AddCourse;