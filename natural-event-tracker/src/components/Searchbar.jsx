import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Map from './Map';
import Burger from './Burger';

// FIX: Add parameters, with set
const SearchBar = ({activeMenu, setActiveMenu}) => {

    const [naturalEvent, setNaturalEvent] = useState("");
    const [eventData, setEventData] = useState([])

    useEffect(() => {
        console.log("1.NaturalEvent updated:", naturalEvent);
    }, [naturalEvent]);

    // FIX: set clicked event to true
    const handleSearchValue = (e) => {
        const event = e.target.getAttribute("id");
        setNaturalEvent(event);
    }

    console.log("NE:", naturalEvent);
    // FIX: url changing but eventData not changing, only get main url
    const urlNasa = 'https://eonet.gsfc.nasa.gov/api/v3/events?&status=open&category=' + naturalEvent + '&api_key=' + import.meta.env.VITE_NASA_API_KEY;
  
    // FIX: add loading data and natural event(not getting only clicked natural event), also shouldn't do any rendering at first
    useEffect(() => {
      const fetchEvents = async () => {
        const res = await fetch(urlNasa)
        const { events } = await res.json()
  
        setEventData(events)
      }
  
      fetchEvents()
    }, [naturalEvent])
  
    console.log(eventData);

    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Burger activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
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
            </Container>
        </Navbar>
        <Map eventData={eventData}/>
        </>
    );
}

export default SearchBar;