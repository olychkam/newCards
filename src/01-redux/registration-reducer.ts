import {Dispatch} from "react";
import {registrationAPI} from "../00-API/registration-api";
import {AppRootStateType, AppThunkType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {authAPI} from "../00-API/auth-api";

export type RegisterReducerActionType = ReturnType<typeof setIsRegistrationDataAC>

type RegisterType = {
    isRegistration: boolean
}

const initialState = {} as RegisterType

type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: RegisterReducerActionType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET-IS-REGISTRATION-DATA":
            return {
                ...state,
                isRegistration: action.isRegistration
            }
        default:
            return state
    }
}

const setIsRegistrationDataAC = (isRegistration: boolean) =>
    ({type: "REGISTER/SET-IS-REGISTRATION-DATA", isRegistration} as const)

export const registerTC = (email: string, password: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    authAPI.register(email, password)
        .then(() => {
            dispatch(setIsRegistrationDataAC(true))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(response => {
            console.log(response.error)
            dispatch(setAppStatusAC('failed'))
        })
}