import React from "react";
import Navbar from "../../Share/Navbar/Navbar";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import Teams from "../Teams/Teams";
import Footer from "../../Share/Footer/Footer";

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <Banner></Banner>
            <Features></Features>
            <Teams></Teams>
            <Footer></Footer>
        </>
    );
};

export default Home;
