import React, {useEffect, useMemo, useState} from "react";
import style from "./Cards.module.css"
import {useDispatch, useSelector} from "react-redux";
import {CardCreateType, CardType} from "../../00-API/cards-api";
import {
    createCardTC,
    deleteCardTC,
    fetchCardsTC,
    updateCardTC
} from "../../01-redux/cards-reducer";
import Card from "./Card/Card";
import {Redirect, RouteComponentProps, useParams, withRouter} from "react-router-dom";
import {AppRootStateType} from "../../01-redux/store";
import Paginator from "../../03-Components/c4-Paginator/Paginator";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";
import {PATH} from "../../03-Components/Routes";
import {selectorIsLoggedIn} from "../../01-redux/selectors/auth-selector";
import GreenModal from "../../03-Components/c6-Modal/modal/GreenModal";
import {EditCard} from "./EditCard/EditCard";
import {PaginatorContainer} from "../../03-Components/c4-Paginator/PaginatorContainer";
import {TableContainer} from "../../03-Components/с10-table/TableContainer";
import Search from "../../03-Components/c5-Search/Search";
import {setSearchValueAC} from "../../03-Components/c5-Search/filter-reducer";
import styles from './Cards.module.css'

type PathParamsType = {
    cardsPack_id: string
}
type PropsType = RouteComponentProps<PathParamsType>

const Cards: React.FC<PropsType> = (props) => {

    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.cards.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const searchName = useSelector<AppRootStateType, string>(state => state.filter.search)
    const dispatch = useDispatch()

    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const closeEditModal = () => {
        setShowAddModal(false)
    }

    useEffect(() => {
        dispatch(fetchCardsTC({cardsPack_id: props.match.params.cardsPack_id}))
    }, [dispatch, props.match.params.cardsPack_id])

    const titles = useMemo(() => {
        if (cards && cards[0]?.user_id === myId) {
            return ['Question', 'Answer', 'LastUpdate', 'Grade', 'Actions']
        } else {
            return ['Question', 'Answer', 'LastUpdate', 'Grade']
        }
    }, [cards, myId]);

    const addCard = (id: string, question: string, answer: string) => {
        const card: Partial<CardCreateType> = {
            cardsPack_id: id,
            question: question,
            answer: answer,
        }
        dispatch(createCardTC(card))
    }

    const pageClickCardsHandler = (page: number) => {
        dispatch(fetchCardsTC({cardsPack_id: props.match.params.cardsPack_id, page}))
    }

    const pagesCountCardsChange = (pageCount: number) => {
        dispatch(fetchCardsTC({cardsPack_id: props.match.params.cardsPack_id, pageCount}))
    }

    const deleteCard = (id: string) => {
        dispatch(deleteCardTC(id))
    }

    const updateCard = (id: string, question: string, answer: string) => {
        dispatch(updateCardTC(id, question, answer))
    }

    const getCardsWithFilters = () => {
        dispatch(fetchCardsTC({cardsPack_id: props.match.params.cardsPack_id, cardQuestion: searchName}))
    }

    return (
        <div className={styles.cardsContainer}>
            <h3>Cards Page</h3>
            <div className={styles.searchBlock}>
                <div className={styles.search}>
                    <Search setFilteredResults={value => dispatch(setSearchValueAC(value))}/>
                </div>
                <div className={styles.buttonsBlock}>
                    <SuperButton  onClick={() => getCardsWithFilters()}/>
                    <SuperButton  onClick={() => {
                        setShowAddModal(true)
                    }}/>
                </div>
            </div>
            <TableContainer type="card"
                            titles={titles}
                            deleteCallback={deleteCard}
                            cards={cards}
                            updateCardCallback={updateCard}
            />
            <div>
                <PaginatorContainer pageClickHandler={pageClickCardsHandler}
                                    pagesCountChange={pagesCountCardsChange}
                                    totalCount={cardsTotalCount}
                                    page={page}
                                    pageCount={pageCount}
                />
            </div>
            {showAddModal &&
            <GreenModal onModalClose={() => setShowAddModal(false)} childrenWidth={413}
                        childrenHeight={540}>
                <EditCard closeEditModal={closeEditModal} cardId={props.match.params.cardsPack_id}
                          updatePack={addCard}/>
            </GreenModal>}
        </div>);
}

export default withRouter(Cards)