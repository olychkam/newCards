import React, {ChangeEvent, useCallback, useState} from "react";
import Login from "./Login";
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import s from './Login.module.css'
import {AppRootStateType} from "../../../01-redux/store";
import {PATH} from "../../../03-Components/Routes";
import {selectorError} from "../../../01-redux/selectors/app-selectors";
import {selectorIsLoggedIn, selectorUserData} from "../../../01-redux/selectors/auth-selector";
import {loginTC} from "../../../01-redux/auth-reducer";

type LoginContainerType = {}

function LoginContainer() {
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const isLogin = useSelector<AppRootStateType, boolean>(selectorIsLoggedIn)
    const error = useSelector<AppRootStateType, string | null>(selectorError)
    let onChangeHandlerEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }, [setEmail])
    let onChangeHandlerPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }, [setPassword])
    let onChangeHandlerRememberMe = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }, [setRememberMe])
    let onClickHandler = () => {
        dispatch(loginTC(email, password, rememberMe))
    }

    if (isLogin) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div>
            <Login
                onChangeHandlerEmail={onChangeHandlerEmail}
                onChangeHandlerPassword={onChangeHandlerPassword}
                onChangeHandlerRememberMe={onChangeHandlerRememberMe}
                onClickHandler={onClickHandler}
                error={error}
            />
            <span>
                <NavLink className={s.text} to={PATH.NEW_PASSWORD}> Forget password</NavLink>
            </span>
        </div>
    )
        ;
}

export default LoginContainer;

