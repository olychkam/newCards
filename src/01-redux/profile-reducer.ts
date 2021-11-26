import {AppThunkType} from "./store";
import {setAppStatusAC, setIsInitializedAC} from "./app-reducer";
import {authAPI} from "../00-API/auth-api";
import {setLoginError} from "./auth-reducer";

export type ProfileReducerActionType =
    ReturnType<typeof setUserProfileDataAC>
    | ReturnType<typeof updateUserProfileDataAC>

export type UserDataType = {
    email: string
    _id: string
    avatar: string
    name: string
    publicCardPacksCount: number
}

const initialState = {
    userData: {
        email: "",
        _id: "",
        avatar: "",
        name: "",
        publicCardPacksCount: 0,
    },
    isLoggedIn: false,
    loginError: null
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-PROFILE":
            return {
                ...state,
                userData: action.data
            }
        case "PROFILE/UPDATE-PROFILE":
            return {
                ...state,
                userData: {...state.userData, avatar: action.avatar, name: action.name}
            }
        default:
            return state
    }
}

export const setUserProfileDataAC = (data: UserDataType) =>
    ({type: "PROFILE/SET-PROFILE", data} as const)
const updateUserProfileDataAC = (name: string, avatar: string) =>
    ({type: "PROFILE/UPDATE-PROFILE", name, avatar} as const)

//thunks
export const updateProfileTC = (name: string, avatar: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.changeProfile(name, avatar)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(updateUserProfileDataAC(name, avatar))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setLoginError(error));
            dispatch(setAppStatusAC('failed'))
            dispatch(setIsInitializedAC(true))
        })
}

