import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CardsPackCreateType, PackType, ResponsePackType} from "../../00-API/packs-api";
import {AppRootStateType} from "../../01-redux/store";
import Search from "../../03-Components/c5-Search/Search";
import {
    addCardPacks,

    deleteCardsPackTC,
    fetchPacksTC, PacksFilterType,
    showMode,
    updateCardsPackTC
} from "../../01-redux/packs-reducer";
import {CircularProgress} from "@material-ui/core";
import {SuperDoubleRangeContainer} from "../../03-Components/c9-SuperDoubleRange/SuperDoubleRangeContainer";
import {setSearchValueAC} from "../../03-Components/c5-Search/filter-reducer";
import style from './Packs.module.css';
import {PaginatorContainer} from "../../03-Components/c4-Paginator/PaginatorContainer";
import SuperInputText from "../../03-Components/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../03-Components/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";
import ModalForAddPack from "../../03-Components/c6-Modal/modal/ModalForAddPack";
import CardPacksElement from "./CardPaksElement/CardPacksElement";
import {UserDataType} from "../../01-redux/profile-reducer";

export const Packs: React.FC = () => {

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const packs = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)

    //filter data
    const packsTotalCount = useSelector<AppRootStateType, number>(state => state.packs.packsTotalCount)
    const filter = useSelector<AppRootStateType, PacksFilterType>(state => state.packs.filter)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.currentPage)
    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
    const editMode = useSelector<AppRootStateType, boolean>(state => state.packs.showAll)

    const userData = useSelector<AppRootStateType, UserDataType | null>(state => state.profile.userData)

    //filter state
    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([0, 15])

    //for modal
    const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)
    const [namePack, setNamePack] = useState<string>('')
    const [typeNewPack, setTypeNewPack] = useState<string>('undefined')


    const dispatch = useDispatch()

    const onPageChanged = useCallback((currentPage: number) => {
        dispatch(fetchPacksTC(currentPage, pageSize, filtered))
    }, [currentPage])

    const onSearch = () => dispatch(fetchPacksTC(currentPage, pageSize, filtered))
    const showOwnPack = (e: ChangeEvent<HTMLInputElement>) => dispatch(showMode(e.target.checked))
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    const filtered: PacksFilterType = {
        packName: inputValue,
        min: range[0],
        max: range[1],
        userId: editMode && userData ? userData._id : ''
    }

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    const cardTestObj: PackType = {
        _id: genID(5),
        name: namePack,
        type: typeNewPack
    }

    const onAddCardPacks = () => {
        setActiveModalAdd(true)
    }
    const addPackHandler = () => {
        dispatch(addCardPacks(cardTestObj))
        setActiveModalAdd(false)
    }
    const changeCardPacks = (cardsPack: PackType) => {
        dispatch(updateCardsPackTC(cardsPack))
    }
    const removeCardPacks = (packId: string) => {
        dispatch(deleteCardsPackTC(packId))
    }

    useEffect(() => {
        dispatch(fetchPacksTC(currentPage, pageSize, filter))
    }, [])


    if (!packs) {
        return <CircularProgress/>
    }
    const mappedPacks = packs.map((p: PackType) =>
        <CardPacksElement key={p._id}
                          pack={p}
                          updateCardPacks={changeCardPacks}
                          removeCardPacks={removeCardPacks}/>)

    return (<>
            <div className={style.dataForm}>
                <div className={style.search}>
                    <h4>FORM FOR SEARCH</h4>
                    {/*
                    <SuperDoubleRangeContainer range={range} setRange={setRange}/>
*/}
                    <Search setFilteredResults={value => dispatch(setSearchValueAC(value))}/>
                    <SuperCheckbox
                        checked={true}//!!!!!!
                        onChange={showOwnPack}>
                        Show only mine pack
                    </SuperCheckbox>
                    <SuperButton onClick={onSearch}>Search</SuperButton>
                    <SuperButton onClick={onAddCardPacks}>Add new CardPack</SuperButton>
                </div>
                <div className={style.cards}>
                    {/*<PaginatorContainer pagesCountChange={pagesCountPacksChange}
                                        pageClickHandler={pageClickPacksHandler}
                                        totalCount={cardPacksTotalCount}
                                        page={page}
                                        pageCount={pageCount}
                    />*/}
                    <table className={style.table}>
                        <tbody> {
                            mappedPacks
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalForAddPack active={activeModalAdd} setActive={setActiveModalAdd} addPackHandler={addPackHandler}
                             setNamePack={setNamePack} setTypeNewPack={setTypeNewPack}/>
        </>
    )
}