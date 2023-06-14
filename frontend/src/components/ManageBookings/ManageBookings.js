import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUsersBookingsThunk } from "../../store/bookings";
import BookingCard from "./BookingCard";
import "./ManageBookings.css";


const ManageBookings = () => {
    const bookingsObj = useSelector(state => state.bookings.user);
    const bookings = Object.values(bookingsObj).reverse();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersBookingsThunk());
    }, [dispatch]);

    if (!bookingsObj) return null;

    return (
        <div className="manage-bookings-div">
            <h1>Manage Your Bookings</h1>
            <div className="your-bookings-div">
                {bookings.map(booking => (
                    <BookingCard
                        booking={booking}
                        key={booking.id}
                    />
                ))}
            </div>
        </div>
    )
};

export default ManageBookings;
