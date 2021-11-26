import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../01-redux/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../03-Components/Routes";
import SuperButton from "../../../03-Components/c2-SuperButton/SuperButton";
import {selectorIsLoggedIn} from "../../../01-redux/selectors/auth-selector";
import {logOutTC} from "../../../01-redux/auth-reducer";

export const Logout = () => {
    const isLogin = useSelector<AppRootStateType, boolean>(selectorIsLoggedIn)
    let dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(logOutTC())

    }
    if (!isLogin) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
                <span> < SuperButton onClick={onClickHandler} name="Logout">
                    LOGOUT
                </SuperButton> </span>
        </div>
    )
}