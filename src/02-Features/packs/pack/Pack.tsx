import React from "react";
import {PackType} from "../../../00-API/packs-api";
import {NavLink} from "react-router-dom";
import style from "./Pack.module.css"
import SuperButton from "../../../03-Components/c2-SuperButton/SuperButton";
import {PATH} from "../../../03-Components/Routes";

type PackPropsType = {
    pack: PackType
    updatePack: (id: string) => void
    deletePack: (id: string) => void
}

const Pack: React.FC<PackPropsType> = (props) => {
    const onUpdateClick = () => {
        props.updatePack(props.pack._id)
    }
    const onDeleteClick = () => {
        props.deletePack(props.pack._id)
    }
    const id = props.pack._id

    return (
        <>
            <tr className={style.packItem}>
                <td>{props.pack.name}</td>
                <td>{props.pack.cardsCount}</td>
                <td>{props.pack.updated}</td>
                <SuperButton onClick={onUpdateClick}>update</SuperButton>
                <SuperButton onClick={onDeleteClick}>delete</SuperButton>
                <td><NavLink
                    to={`${PATH.CARDS}/${id}`}
                >cards</NavLink></td>
                <td><NavLink
                    to={`${PATH.LEARNING}/${props.pack._id}`}
                >learn</NavLink></td>
            </tr>

        </>
    );
}

export default Pack;
