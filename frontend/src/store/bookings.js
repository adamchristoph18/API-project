import { csrfFetch } from "./csrf";

// Action type constants
const GET_USERS_BOOKINGS = 'bookings/GET_USERS_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';

// Action creators
export const getUsersBookings = (bookings) => ({
    type: GET_USERS_BOOKINGS,
    bookings
});

export const createBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
});

export const updateBooking = (booking) => ({
    type: UPDATE_BOOKING,
    booking
});

export const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
});

// Thunk action creators
// Get all of the current user's bookings thunk
export const getCurrentUsersBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const bookingsObj = await response.json();
        const bookings = bookingsObj.Bookings;
        dispatch(getUsersBookings(bookings));

        return bookings;
    }
};

// Create a booking thunk
export const createNewBookingThunk = (payload) => async (dispatch) => {
    const { spotId, startDate, endDate } = payload;
    const newBooking = { startDate, endDate };

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBooking)
    });

    if (response.ok) {
        const booking = await response.json();
        dispatch(createBooking(booking));
        return booking;
    } else {
        const errResponse = await response.json();
        return errResponse;
    }
};

// Edit a booking thunk

// Delete a booking thunk


// Bookings reducer
const initialState = { spot: {}, user: {} };
const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_BOOKINGS: {
            const newState = {...state, user: {}};
            action.bookings.forEach(booking => {
                newState.user[booking.id] = booking
            });
            return newState;
        }
        case CREATE_BOOKING: {
            const newState = {...state, spot: {...state.spot}, user: {...state.user} };
            newState.spot[action.booking.id] = action.booking;
            newState.user[action.booking.id] = action.booking;
            return newState;
        }
        default:
            return state;
    }
};


export default bookingsReducer;
