import "./CreateBookingModal.css";

function CreateBookingModal({ spotId, spotObj }) {
    return (
        <div>
            <h3 className="book-modal-title">Let's Book Your Stay at {spotObj.name}!</h3>
        </div>
    )
}

export default CreateBookingModal;
