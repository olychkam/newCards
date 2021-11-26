import {PATH} from "../../03-Components/Routes";
import {CommonForm} from "../../03-Components/c8-CommonForm/CommonForm";
import {useEffect} from "react";
import {RequestStatusType} from "../../01-redux/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../01-redux/store";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {setNewPasswordTC} from "../../01-redux/new-password-reducer";

export const ResetPassword = () => {
    const dispatch = useDispatch()
    const {token} = useParams<{token: string}>()
    const isPasswordChanged = useSelector<AppRootStateType, boolean>(state => state.resetPassword.isNewPassword)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const newPasswordCallBack = (values: any) => {
        dispatch(setNewPasswordTC(values.password, token))
    }

    if(isPasswordChanged) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            {status === "loading" && <CircularProgress/>}
            <CommonForm type={'New password'} callBack={newPasswordCallBack}/>
        </>
    )
}