import React, {useCallback, useEffect, useState} from "react";
import {LearnCard} from "./LearnCard/LearnCard";
import {CardType} from "../../00-API/cards-api";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams } from "react-router-dom";
import {CardsParamsType, fetchCardsTC, sendGrade, setPackIdAC} from "../../01-redux/cards-reducer";
import {AppRootStateType} from "../../01-redux/store";
import {PATH} from "../../03-Components/Routes";

type LearningPageType = {}
const grades = ['no idea', 'forgot', 'think long', 'mix up', 'knew'];
const randomCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const LearningPage: React.FC<LearningPageType> =  React.memo(() => {
    const cards = useSelector<AppRootStateType, CardType[]>((state:any) => state.cards.cardsList)
    const isAuth=useSelector<AppRootStateType,boolean>((state:any) => state.login.isLogin)
    const {cardsPack_id} = useParams<{ cardsPack_id: string }>();
    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        //cardsPack_id : id
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        user_id: '',
        __v: 0,
        created: '',
        updated: '',
    } as CardType)
    const [firstCard, setFirstCard] = useState<boolean>(true)
    const [checked,setChecked]=useState<boolean>(false)
    const cardsParams = useSelector<AppRootStateType, CardsParamsType>((state:any) => state.cards.cardsParams)
    const dispatch = useDispatch()
    useEffect(() => {
        if (firstCard) {
            dispatch(setPackIdAC(cardsPack_id))

            dispatch(fetchCardsTC(cardsParams))
            setFirstCard(false)
        }
        if (cards.length > 0) {
            setCard(randomCard(cards))
            return () => {
                console.log('Learning Page clear effect ')
            }
        } else {

        }
    }, [cards,cardsParams.cardsPack_id, dispatch])

    const onNextCard = useCallback((grade: number) => {
        setChecked(false);
        if (cards.length > 0) {
            if(!card._id) {
                console.log('error in useCallback')
            }
            dispatch(sendGrade(grade, card._id))
            setCard(randomCard(cards))
        } else {
            alert(`Something bad 'onNextCard'`)
        }
    }, [cards, card])
    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
            <LearnCard card={card} checked={checked} grades={grades}
                       onNextCard={onNextCard} setIsChecked={setChecked} />
        </div>
    )
})