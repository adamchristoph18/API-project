import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";


function ConfirmDeleteModal() {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    return (
        <h2>Hello world!</h2>
    )

}

export default ConfirmDeleteModal;
