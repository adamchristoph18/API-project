import "./ManageBookings.css";

const BookingCard = ({ booking }) => {
    return (
        <div className="booking-card">
            <img className="booking-card-image" src={booking.Spot.previewImage} alt="" />
        </div>
    )
};

export default BookingCard;
