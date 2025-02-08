import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';

const Map = ({eventData, naturalEvent, clickedEvent, date}) => {

  const mapRef = useRef()
  const mapContainerRef = useRef()

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

  mapRef.current.on('load', function(){
    let _center = [-75.343, 39.984];
    let _radius = 20;
    let _options = {
      steps: 80,
      units: 'kilometers' // or "mile"
    };

    let _circle = turf.circle(_center, _radius, _options);

    mapRef.current.addSource("circleData", {
          type: "geojson",
          data: _circle,
        });

    mapRef.current.addLayer({
          id: "circle-fill",
          type: "fill",
          source: "circleData",
          paint: {
            "fill-color": "red",
            "fill-opacity": 0.5,
          },
        });
  });
   // mapRef.current.flyTo({center: [-75.343, 39.984], speed:0.9, curve:1, zoom: 7});

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

}, [eventData])

return (
  <>
    <div id='map-container' ref={mapContainerRef}/>
  </>
)
    
}

export default Map