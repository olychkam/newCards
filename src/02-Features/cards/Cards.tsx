import React, {useEffect, useState} from "react";
import style from "./Cards.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    CardType,
    createCardTC,
    deleteCardTC, fetchCardsTC,
    updateCardTC
} from "../../01-redux/cards-reducer";
import Card from "./Card/Card";
import {RouteComponentProps, useParams} from "react-router-dom";
import {AppRootStateType} from "../../01-redux/store";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";
import ModalForAddCards from "../../03-Components/c6-Modal/ModalForCards/ModalForAddCard";


export const Cards: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const dispatch = useDispatch()

    //for modal
    const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)
    const [newQuestionCard, setNewQuestionCard] = useState<string>('')
    const [newAnswerCard, setNewAnswerCard] = useState<string>('')
    const [typeNewCard, setTypeNewCard] = useState<string>('undefined')

    useEffect(() => {
        dispatch(fetchCardsTC(id))
    }, [])

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    const cardTestObj: CardType = {
        _id: genID(2),
        type: typeNewCard,
        question: newQuestionCard,
        answer: newAnswerCard,
        cardsPack_id: id,
        grade: 4.54654,
        rating: 0
    }

    const addCardHandler = () => {
        dispatch(createCardTC(cardTestObj))
        setActiveModalAdd(false)
    }
    const onAddCard = () => {
        setActiveModalAdd(true)
    }

    const removeCard = (id: string) => {
        dispatch(deleteCardTC(id))
    }

    const changeCard = (card: CardType) => {
        dispatch(updateCardTC(card))
    }

    const mappedCards = cards.map((card: CardType) => <Card key={card._id}
                                                            card={card}
                                                            updateCard={changeCard}
                                                            removeCard={removeCard}/>)

    return <>
        <div className={style.cardsPage}>
            <div>
                <h4> AVAILABLE CARDS </h4>
            </div>
            <div className={style.cardsBlock}>
                {
                    mappedCards
                }
            </div>
            <div className={style.search}>
                <SuperButton onClick={onAddCard}>Add Card</SuperButton>
            </div>
        </div>
        <ModalForAddCards active={activeModalAdd} setActive={setActiveModalAdd} addCardHandler={addCardHandler}
                          setNewQuestionCard={setNewQuestionCard} setNewAnswerCard={setNewAnswerCard}
                          setTypeNewCard={setTypeNewCard}/>
    </>
}