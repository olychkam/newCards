import {instance} from "./api";

export const cardsAPI = {
    fetchCards(cardsParams: FetchCardsPayloadType) {
        return instance.get<ResponseType>(`cards/card`, {params: {...cardsParams}})
    },
    addCard(card: CardType) {
        return instance.post('cards/card', {card})
    },
    updateCard(_id: string, question: string, comments: string) {
        return instance.put('cards/card', {card: {_id, question, comments}})
    },
    deleteCard(id: string) {
        return instance.delete('cards/card', {params: {id}})
    },
    sendGrade(grade: number, card_id: string) {
        return instance.put<UpdateGradeCardResponse>('cards/grade', {grade, card_id});
    },
}
export type FetchCardsPayloadType = {
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortPack?: string
    page?: number
    pageCount?: number
}
type UpdateGradeCardResponse = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}
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

type ResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
