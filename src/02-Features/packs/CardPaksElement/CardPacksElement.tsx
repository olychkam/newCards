import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import s from './CardPacksElement.module.css'
import {PackType} from "../../../00-API/packs-api";
import {AppRootStateType} from "../../../01-redux/store";
import SuperButton from "../../../03-Components/c2-SuperButton/SuperButton";
import {PATH} from "../../../03-Components/Routes";
import ModalForDelete from "../../../03-Components/c6-Modal/ModalForCards/ModalForDelete";
import ModalForUpdateCardsPack from "../../../03-Components/c6-Modal/ModalForCards/ModalForUpdateCardsPack";

type CardPropsType = {
    pack: PackType
    updateCardPacks: (cardsPack:PackType) => void
    removeCardPacks: (id: string) => void
}

const CardPacksElement: React.FC<CardPropsType> = (
    {
        pack,
        updateCardPacks,
        removeCardPacks,
    }) => {

    const onUpdateHandler = () => {
        setActiveModalUpdate(true)
    }
    const onRemoveHandler = () => {
        setActiveModalDelete(true)
    }

    //for modal
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [titleCard, setTitleCard] = useState<string>('')
    //for delete
    const deleteModalHandlerYes = () => {
        removeCardPacks(pack._id)
    }

    //for update
    const updateModalHandler = () => {
        updateCardPacks && updateCardPacks({_id: pack._id, name: titleCard, type: 'bla-type'})
        setActiveModalUpdate(false)
        setTitleCard('')
    }
    //for disabled
    const userId = useSelector<AppRootStateType, string>(state => state.profile.userData._id)

    return (<>
            <tr>
                <td>{pack.name}</td>
                <td>{pack.cardsCount ? pack.cardsCount : `empty`}</td>
                <td><SuperButton onClick={onUpdateHandler} disabled={pack.user_id !== userId}>Update</SuperButton></td>
                <td><SuperButton onClick={onRemoveHandler} disabled={pack.user_id !== userId}>Delete</SuperButton></td>
                <td><NavLink className={s.inactive} activeClassName={s.active}
                             to={PATH.LEARNING + '/' + pack._id}>Learn</NavLink></td>
                <td><NavLink className={s.inactive} activeClassName={s.active}
                             to={PATH.CARDS + '/' + pack._id}>Cards</NavLink></td>
            </tr>
            <ModalForDelete active={activeModalDelete} setActive={setActiveModalDelete}
                                     deleteModalHandlerYes={deleteModalHandlerYes}/>
            <ModalForUpdateCardsPack active={activeModalUpdate} setActive={setActiveModalUpdate}
                                     setTitleCard={setTitleCard}
                                     updateModalHandler={updateModalHandler}/>
        </>
    )
}

export default CardPacksElement
