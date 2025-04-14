import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import DrawCircle from './DrawCircle';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from "axios";

import AlertEvent from './AlertEvent';

const Map = ({eventData, naturalEvent, clickedEvent, date, radius, setLocationEnable}) => {

  const mapRef = useRef()
  const mapContainerRef = useRef()
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  // Initialize mapbox
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite"
    });


  // Set pop-up alert if no data available  
  if(eventData.length == 0 && clickedEvent) {
    setShowAlert(true);
  }

  // Get user location
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: false,
    showUserHeading: true
  });

  mapRef.current.addControl(geolocate, 'top-right');
  

  function success(pos) {
    const crd = pos.coords;
    setLat(crd.latitude);
    setLong(crd.longitude);
    setLocationEnable(true);
  }

  navigator.geolocation.getCurrentPosition(success);

  // Call DrawCircle after the map is loaded
  mapRef.current.on("load", () => {
    DrawCircle(mapRef, radius, lat, long); 
    if(radius > 0) {
      mapRef.current.flyTo({center: [long, lat], speed:0.9, curve:1, zoom: 7});
    }
  });

   // If clicked event is true, change icon
   let icon;
   
   switch(naturalEvent) {
     case "earthquakes":
       icon = "earthquake";
       break;
     case "severeStorms":
       icon = "storm";
       break;
     case "volcanoes":
       icon = "volcano";
       break;
     case "seaLakeIce":
       icon = "ice";
       break;
     case "wildfires":
       icon = "fire";
       break;
     case "drought":
       icon = "drought";
       break;
     case "floods":
       icon = "flood";
       break;
     case "dustHaze":
       icon = "dustHaze";
       break;
     case "landslides":
       icon = "landslides";
       break;
     case "snow":
       icon = "snow";
       break;
     case "tempExtremes":
       icon = "tempExtremes";
       break;
     default:
      icon = "";
      break;  
   }

  const markers = eventData.map((ev) => {
      let i = 0;
      let j = 0;
      
      const el = document.createElement('div');
      el.className = icon;

      if(naturalEvent != "earthquakes") {          
        const el = document.createElement('div');
        el.className = icon;
        let desc = "";

        if(ev.description != null) {
          desc = ev.description;
        }

        // Markers for volcanoes, severe storms, wildfires, and sea and lake ice from NASA EONET API
        if(ev.geometry[0].type == "Point") {
          new mapboxgl.Marker(el)
                .setLngLat([ ev.geometry[0].coordinates[0], ev.geometry[0].coordinates[1] ])
                .setPopup(
                  new mapboxgl.Popup({ offset: 25, className: "pop-up", closeOnClick: true, closeButton: false }) // add popups
                    .setHTML(
                      `<h3>${ev.title}</h3>
                        <div>
                          <p>${desc}</p>
                          <p>Date started: ${(ev.geometry[i].date).substring(0,10)}</p>
                        </div>
                        <a href="https://www.google.com/search?q=${ev.title}"  rel="noreferrer noopener" target=_blank>
                          <button>Learn More about ${ev.title}</button>
                        </a>`
                    )
                )
                .addTo(mapRef.current);
          } else if (ev.geometry[0].type == "Polygon") {
            while(i < ev.geometry.length) {
              while(j < ev.geometry[i].coordinates[0].length) {

                const el = document.createElement('div');
                el.className = icon;
                let desc = "";

                if(ev.description != null) {
                  desc = ev.description;
                } 

                new mapboxgl.Marker(el)
                .setLngLat([ ev.geometry[i].coordinates[0][j][0], ev.geometry[i].coordinates[0][j][1] ])
                .setPopup(
                  new mapboxgl.Popup({ offset: 25, className: "pop-up", closeOnClick: true, closeButton: false }) // add popups
                    .setHTML(
                      `<h3>${ev.title}</h3>
                        <div>
                          <p>${desc}</p>
                          <p>Date started: ${(ev.geometry[i].date).substring(0,10)}</p>
                        </div>
                        <a href="https://www.google.com/search?q=${ev.title}" rel="noreferrer noopener" target=_blank>
                          <button>Learn More about ${ev.title}</button>
                        </a>`
                    )
                )
                .addTo(mapRef.current);
                j+=1;

              }
            } 
          i+=1;
        }
      } else {
        // Markers for earthquakes from USGS
        new mapboxgl.Marker(el)
        .setLngLat([ ev.geometry.coordinates[0], ev.geometry.coordinates[1] ])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, className: "pop-up", closeOnClick: true, closeButton: false }) // add popups
            .setHTML(
              `<h3>${ev.properties.title}</h3>
                <div>
                  <p>Location: ${ev.properties.place}</p>
                  <p>Magnitude: ${ev.properties.mag}</p>
                  <p>Date started: ${date}</p>
                </div>
                <a href="https://www.google.com/search?q=${ev.properties.title}" rel="noreferrer noopener" target=_blank>
                  <button>Learn More about ${ev.properties.title}</button>
                </a>`
            )
        )
        .addTo(mapRef.current);
      }
     
  })
  
  return () => {
    mapRef.current.remove()

  }

}, [eventData, radius, setLocationEnable, lat])

return (
  <>
  {showAlert ? 
    <Alert variant="warning" 
        style={{position:'absolute', display:'flex', justifyContent:'center', flexDirection:'column',
          zIndex:300, top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          textAlign: 'center',
          width:'350px',
          height:'210px'}}>
        <Alert.Heading>No current event for {naturalEvent}</Alert.Heading>
        <hr />
        <p>Suggestion: use Past Events filter to show past data for this natural event</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            Close
          </Button>
        </div>
    </Alert> : null}
    <div id='map-container' ref={mapContainerRef} style={{ height: '90.17%' }}/>
  </>
)
    
}

export default Map