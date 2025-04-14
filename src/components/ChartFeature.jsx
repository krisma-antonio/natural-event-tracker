import { FaChartBar } from "react-icons/fa";
import { Link } from 'react-router-dom';


const ChartFeature = () => {

    return (
        <>
        <Link to={"/chart"} rel="noopener noreferrer">
            <FaChartBar id="chartButton" className="chart-button"/>   
        </Link>

        </>
    )

}

export default ChartFeature;