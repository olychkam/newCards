import {cardsAPI} from "../00-API/cards-api";
import {AppActionType, AppThunkType} from "./store";
import {setAppStatusAC, setIsInitializedAC} from "./app-reducer";
import {addCardPacks} from "./packs-reducer";


export type CardsReducerActionType = ReturnType<typeof setCards>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof setGrade>
    | ReturnType<typeof createCard>
export type CardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    rating: number,
    shots?: number,
    type: string,
    user_id?: string,
    created?: string,
    updated?: string,
    __v?: 0,
    _id: string,
}

export type CardsFilterType = {
    packName: string
    min: number
    max: number
}

const initialState = {
    cards: [] as CardType[],
    page: 1,
    pageCount: 3,
    cardsTotalCount: 5,
    packUserId: '',
    filter: {
        packName: '',
        min: 0,
        max: 15,
    } as CardsFilterType
} as const

export type CardsInitialStateType = typeof initialState

export const cardsReducer = (state: CardsInitialStateType = initialState, action: CardsReducerActionType) => {
    switch (action.type) {
        case 'CARDS/CARDS/SET-FILTER':
        return {...state, filter: action.payload.filter}
        case 'CARDS/CARDS/SET-CARDS':
            return {...state, cards: action.cards}
        case 'CARDS/CARDS/ADD-CARD':
            return {...state, cards: [action.newCard, ...state.cards]}
        case 'CARDS/CARDS/SET-GRADE':
            return {
                ...state,
                cards: state.cards.map(
                    (card, i) => card._id === action.payload.id
                        ? {...card, grade: action.payload.grade}
                        : card
                )
            }

        default:
            return state
    }
}
export const setCards = (cards: CardType[]) => ({type: 'CARDS/CARDS/SET-CARDS', cards} as const)

export const createCard = (newCard: CardType) => ({type: 'CARDS/CARDS/ADD-CARD', newCard} as const)

export const setFilter = (filter: CardsFilterType) => ({
    type: 'CARDS/CARDS/SET-FILTER', payload: {
        filter
    }
} as const)

export const setGrade = (grade: number, id: string) => ({
    type: 'CARDS/CARDS/SET-GRADE',
    payload: {
        id,
        grade
    }
} as const)

export const fetchCardsTC = (cardsPackId: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.fetchCards(cardsPackId)
        .then(response => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setCards(response.data.cards))
        })
}
export const createCardTC = (card: CardType): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.createCard(card)
        .then(() => {
            //const {cardsPack_id} = response.data
            dispatch(fetchCardsTC(card.cardsPack_id))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const updateCardTC = (card: CardType): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.updateCard(card)
        .then(() => {
            /*
                        const {cardsPack_id} = response.updatedCard
            */
            dispatch(fetchCardsTC(card.cardsPack_id))
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
            dispatch(fetchCardsTC(cardsPack_id))
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
        .then(res => {
            const id = res.data._id
            const grade = res.data.grade
            dispatch(setGrade(grade, id))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}
