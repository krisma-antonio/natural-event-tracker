import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navibar from './Navibar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Map from './Map';
import Loader from './Loader';

const SearchBar = () => {

    const [naturalEvent, setNaturalEvent] = useState("seaLakeIce");
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(false);

    useEffect(() => {
        console.log("1. NaturalEvent updated:", naturalEvent);
    }, [naturalEvent]);

    const handleSearchValue = (e) => {
        const event = e.target.getAttribute("id");
        setNaturalEvent(event);
        setClickedEvent(true);
    }

    const urlNasa = 'https://eonet.gsfc.nasa.gov/api/v3/events?&status=open&category=' + naturalEvent + '&api_key=' + import.meta.env.VITE_NASA_API_KEY;
  
    useEffect(() => {
      const fetchEvents = async () => {
        if(clickedEvent) {
            setLoading(true)
            const res = await fetch(urlNasa)
            const { events } = await res.json()
    
            setEventData(events)
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
                    <Dropdown.Item id="drought" onClick={handleSearchValue}>Droughts</Dropdown.Item>
                    <Dropdown.Item id="earthquakes" onClick={handleSearchValue}>Earthquakes</Dropdown.Item>
                    <Dropdown.Item id="dustHaze" onClick={handleSearchValue}>Dust and Haze</Dropdown.Item>
                    <Dropdown.Item id="floods" onClick={handleSearchValue}>Floods</Dropdown.Item>
                    <Dropdown.Item id="landslides" onClick={handleSearchValue}>Landslides</Dropdown.Item>
                    <Dropdown.Item id="manmade" onClick={handleSearchValue}>Manmade</Dropdown.Item>
                    <Dropdown.Item id="seaLakeIce" onClick={handleSearchValue}>Sea and Lake Ice</Dropdown.Item>
                    <Dropdown.Item id="severeStorms" onClick={handleSearchValue}>Severe Storms</Dropdown.Item>
                    <Dropdown.Item id="snow" onClick={handleSearchValue}>Snow</Dropdown.Item>
                    <Dropdown.Item id="tempExtremes" onClick={handleSearchValue}>Temperature Extremes</Dropdown.Item>
                    <Dropdown.Item id="volcanoes" onClick={handleSearchValue}>Volcanoes</Dropdown.Item>
                    <Dropdown.Item id="waterColor" onClick={handleSearchValue}>Water color</Dropdown.Item>
                    <Dropdown.Item id="wildfires" onClick={handleSearchValue}>Wildfires</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>     
        </Navibar>
        { !loading ? <Map eventData={eventData} /> : <Loader /> }
        </>
    );
}

export default SearchBar;