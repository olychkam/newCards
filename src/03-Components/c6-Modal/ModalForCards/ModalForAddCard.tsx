import React, {ChangeEvent} from 'react';
import ModalWindow from "../modal/ModalWindow";
import SuperInputText from "../../c1-SuperInputText/SuperInputText";
import SuperButton from "../../c2-SuperButton/SuperButton";


type ModalAddPropsType = {
    active: boolean,
    setActive: (active: boolean) => void
    addCardHandler: () => void,
    setNewQuestionCard: (q: string) => void,
    setNewAnswerCard: (q: string) => void,
    setTypeNewCard: (t: string) => void
}

const ModalForAddCards: React.FC<ModalAddPropsType> = ({
                                                           active,
                                                           setActive,
                                                           addCardHandler,
                                                           setNewQuestionCard,
                                                           setNewAnswerCard,
                                                           setTypeNewCard
                                                       }) => {


    const handlerForAddQuestionCard = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestionCard(e.currentTarget.value)

    }
    const handlerForAddAnswerCard = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswerCard(e.currentTarget.value)

    }
    const handlerForAddTypeCard = (e: ChangeEvent<HTMLInputElement>) => {
        setTypeNewCard(e.currentTarget.value)

    }
    const addCardHandlerCancel = () => {
        setActive(false)
    }
    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>ADD NEW CARD</h4>
            <p>QUESTION</p><SuperInputText type={'text'} onChange={handlerForAddQuestionCard}
                                           placeholder={'Write your question here'}/>
            <p>ANSWER</p> <SuperInputText type={'text'} onChange={handlerForAddAnswerCard}
                                          placeholder={'Be sure to specify the answer'}/>
            <p>TYPE</p> <SuperInputText type={'text'} onChange={handlerForAddTypeCard} placeholder={'Specify a type'}/>
            <SuperButton onClick={addCardHandler}>ADD</SuperButton>
            <SuperButton onClick={addCardHandlerCancel}>Cancel</SuperButton>
        </ModalWindow>
    </div>

}

export default ModalForAddCards;
