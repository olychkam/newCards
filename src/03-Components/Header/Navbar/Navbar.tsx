import React from "react";
import {NavLink} from "react-router-dom";
import classes from './Navbar.module.css'
import {PATH} from "../../Routes";
import {Logout} from "../../../02-Features/auth/logaut/Logout";

type NavbarType = {
    isCollapsed: boolean
    setCollapsed: (isCollapsed: boolean) => void
}

function Navbar(props: NavbarType) {

    const onClickItem = () => {
        props.setCollapsed(true)
    }
//nya-admin@nya.nya1qazxcvBG
    return (
        <div className={props.isCollapsed ? classes.hidden : classes.menuContainer}>
            <ul>
                <li>
                    <NavLink onClick={onClickItem}
                             to={PATH.LOGIN}
                             className={classes.menuItem}
                             activeClassName={classes.highlight}>Login</NavLink>

                </li>
                <li>
                    <NavLink onClick={onClickItem}
                             to={PATH.REGISTRATION}
                             className={classes.menuItem}
                             activeClassName={classes.highlight}>Registration</NavLink>
                </li>
                <li>
                    <NavLink onClick={onClickItem}
                             to={PATH.PROFILE}
                             className={classes.menuItem}
                             activeClassName={classes.highlight}>Profile</NavLink>
                </li>
                <li>
                    <NavLink onClick={onClickItem}
                             to={PATH.RESET_PASSWORD}
                             className={classes.menuItem}
                             activeClassName={classes.highlight}>Reset Password</NavLink>
                </li>
                <li>
                    <NavLink onClick={onClickItem}
                             to={PATH.NEW_PASSWORD}
                             className={classes.menuItem}
                             activeClassName={classes.highlight}>New Password</NavLink>
                </li>
                <li>
                    <NavLink onClick={onClickItem}
                             to={PATH.PACKS}
                             className={classes.menuItem}
                             activeClassName={classes.highlight}>Packs</NavLink>
                </li>
                <li>
                    <NavLink onClick={onClickItem}
                             to={PATH.TEST}
                             className={classes.menuItem}
                             activeClassName={classes.highlight}>Test</NavLink>
                </li>
                <li><NavLink to={PATH.LOGIN}><Logout/></NavLink></li>
                <li>
                    <NavLink onClick={onClickItem}
                             to={PATH.MODALS}
                             className={classes.menuItem}
                             activeClassName={classes.highlight}>Modals</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
