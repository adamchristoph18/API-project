import { useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUsersBookingsThunk } from "../../store/bookings";
import BookingCard from "./BookingCard";
import "./ManageBookings.css";


const ManageBookings = () => {
    const bookingsObj = useSelector(state => state.bookings.user);
    const bookings = Object.values(bookingsObj).reverse();

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersBookingsThunk());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    if (!bookingsObj) return null;

    return (
        <div className="manage-bookings-div">
            <h1>Manage Your Bookings</h1>
            <div className="your-bookings-div">
                {bookings.length === 0 ? <div>
                    <p>You have no trips scheduled.</p>
                    <NavLink className="back-home" to='/'>Go back to the homepage</NavLink>
                    </div>
                    :
                    bookings.map(booking => (
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
