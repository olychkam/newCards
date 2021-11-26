import {passwordAPI} from "../00-API/api-password";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authAPI} from "../00-API/auth-api";
import {AppThunkType} from "./store";

export type EnterNewPasswordReducerActionType = ReturnType<typeof setIsNewPasswordAC>

type EnterNewPasswordType = {
    isNewPassword: boolean
}

const initialState = {} as EnterNewPasswordType

type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: EnterNewPasswordReducerActionType) => {
    switch (action.type) {
        case "ENTER-NEW-PASSWORD/SET-IS-NEW-PASSWORD":
            return {
                ...state,
                isNewPassword: action.isNewPassword
            }
        default:
            return state
    }
}

export const setIsNewPasswordAC = (isNewPassword: boolean) =>
    ({type: "ENTER-NEW-PASSWORD/SET-IS-NEW-PASSWORD", isNewPassword} as const)

export const setNewPasswordTC = (newPassword: string, passwordToken: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    authAPI.newPassword(newPassword, passwordToken)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setIsNewPasswordAC(true))
        })
        .catch(response => {
            console.log(response.error)
            dispatch(setAppStatusAC("failed"))
        })
}