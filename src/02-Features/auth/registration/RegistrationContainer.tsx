import React, {useState} from "react";
import {RegisterUserTC} from "../../../01-redux/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import Registration from "./Registration";
import {AppRootStateType} from "../../../01-redux/store";

export const RegistrationContainer = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const isRegistered = useSelector<AppRootStateType, boolean>((state:any) => state.registration.isRegistered)
    const error = useSelector<AppRootStateType, string | null>((state:any) => state.registration.error)//error

    const onEmailChange = (value: string) =>  {
        setEmail(value)
    }
    const onPasswordChange = (value: string) => {
        setPassword(value)
    }
    const registerUser = () => {
        dispatch(RegisterUserTC(email, password))
    }

    if (isRegistered) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <Registration onEmailChange={onEmailChange}
                          onPasswordChange={onPasswordChange}
                          registerUser={registerUser}
                          error={error}
            />
        </div>

    );
}

export default RegistrationContainer;

