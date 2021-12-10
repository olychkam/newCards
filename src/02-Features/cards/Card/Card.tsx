import React, {useState} from "react";
import style from "./Card.module.css"
import SuperButton from "../../../03-Components/c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../01-redux/store";
import ModalForDelete from "../../../03-Components/c6-Modal/ModalForCards/ModalForDelete";
import ModalForUpdateCard from "../../../03-Components/c6-Modal/ModalForCards/ModalForUpdateCard";
import {CardType} from "../../../01-redux/cards-reducer";

type CardPropsType = {
    card: CardType
    updateCard: (card: CardType) => void
    removeCard: (id: string) => void
}

const Card: React.FC<CardPropsType> = ({
                                           card,
                                           updateCard,
                                           removeCard
                                       }) => {

    //for modal
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [questionCard, setQuestionCard] = useState<string>('')
    const [answerCard, setAnswerCard] = useState<string>('')

    //for disabled
    const userId = useSelector<AppRootStateType, string>(state => state.profile.userData._id)
//for delete
    const deleteModalHandlerYes = () => {
        removeCard(card._id)
    }

    //for update
    const updateModalHandler = () => {
        updateCard({
            _id: card._id,
            type: 'Java',
            question: questionCard,
            answer: answerCard,
            cardsPack_id: card.cardsPack_id,
            grade: 4.54654,
            rating: 0
        })
        setActiveModalUpdate(false)
    }

    const onUpdateHandler = () => {
        setActiveModalUpdate(true)
    }

    const onRemoveHandler = () => {
        setActiveModalDelete(true)
    }

    return (
        <div className={style.card}>
            <h5>{card.question ? card.question : 'empty question'}</h5>
            <p>{card.answer ? card.answer : 'empty answer'}</p>
            <p>type of card: {card.type ? card.type : 'empty type'} </p>
            <p>grade: </p>
            <p>{card.grade}</p>
            <div className={style.button}>
                <SuperButton onClick={onUpdateHandler} disabled={card.user_id !== userId}>Update</SuperButton>
                <SuperButton onClick={onRemoveHandler} disabled={card.user_id !== userId}>Delete</SuperButton>
            </div>
            <ModalForDelete active={activeModalDelete}
                            setActive={setActiveModalDelete}
                            deleteModalHandlerYes={deleteModalHandlerYes}/>

            <ModalForUpdateCard active={activeModalUpdate}
                                setActive={setActiveModalUpdate}
                                setQuestionCard={setQuestionCard}
                                setAnswerCard={setAnswerCard}
                                updateModalHandler={updateModalHandler}/>
        </div>
    )
}

export default Card;