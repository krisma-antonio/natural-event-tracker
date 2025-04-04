import {useEffect, useState } from 'react'
import { FaChartBar } from "react-icons/fa";
import DisplayChart from './DisplayChart';


const ChartFeature = () => {
    const [chartButtonOpen, setChartButtonOpen] = useState(false);

    const handleChartButton = () => {
        console.log("Chart button pressed!");
        setChartButtonOpen(!chartButtonOpen);
    }
    return (
        <>
        <FaChartBar id="chartButton" onClick={handleChartButton} className={'chart-button'}/> 
        {chartButtonOpen ? <DisplayChart chartButtonOpen={chartButtonOpen}/>: null}
        </>
    )

}

export default ChartFeature;