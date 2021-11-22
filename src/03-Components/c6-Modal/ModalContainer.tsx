import React, {useState} from "react";
import SuperButton from "../c2-SuperButton/SuperButton";
import Modal from "./Modal/Modal";

const ModalContainer: React.FC = () => {
    const [isShown, setIsShown] = useState(false)
    const closeModalWindow = () => {
        setIsShown(false)
    }

    return (
        <>
            <SuperButton onClick={() => {
                setIsShown(true)
            }}>Modal 1</SuperButton>
            <Modal closeModalWindow={closeModalWindow}
                   isShown={isShown}
                   showBackground={true}
                   width={600}
                   height={400}
                   top={50}
                   left={50}
                   position={"absolute"}
            >
                <h3>Modal 1</h3>
                <SuperButton onClick={closeModalWindow}>Close</SuperButton>
            </Modal>
        </>
    );
}

export default ModalContainer;
