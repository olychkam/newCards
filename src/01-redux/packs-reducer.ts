import {packsAPI, PackType} from "../00-API/packs-api";
import {AppThunk} from "./store";

export type PacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: number
    page: number
    pageCount: number
    cardPacksTotalCount: number
}

type PacksStateType = {
    packsList: Array<PackType>
    packsParams: PacksParamsType
    error: string | null
}
const initialState: PacksStateType = {
    packsList : [],
    packsParams : {
        packName : "",
        min : 0,
        max : 50,
        sortPacks : 0,
        page : 1,
        pageCount : 10,
        cardPacksTotalCount : 0
    },
    error : null
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType) => {
    switch (action.type) {
        case "SET_PACKS":
            return {...state, packsList : action.packsList}
        case "SET_PACKS_SEARCH_TERM":
            return {...state, packsParams : {...state.packsParams, packName : action.packName}}
        case "SET_CARD_PACKS_TOTAL_COUNT":
            return {...state, packsParams : {...state.packsParams, cardPacksTotalCount : action.cardPacksTotalCount}}
        case 'PACKS/SET_PAGE':
            return {...state, packsParams : {...state.packsParams, page : action.page}}
        case "PACKS/SET_ERROR": return {...state, error: action.error}
        default:
            return state;
    }
}
// Actions

export const setPacksListAC = (packsList: Array<PackType>): SetPacksListActionType => ({
    type : "SET_PACKS", packsList
} as const)
export const SetPacksSearchTermAC = (packName: string): SetPacksSearchTermActionType => ({
    type : 'SET_PACKS_SEARCH_TERM',
    packName
} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number): SetCardPacksTotalCountActionType => ({
    type : 'SET_CARD_PACKS_TOTAL_COUNT', cardPacksTotalCount
} as const)
export const setPageAC = (page: number): SetPageActionType => ({
    type : 'PACKS/SET_PAGE', page
} as const)
export const setPacksErrorAC = (error: null | string): SetPacksErrorActionType => ({
    type : 'PACKS/SET_ERROR', error
} as const)


// TC

export const fetchPacksTC = (packsParams: PacksParamsType): AppThunk => (dispatch) => {
    packsAPI.fetchPacks(packsParams).then((res) => {
        dispatch(setPacksListAC(res.data.cardPacks))
        dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
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
    | SetPacksErrorActionType
