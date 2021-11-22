import {Dispatch} from "react";
import {registrationAPI} from "../00-API/registration-api";
import {AppRootStateType} from "./store";

type RegistrationStateType = {
    isRegistered: boolean,
    error: string | null
}
const initialState: RegistrationStateType = {
    isRegistered: false,
    error: null
}

export const registrationReducer = (state: RegistrationStateType = initialState, action: ActionsType): RegistrationStateType => {
    switch (action.type) {
        case "TOGGLE_IS_REGISTERED": {
            return {...state, ...action.payload}
        }
        case "SET_ERROR":{
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const ToggleIsRegisteredAC = (isRegistered: boolean) => ({
    type: "TOGGLE_IS_REGISTERED",
    payload: {
        isRegistered
    }
} as const)

export const SetErrorAC = (error: string | null) => ({
    type: "SET_ERROR",
    payload: {
        error
    }
} as const)


export const RegisterUserTC = (email: string, password: string) => (dispatch: ThunkDispatch,  getState: () => AppRootStateType) => {
    registrationAPI.registerUser(email, password)
        .then((res) => {
            dispatch(ToggleIsRegisteredAC(true))
        }).catch((error) => {
            dispatch(SetErrorAC(error.response.data.error))
    })
}

type ActionsType =
    | ReturnType<typeof ToggleIsRegisteredAC>
    | ReturnType<typeof SetErrorAC>

type ThunkDispatch = Dispatch<ActionsType>
