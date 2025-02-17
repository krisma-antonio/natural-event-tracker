import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import DrawCircle from './DrawCircle';

const Map = ({eventData, naturalEvent, clickedEvent, date, radius}) => {

  const mapRef = useRef()
  const mapContainerRef = useRef()
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  // Initialize mapbox
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite"
    });

  // Set pop-up alert if no data available  
  if(eventData.length == 0 && clickedEvent) {
    console.log("No current event for " + naturalEvent);
    alert("No current event for " + naturalEvent);
  }

  // Get user location
  mapRef.current.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false,
      showUserHeading: true
    }), 'top-right'
  );

  function success(pos) {
    const crd = pos.coords;
    setLat(crd.latitude);
    setLong(crd.longitude);
    
    console.log("Your current position is:");
    console.log(`Latitude : ${lat}`);
    console.log(`Longitude: ${long}`);
    console.log(`More or less ${crd.accuracy} meters.`);

  }

  navigator.geolocation.getCurrentPosition(success);

  // Call DrawCircle after the map is loaded
  mapRef.current.on("load", () => {
    DrawCircle(mapRef, radius, lat, long); 
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
     default:
      icon = "";
      break;  
   }

  const markers = eventData.map((ev) => {
      console.log("Map works!");

      let i = 0;
      
      const el = document.createElement('div');
      el.className = icon;

      if(naturalEvent != "earthquakes") {
        while(i < ev.geometry.length) {
          const el = document.createElement('div');
          el.className = icon;
          // Markers for volcanoes, severe storms, wildfires, and sea and lake ice from NASA EONET API
          new mapboxgl.Marker(el)
                .setLngLat([ ev.geometry[i].coordinates[0], ev.geometry[0].coordinates[1] ])
                .setPopup(
                  new mapboxgl.Popup({ offset: 25, className: "pop-up", closeOnClick: true, closeButton: false }) // add popups
                    .setHTML(
                      `<h3>${ev.title}</h3>
                        <p>Description: ${ev.description}</p>
                        <p>Date started: ${ev.geometry[i].date}</p>
                        <a href="https://www.google.com/search?q=${ev.title}" target=_blank>
                          <button>Learn More about ${ev.title}</button>
                        </a>`
                    )
                )
                .addTo(mapRef.current);
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
                <p>Location: ${ev.properties.place}</p>
                <p>Magnitude: ${ev.properties.mag}</p>
                <p>Date started: ${date}</p>
                <a href="https://www.google.com/search?q=${ev.properties.title}" target=_blank>
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

}, [eventData, radius])


return (
  <>
    <div id='map-container' ref={mapContainerRef} style={{ height: '100%' }}/>
  </>
)
    
}

export default Map