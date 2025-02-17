import {useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import RangeSlider from './RangeSlider';



const FilterDropDown = ({setRadius}) => {
    const [sliderValue, setSliderValue] = useState(0);

    console.log("Filter!");

    
    const enableLocation = () => {

    }

    const handleSliderChange = (newValue) => {
        var output = document.getElementById("radius");
        output.innerHTML = newValue;
        setSliderValue(newValue);
    };
    const handleRadiusValue = () => {
        console.log(sliderValue);
        setRadius(sliderValue);
    }

    return(
        <>
        <div className="filter-box">

            <div className="section-1">
                <h1>Proximity Radius</h1>
                <div className="filter-button">
                    <Button variant='light' onClick={enableLocation}> Enable Location </Button>
                </div>

                <div className="filter-button">
                    <RangeSlider min={0} max={100} step={1} onChange={handleSliderChange}/>
                    <p>Radius: <span id="radius">0</span> km</p>
                    <Button variant='light' size="sm" onClick={handleRadiusValue}> Set Radius </Button>
                </div>

            </div>

            <div className="section-1">
                <h1>Past Events</h1>
            </div>
        </div>
        </>
    )
}

export default FilterDropDown;