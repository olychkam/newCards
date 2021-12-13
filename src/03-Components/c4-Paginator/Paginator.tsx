import React, {useState} from 'react'
import classnames from 'classnames'
import s from './Paginator.module.css'
import SuperButton from "../c2-SuperButton/SuperButton";

type PropsType = {
    currentPage: number
    onPageChanged: (p: number) => void
    pageSize: number
    totalItemsCount: number
    portionSize?: number
}

export const Paginator: React.FC<PropsType> = (
    {currentPage, onPageChanged, pageSize, totalItemsCount, portionSize = 10}
) => {

    const pageCount = Math.ceil(totalItemsCount / pageSize)

    const pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pageCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize + 1

    const prevPortionNumberHandler = () => {
        setPortionNumber(portionNumber - 1)
    }

    const nextPortionNumberHandler = () => setPortionNumber(portionNumber + 1)

    return (
        <div className={s.usersPageNumber}>
            {portionCount > 1
            && <SuperButton onClick={prevPortionNumberHandler}>PREV</SuperButton>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, i) => {
                    return <span key={`number_items${i}`}
                                 className={classnames({
                                     [s.selected]: currentPage === p
                                 }, s.pageNumber)}
                                 onClick={() => {
                                     onPageChanged(p)
                                 }}>{p}</span>
                })}
            {portionCount > portionNumber
            && <SuperButton onClick={nextPortionNumberHandler}>NEXT</SuperButton>}
        </div>
    )
}