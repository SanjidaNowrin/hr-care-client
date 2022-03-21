import { Container } from '@mui/material';
import React from 'react';
import Navbar from '../Navbar/Navbar';

const Nopage = () => {
    // No page found component 
    return (
        <>
            <Navbar></Navbar>
            <Container sx={{ width: '100%', textAlign: 'center', my: "5" }}>
                <img src="https://i.ibb.co/qY8P27x/404.png" alt="404page" />
                <br /> <br />
            </Container>
        </>
    );
};
export default Nopage;