import {useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import RangeSlider from './RangeSlider';
import Alert from 'react-bootstrap/Alert';

const FilterDropDown = ({setRadius, locationEnable, clickedEvent, setNumOfEvents, setEnablePastEvents}) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [limit, setLimit] = useState(50);
    const [showGeolocationAlert, setShowGeolocationAlert] = useState(false);
    const [showChooseFirstAlert, setShowChooseFirstAlert] = useState(false);

    const handleSliderChange = (newValue) => {
        var output = document.getElementById("radius");
        output.innerHTML = newValue;
        setSliderValue(newValue);
    };

    const handleRadiusValue = () => {
        if(!locationEnable) {
            setShowGeolocationAlert(true);
        } else if (!clickedEvent){
            setShowChooseFirstAlert(true);
        } else {
            setRadius(sliderValue);
        }
    }

    const enablePastEvents = () => {
        var checkBox = document.getElementById("myCheck");

        if (checkBox.checked == true){
            setEnablePastEvents(true);
        } else {
            setEnablePastEvents(false); 
        }

    }

    const numOfEvents = (newValue) => {
        var output = document.getElementById("numOfEvents");
        output.innerHTML = newValue;
        setLimit(newValue);
    }

    const numOfEventsValue = () => {
        setNumOfEvents(limit);
    }
    
    return(
        <>
        <div className="filter-box">

            <div className="section-1">
                <div className="filter-title"><h1>Proximity Radius</h1></div>
                <div className="filter-button">
                    <RangeSlider min={0} max={200} step={1} onChange={handleSliderChange}/>
                    <p>Radius: <span id="radius">0</span> km</p>
                    <Button variant='secondary' size="sm" type='button' onClick={handleRadiusValue}> Set Radius </Button>
                </div>

            </div>

            <div className="section-1">
                <div className="filter-title"><h1>Past Events</h1></div>
                <form className="filter-checkbox">
                    <input type="checkbox" id="myCheck" onClick={enablePastEvents}/> 
                    <label> Show Past Events</label>
                </form>
            </div>

            <div className="section-1">
                <div className="filter-title"><h1>Limit Events</h1></div>
                <div className="filter-button">
                    <RangeSlider min={1} max={300} step={1} onChange={numOfEvents}/>
                    <p>Limit: <span id="numOfEvents">50</span> events</p>
                    <Button variant='secondary' size="sm" type='button' onClick={numOfEventsValue}> Limit </Button>
                </div>
            </div>    
        </div>

        {showGeolocationAlert ?
            <Alert variant="warning" 
                style={{position:'absolute', display:'flex', justifyContent:'center', flexDirection:'column',
                zIndex:400, top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                textAlign: 'center',
                width:'350px',
                height:'210px'}}>
                <Alert.Heading>Unable to use Proximity Radius Filter</Alert.Heading>
                <hr />
                <p>You must enable geolocation first to use this feature.</p>
                <div className="d-flex justify-content-end">
                <Button onClick={() => setShowGeolocationAlert(false)} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>  : null}

            {showChooseFirstAlert ?
            <Alert variant="warning" 
                style={{position:'absolute', display:'flex', justifyContent:'center', flexDirection:'column',
                zIndex:400, top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                textAlign: 'center',
                width:'350px',
                height:'210px'}}>
                <Alert.Heading>Unable to use Proximity Radius Filter</Alert.Heading>
                <hr />
                <p>You must choose a natural event first to use this feature.</p>
                <div className="d-flex justify-content-end">
                <Button onClick={() => setShowChooseFirstAlert(false)} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>  : null}
        </>
    )
}

export default FilterDropDown;