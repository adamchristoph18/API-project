import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
// import thunk here

function CreateReviewModal() {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    return (
        <div>
            Hello world!
        </div>
    )
}

export default CreateReviewModal;
