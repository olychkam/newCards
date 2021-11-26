import {CardCreateType, cardsAPI, CardType, FetchCardsPayloadType, ResponseCardType} from "../00-API/cards-api";
import {AppThunkType} from "./store";
import {setAppStatusAC, setIsInitializedAC} from "./app-reducer";


export type CardsReducerActionType = ReturnType<typeof setCardsDataAC> | ReturnType<typeof setCardGradeAC>

const initialState = {} as ResponseCardType

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
            return {
                ...state, ...action.cardsData
            }
        case "CARDS/SET_CARD_GRADE":
            return {
                ...state,
                cards: state.cards.map(c => c.cardsPack_id === action.id ? {...c, grade: action.grade} : c)
            }
        default:
            return state
    }
}

const setCardsDataAC = (cardsData: ResponseCardType) =>
    ({type: 'CARDS/SET_CARDS', cardsData} as const)
const setCardGradeAC = (grade: number, id: string) =>
    ({type: 'CARDS/SET_CARD_GRADE', grade, id} as const)

export const fetchCardsTC = (data: FetchCardsPayloadType): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.fetchCards({...data})
        .then(response => {
            dispatch(setCardsDataAC(response))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const createCardTC = (card: Partial<CardCreateType>): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.createCard(card)
        .then(response => {
            const {cardsPack_id} = response.newCard
            dispatch(fetchCardsTC({cardsPack_id}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const updateCardTC = (_id: string, question: string, answer: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.updateCard(_id, question, answer)
        .then(response => {
            const {cardsPack_id} = response.updatedCard
            dispatch(fetchCardsTC({cardsPack_id}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const deleteCardTC = (id: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.deleteCard(id)
        .then(response => {
            const {cardsPack_id} = response.deletedCard
            dispatch(fetchCardsTC({cardsPack_id}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const setCardGradeTC = (grade: number, id: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.setCardGrade(grade, id)
        .then(response => {
            const id = response.data.updatedGrade.card_id
            const grade = response.data.updatedGrade.grade
            dispatch(setCardGradeAC(grade, id))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}
