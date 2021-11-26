import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../01-redux/store";
import s from './BurgerNav.module.css';
import SuperButton from "../../c2-SuperButton/SuperButton";
import {NoAuthorizedNav} from "../AuthorizedNav/NoAuthorizedNav";
import {AuthorizedNav} from "../AuthorizedNav/AuthorizedNav";
import {logOutTC} from "../../../01-redux/auth-reducer";

export const BurgerNav = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const logoutOnClick = () => {
        dispatch(logOutTC())
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