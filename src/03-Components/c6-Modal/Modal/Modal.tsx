import React from "react";
import style from './Modal.module.css';

type ModalPropsType = {
    closeModalWindow?: () => void
    isShown: boolean
    scrollUp?: () => void
    showBackground: boolean
    width: number
    height: number
    top: number
    left: number
    position: "static" | "relative" | "absolute" | "sticky" | "fixed"
};

const Modal: React.FC<ModalPropsType> = (
    {
        isShown,
        height,
        width,
        showBackground,
        closeModalWindow,
        scrollUp, top, left, position,
        children
    }) => {

    return (
        <div>
            {isShown && <div className={style.modal} style={{width, height, position, top: `${top}%`, left: `${left}%`}}>
                <div className={style.children} onClick={scrollUp}>{children}</div>
            </div>}
            {isShown && showBackground &&
            <div className={style.overlay} onClick={closeModalWindow}></div>}
        </div>
    );
}

export default Modal;
