import React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../../01-redux/auth-reducer";

export const Logout = () => {
    let dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(logout())
    }
    return (
        <div onClick={onClickHandler}>
            Logout
        </div>
    )
}