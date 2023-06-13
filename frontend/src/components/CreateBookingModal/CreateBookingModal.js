import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./CreateBookingModal.css";

function CreateBookingModal({ spotId, spotObj }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div>
            <h3 className="book-modal-title">Let's Book Your Stay at {spotObj.name}!</h3>
            <form>
                <label className="date-label">Start Date:</label>
                <input
                    type="date"
                    className="top-date-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <br/>
                <label className="date-label">End Date:</label>
                <input
                    type="date"
                    className="bottom-date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button type="submit" className="reserve-trip-btn clickable">
                    Reserve</button>
            </form>
        </div>
    )
}

export default CreateBookingModal;
