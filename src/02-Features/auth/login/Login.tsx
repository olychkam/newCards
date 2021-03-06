import React, {ChangeEvent} from "react";
import s from './Login.module.css'
import SuperInputText from "../../../03-Components/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../../03-Components/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../03-Components/c2-SuperButton/SuperButton";

type LoginType = {
    onChangeHandlerEmail: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeHandlerPassword: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeHandlerRememberMe: (e: ChangeEvent<HTMLInputElement>) => void
    onClickHandler:()=>void
    error:string|null
}

function Login(props: LoginType) {
    return (
        <div className={s.formContainer}>
            <div>SIGN IN</div>
            <SuperInputText type={'email'} placeholder={'test-login@gmail.com'} onChange={props.onChangeHandlerEmail}/>
            <div><SuperInputText type={'password'} placeholder={'zxcasdqwe123'} onChange={props.onChangeHandlerPassword}/>
            </div>
            <div><SuperCheckbox onChange={props.onChangeHandlerRememberMe}>Remember Me</SuperCheckbox></div>
            <div><SuperButton onClick={props.onClickHandler}>Sign In</SuperButton></div>
        </div>

    );
}

export default Login;

