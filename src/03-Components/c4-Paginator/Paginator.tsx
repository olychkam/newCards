import React, {useState} from "react";
import s from "./Paginator.module.css";
import SuperButton from "../c2-SuperButton/SuperButton";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    portionSize: number
}

const Paginator: React.FC<PaginatorPropsType> = (
    {
        totalItemsCount,
        pageSize ,
        currentPage,
        onPageChanged,
        portionSize,
        ...restProps
    }

) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i ++) {
        pages.push(i)
    }

    const portionsCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionNumber = portionNumber * portionSize;

    return (
        <div className={s.paginationContainer}>
            {portionNumber > 1 &&
            <SuperButton onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Previous</SuperButton>
            }
            {
                pages.filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                    .map((p) => {
                        return <span className={s.pageNumber + " " + (currentPage === p ? s.currentPage : "")}
                            // className={s.pageNumber}
                                     key={p}
                                     onClick={(e) => onPageChanged(p)}>{p}</span>
                    })
            }
            {portionNumber < portionsCount &&
            <SuperButton onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</SuperButton>}
        </div>
    );
}

export default Paginator;
