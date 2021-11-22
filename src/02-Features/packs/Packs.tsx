import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addPackTC,
    deletePackTC,
    fetchPacksTC, PacksParamsType,
    SetPacksSearchTermAC,
    setPageAC,
    updatePackTC
} from "../../01-redux/packs-reducer";
import {PackType} from "../../00-API/packs-api";
import style from "./Packs.module.css";
import Pack from "./pack/Pack";
import {AppRootStateType} from "../../01-redux/store";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";
import Search from "../../03-Components/c5-Search/Search";
import Paginator from "../../03-Components/c4-Paginator/Paginator";

const Packs = () => {
    const dispatch = useDispatch()
    const packsParams = useSelector<AppRootStateType, PacksParamsType>((state:any) => state.packs.packsParams)
    const packs = useSelector<AppRootStateType, Array<PackType>>((state:any) => state.packs.packsList)

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

    return (
        <div className={style.packsContainer}>
            <h2>Packs</h2>
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
    );
}

export default Packs;
