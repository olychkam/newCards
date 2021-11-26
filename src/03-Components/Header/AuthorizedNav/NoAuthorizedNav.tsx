import React from "react";
import {NavLink} from "react-router-dom";
import s from './AuthorizedNav.module.css';
import {PATH} from "../../Routes";
import logo from "../../../04-Assets/Study Point._free-file.png";

type NoAuthorizedNav = {
    burgerNav?: boolean
}

export const NoAuthorizedNav = (props: NoAuthorizedNav) => {

//nya-admin@nya.nya1qazxcvBG
    return (
        <div className={props.burgerNav ? s.burgerContainer : s.noAuthNav}>
            <img className={logo} src={logo}/>
            <span>
                    <NavLink to={PATH.LOGIN}
                             className={s.menuItem}
                             activeClassName={s.highlight}>Login</NavLink>
           </span>
            <span>
                    <NavLink
                        to={PATH.REGISTRATION}
                        className={s.menuItem}
                        activeClassName={s.highlight}>Registration</NavLink>
            </span>
            <span>
                    <NavLink
                        to={PATH.RESET_PASSWORD}
                        className={s.menuItem}
                        activeClassName={s.highlight}>Reset</NavLink>
            </span>
        </div>
    );
}
