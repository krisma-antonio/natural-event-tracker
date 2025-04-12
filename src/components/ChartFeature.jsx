import {useEffect, useState } from 'react'
import { FaChartBar } from "react-icons/fa";
import DisplayChart from './DisplayChart';
import { Link } from 'react-router-dom';


const ChartFeature = () => {
    const [chartButtonOpen, setChartButtonOpen] = useState(false);

    const handleChartButton = () => {
        setChartButtonOpen(!chartButtonOpen);
    }

    return (
        <>
        <a to="/DisplayChart.jsx" target="_blank" rel="noopener noreferrer" className={chartButtonOpen ? "chart-button-disable" : ""}>
            <FaChartBar id="chartButton" onClick={handleChartButton} className="chart-button"/>   
        </a>

        </>
    )

}

export default ChartFeature;