import React from 'react';
import { NavLink } from "react-router-dom";


const HamburgerMenu = ({activeMenu}) => {

    return (
        <nav>
            <div className={`${activeMenu ? "open" : "closed"}`}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/donate" activeclassname="active">Donate</NavLink>
            </div>
        </nav>
    )

}

export default HamburgerMenu