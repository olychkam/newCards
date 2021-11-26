import React, {useCallback, useEffect, useState} from "react";
import {CardType, ResponseCardType} from "../../00-API/cards-api";
import {useDispatch, useSelector} from "react-redux";
import {fetchCardsTC, setCardGradeTC} from "../../01-redux/cards-reducer";
import {AppRootStateType} from "../../01-redux/store";
import {PackType} from "../../00-API/packs-api";
import {getRandomCard} from "../../05-utils/u1-error/u2-getRandomCard/getRandomCard";
import styles from './LearnPage.module.css';

type LearnPagePropsType = {
    cardsPack_id: string
    onModalClose: () => void
}

const grades = ["Didn't know", 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

const LearnPage: React.FC<LearnPagePropsType> = (props) => {
    const {cardsPack_id} = props
    const packName = useSelector<AppRootStateType, PackType | undefined>(state => state.packs.cardPacks && state.packs.cardPacks.find(pack => pack._id === cardsPack_id));
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [grade, setGrade] = useState(grades.indexOf(grades[0]) + 1)
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

    const dispatch = useDispatch();
    useEffect(() => {
        if (first) {
            dispatch(fetchCardsTC({cardsPack_id}));
            setFirst(false);
        }
        if (cards && cards.length > 0) setCard(getRandomCard(cards));
        return () => {
        }
    }, [dispatch, cardsPack_id, cards, first]);

    const onNext = (grade: number, id: string) => {
        setIsChecked(false);
        dispatch(setCardGradeTC(grade, id))
        if (cards && cards.length > 0) {
            setCard(getRandomCard(cards));
        }
    }

    const checkAnswer = () => {
        setIsChecked(true)
    }

    return (
        <div className={styles.learnPageContainer}>
            <h3>Learn "{packName?.name}"</h3>
            {!isChecked &&
            <div className={styles.questionBlock}>
                <h4>Question: "{card.question}"</h4>
                <div className={styles.buttonsBlock}>
                    <button className={styles.cancelBtn} onClick={props.onModalClose}>cancel</button>
                    <button className={styles.saveBtn} onClick={checkAnswer}>show answer</button>
                </div>
            </div>
            }
            {isChecked && (
                <div className={styles.answerBlock}>
                    <h4>Question: "{card.question}"</h4>
                    <h4>Answer: "{card.answer}"</h4>
                    <div className={styles.answer}>
                        <h4>Rate yourself: </h4>
                        {/* <SuperRadio name={'radio'}
                                    value={grade}
                                    options={grades}
                                    onChangeOption={setGrade}/>
                    </div>*/}
                        <div className={styles.buttonsBlock}>
                            <button className={styles.cancelBtn} onClick={props.onModalClose}>cancel</button>
                            <button className={styles.saveBtn} onClick={() => onNext(grade, card._id)}>next</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default LearnPage;
