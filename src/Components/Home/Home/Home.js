import React from "react";

import Navbar from "../../Share/Navbar/Navbar";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import Teams from "../Teams/Teams";
import Footer from "../../Share/Footer/Footer";
import Contact from "../Contact/Contact";
import MainFeatures from "../MainFeatures/MainFeatures";

const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Features />
            <MainFeatures></MainFeatures>
            {/* <Teams /> */}
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
