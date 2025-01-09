import React from 'react';
import Navibar from './Navibar';
import Page from './Page';
import image1 from "./images/image1.jpeg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.jpg";
import donate from "./images/cover.jpg";
import image5 from "./images/image5.jpg";
import image6 from "./images/image6.jpg";

const DonationPage = () => {
    console.log("Donation Page is here!");

    return(
        <>
       <Navibar/>
        <div className="title">
            <div className="left-side-title">
                <h1>Donate</h1>
                <p>Links to reputable donation platforms where you can help families affected by natural disasters</p>
            </div>
            <img className="right-side-title" src={donate}></img>
        </div>
        <div className="content">
            <Page image={image1} link="https://www.redcross.org/donate/donation.html/" text="American Red Cross" 
            about="The Red Cross is a humanitarian organization providing disaster relief, 40% of the nation's blood supply, life-saving skills, international aid, and support for veterans and military families"/>
            <Page image={image2} link="https://www.doctorswithoutborders.org/get-involved/ways-to-give" text="Doctors Without Borders"
            about="Doctors Without Borders is an international organization that provides medical care to people affected by natural disasters, conflict, epidemic, and social exclusion"/>
            <Page image={image3} link="https://www.directrelief.org/" text="Direct Relief" 
            about="Direct Relief is a humanitarian aid organization, active in all 50 states and more than 80 countries, with a mission to improve the health and lives of people affected by poverty or emergencies"/>
            <Page image={image4} link="https://internationalmedicalcorps.org/" text="International Medical Corps"
            about="International Medical Corps relieves the suffering of those affected by conflict, disaster and disease, often in difficult and dangerous environments"/>
            <Page image={image5} link="https://wck.org/donate" text="World Central Kitchen"
             about="World Central Kitchen provides meals to communities affected by humanitarian, climate, and community crises"/>
            <Page image={image6} link="https://www.americares.org/" text="Americares"
             about="Americares is a health-focused relief and development organization that helps people affected by poverty or disaster with life-changing medicine, medical supplies, health services and programs"/>
        </div>
        </>
    )
}

export default DonationPage;