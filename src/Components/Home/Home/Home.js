import React from "react";

import Navbar from "../../Share/Navbar/Navbar";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import Footer from "../../Share/Footer/Footer";
import Contact from "../Contact/Contact";
import MainFeatures from "../MainFeatures/MainFeatures";
import Swiper from "../Swiper/Swiper"


const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Features />
            <MainFeatures />
            {/* <Swiper/> */}
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
