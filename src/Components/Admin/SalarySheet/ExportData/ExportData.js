import React from 'react';

const ExportData = (props) => {
    const { Gross } = props.employee;
    const basic = ((Gross - 1850) / 1.5).toFixed(0);
    const payment = ((Gross / 30) * props.date.length).toFixed(0);
    return (
        basic,
        payment
    );
};

export default ExportData;