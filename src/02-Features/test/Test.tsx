import React from "react";
import styles from './Test.module.css'
import SuperInputText from "../../03-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../03-Components/c3-SuperCheckbox/SuperCheckbox";

const Test = () => {
    return (
        <div className={styles.container}>
           <SuperInputText />
            <SuperButton>Click me </SuperButton>
           <SuperCheckbox />
        </div>
    );
}

export default Test;
