import {instance} from "./api";

export type PackType = {
    _id: string,
    user_id?: string,
    user_name?: string,
    private?: boolean,
    name: string,
    path?: string,
    grade?: number,
    shots?: number,
    deckCover?: string,
    cardsCount?: number,
    type: string,
    rating?: number,
    created?: string,
    updated?: string,
    more_id?: string,
    __v?: number
}

export type ResponsePackType = {
    cardPacks: Array<PackType>
    page: number
    pageCount: number
    cardPacksTotalCount: number,
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

//type for get packs
export type FetchPacksPayloadType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string | null
}

//type for post
export type CardsPackCreateType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}


export const packsAPI = {
    fetchPacks(page: number, pageCount: number, packName: string = '', min: number, max: number, user_id: string) {
        return instance.get<ResponsePackType>(`cards/pack?page=${page}&pageCount=${pageCount}&packName=${packName}&min=${min}&max=${max}&user_id=${user_id}`);
    },
    createPack(cardsPack: PackType) {
        return instance.post(`cards/pack`, {cardsPack})
            .then(response => response.data)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
            .then(response => response.data)
    },
    updatePack(cardsPack:PackType) {
        return instance.put(`cards/pack`, {cardsPack})
            .then(response => response.data)
    }
}

/*
export const packsAPI = {
    getPacks(pageCount: number = 7, page: number = 1, packName: string = '', min: number, max: number, id: string) {
        return instance.get<any>(`/cards/pack/?packName=${packName}&pageCount=${pageCount}&page=${page}&sortPacks=&min=${min}&max=${max}&user_id=${id}`)
    },
    fetchPacks(data: PacksParamsType) {
        return instance.get<ResponseType>(`cards/pack?`,
            {params: {...data}})
            .then(response => response.data)
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

export type ResponseType = {
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
*/
