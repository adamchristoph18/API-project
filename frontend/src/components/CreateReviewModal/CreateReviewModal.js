import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./CreateReviewModal.css";
// import thunk here

function CreateReviewModal() {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    return (
        <div className="create-review-mdl">
            <h2 className="how-was-your-stay">How was your stay?</h2>
            <textarea
                className="new-review-text"
                placeholder="Just a quick review"
            />
        </div>
    )
}

export default CreateReviewModal;
