import React from 'react';
import globe from "./globe.gif"

const NotFoundPage = () => {
    console.log("Not Found!");

    return(
        <>
        <div className='not-found'>
           <img src={globe} alt="globe" /> 
           <h1>Not Found</h1>  
        </div>
        </>
    )
}

export default NotFoundPage;