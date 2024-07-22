import React from 'react'
import Rodal from 'rodal'
import "rodal/lib/rodal.css";
const Modal = ({ modalIsOpen, onClose, children }) => {
    const customStyles = {
        // width: "452px",
        // height: dashboard ? "auto" : "22px",
        // padding: dashboard ? "20px 20px" : "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding:"40px 20px",
    };
    return (
        <div>
            <Rodal visible={modalIsOpen} onClose={onClose} animation="slideUp" customStyles={customStyles}>
                {children}
            </Rodal>
        </div>
    )
}

export default Modal
