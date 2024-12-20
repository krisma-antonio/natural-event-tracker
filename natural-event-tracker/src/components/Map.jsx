import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({eventData}) => {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  const NATURAL_EVENT = "severeStorms";

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });
  
  const markers = eventData.map((ev, index) => {
    if(ev.categories[0].id === NATURAL_EVENT) {
      console.log("Yes work");
      new mapboxgl.Marker()
            .setLngLat([ ev.geometry[0].coordinates[0], ev.geometry[0].coordinates[1] ])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                  `<h3>${ev.title}</h3><p>${ev.description}</p>`
                )
            )
            .addTo(mapRef.current);
    } else {
      return null;
    }
  })
  
  markers

    return () => {
      mapRef.current.remove()
 
    }

  }, [])

  return (
    <>
      <div id='map-container' ref={mapContainerRef}/>
    </>
  )
    
}

export default Map