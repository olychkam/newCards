import React from "react";
import ModalContainer from "./ModalContainer";
import ModalContainerWithInput from "./ModalContainerWithInput";
import ModalUp from "./Modal/ModalUp";

const ModalsPage = () => {
    return (
        <div>
            <div style={{marginTop: "300px"}}>
                <ModalContainer/>
                <ModalContainerWithInput />
            </div>
            <ModalUp/>
            <div style={{marginTop: "5000px"}}>bottom</div>
        </div>
    )
}

export default ModalsPage
