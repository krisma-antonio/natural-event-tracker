import { useRef, useEffect, useState } from 'react'
import BarLoader from './BarLoader';

const ChartData = ({numbers, setNumbers}) => {
    // get current date
    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month}-${date}`;
    }

    const [earthquakeData, setEarthquakeData] = useState([]);
    const [stormData, setStormData] = useState([]);
    const [volcanoData, setVolcanoData] = useState([]);
    const [iceData, setIceData] = useState([]);
    const [wildfireData, setWildfireData] = useState([]);
    const [droughtData, setDroughtData] = useState([]);
    const [floodData, setFloodData] = useState([]);
    const [dustHazeData, setDustHazeData] = useState([]);
    const [landslideData, setLandslideData] = useState([]);
    const [snowData, setSnowData] = useState([]);
    const [tempExtremeData, settempExtremeData] = useState([]);
    const [loading, setLoading] = useState(false); 


    let nextId = 0;

    // get data from apis
    const USGS_APIData = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
    const storm_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=severeStorms&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const volcano_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=volcanoes&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const ice_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=seaLakeIce&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const wildfire_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const drought_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=drought&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const flood_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=floods&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const dustHaze_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=dustHaze&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const landslide_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=landslides&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const snow_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=snow&api_key=' + import.meta.env.VITE_NASA_API_KEY;
    const tempExtreme_APIData = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&category=tempExtremes&api_key=' + import.meta.env.VITE_NASA_API_KEY;


    
   useEffect(() => {
        const fetchEvents = async () => {
        setLoading(true);
        try {
            const responses = await Promise.all([fetch(USGS_APIData), fetch(storm_APIData), fetch(volcano_APIData),fetch(ice_APIData),fetch(wildfire_APIData),fetch(drought_APIData),
                fetch(flood_APIData),fetch(dustHaze_APIData),fetch(landslide_APIData),fetch(snow_APIData),fetch(tempExtreme_APIData)
            ])
            setEarthquakeData(await responses[0].json())
            setStormData(await responses[1].json())
            setVolcanoData(await responses[2].json())
            setIceData(await responses[3].json())
            setWildfireData(await responses[4].json())
            setDroughtData(await responses[5].json())
            setFloodData(await responses[6].json())
            setDustHazeData(await responses[7].json())
            setLandslideData(await responses[8].json())
            setSnowData(await responses[9].json())
            settempExtremeData(await responses[10].json())
        } catch(error) {
            throw error;
        }
        setLoading(false);
        
        }

        fetchEvents()

    },[])
    

    useEffect(() => {
        if (
            earthquakeData &&
            stormData &&
            volcanoData &&
            iceData &&
            wildfireData &&
            droughtData &&
            floodData &&
            dustHazeData &&
            landslideData &&
            snowData &&
            tempExtremeData
        ) {
            const eventTypes = [
                { data: earthquakeData, type: "Earthquake" },
                { data: stormData, type: "Severe Storms" },
                { data: volcanoData, type: "Volcanoes" },
                { data: iceData, type: "Sea and Lake Ice" },
                { data: wildfireData, type: "Wildfires" },
                { data: droughtData, type: "Droughts" },
                { data: floodData, type: "Floods" },
                { data: dustHazeData, type: "Dust and Haze" },
                { data: landslideData, type: "Landslides" },
                { data: snowData, type: "Snow" },
                { data: tempExtremeData, type: "Temperature Extremes" },
            ];
    
            const updatedNumbers = eventTypes
                .map(({ data, type }, index) => {
                    if (data && data.events) {
                        return { id: index, num: Object.keys(data.events).length, type };
                    } else if (data && data.features){
                        return { id: index, num: Object.keys(data.features).length, type };
                    }
            
                    return null;
                    
                })
                .filter((event) => event !== null); // Remove null values
    
            setNumbers(updatedNumbers);
        }
    }, [
        
        earthquakeData,
        stormData,
        volcanoData,
        iceData,
        wildfireData,
        droughtData,
        floodData,
        dustHazeData,
        landslideData,
        snowData,
        tempExtremeData,
    ]);

    return(
        <>
        {loading ? <BarLoader/> : null}
        
        </>
    )

}

export default ChartData;