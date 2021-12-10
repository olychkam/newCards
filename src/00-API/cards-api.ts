import {instance} from './api';
import {CardType} from "../01-redux/cards-reducer";

type GetCardsResponseType = {
    cards: CardType[],
    page: number,
    pageCount: number,
    cardsTotalCount: number,
    packUserId: string,
}

type DeleteCardResponseType = {
    deletedCard: {
        cardsPack_id: string
    }
}

type UpdatedCardResponseType = {
    updatedCard: {
        cardsPack_id: string
    }
}

type UpdateGradeCardResponse = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

export const cardsAPI = {
    fetchCards(id: string) {
        return instance.get<GetCardsResponseType>(`cards/card?cardsPack_id=${id ? id : ''}`)
    },
    createCard(card: CardType) {
        return instance.post(`cards/card`, {card})
            .then(response => response.data)
    },
    deleteCard(id: string) {
        return instance.delete<DeleteCardResponseType>(`cards/card?id=${id}`)
            .then(response => {
                return response.data
            })
    },
    updateCard(card: CardType) {
        return instance.put<UpdatedCardResponseType>(`cards/card`, {card})
            .then(response => response.data)
    },
    setCardGrade(grade: number, card_id: string) {
        return instance.put<UpdateGradeCardResponse>(`cards/grade`, {grade, card_id})
    }
}