import {useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Navibar from './Navibar';
import FilterDropDown from './FilterDropDown';
import Dropdown from 'react-bootstrap/Dropdown';
import Map from './Map';
import Loader from './Loader';
import ChartFeature from './ChartFeature';

const SearchBar = () => {

    const [naturalEvent, setNaturalEvent] = useState("seaLakeIce");
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(false);
    const [radius, setRadius] = useState(0);
    const [locationEnable, setLocationEnable] = useState(false);
    const [enablePastEvents, setEnablePastEvents] = useState(false);
    const [numOfEvents, setNumOfEvents] = useState(50);

    // get current date
    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month}-${date}`;
      }

    // sets clicked natural event
    const handleSearchValue = (e) => {
        const event = e.target.getAttribute("id");

        const isValid = /^[a-zA-Z]+$/.test(event);

        if(isValid) {
            setNaturalEvent(event);
            setClickedEvent(true);
        }
    }

    // Natural event API URL for earthquake
    const earthquakeURL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + getDate() + '&limit=' + numOfEvents;

    // Fetching APIs
    useEffect(() => {
      const fetchEvents = async () => {
        if(clickedEvent) {
            setLoading(true)
            try {
                if(enablePastEvents && naturalEvent != "earthquakes") {
                    const res = await fetch('https://naturaleventtrackerapi.onrender.com/apipastevents?naturalEvent=' + naturalEvent + '&numOfEvents=' + numOfEvents)
                    const { events } = await res.json()
                    setEventData(events)
                } else {
                    if(naturalEvent != "earthquakes") {
                        const res = await fetch( 'https://naturaleventtrackerapi.onrender.com/apinasa?naturalEvent=' + naturalEvent + '&numOfEvents=' + numOfEvents)
                        const { events } = await res.json()
                        setEventData(events)
                    } else {
                        const res = await fetch(earthquakeURL)
                        const { features } = await res.json()
                        setEventData(features)
                    } 
                }  
            } catch(error) {
                throw error;
            }

            setLoading(false)
        } 
      }
  
      fetchEvents()
    }, [naturalEvent, clickedEvent, numOfEvents, enablePastEvents])
      
    // DROPDOWN and MAP
    return (
        <>
        <Navibar>
            <div className='center'>
                <div className='row'>
                    <Dropdown className="top" data-bs-theme="dark" >
                        <Dropdown.Toggle id="dropdown-basic" size="lg" variant="secondary">
                            Natural Events
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item id="earthquakes" onClick={handleSearchValue}>Earthquakes</Dropdown.Item>
                            <Dropdown.Item id="severeStorms" onClick={handleSearchValue}>Severe Storms</Dropdown.Item>
                            <Dropdown.Item id="volcanoes" onClick={handleSearchValue}>Volcanoes</Dropdown.Item>
                            <Dropdown.Item id="seaLakeIce" onClick={handleSearchValue}>Sea and Lake Ice</Dropdown.Item>
                            <Dropdown.Item id="wildfires" onClick={handleSearchValue}>Wildfires</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item id="drought" onClick={handleSearchValue}>Droughts</Dropdown.Item>
                            <Dropdown.Item id="floods" onClick={handleSearchValue}>Floods</Dropdown.Item>
                            <Dropdown.Item id="dustHaze" onClick={handleSearchValue}>Dust and Haze</Dropdown.Item>
                            <Dropdown.Item id="landslides" onClick={handleSearchValue}>Landslides</Dropdown.Item>
                            <Dropdown.Item id="snow" onClick={handleSearchValue}>Snow</Dropdown.Item>
                            <Dropdown.Item id="tempExtremes" onClick={handleSearchValue}>Temperature Extremes</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> 
                </div>
                
            </div>  
            <ChartFeature/>
                
        </Navibar> 
        <FilterDropDown setRadius={setRadius} locationEnable={locationEnable} clickedEvent={clickedEvent} setNumOfEvents={setNumOfEvents} setEnablePastEvents={setEnablePastEvents}/>
        { !loading ? <Map eventData={eventData} naturalEvent={naturalEvent} clickedEvent={clickedEvent} date={getDate()} radius={radius} setLocationEnable={setLocationEnable} numOfEvents={numOfEvents}/> : <Loader /> }
        </>
    );
}

export default SearchBar;