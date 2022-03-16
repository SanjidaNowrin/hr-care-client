import React from "react";
import Navbar from "../../Share/Navbar/Navbar";
import HeroVideo from "../HeroVideo/HeroVideo";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import Footer from "../../Share/Footer/Footer";
import Contact from "../Contact/Contact";
import MainFeatures from "../MainFeatures/MainFeatures";
import useAuth from "../../../hooks/useAuth"

const Home = () => {
    const { isAdmin } = useAuth()
    console.log(isAdmin)
    return (
        <>
            <Navbar />
            <Banner />
            <Features />
            <MainFeatures />
            <HeroVideo />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
