import React from "react";
import {NavLink} from "react-router-dom";
import s from './AuthorizedNav.module.css';
import {PATH} from "../../Routes";

type NoAuthorizedNav = {
    burgerNav?: boolean
}

export const NoAuthorizedNav = (props: NoAuthorizedNav) => {

//nya-admin@nya.nya1qazxcvBG
    return (
        <div className={props.burgerNav ? s.burgerContainer : s.noAuthNav}>
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
        </div>
    );
}
