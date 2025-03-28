import {useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Navibar from './Navibar';
import FilterDropDown from './FilterDropDown';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFilterCircleFill } from "react-icons/bs";
import { FaChartBar } from "react-icons/fa";
import Map from './Map';
import Loader from './Loader';
import DisplayChart from './DisplayChart';

const SearchBar = () => {

    const [naturalEvent, setNaturalEvent] = useState("seaLakeIce");
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(false);
    const [chartButtonOpen, setChartButtonOpen] = useState(false);
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

    // updates the clicked natural event  
    useEffect(() => {
        console.log("1. NaturalEvent updated:", naturalEvent);
    }, [naturalEvent]);

    // sets clicked natural event
    const handleSearchValue = (e) => {
        const event = e.target.getAttribute("id");
        setNaturalEvent(event);
        setClickedEvent(true);
    }

    const handleChartButton = () => {
        console.log("Chart button pressed!");
        setChartButtonOpen(!chartButtonOpen);
    }

    // Natural event API URLS
    const urlNasa = 'https://eonet.gsfc.nasa.gov/api/v3/events?limit=' + numOfEvents + '&category=' + naturalEvent + '&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const earthquakeURL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + getDate() + '&limit=' + numOfEvents;
    const urlPastEventsNasa = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&limit=' + numOfEvents + '&category=' + naturalEvent + '&api_key=' + import.meta.env.VITE_NASA_API_KEY;

    // Fetching APIs
    useEffect(() => {
      const fetchEvents = async () => {
        if(clickedEvent) {
            setLoading(true)

            if(enablePastEvents && naturalEvent != "earthquakes") {
                const res = await fetch(urlPastEventsNasa)
                const { events } = await res.json()
                setEventData(events)
            } else {
                if(naturalEvent != "earthquakes") {
                    const res = await fetch(urlNasa)
                    const { events } = await res.json()
                    setEventData(events)
                } else {
                    const res = await fetch(earthquakeURL)
                    const { features } = await res.json()
                    setEventData(features)
                }
            }
           
            setLoading(false)
        } 
      }
  
      fetchEvents()
    }, [naturalEvent, clickedEvent, numOfEvents, enablePastEvents])
  
    console.log(eventData);
    
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
            <FaChartBar onClick={handleChartButton} className='chart-button'/> 
            {chartButtonOpen ? <DisplayChart chartButtonOpen={chartButtonOpen}/>: null}
                
        </Navibar> 
        <FilterDropDown setRadius={setRadius} locationEnable={locationEnable} clickedEvent={clickedEvent} setNumOfEvents={setNumOfEvents} setEnablePastEvents={setEnablePastEvents}/>
        { !loading ? <Map eventData={eventData} naturalEvent={naturalEvent} clickedEvent={clickedEvent} date={getDate()} radius={radius} setLocationEnable={setLocationEnable} numOfEvents={numOfEvents}/> : <Loader /> }
        </>
    );
}

export default SearchBar;