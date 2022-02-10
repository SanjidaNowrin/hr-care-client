import React from 'react';
import { Container } from 'react-bootstrap';

const Nopage = () => {
    // No page found component 
    return (
        <Container style={{ 'width': '70%', 'textAlign': 'center' }} className='my-5 px-5'>
            <img src="https://i.ibb.co/kSrFgbr/404.jpg" alt="" />
            <br /> <br />
        </Container>
    );
};
export default Nopage;