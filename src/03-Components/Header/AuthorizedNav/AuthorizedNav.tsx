import React from "react";
import {NavLink} from "react-router-dom";
import s from './AuthorizedNav.module.css';
import {PATH} from "../../Routes";
import logo from "../../../04-Assets/Study Point._free-file.png";
import {Logout} from "../../../02-Features/auth/logaut/Logout";

type AuthorizedNav = {
    burgerNav?: boolean
}

export const AuthorizedNav = (props: AuthorizedNav) => {

//nya-admin@nya.nya1qazxcvBG
    return (
        <div className={props.burgerNav ? s.burgerContainer : s.navContainer}>
            <img src={logo}/>
            <span>
                    <NavLink
                        to={PATH.PROFILE}
                        className={s.menuItem}
                        activeClassName={s.highlight}>Profile</NavLink>
                </span>

            <span>
                    <NavLink
                        to={PATH.PACKS}
                        className={s.menuItem}
                        activeClassName={s.highlight}>Packs</NavLink>
                </span>
            <span>
                    <NavLink
                        to={PATH.NEW_PASSWORD}
                        className={s.menuItem}
                        activeClassName={s.highlight}>New Password</NavLink>
                </span>
            <span className={s.item}><Logout/></span>
        </div>
    );
}
