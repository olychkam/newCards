import React, {ChangeEvent} from 'react';
import ModalWindow from "./ModalWindow";
import SuperInputText from "../../c1-SuperInputText/SuperInputText";
import SuperButton from "../../c2-SuperButton/SuperButton";


type ModalAddPropsType = {
    active: boolean,
    setActive: (active: boolean) => void
    addPackHandler: () => void,
    setNamePack: (e: string) => void,
    setTypeNewPack: (e: string) => void
}

const ModalForAddPack: React.FC<ModalAddPropsType> = ({
                                                          active, setActive,
                                                          addPackHandler, setNamePack, setTypeNewPack
                                                      }) => {


    const handlerForAddNamePack = (e: ChangeEvent<HTMLInputElement>) => {
        setNamePack(e.currentTarget.value)

    }
    const handlerForAddTypeNewPack = (e: ChangeEvent<HTMLInputElement>) => {
        setTypeNewPack(e.currentTarget.value)

    }

    const addCardHandlerCancel = () => {
        setActive(false)
    }
    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>ADD NEW PACK</h4>
            <p>TITLE NEW PACK</p><SuperInputText type={'text'} onChange={handlerForAddNamePack}
                                                     placeholder={'Write title here'}/>
            <p>TYPE NEW PACK</p> <SuperInputText type={'text'} onChange={handlerForAddTypeNewPack}
                                                     placeholder={'Write type of card pack here'}/>
            <SuperButton onClick={addPackHandler}>ADD</SuperButton>
            <SuperButton onClick={addCardHandlerCancel}>CANCEL</SuperButton>
        </ModalWindow>
    </div>

}

export default ModalForAddPack;