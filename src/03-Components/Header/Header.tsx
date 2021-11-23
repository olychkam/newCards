import React, {useState} from "react";
import classes from './Header.module.css'
import {Navbar} from "./Navbar/Navbar";
import {BurgerNav} from "./BurgerNav/BurgerNav";


function Header() {
    return (
        <div className={classes.navbarContainer}>
            <Navbar/>
            <BurgerNav/>
        </div>
    );
}

export default Header;
