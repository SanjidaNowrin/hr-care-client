import React from "react";

import Navbar from "../../Share/Navbar/Navbar";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import Teams from "../Teams/Teams";

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <Banner></Banner>
            <Features></Features>
            <Teams></Teams>
        </>
    );
};

export default Home;
