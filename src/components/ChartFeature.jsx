import {useEffect, useState } from 'react'
import { FaChartBar } from "react-icons/fa";
import DisplayChart from './DisplayChart';
import { Link } from 'react-router-dom';


const ChartFeature = () => {

    return (
        <>
        <Link to={"/chart"} rel="noopener noreferrer" onClick={() => window.location.reload()}>
            <FaChartBar id="chartButton" className="chart-button"/>   
        </Link>

        </>
    )

}

export default ChartFeature;