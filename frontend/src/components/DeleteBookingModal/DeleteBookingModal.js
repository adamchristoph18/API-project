import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getCurrentUsersBookingsThunk, deleteBookingThunk } from "../../store/bookings";


function DeleteBookingModal({ bookingId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const cancelBooking = async (e) => {
        await dispatch(deleteBookingThunk(bookingId));
        await dispatch(getCurrentUsersBookingsThunk());

        closeModal();
        return;
    };

    return (
        <div className="confirm-delete-mdl">
            <h2 className="c-delete-title">Confirm Delete</h2>
            <p className="warning">Are you sure you want to cancel this booking?</p>
                <>
                    <button
                        className="yes-delete-button clickable"
                        onClick={cancelBooking}
                    >
                    Yes (Delete Booking)
                    </button>
                    <button
                        className="no-keep-button clickable"
                        onClick={closeModal}
                    >
                        No (Keep the Booking)
                    </button>
                </>
        </div>
    )
}

export default DeleteBookingModal;
