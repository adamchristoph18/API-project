import "./ManageBookings.css";

const BookingCard = ({ booking }) => {
    return (
        <div className="booking-card">
            <img className="booking-card-image" src={booking.Spot.previewImage} alt="" />
            <h5 className="booking-spot-name">{booking.Spot.name}</h5>
            <p className="booking-city-state">{booking.Spot.city}, {booking.Spot.state}</p>
        </div>
    )
};

export default BookingCard;
