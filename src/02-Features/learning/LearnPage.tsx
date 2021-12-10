import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CardType, fetchCardsTC, setCardGradeTC} from "../../01-redux/cards-reducer";
import {AppRootStateType} from "../../01-redux/store";
import {getRandomCard} from "../../05-utils/u1-error/u2-getRandomCard/getRandomCard";
import style from './LearnPage.module.css';
import {LearnCard} from "./LearnCard/LearnCard";
import ErrorSnackBar from "../../03-Components/c7-ErrorSnackBar/ErrorSnackBar";
import {useParams} from "react-router-dom";


const grades = ["Didn't know", 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

export const LearningPage: React.FC = React.memo(() => {
        const error = useSelector<AppRootStateType, string | null>(state => state.app.status)
        const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
        const [isChecked, setIsChecked] = useState<boolean>(false);
        const [first, setFirst] = useState<boolean>(true);
        const {id} = useParams<{ id: string }>();
        const dispatch = useDispatch();

        useEffect(() => {
            if (first) {
                dispatch(fetchCardsTC(id))
                setFirst(false)
            }
            if (cards.length > 0) {
                setCard(getRandomCard(cards))
                return () => {
                    console.log('Learning Page clear effect ')
                }
            } else {

            }
        }, [cards, dispatch])


        const [card, setCard] = useState<CardType>({
            _id: 'fake',
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
        });

        useEffect(() => {
            if (first) {
                dispatch(fetchCardsTC(card.cardsPack_id));
                setFirst(false);
            }
            if (cards && cards.length > 0) setCard(getRandomCard(cards));
            return () => {
            }
        }, [dispatch, cards, first]);

        const onNext = useCallback((grade: number) => {
            setIsChecked(false);
            if (cards.length > 0) {
                if (!card._id) {
                    console.log('error in useCallback')
                }
                dispatch(setCardGradeTC(grade, card._id))
                setCard(getRandomCard(cards))
            } else {
                alert(`Something bad 'onNextCard'`)
            }
        }, [cards, card])


        return (
            <div className={style.pageContainer}>
                {cards.length > 0 && <LearnCard card={card}
                                                grades={grades}
                                                checked={isChecked}
                                                setIsChecked={setIsChecked}
                                                onNextCard={onNext}/>
                }
                {error && <ErrorSnackBar errorMessage={error}/>}
            </div>
        )
    }
)
