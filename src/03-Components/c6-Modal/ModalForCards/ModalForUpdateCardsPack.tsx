import React, {ChangeEvent} from 'react';
import ModalWindow from '../modal/ModalWindow';
import SuperInputText from "../../c1-SuperInputText/SuperInputText";
import SuperButton from "../../c2-SuperButton/SuperButton";


type ModalUpdatePropsType = {
    active: boolean,
    setActive: (active: boolean) => void,
    setTitleCard: (t: string) => void,
    updateModalHandler: () => void
}

const ModalForUpdateCardsPack: React.FC<ModalUpdatePropsType> = ({setActive, active, setTitleCard, updateModalHandler}) => {

    const handlerForUpdateTitleCard = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleCard(e.currentTarget.value)
    }
    const updateModalHandlerCancel = () => {
        setActive(false)
    }
    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>HERE YOU CAN CHANGE THIS PACK</h4>
            <SuperInputText type={'text'} onChange={handlerForUpdateTitleCard} placeholder={'Write a new title for pack'}/>
            <SuperButton onClick={updateModalHandler}>Update</SuperButton>
            <SuperButton onClick={updateModalHandlerCancel}>Cancel</SuperButton>
        </ModalWindow>
    </div>
}

export default ModalForUpdateCardsPack;