import React from "react";
import SuperButton from "../../../03-Components/c2-SuperButton/SuperButton";
import {CardType} from "../../../01-redux/cards-reducer";

type LearnCardElementPropsType = {
    card: CardType,
    checked: boolean,
    setIsChecked: (value: boolean) => void
    onNextCard: (value: number) => void
    grades: string[]
}

export const LearnCard: React.FC<LearnCardElementPropsType> = (
    {
        card,
        checked,
        setIsChecked,
        onNextCard,
        grades
    }
) => {

    const nextCard = (value: number) => {
        onNextCard(value)
    }

    const mappedButton = grades.map((el, i) => (
        <SuperButton key={i}
                onClick={(e) => nextCard(i + 1)}>{el}</SuperButton>
    ))

    return (
        <div>
            <h5>QUESTION</h5>
            <span>{card.question}</span>
            <p>ID карты: {card._id}</p>
            <div>
                {
                    !checked && <SuperButton onClick={(e) => setIsChecked(true)}>CHECK</SuperButton>
                }
            </div>
            <div>
                {
                    checked && (
                        <div>
                            <hr/>
                            <p>Answer: {card.answer}</p>
                            <p>Type: {card.type}</p>
                            <p>Grade: {card.grade}</p>
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
