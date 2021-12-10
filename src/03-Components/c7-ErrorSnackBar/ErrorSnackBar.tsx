import {useDispatch, useSelector} from 'react-redux';
import s from './Error.module.css'
import {AppRootStateType} from "../../01-redux/store";
import {selectorError} from "../../01-redux/selectors/app-selectors";
import {setAppStatusAC} from "../../01-redux/app-reducer";
import {useState} from "react";
import {setLoginError} from "../../01-redux/auth-reducer";

type ErrorBarPropsType = {
    errorMessage: string
}

const ErrorSnackBar = (props: ErrorBarPropsType) => {
    const error = useSelector<AppRootStateType, string | null>(selectorError)
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(setAppStatusAC('idle'))
        dispatch(setLoginError(null))
        console.log('error:error')
    }
    return (
        <div className={error ? `${s.notification}` : `: ${s.closeNotification}`}>
            <div className={s.text}> {props.errorMessage} </div>
            <div className={`${s.close}`}>
                <div className={s.text} onClick={onClickHandler}>X</div>
            </div>
        </div>
    )
}

export default ErrorSnackBar;