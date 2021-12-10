import React, {ChangeEvent} from 'react';
import ModalWindow from "../modal/ModalWindow";
import SuperInputText from "../../c1-SuperInputText/SuperInputText";
import SuperButton from "../../c2-SuperButton/SuperButton";



type ModalUpdatePropsType = {
    active: boolean,
    setActive: (active: boolean) => void,
    setQuestionCard: (q: string) => void,
    setAnswerCard: (a: string) => void,
    updateModalHandler: () => void
}

const ModalForUpdateCard: React.FC<ModalUpdatePropsType> = ({setActive, active, setQuestionCard, setAnswerCard, updateModalHandler}) => {
    const handlerForUpdateQuestionCard = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionCard(e.currentTarget.value)
    }
    const handlerForUpdateAnswerCard = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerCard(e.currentTarget.value)
    }
    const updateModalHandlerCancel = () => {
        setActive(false)
    }

    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>YOU CAN DO SOME CHANGES</h4>
            <SuperInputText type={'text'} onChange={handlerForUpdateQuestionCard}
                                placeholder={'Here you can update question'}/>
            <SuperInputText type={'text'} onChange={handlerForUpdateAnswerCard}
                                placeholder={'Here you can update answer'}/>
            <SuperButton onClick={updateModalHandler}>Update</SuperButton>
            <SuperButton onClick={updateModalHandlerCancel}>Cancel</SuperButton>
        </ModalWindow>
    </div>
}

export default ModalForUpdateCard;