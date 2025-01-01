import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


import HamburgerMenu from './HamburgerMenu';
import Burger from './Burger';

const DonationPage = () => {
    console.log("Donation Page is here!");
    const [activeMenu, setActiveMenu] = useState(false);

    return(
        <>
            <Container>
                <Burger activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                <HamburgerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
            </Container>
        </>
    )
}

export default DonationPage;