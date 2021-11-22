import React, {ChangeEvent, useState} from "react";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import SuperButton from "../c2-SuperButton/SuperButton";
import style from "./Search.module.css"

type SearchPropsType = {
    setFilteredResults: (packName: string) => void
};

const Search: React.FC<SearchPropsType> = (props) => {
    const [inputValue, setInputValue] = useState("")
    const setSearchTerm = () => {
        props.setFilteredResults(inputValue)
    }
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <div className={style.searchContainer}>
            <SuperInputText placeholder={"Type name"} onChange={onChangeCallback}/>
            <SuperButton onClick={setSearchTerm}>Search</SuperButton>
        </div>
    );
}

export default Search;
