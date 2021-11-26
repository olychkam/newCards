import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CardsPackCreateType, PackType} from "../../00-API/packs-api";
import {AppRootStateType} from "../../01-redux/store";
import Search from "../../03-Components/c5-Search/Search";
import {createCardsPackTC, deleteCardsPackTC, fetchPacksTC, updateCardsPackTC} from "../../01-redux/packs-reducer";
import {CircularProgress} from "@material-ui/core";
import {SuperDoubleRangeContainer} from "../../03-Components/c9-SuperDoubleRange/SuperDoubleRangeContainer";
import {setSearchValueAC} from "../../03-Components/c5-Search/filter-reducer";
import style from './Packs.module.css';
import {PaginatorContainer} from "../../03-Components/c4-Paginator/PaginatorContainer";
import {TableContainer} from "../../03-Components/с10-table/TableContainer";

export const Packs: React.FC = () => {

    //data from redux
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const searchName = useSelector<AppRootStateType, string>(state => state.filter.search)
    const minFilter = useSelector<AppRootStateType, number>(state => state.filter.min)
    const maxFilter = useSelector<AppRootStateType, number>(state => state.filter.max)

    const dispatch = useDispatch()

    const [id, setId] = useState<null | string>(null)
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const count = id === myId ? cardPacksTotalCount : pageCount

    useEffect(() => {
        dispatch(fetchPacksTC({pageCount, user_id: id, min: minFilter, max: maxFilter, packName: searchName}))
    }, [dispatch, id, minFilter, maxFilter, searchName])

    const titles = useMemo(() => ['Name', 'Cards', 'LastUpdate', 'Created By', 'Actions'], []);

    const addCardsPack = (name: string) => {
        let cardsPack: Partial<CardsPackCreateType> = {
            name
        }
        dispatch(createCardsPackTC(cardsPack, pageCount, id))
    }
    const deleteCardsPack = (packId: string) => {
        dispatch(deleteCardsPackTC(packId, pageCount, id))
    }
    const updateCardsPackName = (packId: string, packName: string) => {
        dispatch(updateCardsPackTC(packId, packName, pageCount, id))
    }
    const pageClickPacksHandler = (page: number, count: number) => {
        dispatch(fetchPacksTC({
            page,
            user_id: id,
            pageCount: count,
            min: minFilter,
            max: maxFilter,
            packName: searchName
        }))
    }

    const pagesCountPacksChange = (pageCount: number) => {
        dispatch(fetchPacksTC({pageCount, user_id: id, min: minFilter, max: maxFilter, packName: searchName}))
    }
    const getPacksWithFilters = () => {
        dispatch(fetchPacksTC({packName: searchName, user_id: id, min: minFilter, max: maxFilter, pageCount: count}))
    }


    if (!packs) {
        return <CircularProgress/>
    }
    if (!isInitialized) {
        return <CircularProgress/>
    }

    return (
        <div className={style.packsContainer}>
            <div className={style.filtersBlock}>
                <div>
                    <h3>Show packs cards</h3>
                    <div className={style.buttonsBlock}>
                        <button onClick={() => setId(myId)}
                                className={id ? `${style.activeButton}` : `${style.inactiveButton}`}>
                            My
                        </button>
                        <button onClick={() => setId(null)}
                                className={id ? `${style.inactiveButton}` : `${style.activeButton}`}>
                            All
                        </button>
                    </div>
                </div>
                <div>
                    <h3>Number of cards</h3>
                    <div className={style.range}>
                        <SuperDoubleRangeContainer/>
                    </div>
                </div>
            </div>
            <div className={style.packsBlock}>
                <h3>Packs list</h3>
                <div className={style.searchBlock}>
                    <div className={style.search}>
                        <Search setFilteredResults={value => dispatch(setSearchValueAC(value))}/>
                    </div>
                    <div className={style.buttons}>
                        <button onClick={() => getPacksWithFilters()}>search</button>
                        <button onClick={() => setShowEditModal(true)}>add</button>
                    </div>
                </div>
                <TableContainer
                    packs={packs}
                    deleteCallback={deleteCardsPack}
                    updateCardsPackCallback={updateCardsPackName}
                    titles={titles}
                    type="pack"
                />
                <PaginatorContainer pagesCountChange={pagesCountPacksChange}
                                    pageClickHandler={pageClickPacksHandler}
                                    totalCount={cardPacksTotalCount}
                                    page={page}
                                    pageCount={pageCount}
                />
            </div>{/*
            {showEditModal && <Modal childrenHeight={233}
                                     childrenWidth={400}
                                     onSaveClick={(value) => {
                                         addCardsPack(value);
                                         setShowEditModal(false);
                                     }}
                                     onModalClose={() => setShowEditModal(false)}
                                     type={'input'}
                                     header={'Add new pack'}
                                     buttonTitle={'Save'}
                                     inputTitle={'Name pack'}/>*/}
        </div>
    );
}


/*

const Packs = () => {
    const dispatch = useDispatch()
    const packsParams = useSelector<AppRootStateType, PacksParamsType>((state: any) => state.packs.)
    const packs = useSelector<AppRootStateType, Array<PackType>>((state: any) => state.packs.packsList)
    const isAuth = useSelector<AppRootStateType>((state) => state.login.isLogin)
    const pagination = useSelector<AppRootStateType, PacksParamsType>((state) => state.packs.packsParams)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.appState.status)
    const userID = useSelector<AppRootStateType, string>(state => state.login.user._id)
    const [id, setId] = useState<null | string>(null)


    useEffect(() => {
        dispatch(fetchPacksTC(packsParams))
    }, [packsParams.packName, packsParams.page])

    const setFilteredResults = (packName: string) => {
        dispatch(SetPacksSearchTermAC(packName))
    }
    const setPage = (page: number) => {
        dispatch(setPageAC(page))
    }

    const addPack = () => {
        dispatch(addPackTC(packsParams))
    }
    const updatePack = (id: string) => {
        dispatch(updatePackTC(id, packsParams))
    }
    const deletePack = (id: string) => {
        dispatch(deletePackTC(id, packsParams))
    }
    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div className={style.packsContainer}>
            <h2>Packs</h2>
            <div className={style.buttonsBlock}>
                <button onClick={() => setId(userID)}
                        className={id ? `${style.activeButton}` : `${style.inactiveButton}`}>
                    My
                </button>
                <button onClick={() => setId(null)}
                        className={id ? `${style.inactiveButton}` : `${style.activeButton}`}>
                    All
                </button>
            </div>            <div className={style.navContainer}>
                <div className={style.filtersContainer}>
                    <Search setFilteredResults={setFilteredResults}/>
                    <Paginator totalItemsCount={packsParams.cardPacksTotalCount}
                               pageSize={packsParams.pageCount}
                               currentPage={packsParams.page}
                               onPageChanged={setPage}
                               portionSize={10}
                    />
                </div>
                <table className={style.tableContainer}>
                    <tr className={style.tableHeaders}>
                        <td>Name</td>
                        <td>Cards Count</td>
                        <td>Updated</td>
                        <SuperButton onClick={addPack} className={style.addButton}>ADD</SuperButton>
                    </tr>
                    {packs.map((p) => {
                        return <Pack key={p._id}
                                     pack={p}
                                     updatePack={updatePack}
                                     deletePack={deletePack}
                        />
                    })}
                </table>
            </div>
        </div>
    );
}

export default Packs;
*/
