import { useEffect, useState } from 'react';
import Map from './components/Map';

function App() {
  const [eventData, setEventData] = useState([])
  const urlNasa = 'https://eonet.gsfc.nasa.gov/api/v3/events?limit=10&status=open&api_key=' + import.meta.env.VITE_NASA_API_KEY;

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(urlNasa)
      const { events } = await res.json()

      setEventData(events)
    }

    fetchEvents()
  }, [])

  console.log(eventData);

  return (
    <Map eventData={eventData}/>
  )
}

export default App
