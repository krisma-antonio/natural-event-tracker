import Hamburger from "hamburger-react";
import React from 'react'


const Burger = ({activeMenu, setActiveMenu}) => {

    return (
        <>
        <div onClick={() => setActiveMenu(!activeMenu)}>
            <h1 className="burger-menu"><Hamburger/></h1>
        </div>        

        </>
    )
}

export default Burger