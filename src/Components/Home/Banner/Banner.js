import React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import Item from "../Item/Item";

const Banner = () => {

    var items = [
        {
            name: " HR Care",
            title: "Human Resource Management Admin Template",
            description: "HR Software is system for company to maintain a database of theiremployers performance. Using this software, a company can manage their employer details, attendance, Leave, holidays, Salary, etc.",
            img: "https://i.ibb.co/1q179X9/output-onlinepngtools-1.png"
        },
        {
            name: "Our Design",
            title: "Our Goal Is Employee Satisfication",
            description: "HR Software is system for company to maintain a database of theiremployers performance. Using this software, a company can manage their employer details, attendance, Leave, holidays, Salary, etc.",
            img: "https://i.ibb.co/XjzvjsN/output-onlinepngtools-2.png"
        },
        {
            name: "Dashboard System",
            title: "Our Main Focuse Is Dashboard",
            description: "HR Software is system for company to maintain a database of theiremployers performance. Using this software, a company can manage their employer details, attendance, Leave, holidays, Salary, etc.",
            img: "https://i.ibb.co/52VcGBf/banner.png"
        },

    ]


    return (

        <Box sx={{ mb: "2 !important" }}>
            <Carousel>
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </Box>
    );
};

export default Banner;