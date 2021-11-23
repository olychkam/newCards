import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../01-redux/auth-reducer";
import {AppRootStateType} from "../../../01-redux/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../03-Components/Routes";

export const Logout = () => {
    const isLogin = useSelector<AppRootStateType, boolean>((state) => state.login.isLogin)
    let dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(logout())
        return <Redirect to={PATH.LOGIN}/>

    }
    if(!isLogin){
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div onClick={onClickHandler}>
            Logout
        </div>
    )
}