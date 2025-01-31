import {useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Navibar from './Navibar';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFilterCircleFill } from "react-icons/bs";
import Map from './Map';
import Loader from './Loader';

const SearchBar = () => {

    const [naturalEvent, setNaturalEvent] = useState("seaLakeIce");
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(false);

    // get current date
    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month}-${date}`;
      }

    useEffect(() => {
        console.log("1. NaturalEvent updated:", naturalEvent);
    }, [naturalEvent]);

    const handleSearchValue = (e) => {
        const event = e.target.getAttribute("id");
        setNaturalEvent(event);
        setClickedEvent(true);
    }

    const urlNasa = 'https://eonet.gsfc.nasa.gov/api/v3/events?limit=500&category=' + naturalEvent + '&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const earthquakeURL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + getDate();

    useEffect(() => {
      const fetchEvents = async () => {
        if(clickedEvent) {
            setLoading(true)

            if(naturalEvent != "earthquakes") {
                const res = await fetch(urlNasa)
                const { events } = await res.json()
                setEventData(events)
            } else {
                const res = await fetch(earthquakeURL)
                const { features } = await res.json()
                setEventData(features)
            }
           
            setLoading(false)
        } 
      }
  
      fetchEvents()
    }, [naturalEvent, clickedEvent])
  
    console.log(eventData);
    
    return (
        <>
        <Navibar>
            <Dropdown className="top">
                <Dropdown.Toggle variant="dark" id="dropdown-basic" size="lg">
                    Natural Events
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item id="earthquakes" onClick={handleSearchValue}>Earthquakes</Dropdown.Item>
                    <Dropdown.Item id="drought" onClick={handleSearchValue}>Droughts</Dropdown.Item>
                    <Dropdown.Item id="floods" onClick={handleSearchValue}>Floods</Dropdown.Item>
                    <Dropdown.Item id="dustHaze" onClick={handleSearchValue}>Dust and Haze</Dropdown.Item>
                    <Dropdown.Item id="landslides" onClick={handleSearchValue}>Landslides</Dropdown.Item>
                    <Dropdown.Item id="snow" onClick={handleSearchValue}>Snow</Dropdown.Item>
                    <Dropdown.Item id="tempExtremes" onClick={handleSearchValue}>Temperature Extremes</Dropdown.Item>
                    <Dropdown.Item id="severeStorms" onClick={handleSearchValue}>Severe Storms</Dropdown.Item>
                    <Dropdown.Item id="volcanoes" onClick={handleSearchValue}>Volcanoes</Dropdown.Item>
                    <Dropdown.Item id="seaLakeIce" onClick={handleSearchValue}>Sea and Lake Ice</Dropdown.Item>
                    <Dropdown.Item id="wildfires" onClick={handleSearchValue}>Wildfires</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>     
        </Navibar>
        { !loading ? <Map eventData={eventData} naturalEvent={naturalEvent} clickedEvent={clickedEvent} date={getDate()}/> : <Loader /> }
        </>
    );
}

export default SearchBar;