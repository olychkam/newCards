import React, {useEffect, useState} from "react";
import Modal from "./Modal";

const ModalUp: React.FC = () => {
    const [isShown, setIsShown] = useState(false)

    const toggleIsShown = () => {
        if (window.pageYOffset > 300) {
            setIsShown(true);
        } else {
            setIsShown(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleIsShown);
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top : 0,
            behavior : "smooth"
        });
    }
    return (
        <>

            <Modal scrollUp={scrollUp}
                   isShown={isShown}
                   showBackground={false}
                   width={100}
                   height={70}
                   top={85}
                   left={10}
                   position={"fixed"}
            >
                <span style={{cursor : "pointer"}}>UP</span>
            </Modal>
        </>
    );
}

export default ModalUp;
