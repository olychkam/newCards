import {instance} from "./api";
import {PacksParamsType} from "../01-redux/packs-reducer";

export const packsAPI = {
    fetchPacks(packsParams: PacksParamsType) {
        return instance.get<ResponseType>('cards/pack', {params: {...packsParams}});
    },
    addPack() {
        return instance.post('cards/pack', {cardsPack: {name: "Testik 2", type: "pack"}})
    },
    updatePack(_id: string) {
        return instance.put('cards/pack', {cardsPack: {_id, name: "Testik 2 changed"}})
    },
    deletePack(id: string) {
        return instance.delete('cards/pack', {params: {id}})
    }
}

type ResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type PackType = {
    cardsCount: number
    created: string
    deckCover: null | string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
