import React from "react";
import s from './Navbar.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../01-redux/store";
import {logout} from "../../../01-redux/auth-reducer";
import {NoAuthorizedNav} from "../AuthorizedNav/NoAuthorizedNav";
import {AuthorizedNav} from "../AuthorizedNav/AuthorizedNav";
import SuperButton from "../../c2-SuperButton/SuperButton";

export const Navbar = () => {

//nya-admin@nya.nya1qazxcvBG
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLogin)
    /*
        const UserName = useSelector<AppRootStateType, string | null>(state => state.login ? state.app.UserData.name : null)
    */
    const logoutOnClick = () => {
        dispatch(logout())
    }
    return (

        <div className={s.navbar}>

            {!isLoggedIn && <NoAuthorizedNav/>}
            {isLoggedIn && <> <AuthorizedNav/>


                {/*
                <span className={s.userName}> {UserName} </span>
*/}
            </>}
        </div>
    );
}
