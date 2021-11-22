import React, {useState} from "react";
import classes from './Header.module.css'
import Navbar from "./Navbar/Navbar";

function Header() {

    const [isCollapsed, setCollapsed] = useState<boolean>(true)
    const toggleMenu = () => {
        setCollapsed(!isCollapsed)
    }
    return (
        <div className={classes.menuContainer}>
            <div className={classes.navbarContainer}>
                <img onClick={toggleMenu}
                     className={classes.menuIcon}
                     src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg"
                     alt="menu"/>
            </div>
            <Navbar isCollapsed={isCollapsed} setCollapsed={setCollapsed}/>

        </div>
    );
}

export default Header;
