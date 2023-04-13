import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";


function ConfirmDeleteModal({ spot }) {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    return (
        <div className="confirm-delete-mdl">
            <h2 className="c-delete-title">Confirm Delete</h2>
            <p className="warning">
                Are you sure you want to remove this spot from the images?
            </p>
            <button
                className="yes-delete-button clickable"
                onClick={() => {
                    dispatch(deleteSpotThunk(spot.id))
                    closeModal();
                }}
            >
                Yes (Delete Spot)
            </button>
            <button
                className="no-keep-button clickable"
                onClick={closeModal}
            >
                No (Keep Spot)
            </button>
        </div>
    )

}

export default ConfirmDeleteModal;
