import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNewBookingThunk,
         getCurrentUsersBookingsThunk,
         updateBookingThunk } from "../../store/bookings";
import "./CreateBookingModal.css";

function CreateBookingModal({ spotId, spotObj, existingBooking }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user);

    const today = new Date();

    const getTomorrow = (startDate) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + 1);
        return date;
    };

    const formatDate = (str) => {
        str = str.split("T")[0].split("-");
        return [str[1], str[2], str[0]].join("/");
    };

    const [startDate, setStartDate] = useState(today);
    const [tomorrow, setTomorrow] = useState(getTomorrow(today));
    const [endDate, setEndDate] = useState(tomorrow);
    const [errors, setErrors] = useState({});

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (existingBooking) {
            setStartDate(new Date(existingBooking.startDate).toISOString().split("T")[0]);
            setEndDate(new Date(existingBooking.endDate).toISOString().split("T")[0]);
        }
    }, [existingBooking]);

    // Updates the minimum end date
    useEffect(() => {
        setTomorrow(getTomorrow(startDate));
    }, [startDate]);

    useEffect(() => {
        if (endDate < tomorrow) setEndDate(tomorrow);
    }, [tomorrow]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        const payload = { spotId, startDate, endDate };

        try {
            await dispatch(createNewBookingThunk(payload));
            await dispatch(getCurrentUsersBookingsThunk());
        } catch (e) {
            let err = await e.json();
            return setErrors(err.errors);
        }

        closeModal();
        history.push('/bookings/current');
    };

    return (
        <div>
            <h3 className="book-modal-title">Let's Book Your Stay at {spotObj.name}!</h3>
            <form onSubmit={handleSubmit}>
                <div className='modal-errors'>
                    {errors &&
                        Object.values(errors).map((error) => (
                        <p className="booking-error" key={error}>
                            {error}
                        </p>
                        ))}
                </div>
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
