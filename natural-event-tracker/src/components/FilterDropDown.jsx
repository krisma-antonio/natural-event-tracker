import {useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import RangeSlider from './RangeSlider';



const FilterDropDown = ({setRadius, locationEnable, clickedEvent}) => {
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (newValue) => {
        var output = document.getElementById("radius");
        output.innerHTML = newValue;
        setSliderValue(newValue);
    };
    const handleRadiusValue = () => {
        if(!locationEnable) {
            alert("You must enable geolocation first to use this feature.");
        } else if (!clickedEvent){
            alert("You must choose a natural event first to use this feature.");
        } else {
            console.log(sliderValue);
            setRadius(sliderValue);
        }
    }
    
    return(
        <>
        <div className="filter-box">

            <div className="section-1">
                <div className="filter-title"><h1>Proximity Radius</h1></div>
                <div className="filter-button">
                    <RangeSlider min={0} max={100} step={1} onChange={handleSliderChange}/>
                    <p>Radius: <span id="radius">0</span> km</p>
                    <Button variant='light' size="sm" id='radius-button' type='button' onClick={handleRadiusValue}> Set Radius </Button>
                </div>

            </div>

            <div className="section-1">
                <div className="filter-title"><h1>Past Events</h1></div>
            </div>
        </div>
        </>
    )
}

export default FilterDropDown;