import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({eventData}) => {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  const NATURAL_EVENT = "wildfires";

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite"
    });

  // FIX: if clicked event is true, change icon
  const markers = eventData.map((ev) => {
      console.log("Map works!");
      new mapboxgl.Marker()
            .setLngLat([ ev.geometry[0].coordinates[0], ev.geometry[0].coordinates[1] ])
            .setPopup(
              new mapboxgl.Popup({ offset: 25, className: "pop-up", closeOnClick: true, closeButton: false }) // add popups
                .setHTML(
                  `<h3>${ev.title}</h3><p>Description: ${ev.description}</p><p>Date started: ${ev.geometry[0].date}</p>`
                )
            )
            .addTo(mapRef.current);
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