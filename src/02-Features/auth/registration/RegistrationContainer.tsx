import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import Registration from "./Registration";
import {AppRootStateType} from "../../../01-redux/store";
import {selectorError} from "../../../01-redux/selectors/app-selectors";
import {registerTC} from "../../../01-redux/registration-reducer";

export const RegistrationContainer = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const isRegistered = useSelector<AppRootStateType, boolean>((state:any) => state.registration.isRegistration)
    const error = useSelector<AppRootStateType, string | null>(selectorError)//error

    const onEmailChange = (value: string) =>  {
        setEmail(value)
    }
    const onPasswordChange = (value: string) => {
        setPassword(value)
    }
    const registerUser = () => {
        dispatch(registerTC(email, password))
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

