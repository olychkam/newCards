import React, {useEffect} from "react";
import style from "./Cards.module.css"
import {useDispatch, useSelector} from "react-redux";
import {CardType} from "../../00-API/cards-api";
import {
    addCardTC,
    CardsParamsType,
    deleteCardTC,
    fetchCardsTC,
    setCardsPageAC, setPackIdAC,
    updateCardTC
} from "../../01-redux/cards-reducer";
import Card from "./Card/Card";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../01-redux/store";
import Paginator from "../../03-Components/c4-Paginator/Paginator";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";

type RoutesParamType = {
    id: string
}
const Cards = () => {
    const dispatch = useDispatch()
    const cardsParams = useSelector<AppRootStateType, CardsParamsType>((state) => state.cards.cardsParams)
    const cards = useSelector<AppRootStateType, Array<CardType>>((state) => state.cards.cardsList)

    let {id} = useParams<RoutesParamType>()

    useEffect(() => {
        dispatch(setPackIdAC(id))
        dispatch(fetchCardsTC(cardsParams))
    }, [cardsParams.cardAnswer, cardsParams.cardQuestion, cardsParams.page, cardsParams.cardsPack_id])

    const setPage = (page: number) => {
        dispatch(setCardsPageAC(page))
    }
    const addCard = () => {
        let card = {
            answer : "this is the answer",
            question : "this is the question,",
            cardsPack_id : id,
            grade : 3,
            rating : 6,
            shots : 2,
            type : "card",
            user_id : "",
            created : "",
            updated : "",
            _v : 0,
            _id : ""
        }
        dispatch(addCardTC(card, cardsParams))
    }

    const updateCard = (_id: string) => {
        dispatch(updateCardTC(_id, "new question", "new comments", cardsParams))
    }

    const deleteCard = (_id: string) => {
        dispatch(deleteCardTC(_id, cardsParams))
    }

    return (
        <div className={style.cardsContainer}>
            <h2>Cards</h2>
            <div className={style.paginator}>
                <Paginator totalItemsCount={cardsParams.cardsTotalCount}
                           pageSize={cardsParams.pageCount}
                           currentPage={cardsParams.page}
                           onPageChanged={setPage}
                           portionSize={10}
                />
            </div>
            <div className={style.filtersContainer}>
            </div>
            <table className={style.tableContainer}>
                <tr className={style.tableHeaders}>
                    <td>Question</td>
                    <td>Answer</td>
                    <td>Grade</td>
                    <td>Updated</td>
                    <SuperButton onClick={addCard}>Add</SuperButton>
                </tr>
                {cards.map((c) => {
                    return <Card key={c._id}
                                 card={c}
                                 packId={c.cardsPack_id}
                                 updateCard={updateCard}
                                 deleteCard={deleteCard}

                    />
                })}
            </table>
        </div>
    );
}

export default Cards;
