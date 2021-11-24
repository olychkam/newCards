import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../01-redux/auth-reducer";
import {AppRootStateType} from "../../../01-redux/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../03-Components/Routes";
import SuperButton from "../../../03-Components/c2-SuperButton/SuperButton";

export const Logout = () => {
    const isLogin = useSelector<AppRootStateType, boolean>((state) => state.login.isLogin)
    let dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(logout())

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