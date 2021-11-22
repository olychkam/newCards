import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {recoveryPasswordTC} from "../../01-redux/new-password-reducer";
import s from "../auth/login/Login.module.css";
import {AppRootStateType} from "../../01-redux/store";
import {PATH} from "../../03-Components/Routes";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";

function NewPassword() {
    const isForgot = useSelector<AppRootStateType, boolean>((state:any) => state.newPassword.isForgot)
    const [isRecoveryPassword, setIsRecoveryPassword] = useState<string>('')
    const dispatch = useDispatch();
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsRecoveryPassword(e.currentTarget.value)
    }
    const sendEmail = () => {
        dispatch(recoveryPasswordTC(isRecoveryPassword))
    }
    if (isForgot) {
        return <Redirect to={PATH.RESET_PASSWORD}/>
    }
    return (
        <div className={s.formContainer}>
            <form>
                <span>Email:</span>
                <div><input type={'email'} onChange={onChangePasswordHandler}/>
                </div>
                <div>
                    <div><SuperButton onClick={sendEmail}>Send</SuperButton></div>
                </div>
            </form>
            <div>
                <NavLink className={s.text} to={PATH.LOGIN}>Login</NavLink>
            </div>
        </div>

    );
}

export default NewPassword;
