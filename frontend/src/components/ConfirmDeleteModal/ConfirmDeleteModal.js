import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import { deleteReviewThunk, getCurrentUsersReviewsThunk } from "../../store/reviews";


function ConfirmDeleteModal({ spot, review }) {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const deleteReview = async (e) => {
        await dispatch(deleteReviewThunk(review.id));
        await dispatch(getCurrentUsersReviewsThunk());

        closeModal();
        return;
    };

    return (
        <div className="confirm-delete-mdl">
            <h2 className="c-delete-title">Confirm Delete</h2>
            {spot ? <p className="warning">
                Are you sure you want to remove this spot from the listings?
            </p> : <p className="warning">
                Are you sure you want to remove this review?
            </p>}
            {spot ?
                <>
                <button
                    className="yes-delete-button clickable"
                    onClick={() => {
                        dispatch(deleteSpotThunk(spot.id));
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
                </>
                : <>
                    <button
                        className="yes-delete-button clickable"
                        onClick={deleteReview}
                    >
                        Yes (Delete Review)
                    </button>
                    <button
                        className="no-keep-button clickable"
                        onClick={closeModal}
                    >
                        No (Keep Review)
                    </button>
                    </>
            }
        </div>
    )

}

export default ConfirmDeleteModal;
