import React from 'react';
import SuperButton from "../../c2-SuperButton/SuperButton";
import ModalWindow from "../modal/ModalWindow";


type ModalDeletePropsType = {
    active: boolean,
    setActive: (active: boolean) => void,
    deleteModalHandlerYes: () => void
}

const ModalForDelete: React.FC<ModalDeletePropsType> = ({deleteModalHandlerYes, setActive, active}) => {
    const deleteModalHandlerNo = () => {
        setActive(false)
    }
    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>ARE YOU SURE?</h4>
            <SuperButton onClick={deleteModalHandlerYes}>Yes</SuperButton>
            <SuperButton onClick={deleteModalHandlerNo}>No</SuperButton>
        </ModalWindow>
    </div>

}

export default ModalForDelete;