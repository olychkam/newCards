import {loginAPI} from "../00-API/login-api";
import {AppRootStateType, AppThunkType} from "./store";
import {ThunkDispatch} from "redux-thunk";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authAPI} from "../00-API/auth-api";
import {setUserProfileDataAC} from "./profile-reducer";

export type AuthReducerActionType = SetIsLoggedInActionType
    | SetLoginErrorActionType

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>
export type SetLoginErrorActionType = ReturnType<typeof setLoginError>
type InitialStateType = { isLoggedIn: boolean, loginError: null | string }


const initialState = {
    isLoggedIn: false,
    loginError: null
}


export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case 'auth/SET-LOGIN-ERROR': {
            return {...state, loginError: action.loginError}
        }
        default:
            return state
    }
}

//actions
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'auth/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setLoginError = (loginError: string|null) => ({type: 'auth/SET-LOGIN-ERROR', loginError} as const)

//thunks
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(email, password, rememberMe)
        .then(response => {
            const {email, _id, avatar, name, publicCardPacksCount} = response;
            dispatch(setUserProfileDataAC({email, _id, avatar, name, publicCardPacksCount}));
            dispatch(setIsLoggedIn(true));
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setLoginError(error));
            dispatch(setAppStatusAC('failed'));
        })
}

export const logOutTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(() => {
            dispatch(setIsLoggedIn(false));
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setAppStatusAC('failed'));
        })
}



/*

export const SET_IS_LOGIN = 'SET-IS-LOGIN';
export const SET_DATA = "SET_DATA";

export type ActionsLoginType = ReturnType<typeof setLoginAC> | ReturnType<typeof setData>
type LoginStateType = {
    user: UserType
    isLogin: boolean
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
}

export const authReducer = (state: LoginStateType = initialState, action: ActionsLoginType): LoginStateType => {
    switch (action.type) {
        case "SET_IS_LOGIN":
            return {...state, isLogin: action.isLoggedIn};
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

export const setData = (userData: UserType) => ({
    type: "SET_DATA",
    userData
} as const)

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await loginAPI.login(email, password, rememberMe)
        dispatch(setData(res.data))
        dispatch(setLoginAC(true))
        dispatch(setAppStatus({status: 'succeeded', error: null}))

    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    }

}
export const logout = (): AppThunk =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading', error: null}))
        try {
            const res = await loginAPI.logout()
            dispatch(setData(res.data))
            dispatch(setLoginAC(false))
            dispatch(setAppStatus({status: 'succeeded', error: null}))
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setAppStatus({status: 'failed', error: error}))
        }

    }

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await loginAPI.me()
        dispatch(setData(res.data))
        dispatch(setAppStatus({status: 'succeeded', error: null}))
        dispatch(setLoginAC(true))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}


*/
