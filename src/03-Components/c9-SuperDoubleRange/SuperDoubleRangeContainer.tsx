import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SuperDoubleRange from "./SuperDoubleRange";
import {AppRootStateType} from "../../01-redux/store";
import {setMinMaxValuesAC} from "../c5-Search/filter-reducer";

type SuperDoubleRangeContainerPropsType = {}
export const SuperDoubleRangeContainer: React.FC<SuperDoubleRangeContainerPropsType> = (props) => {

    const minRedux = useSelector<AppRootStateType, number>(state => state.filter.min);
    const maxRedux = useSelector<AppRootStateType, number>(state => state.filter.max);

    const dispatch = useDispatch();
    const [min, setMin] = useState<number>(minRedux);
    const [max, setMax] = useState<number>(maxRedux);
    const onChangeRangeHandler = (values: number[]) => {
        setMin(values[0]);
        setMax(values[1]);
        dispatch(setMinMaxValuesAC(values));
    }

    return (
        <>
            <SuperDoubleRange onChangeRange={onChangeRangeHandler} value={[min, max]}/>
        </>
    );
}