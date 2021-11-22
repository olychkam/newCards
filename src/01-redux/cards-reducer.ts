import {cardsAPI, CardType, FetchCardsPayloadType} from "../00-API/cards-api";
import {AppThunk} from "./store";


export type CardsParamsType = {
    minGrade: number
    maxGrade: number
    page: number
    pageCount: number
    cardsTotalCount: number
    cardAnswer: string
    cardQuestion: string
    cardsPack_id?: string
    sortCards: number
}

type CardsStateType = {
    cardsList: Array<CardType>
    cardsParams: CardsParamsType
    error: string | null
}
const initialState: CardsStateType = {
    cardsList: []as CardType[] ,
    cardsParams: {
        minGrade: 0,
        maxGrade: 15,
        page: 1,
        pageCount: 3,
        cardsTotalCount: 5,
        cardAnswer: "",
        cardQuestion: "",
        cardsPack_id: "",
        sortCards: 0
    },
    error: null
}

export const cardsReducer = (state: CardsStateType = initialState, action: CardsActionsType) => {
    switch (action.type) {
        case "SET_CARDS":
            return {...state, cardsList: action.cardsList}
        case "SET_CARD_TOTAL_COUNT":
            return {...state, cardsParams: {...state.cardsParams, cardsTotalCount: action.cardsTotalCount}}
        case "CARDS/SET_PAGE":
            return {...state, cardsParams: {...state.cardsParams, page: action.page}}
        case "CARDS/SET_PACK_ID":
            return {...state, cardsParams: {...state.cardsParams, cardsPack_id: action.id}}
        case "CARDS/SET_ERROR":
            return {...state, error: action.error}
        case 'CARDS/CARDS/SET-GRADE':
            return {
                ...state,
                cards: state.cardsList.map(
                    (card, i) => card._id === action.payload.id
                        ? {...card, grade: action.payload.grade}
                        : card
                )
            }
        default:
            return state;
    }
}
// Actions

export const setCardsListAC = (cardsList: Array<CardType>): SetCardsListActionType => ({
    type: "SET_CARDS", cardsList
} as const)

export const setCardsTotalCountAC = (cardsTotalCount: number): SetCardSTotalCountActionType => ({
    type: 'SET_CARD_TOTAL_COUNT', cardsTotalCount
} as const)

export const setCardsPageAC = (page: number): SetCardsPageActionType => ({
    type: 'CARDS/SET_PAGE', page
} as const)

export const setPackIdAC = (id: string): SetPackIdActionType => ({
    type: 'CARDS/SET_PACK_ID', id
} as const)

export const setCardsErrorAC = (error: null | string): SetCardsErrorActionType => ({
    type: 'CARDS/SET_ERROR', error
} as const)

export const setGrade = (grade: number, id: string) => ({
    type: 'CARDS/CARDS/SET-GRADE',
    payload: {
        id,
        grade
    }
} as const)

//Thunk



export const fetchCardsTC = (cardsParams: FetchCardsPayloadType): AppThunk => (dispatch) => {
    cardsAPI.fetchCards(cardsParams).then((res) => {
        dispatch(setCardsListAC(res.data.cards))
        dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
    }).catch((error) => {
        dispatch(setCardsErrorAC(error.response.data.error))
    })
}

export const addCardTC = (card: CardType, cardsParams: FetchCardsPayloadType): AppThunk => (dispatch) => {
    cardsAPI.addCard(card).then((res) => {
        dispatch(fetchCardsTC(cardsParams))
    }).catch((error) => {
        dispatch(setCardsErrorAC(error.response.data.error))
    })
}
export const updateCardTC = (_id: string, question: string, comments: string, cardsParams: FetchCardsPayloadType): AppThunk => (dispatch) => {
    cardsAPI.updateCard(_id, question, comments).then((res) => {
        dispatch(fetchCardsTC(cardsParams))
    }).catch((error) => {
        dispatch(setCardsErrorAC(error.response.data.error))
    })
}
export const deleteCardTC = (id: string, cardsParams: FetchCardsPayloadType): AppThunk => (dispatch) => {
    cardsAPI.deleteCard(id).then((res) => {
        dispatch(fetchCardsTC(cardsParams))
    }).catch((error) => {
        dispatch(setCardsErrorAC(error.response.data.error))
    })
}
export const sendGrade = (grade: number, card_id: string):AppThunk => (dispatch) => {
    cardsAPI.sendGrade(grade, card_id)
        .then(res => {
            const cardID = res.data._id
            const grade = res.data.grade
            dispatch(setGrade(grade, cardID))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
        })
}
export type SetCardsListActionType = {
    type: 'SET_CARDS',
    cardsList: Array<CardType>
}
export type SetCardSTotalCountActionType = {
    type: 'SET_CARD_TOTAL_COUNT'
    cardsTotalCount: number
}
export type SetCardsPageActionType = {
    type: 'CARDS/SET_PAGE'
    page: number
}

export type SetPackIdActionType = {
    type: 'CARDS/SET_PACK_ID',
    id: string
}

export type SetCardsErrorActionType = {
    type: 'CARDS/SET_ERROR',
    error: string | null
}

export type CardsActionsType =
    | SetCardsListActionType
    | SetCardSTotalCountActionType
    | SetCardsPageActionType
    | SetPackIdActionType
    | SetCardsErrorActionType
    | ReturnType<typeof setGrade>


