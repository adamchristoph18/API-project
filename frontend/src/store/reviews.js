import { csrfFetch } from "./csrf";

// Action type constants
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';

// Action creators
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

// Thunk action creators
// Get all reviews for a spot thunk
export const getReviewsForSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviewsObj = await response.json();
        const reviews = reviewsObj.Reviews;
        dispatch(loadReviews(reviews));

        return reviews;
    }
};

// Reviews reducer
const initialState = { spot: {}, user: {} };
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {...state, spot: {}};
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
