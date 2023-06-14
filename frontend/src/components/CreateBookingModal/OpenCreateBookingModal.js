import React from "react";
import { useModal } from "../../context/Modal";
import "./CreateBookingModal.css";

function OpenCreateBookingModal({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    booking
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const dolphinClassName = (booking ? "edit-booking-user-button clickable" : "reserve-spot-button clickable")

    const onClick = (e) => {
        e.stopPropagation();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    };

    return (
        <div className={dolphinClassName} onClick={onClick}>{itemText}</div>
    );
}

export default OpenCreateBookingModal;
