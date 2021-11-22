import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../01-redux/store";
import {logout} from "../../../01-redux/auth-reducer";
import s from './BurgerNav.module.css';
import SuperButton from "../../c2-SuperButton/SuperButton";
import {NoAuthorizedNav} from "../AuthorizedNav/NoAuthorizedNav";
import {AuthorizedNav} from "../AuthorizedNav/AuthorizedNav";

export const BurgerNav = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLogin)
    const logoutOnClick = () => {
        dispatch(logout())
    }
    let [menuIsOpen, setMenuIsOpen] = useState(false)

    return (<div className={s.burgerNav}>
            {menuIsOpen && <div className={s.nav}>
                {!isLoggedIn && <NoAuthorizedNav burgerNav={true}/>}
                {isLoggedIn && <AuthorizedNav burgerNav={true}/>}
            </div>}
        </div>
    )
}