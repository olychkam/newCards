import React, {useState} from "react";
import classes from './Header.module.css'
import {Navbar} from "./Navbar/Navbar";
import {BurgerNav} from "./BurgerNav/BurgerNav";
import {Logout} from "../../02-Features/auth/logaut/Logout";


function Header() {
    return (
        <div className={classes.navbarContainer}>
            <Navbar/>
            <BurgerNav/>
        </div>
    );
}

export default Header;
