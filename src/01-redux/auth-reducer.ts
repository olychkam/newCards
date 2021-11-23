import {loginAPI} from "../00-API/login-api";
import {AppThunk} from "./store";

export const SET_IS_LOGIN = 'SET-IS-LOGIN';
export const SET_ERROR = "SET_ERROR";
export const SET_DATA = "SET_DATA";

export type ActionsLoginType = ReturnType<typeof setLoginAC> | ReturnType<typeof setError> | ReturnType<typeof setData>
type LoginStateType = {
    user: UserType
    isLogin: boolean
    error: string | null
}
export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: number;
    updated: number;
    isAdmin: boolean;
    verified?: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
    token: string
}
const initialState: LoginStateType = {
    user: {
        avatar: '',
        created: 5,
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        updated: 5,
        _id: '',
    },
    isLogin: false,
    error: null
}

export const authReducer = (state: LoginStateType = initialState, action: ActionsLoginType): LoginStateType => {
    switch (action.type) {
        case "SET_IS_LOGIN":
            return {...state, isLogin: action.isLoggedIn};
        case "SET_ERROR": {
            return {...state, error: action.error}
        }
        case "SET_DATA": {
            return {...state, user: action.userData}
        }
        default:
            return state
    }
}
export const setLoginAC = (isLoggedIn: boolean) => ({
    type: 'SET_IS_LOGIN',
    isLoggedIn
} as const)

export const setError = (error: string | null) => ({
    type: "SET_ERROR",
    error
} as const)

export const setData = (userData: UserType) => ({
    type: "SET_DATA",
    userData
} as const)

export const login = (email: string, password: string, rememberMe: boolean): AppThunk =>
    (dispatch) => {
        loginAPI.login(email, password, rememberMe)
            .then((response) => {
                dispatch(setLoginAC(true))
                dispatch(setData(response.data))
                dispatch(setError(null))
            })
            .catch((e) => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
                dispatch(setError(error))
            })

    }
export const logout = (): AppThunk =>
    (dispatch) => {
        loginAPI.logout()
            .then(response => {
                dispatch(setLoginAC(false))
                dispatch(setError(null))
                alert(response.data.info)

            })
            .catch((e) => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
                alert(error)
                dispatch(setError(error))
            })

    }




