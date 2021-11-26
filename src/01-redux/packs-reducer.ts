import {CardsPackCreateType, FetchPacksPayloadType, packsAPI, PackType, ResponsePackType} from "../00-API/packs-api";
import {AppRootStateType, AppThunkType} from "./store";
import {toast} from "react-hot-toast";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {setAppStatusAC, setIsInitializedAC} from "./app-reducer";

export type PacksReducerActionType = ReturnType<typeof setPacksDataAC>
    | ReturnType<typeof setPageValueAC>
    | ReturnType<typeof setPagesCountAC>

const initialState = {} as ResponsePackType
type InitialStateType = typeof initialState

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {
                ...state, ...action.packsData
            }
        case 'SET-CURRENT-PAGE-VALUE': {
            return {...state, page: action.value}
        }
        case 'SET-CURRENT-PAGES-COUNT': {
            return {...state, pageCount: action.value}
        }
        default:
            return state
    }
}

export const setPacksDataAC = (packsData: ResponsePackType) =>
    ({type: 'PACKS/SET-PACKS', packsData} as const)

export const setPageValueAC = (value: number) => ({type: 'SET-CURRENT-PAGE-VALUE', value} as const)
export const setPagesCountAC = (value: number) => ({type: 'SET-CURRENT-PAGES-COUNT', value} as const)

export const fetchPacksTC = (data: FetchPacksPayloadType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await packsAPI.fetchPacks({...data})
        const {
            cardPacks, page, cardPacksTotalCount, minCardsCount,
            maxCardsCount, token, tokenDeathTime, pageCount = 8
        } = response
        dispatch(setPacksDataAC({
            cardPacks, page, cardPacksTotalCount,
            minCardsCount, maxCardsCount, token, tokenDeathTime, pageCount
        }))
        dispatch(setPagesCountAC(pageCount))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        console.log(error)
        dispatch(setIsInitializedAC(true))
        dispatch(setAppStatusAC('failed'))
    }
}

export const createCardsPackTC = (cardsPack: Partial<CardsPackCreateType>, count: number, userId: string | null): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.createPack(cardsPack)
        dispatch(fetchPacksTC({pageCount: count, user_id: userId}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        console.log(error)
        dispatch(setIsInitializedAC(true))
        dispatch(setAppStatusAC('failed'))
    }
}

export const updateCardsPackTC = (_id: string, name: string, count: number, userId: string | null): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(_id, name)
        .then(() => {
            dispatch(fetchPacksTC({pageCount: count, user_id: userId}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const deleteCardsPackTC = (id: string, count: number, userId: string | null): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePack(id)
        .then(() => {
            dispatch(fetchPacksTC({pageCount: count, user_id: userId}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}


/*
export const updateCardsPackTC = (_id: string, name: string, count: number, userId: string | null): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(_id, name)
        .then(() => {
            dispatch(fetchPacksTC({pageCount: count, user_id: userId}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const deleteCardsPackTC = (id: string, count: number, userId: string | null): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePack(id)
        .then(() => {
            dispatch(fetchPacksTC({pageCount: count, user_id: userId}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}
*/


/*

export type PacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: number
    page: number
    pageCount: number
    cardPacksTotalCount: number,
    user_id: string
}

type PacksStateType = {
    packsList: Array<PackType>
    packsParams: PacksParamsType
    error: string | null
}
const initialState: PacksStateType = {
    packsList: [],
    packsParams: {
        packName: "",
        min: 0,
        max: 50,
        sortPacks: 0,
        page: 1,
        pageCount: 10,
        cardPacksTotalCount: 0,
        user_id: ""

    },
    error: null
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType) => {
    switch (action.type) {
        case "SET_PACKS":
            return {...state, packsList: action.packsList}
        case "SET_PACKS_SEARCH_TERM":
            return {...state, packsParams: {...state.packsParams, packName: action.packName}}
        case "SET_CARD_PACKS_TOTAL_COUNT":
            return {...state, packsParams: {...state.packsParams, cardPacksTotalCount: action.cardPacksTotalCount}}
        case 'PACKS/SET_PAGE':
            return {...state, packsParams: {...state.packsParams, page: action.page}}
        case "PACKS/SET_ERROR":
            return {...state, error: action.error}
        case 'SET_PAGINATION_PROPERTY':
            return {...state, pagination: {...state.packsParams, ...action.property}}
        case 'PACKS/SET-PACKS':
            return {
                ...state, ...action.packsData
            }
        default:
            return state;
    }
*/
/*

// Actions
export const setPaginationAC = (property: PacksParamsType) =>
    ({type: 'SET_PAGINATION_PROPERTY', property} as const)

export const setPacksListAC = (packsList: Array<PackType>): SetPacksListActionType => ({
    type: "SET_PACKS", packsList
} as const)
export const SetPacksSearchTermAC = (packName: string): SetPacksSearchTermActionType => ({
    type: 'SET_PACKS_SEARCH_TERM',
    packName
} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number): SetCardPacksTotalCountActionType => ({
    type: 'SET_CARD_PACKS_TOTAL_COUNT', cardPacksTotalCount
} as const)
export const setPageAC = (page: number): SetPageActionType => ({
    type: 'PACKS/SET_PAGE', page
} as const)
export const setPacksErrorAC = (error: null | string): SetPacksErrorActionType => ({
    type: 'PACKS/SET_ERROR', error
} as const)
export const setPacksDataAC = (packsData: ResponseType) =>
    ({type: 'PACKS/SET-PACKS', packsData} as const)

// TC
*/

/*
export const fetchPacksTC = (packsParams: PacksParamsType): AppThunk => (dispatch) => {
    packsAPI.fetchPacks(packsParams).then((res) => {
        dispatch(setPacksListAC(res.data.cardPacks))
        dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
    })
}
*/
/*
export const fetchPacksTC = (data: PacksParamsType): any => (dispatch:Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    packsAPI.fetchPacks({...data})
        .then(response => {
            const {
                cardPacks, page, cardPacksTotalCount, minCardsCount,
                maxCardsCount, token, tokenDeathTime, pageCount = 8
            } = response
            dispatch(setPacksDataAC({
                cardPacks, page, cardPacksTotalCount,
                minCardsCount, maxCardsCount, token, tokenDeathTime, pageCount
            }))
            dispatch(setPageAC(pageCount))
            dispatch(setAppStatus({status:'succeeded',error:null}))
        })
        .catch(error => {
            console.log(error)
            dispatch(initializedSuccess(true))
            dispatch(setAppStatus({status:'failed',error:error}))
        })
}
export const addPackTC = (packsParams: PacksParamsType): AppThunk => (dispatch) => {
    packsAPI.addPack().then(() => {
        dispatch(fetchPacksTC(packsParams))
    })
}

export const updatePackTC = (id: string, packsParams: PacksParamsType): AppThunk => (dispatch) => {
    packsAPI.updatePack(id).then(() => {
        dispatch(fetchPacksTC(packsParams))
    })
}

export const deletePackTC = (id: string, packsParams: PacksParamsType): AppThunk => (dispatch) => {
    packsAPI.deletePack(id).then(() => {
        dispatch(fetchPacksTC(packsParams))
    })
}


// Types
export type SetPacksSearchTermActionType = {
    type: 'SET_PACKS_SEARCH_TERM',
    packName: string
}
export type SetPacksListActionType = {
    type: 'SET_PACKS',
    packsList: Array<PackType>
}
export type SetCardPacksTotalCountActionType = {
    type: 'SET_CARD_PACKS_TOTAL_COUNT',
    cardPacksTotalCount: number
}
export type SetPageActionType = {
    type: 'PACKS/SET_PAGE',
    page: number
}
export type SetPacksErrorActionType = {
    type: 'PACKS/SET_ERROR',
    error: string | null
}
export type PacksActionsType =
    | SetPacksSearchTermActionType
    | SetPacksListActionType
    | SetCardPacksTotalCountActionType
    | SetPageActionType
    | SetPacksErrorActionType | ReturnType<typeof setPaginationAC>|ReturnType<typeof setPacksDataAC>
*/
