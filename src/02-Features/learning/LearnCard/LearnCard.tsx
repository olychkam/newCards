import React from "react";
import {CardType} from "../../../00-API/cards-api";
import SuperButton from "../../../03-Components/c2-SuperButton/SuperButton";

type LearnCardType = {
    card:CardType
    checked:boolean
    grades: string[]
    setIsChecked:(value:boolean)=>void
    onNextCard:(value:number)=>void

}
export const LearnCard: React.FC<LearnCardType> = (props) => {
    const nextCard = (value: number) => {
        props.onNextCard(value)
    }
    const mappedButton = props.grades.map((el, i) => (
        <SuperButton key={i}
                onClick={(e) => nextCard(i + 1)}>{el}</SuperButton>
    ))

    return (
    <div>
        <h4>Question</h4>
        <h3>{props.card.question}</h3>
        <span>id:{props.card._id}</span>
        <div>
            {
                !props.checked && <SuperButton onClick={(e) =>
                    props.setIsChecked(true)}>CHECK</SuperButton>
            }
        </div>
        <div>
        {
            props.checked && (
                <div>
                    <hr/>
                    <h4>Answer: {props.card.answer}</h4>
                    <p>Type: {props.card.type}</p>
                    <p>Grade: {props.card.grade}</p>
                    <div>
                        {
                            mappedButton
                        }
                    </div>

                </div>
            )
        }
    </div>
    </div>
    )
}
