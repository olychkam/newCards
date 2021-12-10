import React from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import CellWithButtons from "./CellWithButtons";
import {Table} from "./Table";
import {PackType} from "../../00-API/packs-api";
import {AppRootStateType} from "../../01-redux/store";
import {PATH} from "../Routes";
import {CardType} from "../../01-redux/cards-reducer";


type TableContainerPropsType = {
    type: "pack" | "card"
    packs?: PackType[]
    cards?: CardType[]
    titles: string[]
    deleteCallback: (id: string) => void
    updateCardsPackCallback?: (id: string, packName: string) => void
    updateCardCallback?: (id: string, question: string, answer: string) => void
}
export const TableContainer: React.FC<TableContainerPropsType> = (props) => {

    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)

    const updateCardsPackName = (id: string, packName: string) => {
        props.updateCardsPackCallback && props.updateCardsPackCallback(id, packName)
    }
    const updateCard = (id: string, question: string, answer: string) => {
        props.updateCardCallback && props.updateCardCallback(id, question, answer)
    }

    const array = [];

    if (props.packs) {
        for (let i = 0; i < props.packs.length; i++) {
            let arr = []
            arr.push(<NavLink to={`${PATH.CARDS}/` + props.packs[i]._id}> {props.packs[i].name}</NavLink>)
            arr.push(props.packs[i].cardsCount)
/*
            arr.push(props.packs[i].updated.slice(0, -14))
*/
            arr.push(props.packs[i].user_name)
            arr.push(
                <CellWithButtons deleteCardsPack={props.deleteCallback}
                                 updateCardsPackName={updateCardsPackName}
                                 id={props.packs[i]._id}
                                 isOwn={props.packs[i].user_id === myId}
                                 name={props.packs[i].name}
                                 type="pack"/>
            )
            array.push(arr)
        }
    }
    if (props.cards) {
        for (let i = 0; i < props.cards.length; i++) {
            let arr = []
            arr.push(props.cards[i].question.length > 30 ? props.cards[i].question.slice(0, 30) + "..." : props.cards[i].question)
            arr.push(props.cards[i].answer.length > 68 ? props.cards[i].answer.slice(0, 68) + "..." : props.cards[i].answer)
            //arr.push(props.cards[i].updated.slice(0, -14))
            arr.push(props.cards[i].grade)
            arr.push(
                <CellWithButtons deleteCardsPack={props.deleteCallback}
                                 updateCard={updateCard}
                                 id={props.cards[i]._id}
                                 isOwn={props.cards[i].user_id === myId}
                                 answer={props.cards[i].answer}
                                 question={props.cards[i].question}
                                 type="card"/>
            )
            array.push(arr)
        }
    }

    return (
        <div>
{/*
            <Table titleColumns={props.titles} items={array}/>
*/}

        </div>
    )
}