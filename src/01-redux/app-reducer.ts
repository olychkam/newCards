import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, AppThunkType} from "./store";
import {authAPI} from "../00-API/auth-api";
import {setIsLoggedIn, setLoginError} from "./auth-reducer";
import {setUserProfileDataAC} from "./profile-reducer";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppReducerActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setIsInitializedAC>

const initialState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-APP-STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'APP/SET-IS-INITIALIZED':
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-APP-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export const initializedAppTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then(response => {
            const {_id, email, avatar, publicCardPacksCount, name} = response
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsInitializedAC(true))
            dispatch(setIsLoggedIn(true))
            dispatch(setUserProfileDataAC({_id, email, avatar, publicCardPacksCount, name}))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setLoginError(error));
            dispatch(setAppStatusAC('failed'))
            dispatch(setIsInitializedAC(true))
        })
}

/*

export type ActionsType = ReturnType<typeof setAppStatus> | ReturnType<typeof initializedSuccess>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    initialized: false,
    appState: {
        status: 'idle',
        error: null as string | null
    } as AppState
}
export type AppState = {
    status: RequestStatusType,
    error: null | string
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case "APP/SET-APP-STATUS":
            return {...state, appState: action.status}
        case "APP/INITIALIZED-SUCCESS":
            return {...state,initialized: action.initialized
            }
        default:
            return state;
    }
}

export const setAppStatus = (status: AppState) => ({
    type: 'APP/SET-APP-STATUS', status
} as const)
export const initializedSuccess = (initialized:boolean) => ({
    type: 'APP/INITIALIZED-SUCCESS',initialized
} as const)

export const initializeApp = () => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    try {
        await dispatch(getAuthUserData)
        dispatch(initializedSuccess(true))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}*/
